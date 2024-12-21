<template>
    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg w-96">
        <h3 class="text-xl font-semibold mb-4">Thông Tin Người Dùng</h3>
  
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="username" class="block">Tên người dùng:</label>
            <input v-model="formData.username" id="username" type="text" class="border w-full p-2 rounded" required />
          </div>
  
          <div class="mb-4">
            <label for="isprimary" class="block">Ưu tiên:</label>
            <input v-model="formData.isprimary" id="isprimary" type="checkbox" class="mr-2" />
            <span>Đánh dấu nếu là ưu tiên</span>
          </div>
  
          <div class="mb-4">
            <label for="usercomment" class="block">Nhận xét của khách hàng:</label>
            <input v-model="formData.usercomment" id="usercomment" type="text" class="border w-full p-2 rounded" />
          </div>
  
          <div class="mb-4">
            <label for="contactvalue" class="block">Liên hệ:</label>
            <input v-model="formData.contactvalue" id="contactvalue" type="text" class="border w-full p-2 rounded" required />
          </div>
  
          <div class="flex justify-between">
            <button type="button" @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">Hủy</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  // Nhận các props từ component cha
  const props = defineProps({
    isModalOpen: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      required: true
    }
  });
  
  // Khai báo sự kiện emit để thay đổi giá trị của `isModalOpen` và reset form
  const emit = defineEmits(['update:isModalOpen', 'update:userData']);
  
  // Tạo một bản sao của userData trong formData
  const formData = ref({ ...props.userData });
  
  // Đóng modal
  const closeModal = () => {
    emit('update:isModalOpen', false);
    resetForm();
  };
  
  // Reset form
  const resetForm = () => {
    formData.value = {
      contactvalue: '',
      isprimary: false,
      username: '',
      usercomment: '',
    };
  };
  
  // Gửi dữ liệu khi form được submit
  const submitForm = async () => {
    try {
      const response = await fetch('https://localhost:7135/api/Usercontacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
      });
  
      if (!response.ok) {
        throw new Error('Không thể thêm người dùng mới');
      }
  
      const addedUser = await response.json();
      alert('Người dùng đã được thêm', addedUser);
      location.reload();
      emit('update:userData', formData.value);  // Gửi dữ liệu đã cập nhật về component cha
      closeModal(); // Đóng modal sau khi thêm thành công
    } catch (error) {
      console.error('Lỗi khi thêm người dùng:', error);
    }
  };
  </script>
  
  <style scoped>
  .fixed {
    position: fixed;
  }
  
  .bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .bg-white {
    background-color: white;
  }
  
  .p-6 {
    padding: 1.5rem;
  }
  
  .w-96 {
    width: 24rem;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  button {
    cursor: pointer;
  }
  
  button[type="button"] {
    background-color: #6c757d;
  }
  
  button[type="submit"] {
    background-color: #007bff;
  }
  </style>
  