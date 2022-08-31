import './style.css';

import * as THREE from 'three';

import * as v3d from './v3d.module.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from './GLTFExporter.js';
// import baker from './baker_and_the_bridge/scene.gltf'

import { OrbitControls } from './v3d.module.js';

const exporter = new GLTFExporter();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(100);

renderer.render(scene, camera)


const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus)

const pointLight = new THREE.PointLight(0xffff00)
const ambientLight = new THREE.AmbientLight(0xffffff)
pointLight.position.set(50,5,5)
scene.add(pointLight, ambientLight)



const loader = new GLTFLoader();
let ex = new THREE.Object3D();

const controls = new OrbitControls(camera, renderer.domElement)

 
const loadHoverboard = async () => {
  try{
   const gltf = await loader.loadAsync( './princess_deer.glb')
    gltf.scene.scale.set(5,5,5)
    ex = gltf.scene
    scene.add( ex );
    renderer.render( scene, camera ); 
  

} catch (err) {
  console.log(err)
}
}


await (async () => {
  await loadHoverboard()
})();

renderer.render( scene, camera ); 


// exporter.parse(
// 	scene,
// 	// called when the gltf has been generated
// 	function ( gltf ) {

// 		console.log( gltf );
// 		downloadJSON( gltf );

// 	},
// 	// called when there is an error in the generation
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	},
// 	options
// );

// function exportGLTF(input) { // EXPORT THE SCENE AS A GLTF WITH THIS

//   const gltfExporter = new GLTFExporter();

//   const options = {
//     trs: true,//document.getElementById('option_trs').checked,
//     onlyVisible: true,//document.getElementById('option_visible').checked,
//     truncateDrawRange: true,//document.getElementById('option_drawrange').checked,
//     binary: true,//document.getElementById('option_binary').checked,
//     maxTextureSize: Infinity//Number(document.getElementById('option_maxsize').value) || Infinity // To prevent NaN value
//   };
//   gltfExporter.parse(input, function(result) {

//     if (result instanceof ArrayBuffer) {


//       var saveByteArray = (function () {
//         var a = document.createElement("a");
//         document.body.appendChild(a);
//         a.style = "display: none";
//         return function (data, name) {
//             var blob = new Blob(data, {type: "octet/stream"}),
//                 url = window.URL.createObjectURL(blob);
//             a.href = url;
//             a.download = name;
//             a.click();
//             window.URL.revokeObjectURL(url);
//         };
//     }());
    
//     saveByteArray([result], 'example.gltf');

//     } else {

//       const output = JSON.stringify(result, null, 2);
//       console.log(output);
//       saveString(output, 'scene.gltf');

//     }

//   }, options);

// }

// exportGLTF(scene)



function animate() {
  requestAnimationFrame( animate );
  // torus.rotation.x += 0.01
  // torus.rotation.y += 0.006
  // torus.rotation.z += 0.01
  // ex.rotation.x += 0.01
  // ex.rotation.y += 0.006
  // ex.rotation.z += 0.01
  controls.update();

  renderer.render( scene, camera ); 
}
animate();


