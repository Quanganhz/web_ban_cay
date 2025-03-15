<!-- Plant.vue -->
<template>
  <div style="background-color: #1b2316" class="min-h-screen text-white font-sans">
    <Navbar :active-section.sync="activeSection" @update:activeSection="activeSection = $event" />
    
    <div id="app" class="pt-20">
      <div id="plant-section" class="animate__animated animate__fadeIn">
        <PlantPage
          :productImage="product.imageUrl"
          :thumbnail1="product.imageUrl"
          :thumbnail2="product.imageUrl"
          :productName="product.name"
          :productCode="product.productCode"
          :price="formatPrice(product.price)"
          :description="product.description"
          :scientificName="product.scientificName"
          :commonName="product.commonName"
          :dimensions="formatDimensions(product.heightCm, product.widthCm)"
          :humidity="formatHumidity(product.humidityMinCm, product.humidityMaxCm)"
          :difficulty="product.difficulty"
          :watering="formatWatering(product.wateringMinTimes, product.wateringMaxTimes)"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart'; // Import store
import PlantPage from '@/components/PlantPage.vue';
import Navbar from '@/components/Navbar.vue';
import { fetchPlant } from '@/stores/plantService';

// Lấy store giỏ hàng
const cartStore = useCartStore();

// Lấy ID từ route params
const route = useRoute();
const plantId = Number(route.params.id);

// Dữ liệu sản phẩm
const product = ref({
  id: 0,
  name: '',
  productCode: '',
  price: 0,
  shortDescription: '',
  description: '',
  scientificName: '',
  commonName: '',
  heightCm: 0,
  widthCm: 0,
  humidityMinCm: 0,
  humidityMaxCm: 0,
  difficulty: '',
  wateringMinTimes: 0,
  wateringMaxTimes: 0,
  imageUrl: '',
  careInstructions: '',
  createdAt: '',
  updatedAt: '',
});

// Quản lý trạng thái activeSection cho Navbar
const activeSection = ref('');

// Tải dữ liệu cây từ API
onMounted(async () => {
  const fetchedPlant = await fetchPlant(plantId);
  if (fetchedPlant) {
    product.value = fetchedPlant;
  } else {
    console.error('Không thể tải thông tin cây.');
  }
});

// Hàm định dạng giá
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

// Hàm định dạng kích thước
const formatDimensions = (heightCm, widthCm) => {
  if (heightCm && widthCm) {
    return `Chiều cao cây: ${heightCm}x${widthCm}cm (DxC)`;
  }
  return 'N/A';
};

// Hàm định dạng độ ẩm
const formatHumidity = (minCm, maxCm) => {
  if (minCm && maxCm) {
    return `Độ ẩm tốt: ${minCm} - ${maxCm} cm`;
  }
  return 'N/A';
};

// Hàm định dạng tưới nước
const formatWatering = (minTimes, maxTimes) => {
  if (minTimes && maxTimes) {
    return `Tưới nước ${minTimes} - ${maxTimes} lần/tuần`;
  }
  return 'N/A';
};

// Xử lý sự kiện thêm vào giỏ hàng
const handleAddToCart = () => {
  cartStore.addToCart(product.value); // Thêm sản phẩm vào giỏ hàng qua store
  alert(`Đã thêm ${product.value.name} vào giỏ hàng!`);
};
</script>

<style scoped>
.section {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  opacity: 0;
  transform: translateY(20px);
}

.section.active {
  opacity: 1;
  transform: translateY(0);
}
</style>