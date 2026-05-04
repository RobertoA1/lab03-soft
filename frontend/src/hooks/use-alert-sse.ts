'use client';

import { useEffect } from 'react';
import { trpc } from '../lib/trpc';

export function useAlertSSE() {
  const utils = trpc.useUtils();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
    const es = new EventSource(`${apiUrl}/alertas/events`);
    es.onmessage = () => {
      utils.alertas.list.invalidate();
      utils.alertas.pendientes.invalidate();
      utils.dashboard.resumen.invalidate();
    };
    es.onerror = () => {
      /* auto-reconnect by browser */
    };
    return () => es.close();
  }, [utils]);
}
