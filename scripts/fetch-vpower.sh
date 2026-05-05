#!/usr/bin/env bash
# Refresh V-Power 100 station data for Switzerland. Run: ./scripts/fetch-vpower.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT="$REPO_ROOT/assets/data/vpower-stations.json"
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

API="https://shellgsllocator.geoapp.me/api/v2/locations/nearest_to"
LIMIT=50

# Check for jq
if ! command -v jq &>/dev/null; then
  echo "ERROR: jq is required. Install with: brew install jq" >&2
  exit 1
fi

# Grid of query points covering all of Switzerland (lat, lng pairs)
# Spaced ~40-50km apart for overlap with limit=50
POINTS=(
  "46.20 6.15"   # Geneva
  "46.50 6.60"   # Lausanne
  "46.70 6.30"   # Yverdon
  "46.80 7.00"   # Fribourg
  "46.95 7.45"   # Bern
  "47.05 7.60"   # Solothurn
  "47.20 7.35"   # Biel
  "47.55 7.60"   # Basel
  "47.30 7.80"   # Olten
  "47.40 8.05"   # Aarau/Baden
  "47.37 8.54"   # Zurich
  "47.50 8.70"   # Winterthur
  "47.55 9.37"   # St. Gallen
  "47.15 8.50"   # Zug
  "47.05 8.30"   # Lucerne
  "47.00 9.05"   # Glarus
  "46.85 9.50"   # Chur
  "46.50 9.80"   # Engadin
  "46.20 7.35"   # Sion/Valais
  "46.00 8.95"   # Lugano/Ticino
)

echo "Fetching V-Power 100 stations from Shell Geoapp..."
echo "Grid points: ${#POINTS[@]}"

MERGED="$TMP_DIR/merged.json"
echo '[]' > "$MERGED"

for i in "${!POINTS[@]}"; do
  read -r LAT LNG <<< "${POINTS[$i]}"
  RESP="$TMP_DIR/resp_${i}.json"

  HTTP_CODE=$(curl -s -o "$RESP" -w '%{http_code}' \
    "${API}?lat=${LAT}&lng=${LNG}&limit=${LIMIT}&locale=de_CH&format=json&with_any%5Bfuel_type%5D%5B%5D=conventional")

  if [[ "$HTTP_CODE" != "200" ]]; then
    echo "  WARN: point $((i+1)) ($LAT, $LNG) returned HTTP $HTTP_CODE — skipping"
    continue
  fi

  # Extract stations with super_premium_gasoline, merge into accumulator
  COUNT=$(jq '[.locations[] | select(.fuels | index("super_premium_gasoline"))] | length' "$RESP")
  echo "  Point $((i+1))/${#POINTS[@]} ($LAT, $LNG): $COUNT V-Power stations"

  jq -s '.[0] + [.[1].locations[] | select(.fuels | index("super_premium_gasoline")) | {
    id: .id,
    name: .name,
    lat: .lat,
    lng: .lng,
    address: .address,
    city: .city,
    postcode: .postcode,
    brand: .brand,
    fuels: .fuels,
    open_status: .open_status,
    next_open_status_change: .next_open_status_change
  }]' "$MERGED" "$RESP" > "$TMP_DIR/tmp.json"
  mv "$TMP_DIR/tmp.json" "$MERGED"

  # Rate-limit: 1 req/sec
  sleep 1
done

# Deduplicate by id, sort by id for stable output
DEDUPED="$TMP_DIR/deduped.json"
jq '[group_by(.id)[] | .[0]] | sort_by(.id)' "$MERGED" > "$DEDUPED"
TOTAL=$(jq 'length' "$DEDUPED")

echo ""
echo "Total unique V-Power 100 stations: $TOTAL"

# Diff against existing file (handles both old bare-array and new wrapper formats)
if [[ -f "$OUT" ]]; then
  OLD_IDS=$(jq -r 'if type == "array" then .[].id else .stations[].id end' "$OUT" | sort)
  NEW_IDS=$(jq -r '.[].id' "$DEDUPED" | sort)

  ADDED=$(comm -13 <(echo "$OLD_IDS") <(echo "$NEW_IDS") | wc -l | tr -d ' ')
  REMOVED=$(comm -23 <(echo "$OLD_IDS") <(echo "$NEW_IDS") | wc -l | tr -d ' ')
  UNCHANGED=$(comm -12 <(echo "$OLD_IDS") <(echo "$NEW_IDS") | wc -l | tr -d ' ')
  OLD_TOTAL=$(jq 'if type == "array" then length else .stations | length end' "$OUT")

  echo "Previous: $OLD_TOTAL stations"
  echo "  Added:     $ADDED"
  echo "  Removed:   $REMOVED"
  echo "  Unchanged: $UNCHANGED"

  if [[ "$ADDED" == "0" && "$REMOVED" == "0" ]]; then
    echo "No changes detected."
  fi
else
  echo "No previous file — writing fresh."
fi

# Wrap in envelope with timestamp
REFRESHED_AT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
jq --arg ts "$REFRESHED_AT" '{refreshed_at: $ts, stations: .}' "$DEDUPED" > "$TMP_DIR/final.json"
cp "$TMP_DIR/final.json" "$OUT"
echo ""
echo "Written to: $OUT (refreshed_at: $REFRESHED_AT)"
