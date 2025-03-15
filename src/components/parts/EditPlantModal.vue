<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2 class="modal-title">Cập Nhật Thông Tin Cây</h2>

      <!-- Form cập nhật cây -->
      <form @submit.prevent="submitUpdate">
        <div class="form-group">
          <label for="name">Tên Cây:</label>
          <input
            v-model="updatedPlant.name"
            type="text"
            id="name"
            placeholder="Nhập tên cây"
            required
          />
        </div>

        <div class="form-group">
          <label for="productCode">Mã Sản Phẩm:</label>
          <input
            v-model="updatedPlant.productCode"
            type="text"
            id="productCode"
            placeholder="Nhập mã sản phẩm"
            required
          />
        </div>

        <div class="form-group">
          <label for="imageUrl">Hình Ảnh:</label>
          <input
            type="file"
            id="imageUrl"
            accept="image/png"
            @change="handleFileChange"
          />
          <p v-if="updatedPlant.imageUrl" class="mt-2">Hình ảnh hiện tại: <a :href="updatedPlant.imageUrl" target="_blank">{{ updatedPlant.imageUrl }}</a></p>
        </div>

        <div class="form-group">
          <label for="shortDescription">Mô Tả Ngắn (tối đa 500 ký tự):</label>
          <input
            v-model="updatedPlant.shortDescription"
            type="text"
            id="shortDescription"
            placeholder="Nhập mô tả ngắn"
            maxlength="500"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Mô Tả Chi Tiết:</label>
          <textarea
            v-model="updatedPlant.description"
            id="description"
            placeholder="Nhập mô tả chi tiết"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="scientificName">Tên Khoa Học:</label>
          <input
            v-model="updatedPlant.scientificName"
            type="text"
            id="scientificName"
            placeholder="Nhập tên khoa học"
          />
        </div>

        <div class="form-group">
          <label for="commonName">Tên Thông Thường:</label>
          <input
            v-model="updatedPlant.commonName"
            type="text"
            id="commonName"
            placeholder="Nhập tên thông thường"
          />
        </div>

        <div class="form-group">
          <label for="heightCm">Chiều Cao (cm):</label>
          <input
            v-model.number="updatedPlant.heightCm"
            type="number"
            id="heightCm"
            placeholder="Nhập chiều cao (cm)"
            step="0.01"
          />
        </div>

        <div class="form-group">
          <label for="widthCm">Chiều Rộng (cm):</label>
          <input
            v-model.number="updatedPlant.widthCm"
            type="number"
            id="widthCm"
            placeholder="Nhập chiều rộng (cm)"
            step="0.01"
          />
        </div>

        <div class="form-group">
          <label for="humidityMinCm">Độ Ẩm Tối Thiểu (cm):</label>
          <input
            v-model.number="updatedPlant.humidityMinCm"
            type="number"
            id="humidityMinCm"
            placeholder="Nhập độ ẩm tối thiểu (cm)"
            step="0.01"
          />
        </div>

        <div class="form-group">
          <label for="humidityMaxCm">Độ Ẩm Tối Đa (cm):</label>
          <input
            v-model.number="updatedPlant.humidityMaxCm"
            type="number"
            id="humidityMaxCm"
            placeholder="Nhập độ ẩm tối đa (cm)"
            step="0.01"
          />
        </div>

        <div class="form-group">
          <label for="difficulty">Độ Khó:</label>
          <select v-model="updatedPlant.difficulty" id="difficulty">
            <option value="">Chọn độ khó</option>
            <option value="Dễ chăm sóc">Dễ chăm sóc</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Khó">Khó</option>
          </select>
        </div>

        <div class="form-group">
          <label for="wateringMinTimes">Số Lần Tưới Tối Thiểu (lần/tuần):</label>
          <input
            v-model.number="updatedPlant.wateringMinTimes"
            type="number"
            id="wateringMinTimes"
            placeholder="Nhập số lần tưới tối thiểu"
          />
        </div>

        <div class="form-group">
          <label for="wateringMaxTimes">Số Lần Tưới Tối Đa (lần/tuần):</label>
          <input
            v-model.number="updatedPlant.wateringMaxTimes"
            type="number"
            id="wateringMaxTimes"
            placeholder="Nhập số lần tưới tối đa"
          />
        </div>

        <div class="form-group">
          <label for="careInstructions">Hướng Dẫn Chăm Sóc:</label>
          <textarea
            v-model="updatedPlant.careInstructions"
            id="careInstructions"
            placeholder="Nhập hướng dẫn chăm sóc"
            maxlength="10000"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="price">Giá:</label>
          <input
            v-model.number="updatedPlant.price"
            type="number"
            id="price"
            placeholder="Nhập giá cây"
            required
          />
        </div>

        <!-- Nút xác nhận và hủy -->
        <div class="modal-actions">
          <button type="submit" class="btn-submit">Cập Nhật</button>
          <button type="button" class="btn-cancel" @click="closeModal">Hủy</button>
        </div>
      </form>
    </div>
    </div>
  </template>

<script setup>
import { ref, watch } from 'vue';
import { updatePlant } from '@/stores/plantService'; // Sử dụng hàm từ plantService

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
  plant: {
    type: Object,
    required: true,
  },
});

const updatedPlant = ref({ ...props.plant });

// Đồng bộ khi prop plant thay đổi
watch(
  () => props.plant,
  (newPlant) => {
    updatedPlant.value = { ...newPlant };
  }
);

// Lưu trữ file ảnh
const selectedFile = ref(null);

// Hàm xử lý thay đổi file
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (fileExtension !== 'png') {
      alert('Vui lòng chọn một file PNG.');
      event.target.value = '';
      selectedFile.value = null;
    } else {
      selectedFile.value = file;
    }
  }
};

// Hàm xử lý cập nhật cây
const submitUpdate = async () => {
  // Kiểm tra các trường bắt buộc
  if (
    !updatedPlant.value.name ||
    !updatedPlant.value.productCode ||
    !updatedPlant.value.shortDescription ||
    !updatedPlant.value.description ||
    updatedPlant.value.price <= 0
  ) {
    alert('Vui lòng điền đầy đủ các trường bắt buộc.');
    return;
  }

  try {
    // Gọi hàm cập nhật cây
    const plant = await updatePlant(updatedPlant.value.id, updatedPlant.value, selectedFile.value);
    if (plant) {
      alert('Cây đã được cập nhật thành công!');
      props.closeModal();
      window.location.reload(); // Reload để cập nhật danh sách
    } else {
      alert('Có lỗi khi cập nhật cây.');
    }
  } catch (error) {
    alert('Có lỗi khi cập nhật cây: ' + error.message);
    console.error(error);
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.btn-submit,
.btn-cancel {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  cursor: pointer;
}

.btn-submit {
  background-color: #4CAF50;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}
</style>