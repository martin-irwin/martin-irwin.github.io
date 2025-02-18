---
title: Updates to the Site
excerpt: "After years of using Squarespace, I finally made the switch to Jekyll and GitHub Pages. The reasons? Clunky editing, restrictive workflows, poor mobile apps, and rising costs. Now, my site is fully in my control, backed up locally and on GitHub, with a seamless blogging workflow. I’ve also restored comments and embraced a more open, personal web—something that feels increasingly rare in today’s internet. Oh, and I’m playing Cyberpunk 2077, which ties into all this more than you’d think…"
tags: Updates Cyberpunk PM250
image: /assets/images/IMG_0975.png
categories: "blog"
---

# Migrating from Squarespace to GitHub Pages  

Over the past few months, I’ve moved my site from Squarespace to GitHub Pages. It wasn’t because I disliked Squarespace—it served me well for over a decade. But as time went on, I realized it wasn’t the right fit anymore. Squarespace has increasingly pivoted toward small businesses and e-commerce, which makes sense for them, but not for me.  

When I originally switched from WordPress, it was because I loved Squarespace’s themes, and to be fair, many of them *are* fantastic. But working within a tightly controlled platform comes with its own frustrations, and over time, I found the experience more restrictive than convenient—especially for something as simple as creating blog posts with images.  

So, it was time for a change. 

![photo](/assets/images/IMG_0829.png)

You can spend hours creating a great theme, but when it comes time to post, the process takes far longer than it should due to the lack of a streamlined, non-GUI-based approach. In theory, this is fine, but in practice, it’s cumbersome—image blocks must be manually inserted before images can be embedded into the main body. This means I can’t simply write text, drop an image in, and move on. I have to write a specific *block* of text, insert an image block, upload the image into the block, and then get writing again. It’s not a disaster, but it just became too frustrating to use. You can insert blocks into walls of text, but it’s clunky and unpredictable. If the site crashes or reloads while you’re doing this, you lose the post entirely. That forces you to write a draft somewhere else first, and if you include images in that draft, then the Squarespace workflow really becomes a burden.

There are three other reasons I have abandoned Squarespace:

1. **The photos I take are mine**, and I am happy for them to be online for all to see. There was a time when I first started when I was worried about copyright and people “stealing my images.” In short, those who wish to use my images for non-commercial purposes are free to do so, and if you want to make money using my images, you’re supposed to pay me something. This is a model that generally works, so I removed watermarks and stopped caring about it too much. The bigger issue is that I uploaded the images to Squarespace and also kept a local copy on my computer “for me.” Squarespace is not friendly when it comes to getting your data back, which I will get to later. But in a nutshell, I didn’t like being locked into a specific platform.

2. **The mobile apps are terrible.** I have the luxury of presently writing this post on the 13” iPad Pro M4. It’s technically the most powerful computer I own, even though it is somewhat crippled by iOS. Writing posts on the app is even more frustrating than writing them on my computer through a web interface. The app is clunky and crashes, and everything just takes ages to do. If you know absolutely nothing about code or computers, it might be passable—if you have ever used WordPress, it will feel like a downgrade. The App Store reviews “speak for themselves,” although somehow it has 4.6/5, yet a cursory glance at the reviews themselves reveals the true story.

   ![photo](/assets/images/1308d465e471abe22290ccbf3d700b2c014e308d.png)

3. **Price.** When I first started the site, it was around $80 USD per year for hosting, and the site had fantastic uptime. My plan stayed exactly the same (they added features I neither wanted nor needed, like e-commerce), yet the price ballooned to $198/year. This is quite a chunk, taking the total cost of the site to over $20/month when I include the domain name license. Considering I didn’t use the site much in the last couple of years, this grated a little too much, and I decided to call it a day. I exported the site and disabled auto-renew.

   ![photo](/assets/images/PastedGraphic0123.png)
   
   ![photo](/assets/images/image.png)

I spent a while looking for alternatives and discovered that websites can be natively hosted on GitHub if you’re prepared to do the work. This fits me much better, as I love to play around with computer code and basic web stuff like HTML and CSS. I won’t write about how I did all of this here, as plenty of expert guides exist, but this is what I did:

