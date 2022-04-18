import * as THREE from 'three';
import fragmentShader from './shaders/fragmentShader.glsl';
import vertexShader from './shaders/vertexShader.glsl';

const clock = new THREE.Clock()


export const world = new THREE.Group();

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 50, 50, 50);
// const geometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);

const geometry = new THREE.BufferGeometry();
const nbVertices = 100000;
const verticesCoordinates = Array.from({ length: nbVertices * 3 }, () => Math.random() * 2 - 1);
const vertices = new Float32Array(verticesCoordinates);
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

const uniforms = {
  uTime: { value: 0 },
};

// const material = new THREE.MeshStandardMaterial({ color: '#ffaaff' });
const material = new THREE.RawShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = - Math.PI / 2;

const points = new THREE.Points(geometry, material);
points.rotation.x = - Math.PI / 2;

export const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  if (material.uniforms) {
    material.uniforms.uTime.value = elapsedTime;
  }
}

// world.add(mesh);
world.add(points);


