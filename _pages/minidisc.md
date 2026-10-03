---
layout: pure
permalink: /minidisc/
title: MiniDisc
---

## Guides

<ul>
  <li>
    <a href="{{ '/es-9dvd/' | relative_url }}">Kenwood ES-9DVD English guide</a>
    <span>(abridged from the Japanese manual)</span>
  </li>
</ul>

## Reviews

<ul>
  {% for post in site.posts %}
    {% if post.tags contains "minidisc" and post.categories contains "review" %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span>({{ post.date | date: "%B %d, %Y" }})</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>
