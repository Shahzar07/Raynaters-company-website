import React from 'react';

export interface AutomationResult {
  strategy: string;
  emailDraft: string;
  marketData: MarketDataPoint[];
}

export interface MarketDataPoint {
  name: string;
  value: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}