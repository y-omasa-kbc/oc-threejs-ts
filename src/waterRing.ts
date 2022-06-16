import {WaterRingInfo} from './fixed/waterRingInfo';

//波紋の位置、動作を管理するクラス（一箇所分）
class WaterRing implements WaterRingInfo{

  ////////////////////////
  //波紋が記憶している情報
  centerX: number;  //xの中身は外から伝えられる
  centerY: number;  //yの中身は外から伝えられる
  radius: number;   //波紋の半径 
  opacity: number;  //波紋の不透明度(0だと透明)

  ////////////////////////
  //波紋の持つ機能

  //各種情報の初期化
  //波紋が出現する瞬間に中の処理が動く
  constructor(x: number, y: number){
    this.centerX = x;   //xの中身は外から伝えられる
    this.centerY = y;   //yの中身は外から伝えられる
    this.radius = 3;    //半径は最初3
    this.opacity = 1;   //不透明度は最初1 (100%)
  }

  //出現してから毎フレームごとに動く処理
  //パラパラ漫画の新しいフレームを表示する前に情報を変化させる
  move(): void{
    
  }
}

export {WaterRing};
