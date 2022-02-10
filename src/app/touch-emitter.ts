export class TouchEmitter {
  touchPointX: number;
  touchPointY: number;
  screenX: number;
  screenY: number;
  direction: number; // 1 向前 0 向后 中间 2
  constructor(touchPointX: number,
              touchPointY: number, screenX: number,
              screenY: number, direction: number) {
    this.touchPointX = touchPointX;
    this.touchPointY = touchPointY;
    this.screenX = screenX;
    this.screenY = screenY;
    this.direction = direction;
  }

}
