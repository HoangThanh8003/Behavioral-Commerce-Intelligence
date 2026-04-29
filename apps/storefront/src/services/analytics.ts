const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface GlobalActivityEvent {
  id: string;
  type: string;
  payload: any;
  timestamp: string;
  user: { id: string };
}

export async function getGlobalActivity(): Promise<GlobalActivityEvent[]> {
  try {
    const response = await fetch(`${API_URL}/analytics/global-activity`, {
      cache: 'no-store', // Always get fresh data for real-time feel
    });

    if (!response.ok) {
      throw new Error('Failed to fetch global activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Analytics fetch failed:', error);
    return [];
  }
}
