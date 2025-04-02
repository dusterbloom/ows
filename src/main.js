import * as THREE from 'three';
import config from './config.js';
import '../style.css';

let scene, camera, renderer, cube;

function init() {
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    antialias: config.renderer.antialias 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.renderer.pixelRatioCap));
  document.body.appendChild(renderer.domElement);

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x242424);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    config.camera.fov,
    window.innerWidth / window.innerHeight,
    config.camera.near,
    config.camera.far
  );
  camera.position.set(
    config.camera.position.x,
    config.camera.position.y,
    config.camera.position.z
  );

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Create a simple cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    metalness: 0.3,
    roughness: 0.4
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Start animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  
  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

// Initialize the application
init();

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.error('Service worker registration failed:', error);
    });
  });
}
