import { createTheme } from '@mui/material/styles';
import { red,grey } from '@mui/material/colors';

import { CssVarsPalette } from '@mui/material/styles/createThemeWithVars';

interface Components {
  Link?: {
    styleOverrides?: {
      root?: React.CSSProperties
      label?: React.CSSProperties
      value?: React.CSSProperties
      editContainer?: React.CSSProperties
    }
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    grey500: Palette['primary'];
    Approved: Palette['primary'];
    Inactive: Palette['primary'];
    Pending: Palette['primary'];
    Rejected: Palette['primary'];
    cancel: Palette['primary'];
  }
  interface PaletteOptions {
    grey500?: PaletteOptions['primary'];
    Approved?: PaletteOptions['primary'];
    Inactive?: PaletteOptions['primary'];
    Pending?: PaletteOptions['primary'];
    Rejected?: PaletteOptions['primary'];
    cancel?: PaletteOptions['primary'];
  }




}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    grey500: true;
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    Approved: true;
    Inactive: true;
    Pending: true;
    Rejected: true;
  }
 
}
let theme = createTheme();
// A custom theme for this app
theme = createTheme(theme,{
  cssVariables: true,
  typography: {
    fontFamily:
      'sans-serif,"segoe ui","Yellowtail", cursive',
  },
  
  palette: {
    // primary: {
    //   // main: '#556cd6',
    // },
    // secondary: {
    //   // main: '#19857b',
    // },
    // clone sucess color
    cancel:{
      main:theme.palette.error.main,
      contrastText:theme.palette.error.contrastText,
    },
    grey500:theme.palette.augmentColor({
      color: {
        light: grey[200],
        main: grey[300],
        dark: grey[500],
        contrastText: theme.palette.grey[800],
      },
      name: 'grey500',
    }),
    

    Approved: {
      main: theme.palette.success.main,
      contrastText: theme.palette.success.contrastText,
    },
    Inactive: {
      main: theme.palette.grey[900],
      contrastText: theme.palette.grey[50],
    },
    Pending: {
      main: theme.palette.info.main,
      contrastText: theme.palette.info.contrastText,
    },
    Rejected: {
      main: theme.palette.error.main,
      contrastText: theme.palette.error.contrastText,

    },
    error: {
      main: red.A400,
    },
  },
  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: '500'
        },
      },
    },


    // MuiListItemButton:{
    //     styleOverrides: {
    //         selected: {
    //           backgroundColor: 'primary.main',
    //           color: 'primary.contrastText',
    //           '&:hover': {
    //             backgroundColor: 'primary.dark',
    //           },
    //         },
    //       },

    // },


  },
});

export default theme;
