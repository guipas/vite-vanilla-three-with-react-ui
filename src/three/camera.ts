import * as THREE from 'three';
import { Vector2 } from 'three';
import TWEEN from '@tweenjs/tween.js';


// Sizes
type WindowSizes = {
  width: number;
  height: number;
}
export const sizes: WindowSizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Camera
const aspectRatio = (s:WindowSizes) => s.width / s.height;
console.log('Aspect ratio:', aspectRatio);

const frustumDelta = 10;
export const cameraPositionISO = 100;
export const	camera = new THREE.OrthographicCamera( 
  - frustumDelta * aspectRatio(sizes), 
  frustumDelta * aspectRatio(sizes), 
  frustumDelta, 
  - frustumDelta, 
  .000001, 
  1000
);
camera.scale.set(.3, .3, .3);
camera.updateProjectionMatrix();
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;

// Camera Zoom
export const onResizeCamera = () => {
  camera.left = - frustumDelta * aspectRatio(sizes);
  camera.right = frustumDelta * aspectRatio(sizes);
  camera.top = frustumDelta;
  camera.bottom = -frustumDelta;
  camera.updateProjectionMatrix();
}

// Camera movement
export const referencePlane = new THREE.Mesh(
  new THREE.PlaneGeometry( 1000, 1000), 
  new THREE.MeshBasicMaterial( {color: 0x5555ff, side: THREE.BackSide, transparent: true, opacity: 0, depthTest: false} ),
);
referencePlane.rotation.x = Math.PI / 2
referencePlane.position.z = -0.1;
referencePlane.position.y = - .001;


// Camera rotation
const initalAngle = (Math.PI / 4) * 3;
let currentAngle = initalAngle;

export const rotateCamera = (rotation = 0) => {
  // console.log('roatate camera', rotation)

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new Vector2(0, 0), camera);
  const intersect = raycaster.intersectObject(referencePlane).pop();
  console.log(intersect);
  const center = intersect?.point.clone() || new THREE.Vector3(0, 0, 0);

  const nextAngle = initalAngle + (rotation * (Math.PI / 2));

  const tween = new TWEEN.Tween({ angle: currentAngle })
  tween.to({ angle: nextAngle }, 1000);
  tween.easing(TWEEN.Easing.Quadratic.InOut)
  tween.onUpdate((o) => {
    currentAngle = o.angle;
    const x = Math.cos(o.angle) * cameraPositionISO + center.x;
    const z = Math.sin(o.angle) * cameraPositionISO + center.z;
    camera.position.x = x;
    camera.position.z = z;
    camera.position.y = cameraPositionISO;
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  });
  tween.start();
}