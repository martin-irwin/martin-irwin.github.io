---
layout: default
permalink: /portfolio/
author_profile: false
gallery_css: true
gallery_images:
  - url: /assets/portfolio/20140401-DSC00426-ILCE-7R.png
    image_path: /assets/portfolio/20140401-DSC00426-ILCE-7R.png
    alt: "Sakura"
    title: "Sakura"

  - url: /assets/portfolio/16226105080_5377a2ac09_o.jpg
    image_path: /assets/portfolio/16226105080_5377a2ac09_o.jpg
    alt: "Orchid"
    title: "Orchid" 

  - url: /assets/portfolio/Bamboo+Forest.png
    image_path: /assets/portfolio/Bamboo+Forest.png
    alt: "Bamboo Forest"
    title: "Bamboo Forest"

  - url: /assets/portfolio/mr-blue-sky_17069826081_o.jpg
    image_path: /assets/portfolio/mr-blue-sky_17069826081_o.jpg
    alt: "Amsterdam"
    title: "Amsterdam"

  - url: /assets/portfolio/a-steamy-mountain-forest_11459967673_o.jpg
    image_path: /assets/portfolio/a-steamy-mountain-forest_11459967673_o.jpg
    alt: "Steamy Mountain Forest"
    title: "Steamy Mountain Forest"

  - url: /assets/portfolio/14304640942_222b618050_o.jpg
    image_path: /assets/portfolio/14304640942_222b618050_o.jpg
    alt: "Tokyo Station"
    title: "Tokyo Station"

  - url: /assets/portfolio/20140518-DSC01300-ILCE-7R.png
    image_path: /assets/portfolio/20140518-DSC01300-ILCE-7R.png
    alt: "Shinkansen"
    title: "Shinkansen"

  - url: /assets/portfolio/lines_14025340301_o.jpg
    image_path: /assets/portfolio/lines_14025340301_o.jpg
    alt: "Glass building"
    title: "Glass building"

  - url: /assets/portfolio/ice_16082446912_o.jpg
    image_path: /assets/portfolio/ice_16082446912_o.jpg
    alt: "Ice"
    title: "Ice"

  - url: /assets/portfolio/clouds--sun_9852050215_o.jpg
    image_path: /assets/portfolio/clouds--sun_9852050215_o.jpg
    alt: "Clouds and Sun"
    title: "Clouds and Sun"

  - url: /assets/portfolio/20230905-JAPAN-2023DSC07293-ILCE-7M3.png
    image_path: /assets/portfolio/20230905-JAPAN-2023DSC07293-ILCE-7M3.png
    alt: "Japan 2023"
    title: "Japan 2023"

  - url: /assets/portfolio/20230912-JAPAN-2023DSC07558-ILCE-7M3.png
    image_path: /assets/portfolio/20230912-JAPAN-2023DSC07558-ILCE-7M3.png
    alt: "Japan 2023 - Kyoto"
    title: "Japan 2023 - Kyoto"

  - url: /assets/portfolio/Sensoji.png
    image_path: /assets/portfolio/Sensoji.png
    alt: "Sensoji Temple"
    title: "Sensoji Temple"

  - url: /assets/portfolio/butterfly-flyby_9631016191_o.jpg
    image_path: /assets/portfolio/butterfly-flyby_9631016191_o.jpg
    alt: "Butterfly Flyby"
    title: "Butterfly Flyby"

  - url: /assets/portfolio/horses_18127918309_o.jpg
    image_path: /assets/portfolio/horses_18127918309_o.jpg
    alt: "Horses"
    title: "Horses"
---

<p style="text-align: center; padding-left: 30%; padding-right: 30%;">I don't use Flickr as much these days, but you can find over 15 years' worth of photos <a href="https://www.flickr.com/photos/martindesu/albums">using this link</a>.</p>

<p style="text-align: center; padding-left: 20%; padding-right: 20%;">Click an image for a larger version.</p>

<div class="gallery">
  {% for image in page.gallery_images %}
    <a href="{{ image.url }}" target="_blank">
      <img src="{{ image.image_path }}" alt="{{ image.alt }}" title="{{ image.title }}" class="gallery-image">
    </a>
  {% endfor %}
</div>

<p style="text-align: center;">☆色々ありがとう☆</p>