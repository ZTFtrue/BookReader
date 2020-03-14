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
  @Input() forbidCopy = false;
  @Input() useBrowser = false;
  touchEventStart;
  constructor() {
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: any) {
    const mouse = event.touches[0];
    const pageX = mouse.pageX;
    const pageY = mouse.pageY;
    const screenX = event.view.innerWidth;
    const screenY = event.view.innerHeight;
    if (pageX < screenX / 5) {// 从左往右, 向前 1
      this.touchOnStart.emit(new TouchEmitter(pageX, pageY, screenX, screenY, 1));
    } else if (pageX > screenX * 4 / 5) {// 从右往左, 向后 0
      this.touchOnStart.emit(new TouchEmitter(pageX, pageY, screenX, screenY, 0));
    }
    // event.preventDefault();
  }
  @HostListener('touchend', ['$event']) onTouchEnd(event: any) {
    this.touchOnEnd.emit();
  }
  @HostListener('touchmove', ['$event']) onTouchMove(event: any) {
    const mouse = event.touches[0];
    const pageX = mouse.pageX;
    const pageY = mouse.pageY;
    const screenX = event.view.innerWidth;
    const screenY = event.view.innerHeight;
    if (pageX < screenX / 6) {// 从左往右, 向前 1
      this.touchOnMove.emit(new TouchEmitter(pageX, pageY, screenX, screenY, 1));
    } else if (pageX > screenX * 5 / 6) {// 从右往左, 向后 0
      this.touchOnMove.emit(new TouchEmitter(pageX, pageY, screenX, screenY, 0));
    } else {
      this.touchOnMove.emit(new TouchEmitter(pageX, pageY, screenX, screenY, 2));
    }
    event.preventDefault();
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
