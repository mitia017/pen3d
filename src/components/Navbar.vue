<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-[#0A0F1D]/80 backdrop-blur-md border-b border-gray-800"
  >
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <a href="#" class="flex items-center gap-3 group">
        <div
          class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <span
          class="font-['Outfit'] font-bold text-xl tracking-wider text-white"
        >
          PEN <span class="text-cyan-400">3D</span>
        </span>
      </a>

      <nav
        class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300"
      >
        <a href="#hero" class="hover:text-cyan-400 transition">Accueil</a>
        <a href="#demo" class="hover:text-cyan-400 transition">Démo 3D</a>
        <a href="#services" class="hover:text-cyan-400 transition"
          >Services BIM</a
        >
        <a href="#portfolio" class="hover:text-cyan-400 transition"
          >Réalisations</a
        >
      </nav>

      <a
        href="#contact"
        class="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold text-sm transition shadow-[0_0_20px_rgba(0,229,255,0.3)]"
      >
        Demander un devis
      </a>
    </div>
  </header>
</template>
