---
title: "DNDR - Flutter Reader App"
date: "2020-07-15"
description: "Building my first Flutter mobile application - a reader app with profiles and custom settings"
tags: ["flutter", "dart", "mobile-dev", "cross-platform"]
published: true
---

# dndr

📦

---

> ### Content
>
> - WHY!
> - HOW!
> - WHAT NOW!

## WHY!

Imagine two guys just talking about some tech/framework (very easy to imagine I'm sure) which is fascinating to them and just like anybody else gets too excited to a point where one of them describes an idea for a mini-project on the spot. The descriptions go along the lines of something he himself would want to use and haven't found anything just like that. He proposes that there should be a reader application that should have profiles or some preset settings (like notifications, color tone, brightness. etc.) which are enabled whenever he is in the app, the other guy follows... As they use more words they now have a concept which is what this project is about and the framework in the discussion is a noob-friendly, cross-platform mobile framework we have all heard of, **[flutter](https://flutter.dev)**. Flutter has become very popular and we wanted to try it out. The idea of writing code once and running it on multiple platforms is still very exciting to us and we wanted to give it a try. The guys forget about it the very next day but that's not the point for now. This was **why** this project was built. So let's quickly move on to **how** I built it using flutter and all of what I learned from this very first try at building a mobile application.

---

## HOW!

Finally, the lockdown begins and I decide to come through with this project and write lines of [dart](https://dart.dev/) code. To be honest I was more excited about making this project with vim because I had only become more familiar with this editor. I had to **vim flex**, I am not sorry about it.

#### Setup

- Linux (latest kernel)
- flutter (dev channel)
- neovim with coc-flutter
- Android Studio emulator
- Github and Sourceforge

I ran into numerous problems when Linux kernel v5.6 was released. Flutter hot-reload won't work or even **flutter run** won't work for some while. It was fixed soon but didn't reach the stable channel for long enough time therefore, had to make a switch to the dev channel in flutter.

The best thing about flutter is the availability of packages. The first package I had to use was a pdf viewer which I didn't want to write from scratch, then had to use a package for scrollbar and ended up using more packages than I would like. There's a package for even the tiniest of things with flutter.

#### Packages used:

- permission_handler: ^5.0.0+hotfix.6
- flutter_full_pdf_viewer: ^1.0.6
- path: ^1.7.0
- draggable_scrollbar: ^0.0.4
- flutter_launcher_icons: ^0.7.3
- path_provider: ^1.6.11

The package's names are self-explanatory and it's a very simple app so nothing complex is happening in that department.

#### Beginner’s Bad Luck:

I would have loved a way to modularize/structure the code better and that's how I started in the beginning, turned out it became complex quickly, and then I ended up doing most of the things in a single file (since it’s a tiny app, **very tiny**) and minimum modules. The problem was some package classes were easier to instantiate and use without having a separate file for each. It makes the most sense because the packages in themselves are modules and need not be broken down any further.

One big note, flutter comes with dart so please keep it in mind before installing dart yourself separately, it will only waste disk space.

I spent a little longer on the syntax and testing little things which cost more time in the beginning and weren't necessary. Also didn't plan on how to keep persistent data in the beginning and moved ahead to just make things work and hack around to find the best practices.

I should have spent more time thinking about how I am going to implement persistent data storage on the device. I used basic file i/o operations to achieve that since I had to write a list. List isn’t that complex of a data structure but I would have liked it if I could have done it in a more efficient way. I tried finding a better way but failed. I have this feeling that there is a better way to do what I wanted to do and I ain't giving up looking for one anytime soon.

#### Things which are beautiful about flutter/dart:

I have read how people say dart is such a failed attempt at a coding language but I found it very easy to get started with. The syntax is very familiar to java or c++ and the standard library is rich which makes the development process much faster as well as more efficient. Flutter builds on top of dart and benefits from all of that. Even the memory management is top class with dart.

Async calls on dart worked for me without any hiccups and basically everything during the project had a positive impact on what I feel about mobile app development with flutter. There are a plethora of inbuilt classes for mostly all the purposes I needed.

How everything is so well integrated makes me appreciate the project even more. I learned that when I was trying to understand how to get storage permissions for my app. The declarative nature made a lot of sense to me.

#### Things this app can do:

Everything a typical pdf viewer should do and more.

#### Things I wish it could do:

The things which would have made it a real good app were things like changing the phone sound profile or adjusting the brightness and display tone for the better reading experience, etc. Things like these are the bells and whistles of this project but it's still a good enough utility for someone looking for a very minimal and good looking pdf viewer.

The app cannot share the pdfs with other apps and that's something I want to add very soon as well as better ways to sort all the files in the list. For now, it is sorted based on the last access by the user.

I also am going to refactor the code and add comments for better understanding in the future (I suck at comments as of now; **Update**: I actually refactored the code and added comments, can’t believe myself, haha!).

#### Better flow with Github action:

With this project, I also tried Github actions for the first time and it wasn't as smooth of an experience. All of my work was being committed to the development branch of this project and I wanted to have the apk built and released using Github actions. So that's what I did and that's what has been happening for a while. I triggered it on the push to master which happens when dev is merged or something is pushed on the master branch. During this time I was all set to have the app on GitHub releases but found a simpler way to have the releases on Sourceforge. That's how I used Github actions for the first time with this project.

---

## WHAT NOW!

This tiny little project was my first attempt with flutter and a few more things. There are missing features I would have loved to incorporate and I might do that in future.

I have some more ideas to try with flutter and that's exciting to me. I want to build something that could stream real time audio from a host to multiple clients using socket connections or something similar, I will start to build that very soon, I am still very confused about trying to make it using flutter or try native app development this time. Some more ideas in the pipeline are a **DRINK WATER** alert app along with a browser extension, a multiplayer math game using flutter, and some more.

If you have made it this far I would like to thank you for reading my very informal project entry and in case you want to collaborate with me on anything please feel free reach out, I would love to do that.

_Live long and keep building stuff. Peace out!_
