import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { TouchEmitter } from './touch-emitter';
import { DialogNavgationComponent } from './dialog-navgation/dialog-navgation.component';
import { MatBottomSheet, MatDialog } from '@angular/material';
// import { ePub  } from '@angular/core';
declare var ePub: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  title = 'ReaderBookAngular';
  dragPosition = { x: 0, y: 0 };

  currentSectionIndex = 8;
  // Load the opf
  rendition: any;
  book: any;
  touchEventStart: TouchEmitter;
  touchEventLast: TouchEmitter;
  navigationData: any = null;
  @ViewChild('inputfile', { static: true }) inputfile: ElementRef;
  @ViewChild('mainDiv', { static: false }) mainDiv: ElementRef;
  constructor(
    public dialog: MatDialog,
    public detector: NgZone,
    private bottomSheet: MatBottomSheet,
  ) {
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    // this.rendition.themes.default({ "p": { "font-size": "medium !important"}})
    // this.rendition.themes.register("dark", "themes.css");
    // this.rendition.themes.register("light", "themes.css");
    // this.rendition.themes.register("tan", "themes.css");
    //  this.rendition.themes.default({
    //   h2: {
    //     'font-size': '32px',
    //     color: 'purple'
    //   },
    //   p: {
    //     "margin": '10px'
    //   }
    // });
    // this.rendition.themes.select("dark");
    // const displayed = this.rendition.display('epubcfi(/6/14[xchapter_001]!4/2/24/2[c001p0011]/1:799)');
    // displayed.then((renderer: any) => {
    // });
    // 目录
    // this.book.loaded.navigation.then((toc: any) => {
    //   // console.log(toc);
    // });
  }
  uploadFileClick() {
    this.inputfile.nativeElement.click();
  }
  /*
  * 读取文件内容
  */
  processFiles(file: any): void {
    file = file.target.files[0];
    if (file) {
      console.log(file.path);
      // if (window.FileReader) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);
        this.openBook(e);
      };
      reader.readAsArrayBuffer(file);
      // }
    }
  }
  openBook(e: any) {
    const bookData = e.target.result;
    // var title = document.getElementById("title");
    // var next = document.getElementById("next");
    // var prev = document.getElementById("prev");
    this.book = ePub();
    this.book.open(bookData, 'binary');
    console.log(this.book);
    this.rendition = this.book.renderTo('viewer', {
      // method: 'continuous',
      method: 'default',
      // manager: 'continuous',
      manager: 'default',
      flow: 'scrolled',
      // flow: "paginated",
      width: '100%',
      height: '100%'
    });
    this.rendition.display();
    this.rendition.themes.fontSize('140%');

    //   rendition = book.renderTo("viewer", {
    //     width: "100%",
    //     height: 600
    //   });

    //   rendition.display();

    const keyListener = (e) => {

      // Left Key
      if ((e.keyCode || e.which) === 37) {
        this.rendition.prev();
        console.log('next');
      }

      // Right Key
      if ((e.keyCode || e.which) === 39) {
        this.rendition.next();
        console.log('next');
      }

    };
    this.book.loaded.navigation.then((toc: any) => {
      console.log(toc);
      this.navigationData = toc;
    });
    this.rendition.on('keyup', keyListener);
    this.rendition.on('relocated', (location) => {
      console.log(location);
    });

    //   next.addEventListener("click", function(e){
    //     rendition.next();
    //     e.preventDefault();
    //   }, false);

    //   prev.addEventListener("click", function(e){
    //     rendition.prev();
    //     e.preventDefault();
    //   }, false);
    document.addEventListener('keyup', keyListener, false);
  }
  nextPage() {
    if (this.rendition) {
      this.rendition.next();
    }
  }
  previewPage() {
    if (this.rendition) {
      this.rendition.prev();
    }
  }
  dragEnd($event: CdkDragEnd) {
    // console.log($event.source.getFreeDragPosition());
    console.log($event.distance);
    this.dragPosition = { x: 0, y: 0 };
  }
  touchOnMove(event: TouchEmitter) {
    this.touchEventLast = event;
  }
  touchOnStart(event: TouchEmitter) {
    this.touchEventStart = event;
    console.log(event);
  }
  touchOnEnd() {
    if (this.touchEventLast && this.touchEventStart) {
      console.log(this.touchEventLast);
      console.log(this.touchEventLast.touchPointX);
      // TODO 阻止不相关事件点击
      if (Math.abs(this.touchEventLast.touchPointX - this.touchEventStart.touchPointX) > this.touchEventStart.screenX / 4) {
        if (this.touchEventLast.direction !== this.touchEventStart.direction) {
          if (this.touchEventStart.direction === 0) {
            this.nextPage();
          } else if (this.touchEventStart.direction === 1) {
            this.previewPage();
          }
        }
      }
    }
  }
  onOpenNavigation(event: MouseEvent) {
    this.book.loaded.navigation.then((toc: any) => {
      console.log(toc);
      const bottomRef = this.bottomSheet.open(DialogNavgationComponent, {
        autoFocus: false,
        restoreFocus: false,
        data: toc
      });
      bottomRef.afterDismissed().subscribe(result => {
        if (result) {
          // this.getBookMarks();
        }
      });
    });
    // navigationData


    // dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //         this.getBookMarks();
    //     }
    // });
    // event.preventDefault();
  }
  selectNavigation(event: any, navigation: any) {
    console.log(navigation);
    var url = navigation.href;
    this.rendition.display(url);
  }
}
