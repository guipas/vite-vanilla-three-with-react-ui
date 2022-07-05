import * as THREE from 'three';
import { DataTexture3D, LinearFilter, RedFormat, Vector3 } from 'three';
import { clamp } from 'three/src/math/MathUtils';
import fragmentShader from './shaders/fragmentShader.glsl';
import vertexShader from './shaders/vertexShader.glsl';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise';

const clock = new THREE.Clock()


export const world = new THREE.Group();

// const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 50, 50, 50);
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 100, 100);

const geometry = new THREE.BufferGeometry();
const nbVertices = 50000;
// const verticesCoordinates = Array.from({ length: nbVertices * 3 }, () => Math.random() * 3 - 1.5);
const verticesCoordinates: number[] = [];
Array.from({ length: nbVertices * 3 }).forEach((_i, i) => {
  verticesCoordinates.push(
    Math.random() * 3,
    Math.random() * 3,
    Math.random() * 3,
  );
});
const vertices = new Float32Array(verticesCoordinates);
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );


const texture = createTest3dTexture();
// const texture = createPerlinTexture({
//   width: 5,
//   height: 5,
//   depth: 5,
//   scale: 0.1,
// });
const texture2d = createTest2dTexture();
console.log(texture);


const uniforms = {
  uTime: { value: 0 },
  uSize: { value: 3 },
  uLimit: { value: 4 },
  uTexture: { value: texture },
  uTexture2d: { value: texture2d },
};

// const material = new THREE.MeshStandardMaterial({ color: '#ffaaff' });
// const material = new THREE.RawShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, side: THREE.DoubleSide});
const material = new THREE.ShaderMaterial({ 
  vertexShader, 
  fragmentShader, 
  uniforms, 
  transparent: true, 
  // side: THREE.DoubleSide,
  // blending: THREE.AdditiveBlending,
  depthTest: false,
});

const mesh = new THREE.Mesh(planeGeometry, material);
const mesh2 = new THREE.Mesh(planeGeometry, material);

mesh2.position.z = 1;
// mesh.rotation.x = - Math.PI / 2;
// mesh.position.x = 0.5;
// mesh.position.y = 0.5;
// mesh.position.z = 0.5;

const points = new THREE.Points(geometry, material);
// points.rotation.x = - Math.PI / 2;

export const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  if (material.uniforms) {
    material.uniforms.uTime.value = elapsedTime;
  }
}

world.add(mesh);
world.add(mesh2);
// world.add(points);






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

function createPerlinTexture(options: any = {}) {

  const {
    width = 128,
    height = 128,
    depth = 128,
    scale = 0.1
  } = options;

  const halfWidth = width * 0.5;
  const halfHeight = height * 0.5;
  const halfDepth = depth * 0.5;

  const voxelPerSlice = width * height;
  const voxelCount = voxelPerSlice * depth;

  // ArrayBuffer containing the volume data. This buffer is of size
  // `width` * `height` * `depth` to contain all the 3D data.
  const buffer = new Uint8Array(voxelCount);

  // Three.js implementation of the Improved Perlin Noise algorithm.
  const perlin = new ImprovedNoise();

  // Temporary vector used for in-place computation. This is used to improve
  // performance and reduce garbage collection.
  const point = new Vector3();

  for (let i = 0; i < voxelCount; ++i) {
    const x = i % width;
    const y = Math.floor((i % voxelPerSlice) / width);
    const z = Math.floor(i / voxelPerSlice);

    const v = point.set(
      (x - halfWidth) / width,
      (y - halfHeight) / height,
      (z - halfDepth) / depth
    );
    const length = v.length();

    // `d` goes to zero when the current sample is far from the volume center.
    // At the opposite, `d` goes to one when the sample is close to the volume
    // center.
    const d = clamp(1.0 - length, 0, 1);

    const p = perlin.noise(x * scale, y * scale, z * scale);
    const rand = (p + 1.0) * 0.5;

    // The noise is scaled by how far it is from the center. This is used to
    // improve the shape of the cloud and make it appear more spherical.
    buffer[i] = Math.round(rand * d * d * 255);
  }

  const texture = new DataTexture3D(
    buffer,
    width,
    height,
    depth
  );
  texture.format = RedFormat;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.unpackAlignment = 1;

  return texture;
}

function createTest2dTexture() {
  const width =  1;
  const height = 1;
  const slices = 2;

  const size = width * height * slices;
  const data = new Uint8Array( 4 * size );
  const color = new THREE.Color( 0xaa5555 );

  const r = Math.floor( color.r * 255 );
  const g = Math.floor( color.g * 255 );
  const b = Math.floor( color.b * 255 );

  for ( let s = 1; s < slices; s ++ ) {
    for ( let i = 0; i < width; i ++ ) {
      for ( let j = 0; j < height; j ++ ) {
    
        const stride = i * j * 4;
    
        data[ stride ] = r;
        data[ stride + 1 ] = g;
        data[ stride + 2 ] = b;
        data[ stride + 3 ] = 255 * s / slices;
    
      }
    }
  }

  // used the buffer to create a DataTexture

  const texture = new THREE.DataTexture( data, width, height );
  texture.needsUpdate = true;

  return texture;
}

function createTest3dTexture() {
  const width = 3;
  const height = 3;
  const depth = 3;

  const size = width * height;
  const data = new Uint8Array( 4 * size * depth );
  const color = new THREE.Color( 0xffff00 );

  const r = Math.floor( color.r * 255 );
  const g = Math.floor( color.g * 255 );
  const b = Math.floor( color.b * 255 );

  for ( let d = 0; d < depth; d ++ ) {
    for ( let i = 0; i < size; i ++ ) {

      const stride = i * 4;

      data[ d + stride ] = r;
      data[ d + stride + 1 ] = g;
      data[ d + stride + 2 ] = b;
      data[ d + stride + 3 ] = 255 * d / depth;

    }
  }

  // used the buffer to create a DataTexture

  // const texture = new THREE.DataTexture( data, width, height );
  const texture = new DataTexture3D(
    data,
    width,
    height,
    depth
  );
  texture.format = RedFormat;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;

  return texture;
}