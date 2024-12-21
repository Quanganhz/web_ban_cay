<template>
  <div class="flex items-start mt-14 justify-center mb-20">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-white mb-8">Customer Review</h1>
      <div class="flex justify-center space-x-8">
        <div v-for="(review, index) in reviews" :key="index" class="relative text-white p-6 rounded-lg shadow-lg w-96 h-80">
          <div class="absolute inset-0 bg-white opacity-5 rounded-3xl"></div>
          <div class="flex items-center mb-4">
            <div>
              <h2 class="text-2xl font-bold">{{ review.username }}</h2>
            </div>
          </div>
          <p class="text-gray-400 text-lg text-justify p-2">{{ review.usercomment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviews: []
    };
  },
  mounted() {
    this.fetchRandomReviews();
  },
  methods: {
    async fetchRandomReviews() {
      try {
        // Gọi API bằng fetch
        const response = await fetch('https://localhost:7135/api/Usercontacts');

        // Kiểm tra phản hồi hợp lệ
        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu');
        }

        // Chuyển đổi phản hồi thành JSON
        const data = await response.json();

        // Chọn 3 dữ liệu ngẫu nhiên từ mảng
        const randomReviews = this.getRandomItems(data, 3);

        // Cập nhật dữ liệu reviews
        this.reviews = randomReviews;
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    },
    
    // Phương thức để lấy n phần tử ngẫu nhiên từ mảng
    getRandomItems(arr, num) {
      const result = [];
      const clonedArray = [...arr];
      
      while (result.length < num && clonedArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        result.push(clonedArray.splice(randomIndex, 1)[0]);
      }
      
      return result;
    }
  }
};
</script>

<style scoped>
body {
  background-color: #1a1a1a;
  font-family: 'Arial', sans-serif;
}
</style>
