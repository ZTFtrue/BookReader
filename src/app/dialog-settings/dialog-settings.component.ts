import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { Settings } from '../settings';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.css']
})
export class DialogSettingsComponent implements OnInit {
  valueTemp;
  value;
  changeValue = -1;
  theme: string;
  rendition;
  mainNavigationButtonOpacity = 1;
  constructor(
    private dialogRef: MatDialogRef<DialogSettingsComponent>,
    @Inject(DOCUMENT) private document: Document, @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      console.log(data);
      this.valueTemp = data.settings.fontSizeValue.replace('%', '');
      this.mainNavigationButtonOpacity = data.settings.mainNavigationButtonOpacity;
      this.value = this.valueTemp;
      this.changeValue = this.valueTemp;
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
    }
    this.dialogRef.close(null);
  }
  confirm(): void {
    this.dialogRef.close(new Settings(this.changeValue + '%', this.theme, this.mainNavigationButtonOpacity));
  }
  changeTheme(event, theme: string) {
    this.document.body.classList.toggle(theme);
  }
}
