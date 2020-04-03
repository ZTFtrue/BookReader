import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { Settings } from '../settings';
import { DOCUMENT } from '@angular/common';
import { BookReaderTheme } from './book-reader-theme';
import { MatSelectChange } from '@angular/material/select/select';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.css']
})
export class DialogSettingsComponent implements OnInit {
  valueTemp;
  themeTemp;
  value;
  changeValue = -1;
  rendition;
  selectedTheme: string;
  mainNavigationButtonOpacity = 1;
  lastTheme: string;
  themes: BookReaderTheme[] = [
    { theme: 'bookreader-dark-theme', themeView: '暗黑主题' },
    { theme: 'bookreader-amber-theme', themeView: '木质主题' },
  ];
  constructor(
    private dialogRef: MatDialogRef<DialogSettingsComponent>, public detector: NgZone,
    @Inject(DOCUMENT) private document: Document, @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      console.log(data);
      this.valueTemp = data.settings.fontSizeValue.replace('%', '');
      this.mainNavigationButtonOpacity = data.settings.mainNavigationButtonOpacity;
      this.value = this.valueTemp;
      this.changeValue = this.valueTemp;
      this.themeTemp = this.data.settings.theme;
      this.lastTheme = this.themeTemp;
      this.rendition = data.rendition;
    }
  }

  ngOnInit() {
  }

  fontSizeChange(event: MatSliderChange) {
    this.changeValue = event.value;
    if (this.rendition) {
      // aslo can set px
      this.rendition.themes.fontSize(this.changeValue + '%');
    }
  }

  formatLabel(value: number) {
    return value + '%';
  }
  dismissDialog(): void {
    if (this.rendition) {
      this.rendition.themes.fontSize(this.valueTemp + '%');
      this.detector.run(() => (this.document.body.classList.replace(this.lastTheme, this.themeTemp)));
    }
    this.dialogRef.close(null);
  }
  confirm(): void {
    this.dialogRef.close(new Settings(this.changeValue + '%', this.selectedTheme, this.mainNavigationButtonOpacity));
  }
  changeTheme(theme: string) {
    this.detector.run(() => (this.document.body.classList.replace(this.lastTheme, theme)));
    this.lastTheme = theme;
  }
  onChangeTheme(theme: MatSelectChange) {
    this.changeTheme(theme.value);
  }
}
