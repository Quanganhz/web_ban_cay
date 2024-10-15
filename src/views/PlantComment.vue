<template>
    <div class="flex items-start mt-14 justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-white mb-8">Customer Review</h1>
        <div class="flex justify-center space-x-8">
          <div v-for="(review, index) in reviews" :key="index" class="relative text-white p-6 rounded-lg shadow-lg w-96 h-80">
            <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
            <div class="flex items-center mb-4">
              <img :src="review.image" :alt="`Profile picture of ${review.name}`" class="w-16 h-16 rounded-full mr-4" width="50" height="50"/>
              <div>
                <h2 class="text-2xl font-bold">{{ review.name }}</h2>
                <div class="text-yellow-400">
                  <i v-for="star in review.stars" :key="star" class="fas" :class="star"></i>
                </div>
              </div>
            </div>
            <p class="text-gray-400 text-lg text-justify p-2">{{ review.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reviews: [
          {
            name: 'Maxn Raval',
            image: 'https://storage.googleapis.com/a1aa/image/S657DoMI47KXA5CnDpes6NtfAY1ajjOMrBSH0Txv1Oc27BlTA.jpg',
            stars: ['fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-star-half-alt'],
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
          },
          {
            name: 'Venely K',
            image: 'https://placehold.co/50x50',
            stars: ['fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-star-half-alt'],
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
          },
          {
            name: 'Lii Thakur',
            image: 'https://placehold.co/50x50',
            stars: ['fa-star', 'fa-star', 'fa-star', 'fa-star', 'fa-star-half-alt'],
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  body {
    background-color: #1a1a1a;
    font-family: 'Arial', sans-serif;
  }
  </style>
  