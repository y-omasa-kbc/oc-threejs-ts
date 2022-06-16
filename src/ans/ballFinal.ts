import {BallInfo} from '../fixed/ballInfo';

//球体の位置、動作を管理するクラス
class BallFinal implements BallInfo{
  ////////////////////////
  //球体が記憶している情報
  x: number;
  y: number;
  deltaX: number;    // 1フレームで動く量(X軸方向)
  deltaY: number;    // 1フレームで動く量(Y軸方向)
  radious: number;   // 玉の半径

  ////////////////////////
  //球体ができる処理

  //各種情報の初期化
  //球体が生まれたときに中の処理が動く
  constructor(x: number, y: number){
      this.x = x;
      this.y = y;
      this.deltaX = 2;
      this.deltaY = 0;
      this.radious = 10;
  }
  move(){
      this.deltaY = this.deltaY - 9.8/60*0.8;

      this.x = this.x + this.deltaX;
      this.y = this.y + this.deltaY;
      
      if(this.y <= 0 + this.radious && this.deltaY < 0){
        this.deltaY = (this.deltaY*0.9) * -1;
      }
  }
}

export { BallFinal };