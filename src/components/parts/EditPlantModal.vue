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
            <label for="imageurl">URL Hình Ảnh:</label>
            <input
              type="file"
              id="imageurl"
              @change="handleFileChange"
            />
          </div>
  
          <div class="form-group">
            <label for="shortdescription">Mô Tả Ngắn:</label>
            <input
              v-model="updatedPlant.shortdescription"
              type="text"
              id="shortdescription"
              placeholder="Nhập mô tả ngắn"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="detaileddescription">Mô Tả Chi Tiết:</label>
            <textarea
              v-model="updatedPlant.detaileddescription"
              id="detaileddescription"
              placeholder="Nhập mô tả chi tiết"
              required
            ></textarea>
          </div>
  
          <div class="form-group">
            <label for="price">Giá:</label>
            <input
              v-model="updatedPlant.price"
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
  
  <script>
  import { ref, watch } from "vue";
  
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      closeModal: {
        type: Function,
        required: true
      },
      plant: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      // Biến local chứa thông tin cây cần cập nhật
      const updatedPlant = ref({ ...props.plant });
  
      // Đồng bộ khi prop plant thay đổi
      watch(
        () => props.plant,
        (newPlant) => {
          updatedPlant.value = { ...newPlant };
        }
      );
  
      // Hàm xử lý thay đổi file
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const fileName = file.name.split('/').pop();
          const fileExtension = fileName.split('.').pop().toLowerCase();
  
          if (fileExtension === 'png') {
            const filePath = `/src/assets/${fileName}`;
            updatedPlant.value.imageurl = filePath;
          } else {
            alert("Vui lòng chọn một file PNG");
          }
        }
      };
  
      // Hàm xử lý cập nhật cây
      const submitUpdate = async () => {
  if (
    !updatedPlant.value.name ||
    !updatedPlant.value.shortdescription ||
    !updatedPlant.value.detaileddescription ||
    updatedPlant.value.price <= 0
  ) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  // Tạo đối tượng JSON theo yêu cầu
  const plantData = {
    name: updatedPlant.value.name,
    imageurl: updatedPlant.value.imageurl, // Đảm bảo giá trị này đúng với URL hoặc đường dẫn bạn muốn
    shortdescription: updatedPlant.value.shortdescription,
    detaileddescription: updatedPlant.value.detaileddescription,
    price: updatedPlant.value.price
  };

  try {
    // Gọi API cập nhật cây
    const response = await fetch(`https://localhost:7135/api/Plants/${updatedPlant.value.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(plantData)
    });

    if (response.status === 204) {
      // Nếu mã trạng thái là 204, coi là thành công
      alert("Cây đã được cập nhật thành công!");
      props.closeModal();
      location.reload();
    } else {
      // Xử lý các trường hợp khác nếu cần
      const resultText = await response.text(); // Dùng text() thay vì json()
      console.log("Phản hồi từ API:", resultText);
      alert("Cập nhật cây thất bại.");
    }
  } catch (error) {
    alert("Đã xảy ra lỗi khi cập nhật cây.");
    console.error(error);
  }
};


      return {
        updatedPlant,
        handleFileChange,
        submitUpdate
      };
    }
  };
  </script>
  
  <style scoped>
  /* CSS tương tự như modal thêm mới */
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
  