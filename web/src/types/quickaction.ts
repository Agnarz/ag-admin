export interface QuickActionProps {
  command: string;
  icon: string;
  type: string;
  close?: boolean;
  items?: Array<{ label: string; command: string; }>;
  active?: boolean;
};