import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  SliderProps,
  styled,
  alpha,
  SvgIconProps,
  SvgIcon,
} from "@mui/material";
// import { InboxIcon, MailIcon } from '@mui/icons-material'
import { TreeView, TreeItem } from "@mui/lab";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { Box, Divider } from "@mui/material";
import Exp from "./Exp";
import Button from "@mui/material/Button";
import { useLocation } from "react-router";
// import './sidebar.scss';
import {
  Package,
  ScrollText,
  Handshake,
  ShoppingBasket,
  Users,
  School,
  GraduationCap,
  Boxes,
  TicketCheck,
  Citrus,
  Trophy,
  Construction,
  TrafficCone,
  Car,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Expand,
} from "lucide-react";
import { useNavigate } from "react-router";
import { pageRoutes, ISidebarItem } from "./routes";
import { useUser } from "@/contexts/UserContext";
import {
  CloseFullscreen,
  KeyboardArrowDown,
  KeyboardArrowRight,
  OpenInFull,
} from "@mui/icons-material";

export function ChevronDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 8 5">
      <path
        d="M0.94 0L4 3.09042L7.06 0L8 0.951417L4 5L0 0.951417L0.94 0Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export function ChevronRightIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 5 8">
      <path
        d="M0 0.94L3.09042 4L0 7.06L0.951417 8L5 4L0.951417 0L0 0.94Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

