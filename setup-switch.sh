#!/usr/bin/env bash
# setup-switch.sh — Clone and start Switch locally
# Run: chmod +x setup-switch.sh && ./setup-switch.sh

set -e

echo "SwitchBoard — Switch Local Setup"
echo "================================="

# Check Docker
if ! command -v docker &> /dev/null; then
  echo "ERROR: Docker is not installed. Install it first: https://docs.docker.com/get-docker/"
  exit 1
fi

if ! docker info &> /dev/null; then
  echo "ERROR: Docker daemon is not running. Start Docker Desktop or run: sudo systemctl start docker"
  exit 1
fi

echo "Docker is running."

# Check if docker-compose is available
if command -v docker-compose &> /dev/null; then
  COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
  COMPOSE_CMD="docker compose"
else
  echo "ERROR: docker-compose is not available."
  exit 1
fi

echo "Starting Switch stack..."
$COMPOSE_CMD up -d

echo ""
echo "Switch stack is starting."
echo ""
echo "Services:"
echo "  - Switch server: http://localhost:8765"
echo "  - Mattermost:    http://localhost:8065"
echo ""
echo "Next steps:"
echo "  1. Open Switch Console (desktop app) or access http://localhost:8765"
echo "  2. Connect your messaging app (Slack, Discord, Teams, etc.)"
echo "  3. Add NEXT_PUBLIC_SWITCH_SERVER_URL=http://localhost:8765 to .env.local"
echo "  4. Refresh http://localhost:3000 to see live rooms and agents"
echo ""
