<template>
  <div style="background-color: #1B2316;" class="min-h-screen text-white font-sans">
    <header class="bg-blend-color-dodge p-4 pt-3 fixed mt-0 left-28 right-32 z-50 rounded-3xl">
      <div class="relative container mx-auto flex justify-between items-center px-4">
        <div class="absolute inset-0 bg-gray-900 opacity-70 h-20 rounded-2xl"></div>
        <div class="flex items-center mt-4 space-x-3 relative z-10">
          <a href="#" class="flex items-center space-x-3">
            <img src="@/assets/icon.png" alt="Planto logo" class="w-12 h-12" />
            <h1 class="text-2xl font-bold mt-1">Planto.</h1>
          </a>
        </div>
        <nav class="relative z-10">
          <ul class="flex space-x-6">
            <li>
              <a 
                href="#plant-section" 
                :class="{ 'text-green-500 active': activeSection === 'plant-section' }" 
                @click.prevent="setActiveSection('plant-section')" 
                class="hover:text-green-500"
              >
                PlantSection
              </a>
            </li>
            <li>
              <a 
                href="#plant-order" 
                :class="{ 'text-green-500 active': activeSection === 'plant-order' }" 
                @click.prevent="setActiveSection('plant-order')" 
                class="hover:text-green-500"
              >
                PlantOrder
              </a>
            </li>
            <li>
              <a 
                href="#comments-section" 
                :class="{ 'text-green-500 active': activeSection === 'comments-section' }" 
                @click.prevent="setActiveSection('comments-section')" 
                class="hover:text-green-500"
              >
                Comments
              </a>
            </li>
            <li><a href="#" class="hover:text-green-500">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <div id="app">
      <div id="plant-section">
        <PlantSection />
      </div>
      <div id="plant-order">
        <PlantOder class="ml-36 mr-28 mt-10"/>
      </div>
      <div id="comments-section">
        <PlantComment class=""/>
      </div>
    </div>
  </div>
</template>

<script>
import PlantSection from '@/views/PlantSection.vue';
import PlantOder from '@/views/PlantOrder.vue';
import PlantComment from '@/views/PlantComment.vue';

export default {
  components: {
    PlantSection,
    PlantOder,
    PlantComment
  },
  data() {
    return {
      activeSection: ''
    };
  },
  methods: {
    setActiveSection(section) {
      this.activeSection = section;
      const targetElement = document.querySelector(`#${section}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    handleScroll() {
      const sections = ['plant-section', 'plant-order', 'comments-section'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight) {
          this.activeSection = section;
        }
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
ul li a {
  transition: color 0.3s ease;
}

ul li a:hover {
  color: #4CAF50;
}

ul li a.active {
  color: #4CAF50;
}

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
