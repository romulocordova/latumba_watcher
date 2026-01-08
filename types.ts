
export interface HourlyData {
  hour: string;
  value: number;
  isLive?: boolean;
}

export interface LocationStatus {
  name: string;
  status: 'Normal' | 'Busy' | 'Spike' | 'Low';
  spikePercentage: number;
  description: string;
  distance?: string;
  popularTimes: HourlyData[];
}

export interface MonitorData {
  primary: LocationStatus;
  nearby: LocationStatus[];
  timestamp: string;
}
