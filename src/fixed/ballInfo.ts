interface BallInfo {
  x: number;
  y: number;
  deltaX: number;    // 1フレームで動く量(X軸方向)
  deltaY: number;    // 1フレームで動く量(Y軸方向)
  radious: number;   // 玉の半径
  move(): void;
}

export { BallInfo };