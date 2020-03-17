import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatDialogModule, MatBottomSheetModule,
  MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule,
   MatInputModule, MatCheckboxModule, MatProgressBarModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TouchScreenEventDirective } from './touch-screen-event.directive';
import { DialogNavgationComponent } from './dialog-navgation/dialog-navgation.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TouchScreenEventDirective,
    DialogNavgationComponent,
    SearchDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatRippleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  entryComponents: [
    DialogNavgationComponent,
    SearchDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
