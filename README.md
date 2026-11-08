# SwitchBoard

Human + AI Agent Team OS for the WeMakeDevs x Switch Hackathon.

SwitchBoard is a dashboard that connects human-managed teams (Slack, Discord, Microsoft Teams, Telegram, Gmail) with AI agents via Switch. Switch is open-source infrastructure that puts AI agents into team chat. Every channel becomes a Switch room where agents join like teammates. This dashboard shows every room, agent, message, and task in one place.

## Demo mode (default)

The app runs in demo mode out of the box. You will see simulated rooms, agents, messages, and tasks so you can explore the full UI immediately without any setup.

- A **Demo Mode** banner appears on the Dashboard and Connections pages
- All data is mock data for demonstration
- No credentials are required to browse
- Voice capture works in the browser via Web Speech API (Chrome, Edge, Safari)

## Connecting real Switch

Switch is **not hosted by this repo.** It is self-hosted on **your** computer via the Switch Console desktop app.

### Where Switch is hosted

Switch runs locally on your computer, not in the cloud. When you install Switch Console and start a server, it runs at:

```
http://localhost:8765
```

This is the address your dashboard connects to via `NEXT_PUBLIC_SWITCH_SERVER_URL`.

### Setup steps

1. **Install Switch Console** — Download from https://github.com/sandbox-quantum/switch/releases (macOS, Windows, or Linux)
2. **Start the local server** — Open Switch Console, select "On this computer," then "Start." The local server starts at `http://localhost:8765`
3. **Choose an AI agent** — Claude Code, Codex, OpenCode, or Cursor. Switch Console opens a chat with switch-buddy
4. **Connect a messaging app** — Tell switch-buddy to connect Slack, Discord, Teams, Telegram, or Mattermost
5. **Set the environment variable** — Add to `.env.local`:
   ```
   NEXT_PUBLIC_SWITCH_SERVER_URL=http://localhost:8765
   ```
6. **Refresh the dashboard** — Live Switch rooms and agents will appear in the Connections page and flow into the Unified Inbox

### Slack integration

To connect Slack specifically:

1. Create a Slack app at https://api.slack.com/apps
2. Add Bot Token Scopes: `app_mentions:read`, `channels:history`, `chat:write`, `commands`
3. Install the app to your workspace and copy the Bot User OAuth Token
4. Enable Event Subscriptions, set Request URL to `https://your-domain.com/api/slack/events`
5. Subscribe to bot events: `app_mention`, `message.channels`
6. Add `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET` to `.env.local`

## The idea

A solo founder, startup founder, or community manager needs one place to manage everything:

- **Unified inbox** — messages from Slack, Discord, Teams, Telegram, and Gmail flow into one list
- **AI triage** — each message is tagged with intent (bug, request, task, update) and auto-routed to the right person or agent
- **Team board** — Trello-style kanban for tasks sourced from messages, email, or voice
- **AI agents** — agents live in Switch rooms; you review and approve their drafts before they send
- **Voice capture** — record a voice memo, transcribe it in the browser, understand the intent, route it

## How Switch fits (judging criterion: Switch is central)

Switch is central to this project. Without Switch, the dashboard does not work.

1. Slack, Discord, and Teams channels become Switch rooms
2. AI agents join rooms with their own name and avatar
3. Messages flow into this unified inbox and get routed
4. Agent actions (send email, post message) wait for your approval (human-in-the-loop)

## Target audience

Primary user: solo founder, startup founder, or community manager. The dashboard adapts to the person's needs.

## Tech stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS with OKLCH color tokens (dark-first)
- Framer Motion (animations)
- Lucide React (icons)
- shadcn/ui primitives (Radix UI)
- Switch Agent Protocol (SSE client)
- Slack Web API and Events API
- Web Speech API (voice capture, browser-based)

## Design system

Dark-first OKLCH color theory:

- No pure black backgrounds (reduces eye strain and halation)
- Layered elevation via lightness steps instead of shadows
- WCAG 2.2 AA contrast compliance
- Perceptually uniform color steps for accessibility
- Full light mode support with automatic system detection
- Working dark/light/system theme toggle in sidebar and header
- Page transition animations on route changes
- Skeletons for smooth perceived performance

