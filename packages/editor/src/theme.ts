import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

const headerFont = {
  fontFamily: "El Messiri, serif"
}
// A custom theme for this app
const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#006c65',
      light: '#459b93',
      dark: '#00403b',
    },
    secondary: {
      main: '#6c0007',
      light: '#a1382f',
      dark: '#3f0000',
    },
    background: {
      default: blueGrey[50],
    }
  },
  typography: {
    // fontFamily: "Harmattan, sans-serif",
    fontSize: 16,
    h1: headerFont,
    h2: headerFont,
    h3: headerFont,
  }
});

export default theme;
