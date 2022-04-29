import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import * as dat from 'lil-gui';
import { autorun } from 'mobx';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import store from '../common/store';
import '../common/storage/storage';
import { camera, cameraPositionISO, onResizeCamera, referencePlane, rotateCamera, sizes } from './camera'
import { lights } from './lights';
import { tick as worldTick } from './world';

import './style.css'
import { world } from './world';

// Scene
const scene = new THREE.Scene()
const sceneTopOffset = 0;

scene.add(world);


// Lights
scene.add(...lights);

// Debug
// const gui = new dat.GUI();
// gui.add(directionalLight.position, 'x')
// gui.add(directionalLight.position, 'y')
// gui.add(directionalLight.position, 'z')

scene.add(camera);

// Axis helpers
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);


// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLElement;


// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
// controls.maxPolarAngle = Math.PI / 2;
controls.update();


const clock = new THREE.Clock()

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    onResizeCamera();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// render loop
const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()
  camera.updateProjectionMatrix();

  worldTick();

  // Update tweens
  TWEEN.update();

  controls.update();

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}
tick();

// wathcing for changes in the store and rotating the camera if needed
// autorun(() => {
//   if (world) {
//     rotateCamera?.(store.camera.rotation);
//   }
// })