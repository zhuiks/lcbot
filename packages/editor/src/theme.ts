import { createMuiTheme } from '@material-ui/core/styles';

const headerFont = {
  fontFamily: "El Messiri, serif"
}
// A custom theme for this app
const theme = createMuiTheme({
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
    },
    typography: {
      fontFamily: "Harmattan, sans-serif",
      h1: headerFont,
      h2: headerFont,
      h3: headerFont,
    }
  });

export default theme;
