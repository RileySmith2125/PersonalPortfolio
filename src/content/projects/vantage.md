---
title: Vantage
description: Map of Geopolitics
role: Solo
startDate: 2026-01-04
tags: [x-tag, y-tag, z-tag]
repoUrl: https://github.com/rileysmith/halyard
image: ../../assets/projects/vantage.png
imagePosition: '50% 33%'
caption: Halyard — operation-log inspector
bullets:
  - Deterministic CRDT merge with causal ordering and tombstone GC
  - SQLite-backed storage, identical API in the browser (WASM) and native
  - Sub-millisecond local reads; sync is a background reconciliation, never a blocker
featured: true
---

Vantage is an app I created to explore Geopolitics news around the world. It's user driven and exploration-centric. Pan and zoom around the world map and it will populate with news stories from the region you're looking at, each plotted as a pin at its real world location.

If a particular story catches your interest you can save it to a Storyline. A Storyline is like a super-powered bookmark. It saves the story, but it also populates a timeline with past context which includes both news stories and AI summaries of relevant background context. As new developments occur, those will also wind up on the Storyline so that you can continue to track developments.
