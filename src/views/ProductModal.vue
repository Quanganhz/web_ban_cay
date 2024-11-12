<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <button
        @click="closeModal"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
      >
        &times;
      </button>
      <img :src="image" :alt="name" class="w-full h-64 object-cover rounded-lg mb-4" />
      <h2 class="text-2xl font-bold mb-2 text-black">{{ name }}</h2>
      <p class="text-sm text-gray-600 mb-4">{{ descriptionfull }}</p>
      <p class="text-lg font-semibold text-gray-800">{{ price }}</p>

      <!-- Thêm ô input để viết comment -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    name: String,
    descriptionfull: String,
    price: String,
    isModalOpen: Boolean
  },
  data() {
    return {
      comment: '' // Dùng để lưu trữ giá trị comment
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* Thêm các style tùy chỉnh nếu cần */
</style>
