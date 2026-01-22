---
layout: pure
permalink: /posts/
title: Posts
---

<div class="entries-list-minimal">
  {% assign total_posts = site.posts.size %}
  {% assign current_num = total_posts %}

  {% for post in site.posts %}
    <article class="entry-item">
      <span class="entry-number">{{ current_num | prepend: '000' | slice: -3, 3 }}.</span>
      <a href="{{ post.url | relative_url }}">{{ post.title | lowercase }}</a>
    </article>
    {% assign current_num = current_num | minus: 1 %}
  {% endfor %}
</div>