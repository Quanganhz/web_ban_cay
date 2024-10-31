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
      <h2 class="text-7xl font-bold mb-4 text-white">Breath Natural</h2>
      <p class="text-gray-300 text-lg mb-4 max-w-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
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
        <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
        <img
          :src="plantTrending.image"
          alt="Calathea plant"
          class="w-60 h-60 -mt-20 rounded-lg relative z-10"
        />
        <h4 class="text-md sm:text-lg text-white -mt-10 font-bold text-center relative z-10">
          {{ plantTrending.name }} 
        </h4>
        <p class="text-gray-300 text-xs sm:text-sm mb-4 text-center relative z-10">
          {{ plantTrending.description }}
        </p>
        <button class="bg-green-500 sm:px-4 py-2 rounded-full text-white relative z-10">
          Buy Now
        </button>
      </div>

      <div class="container mx-auto mt-80">
        <h3 class="text-4xl text-center font-bold mb-10">Our Trendy Plants</h3>

        <div ref="plant1" class="relative h-96 mt-96 flex items-center icon animate__animated">
          <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
          <img :src="plant1.image" alt="plant" class="w-auto h-auto -ml-20 -mt-52 z-10" />
          <div class="relative z-50 ml-48 mr-10">
            <h4 class="text-4xl font-bold mb-2 text-white">{{ plant1.name }}</h4>
            <p class="text-white text-lg mb-4">
              {{ plant1.description }}
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
              {{ plant2.description }}
            </p>
            <div class="flex justify-between items-center mt-24">
              <span class="text-lg font-bold text-white">{{ plant2.price }}</span>
              <button class="bg-green-500 px-4 py-2 rounded-full text-white">Explore</button>
            </div>
          </div>
          <img :src="plant2.image" alt="plant" class="w-auto h-auto ml-auto -mr-40 -mt-40 z-10" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'PlantSection',
  data() {
    return {
      plant1: {
        name: "For Small Decs Ai Plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "Rs. 599",
        image: "/src/assets/01.png",
      },
      plant2: {
        name: "For Fresh Decs Ai Plant",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "Rs. 599",
        image: "/src/assets/02.png",
      },
      plantTrending: {
         name: "Calathea Plant",
         description: "Trendy House Phant",
         image: "/src/assets/03.png", 
      },
      plant1AnimationAllowed: true,  // Trạng thái cho phép chạy animation của plant1
      plant2AnimationAllowed: true,  // Trạng thái cho phép chạy animation của plant2
    };
  },
  methods: {
    handleScroll() {
      const plant1Element = this.$refs.plant1;
      const plant2Element = this.$refs.plant2;

      const plant1Position = plant1Element.getBoundingClientRect().top;
      const plant2Position = plant2Element.getBoundingClientRect().top;

      // Kiểm tra nếu vị trí của plant1 trong tầm nhìn và cho phép chạy animation
      if (plant1Position < window.innerHeight && plant1Position > 0 && this.plant1AnimationAllowed) {
        this.plant1AnimationAllowed = false;  // Không cho phép chạy animation tiếp
        plant1Element.classList.remove('animate__fadeInLeft');
        void plant1Element.offsetWidth;  // Buộc reflow
        plant1Element.classList.add('animate__fadeInLeft');

        // Đợi 5000ms rồi mới cho phép animation chạy lại
        setTimeout(() => {
          this.plant1AnimationAllowed = true;
        }, 5000);
      }

      // Kiểm tra nếu vị trí của plant2 trong tầm nhìn và cho phép chạy animation
      if (plant2Position < window.innerHeight && plant2Position > 0 && this.plant2AnimationAllowed) {
        this.plant2AnimationAllowed = false;  // Không cho phép chạy animation tiếp
        plant2Element.classList.remove('animate__fadeInRight');
        void plant2Element.offsetWidth;  // Buộc reflow
        plant2Element.classList.add('animate__fadeInRight');

        // Đợi 5000ms rồi mới cho phép animation chạy lại
        setTimeout(() => {
          this.plant2AnimationAllowed = true;
        }, 50000);
      }
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