const sidebarWidth = 300;
const sidebarWidthCollapsed = 40;
const CustomMuiListItemButton = ({
  level,
  icon,
  expanded,
  item,
  isSidebarOpen,
  currentSelected,
  onItemClick,
  ...props
}: {
  level?: number;
  icon?: React.ReactNode;
  expanded: boolean;
  item: ISidebarItem;
  isSidebarOpen: boolean;
  currentSelected: ISidebarItem | null;
  onItemClick: (item: ISidebarItem) => void;
} & React.ComponentProps<typeof ListItemButton>) => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  useEffect(() => {
    if (openSubMenu) {
      document.body.classList.add("ro-popover-open");
    } else {
      document.body.classList.remove("ro-popover-open");
    }
  }, [openSubMenu]);

  const hasIcon = icon ? true : false;

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (isSidebarOpen) {
      return;
    }
    if (item?.children && item?.children.length > 0) {
      // console.log('enter',event.currentTarget);
      setAnchorEl(event.currentTarget);
      setOpenSubMenu(true);
    }
    // event.preventDefault();
  };
  const hideMenu = () => {
    if (isSidebarOpen) {
      return;
    }
    // document.body.classList.remove("ro-popover-open");
    setAnchorEl(null);
    setOpenSubMenu(false);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    hideMenu();
  };
  const handleClick = (item: ISidebarItem) => {
    // debugger;
    hideMenu();
    onItemClick(item);
  };

  return (
    <>
      <ListItemButton
        {...props}
        selected={item.selected && (!isSidebarOpen || !item.hasChildren)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(item)}
        sx={{
          pl: isSidebarOpen ? 4 * (level || 0) : item.level == 0 ? 1 : 0,
          "&.pr-selected": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              // backgroundColor: "primary.dark",
              backgroundColor: item.selected && !item.hasChildren ? "#c2c2c2 !important" : "#f8f9fa !important",
            },
          },
          "&:hover": {
              backgroundColor: "unset",
            },
        }}
      >
        {icon && (
          <ListItemIcon
            sx={{
              "&.MuiListItemIcon-root": {
                maxWidth: 32,
                minWidth: 32,
              },
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        {isSidebarOpen && (
          <ListItemText
            primary={props.title}
            sx={{
              // pl: hasIcon ? 0 : 4,
              pl: 0,
            }}
          />
        )}
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={openSubMenu}
        hideBackdrop={true}
        disableScrollLock={true}
        keepMounted={true}
        //  autoFocus={false}
        onClose={handleMouseLeave}
        MenuListProps={{
          onMouseEnter: handleMouseEnter,
          // onMouseOut: handleMouseLeave,
          onMouseLeave: handleMouseLeave,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          left: 0,
          "[&.MuiPaper-root]": {},
        }}
      >
        {item?.children?.map((child: ISidebarItem, index: number) => (
          <MenuItem key={index} onClick={() => handleClick(child)}>
            <ListItemText primary={child.title}></ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// let counter = 0;
// set level depth for each item

const StyledSidebar = styled(Box)(({ theme }) => ({
  ".MuiListItem-root": {
    ".Mui-selected, &.MuiLi-selected": {
      // backgroundColor: theme.palette.primary.main,
      backgroundColor: "#c2c2c2",
      // color: theme.palette.primary.contrastText,
      color: "#000",
      borderRadius: "4px",
      "&:hover": {
        // backgroundColor: theme.palette.primary.dark,
        backgroundColor: "#c2c2c2",
      },
    },
  },
}));

// console.log(sidebarItems);
const SidebarContent = ({
  drawerWidth,
  setDrawerWidth,
}: {
  drawerWidth: number;
  setDrawerWidth: (width: number) => void;
}) => {
  const [expanded, setExpanded] = useState<ISidebarItem | null>(null);
  const [currentSelected, setCurrentSelected] = useState<ISidebarItem | null>(
    null
  );
  const [sidebarItems, setSidebarItems] = useState<ISidebarItem[]>(pageRoutes);
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();

  const filteredSidebarItems = sidebarItems.filter((item) => {
    if (item.title === "Switch workspace") {
      return user?.dataFull && user.dataFull.length > 0;
    }
    if (item.title === "Workshop Management") {
      return user?.is_admin && user?.is_admin == '1';
    }
    return true;
  });

  useEffect(() => {
    if (user?.dataFull && user.dataFull.length > 0) {
      // console.log(sidebarItems);
      var newSidebarItems = sidebarItems.find((item) => {
        return item.title == "Switch workspace";
      });
      var id = 1000;
      if (newSidebarItems && user?.dataFull && user.dataFull.length > 0) {
        newSidebarItems.hasChildren = true;
        newSidebarItems.children = user?.dataFull?.map((item) => {
          return {
            title: `[${item.initial}] ${item.table_name}`,
            link: `${item.url}`,
            hasChildren: false,
            expanded: false,
            id: id++,
          };
        });
        var ns = [...sidebarItems];
        ns.splice(ns.indexOf(newSidebarItems), 1);
        ns.push(newSidebarItems);

        setSidebarItems(ns);
      }
    }
  }, [user]);

  // process route at page load
  useEffect(() => {
    var url = new URL(window.location.href);
    var pathname = url.pathname.split("/").slice(0, 3).join("/");

    var flat = sidebarItems.reduce<ISidebarItem[]>((prev, curr) => {
      if (curr.hasChildren) {
        prev.push(...(curr.children || []));
      } else {
        prev.push(curr);
      }
      return prev;
    }, []);
    var found = flat.filter((item) => {
      return item.link == pathname;
    });

    if (found.length > 0) {
      removeAllSelected(sidebarItems);
      handleSetSelected(found[0]);

      setSidebarItems([...sidebarItems]);
    } else {
      handleSetSelected(sidebarItems[0]);
    }
  }, [location]);

  const handleSetSelected = (item: ISidebarItem | null) => {
    if (item) {
      var it = item;
      it.selected = true;
      var pr = it;
      while (pr.parent) {
        pr = pr.parent;
        pr.selected = true;
        pr.expanded = true;
      }
      if (item.hasChildren) {
        item.expanded = true;
        return handleSetSelected(item.children?.[0] ?? null);
      }
      if (item.parent) {
        item.parent.expanded = true;
      }
      // console.log("handle  xxx   SetSelected",item);

      return it;
    }
    return null;
  };
  const removeAllSelected = (items: ISidebarItem[]) => {
    items.forEach((item) => {
      item.selected = false;
      item.expanded = false;

      if (item.children) {
        removeAllSelected(item.children);
      }
    });
  };
  const removeAllExpanded = (items: ISidebarItem[]) => {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) {
        removeAllExpanded(item.children);
      }
    });
  };

  const onClickItem = (item: ISidebarItem) => {
    var lastState = item.expanded;
    if (item.title == "Help") {
      window.open(item.link, "_blank");
      return;
    }
    const isChildOfSwitchWorkspace = sidebarItems.some(
      (parent) =>
        parent.title === "Switch workspace" && parent.children?.includes(item)
    );
    if (isChildOfSwitchWorkspace) {
      if (item.link) {
        window.open(item.link, "_blank");
      }
      return;
    }
    if (item.hasChildren) {
      removeAllExpanded(sidebarItems);
      item.expanded = !lastState;
    } else {
      removeAllSelected(sidebarItems);

      var navItem = handleSetSelected(item);
      const query = location.search;
      if (navItem?.link) {
        navigate(`${navItem.link}${query}`);
      }
    }
    setSidebarItems([...sidebarItems]);
  };

  const StyleArrowButton = styled(Button)<SliderProps>(({ theme }) => ({
    width: 300,

    // color: theme.palette.success.main,
    "&.MuiButtonBase-root": {
      display: "flex",
      width: 12,
      minWidth: 12,
      height: 12,
      padding: 0,
      // marginLeft: 8,
      margin:0,
      marginRight: '10px !important',
      color: "#000000de",
    },
  }));

  const ShowArrowButton = ({
    item,
    onClick,
  }: {
    item: ISidebarItem;
    onClick: () => void;
  }) => {
    if (item.hasChildren) {
      if (item.expanded) {
        return (
          <StyleArrowButton className="bicon" variant="text" onClick={onClick} sx={{m: 0, margin: "0 !important"}}>
            {/* <ChevronDown className='icon-collapse' /> */}
            <KeyboardArrowDown className="icon-collapse"  style={{margin: "0 !important"}}/>
          </StyleArrowButton>
        );
      }
      return (
        <StyleArrowButton className="bicon" variant="text" onClick={onClick} sx={{m: 0, margin: "0 !important"}}>
          {/* <ChevronRight className='icon-expand' /> */}
          <KeyboardArrowRight className="icon-expand" style={{margin: "0 !important"}} />
        </StyleArrowButton>
      );
    }
    return <StyleArrowButton className="bicon" style={{margin: "0 !important"}} />;
  };
  useEffect(() => {
    if (isSidebarOpen) {
      // sidebarRef.current?.classList.remove('collapsed')
      // sidebarRef.current?.classList.add('expanded');
      setDrawerWidth(sidebarWidth);
    } else {
      // sidebarRef.current?.classList.remove('expanded')
      // sidebarRef.current?.classList.add('collapsed');
      setDrawerWidth(sidebarWidthCollapsed);
    }
  }, [isSidebarOpen]);

  return (
    <>
      <StyledSidebar sx={{ overflow: "hidden" }}>
        <List style={{margin: isSidebarOpen ? '0 10px' : '0'}}>
          <ListItem
            sx={{
              height: 48,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              paddingRight: 0,
              paddingLeft: 0,
            }}
            className={isSidebarOpen ? "expanded" : "collapsed"}
          >
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <CloseFullscreen /> : <OpenInFull />}
            </IconButton>
          </ListItem>
          {filteredSidebarItems.map((item: ISidebarItem, index: number) => (
            <Box key={item.id} sx={{
              "&:hover": {
                backgroundColor: item.selected && !item.hasChildren ? "#c2c2c2 !important" : "#f8f9fa !important",
                cursor: "pointer",         // Thay đổi con trỏ chuột
              },
            }}>
              <ListItem
                disablePadding
                // className={item.selected && !item.hasChildren ? 'MuiLi-selected' : ''}
                sx={{
                  paddingLeft: 0,
                  // px: isSidebarOpen ? 2 : 0,
                  p: 0,
                  // background: 'red'
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    p: 0,
                    // paddingLeft: 0,
                    // alignItems: "center",
                    // px: isSidebarOpen ? 2 : 0, 
                    width: "100%",
                    // background:
                    //   item.selected && !item.hasChildren ? "#c2c2c2" : "",
                    borderRadius: "4px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      paddingLeft: 0,
                      alignItems: "center",
                      // px: isSidebarOpen ? 2 : 0, 
                      px: 0,
                      width: "100%",
                      background:
                        item.selected && !item.hasChildren ? "#c2c2c2" : "",
                      borderRadius: "4px",
                      "&:hover": {
                        backgroundColor: item.selected && !item.hasChildren ? "#c2c2c2 !important" : "#f8f9fa !important",
                        cursor: "pointer",         // Thay đổi con trỏ chuột
                      },
                    }}
                  >
                  {isSidebarOpen &&
                    ShowArrowButton({ item, onClick: () => onClickItem(item) })}
                    <CustomMuiListItemButton
                      expanded={item.expanded}
                      currentSelected={currentSelected}
                      onItemClick={(it) => onClickItem(it || item)}
                      icon={item.icon}
                      title={item.title}
                      level={item.level}
                      item={item}
                      isSidebarOpen={isSidebarOpen}
                      sx={{
                        borderRadius: '4px',
                        "&:hover": {
                          backgroundColor: "red",
                          cursor: "pointer",         // Thay đổi con trỏ chuột
                        },
                      }}
                    />
                </Box>
                  
                </Box>
              </ListItem>
              {isSidebarOpen && item.hasChildren && (
                <Collapse in={item.expanded} timeout="auto">
                  <List component="div" disablePadding style={{marginLeft: '20px'}}>
                    {item.children?.map(
                      (child: ISidebarItem, index: number) => (
                        <ListItem
                          key={child.id}
                          className="sidebar-lv2"
                          disablePadding
                          sx={{ px: 0,"&:hover": {
                            backgroundColor: item.selected && !item.hasChildren ? "#c2c2c2 !important" : "#f8f9fa !important",
                            cursor: "pointer",         // Thay đổi con trỏ chuột
                          }, }}
                        >
                          <Box
                            sx={{
                              borderRadius: "4px",
                              width: "100%",
                              "&:hover": {
                                backgroundColor: item.selected && !item.hasChildren ? "#c2c2c2 !important" : "#f8f9fa !important",
                                cursor: "pointer",         // Thay đổi con trỏ chuột
                              },
                              p: 0
                            }}
                          >
                            <CustomMuiListItemButton
                              expanded={child.expanded ?? false}
                              selected={child.selected}
                              currentSelected={currentSelected}
                              title={child.title}
                              onItemClick={onClickItem}
                              level={child.level}
                              item={child}
                              // icon={child.icon ?? <Box sx={{ width: 24, height: 24, display: 'flex' }} p={0} m={0} />}
                              isSidebarOpen={isSidebarOpen}
                            />
                          </Box>
                        </ListItem>
                      )
                    )}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </StyledSidebar>
    </>
  );
};

export default SidebarContent;
