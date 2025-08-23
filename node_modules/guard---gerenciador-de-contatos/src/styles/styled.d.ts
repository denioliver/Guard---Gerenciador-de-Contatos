import 'styled-components';
import { theme } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    fontFamily: typeof theme.fontFamily;
    fontSize: typeof theme.fontSize;
    spacing: typeof theme.spacing;
    borderRadius: typeof theme.borderRadius;
    shadows: typeof theme.shadows;
  }
}
