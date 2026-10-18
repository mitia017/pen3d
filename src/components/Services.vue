<script setup>
import { ref } from 'vue';
import ThreeViewer from './ThreeViewer.vue';

const services = [
  {
    id: 'arch',
    title: 'Scan-to-BIM Architecture & Structure',
    desc: 'Relevé laser 3D de bâtiments existants et modélisation de la structure portante selon les normes BIM LOD 100 à 400.',
    badges: ['Autodesk Revit', 'IFC 4.0', 'Nuage E57'],
  },
  {
    id: 'indus',
    title: 'Scan-to-BIM Industriel & Machinerie',
    desc: 'Numérisation d’usines, de lignes de production et d’équipements complexes pour le rétro-engineering et le réaménagement.',
    badges: ['Tolérance < 2mm', 'Catia / Inventor', 'Usine 4.0'],
  },
  {
    id: 'mep',
    title: 'Modélisation MEP & Réseaux Industriels',
    desc: 'Modélisation 3D des tuyauteries, gaines HVAC, réseaux électriques et détection automatisée des clashs/interférences.',
    badges: ['HVAC / CVC', 'Détection de Clashs', 'Navisworks'],
  },
  {
    id: 'topo',
    title: 'Topographie & Modélisation 3D de Terrain',
    desc: 'Relevé topographique par drone LiDAR et création de Modèles Numériques de Terrain (MNT) avec courbes de niveau.',
    badges: ['LiDAR Drone', 'MNT / MNS', 'Calcul de Cubatures'],
  },
];

const activeTab = ref(0);
</script>

<template>
  <section id="services" class="py-24 bg-[#0A0F1D]">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2
          class="font-['Outfit'] text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Nos Expertises d'Ingénierie 3D
        </h2>
        <p class="text-gray-400">
          Des prestations sur-mesure pour numériser, analyser et modéliser tous
          vos actifs physiques.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="(service, idx) in services"
          :key="service.id"
          class="p-8 rounded-2xl bg-gray-900/60 border border-gray-800 hover:border-cyan-500/40 transition flex flex-col justify-between"
        >
          <div>
            <h3 class="font-['Outfit'] text-2xl font-bold text-white mb-3">
              {{ service.title }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">
              {{ service.desc }}
            </p>

            <!-- Viewer Card Preview -->
            <div
              class="h-56 rounded-xl bg-gray-950 border border-gray-800/80 overflow-hidden mb-6"
            >
              <ThreeViewer
                :type="
                  service.id === 'arch'
                    ? 'house'
                    : service.id === 'indus'
                      ? 'industrial'
                      : service.id === 'mep'
                        ? 'mep'
                        : 'terrain'
                "
                :accent-color="service.id === 'mep' ? '#ef4444' : '#00e5ff'"
              />
            </div>
          </div>

          <!-- Technical Badges -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="b in service.badges"
              :key="b"
              class="px-2.5 py-1 rounded bg-gray-800 text-gray-300 font-mono text-xs border border-gray-700"
            >
              {{ b }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
