import React from 'react';
import { ScrollText, Package, Handshake, School, 
  GraduationCap, Users,
  LayoutGrid,
  Medal,
  Telescope,
  User,
  FolderSync,
  CircleHelp,
  
  Boxes, TicketCheck, Citrus, Car, Trophy, TrafficCone, ShoppingBasket, SquareKanban, BookOpen,BookCheck, Book } from 'lucide-react';
import { title } from 'process';
import { Rocket, CalendarMonth, Work } from '@mui/icons-material';

export interface ISidebarItem {
  title: string;
  icon?: React.ReactNode;
  children?: ISidebarItem[];
  selected?: boolean;
  expanded: boolean;
  level?: number;
  id?: number;
  link?: string;
  parent?: ISidebarItem;
  hasChildren: boolean;
}

export const pageRoutes: ISidebarItem[] = [
  {
    title: 'Calendar',
    link: `/${process.env.PREFIX}/admin/calendar`,
    icon: <CalendarMonth />,
    children: []
  },
  {
    title: 'Workshop Management',
    link: `/${process.env.PREFIX}/admin/workshop-management`,
    icon: <Work />,
    children: []
  }
] as any;

var counter = 0;

const setLevelDepth = (item: ISidebarItem, level: number, parent?: ISidebarItem) => {
  item.level = level;
  item.hasChildren = false;
  item.expanded = false;
  item.id = counter++;
  if (parent) {
    item.parent = parent;
  }
  if (item.children && item.children.length > 0) {
    item.hasChildren = true;
    item.children.forEach(child => setLevelDepth(child, level + 1, item));
  }
}

pageRoutes.forEach(item => setLevelDepth(item, 0));