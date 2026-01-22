---
title: Info
permalink: /info/
layout: pure
---

{% assign current_year = site.time | date: '%Y' %}
{% assign years = current_year | minus: 2010 %}
<div style="white-space: pre-line; margin-bottom: 1.4rem;">
Physicist with a camera and an interest in design.
Exploring intentional technology use.
Website up for {{ years }} years.
日本文化を学ぶ者。
</div>

[martin (at) martinirwinphotography.com](mailto:martin@martinirwinphotography.com)

<div style="margin-top: 3.4rem;">
  <div class="nav-group">
    <a href="{{ '/portfolio/' | relative_url }}" class="v-link" style="display: table;">> Portfolio</a>
    <a href="{{ '/code/' | relative_url }}" class="v-link" style="display: table; margin-top: 0.5rem;">> Code</a>
    <a href="{{ '/reviews/' | relative_url }}" class="v-link" style="display: table; margin-top: 0.5rem;">> Reviews</a>
    <a href="{{ '/potd/' | relative_url }}" class="v-link" style="display: table; margin-top: 0.5rem;">> POTD</a>
    <a href="{{ '/search/' | relative_url }}" class="v-link" style="display: table; margin-top: 0.5rem;">> Search</a>
  </div>

  <span style="display: block; margin: 1.4rem 0; opacity: 0.5;">–</span>
  
  <div class="nav-group">
    <a href="{{ '/feed.xml' | relative_url }}" class="v-link" style="display: table;">> RSS</a>
  </div>
</div>

<div id="mc_embed_signup">
  <form action="http://martinirwinphotography.us7.list-manage.com/subscribe/post?u=218687a2bf62059de717cae02&amp;id=d06fc34288" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <input type="submit" value="subscribe" name="subscribe" id="mc-embedded-subscribe">
  </form>
</div>

<style>
  #mc_embed_signup { background: transparent; width: 100%; margin-top: 1.4rem; }
  #mc_embed_signup form { padding: 0; }
  #mce-EMAIL {
    background: transparent;
    border: none;
    border-bottom: 1px solid #000;
    font-family: inherit;
    font-size: 0.8rem;
    padding: 5px 0;
    width: 200px;
    outline: none;
    color: #000;
    border-radius: 0;
  }
  #mc-embedded-subscribe {
    background: transparent;
    border: 1px solid #000;
    font-family: inherit;
    font-size: 0.65rem;
    padding: 3px 10px;
    cursor: pointer;
    margin-left: 10px;
    text-transform: lowercase;
  }
  #mc-embedded-subscribe:hover {
    background: #000;
    color: #f2f2f2;
  }
</style>
