---
layout: single
title: Reviews
permalink: /reviews/
classes: wide
---

<ul>
  {% for post in site.posts %}
    {% if post.categories contains "review" %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span>({{ post.date | date: "%B %d, %Y" }})</span>
      </li>
    {% endif %}
  {% endfor %}
</ul>