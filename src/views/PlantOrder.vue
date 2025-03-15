<template>
  <div class="p-1">
    <h1 class="text-center text-4xl font-semibold">PlantOrder</h1>
    <transition-group
      name="fade"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <PlantCard
        v-for="(plant) in displayedPlants"
        :key="plant.id"
        :id="plant.id"
        :image="getPrimaryImage(plant)"
        :name="plant.name"
        :description="plant.shortDescription"
        :descriptionfull="plant.description"
        :price="plant.price"
      />
    </transition-group>
    <div class="flex justify-end mr-10 mt-10">
      <button class="text-xl underline hover:text-green-600 text-clip" @click="toggleDisplay">
        {{ showAll ? 'See less' : 'See all' }}
      </button>
    </div>
  </div>
</template>

<script>
import PlantCard from './PlantCard.vue';

export default {
  components: {
    PlantCard,
  },
  data() {
    return {
      showAll: false,
      plants: [],
    };
  },
  computed: {
    displayedPlants() {
      return this.showAll ? this.plants : this.plants.slice(0, 6);
    },
  },
  methods: {
    toggleDisplay() {
      this.showAll = !this.showAll;
    },
    async fetchPlants() {
      try {
        const response = await fetch('https://localhost:7135/api/Plants');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        this.plants = await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        this.plants = [];
      }
    },
    getPrimaryImage(plant) {
      if (plant.images && plant.images.length > 0) {
        const primaryImage = plant.images.find(img => img.isPrimary) || plant.images[0];
        return primaryImage.imageUrl;
      }
      return plant.imageUrl || 'https://via.placeholder.com/400x500'; // Ảnh mặc định nếu không có ảnh
    },
  },
  mounted() {
    this.fetchPlants();
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>