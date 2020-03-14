import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatBottomSheetModule,
  MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TouchScreenEventDirective } from './touch-screen-event.directive';
import { DialogNavgationComponent } from './dialog-navgation/dialog-navgation.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    TouchScreenEventDirective,
    DialogNavgationComponent
  ],
  imports: [
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
    MatRippleModule
  ],
  entryComponents: [
    DialogNavgationComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