- Exported Squarespace site in WordPress format
- Uploaded site into WordPress
- Exported from WordPress into markdown format
- Rebuilt the whole site using Jekyll and redeployed all my old blog posts going back to 2012(!), images included

So now, I have all the images locally, and in fact, backed up to GitHub. GitHub is a long-term solution, and even if they ever start charging, it’s no big deal—everything is now in a truly portable, open-source format that I can deploy anywhere.

Most recently, I added comments back to the site, so feel free to comment using the Disqus format. I have some regular readers who do comment, and for me, it’s worth hearing from them at the expense of managing spam. Speaking of spam, another reason I want to blog like it’s 2012 is because I am real and not a bot; I help to counter the *Dead Internet Theory*.

## Cyberpunk

![photo](/assets/images/IMG_0711.png)

On a related note, I am playing *Cyberpunk 2077* at present and find it to be one of the best games I’ve ever played. I am around 35% complete according to PlayStation, but I don’t even want the main missions to end! It’s so immersive, and the script and overall premise are right up my street. It’s *Ghost in the Shell* meets *Terminator*, *Robocop*, and *Blade Runner*—a mix of tech-noir, cybernetic dystopia, and corporate overreach gone wild. You can read all about it elsewhere, but I mention it here because, in that future, mega corporations (*corps*) such as Arasaka 荒坂, Militech, Kang Tao, and others rule the world. Its dystopia is turned up to 11, and the “old internet” was destroyed in an event known as the *DataKrash*.

   ![photo](/assets/images/F009DC56-BF6C-4746-9E0F-DC36F29AC68F.png)

The Old Net (our internet) became unusable. The world was forced to create a new, more controlled version of the internet, known as the ***Blackwall-protected Net*** in *Cyberpunk 2077*. Governments and corps scrambled to rebuild their digital empires, but the damage was so severe that much of the old world’s information was permanently lost. I can see us going in such a direction. It’s also one of the best-looking games I’ve ever played and has an epic soundtrack. 10/10.

## Blogging Now

My blogging workflow—which I’ve automated via iOS Shortcuts—is simple: write in Bear, drop images exactly where I want them, hit “Share,” and voilà, the post is published. (Well, technically, it’s first pushed to the excellent [Working Copy Git client](https://workingcopy.app), then committed and uploaded). This is nearly the exact opposite in feeling compared to the Squarespace way of doing things (not a workflow at all), so I’m really pleased I’ve put this together. 

Squarespace demands an internet connection just to write a blog post. Sure, I could draft it elsewhere, but that’s just an unnecessary extra step. The iPad even has a 5G eSIM connection, but if there’s a patchy net connection, you lose the whole post. Far too frustrating. So instead, I work essentially offline, then press publish when I’m done.

Let me know if you would like a copy of the workflow.

![photo](/assets/images/DSC00476.png)

The photo above was taken last year near Yoyogi Park in Tokyo—some unnamed beautiful building on the edge of the huge park. 

Below is a photo of my current mobile phone, the **Fujitsu F-03L**, alongside my *digital typewriter* from Japan—the **Pomera DM250**. Together, they create a uniquely **disconnected** approach to digital technology, often described as *digital minimalism*.  

![photo](/assets/images/IMG_0975.png)

I've always preferred tools designed for a specific purpose rather than all-in-one devices that try to do everything but ultimately leave you unsatisfied. The smartphone is a prime example. A **dedicated GPS** is better, a **dedicated computer** is better, a **dedicated mobile phone** is better, a **dedicated music player** is better—the list goes on. Yet, the smartphone consolidates all these functions into a single device and does them well... **but at what cost?**  

Constant tracking, advertising, and endless doomscrolling have reshaped how we engage with technology. I remember an internet that felt more like a tool than a distraction, but today, many people struggle to go even a single day completely offline.  

That’s where the **digital typewriter** comes in. It does one thing—word processing—and nothing else. It saves text files, has a battery that lasts for days (or even weeks on standby), and allows me to write for hours without pop-up notifications, distractions, or the temptation to fall down an internet rabbit hole. It’s perfect for drafting ideas or simply getting thoughts down.  

I'll share more about this device—and my views on mobile phones—later.  

That’s it for this word-heavy post—see you soon! またね！