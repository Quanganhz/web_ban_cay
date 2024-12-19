<template>
  <section class="relative py-32 pt-40">
    <div class="absolute inset-0 bg-center">
      <img
        src="@/assets/background_tree.png"
        alt="Calathea plant"
        class="w-full h-full bg-center object-cover opacity-70"
      />
    </div>

    <div class="relative z-0 text-left mx-36">
      <h2 class="text-7xl font-bold mb-4 text-white">Cây trồng Planto</h2>
      <p class="text-gray-300 text-lg mb-4 max-w-xl">
        Nơi phục vụ và chăm sóc mọi loại cây cảnh trong nhà 
      </p>

      <div class="mt-8 flex space-x-4">
        <button class="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300">
          Explore
        </button>
        <button class="px-12 py-2 bg-transparent text-white border border-white rounded-full hover:bg-white hover:text-green-500 transition duration-300">
          <i class="fas fa-play"></i> Live Demo
        </button>
      </div>

      <div class="absolute right-14 top-10 pb-4 w-60 flex flex-col justify-center items-center">
        <img :src="plantTrending.imageurl" alt="Calathea plant" class="w-60 h-60 -mt-20 rounded-lg relative z-10" />
        <h4 class="text-md sm:text-lg text-white -mt-10 font-bold text-center relative z-10">
          {{ plantTrending.name }} 
        </h4>
        <p class="text-gray-300 text-xs sm:text-sm mb-4 text-center relative z-10">
          {{ plantTrending.shortdescription }}
        </p>
        <button class="bg-green-500 sm:px-4 py-2 rounded-full text-white relative z-10">
          Buy Now
        </button>
      </div>

      <div class="container mx-auto mt-80">
        <h3 class="text-4xl text-center font-bold mb-10">Our Trendy Plants</h3>

        <div ref="plant1" class="relative h-96 mt-96 flex items-center icon animate__animated">
          <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
          <img :src="plant1.imageurl" alt="plant" class="w-auto h-auto -ml-20 -mt-52 z-10" />
          <div class="relative z-50 ml-48 mr-10">
            <h4 class="text-4xl font-bold mb-2 text-white">{{ plant1.name }}</h4>
            <p class="text-white text-lg mb-4">
              {{ plant1.shortdescription }}
            </p>
            <div class="flex justify-between items-center mt-24">
              <span class="text-lg font-bold text-white">{{ plant1.price }}</span>
              <button class="bg-green-500 px-4 py-2 rounded-full text-white">Explore</button>
            </div>
          </div>
        </div>

        <div ref="plant2" class="relative h-96 mt-64 flex items-center icon animate__animated">
          <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
          <div class="relative z-50 ml-8">
            <h4 class="text-4xl font-bold mb-2 text-white">{{ plant2.name }}</h4>
            <p class="text-white text-lg mb-4">
              {{ plant2.shortdescription }}
            </p>
            <div class="flex justify-between items-center mt-24">
              <span class="text-lg font-bold text-white">{{ plant2.price }}</span>
              <button class="bg-green-500 px-4 py-2 rounded-full text-white">Explore</button>
            </div>
          </div>
          <img :src="plant2.imageurl" alt="plant" class="w-96 h-96 ml-auto z-10" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchPlants, fetchTrendingPlant } from "@/stores/plantService";

export default {
  name: 'PlantSection',
  data() {
    return {
      plant1: {},
      plant2: {},
      plantTrending: {},
      plant1AnimationAllowed: true,
      plant2AnimationAllowed: true,
    };
  },
  methods: {
    handleScroll() {
      const plant1Element = this.$refs.plant1;
      const plant2Element = this.$refs.plant2;
      
      const plant1Position = plant1Element.getBoundingClientRect().top;
      const plant2Position = plant2Element.getBoundingClientRect().top;

      if (plant1Position < window.innerHeight && plant1Position > 0 && this.plant1AnimationAllowed) {
        this.plant1AnimationAllowed = false;
        plant1Element.classList.remove('animate__fadeInLeft');
        void plant1Element.offsetWidth;
        plant1Element.classList.add('animate__fadeInLeft');
        setTimeout(() => {
          this.plant1AnimationAllowed = true;
        }, 5000);
      }

      if (plant2Position < window.innerHeight && plant2Position > 0 && this.plant2AnimationAllowed) {
        this.plant2AnimationAllowed = false;
        plant2Element.classList.remove('animate__fadeInRight');
        void plant2Element.offsetWidth;
        plant2Element.classList.add('animate__fadeInRight');
        setTimeout(() => {
          this.plant2AnimationAllowed = true;
        }, 50000);
      }
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll);
    const plants = await fetchPlants();
    const trendingPlant = await fetchTrendingPlant();

    // Giả sử bạn lấy 2 cây đầu tiên cho plant1 và plant2
    this.plant1 = plants[1] || {};
    this.plant2 = plants[2] || {};
    this.plantTrending = trendingPlant || {};

    console.log(this.plantTrending);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
}
</script>