## Getting started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone https://github.com/CosmicMagnetar/SwitchBoard.git
   cd SwitchBoard
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Set up environment variables

   ```
   cp .env.example .env.local
   ```

   Edit `.env.local` — for demo mode no changes are needed. To connect real Switch, set `NEXT_PUBLIC_SWITCH_SERVER_URL=http://localhost:8765`.

4. Run the development server

   ```
   npm run dev
   ```

5. Open http://localhost:3000

6. Tutorial — An embedded tutorial walks you through the dashboard on first visit. It can be dismissed or re-opened.

## Project structure

```
SwitchBoard/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard home (demo mode + page transitions)
│   │   ├── connections/page.tsx  # Switch and app connections + demo mode banner
│   │   ├── inbox/page.tsx        # Unified message inbox
│   │   ├── board/page.tsx        # Kanban task board
│   │   ├── agents/page.tsx       # AI agent management
│   │   ├── voice/page.tsx        # Voice capture (Web Speech API)
│   │   ├── api/
│   │   │   ├── switch/status/    # Switch server status
│   │   │   ├── switch/rooms/     # Switch room list
│   │   │   ├── switch/agents/    # Switch agent list
│   │   │   └── slack/events/     # Slack webhook endpoint
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   └── globals.css           # OKLCH design system tokens
│   ├── components/
│   │   ├── ui/                   # Base UI components (button, card, badge, skeleton, etc.)
│   │   ├── layout/               # Sidebar, header, logo, page transitions, theme toggle
│   │   ├── tutorial/             # Embedded onboarding tutorial overlay
│   │   ├── dashboard/            # Stats cards (memoized), quick actions (memoized)
│   │   ├── inbox/                # Unified inbox table
│   │   ├── kanban/               # Kanban board and task cards
│   │   ├── agents/               # AI agent cards
│   │   ├── voice/                # Voice capture UI (Web Speech API)
│   │   └── connections/          # Switch bridge, demo mode banner, platform connections
│   ├── lib/
│   │   ├── switch.ts             # Switch agent protocol client
│   │   ├── slack.ts              # Slack Web API client (stub for demo)
│   │   ├── supabase.ts           # Optional persistence client
│   │   ├── utils.ts              # Utility functions
│   │   └── performance.ts        # Memo helpers + intersection observer
│   ├── data/
│   │   └── mock.ts               # Mock data for demo mode
│   └── providers/
│       └── theme-provider.tsx    # Dark/light/theme context
├── .env.example                  # Environment variable template
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                # CI: lint, typecheck, build
│   │   └── deploy.yml            # Deploy to Vercel
├── README.md                     # This file
├── CONTRIBUTING.md               # Contribution guide
├── LICENSE                       # Apache 2.0 + Commons Clause
├── TESTING.md                    # Testing & performance documentation
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Available scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Hackathon tracks

This project targets:

- Track 01: Best Business Workflow — practical workflow where people and AI agents get work done
- Side track: Code with Wispr — project built by voice (voice capture feature)

## Contributing

SwitchBoard is built in the open. Contributions are welcome.

### How to contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "type: description"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

### Commit convention

Use conventional commits:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting
- `refactor:` code change that neither fixes a bug nor adds a feature
- `test:` adding missing tests
- `chore:` changes to the build process or auxiliary tools

### Code style

- TypeScript strict mode
- Prettier for formatting
- ESLint for linting
- Functional components with React hooks
- Framer Motion for animations
- OKLCH color tokens in globals.css
- shadcn/ui component patterns
- No emojis in code comments or documentation

## License

Apache License 2.0 + Commons Clause

## Acknowledgments

- Switch by SandboxAQ (https://github.com/sandbox-quantum/switch)
- WeMakeDevs and DevTools Academy for the hackathon
- shadcn/ui for UI component primitives
- Framer Motion for animation library
- Lucide React for icon set
