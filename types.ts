import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  metaDescription: string;
  icon: LucideIcon;
  category: 'software' | 'network' | 'security';
  features: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: 'hardware' | 'software' | 'fusion';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
}

export interface TechItem {
  name: string;
  icon: LucideIcon;
  color: string;
}