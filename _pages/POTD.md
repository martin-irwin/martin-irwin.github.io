---
layout: pure
permalink: /potd/
title: Photo of the day
---

<figure style="margin-top: 1.4rem;">
  <div id="photoMeta" style="font-size: 0.7rem; margin-bottom: 0.7rem; opacity: 0.5;">loading...</div>
  <img id="randomImage" class="rotating-image" alt="potd">
</figure>

<script>
  const apiKey = "247f64bef58f06087094850c9639cb44"; 
  const userId = "53911191@N03"; 

  const localImages = [
    {% for file in site.static_files %}
      {% if file.path contains 'assets/images/' and file.extname == '.jpg' or file.extname == '.jpeg' %}
        "{{ file.path }}",
      {% endif %}
    {% endfor %}
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function fetchFlickrPhotos() {
    const url = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.stat === 'ok') {
        displayRandomFlickrPhoto(data.photos.photo);
      } else {
        document.getElementById('photoMeta').innerText = "error: flickr_api_failure";
      }
    } catch (error) {
      console.error('Failed to fetch from Flickr API:', error);
    }
  }

  function displayRandomFlickrPhoto(photos) {
    if (photos.length === 0) return;

    const randomIndex = getRandomInt(photos.length);
    const photo = photos[randomIndex];
    const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

    document.getElementById('randomImage').src = photoUrl;
    // Show the Flickr title in lowercase for that codey feel
    document.getElementById('photoMeta').innerText = `src: flickr/${photo.title.toLowerCase() || 'untitled'}`;
  }

  function displayRandomLocalImage() {
    if (localImages.length === 0) return;
    const randomIndex = getRandomInt(localImages.length);
    const randomLocalImage = localImages[randomIndex];
    
    // Extract filename from path for the label
    const filename = randomLocalImage.split('/').pop().toLowerCase();
    
    document.getElementById('randomImage').src = randomLocalImage;
    document.getElementById('photoMeta').innerText = `src: local/${filename}`;
  }

  function displayRandomImage() {
    if (Math.random() > 0.5) {
      fetchFlickrPhotos();
    } else {
      displayRandomLocalImage();
    }
  }

  window.onload = displayRandomImage;
</script>