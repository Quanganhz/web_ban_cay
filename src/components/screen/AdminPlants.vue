<template>
    <div class="admin-container flex h-screen">
      <!-- Sidebar -->
      <nav class="sidebar bg-gray-800 text-white w-52 min-w-[100px] p-4">
        <h2 class="text-center text-2xl font-bold mb-6">Admin Panel</h2>
        <ul class="menu-list">
          <li
            class="menu-item py-2 px-4 hover:bg-gray-700 cursor-pointer"
            :class="{ 'bg-gray-700': activeTab === 'listPlants' }"
            @click="navigateTo('listPlants')"
          >
            List Plants
          </li>
          <li
            class="menu-item py-2 px-4 hover:bg-gray-700 cursor-pointer"
            :class="{ 'bg-gray-700': activeTab === 'listCustomers' }"
            @click="navigateTo('listCustomers')"
          >
            List Customers
          </li>
        </ul>
      </nav>
  
      <!-- Main Content -->
      <div class="content flex-1 bg-gray-100 p-6">
        <component :is="currentComponent" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import ListPlants from "@/components/parts/ListPlants.vue";
  import ListCustomer from "@/components/parts/ListCustomer.vue";
  
  // Dữ liệu reactive
  const activeTab = ref('listPlants');
  
  // Tính toán component hiện tại dựa trên tab đang hoạt động
  const currentComponent = computed(() => {
    return activeTab.value === 'listPlants' ? ListPlants : ListCustomer;
  });
  
  // Hàm chuyển tab
  const navigateTo = (tab) => {
    activeTab.value = tab;
  };
  </script>
  
  <style scoped>
  .admin-container {
    display: flex;
  }
  
  .sidebar {
    background-color: #2d3748;
  }
  
  .menu-item {
    padding: 12px;
    cursor: pointer;
  }
  
  .menu-item:hover,
  .bg-gray-700 {
    background-color: #4a5568;
  }
  
  .content {
    flex-grow: 1;
    background-color: #f7fafc;
    padding: 24px;
  }
  </style>
  