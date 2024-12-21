<template>
    <div>
        <div class="flex justify-between mb-2s">
            <h2 class="text-xl font-bold mb-4">Danh sách Liên hệ Khách hàng</h2>
            <button @click="openCreateModal" type="button" class="bg-blue-800 text-end rounded p-2 text-white">Thêm khách hàng</button>
        </div>
      
  
      <!-- Hiển thị thông báo lỗi nếu không có dữ liệu -->
      <p v-if="error" class="text-red-600">Không thể lấy dữ liệu từ máy chủ. Vui lòng thử lại sau.</p>
        
      <!-- Bảng danh sách liên hệ khách hàng -->
      <table class="table-auto w-full border-collapse border border-gray-500">
        <thead>
          <tr class="bg-blue-500">
            <th class="border border-gray-300 px-4 py-2">ID</th>
            <th class="border border-gray-300 px-4 py-2">Tên khách hàng</th>
            <th class="border border-gray-300 px-4 py-2">Ưu tiên</th>
            <th class="border border-gray-300 px-4 py-2">Nhận xét của khách hàng</th>
            <th class="border border-gray-300 px-4 py-2">Liên hệ</th>
            <th class="border border-gray-300 px-4 py-2">Thời gian mua hàng</th>
            <th class="border border-gray-300 px-4 py-2">Chỉnh sửa</th>
            <th class="border border-gray-300 px-4 py-2">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <!-- Hiển thị các liên hệ khách hàng của trang hiện tại -->
          <tr v-for="contact in paginatedContacts" :key="contact.id">
            <td class="border border-gray-300 px-4 py-2 text-center">{{ contact.id }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ contact.username || 'Customer' }}</td>
            <!-- Hiển thị dấu tích hoặc dấu x -->
            <td class="border border-gray-300 px-4 py-2 text-center">
              {{ contact.isprimary ? '✓' : '-' }}
            </td>
            <td class="border border-gray-300 px-4 py-2">{{ contact.usercomment || '---' }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ contact.contactvalue || '---' }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ formatDate(contact.createdat) }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button @click="openEditModal(contact.id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </button>
            </td>
            <td class="border border-gray-300 px-4 py-2 text-right">
                <button @click="deleteContact(contact.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0=" />
                  </svg>
                </button>
              </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Điều khiển phân trang -->
      <div class="flex justify-between mt-4">
        <button 
          @click="previousPage" 
          :disabled="currentPage === 1" 
          class="px-4 py-2 bg-blue-500 text-white rounded">
          Previous
        </button>
        <span class="self-center">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages" 
          class="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
    <CreateUser :isModalOpen="isModalOpen" 
                :userData="userData" 
                @update:isModalOpen="isModalOpen = $event"
                @update:userData="updateUserData" />
        
    <EditContactModal :isModalOpen="isModalEditOpen"
    :contactId="selectedContactId"
    @update:isModalEditOpen="isModalEditOpen = $event"
    @updated="handleUpdated"/>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import CreateUser from './CreateUser.vue';
import EditContactModal from './EditContactModal.vue';
  
const isModalEditOpen = ref(false); // Trạng thái hiển thị modal
const selectedContactId = ref(null); // ID của liên hệ cần chỉnh sửa

// Hàm mở modal và đặt ID liên hệ
const openEditModal = (contactId) => {
  selectedContactId.value = contactId;
  isModalEditOpen.value = true;
};
  const userContacts = ref([]);
  const error = ref(false);
  
  // Các biến cho phân trang
  const currentPage = ref(1);
  const pageSize = ref(4);  // Mỗi trang hiển thị 4 hàng
  
  // Dữ liệu modal
  const isModalOpen = ref(false);
  const userData = ref({
    contactvalue: '',
    isprimary: false,
    username: '',
    usercomment: '',
  });
  
  // Hàm mở modal
  const openCreateModal = () => {
    isModalOpen.value = true;  // Mở modal
  };
  
  
  // Hàm lấy dữ liệu từ API
  const fetchUserContacts = async () => {
    try {
      const response = await fetch('https://localhost:7135/api/Usercontacts');
      if (!response.ok) {
        throw new Error('Không thể lấy dữ liệu');
      }
      userContacts.value = await response.json();
      error.value = false; // Reset lỗi nếu lấy dữ liệu thành công
    } catch (e) {
      console.error('Lỗi khi lấy dữ liệu:', e);
      error.value = true; // Đặt lỗi nếu có sự cố khi lấy dữ liệu
    }
  };
  
  // Chuyển đổi ngày tạo thành định dạng dễ đọc
  const formatDate = (date) => {
    if (!date) return 'Chưa có'; // Kiểm tra trường hợp không có giá trị ngày giờ
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  };
  
  // Tính toán tổng số trang
  const totalPages = computed(() => {
    return Math.ceil(userContacts.value.length / pageSize.value);
  });
  
  // Lấy dữ liệu phân trang
  const paginatedContacts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return userContacts.value.slice(start, end);
  });
  
  // Hàm di chuyển sang trang trước
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  // Hàm di chuyển sang trang tiếp theo
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  // Hàm xử lý xóa liên hệ khách hàng
const deleteContact = async (contactId) => {
  const confirmed = confirm('Bạn có chắc chắn muốn xóa liên hệ này không?');
  if (!confirmed) return;

  try {
    const response = await fetch(`https://localhost:7135/api/Usercontacts/${contactId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Xóa không thành công');
    }

    // Xóa thành công, cập nhật danh sách liên hệ
    await fetchUserContacts();
    alert('Xóa thành công!');
  } catch (e) {
    console.error('Lỗi khi xóa liên hệ:', e);
    alert('Đã xảy ra lỗi khi xóa liên hệ.');
  }
};

  // Lấy dữ liệu khi component được gắn vào DOM
  onMounted(fetchUserContacts);
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
  