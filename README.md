# SwitchBoard

Human + AI Agent Team OS for the WeMakeDevs x Switch Hackathon.

SwitchBoard is a dashboard that connects human-managed teams (Slack, Discord, Microsoft Teams, Telegram, Gmail) with AI agents via Switch. Switch is open-source infrastructure that puts AI agents into team chat. Every channel becomes a Switch room where agents join like teammates. This dashboard shows every room, agent, message, and task in one place.

## The problem

Solo founders, startup founders, and community managers juggle multiple chat apps, email, and tasks across disconnected tools. AI agents exist but are isolated from team conversations. SwitchBoard brings humans and AI agents into one command center.

## The solution

A unified dashboard that:

- Connects Slack, Discord, Teams, Telegram, and Gmail through Switch
- Shows every Switch room, agent, and message in one inbox
- AI triages messages by intent (bug, request, task, update) and routes them
- Provides a kanban board for tasks sourced from messages, email, or voice
- Lets you approve or reject AI agent actions before they send
- Includes voice capture for speaking tasks into existence (transcription in next phase)

## How Switch fits

Switch is central to this project. Without Switch, the dashboard does not work.

1. Slack, Discord, and Teams channels become Switch rooms
2. AI agents join rooms with their own name and avatar
3. Messages flow into this unified inbox and get routed
4. Agent actions (send email, post message) wait for your approval

Switch runs locally via Docker and exposes an agent protocol (SSE in, HTTP out). This dashboard connects to that local server to read rooms, agents, and messages in real time.

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

## Design system

Dark-first OKLCH color theory:

- No pure black backgrounds (reduces eye strain and halation)
- Layered elevation via lightness steps instead of shadows
- WCAG 2.2 AA contrast compliance
- Perceptually uniform color steps for accessibility
- Full light mode support with automatic system detection

## Getting started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Switch Console (for real Switch integration)
- Docker (for running Switch server locally)

### Installation

1. Clone the repository

   git clone https://github.com/YOUR_GITHUB_ID/switchboard.git
   cd switchboard

2. Install dependencies

   npm install

3. Set up environment variables

   cp .env.example .env.local

   Edit .env.local and add your credentials:

   - NEXT_PUBLIC_SWITCH_SERVER_URL: URL of your local Switch server (default http://localhost:8765)
   - SLACK_BOT_TOKEN: Your Slack bot user OAuth token
   - SLACK_SIGNING_SECRET: Your Slack app signing secret
   - OPENAI_API_KEY or ANTHROPIC_API_KEY: For AI agent provider

4. Run the development server

   npm run dev

5. Open http://localhost:3000

### Connecting real Switch

1. Download and install Switch Console from https://github.com/sandbox-quantum/switch/releases
2. Open Switch Console and select Get started
3. Choose On this computer to start a local server
4. Choose an AI coding agent (Claude Code, Codex, OpenCode, or Cursor)
5. Switch Console opens a chat with switch-buddy
6. Tell switch-buddy to connect your messaging app (Slack, Discord, Teams, etc.)
7. Set NEXT_PUBLIC_SWITCH_SERVER_URL to your local Switch server URL
8. Refresh the dashboard to see live rooms and agents

### Connecting Slack

1. Create a Slack app at https://api.slack.com/apps
2. Under OAuth & Permissions, add Bot Token Scopes:
   - app_mentions:read
   - channels:history
   - chat:write
   - commands
3. Install the app to your workspace
4. Copy the Bot User OAuth Token to SLACK_BOT_TOKEN in .env.local
5. Under Event Subscriptions, enable events and set Request URL to:
   https://your-domain.com/api/slack/events
6. Subscribe to bot events: app_mention, message.channels
7. Add SLACK_SIGNING_SECRET to .env.local

## Project structure

```
switchboard/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard home
│   │   ├── connections/page.tsx  # Switch and app connections
│   │   ├── inbox/page.tsx        # Unified message inbox
│   │   ├── board/page.tsx        # Kanban task board
│   │   ├── agents/page.tsx       # AI agent management
│   │   ├── voice/page.tsx        # Voice capture
│   │   ├── api/
│   │   │   ├── switch/status/    # Switch server status
│   │   │   ├── switch/rooms/     # Switch room list
│   │   │   ├── switch/agents/    # Switch agent list
│   │   │   └── slack/events/     # Slack webhook endpoint
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   └── globals.css           # OKLCH design system tokens
│   ├── components/
│   │   ├── ui/                   # Base UI components (button, card, badge, etc.)
│   │   ├── layout/               # Sidebar, header, theme toggle
│   │   ├── dashboard/            # Stats cards, quick actions
│   │   ├── inbox/                # Unified inbox table
│   │   ├── kanban/               # Kanban board and task cards
│   │   ├── agents/               # AI agent cards
│   │   ├── voice/                # Voice capture UI
│   │   └── connections/          # Switch bridge and platform connections
│   ├── lib/
│   │   ├── switch.ts             # Switch agent protocol client
│   │   ├── slack.ts              # Slack Web API client
│   │   ├── supabase.ts           # Optional persistence client
│   │   └── utils.ts              # Utility functions
│   ├── data/
│   │   └── mock.ts               # Mock data for development
│   └── providers/
│       └── theme-provider.tsx    # Dark/light theme context
├── .env.example                  # Environment variable template
├── README.md                     # This file
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## Available scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Hackathon tracks

This project targets:

- Track 01: Best Business Workflow - practical workflow where people and AI agents get work done
- Side track: Code with Wispr - project built by voice (voice capture feature)

## Contributing

SwitchBoard is built in the open. Contributions are welcome.

### How to contribute

1. Fork the repository
2. Create a feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -m "feat: describe your change")
4. Push to the branch (git push origin feature/your-feature)
5. Open a pull request

### Commit convention

Use conventional commits:

- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting, missing semicolons, etc.
- refactor: code change that neither fixes a bug nor adds a feature
- test: adding missing tests
- chore: changes to the build process or auxiliary tools

### Code style

- TypeScript strict mode
- Prettier for formatting
- ESLint for linting
- Functional components with hooks
- Framer Motion for animations
- OKLCH color tokens for theming

## License

Apache 2.0 + Commons Clause

## Acknowledgments

- Switch by SandboxAQ (https://github.com/sandbox-quantum/switch)
- WeMakeDevs and DevTools Academy for the hackathon
- shadcn/ui for UI component primitives
- Framer Motion for animation library
- Lucide React for icon set
