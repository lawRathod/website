---
title: "bgrem — Running AI Background Removal Entirely in the Browser"
date: "2026-04-05"
description: "Building a PWA that runs Hugging Face background-removal models in the browser using ONNX and WebAssembly — no server, no uploads, everything local"
tags:
  - ai
  - webassembly
  - onnx
  - pwa
  - huggingface
  - machine-learning
  - browser
category: blog
slug: bgrem-browser-background-removal
published: true
---

I've been thinking a lot about what it means to run AI models without a server. Not in the abstract "edge computing" sense, but literally just in the browser, on your own machine, with nothing leaving your computer. That's what bgrem is.

It's a small PWA that runs Hugging Face's background-removal models entirely client-side using ONNX Runtime and WebAssembly. You drop an image in, it generates a mask, and you download it. No uploads, no API keys, no server costs. Just your browser doing the work.

I didn't set out to build the most sophisticated background removal tool. I wanted to see what's actually possible right now in the browser, with real models, on real hardware.

## How it works

The app uses `@huggingface/transformers` to load ONNX models and run inference through WebAssembly. When you open the page, the model downloads and caches locally. After that, everything runs offline.

There are multiple models available — ISNet-ONNX, RMBG-1.4, and MODNet — each with different tradeoffs between size, speed, and quality. You pick one, load an image, and hit generate. The model processes it in the browser and returns a mask PNG.

I also added a benchmark mode that runs all models sequentially against the same image and shows you a comparison table with load times, inference times, and sizes. It's useful if you're trying to figure out which model works best for your use case.

## Why no server

The obvious question is why not just send the image to a server and get the result back. There are a few reasons.

Privacy is the main one. You're not uploading your images anywhere. They stay on your machine the entire time. For a lot of use cases, that matters more than people think.

Then there's the cost thing. Running inference on a server means GPUs, infrastructure, scaling, all of that. Running it in the browser means the user's machine does the work, and it's free. The tradeoff is speed — it's not going to be as fast as a GPU server — but for a lot of cases, it's fast enough.

And honestly, I just wanted to see if it could be done well. The answer is yes, with some caveats.

## What I learned

Working with ONNX in the browser is not something I had done before. The Hugging Face transformers library makes it surprisingly straightforward, but there are still details you need to figure out. WASM paths, model loading states, keeping the UI responsive during inference — all of that takes some thought.

One thing that surprised me is how well it works as a PWA. Once the model is cached, the whole thing runs offline. You can close the tab, come back later, and it just works. The service worker handles caching the app shell and the model files, so there's no need to re-download anything.

I also spent time on the UI side of things. There's a network status LED that shows whether you're online, fetching, or offline-ready. Side-by-side preview for the original and the mask. Zoom overlay for inspecting details. Small things, but they make the experience feel more polished.

## The models

Each model has its own characteristics. ISNet-ONNX is a good balance of quality and speed. RMBG-1.4 tends to produce cleaner edges but takes a bit longer. MODNet is lighter and faster but sometimes misses finer details.

The benchmark mode lets you see these differences directly. Load an image, run all models, compare the results. It's not a scientific benchmark — it's just one image on your machine — but it gives you a sense of what to expect.

## Where it's going

Right now it does one thing: remove backgrounds and export masks. I'm not sure there's much more to add honestly. Maybe more models over time as better ones become available. Maybe some quality-of-life improvements.

But I think the interesting part isn't the feature set. It's the approach. Running AI models in the browser changes the whole equation. No server, no data collection, no costs. Just code running on your machine.

That feels like the right direction for a lot of tools.

The app is live at [experiments.prats.page/bgrem](https://experiments.prats.page/bgrem) and the code is on [GitHub](https://github.com/lawRathod/bgrem) if you want to look at how it's put together.

---

Thank you for making it this far. Have a great day! 😄
