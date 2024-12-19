<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2 class="modal-title">Thêm Cây Mới</h2>
        
        <!-- Form tạo cây mới -->
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Tên Cây:</label>
            <input
              v-model="newPlant.name"
              type="text"
              id="name"
              placeholder="Nhập tên cây"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="imageurl">URL Hình Ảnh:</label>
            <input
              type="file"
              id="imageurl"
              @change="handleFileChange"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="shortdescription">Mô Tả Ngắn:</label>
            <input
              v-model="newPlant.shortdescription"
              type="text"
              id="shortdescription"
              placeholder="Nhập mô tả ngắn"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="detaileddescription">Mô Tả Chi Tiết:</label>
            <textarea
              v-model="newPlant.detaileddescription"
              id="detaileddescription"
              placeholder="Nhập mô tả chi tiết"
              required
            ></textarea>
          </div>
  
          <div class="form-group">
            <label for="price">Giá:</label>
            <input
              v-model="newPlant.price"
              type="number"
              id="price"
              placeholder="Nhập giá cây"
              required
            />
          </div>
  
          <!-- Nút xác nhận và hủy -->
          <div class="modal-actions">
            <button type="submit" class="btn-submit">Thêm Cây</button>
            <button type="button" class="btn-cancel" @click="closeModal">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  <script>
import { ref } from "vue";
import { addPlant } from "@/stores/plantService"; // Hàm thêm cây mới từ file connect

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    // Định nghĩa cây mới
    const newPlant = ref({
      name: "",
      imageurl: "",
      shortdescription: "",
      detaileddescription: "",
      price: 0
    });

    // Hàm xử lý thay đổi file
    const handleFileChange = (event) => {
      const file = event.target.files[0]; // Lấy file đầu tiên từ danh sách files
      if (file) {
        // Lấy phần mở rộng của file và đảm bảo là hình ảnh PNG
        const fileName = file.name.split('/').pop();  // Tách tên file
        const fileExtension = fileName.split('.').pop().toLowerCase(); // Lấy đuôi file
        
        if (fileExtension === 'png') {
          // Giả sử chúng ta chỉ lấy tên file và bỏ qua đường dẫn
          const filePath = `/src/assets/${fileName}`;
          newPlant.value.imageurl = filePath;
        } else {
          alert("Vui lòng chọn một file PNG");
        }
      }
    };

    // Hàm xử lý thêm cây
    const submitForm = async () => {
      // Kiểm tra không để trống các trường
      if (!newPlant.value.name || !newPlant.value.imageurl || !newPlant.value.shortdescription || !newPlant.value.detaileddescription || newPlant.value.price <= 0) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      // Gọi hàm thêm cây mới
      const plant = await addPlant(newPlant.value);
      if (plant) {
        alert("Cây đã được thêm thành công!");
        location.reload();
        props.closeModal();  // Đóng modal sau khi thêm thành công
      } else {
        alert("Có lỗi khi thêm cây");
      }
    };

    return {
      newPlant,
      submitForm,
      handleFileChange
    };
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
  max-width: 400px;
  width: 100%;
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
.form-group textarea {
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
