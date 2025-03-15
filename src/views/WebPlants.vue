<template>
  <div style="background-color: #1b2316" class="min-h-screen text-white font-sans">
    <Navbar :active-section.sync="activeSection" @update:activeSection="activeSection = $event" />
    <div id="app" class="pt-20">
      <div id="plant-section" class="animate__animated animate__fadeIn">
        <PlantSection />
      </div>
      <div id="plant-order" class="animate__animated animate__fadeIn animate__delay-1s">
        <PlantOder class="ml-36 mr-28 mt-10" />
      </div>
      <div id="comments-section" class="animate__animated animate__fadeIn animate__delay-2s">
        <PlantComment />
      </div>
      <div id="contact-section" class="animate__animated animate__fadeIn animate__delay-3s">
        <Contact class="" />
      </div>
    </div>
  </div>
</template>

<script>
import PlantSection from '@/views/PlantSection.vue';
import PlantOder from '@/views/PlantOrder.vue';
import PlantComment from '@/views/PlantComment.vue';
import Contact from '@/views/Contact.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
    PlantSection,
    PlantOder,
    PlantComment,
    Contact,
  },
  data() {
    return {
      activeSection: '',
    };
  },
};
</script>

<style scoped>
.section {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  opacity: 0;
  transform: translateY(20px);
}

.section.active {
  opacity: 1;
  transform: translateY(0);
}
</style>