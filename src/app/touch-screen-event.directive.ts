import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { TouchEmitter } from './touch-emitter';

@Directive({
  selector: '[appTouchScreenEvent]'
})
export class TouchScreenEventDirective {

  elementMouseMove = false;
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  @Output() mouseMove = new EventEmitter();
  @Output() mouseDown = new EventEmitter();
  @Output() mouseUp = new EventEmitter();
  @Output() mouseLeave = new EventEmitter();
  @Output() mouseMoveEnd = new EventEmitter();
  @Output() touchOnMove = new EventEmitter();
  @Output() touchOnStart = new EventEmitter();
  @Output() touchOnEnd = new EventEmitter();
  @Output() onclick = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();
  @Input() forbidCopy = false;
  @Input() useBrowser = false;
  touchEventStart;
  start;

  constructor() {
  }
  @HostListener('click', ['$event']) onClickEvent(event: any) {
    console.log(event);
    const pageX = event.pageX;
    const pageY = event.pageY;
    const screenX = event.view.innerWidth;
    const screenY = event.view.innerHeight;
    if (pageX > screenX / 5 && pageX < screenX * 4 / 5) {
      this.onclick.emit(event);
      event.preventDefault();
    }
  }
  @HostListener('window:keyup', ['$event']) onKeyUpEvent(event: any) {
    // Left Key
    console.log(event);
    if ((event.keyCode || event.which) === 37) {
      this.onKeyUp.emit(0);
      //  this.previewPage();
    }
    // Right Key
    if ((event.keyCode || event.which) === 39) {
      this.onKeyUp.emit(1);
      //  this.nextPage();
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any) {
    this.start = event.changedTouches[0];
  }
  @HostListener('touchend', ['$event']) onTouchEnd(event: any) {
    const end = event.changedTouches[0];
    const screenX = event.view.innerWidth;
    const screenY = event.view.innerHeight;
    const hr = (end.screenX - this.start.screenX) / screenX;
    const vr = Math.abs((end.screenY - this.start.screenY) / screenY);
    if (hr > 0.25 && vr < 0.2) {
      this.touchOnEnd.emit(new TouchEmitter(0, 0, screenX, screenY, 1));
    }
    if (hr < -0.25 && vr < 0.2) {
      this.touchOnEnd.emit(new TouchEmitter(0, 0, screenX, screenY, 0));
    }
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.mouseWheelFunc(event);
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: any) {
    if (!this.useBrowser) {
      if (this.elementMouseMove) {
        this.mouseMove.emit(event);
      }
    }
  }
  @HostListener('mousedown', ['$event']) onMouseDown(event: any) {
    this.mouseDown.emit(event);
    if ((event.button === 0 && !this.forbidCopy) || event.button === 2 || event.button === 1) {
      this.elementMouseMove = true;
    }
  }
  @HostListener('mouseleave', ['$event']) onMouseLeave(event: any) {
    // this.mouseWheelFunc(event);
    this.mouseMoveEnd.emit(event);
    this.mouseLeave.emit(event);
    this.elementMouseMove = false;
  }
  @HostListener('mouseup', ['$event']) onMouseUp(event: any) {
    this.mouseMoveEnd.emit(event);
    this.mouseUp.emit(event);
    this.elementMouseMove = false;
  }
  @HostListener('contextmenu', ['$event']) onContextMenu(event: any) {
    event.preventDefault();
  }
  mouseWheelFunc(event: any) {
    if (!this.useBrowser) {
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      if (delta > 0) {
        this.mouseWheelUp.emit(event);
      } else if (delta < 0) {
        this.mouseWheelDown.emit(event);
      }
      event.preventDefault();
    }
  }

}
