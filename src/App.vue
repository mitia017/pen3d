<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import PointCloudComparison from './components/PointCloudComparison.vue';
import Services from './components/Services.vue';
import Portfolio from './components/Portfolio.vue';
import ContactForm from './components/ContactForm.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div
    class="min-h-screen bg-[#0A0F1D] text-gray-100 font-['Inter'] antialiased selection:bg-cyan-500 selection:text-gray-950"
  >
    <Navbar />
    <main>
      <Hero />
      <PointCloudComparison />
      <Services />
      <Portfolio />
      <ContactForm />
    </main>
    <Footer />
  </div>
</template>
