<template>
    <div class="container mx-auto p-4">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Product Image -->
        <div class="md:w-1/2">
          <img :src="productImage" :alt="productName" class="w-full rounded-lg shadow-lg">
          <div class="flex gap-2 mt-4">
            <img :src="thumbnail1" alt="Thumbnail 1" class="w-1/3 rounded-lg shadow-md">
            <img :src="thumbnail2" alt="Thumbnail 2" class="w-1/3 rounded-lg shadow-md">
          </div>
        </div>
  
        <!-- Product Details -->
        <div class="md:w-1/2">
          <h1 class="text-2xl font-bold mb-2">{{ productName }}</h1>
          <p class="text-gray-600 mb-2">{{ productCode }}</p>
          <p class="text-3xl font-semibold text-green-600 mb-4">{{ price }}đ</p>
          <p class="text-gray-700 mb-4">{{ description }}</p>
          <div class="grid grid-cols-2 gap-2 text-gray-700 mb-4">
            <div><strong>Giá cây bao gồm:</strong></div>
            <div>{{ scientificName }}</div>
            <div><strong>Tên khoa học:</strong></div>
            <div>{{ commonName }}</div>
            <div><strong>Quy cách sản phẩm:</strong></div>
            <div>{{ dimensions }}</div>
            <div><strong>Độ ẩm:</strong></div>
            <div>{{ humidity }}</div>
            <div><strong>Độ khó:</strong></div>
            <div>{{ difficulty }}</div>
            <div><strong>Như cầu nước:</strong></div>
            <div>{{ watering }}</div>
          </div>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" @click="addToCart">
            ADD TO CART
          </button>
        </div>
      </div>
  
      <!-- Additional Info -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Đặt hàng nhanh qua Hotline (8h - 21h)</h2>
        <ul class="list-disc list-inside text-gray-700">
          <li>Hotline 1: 0838 369 659 (Call/Zalo)</li>
          <li>Hotline 2: 09 6668 9393 (Call - Zalo)</li>
          <li>Hotline 3: 097 753 7494 (Zalo)</li>
        </ul>
        <p class="mt-2 text-gray-700">
          • Miễn phí giao hàng toàn quốc (tối đa 50k) <br>
          • Thời gian giao hàng từ 1-7 ngày <br>
          • Cạc sàn phẩm cây giống: Chi giao hàng tại TP.HCM <br>
          • Cạc sàn phẩm cây nhỏ, cây, phân, viên, v.v: Giao hàng toàn quốc
        </p>
        <p class="mt-2 text-gray-700">
          🔒 Chính sách bảo mật <br>
          🌱 Phục vụ tận tâm
        </p>
        <p class="mt-2 text-gray-700">
          MOW Garden luôn đồng hành cùng quý khách hàng. Online, do do trưng tỏa sản phẩm trên toàn quốc, khi có sự cố về cây giống, chúng tôi sẽ đổi cây mới cho khách hàng. Nhằm đảm bảo chất lượng dịch vụ và quyền lợi của khách hàng.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductPage',
    props: {
      productImage: {
        type: String,
        default: 'https://via.placeholder.com/400x500'
      },
      thumbnail1: {
        type: String,
        default: 'https://via.placeholder.com/100x120'
      },
      thumbnail2: {
        type: String,
        default: 'https://via.placeholder.com/100x120'
      },
      productName: {
        type: String,
        default: 'Cây phất tài bệ 5 - Cây thiệt mọc lan'
      },
      productCode: {
        type: String,
        default: 'CPTK001'
      },
      price: {
        type: String,
        default: '750.000'
      },
      description: {
        type: String,
        default: 'Cây phất tài bệ được ươc bồi thường khi cây chết, mọc lan. Lợi cây không được chăm sóc tốt, khi cây chết sẽ được đổi cây mới. Cây phù hợp để bàn hoặc để trong góc phòng.'
      },
      scientificName: {
        type: String,
        default: 'Dracaena fragrans'
      },
      commonName: {
        type: String,
        default: 'Phất tài bệ - Thiệt Mọc lan'
      },
      dimensions: {
        type: String,
        default: 'Chiều cao cây: 30x30cm (DxC)'
      },
      humidity: {
        type: String,
        default: 'Độ ẩm tốt: 120 - 130 cm'
      },
      difficulty: {
        type: String,
        default: 'Dễ chăm sóc'
      },
      watering: {
        type: String,
        default: 'Tưới nước 2 - 3 lần/tuần'
      }
    },
    methods: {
      addToCart() {
        // Add to cart logic here (e.g., emit an event or update a store)
        console.log('Added to cart:', this.productName);
        this.$emit('add-to-cart', this.productName);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any custom styles here if needed */
  </style>