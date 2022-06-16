import * as THREE from 'three'
import { BallInfo } from './ballInfo';
import { Ball } from '../ball';
import { BallFinal } from '../ans/ballFinal';
import { WaterRingInfo } from './waterRingInfo';
import { WaterRingDisplay } from './waterRingDisplay';
import { WaterRing } from '../waterRing';
import { WaterRingFinal } from '../ans/waterRingFinal';

const canvasWidth = 1024;
const canvasHeight = 400;
const scene = new THREE.Scene()

scene.add(new THREE.AxesHelper(100))

const canvas1 = document.getElementById('c1') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer()
const renderer2 = new THREE.WebGLRenderer()
if(canvas1 != null){
    renderer.setSize(canvasWidth, canvasHeight)
    canvas1.appendChild(renderer.domElement)

    const canvas2 = document.getElementById('c2') as HTMLCanvasElement;
    renderer2.setSize(canvasWidth, canvasHeight)
    canvas2.appendChild(renderer2.domElement)
}

console.log(document.getElementById('c3'));
const canvas3 = document.getElementById('c3') as HTMLCanvasElement;
//canvas3は完成図表示画面
if(canvas3 != null){
    renderer.setSize(canvasWidth, canvasHeight)
    canvas3.appendChild(renderer.domElement)
}

//カメラ1
const fieldWidth = 500;
const fieldHeight = 500/canvasWidth*canvasHeight;
const camera = new THREE.OrthographicCamera(-fieldWidth/2, fieldWidth/2, fieldHeight/2, -fieldHeight/2, 0.1, 2000)
camera.position.x = -20;
camera.position.y = 150;
camera.position.z = 400;
camera.lookAt(new THREE.Vector3(280, 50 , 0) );

//カメラ2
const camera2 = new THREE.OrthographicCamera(-fieldWidth/1.8, fieldWidth/1.8, fieldHeight/1.8, -fieldHeight/1.8, 0.1, 2000)
camera2.position.x = 250;
camera2.position.y = 50;
camera2.position.z = 600;
camera2.lookAt(new THREE.Vector3(250, 60 , 0) );

//光源関係
const light = new THREE.AmbientLight( 0xffffff, 0.8 )
scene.add(light)

const light2 = new THREE.DirectionalLight( 0xffffff, 1 );
light2.position.set(500, 5000, 0)
scene.add(light2)

//平面
const planeMaterial = new THREE.MeshLambertMaterial()
const planeTexture = new THREE.TextureLoader().load('img/tile2.png')
planeMaterial.map = planeTexture;
const planeGeometry = new THREE.PlaneGeometry(900, 900)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -Math.PI/2;
plane.position.x = 350;
plane.position.z = 0;
scene.add(plane)

//球体
const material = new THREE.MeshPhysicalMaterial();
material.reflectivity = 1
material.transmission = 1.0
material.roughness = 0.5
material.metalness = 1
material.clearcoat = 0.3
material.clearcoatRoughness = 0.5
material.color = new THREE.Color(0xffffff)
material.emissive = new THREE.Color(0x909090)
material.ior = 1.2
material.thickness = 10.0

const geometry = new THREE.SphereGeometry(20,30,30)
const ball = new THREE.Mesh(geometry, material)
ball.position.y = 150;

scene.add(ball)

//球体の位置管理クラスの生成
let ballInfo:BallInfo = new Ball(0, 150);
//canvas3は完成図表示画面　情報管理クラスを完成状態で差替え
if(canvas3 != null){
    ballInfo = new BallFinal(0, 150);
}

//フレーム処理
let rings: WaterRingDisplay[] = Array();
function animate() {
    requestAnimationFrame(animate)
    var prevDelta = ballInfo.deltaY;
    ballInfo.move();

    ball.position.y = ballInfo.y;
    ball.position.x = ballInfo.x;

    //y軸移動方向が逆転し、上向きになったら
    if(prevDelta*ballInfo.deltaY < 0 && ballInfo.deltaY > 0){
        //リングの内部情報管理クラス生成
        var ringinfo: WaterRingInfo = new WaterRing(ballInfo.x, ballInfo.y);
        //canvas3は完成図表示画面　情報管理クラスを完成状態で差替え
        if(canvas3 != null){
            ringinfo = new WaterRingFinal(ballInfo.x, ballInfo.y);
        }
        //リングを生成
        rings.push( new WaterRingDisplay(ball.position.x,0,ringinfo,scene) );
    }
    //リングに動作させる
    for(let i = 0; i < rings.length; i++){
      rings[i].animate();
    }
    render()
}

function render() {
    //canvas1は学生用画面（canvas1,canvas2がある）
    if(canvas1 != null){
        renderer.render(scene, camera)
        renderer2.render(scene, camera2)
    }
    //canvas3は完成図表示画面
    if(canvas3 != null){
        renderer.render(scene, camera)
    }
}

animate()