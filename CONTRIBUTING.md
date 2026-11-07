# Contributing to SwitchBoard

Thank you for your interest in contributing to SwitchBoard. This project connects human teams and AI agents through Switch for the WeMakeDevs x Switch Hackathon.

## Code of conduct

This project follows the Switch Code of Conduct. By participating, you agree to abide by its terms.

## How to contribute

### 1. Fork and clone

Fork the repository on GitHub, then clone your fork:

git clone https://github.com/YOUR_GITHUB_ID/switchboard.git
cd switchboard

### 2. Create a feature branch

git checkout -b feature/your-feature-name

### 3. Set up the development environment

npm install
cp .env.example .env.local
npm run dev

### 4. Make your changes

Follow the code style guidelines below. Test your changes by running the build:

npm run build

### 5. Commit your changes

Use conventional commit format:

git commit -m "type: description"

Valid types:

- feat: new feature
- fix: bug fix
- docs: documentation only changes
- style: formatting, missing semicolons, etc.
- refactor: code change that neither fixes a bug nor adds a feature
- perf: code change that improves performance
- test: adding missing or correcting existing tests
- chore: changes to the build process or auxiliary tools

### 6. Push and open a pull request

git push origin feature/your-feature-name

Then open a pull request on GitHub.

## Code style

- TypeScript strict mode
- Prettier with default settings
- ESLint with Next.js config
- Functional components with React hooks
- Framer Motion for animations
- OKLCH color tokens in globals.css
- shadcn/ui component patterns
- No emojis in code comments or documentation

## Design principles

- Dark-first design with OKLCH color theory
- WCAG 2.2 AA contrast compliance
- Layered elevation via lightness, not shadows
- Perceptually uniform color steps
- Animations enhance, never distract
- Human-first microcopy

## Reporting issues

Use GitHub issues to report bugs or request features. Include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Browser and operating system

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0 + Commons Clause.
