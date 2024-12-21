<template>
    <div>
      <div class="flex justify-between mb-2">
        <h2 class="text-xl font-bold mb-4">Danh Sách Cây</h2>
        <button @click="openCreateModal" type="button" class="bg-green-800 text-end rounded p-2 text-white">Thêm cây mới</button>
      </div>
  
      <!-- Bảng danh sách cây -->
      <table class="table-auto w-full border-collapse border border-lime-500">
        <thead>
          <tr class="bg-lime-500">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Tên</th>
            <th class="border border-gray-300 px-4 py-2">Hình ảnh</th>
            <th class="border border-gray-300 px-4 py-2">Mô tả ngắn</th>
            <th class="border border-gray-300 px-4 py-2">Mô tả chi tiết</th>
            <th class="border border-gray-300 px-4 py-2">Giá</th>
            <th class="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
            <th class="border border-gray-300 px-4 py-2">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(plant) in paginatedPlants" :key="plant.id">
            <td class="border border-gray-300 px-4 py-2 text-center">{{ plant.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ plant.name }}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
              <img :src="`${plant.imageurl}`" alt="Plant Image" class="w-16 h-16 object-cover mx-auto" />
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ plant.shortdescription }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ plant.detaileddescription }}</td>
            <td class="border border-gray-300 px-4 py-2 text-right">{{ formatCurrency(plant.price) }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button @click="openEditModal(plant)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
            </td>
            <td class="border border-gray-300 px-4 py-2 text-right">
                <button @click="deletePlant(plant.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0=" />
                  </svg>
                </button>
              </td>
              
          </tr>
        </tbody>
      </table>
  
      <!-- Phân trang -->
      <div class="flex justify-center items-end text-end mt-4">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1" 
          class="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Trang trước
        </button>
        <span class="px-4 py-2">Trang {{ currentPage }} / {{ totalPages }}</span>
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages" 
          class="px-4 py-2 bg-blue-500 text-white rounded ml-2">
          Trang sau
        </button>
      </div>
    </div>
  
    <!-- Modal Tạo Cây -->
    <CreatePlantModal :isVisible="isCreatePlantModal" :closeModal="closeCreatePlantModal" />
  
    <!-- Modal Chỉnh Sửa Cây -->
    <EditPlantModal :isVisible="isEditPlantModal" :plant="selectedPlant" :closeModal="closeEditPlantModal" />
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import CreatePlantModal from './CreatePlantModal.vue';
  import EditPlantModal from './EditPlantModal.vue';
  
  const plants = ref([]);
  const currentPage = ref(1);
  const itemsPerPage = 4;
  const isCreatePlantModal = ref(false);
  const isEditPlantModal = ref(false);
  const selectedPlant = ref(null);
  
  onMounted(async () => {
    await fetchPlants();
  });
  
  const fetchPlants = async () => {
    try {
      const response = await fetch("https://localhost:7135/api/Plants");
      const data = await response.json();
      plants.value = data.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cây:", error);
    }
  };
  const deletePlant = async (plantId) => {
  if (confirm("Bạn có chắc chắn muốn xóa cây với " + plantId)) {
    try {
      const response = await fetch(`https://localhost:7135/api/Plants/${plantId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Nếu xóa thành công, cập nhật lại danh sách cây
        plants.value = plants.value.filter(plant => plant.id !== plantId);
        alert("Cây đã được xóa thành công!");
      } else {
        alert("Không thể xóa cây. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa cây:", error);
      alert("Đã xảy ra lỗi khi xóa cây.");
    }
  }
};

  const paginatedPlants = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = currentPage.value * itemsPerPage;
    return plants.value.slice(start, end);
  });
  
  const totalPages = computed(() => Math.ceil(plants.value.length / itemsPerPage));
  
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };
  
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  
  const openCreateModal = () => {
    isCreatePlantModal.value = true;
  };
  
  const closeCreatePlantModal = () => {
    isCreatePlantModal.value = false;
  };
  
  const openEditModal = (plant) => {
    selectedPlant.value = { ...plant };  // Copy dữ liệu để tránh ảnh hưởng khi chỉnh sửa
    isEditPlantModal.value = true;
  };
  
  const closeEditPlantModal = () => {
    isEditPlantModal.value = false;
  };
  </script>
  
  <style scoped>
  table {
    border-spacing: 0;
  }
  
  thead th {
    text-align: left;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  