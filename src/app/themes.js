import { createMuiTheme } from '@material-ui/core/styles';

const themes = {
  light: createMuiTheme({
    palette: {
      type: 'light',
    },
  }),
  dark: createMuiTheme({
    palette: {
      type: 'dark',
    },
  }),
};

export default themes;
