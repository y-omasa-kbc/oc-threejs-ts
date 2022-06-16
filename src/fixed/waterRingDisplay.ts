import * as THREE from 'three'
import { WaterRingInfo } from './waterRingInfo';

class WaterRingDisplay{
  info: WaterRingInfo;
  rings : THREE.Mesh[] = new Array(2);
  material: THREE.MeshPhysicalMaterial;

  constructor(centerX: number, centerY: number, info: WaterRingInfo, scene: THREE.Scene){
    this.info = info;
    this.info.centerX = centerX;
    this.info.centerY = centerY;
    this.info.radius = 0;
    this.info.opacity = 1.0;

    this.material = new THREE.MeshPhysicalMaterial()
    this.material.color = new THREE.Color(0xdddddd);
    this.material.emissive = new THREE.Color(0x808080);
    this.material.reflectivity = 1;
    this.material.transmission = 0;
    this.material.metalness = 0.9
    this.material.roughness = 0;
    this.material.transparent = true;

    for(let i = 0; i < this.rings.length; i++){
        let geometory = new THREE.TorusGeometry(this.info.radius+10-i*3, 1, 8, 60);

        this.rings[i] = new THREE.Mesh(geometory,this.material);    
        this.rings[i].position.x = this.info.centerX;
        this.rings[i].position.y = this.info.centerY;
        this.rings[i].position.z = 0;
        this.rings[i].rotation.x = -Math.PI/2;

        scene.add(this.rings[i]);
    }
  }

  animate(){
      this.info.move();

      for(let i = 0; i < this.rings.length; i++){

          this.material.opacity = this.info.opacity;
          let newGeometry = new THREE.TorusGeometry(this.info.radius+10-i*5, 2, 8, 60);

          this.rings[i].geometry.dispose();
          this.rings[i].geometry = newGeometry;
      }
  }
}

export { WaterRingDisplay };
