<template>
  <div class="min-h-screen bg-green-950 text-white font-sans">
    <header class="bg-blend-color-dodge p-4 pt-3 fixed top-8 left-40 right-44 z-50 rounded-3xl">
      <div class="relative container mx-auto flex justify-between items-center px-4">
        <!-- Nền mờ cho header -->
        <div class="absolute inset-0 bg-white opacity-5 h-20 rounded-2xl"></div>

        <!-- Logo và tên Planto -->
        <div class="flex items-center mt-4 space-x-3 relative z-10">
          <button class="flex items-center space-x-3">
            <img src="@/assets/icon.png" alt="Planto logo" class="w-12 h-12" />
            <h1 class="text-2xl font-bold mt-1">Planto.</h1>
          </button>
        </div>

        <!-- Menu điều hướng -->
        <nav class="relative z-10">
          <ul class="flex space-x-6">
            <li><a href="#" class="hover:text-green-500">Home</a></li>
            <li><a href="#" class="hover:text-green-500">Plants Types</a></li>
            <li><a href="#" class="hover:text-green-500">More</a></li>
            <li><a href="#" class="hover:text-green-500">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <div id="app">
      <PlantSection />
    </div>
  </div>
</template>
<script>
import PlantSection from '@/views/PlantSection.vue'

export default {
  components: {
    PlantSection
  }
}
</script>
