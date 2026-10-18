<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const props = defineProps({
  type: {
    type: String,
    default: 'house', // 'house', 'industrial', 'mep', 'terrain', 'bridge', 'skyscraper', 'solar'
  },
  accentColor: { type: String, default: '#00e5ff' },
});

const containerRef = ref(null);
let scene, camera, renderer, controls, animationFrameId;

// --- 1. VILLA BASSE (Architecture) ---
const createRealisticVilla = (group, primaryColor) => {
  const matConcrete = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.6,
    metalness: 0.1,
  });
  const matDarkWall = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.5,
  });
  const matGlass = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.4,
    roughness: 0.1,
  });
  const matWood = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    roughness: 0.7,
  });
  const matLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(primaryColor),
    transparent: true,
    opacity: 0.5,
  });

  const addMeshWithWire = (
    geom,
    material,
    pos = [0, 0, 0],
    rot = [0, 0, 0]
  ) => {
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    group.add(mesh);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geom),
      matLine
    );
    wire.position.set(...pos);
    wire.rotation.set(...rot);
    group.add(wire);
  };

  addMeshWithWire(
    new THREE.BoxGeometry(6.2, 0.2, 4.2),
    matConcrete,
    [0, -0.1, 0]
  );
  addMeshWithWire(
    new THREE.BoxGeometry(5.8, 1.2, 2.2),
    matConcrete,
    [0.1, 0.6, -0.5]
  );
  addMeshWithWire(
    new THREE.BoxGeometry(2.8, 1.2, 2.2),
    matDarkWall,
    [-1.4, 0.6, 0.9]
  );
  addMeshWithWire(
    new THREE.BoxGeometry(6.4, 0.15, 4.4),
    matDarkWall,
    [0, 1.25, 0]
  );
  addMeshWithWire(
    new THREE.BoxGeometry(1.8, 1.0, 0.05),
    matGlass,
    [0.8, 0.6, 0.58]
  );
  addMeshWithWire(
    new THREE.BoxGeometry(3.5, 0.08, 1.8),
    matWood,
    [1.1, 0.04, 1.2]
  );
};

// --- 2. USINE & INDUSTRIE ---
const createRealisticIndustrial = (group, primaryColor) => {
  const matSteel = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.25,
  });
  const matDarkIron = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.4,
  });
  const matYellow = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    roughness: 0.4,
  });
  const matLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(primaryColor),
    transparent: true,
    opacity: 0.6,
  });

  const addPart = (geom, material, pos = [0, 0, 0], rot = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    group.add(mesh);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geom),
      matLine
    );
    wire.position.set(...pos);
    wire.rotation.set(...rot);
    group.add(wire);
  };

  addPart(
    new THREE.CylinderGeometry(0.8, 0.8, 2.8, 24),
    matSteel,
    [-1.2, 1.4, 0]
  );
  addPart(
    new THREE.SphereGeometry(0.8, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    matSteel,
    [-1.2, 2.8, 0]
  );
  addPart(new THREE.BoxGeometry(3.6, 0.3, 0.9), matYellow, [0.8, 0.5, -0.6]);
  addPart(new THREE.BoxGeometry(1.2, 1.0, 0.9), matDarkIron, [1.0, 0.8, 0.8]);
};

// --- 3. RÉSEAU MEP & CLASHS ---
const createMEPModel = (group, primaryColor) => {
  const matPipe = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.6,
    roughness: 0.2,
  });
  const matClash = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    metalness: 0.4,
  });
  const matLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(primaryColor),
  });

  const addPipe = (r, len, pos, rot, mat) => {
    const geom = new THREE.CylinderGeometry(r, r, len, 12);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    group.add(mesh);
    group.add(
      new THREE.LineSegments(new THREE.WireframeGeometry(geom), matLine)
        .translateX(pos[0])
        .translateY(pos[1])
        .translateZ(pos[2])
    );
  };

  addPipe(0.12, 4.0, [0, 1.0, 0], [0, 0, Math.PI / 2], matPipe);
  addPipe(0.15, 2.2, [0.6, 1.0, 0.4], [Math.PI / 2, 0, 0], matClash);
};

// --- 4. TOPOGRAPHIE MNT ---
const createTerrainModel = (group, primaryColor) => {
  const geom = new THREE.PlaneGeometry(5, 5, 20, 20);
  geom.rotateX(-Math.PI / 2);
  const posAttr = geom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const z = posAttr.getZ(i);
    posAttr.setY(i, Math.sin(x * 1.5) * 0.4 + Math.cos(z * 1.5) * 0.3);
  }
  geom.computeVertexNormals();
  group.add(
    new THREE.Mesh(
      geom,
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.8,
        flatShading: true,
      })
    )
  );
  group.add(
    new THREE.LineSegments(
      new THREE.WireframeGeometry(geom),
      new THREE.LineBasicMaterial({
        color: new THREE.Color(primaryColor),
        opacity: 0.6,
        transparent: true,
      })
    )
  );
};

