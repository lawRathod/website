---
title: "What I've Learned About Discrete-Event Simulation"
date: "2026-05-14"
description: "How discrete-event simulation changed the way I think about distributed systems, timing, and reproducibility — and why I'm building my thesis around it"
tags:
  - distributed-systems
  - simulation
  - thesis
  - research
  - systems
category: blog
slug: understanding-des
published: true
---

I've been thinking a lot about discrete-event simulation lately. It's for my master's thesis, but honestly, it's starting to shift how I think about systems in general.

Here's why. Distributed systems fail in really weird ways. Not the obvious stuff — servers going down, networks cutting out. I mean the subtle ones. Retry storms. Timeout cascades. Queue amplification. The kind where things get gradually worse, then suddenly much worse, and by the time you notice, you're already in trouble.

These failures are a nightmare to reproduce. They depend on precise timing, on exactly when a packet arrives, on which goroutine gets scheduled first. You run the same test five times, it fails once, you have no idea why. Change a log line and the bug disappears.

That's what got me looking into DES.

## What it is

DES stands for discrete-event simulation. The idea is simple: instead of simulating time continuously, you jump from one event to the next. A packet arrives, a timer fires, a task completes. Nothing changes between events, so there's nothing to simulate.

It's a natural fit for distributed systems. Almost everything in a distributed system is event-driven — messages, timeouts, scheduling decisions. You don't need dense time steps like you would in a physics simulation. You just need a queue of events and a clock that advances when it's time for the next one.

The scheduler is the core piece. It's really just a priority queue. You pop the earliest event, advance the clock, execute the callback. The callback can schedule more events. That's the loop.

## The superpower

What makes this useful is determinism. A DES scheduler controls three things that are normally unpredictable:

- **Time** — the clock only moves when the scheduler says so
- **Ordering** — when two events happen at the same virtual time, the scheduler picks the order
- **Randomness** — all stochastic decisions come from a seeded source

Same seed, same execution. Every time.

This changes the debugging story completely. Normally you're adding log lines, running in staging, praying you can reproduce whatever went wrong. With DES, you record the exact sequence of events that led to the failure and replay it. Like a DVR for your system. You can pause, look at state, step through event by event.

I think that's pretty powerful.

## The hard part

The tricky bit is making this work with real systems. Most distributed services are written in languages with threading, async runtimes, runtime schedulers — all things that fight against determinism. You need to intercept the right layer and route everything through the simulator without changing the application logic.

This is the direction I'm exploring for my thesis. The core question is: how do you make a Go program believe it's been running for five seconds when only fifty microseconds of wall-clock time have passed? I don't know if it'll work yet, but that's kind of the point.

You can't make everything deterministic. A Go program uses the OS scheduler, reads environment variables, touches the filesystem. What you can do is define a clear boundary and guarantee replayability within it. I've been calling this the **determinism envelope**.

The envelope covers simulated time, seeded randomness, and intercepted network I/O. If your code stays within these, replay is guaranteed. Step outside — read the wall clock, open a real socket — and all bets are off. It's not a limitation, it's a contract.

This framing is still early. I'm testing it against real systems to see where it breaks. That might end up being the more interesting part — finding the edge cases where the envelope doesn't hold and understanding why.

## Other ways to study systems

There are other approaches. You can build formal models with TLA+ or Alloy and prove properties. Chaos engineering lets you run experiments in production and see what breaks. Unit tests with mocked timeouts cover smaller pieces.

DES sits somewhere between these. You're running actual code, so it's more concrete than a formal model. You can reproduce failures deterministically, which gives you more control than chaos experiments. And it goes further than unit tests because you can simulate complex network conditions across whole systems.

I don't think any of these replace each other. They're different tools for different questions.

## Why this matters to me

I got into distributed systems because they feel like the most interesting engineering challenge right now. Everything is distributed, everything fails, and most of the time we're flying blind. DES gives us a way to actually see what's happening.

There's something satisfying about watching a complex system unfold deterministically. Every event, every scheduling decision, every random number is exactly what you asked for. It's the opposite of the usual distributed debugging experience, where you're chasing ghosts.

The current plan for my thesis is to build a framework that takes real Go service logic and runs it under a deterministic simulation. The goal is to find metastable failure states before they hit production. But it's early, and honestly, that direction might shift as I learn more. I'm exploring what's possible, what works, and what doesn't. The framework might not come together the way I'm imagining, and that's fine.

Anyway. That's where I'm at right now. A lot of open questions, but that's the exciting part.
