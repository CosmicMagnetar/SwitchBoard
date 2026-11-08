/**
 * Switch Agent Protocol Client
 *
 * Connects to the local Switch server via Server-Sent Events (SSE).
 * Switch runs locally (Docker) and exposes an agent protocol:
 * SSE in, HTTP out. Any agent that speaks it can join a room.
 *
 * Setup:
 * 1. Run ./setup-switch.sh or docker-compose up -d
 * 2. Set NEXT_PUBLIC_SWITCH_SERVER_URL in .env.local (default: http://localhost:8765)
 * 3. Connect a messaging app via Switch Console
 */

export interface SwitchRoom {
  id: string;
  name: string;
  platform: string;
  bridge: string;
  agents: string[];
  users: string[];
  unread: number;
  lastActivity: string;
  description: string;
}

export interface SwitchAgent {
  id: string;
  name: string;
  description: string;
  status: "active" | "idle";
  room: string;
  provider: string;
  lastRun: string;
  tasksHandled: number;
}

export interface SwitchMessage {
  id: string;
  room: string;
  platform: string;
  sender: string;
  senderType: "human" | "agent";
  content: string;
  timestamp: string;
  status: "unread" | "read";
  intent: string;
  routedTo: string;
}

export interface SwitchConnectionStatus {
  connected: boolean;
  serverUrl: string | null;
  bridge: string | null;
  rooms: number;
  agents: number;
}

const SWITCH_SERVER_URL =
  typeof window !== "undefined"
    ? (window as any).NEXT_PUBLIC_SWITCH_SERVER_URL ||
      process.env.NEXT_PUBLIC_SWITCH_SERVER_URL ||
      "http://localhost:8765"
    : process.env.NEXT_PUBLIC_SWITCH_SERVER_URL || "http://localhost:8765";

class SwitchClient {
  private eventSource: EventSource | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private connected = false;
  private serverUrl: string;

  constructor(serverUrl?: string) {
    this.serverUrl = serverUrl || SWITCH_SERVER_URL;
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: (data: any) => void) {
    this.listeners.get(event)?.delete(callback);
  }

  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach((cb) => cb(data));
  }

  connect() {
    if (this.eventSource) {
      this.eventSource.close();
    }

    try {
      this.eventSource = new EventSource(`${this.serverUrl}/api/stream`);

      this.eventSource.onopen = () => {
        this.connected = true;
        this.emit("connect", { connected: true, serverUrl: this.serverUrl });
        this.scheduleReconnectClear();
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit(data.type, data.payload);
        } catch {
          // Ignore malformed events
        }
      };

      this.eventSource.onerror = () => {
        this.connected = false;
        this.eventSource?.close();
        this.emit("disconnect", { connected: false });
        this.scheduleReconnect();
      };
    } catch (error) {
      this.connected = false;
      this.emit("error", { error });
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, 5000);
  }

  private scheduleReconnectClear() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.eventSource?.close();
    this.eventSource = null;
    this.connected = false;
  }

  async getStatus(): Promise<SwitchConnectionStatus> {
    try {
      const res = await fetch(`${this.serverUrl}/api/status`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) throw new Error("Switch server unreachable");
      return res.json();
    } catch {
      return {
        connected: false,
        serverUrl: this.serverUrl,
        bridge: null,
        rooms: 0,
        agents: 0,
      };
    }
  }

  async getRooms(): Promise<SwitchRoom[]> {
    try {
      const res = await fetch(`${this.serverUrl}/api/rooms`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error("Failed to fetch rooms");
      return res.json();
    } catch {
      return [];
    }
  }

  async getAgents(): Promise<SwitchAgent[]> {
    try {
      const res = await fetch(`${this.serverUrl}/api/agents`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error("Failed to fetch agents");
      return res.json();
    } catch {
      return [];
    }
  }

  async sendMessage(roomId: string, content: string): Promise<void> {
    const res = await fetch(`${this.serverUrl}/api/rooms/${roomId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error("Failed to send message");
  }

  async approveAgentAction(actionId: string): Promise<void> {
    const res = await fetch(`${this.serverUrl}/api/agents/actions/${actionId}/approve`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to approve action");
  }

  async rejectAgentAction(actionId: string): Promise<void> {
    const res = await fetch(`${this.serverUrl}/api/agents/actions/${actionId}/reject`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to reject action");
  }
}

export const switchClient = new SwitchClient();
