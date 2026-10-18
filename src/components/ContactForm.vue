<script setup>
import { reactive, ref } from 'vue';
import emailjs from '@emailjs/browser';

const form = reactive({
  name: '',
  email: '',
  service: 'Scan-to-BIM Architecture',
  surface: 1000,
  message: '',
});

const isSubmitted = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const handleSubmit = () => {
  isLoading.value = true;
  errorMessage.value = '';

  // Paramètres de configuration EmailJS (À remplacer par vos propres identifiants)
  const serviceID = 'service_5xuovt6';
  const templateID = 'template_esm8o5c';
  const publicKey = 'ayKuqD-y74liYg8i7';

  const templateParams = {
    from_name: form.name,
    from_email: form.email,
    service_type: form.service,
    surface: form.surface,
    message: form.message,
  };

  emailjs.send(serviceID, templateID, templateParams, publicKey).then(
    (response) => {
      isLoading.value = false;
      isSubmitted.value = true;
    },
    (error) => {
      isLoading.value = false;
      errorMessage.value =
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer.";
      console.error('EmailJS Error:', error);
    }
  );
};
</script>

<template>
  <section id="contact" class="py-24 bg-[#0A0F1D]">
    <div class="max-w-4xl mx-auto px-6">
      <div
        class="p-8 md:p-12 rounded-3xl bg-gray-900/80 border border-gray-800 shadow-2xl"
      >
        <h2 class="font-['Outfit'] text-3xl font-bold text-white mb-2">
          Demander un Devis ou une Étude
        </h2>
        <p class="text-gray-400 mb-8">
          Transmettez-nous les détails de votre projet pour recevoir une
          proposition sous 24h.
        </p>

        <form
          v-if="!isSubmitted"
          @submit.prevent="handleSubmit"
          class="space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                class="block text-xs font-mono text-gray-400 uppercase mb-2"
                >Nom Complet / Entreprise</label
              >
              <input
                v-model="form.name"
                required
                type="text"
                placeholder="Jean Dupont"
                class="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label
                class="block text-xs font-mono text-gray-400 uppercase mb-2"
                >Email professionnel</label
              >
              <input
                v-model="form.email"
                required
                type="email"
                placeholder="j.dupont@entreprise.com"
                class="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                class="block text-xs font-mono text-gray-400 uppercase mb-2"
                >Type de Prestation</label
              >
              <select
                v-model="form.service"
                class="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition"
              >
                <option>Scan-to-BIM Architecture</option>
                <option>Scan-to-BIM Industriel</option>
                <option>Modélisation MEP & Réseaux</option>
                <option>Topographie Drone LiDAR</option>
              </select>
            </div>
            <div>
              <label
                class="block text-xs font-mono text-gray-400 uppercase mb-2"
                >Surface estimée (m²)</label
              >
              <input
                v-model="form.surface"
                type="number"
                class="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-mono text-gray-400 uppercase mb-2"
              >Détails du projet / Spécifications LOD</label
            >
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Précisez le niveau de détail souhaité..."
              class="w-full px-4 py-3 rounded-lg bg-gray-950 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition"
            ></textarea>
          </div>

          <div v-if="errorMessage" class="text-red-400 text-sm font-mono">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold transition shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50"
          >
            {{ isLoading ? 'Envoi en cours...' : 'Envoyer la demande' }}
          </button>
        </form>

        <div v-else class="text-center py-12">
          <div
            class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-2xl mb-4"
          >
            ✓
          </div>
          <h3 class="font-['Outfit'] text-2xl font-bold text-white mb-2">
            Demande transmise avec succès
          </h3>
          <p class="text-gray-400">
            Notre équipe d'ingénieurs analysera votre besoin sous 24h ouvrées.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
