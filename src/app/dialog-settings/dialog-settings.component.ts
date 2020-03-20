import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSliderChange } from '@angular/material';
import { Settings } from '../settings';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.css']
})
export class DialogSettingsComponent implements OnInit {
  value;
  changeValue = -1;
  theme: string;
  constructor(private dialogRef: MatDialogRef<DialogSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Settings,
  ) {
    this.value = data.fontSizeValue.replace('%', '');
  }

  ngOnInit() {
  }

  fontSizeChange(event: MatSliderChange) {
    this.changeValue = event.value;
  }

  formatLabel(value: number) {
    return value + '%';
  }
  dismissDialog(): void {
    this.dialogRef.close(null);
  }
  confirm(): void {
    if (this.changeValue !== -1) {
      this.dialogRef.close(new Settings(this.changeValue + '%', this.theme));
    } else {
      this.dialogRef.close(null);
    }
  }

}
