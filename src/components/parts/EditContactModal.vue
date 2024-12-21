<script setup>
import { ref, watch } from 'vue';

// Nhận props từ component cha
const props = defineProps({
  isModalOpen: Boolean,
  contactId: Number,
});

// Gửi sự kiện cho component cha
const emit = defineEmits(['update:isModalEditOpen', 'updated']);

// Dữ liệu cho form và trạng thái
const formData = ref({
  username: '',
  contactvalue: '',
  usercomment: '',
  isprimary: false,
});
const loading = ref(false);
const errorState = ref('');

// URL API
const baseURL = 'https://localhost:7135/api/Usercontacts';

// Lấy dữ liệu liên hệ
const fetchContactData = async (contactId) => {
  loading.value = true;
  errorState.value = '';
  try {
    const response = await fetch(`${baseURL}/${contactId}`);
    if (!response.ok) throw new Error('Không thể lấy dữ liệu liên hệ.');

    const data = await response.json();
    formData.value = {
      username: data.username,
      contactvalue: data.contactvalue,
      usercomment: data.usercomment,
      isprimary: data.isprimary,
    };
  } catch (error) {
    errorState.value = error.message || 'Lỗi không xác định.';
    console.error('Lỗi khi lấy dữ liệu:', error);
  } finally {
    loading.value = false;
  }
};

// Lắng nghe thay đổi contactId
watch(
  () => props.contactId,
  (newId) => {
    if (newId) fetchContactData(newId);
  },
  { immediate: true }
);

// Đóng modal
const handleClose = () => {
  emit('update:isModalEditOpen', false);
};

// Gửi form cập nhật
const submitForm = async () => {
  try {
    const response = await fetch(`${baseURL}/${props.contactId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value),
    });
    if (response.ok) {
      emit('updated'); // Thông báo cập nhật thành công
      location.reload();
      handleClose();
    } else {
      alert('Cập nhật thất bại.');
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật dữ liệu:', error);
  }
};
</script>

<template>
  <div v-if="isModalOpen" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg w-1/3">
      <h2 class="text-xl font-bold mb-4">Chỉnh sửa Liên hệ Khách hàng</h2>

      <!-- Hiển thị thông báo lỗi -->
      <p v-if="errorState" class="text-red-500 mb-4">{{ errorState }}</p>

      <!-- Hiển thị thông báo tải -->
      <p v-if="loading" class="text-gray-500 mb-4">Đang tải dữ liệu...</p>

      <!-- Form chỉnh sửa -->
      <form v-else @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="username" class="block font-medium">Tên khách hàng</label>
          <input v-model="formData.username" type="text" id="username" class="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <div class="mb-4">
          <label for="contactvalue" class="block font-medium">Liên hệ</label>
          <input v-model="formData.contactvalue" type="text" id="contactvalue" class="w-full px-4 py-2 border border-gray-300 rounded" required />
        </div>
        <div class="mb-4">
          <label for="usercomment" class="block font-medium">Nhận xét</label>
          <textarea v-model="formData.usercomment" id="usercomment" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded"></textarea>
        </div>
        <div class="mb-4">
          <label for="isprimary" class="flex items-center">
            <input v-model="formData.isprimary" type="checkbox" id="isprimary" class="mr-2" />
            Ưu tiên
          </label>
        </div>
        <div class="flex justify-end">
          <button @click="handleClose" type="button" class="bg-gray-300 text-black px-4 py-2 rounded mr-2">Hủy</button>
          <button type="submit" class="bg-blue-800 text-white px-4 py-2 rounded">Cập nhật</button>
        </div>
      </form>
    </div>
  </div>
</template>
