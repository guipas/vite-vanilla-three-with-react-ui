import * as THREE from 'three';
import fragmentShader from './shaders/fragmentShader.glsl';
import vertexShader from './shaders/vertexShader.glsl';

export const world = new THREE.Group();

const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: '#ffaaff' });

const customMaterial = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
});

const cube = new THREE.Mesh(cubeGeometry, customMaterial);

world.add(cube);


