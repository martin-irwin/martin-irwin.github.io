#!/usr/bin/env node
/**
 * fetch-vpower.js — regenerate assets/data/vpower-stations.json
 *
 * Discovers every Shell station in Switzerland via the geoapp "within_bounds"
 * locator API, keeps the ones that sell V-Power 100 (fuel code
 * `super_premium_gasoline`), and writes them in the country/source-agnostic
 * schema consumed by /octane.html:
 *
 *   {
 *     "_meta": { last_refreshed, source_url, source, country, fuel, station_count },
 *     "stations": [
 *       { id, name, lat, lng, address, city, postcode, country, source,
 *         brand, fuels[], hours, is_24h }
 *     ]
 *   }
 *
 * The frontend's buildVpowerStation() reads exactly these per-station fields,
 * and loadVpowerStations() reads _meta.last_refreshed — keep this script and
 * that shape in sync.
 *
 * Requires Node 18+ (uses the built-in global fetch). Run from the repo root:
 *   node scripts/fetch-vpower.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const BASE = 'https://shellgsllocator.geoapp.me/api/v2/locations';
const WITHIN_BOUNDS = `${BASE}/within_bounds`;
const LOCALE = 'de_CH';
const TARGET_FUEL = 'super_premium_gasoline'; // Shell V-Power 100
// Restrict to one country (the padded bbox spills over the border). Build 2 can
// add a DE pass by changing COUNTRY + the bounding box, or set COUNTRY = null to
// keep everything the bbox returns.
const COUNTRY = 'CH';
const OUT_FILE = path.join(__dirname, '..', 'assets', 'data', 'vpower-stations.json');

// Switzerland bounding box [lat, lng] — slightly padded.
const CH_SW = [45.75, 5.85];
const CH_NE = [47.95, 10.55];

// within_bounds returns at most ~40 raw locations and otherwise clusters; if a
// tile is at/over the cap or returns clusters we subdivide it into quadrants.
const PAGE_CAP = 40;
const MAX_DEPTH = 9;
const CONCURRENCY = 6;
const RETRIES = 3;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchJson(url, attempt = 1) {
  try {
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (attempt >= RETRIES) throw err;
    await sleep(300 * attempt);
    return fetchJson(url, attempt + 1);
  }
}

// Recursively collect raw locations across CH, subdividing on clusters/cap.
async function discover(sw, ne, depth, sink) {
  const url = `${WITHIN_BOUNDS}?sw[]=${sw[0]}&sw[]=${sw[1]}&ne[]=${ne[0]}&ne[]=${ne[1]}&locale=${LOCALE}&format=json`;
  const data = await fetchJson(url);
  const locations = data.locations || [];
  const clusters = data.clusters || [];

  const needsSplit = depth < MAX_DEPTH && (clusters.length > 0 || locations.length >= PAGE_CAP);
  if (needsSplit) {
    const midLat = (sw[0] + ne[0]) / 2;
    const midLng = (sw[1] + ne[1]) / 2;
    const quads = [
      [[sw[0], sw[1]], [midLat, midLng]],
      [[sw[0], midLng], [midLat, ne[1]]],
      [[midLat, sw[1]], [ne[0], midLng]],
      [[midLat, midLng], [ne[0], ne[1]]],
    ];
    for (const [qsw, qne] of quads) await discover(qsw, qne, depth + 1, sink);
    return;
  }
  for (const loc of locations) if (loc && loc.id) sink.set(String(loc.id), loc);
}

// Map a per-second-of-time detail record onto our stable schema.
function buildStation(detail) {
  const hours = (detail.forecourt_opening_hours && detail.forecourt_opening_hours.length)
    ? detail.forecourt_opening_hours
    : (detail.opening_hours && detail.opening_hours.length ? detail.opening_hours : null);
  const is24h = detail.forecourt_open_status === 'twenty_four_hour'
    || (Array.isArray(detail.amenities) && detail.amenities.includes('twenty_four_hour'));
  return {
    id: String(detail.id),
    name: detail.name || '',
    lat: detail.lat,
    lng: detail.lng,
    address: detail.address || '',
    city: detail.city || '',
    postcode: detail.postcode || '',
    country: detail.country_code || 'CH',
    source: 'geoapp-shell',
    brand: detail.brand || 'Shell',
    fuels: detail.fuels || [],
    hours: hours,
    is_24h: is24h,
  };
}

// Simple bounded-concurrency map.
async function mapPool(items, limit, worker) {
  const out = new Array(items.length);
  let i = 0;
  async function run() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return out;
}

async function main() {
  console.error('Discovering Shell stations across CH…');
  const sink = new Map();
  await discover(CH_SW, CH_NE, 0, sink);
  const ids = [...sink.keys()];
  console.error(`Found ${ids.length} Shell locations; fetching detail to filter V-Power 100…`);

  let done = 0;
  const details = await mapPool(ids, CONCURRENCY, async (id) => {
    const d = await fetchJson(`${BASE}/${id}?locale=${LOCALE}&format=json`);
    if (++done % 50 === 0) console.error(`  ${done}/${ids.length}`);
    return d;
  });

  const stations = details
    .filter(d => d && !d.inactive && Array.isArray(d.fuels) && d.fuels.includes(TARGET_FUEL))
    .filter(d => !COUNTRY || d.country_code === COUNTRY)
    .map(buildStation)
    .sort((a, b) => Number(a.id) - Number(b.id));

  const payload = {
    _meta: {
      last_refreshed: new Date().toISOString(),
      source_url: BASE,
      source: 'geoapp-shell',
      country: COUNTRY || 'mixed',
      fuel: 'V-Power 100 (super_premium_gasoline)',
      station_count: stations.length,
    },
    stations,
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + '\n');
  console.error(`Wrote ${stations.length} V-Power 100 stations to ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch(err => { console.error('FAILED:', err); process.exit(1); });
