<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const sliderPos = ref(50);
const isDragging = ref(false);

const containerLeft = ref(null);
const containerRight = ref(null);

let rendererLeft, rendererRight, sceneLeft, sceneRight, cameraLeft, cameraRight;
let animId;

const startDrag = () => {
  isDragging.value = true;
};
const stopDrag = () => {
  isDragging.value = false;
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const x = clientX - rect.left;
  sliderPos.value = Math.max(0, Math.min(100, (x / rect.width) * 100));
};

// Fonction pour créer une maquette architecturale détaillée (Villa Basse) au centre
const createBuildingModel = (isPointCloud = false) => {
  const group = new THREE.Group();

  if (isPointCloud) {
    // Version Nuage de Points Bruts (Effet Scanner Laser E57)
    const count = 8000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      // Forme générale de la villa (base, murs, toit plat)
      const x = (Math.random() - 0.5) * 4.5;
      const y = Math.random() * 1.5;
      const z = (Math.random() - 0.5) * 3.0;
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.9,
    });
    const points = new THREE.Points(geometry, material);
    group.add(points);
  } else {
    // Version Maquette BIM Texturée & Propre
    const matConcrete = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.5,
    });
    const matDark = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
    });
    const matGlass = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const matLine = new THREE.LineBasicMaterial({ color: 0x38bdf8 });

    const addPart = (geom, material, pos, rot = [0, 0, 0]) => {
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

    // Dalle & Corps de la villa
    addPart(new THREE.BoxGeometry(4.2, 0.2, 2.8), matConcrete, [0, -0.1, 0]);
    addPart(new THREE.BoxGeometry(3.8, 1.1, 2.4), matConcrete, [0, 0.5, 0]);
    addPart(new THREE.BoxGeometry(4.0, 0.12, 2.6), matDark, [0, 1.12, 0]); // Toit plat

    // Baies vitrées
    addPart(new THREE.BoxGeometry(1.5, 0.8, 0.05), matGlass, [0.6, 0.5, 1.22]);
    addPart(new THREE.BoxGeometry(1.0, 0.8, 0.05), matGlass, [-0.8, 0.5, 1.22]);
  }

  return group;
};

onMounted(() => {
  if (!containerLeft.value || !containerRight.value) return;

  const width = containerLeft.value.clientWidth;
  const height = containerLeft.value.clientHeight;

  // --- SCÈNE GAUCHE (Nuage de points) ---
  sceneLeft = new THREE.Scene();
  cameraLeft = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  cameraLeft.position.set(4, 3, 5);

  rendererLeft = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  rendererLeft.setSize(width, height);
  containerLeft.value.appendChild(rendererLeft.domElement);

  const modelLeft = createBuildingModel(true);
  sceneLeft.add(modelLeft);

  // --- SCÈNE DROITE (Maquette BIM texturée) ---
  sceneRight = new THREE.Scene();
  cameraRight = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  cameraRight.position.copy(cameraLeft.position);

  rendererRight = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  rendererRight.setSize(width, height);
  containerRight.value.appendChild(rendererRight.domElement);

  const modelRight = createBuildingModel(false);
  sceneRight.add(modelRight);

  // Éclairages studio
  const ambient = new THREE.AmbientLight(0xffffff, 1.0);
  sceneLeft.add(ambient);
  sceneRight.add(ambient.clone());

  const dirLight = new THREE.DirectionalLight(0x00e5ff, 1.5);
  dirLight.position.set(10, 15, 10);
  sceneLeft.add(dirLight);
  sceneRight.add(dirLight.clone());

  // Contrôles de orbite communs (la caméra gauche pilote les deux)
  const controls = new OrbitControls(
    cameraLeft,
    containerLeft.value.parentElement
  );
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;

  // Boucle d'animation synchronisée
  const animate = () => {
    animId = requestAnimationFrame(animate);
    controls.update();

    // Synchronisation parfaite de la caméra de droite avec celle de gauche
    cameraRight.position.copy(cameraLeft.position);
    cameraRight.quaternion.copy(cameraLeft.quaternion);

    rendererLeft.render(sceneLeft, cameraLeft);
    rendererRight.render(sceneRight, cameraRight);
  };
  animate();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animId);
  if (rendererLeft) rendererLeft.dispose();
  if (rendererRight) rendererRight.dispose();
});
</script>

<template>
  <section
    id="demo"
    class="py-20 bg-gray-950 border-t border-b border-gray-800/80"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <h2 class="font-['Outfit'] text-3xl font-bold text-white mb-4">
          Comparateur Interactif Avant / Après
        </h2>
        <p class="text-gray-400">
          Glissez le curseur pour observer le passage magique du nuage de points
          brut à la maquette BIM.
        </p>
      </div>

      <!-- Slider Container Interactif -->
      <div
        class="relative h-[500px] rounded-2xl overflow-hidden border border-gray-800 select-none cursor-ew-resize bg-[#070b14]"
        @mousedown="startDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @mousemove="onDrag"
        @touchstart="startDrag"
        @touchend="stopDrag"
        @touchmove="onDrag"
      >
        <!-- Vue Droite (Fond : Maquette 3D BIM texturée) -->
        <div class="absolute inset-0 w-full h-full">
          <div ref="containerRight" class="w-full h-full"></div>
          <div
            class="absolute top-4 right-4 z-10 bg-blue-950/90 px-3 py-1.5 rounded border border-blue-500/40 text-xs font-mono text-blue-400 shadow-lg"
          >
            MAQUETTE BIM TEXTURÉE (IFC / RVT)
          </div>
        </div>

        <!-- Vue Gauche (Superposée avec clip-path : Nuage de points brut) -->
        <div
          class="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-cyan-400 bg-gray-950/40"
          :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }"
        >
          <div ref="containerLeft" class="w-full h-full"></div>
          <div
            class="absolute top-4 left-4 z-10 bg-cyan-950/90 px-3 py-1.5 rounded border border-cyan-500/40 text-xs font-mono text-cyan-400 shadow-lg"
          >
            NUAGE DE POINTS BRUT (E57)
          </div>
        </div>

        <!-- Curseur Glissant de séparation central -->
        <div
          class="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_20px_#00e5ff] z-20 pointer-events-none"
          :style="{ left: `${sliderPos}%` }"
        >
          <div
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-400 text-gray-950 flex items-center justify-center font-bold text-base shadow-[0_0_20px_rgba(0,229,255,0.9)]"
          >
            ↔
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
