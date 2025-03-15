<!-- Navbar.vue -->
<template>
  <header class="bg-blend-color-dodge p-4 pt-3 fixed left-28 right-32 z-50 rounded-3xl">
    <div class="relative container mx-auto flex justify-between items-center px-4">
      <div class="absolute inset-0 bg-gray-900 opacity-70 h-20 rounded-2xl"></div>
      <div class="flex items-center mt-4 space-x-3 relative z-10">
        <router-link to="/admin" class="flex items-center space-x-3">
          <img src="@/assets/icon.png" alt="Planto logo" class="w-12 h-12" />
          <h1 class="text-2xl font-bold mt-1">Planto.</h1>
        </router-link>
      </div>
      <nav class="relative z-10 flex items-center">
        <ul class="flex space-x-6">
          <li>
            <a
              href="#plant-section"
              :class="{ 'text-green-500 active': activeSection === 'plant-section' }"
              @click.prevent="setActiveSection('plant-section')"
              class="hover:text-green-500"
            >
              <span v-if="!isPlantRoute">PlantSection</span>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#plant-order"
              :class="{ 'text-green-500 active': activeSection === 'plant-order' }"
              @click.prevent="setActiveSection('plant-order')"
              class="hover:text-green-500"
            >
              <span v-if="!isPlantRoute">PlantOrder</span>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#comments-section"
              :class="{ 'text-green-500 active': activeSection === 'comments-section' }"
              @click.prevent="setActiveSection('comments-section')"
              class="hover:text-green-500"
            >
              <span v-if="!isPlantRoute">Comments</span>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-4l-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5l-2 2v4h-4" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#contact-section"
              :class="{ 'text-green-500 active': activeSection === 'contact-section' }"
              @click.prevent="setActiveSection('contact-section')"
              class="hover:text-green-500"
            >
              <span v-if="!isPlantRoute">Contact</span>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </li>
        </ul>
        <!-- Icon giỏ hàng chỉ hiển thị ở route bắt đầu bằng /plant -->
        <div v-if="isPlantRoute" class="ml-6 relative">
          <button class="hover:text-green-500" @click="goToCart">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <!-- Hiển thị số lượng sản phẩm trong giỏ hàng từ store -->
            <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ totalItems }}
            </span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { useCartStore } from '@/stores/cart'; // Import store

export default {
  props: {
    activeSection: {
      type: String,
      default: '',
    },
  },
  setup() {
    // Lấy instance của store
    const cartStore = useCartStore();

    return {
      totalItems: cartStore.totalItems, // Sử dụng getter từ store
    };
  },
  computed: {
    isPlantRoute() {
      return this.$route.path.startsWith('/plant');
    },
  },
  methods: {
    setActiveSection(section) {
      this.$emit('update:activeSection', section);
      const targetElement = document.querySelector(`#${section}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    handleScroll() {
      const sections = ['plant-section', 'plant-order', 'comments-section', 'contact-section'];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight) {
            this.$emit('update:activeSection', section);
          }
        }
      });
    },
    goToCart() {
      // Điều hướng đến trang giỏ hàng
      this.$router.push('/cart');
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
ul li a {
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
}

ul li a:hover {
  color: #4caf50;
}

ul li a.active {
  color: #4caf50;
}

button {
  transition: color 0.3s ease;
}
</style>