---
title: "Building Minidote: A Distributed CRDT System in Elixir"
date: 2026-01-23
author: Prateek
description: "An exploration of building a distributed CRDT system with causal broadcast guarantees in Elixir"
tags:
  - elixir
  - distributed-systems
  - crdt
  - eventual-consistency
  - open-source
category: projects
slug: building-minidote-distributed-crdt-system
github: https://github.com/lawRathod/minidote
---

# Building Minidote: A Distributed CRDT System in Elixir

Distributed systems are hard. The moment you have multiple nodes trying to maintain consistent state, you face the classic CAP theorem tradeoffs. Do you sacrifice availability for consistency, or vice versa? What if you could have both?

That's where **CRDTs** (Conflict-free Replicated Data Types) come in, and why I built **Minidote** - an Elixir implementation of a distributed CRDT system with causal broadcast guarantees.

## The Problem with Distributed State

Traditional distributed systems rely on consensus protocols like Raft or Paxos to maintain consistency. While these provide strong guarantees, they come at a cost: during network partitions, nodes must either stop accepting writes or risk inconsistency.

For many applications - collaborative editors, shopping carts, social media feeds - availability matters more than linearizability. Users expect their actions to work, even if their connection is flaky.

## Enter CRDTs

CRDTs are data structures with a mathematical property: they can be modified independently on different nodes and always merge deterministically to the same state. No coordination required. No conflicts to resolve manually.

Minidote implements six CRDT types:

- **PN-Counter** (operation & state-based): Increment/decrement counters for metrics and tallies
- **Add-Wins Set**: Sets where additions beat concurrent removals - perfect for shopping carts
- **Two-Phase Set**: Sets with permanent deletion guarantees - ideal for blacklists
- **Multi-Value Register**: Preserves concurrent assignments until causality is established
- **Enable-Wins Flag**: Boolean flags where enable beats disable - great for feature toggles

## Architecture

Minidote is built as a layered system:

```
┌─────────────────┐
│  Minidote API   │  ← Simple read/update interface
├─────────────────┤
│ Minidote.Server │  ← CRDT state + vector clocks
├─────────────────┤
│ BroadcastLayer  │  ← Causal ordering guarantees
├─────────────────┤
│   LinkLayer     │  ← Network abstraction + retries
├─────────────────┤
│  Persistence    │  ← Disk logs + state snapshots
└─────────────────┘
```

**Vector clocks** track causal relationships between operations. If Alice's edit depends on Bob's, Minidote ensures Bob's change is applied first on all nodes - even if network delays cause them to arrive out of order.

**Causal broadcast** propagates updates to all nodes while respecting these dependencies. Operations are logged to disk before broadcasting, enabling crash recovery through log replay.

## Real-World Testing

The test suite includes scenarios modeling actual distributed applications:

- **Collaborative document editing** with multiple concurrent users
- **E-commerce shopping carts** with inventory management
- **Social media platforms** simulated across 10 nodes
- **Crash recovery** with persistent operation logs

## Honest Limitations

Minidote is a learning project that demonstrates CRDT principles, not a production-ready database. Current limitations include:

- **No anti-entropy**: Operations lost during partitions aren't synchronized later
- **No bootstrap protocol**: New nodes start with empty state
- **Potential permanent divergence**: Partitioned nodes may never fully converge

These are deliberate simplifications to keep the codebase understandable.

## Built With AI Assistance

This project was developed with AI assistance using Claude Code and Windsurf. The experience demonstrated how AI tools can accelerate systems programming work while maintaining code quality.

## Try It Out

Minidote is open source and available on GitHub:

**[github.com/lawRathod/minidote](https://github.com/lawRathod/minidote)**

The repository includes comprehensive documentation on the design, broadcast model, and testing infrastructure. Clone it, run `mix test`, and explore how CRDTs enable distributed systems that are both available and eventually consistent.
