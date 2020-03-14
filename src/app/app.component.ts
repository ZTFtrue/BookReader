import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { TouchEmitter } from './touch-emitter';
import { DialogNavgationComponent } from './dialog-navgation/dialog-navgation.component';
import { MatBottomSheet, MatDialog, MatDrawer } from '@angular/material';
// import { ePub  } from '@angular/core';
declare var ePub: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  title = 'ReaderBookAngular';
  dragPosition = { x: 0, y: 0 };
  opened = false;
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
      method: 'continuous',
      // method: 'default',
      // manager: 'continuous',
      manager: 'default',
      flow: 'scrolled-doc',
      // flow: 'auto',
      // flow: "paginated",
      width: '100%',
      height: '100%'
    });
    this.rendition.display();
    this.rendition.themes.fontSize('140%');
    this.rendition.hooks.content.register((contents: any) => {
      const el = contents.document.documentElement;
      if (el) {
        // Enable swipe gesture to flip a page
        let start: Touch;
        let end: Touch;

        el.addEventListener('touchstart', (event: TouchEvent) => {
          start = event.changedTouches[0];
        });
        el.addEventListener('click', (event: any) => {
          // const mouse = event.changedTouches[0];
          const clientX = event.clientX;
          const clientY = event.clientY;
          const screenX = event.screenX;
          const screenY = event.screenY;
          if (clientX > screenX / 4 && clientX < screenX * 3 / 4 && clientY > screenY / 4 && clientY < screenY * 3 / 4) {
            this.opened = true;
            event.preventDefault();
          }
        });
        el.addEventListener('touchend', (event: TouchEvent) => {
          end = event.changedTouches[0];
          const screenX = event.view.innerWidth;
          const screenY = event.view.innerHeight;
          const hr = (end.screenX - start.screenX) / screenX;
          const vr = Math.abs((end.screenY - start.screenY) / screenY);
          if (hr > 0.25 && vr < 0.01) { return this.rendition.prev(); }
          if (hr < -0.25 && vr < 0.01) { return this.rendition.next(); }
        });
      }
    });
    //   rendition = book.renderTo("viewer", {
    //     width: "100%",
    //     height: 600
    //   });

    //   rendition.display();

    const keyListener = (e) => {

      // Left Key
      if ((e.keyCode || e.which) === 37) {
        this.rendition.prev();
      }

      // Right Key
      if ((e.keyCode || e.which) === 39) {
        this.nextPage();
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
  touchOnEnd(touchend: TouchEmitter) {
    if (touchend.direction === 0) {
      this.nextPage();
    } else if (touchend.direction === 1) {
      this.previewPage();
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
  }
  selectNavigation(event: any, navigation: any) {
    console.log(navigation);
    const url = navigation.href;
    this.rendition.display(url);
  }

}
