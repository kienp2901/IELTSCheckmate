import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {MoreVert} from '@mui/icons-material'

// const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];
interface SplitButtonProps {
  options: Array<{ label: string; disabled?: boolean; style?: React.CSSProperties }>;
  onClick: (index: number) => void;
  buttonCount: number;
}

const SplitButton: React.FC<SplitButtonProps> = ({ options, onClick, buttonCount }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const [btnList, setBtnList] = useState<
      { label: string; index: number; disabled?: boolean; style?: React.CSSProperties }[][]
    >([]);
   
    useEffect(()=>{
      const nop = options.map((option, index) => ({
        ...option,
        index,
      }));
      if (options.length) {
        const n1 = nop.slice(0, buttonCount);
        const n2 = nop.slice(buttonCount);
        if (n2.length === 1) {
          n1.push(n2[0]);
          n2.length = 0;
        }
        setBtnList([n1, n2]);
      } else {
        setBtnList([nop, []]);
      }
    },[options,buttonCount]);
  
    const handleClick = (index:number) => {
        setOpen(false);
        onClick(index);
    };
  
   
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: Event) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        {btnList[0]?.map((btn) => (
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ ml: 1, ...btn.style }}
            disabled={btn.disabled}
            onClick={() => handleClick(btn.index)}
            key={btn.index}
          >
            {btn.label}
          </Button>
        ))}
  
        {btnList[1]?.length > 0 && (
          <Button
            ref={anchorRef}
            variant="contained"
            color="primary"
            size="small"
            sx={{ ml: 1 }}
            onClick={handleToggle}
            startIcon={<MoreVert />}
          >
            More
          </Button>
        )}
        <Popper
          sx={{ zIndex: 1 }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {btnList[1]?.map((btn) => (
                      <MenuItem
                        key={btn.index}
                        disabled={btn.disabled}
                        sx={btn.style}
                        onClick={() => handleClick(btn.index)}
                      >
                        {btn.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }

  export default SplitButton;