import {WaterRingInfo} from '../fixed/waterRingInfo';

//波紋の位置、動作を管理するクラス（一箇所分）
class WaterRingFinal implements WaterRingInfo{
  centerX: number;  //波紋の中央位置(x座標)
  centerY: number;  //波紋の中央位置(y座標)
  radius: number;   //波紋の半径
  opacity: number;  //波紋の透明度合(0だと透明)

  //各種情報の初期化
  //波紋が出現する瞬間に中の処理が動く
  constructor(x: number, y: number){
    this.centerX = x;   //xの中身は外から伝えられる
    this.centerY = y;   //yの中身は外から伝えられる
    this.radius = 3;
    this.opacity = 1;
  }

  //出現してから毎フレームごとに動く処理
  //パラパラ漫画の新しいフレームを表示する前に情報を変化させる
  move(): void{
    this.radius = this.radius + 1;
    this.opacity = this.opacity - 0.01;
  }
}

export {WaterRingFinal};
