---
title: Halyard
description: Local-first sync engine
role: Solo
startDate: 2025-01-01
tags: [rust, wasm, crdt]
repoUrl: https://github.com/rileysmith/halyard
caption: Halyard — operation-log inspector
bullets:
  - Deterministic CRDT merge with causal ordering and tombstone GC
  - SQLite-backed storage, identical API in the browser (WASM) and native
  - Sub-millisecond local reads; sync is a background reconciliation, never a blocker
featured: true
---

Halyard started as a frustration: every app I built needed sync, and every sync layer I reached for assumed a server I didn't want to run. Halyard is the opposite — a conflict-free replicated data store that treats the network as optional and the local copy as the source of truth.

The core is a small Rust library compiled to WASM. It keeps an append-only log of operations, merges them deterministically, and exposes a plain key–value and document API on top. Storage is just SQLite, so the same database file works on a laptop, a phone, and a tiny edge worker.
