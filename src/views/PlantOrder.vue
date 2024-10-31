<template>
  <div class="p-1">
    <h1 class="text-center text-4xl font-semibold">PlantOrder</h1>
    <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <PlantCard
        v-for="(plant, index) in displayedPlants"
        :key="index"
        :image="plant.image"
        :name="plant.name"
        :description="plant.description"
        :price="plant.price"
        class="animate__animated animate__fadeInUp"
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
      plants: [
        {
          image: "/src/assets/01.png",
          name: "Calathea plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 309/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Desk plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 359/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Calathea ai plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 399/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Cal 874 plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 259/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Show plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 759/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Calat O2 plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 659/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Calathea plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 309/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Desk plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 359/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Calathea ai plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 399/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Cal 874 plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 259/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Show plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 759/-",
        },
        {
          image: "/src/assets/01.png",
          name: "Calat O2 plant",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          price: "Rs. 659/-",
        },
      ],
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
  },
};
</script>

<style scoped>
/* Animation CSS */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
