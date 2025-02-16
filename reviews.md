---
layout: default
title: Reviews
permalink: /reviews/
order: 2
---

<div class="home" style="text-align: center;">
  <h1>Reviews</h1>
  
  {%- assign review_posts = site.posts | where_exp: "post", "post.categories contains 'review'" -%}
  
  {% if review_posts.size > 0 %}
    <ul class="post-list" style="list-style-type: none; padding: 0;"> <!-- Remove list bullets -->
      {%- for post in review_posts -%}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="post-meta">{{ post.date | date: date_format }}
          {% assign words = post.content | number_of_words %}
          {% assign readtime = words | divided_by: 180 %}
          <span class="reading-time"> ~{{ readtime | ceil }} minute read</span>
        </span>
        <h3>
          <a class="post-link" href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </h3>
        
        {%- if site.show_excerpts -%}
          {{ post.excerpt }}
        {%- endif -%}
      </li>
      {%- endfor -%}
    </ul>
    <hr>
    <br>
    <p class="rss-subscribe" style="text-align: center;"> <!-- Center the RSS subscribe text -->
      Subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a> or have posts delivered directly to your inbox below
    </p>
  {% else %}
    <p>No reviews found.</p>
  {% endif %}
</div>