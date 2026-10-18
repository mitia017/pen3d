<script setup>
import ThreeViewer from './ThreeViewer.vue';
</script>

<template>
  <section
    id="hero"
    class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
  >
    <!-- Grid Overlay Background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]"
    ></div>

    <div
      class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
    >
      <!-- Left Column: Copywriting -->
      <div>
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Numérisation 3D & BIM de haute précision
        </div>

        <h1
          class="font-['Outfit'] font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight mb-6"
        >
          Capturer le réel, façonner votre
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            >jumeau numérique</span
          >
        </h1>

        <p class="text-gray-400 text-lg mb-8 leading-relaxed">
          Nous transformons vos bâtiments, usines et infrastructures physiques
          en maquettes numériques intelligentes grâce au scan laser 3D et aux
          méthodologies Scan-to-BIM.
        </p>

        <div class="flex flex-wrap gap-4">
          <a
            href="#services"
            class="px-6 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold transition shadow-[0_0_25px_rgba(0,229,255,0.4)]"
          >
            Explorer nos services
          </a>
          <a
            href="#contact"
            class="px-6 py-3.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-semibold transition"
          >
            Demander une étude
          </a>
        </div>
      </div>

      <div
        class="h-112.5 rounded-2xl bg-gray-900/60 border border-gray-800 p-2 relative shadow-2xl backdrop-blur-sm"
      >
        <div
          class="absolute top-4 left-4 z-10 bg-gray-950/80 px-3 py-1.5 rounded border border-gray-800 text-xs font-mono text-cyan-400 flex items-center gap-2"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span> Live Point
          Cloud Feed
        </div>
        <ThreeViewer type="hero" accentColor="#00e5ff" />
      </div>
    </div>
  </section>
</template>
