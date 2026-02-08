---
title: "SyncP - Synchronized Media Player"
date: "2021-09-10"
description: "A Python-based synchronized media player using mpv backend for playing local files across multiple hosts and clients"
tags: ["python", "mpv", "networking", "media-player", "synchronization"]
published: true
---

# syncP

## Brief

SyncP (sync player) is a couple of Python scripts that use an mpv backend to play local media files in sync between hosts and clients. A host and a client are needed because it's a serverless app. A host must port-forward so clients can connect and sync media playback. The mpv backend is the core of the project; I was lucky to get a lot of help from [jaseg/python-mpv](https://github.com/jaseg/python-mpv).

In an age of streaming and screen-sharing applications, this project seems un-innovative, and it doesn't do much more than sync playback and listen for events like toggles (play/pause). But living in a third-world country, I don't have access to high-bandwidth, low-latency, unlimited data. Because of this, I had to think of something that wasn't streaming. Screen sharing and streaming both consume a lot of data, and syncP solves that problem entirely by using encoded text messages for communication between hosts and clients.

Initially, this project was limited to one client per host, but now it can have any number of clients. The project is available on **pypi** and can be installed with `pip install syncP`. After installation, `syncp --help` should be enough to get started. Before installing, you must set up mpv for the player to run; a guide is available in the repo at [lawRathod/syncP](https://github.com/lawRathod/syncP).

---

## Typical Use Case

Since it can play any kind of media extension (lovely mpv), you can enjoy watching movies or TV shows or even listening to music with your friends.

---

## Behind the scenes

The three major components of the project are the following scripts:

* host.py
* client.py
* player.py

### Host script

The host script must be started first by a host and will perform the following actions in order:

* Creates the object of the `player` class (inside `player.py`). The class constructor lets the user choose the media file to be played at the very beginning. The function returns a player object, which is later used to control the player.
* Opens a port on the system and binds to it to start listening for connections. The app spawns a thread with a method and the socket passed as a parameter. The port is not forwarded yet and must be done using ngrok or manually using the router.
* The player object returned at the very beginning is used in a method spawned in another thread. Playback is paused at the beginning, and one of the two threads is still waiting for the first connection.
* The moment the socket receives a connection, it's appended to a linked list. This list is shared with `player.py` and all the threads. Every new connection is then appended to the list.
* If any connection is dropped, it's removed from the list.
* Playback is paused every time a connection is added or removed.

These things are done consistently and allow the host to receive connections anytime while the process is running. The data sent between the host and clients are encoded text messages like `"toggle"` on playback toggle and `"sync: time"`, which is a way to sync the time between all the clients and the host. I figured I'd only allow hosts to sync time between connections. When a toggle message is received from a client, the host receives it, sends it to all other connections, and acts as a broadcaster.

The host starts the socket with the `keep_alive` flag to help the connections sustain the life of the media playback and not drop randomly after some time. I found this out the hard way, but the fix was easy and quick to implement.

### Client Script

The client side of the project does very little compared to the host because I felt it should be kept as light as possible, with the host handling most of the complexities. The following happens on the client side:

* It prompts for a host URL and port number on which the host is accepting connections. The last connection is stored in a file in the package repository.
* The user must select the media from the list of files in the current directory at this point.
* After the media is selected, the client tries to connect to the host by spawning a new thread and a separate thread for the player.
* If all goes well, the client receives the player's time from the host to seek on the client.

That's all that happens. Once the connection is set, the app sends a keep-alive message to keep the connection alive, and now the host and client are in sync.

### Player Script

This is the common module between the client and host that enables playback and sync operations. It primarily uses work from [jaseg/python-mpv](https://github.com/jaseg/python-mpv). The player class keeps event listeners, and media file selection tidy and in a module. The constructor brings all the necessary objects to the class for future use. Some event listeners for toggles and keys are also part of this script.

---

## New stuff I learned

This was my first shot at working with a couple of things. Mainly, web sockets and threads took a little time to get used to. I learned how to create a systematic design that could come to life and get things done in the desired way. This was a cute little project for me to hack together in a little time to help me watch stuff with my friends. It's always a little challenging to bake an interface and make design choices when you aren't the only one using the app. This app is CLI-based, and I didn't have to design something as complex as a platform, which saved me a lot of time. I took some things for granted, like the abstractions Python has to offer, and I hope to understand them more deeply.

---

## Things that could've been better

Here's a list of things where I think the app could have shined and provided a better experience. I'm not sure if I'm ever going to implement these because an application is never really "finished."

* **Lack of a UI**. A GUI could have solved this problem with nifty features like drag-and-drop instead of running the app in the directory where the file is located.
* **A single point of truth in a cloud DB**. This would eliminate the need for port forwarding on the host side. Everyone would listen for toggle changes and seek times.
* **A chat window next to the player**.

I can think of many more, but it feels like a rabbit hole where you begin to imagine a completely different thing than what the app is right now.

---

Thank you for making it this far. Have a great day! 😄