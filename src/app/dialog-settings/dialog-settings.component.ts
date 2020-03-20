import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSliderChange } from '@angular/material';
import { Settings } from '../settings';

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

  constructor(private dialogRef: MatDialogRef<DialogSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      console.log(data);
      this.valueTemp = data.settings.fontSizeValue.replace('%', '');
      this.value = this.valueTemp;
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
      console.log(this.valueTemp + '%');
      this.rendition.themes.fontSize(this.valueTemp + '%');
    }
    this.dialogRef.close(null);
  }
  confirm(): void {
    if (this.changeValue !== -1 || this.valueTemp !== this.changeValue) {
      this.dialogRef.close(new Settings(this.changeValue + '%', this.theme));
    } else {
      this.dialogRef.close(null);
    }
  }
}
