import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface ListItemData {
  id: string;
  name: string;
  children?: ListItemData[];
}

interface ListItemWithChildrenProps {
  item: ListItemData;
  isOpen: boolean;
  isActive: boolean;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  level: number;
}

const ListItemWithChildren: React.FC<ListItemWithChildrenProps> = ({ 
  item, 
  isOpen, 
  isActive, 
  onToggle, 
  onSelect, 
  level 
}) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton 
          onClick={() => {
            onSelect(item.id);
            if (hasChildren) onToggle(item.id);
          }}
          selected={isActive}
          // sx={{ 
          //   pl: 2 * level,
          //   '&.Mui-selected': {
          //     backgroundColor: 'primary.main',
          //     color: 'primary.contrastText',
          //     '&:hover': {
          //       backgroundColor: 'primary.dark',
          //     },
          //   },
          // }}
        >
          <ListItemText primary={item.name} />
          {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <ListItemWithChildren
                key={child.id}
                item={child}
                isOpen={false}
                isActive={isActive && child.id === item.id}
                onToggle={onToggle}
                onSelect={onSelect}
                level={level + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const ExpandableList: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const handleSelect = (id: string) => {
    setActiveItem(id);
  };

  const items: ListItemData[] = [
    {
      id: '1',
      name: 'Item 1',
      children: [
        { id: '1-1', name: 'Subitem 1.1' },
        { id: '1-2', name: 'Subitem 1.2' },
      ],
    },
    {
      id: '2',
      name: 'Item 2',
      children: [
        { id: '2-1', name: 'Subitem 2.1' },
        { id: '2-2', name: 'Subitem 2.2' },
      ],
    },
    {
      id: '3',
      name: 'Item 3',
      children: [
        { id: '3-1', name: 'Subitem 3.1' },
        { id: '3-2', name: 'Subitem 3.2' },
      ],
    },
  ];

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {items.map((item) => (
        <ListItemWithChildren
          key={item.id}
          item={item}
          isOpen={openItem === item.id}
          isActive={activeItem === item.id}
          onToggle={handleToggle}
          onSelect={handleSelect}
          level={1}
        />
      ))}
    </List>
  );
};

export default ExpandableList;

