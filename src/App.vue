<template>
  <div class="min-h-screen bg-gray-900 text-white font-sans">
    <header class="bg-gray-800 py-4">
      <div class="container mx-auto flex justify-between items-center px-4">
        <!-- Logo và tên Planto -->
        <div class="flex items-center space-x-3">
          <img src="@/assets/icon.png" alt="Planto logo" class="w-12 h-12" />
          <h1 class="text-2xl font-bold">Planto.</h1>
        </div>

        <!-- Menu điều hướng -->
        <nav>
          <ul class="flex space-x-6">
            <li><a href="#" class="hover:text-green-500">Home</a></li>
            <li><a href="#" class="hover:text-green-500">Plants Types</a></li>
            <li><a href="#" class="hover:text-green-500">More</a></li>
            <li><a href="#" class="hover:text-green-500">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Section giới thiệu -->
    <section class="py-10">
      <!-- Background Image -->
      <img
        src="@/assets/background_tree.png"
        alt="Background plant"
        class="text-center top-0 left-0 w-2/3 h-1/3 object-cover -z-10"
      />

      <!-- Content Section -->
      <div>
        <div class="">
          <h2 class="text-5xl font-bold mb-4 text-white">Breath Natural</h2>
          <p class="text-gray-300 mb-4 max-w-xl text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <!-- Buttons -->
        <div class="absolute top-15 py-2 left-1/4 bg-gray-900 bg-opacity-50 p-4 rounded-lg">
          <button
            class="px-6 py-2 space-x-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
          >
            Explore
          </button>
          <button
            class="px-6 py-2 bg-transparent text-white border border-white rounded-full hover:bg-white hover:text-green-500 transition duration-300"
          >
            <i class="fas fa-play"></i> Live Demo
          </button>
        </div>

        <!-- Plant Info Card -->
        <div class="absolute right-12 top-1/4 bg-gray-800 bg-opacity-70 p-6 rounded-lg">
          <img
            src="@/assets/background_tree.png"
            alt="Calathea plant"
            class="w-20 h-20 mb-4 rounded-lg"
          />
          <h4 class="text-lg text-white font-bold">Calathea Plant</h4>
          <p class="text-gray-300 text-sm mb-4">Trendy House Plant</p>
          <button class="bg-green-500 px-4 py-2 rounded-full text-white">Buy Now</button>
        </div>
      </div>
    </section>

    <!-- Section các loại cây -->
    <section class="container mx-auto py-20">
      <h3 class="text-3xl font-bold mb-10">Our Trendy Plants</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div class="bg-gray-800 p-6 rounded-lg">
          <img
            src="@/assets/background_tree.png"
            alt="plant"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 class="text-xl font-bold mb-2">For Small Decs Ai Plat</h4>
          <p class="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">Rs. 599$</span>
            <button class="bg-green-500 px-4 py-2 rounded-full text-white">Explore</button>
          </div>
        </div>

        <div class="bg-gray-800 p-6 rounded-lg">
          <img
            src="@/assets/background_tree.png"
            alt="plant"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 class="text-xl font-bold mb-2">For Fresh Decs Ai Plat</h4>
          <p class="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">Rs. 579$</span>
            <button class="bg-green-500 px-4 py-2 rounded-full text-white">Explore</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
