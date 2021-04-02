export class Settings {
  fontSizeValue: string;
  openMenuClick: boolean;
  theme: string;
  constructor(fontSizeValue: string, theme: string, openMenuClick: boolean) {
    this.fontSizeValue = fontSizeValue;
    this.theme = theme;
    this.openMenuClick = openMenuClick;
  }
}
