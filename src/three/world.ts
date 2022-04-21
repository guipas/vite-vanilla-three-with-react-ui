import * as THREE from 'three';
import fragmentShader from './shaders/fragmentShader.glsl';
import vertexShader from './shaders/vertexShader.glsl';

const clock = new THREE.Clock()


export const world = new THREE.Group();

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 50, 50, 50);
// const geometry = new THREE.PlaneBufferGeometry(2, 2, 100, 100);

const geometry = new THREE.BufferGeometry();
const nbVertices = 50;
// const verticesCoordinates = Array.from({ length: nbVertices * 3 }, () => Math.random() * 2 - 1);
const verticesCoordinates: number[] = [];
const cubeSize = 2;
Array.from({ length: nbVertices }).forEach((noop, x) => {
  Array.from({ length: nbVertices }).forEach((noop, y) => {
    Array.from({ length: nbVertices }).forEach((noop, z) => {
      const point = getPoint();
      verticesCoordinates.push(
        point.x,
        point.y,
        point.z,
        // Math.cos(x * 2 * Math.PI / nbVertices) * y / nbVertices, 
        // Math.sin(x * 2 * Math.PI / nbVertices) * y / nbVertices, 
        // Math.tan(x * 2 * Math.PI / nbVertices)

        // x * cubeSize / nbVertices - cubeSize / 2 + Math.random() * cubeSize / nbVertices / 10, 
        // y * cubeSize / nbVertices - cubeSize / 2 + Math.random() * cubeSize / nbVertices / 10, 
        // z * cubeSize / nbVertices - cubeSize / 2 + Math.random() * cubeSize / nbVertices / 10
      );
    });
  });
});
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






function getPoint() {
  var u = Math.random();
  var v = Math.random();
  var theta = u * 2.0 * Math.PI;
  var phi = Math.acos(2.0 * v - 1.0);
  var r = Math.cbrt(Math.random());
  var sinTheta = Math.sin(theta);
  var cosTheta = Math.cos(theta);
  var sinPhi = Math.sin(phi);
  var cosPhi = Math.cos(phi);
  var x = r * sinPhi * cosTheta;
  var y = r * sinPhi * sinTheta;
  var z = r * cosPhi;
  return {x: x, y: y, z: z};
}