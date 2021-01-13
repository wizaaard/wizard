import * as styledComponents from 'styled-components';
// import {ComponentType} from 'react';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  // withTheme: styledWithTheme,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export interface IThemeInterface {
  [index: string]: string;
}

export const styledTheme = {
  // colors
  black: '#000',
  primaryColor: '#3970f5',
  titleColor: '#333',
  descColor: '#666',
  secondaryColor: '#f06292',
  thirdColor: '#feca57',
  darkPrimaryColor: '#1565c0',
  green: '#27ae60',
  dark: '#424242',
  shallowPink: '#ff9ff3',
  shallowPrimaryColor: 'rgba(25, 118, 210, 0.1)',
  highRed: '#e91e63',
  translucentPrimary: 'rgb(25, 118, 210, 0.5)',
  translucentWhite: 'rgba(255, 255, 255, 0.5)',
  editorGray: '#f4f4f4',
  shallowGray: '#eeeeee',
  baseGray: '#f7f7f7',
  deepGray: '#cecece',
  deepFlatGray: '#989898',
  redLinearGradient: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  spacing: '10px',
  baseBgColor: '#eceff1',
  codeBgColor: '#23272e',
  codeFontColor: '#9fa8b7',
  shallowBlue: 'rgba(25, 118, 210, 0.08)',
  articleColor: '#2f2f2f',
  quoteBgColor: 'rgba(255, 218, 121,0.2)',
  white: '#fff',
  shallowSecondaryColor: 'rgba(240, 98, 146, 0.1)',
  grayTextColor: 'rgba(0, 0, 0, 0.54)',
  shallowShadow: '0 1px 3px rgba(26,26,26,.1)',
  codeDarkBg: '#1a1c1d',
  codeColor: '#9fa6b3',
  baseShadow:
    '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  darkWhite: 'rgb(214, 211, 205)',
  darkGray: 'rgb(186, 181, 171)',
  shallowGrayBlue: '#f7f9fc',
  descriptionColor: '#70757a',
  fontGray: '#fafafa',
  avatarBgGray: '#bdbdbd',
  grayLineColor: '#7f8c8d',
  successGreen: '#43a047',
  infoBlue: '#618833',
  warnYellow: '#ffa000',
  errorRed: '#d32f2f',
  baseGrayBg: '#f4f5f5',
  blueGrayBg: '#f4f5f9',
  materialGray: '#e8e8e8',
  subTitleColor: '#081123',
  subTitleGray: '#5b6474',
  shallowSubTitleGray: '#c8c7d0',
  mainSecondaryColor: '#66cdc6',
  mainPrimaryColor: '#5241cb',
  lightBlue: '#3451ff',
  flatYellow: '#fdcb6e',
  flatGray: '#f5f5f5',
  flatShadow: '6px 0 6px rgba(0,0,0,.1)',
  flatDark: '#181a1b',
  coffeeGray: '#535c68',
  shallowWhite: 'rgba(255,255,255,0.2)',
  buttonHoverBg: 'rgba(0, 0, 0, 0.1)',
  shallowButtonHoverBg: 'rgba(0, 0, 0, 0.04)',
  headingColor: '#1a1a1a',
  flatGrayText: '#c6c6c6',
  commentColor: '#505050',
  commentGray: '#8a9aa9',
  flatBlack: '#212121',
  excerptGray: '#888888',
  titleGray: '#444',
  codeBlockShadow: '0 10px 30px 0 rgba(0,0,0,0.4)',

  // variables
  heightOmitHeader: 'calc(100% - 48px)',
  headerBarHeight: '48px',
};

export type StyledTheme = typeof styledTheme;
// export const withTheme = <
//   T extends ComponentType<P>,
//   P extends {theme?: IThemeInterface | undefined}
// >(
//   component: T,
// ): any => (styledWithTheme(component as ComponentType<any>) as any) as T;

// type WithTheme<T> = (component: T) => T

export default styled;
export {css, createGlobalStyle, keyframes, ThemeProvider};
