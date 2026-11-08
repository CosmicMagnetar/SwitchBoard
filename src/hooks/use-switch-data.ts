"use client";

import { useState, useEffect, useCallback } from "react";
import { switchClient } from "@/lib/switch";
import type { SwitchRoom, SwitchAgent, SwitchConnectionStatus } from "@/lib/switch";
import { MOCK_ROOMS, MOCK_AGENTS, MOCK_MESSAGES, MOCK_TASKS } from "@/data/mock";

export function useSwitchData() {
  const [status, setStatus] = useState<SwitchConnectionStatus>({
    connected: false,
    serverUrl: null,
    bridge: null,
    rooms: 0,
    agents: 0,
  });
  const [rooms, setRooms] = useState<SwitchRoom[]>([...MOCK_ROOMS] as unknown as SwitchRoom[]);
  const [agents, setAgents] = useState<SwitchAgent[]>([...MOCK_AGENTS] as unknown as SwitchAgent[]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [sStatus, sRooms, sAgents] = await Promise.all([
        switchClient.getStatus(),
        switchClient.getRooms(),
        switchClient.getAgents(),
      ]);

      setStatus(sStatus);
      const connected = sStatus.connected;
      setIsDemo(!connected);
      setRooms(connected ? sRooms : ([...MOCK_ROOMS] as unknown as SwitchRoom[]));
      setAgents(connected ? sAgents : ([...MOCK_AGENTS] as unknown as SwitchAgent[]));
    } catch {
      setIsDemo(true);
      setRooms([...MOCK_ROOMS] as unknown as SwitchRoom[]);
      setAgents([...MOCK_AGENTS] as unknown as SwitchAgent[]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Poll every 30 seconds for updates
    const timer = setInterval(fetchData, 30000);
    return () => clearInterval(timer);
  }, [fetchData]);

  const reconnect = useCallback(() => {
    switchClient.connect();
    fetchData();
  }, [fetchData]);

  return {
    status,
    rooms,
    agents,
    messages: MOCK_MESSAGES,
    tasks: MOCK_TASKS,
    isLoading,
    isDemo,
    reconnect,
  };
}
