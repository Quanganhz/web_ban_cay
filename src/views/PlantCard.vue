<template>
    <div class="mr-8 mt-36 p-6 relative">
      <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
      <img  :src="image" :alt="name" class="w-96 h-96 relative z-10 -mt-44" />
      <h3 class="text-xl font-semibold -mt-10">{{ name }}</h3>
      <p class="text-sm text-gray-400">{{ description }}</p>
      
      <div class="text-gray-400 mt-2 flex items-center justify-end">
        <div class="price text-lg font-semibold mr-6">{{ price }}</div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10">
            <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
            <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
          </svg>
          
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      image: String,
      name: String,
      description: String,
      price: String,
    },
  };
  </script>
  
  <style scoped>
  /* Thêm các style tùy chỉnh nếu cần */
  </style>
  