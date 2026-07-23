---
title: Quietnet
description: Server-less file transfer
role: Solo
startDate: 2024-01-01
endDate: 2024-12-31
tags: [typescript, webrtc]
repoUrl: https://github.com/rileysmith/quietnet
demoUrl: https://quietnet.app
caption: Quietnet — transfer view
bullets:
  - WebRTC data channels, no relay server for the payload
  - End-to-end encrypted; keys never leave the browser
  - Ephemeral by default — nothing stored, nothing logged
featured: true
---

Quietnet moves files between two browsers with nothing in between. You open a link, the other side opens it, and a channel forms directly between you — the file never touches a server.

Everything is encrypted end-to-end and exists only for the life of the tab. Close it and the transfer is gone, by design.
