<!-- components/PlantSection.vue -->
<template>
  <section class="relative py-32 pt-40">
    <!-- Thêm pt-20 để tránh bị che bởi header -->
    <div class="absolute inset-0 bg-center">
      <img
        src="@/assets/background_tree.png"
        alt="Calathea plant"
        class="w-full h-full bg-center object-cover opacity-70"
      />
    </div>

    <!-- Content Section -->
    <div class="relative z-0 text-left">
      <div class="container mx-auto text-left">
        <h2 class="text-7xl font-bold mb-4 text-white">Breath Natural</h2>
        <p class="text-gray-300 text-lg mb-4 max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>

      <!-- Buttons -->
      <div class="container mx-auto mt-8 flex space-x-4">
        <button
          class="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
        >
          Explore
        </button>
        <button
          class="px-12 py-2 bg-transparent text-white border border-white rounded-full hover:bg-white hover:text-green-500 transition duration-300"
        >
          <i class="fas fa-play"></i> Live Demo
        </button>
      </div>

      <!-- Plant Info Card -->
      <div class="absolute right-72 top-10 pb-4 w-60 flex flex-col justify-center items-center">
        <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
        <img
          src="@/assets/03.png"
          alt="Calathea plant"
          class="w-60 h-60 -mt-20 rounded-lg relative z-10"
        />
        <h4 class="text-md sm:text-lg text-white -mt-10 font-bold text-center relative z-10">
          Calathea Plant
        </h4>
        <p class="text-gray-300 text-xs sm:text-sm mb-4 text-center relative z-10">
          Trendy House Plant
        </p>
        <button class="bg-green-500 sm:px-4 py-2 rounded-full text-white relative z-10">
          Buy Now
        </button>
      </div>

      <!-- Our Trendy Plants -->
      <div class="container mx-auto mt-80">
        <h3 class="text-4xl text-center font-bold mb-10">Our Trendy Plants</h3>

        <div class="relative h-96 mt-64 flex items-center">
          <!-- Lớp overlay để làm mờ nền -->
          <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>

          <img src="@/assets/01.png" alt="plant" class="w-auto h-auto -ml-20 -mt-52 z-10" />
          <!-- Thêm 'z-10' để đưa ảnh lên trên lớp overlay -->

          <div class="relative z-50 ml-48 mr-10">
            <!-- Thêm 'relative' và 'z-50' để đưa nội dung lên trên lớp overlay -->
            <h4 class="text-4xl font-bold mb-2 text-white">For Small Decs Ai Plat</h4>
            <p class="text-white text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </p>
            <div class="flex justify-between items-center mt-24">
              <span class="text-lg font-bold text-white">Rs. 599$</span>
              <button class="bg-green-500 px-4 py-2 rounded-full text-white">Explore</button>
            </div>
          </div>
        </div>
        <div class="relative h-96 mt-64 flex items-center">
          <!-- Lớp overlay để làm mờ nền -->
          <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>

          <!-- Phần văn bản bên trái -->
          <div class="relative z-50 ml-8">
            <!-- Thay đổi 'ml-48' thành 'ml-8' để căn chỉnh gần hơn -->
            <h4 class="text-4xl font-bold mb-2 text-white">For Fresh Decs Ai Plat</h4>
            <p class="text-white text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </p>
            <div class="flex justify-between items-center mt-24">
              <span class="text-lg font-bold text-white">Rs. 599$</span>
              <button class="bg-green-500 px-4 py-2 rounded-full text-white">Explore</button>
            </div>
          </div>

          <!-- Hình ảnh bên phải -->
          <img src="@/assets/02.png" alt="plant" class="w-auto h-auto ml-auto -mr-40 -mt-40 z-10" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PlantSection'
}
</script>

<style scoped>
/* Style nếu cần */
</style>
