---
layout: single
author_profile: true
classes: wide
permalink: /potd/
---
<figure>
  <h3 id="photoTitle">Photo of the day:</h3>
  <img id="randomImage" class="rotating-image" alt="Random image">
</figure>

<script>
  const apiKey = "247f64bef58f06087094850c9639cb44"; // Your Flickr API key
  const userId = "53911191@N03"; // Replace with the correct user ID

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
        console.error('Error fetching photos from Flickr:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch from Flickr API:', error);
    }
  }

  function displayRandomFlickrPhoto(photos) {
    if (photos.length === 0) {
      console.error('No photos available from the Flickr account.');
      return;
    }

    const randomIndex = getRandomInt(photos.length);
    const photo = photos[randomIndex];
    const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

    document.getElementById('randomImage').src = photoUrl;
    document.getElementById('photoTitle').innerText = "Photo of the day:";
  }

  function displayRandomLocalImage() {
    const randomIndex = getRandomInt(localImages.length);
    const randomLocalImage = localImages[randomIndex];
    
    document.getElementById('randomImage').src = randomLocalImage;
    document.getElementById('photoTitle').innerText = "Photo of the day:";
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
