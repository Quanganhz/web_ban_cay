<!-- Cart.vue -->
<template>
    <div style="background-color: #1b2316" class="min-h-screen text-white font-sans p-8">
      <h1 class="text-3xl font-bold mb-6">Giỏ hàng của bạn</h1>
      <div v-if="totalItems === 0" class="text-center">
        <p>Giỏ hàng của bạn đang trống.</p>
      </div>
      <div v-else class="space-y-4">
        <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
          <img :src="item.imageUrl" alt="Product Image" class="w-16 h-16 object-cover rounded" />
          <div class="flex-1">
            <h2 class="text-lg font-semibold">{{ item.name }}</h2>
            <p class="text-sm text-gray-400">{{ formatPrice(item.price) }} x {{ item.quantity }}</p>
          </div>
          <p class="font-bold">{{ formatPrice(item.price * item.quantity) }}</p>
        </div>
        <div class="text-right">
          <p class="text-lg font-bold">
            Tổng cộng: {{ formatPrice(totalPrice) }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '@/stores/cart'; // Import store
  
  // Lấy instance của store
  const cartStore = useCartStore();
  
  // Truy cập state và getters từ store
  const cartItems = cartStore.cartItems; // Danh sách sản phẩm trong giỏ
  const totalItems = cartStore.totalItems; // Tổng số lượng sản phẩm (getter)
  const totalPrice = cartStore.totalPrice; // Tổng giá trị giỏ hàng (getter)
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  </script>
  
  <style scoped>
  /* Thêm style tùy ý */
  </style>