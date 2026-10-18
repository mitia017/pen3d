<script setup>
import { ref, computed } from 'vue';
import ThreeViewer from './ThreeViewer.vue';

// Inclusion de toutes les catégories de projets pour que les filtres fonctionnent correctement
const categories = [
  'Tous',
  'Architecture',
  'Industrie',
  'Génie Civil',
  'Énergie',
  'MEP',
  'Topographie',
];
const activeCategory = ref('Tous');

// Liste complète des projets avec leurs visionneuses 3D dédiées
const projects = [
  {
    id: 1,
    title: 'Requalification d’un complexe industriel',
    cat: 'Industrie',
    loc: 'Lyon',
    points: '1.2 Mds pts',
    type3d: 'industrial',
    color: '#38bdf8',
  },
  {
    id: 2,
    title: 'Maquette BIM Structure d’une Villa',
    cat: 'Architecture',
    loc: 'Paris',
    points: '850 M pts',
    type3d: 'house',
    color: '#00e5ff',
  },
  {
    id: 3,
    title: 'Ouvrage d’Art : Pont à Haubans',
    cat: 'Génie Civil',
    loc: 'Bordeaux',
    points: '1.5 Mds pts',
    type3d: 'bridge',
    color: '#10b981',
  },
  {
    id: 4,
    title: 'Immeuble de Grande Hauteur (IGH)',
    cat: 'Architecture',
    loc: 'La Défense',
    points: '3.0 Mds pts',
    type3d: 'skyscraper',
    color: '#3b82f6',
  },
  {
    id: 5,
    title: 'Centrale Solaire Photovoltaïque',
    cat: 'Énergie',
    loc: 'Marseille',
    points: '950 M pts',
    type3d: 'solar',
    color: '#f59e0b',
  },
  {
    id: 6,
    title: 'Réseau MEP & Audit de Clashs en Usine',
    cat: 'MEP',
    loc: 'Lille',
    points: '450 M pts',
    type3d: 'mep',
    color: '#ef4444',
  },
];

const filteredProjects = computed(() => {
  if (activeCategory.value === 'Tous') return projects;
  return projects.filter((p) => p.cat === activeCategory.value);
});
</script>

<template>
  <section id="portfolio" class="py-24 bg-gray-950 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
      <!-- En-tête de section -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 class="font-['Outfit'] text-3xl font-bold text-white mb-2">
            Projets & Réalisations
          </h2>
          <p class="text-gray-400">
            Explorez nos numérisations 3D et maquettes BIM interactives en
            conditions réelles.
          </p>
        </div>

        <!-- Boutons de filtrage -->
        <div class="flex flex-wrap gap-2 mt-6 md:mt-0">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition',
              activeCategory === cat
                ? 'bg-cyan-500 text-gray-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                : 'bg-gray-900 text-gray-400 hover:bg-gray-800',
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Grille des Réalisations -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="p in filteredProjects"
          :key="p.id"
          class="p-6 rounded-2xl bg-gray-900/80 border border-gray-800 hover:border-cyan-500/40 transition flex flex-col justify-between group shadow-xl"
        >
          <div>
            <!-- Vraie Visionneuse 3D interactive intégrée dans la carte -->
            <div
              class="h-64 rounded-xl bg-gray-950 border border-gray-800/80 overflow-hidden mb-6 relative"
            >
              <div
                class="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-gray-900/90 border border-gray-800 text-[10px] font-mono text-cyan-400 uppercase tracking-widest"
              >
                Interactive 3D Viewer
              </div>
              <ThreeViewer :type="p.type3d" :accent-color="p.color" />
            </div>

            <!-- Métadonnées du projet -->
            <div
              class="flex items-center justify-between text-xs font-mono mb-2"
            >
              <span class="text-cyan-400 uppercase tracking-wider"
                >{{ p.cat }} • {{ p.loc }}</span
              >
              <span class="text-gray-500">Densité : {{ p.points }}</span>
            </div>

            <h3
              class="font-['Outfit'] text-xl font-bold text-white group-hover:text-cyan-400 transition mb-4"
            >
              {{ p.title }}
            </h3>
          </div>

          <!-- Bouton d'action -->
          <div
            class="pt-4 border-t border-gray-800/60 flex items-center justify-between"
          >
            <span class="text-xs text-gray-400"
              >Livrable : Maquette LOD 300 / IFC</span
            >
            <a
              href="#contact"
              class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
            >
              Inspecter le projet →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
