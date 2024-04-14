export interface QuickActionProps {
  command?: string;
  icon: string;
  type: string;
  close?: boolean;
  items?: { label: string; command: string; }[];
  active?: boolean;
}