# M.A.R.A. WebSocket

> **Project Status: Discontinued / Portfolio Archive**

M.A.R.A. (Moto Auto Road Assistant) was my first major software project, created to bring together automotive and motorcycle enthusiasts, workshops, events, and related services.

## What This Repository Contains

The real-time service of M.A.R.A., which kept connected users in sync.

## Tech Stack

- Node.js and TypeScript
- `ws` (WebSocket server) on top of Express
- Mongoose
- Zod for message validation

## Main Features

- Per-user WebSocket connections
- Sharing the geolocation of connected users
- Sending user data updates to connected clients

## Project Status

- The project is **discontinued** and no longer maintained.
- The production services of M.A.R.A. have been shut down.
- This repository is preserved for reading and reference only.
- Some external integrations (Firebase, push notifications, SMS, maps, and similar third-party services) may no longer work.
- The code is not intended to run in production without additional setup, new credentials, and new infrastructure.

## Why This Repository Is Public

The project was eventually discontinued because it was no longer relevant to my current priorities. I decided to preserve the source code as part of my development portfolio, documenting my early experience in building and maintaining a multi-component software product.

M.A.R.A. consisted of four repositories: `MARA-app` (mobile app), `MARA-api` (backend), `MARA-web` (web part), and `MARA-websocket` (real-time service).

No license has been chosen for this repository, so all rights are reserved by the author.
