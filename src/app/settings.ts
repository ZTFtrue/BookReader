export class Settings {
  fontSizeValue: string;
  theme: string;
  mainNavigationButtonOpacity: number;
  constructor(fontSizeValue: string, theme: string, mainNavigationButtonOpacity: number) {
    this.fontSizeValue = fontSizeValue;
    this.theme = theme;
    this.mainNavigationButtonOpacity = mainNavigationButtonOpacity;
  }
}
