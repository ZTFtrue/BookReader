import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-navgation',
  templateUrl: './dialog-navgation.component.html',
  styleUrls: ['./dialog-navgation.component.css']
})
export class DialogNavgationComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<DialogNavgationComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
