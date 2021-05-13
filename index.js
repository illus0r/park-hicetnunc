'use strict';
let THREE = require('three')

// console.log(THREE)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
let vertices = []
let indices = []
let normals = []

let floors = 30
let segments = 8

let offsetX = 0
let offsetZ = 0
for (let floor = 0; floor < floors; floor++) {
    let r = .1 + .2 * Math.random()
    offsetX += .2 - .4 * Math.random()
    offsetZ += .2 - .4 * Math.random()
    for (let i = 0; i < segments; i++) {
        let angle = Math.PI / 4 * i
        let x = r * Math.sin(angle) + offsetX
        let y = floor * .2 - 4
        let z = r * Math.cos(angle) + offsetZ
        vertices.push(x, y, z)
        normals.push(Math.sin(angle), 0, Math.cos(angle))
    }
}
console.log(indices)

for (let floor = 0; floor < floors - 1; floor++) {
    let ring = []
    for (let i = 0; i < segments; i++) {
        ring.push(i + floor * segments)
    }
    for (let i = 0; i < segments; i++) {
        indices.push(
            ring[i] + segments,
            ring[i],
            ring[(i + 1) % segments],
        )
        indices.push(
            ring[i] + segments,
            ring[(i + 1) % segments],
            ring[(i + 1) % segments] + segments,
        )
    }

}

geometry.setIndex(indices);
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

const material = new THREE.MeshNormalMaterial({ wireframe: true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

camera.position.z = 5;

const animate = function () {
    requestAnimationFrame(animate);

    // mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();