// --- 5. PONT À HAUBANS (Génie Civil) ---
const createBridgeModel = (group, primaryColor) => {
  const matConcrete = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.6,
  });
  const matSteel = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.8,
    roughness: 0.3,
  });
  const matLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(primaryColor),
  });

  const addPart = (geom, material, pos = [0, 0, 0], rot = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    group.add(mesh);
    group.add(
      new THREE.LineSegments(new THREE.WireframeGeometry(geom), matLine)
        .translateX(pos[0])
        .translateY(pos[1])
        .translateZ(pos[2])
    );
  };

  addPart(new THREE.BoxGeometry(5.2, 0.2, 2.0), matConcrete, [0, 0, 0]);
  addPart(new THREE.BoxGeometry(0.3, 3.2, 0.3), matSteel, [-1.2, 1.5, 0]);
  addPart(new THREE.BoxGeometry(0.3, 3.2, 0.3), matSteel, [1.2, 1.5, 0]);
  addPart(new THREE.BoxGeometry(2.7, 0.2, 0.3), matSteel, [0, 2.8, 0]);
};

// --- 6. IMMEUBLE DE GRANDE HAUTEUR (IGH) ---
const createSkyscraperModel = (group, primaryColor) => {
  const matStructure = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.5,
  });
  const matGlass = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.5,
    roughness: 0.1,
  });
  const matLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(primaryColor),
  });

  const addPart = (geom, material, pos = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(...pos);
    group.add(mesh);
    group.add(
      new THREE.LineSegments(new THREE.WireframeGeometry(geom), matLine)
        .translateX(pos[0])
        .translateY(pos[1])
        .translateZ(pos[2])
    );
  };

  addPart(new THREE.BoxGeometry(2.2, 3.8, 2.2), matGlass, [0, 1.9, 0]);
  addPart(new THREE.BoxGeometry(0.8, 4.0, 0.8), matStructure, [0, 2.0, 0]);
  for (let y = 0.4; y <= 3.6; y += 0.6) {
    addPart(new THREE.BoxGeometry(2.4, 0.08, 2.4), matStructure, [0, y, 0]);
  }
};

// --- 7. CENTRALE SOLAIRE PHOTOVOLTAÏQUE ---
const createSolarFarmModel = (group, primaryColor) => {
  const matPanel = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    roughness: 0.2,
    metalness: 0.8,
  });
  const matFrame = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.5,
  });
  const matLine = new THREE.LineBasicMaterial({
    color: new THREE.Color(primaryColor),
  });

  const addPanelRow = (xPos, zPos) => {
    const geom = new THREE.BoxGeometry(1.4, 0.05, 0.8);
    const mesh = new THREE.Mesh(geom, matPanel);
    mesh.position.set(xPos, 0.8, zPos);
    mesh.rotation.x = -0.4;
    group.add(mesh);

    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 1.0),
      matFrame
    );
    leg.position.set(xPos, 0.4, zPos);
    group.add(leg);
  };

  for (let x = -1.2; x <= 1.2; x += 1.2) {
    for (let z = -1.0; z <= 1.0; z += 1.0) {
      addPanelRow(x, z);
    }
  }

  const ground = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 0.1, 3.5),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 })
  );
  ground.position.y = -0.05;
  group.add(ground);
  group.add(
    new THREE.LineSegments(
      new THREE.WireframeGeometry(ground.geometry),
      matLine
    ).translateY(-0.05)
  );
};

// --- INITIALISATION THREE.JS ---
const initScene = () => {
  if (!containerRef.value) return;

  const width = containerRef.value.clientWidth;
  const height = containerRef.value.clientHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(4.5, 3.5, 5.0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  containerRef.value.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.5);
  dirLight.position.set(10, 20, 15);
  scene.add(dirLight);

  const modelGroup = new THREE.Group();

  // Routage des types de modèles 3D
  if (props.type === 'house' || props.type === 'hero') {
    createRealisticVilla(modelGroup, props.accentColor);
  } else if (props.type === 'industrial') {
    createRealisticIndustrial(modelGroup, props.accentColor);
  } else if (props.type === 'mep') {
    createMEPModel(modelGroup, props.accentColor);
  } else if (props.type === 'terrain') {
    createTerrainModel(modelGroup, props.accentColor);
  } else if (props.type === 'bridge') {
    createBridgeModel(modelGroup, props.accentColor);
  } else if (props.type === 'skyscraper') {
    createSkyscraperModel(modelGroup, props.accentColor);
  } else if (props.type === 'solar') {
    createSolarFarmModel(modelGroup, props.accentColor);
  }

  scene.add(modelGroup);

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
};

const handleResize = () => {
  if (!containerRef.value || !renderer || !camera) return;
  const w = containerRef.value.clientWidth;
  const h = containerRef.value.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
};

onMounted(() => {
  initScene();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationFrameId);
  if (renderer) renderer.dispose();
});
</script>

<template>
  <div
    ref="containerRef"
    class="w-full h-full relative cursor-grab active:cursor-grabbing"
  ></div>
</template>
