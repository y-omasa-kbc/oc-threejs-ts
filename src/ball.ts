import {BallInfo} from './fixed/ballInfo';
//球体の位置、動作を管理するクラス

class Ball implements BallInfo{
  ////////////////////////
  //球体が記憶している情報
  x: number;
  y: number;      
  deltaX: number;   // 1フレームで動く量(X軸方向)
  deltaY: number;   // 1フレームで動く量(Y軸方向)
  radious: number;  // 玉の半径

  ////////////////////////
  //球体の持つ機能

  //各種情報の初期化
  //球体が生まれたときに中の処理が動く
  constructor(x: number, y: number){
      this.x = x;  //xの中身は外から伝えられる
      this.y = y;  //yの中身は外から伝えられる
      this.deltaX = 0;
      this.deltaY = -2;   //移動量がマイナスということは....
      this.radious = 10;  //半径は10
  }

  //出現してから毎フレームごとに動く処理
  //パラパラ漫画の新しいフレームを表示する前に情報を変化させる  
  move(){
      this.x = this.x + this.deltaX;  //x を deltaX 増やす
      this.y = this.y + this.deltaY;  //y を deltaY 増やす
      
      //もし　球体の位置のy座標が0以下 かつ deltaYがマイナスの場合
      if(this.y <= 0 && this.deltaY < 0){
        this.deltaY = this.deltaY * -1; //数値を-1倍する(ということは...)
      }
  }
}

export { Ball };