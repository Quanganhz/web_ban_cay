<template>
  <div class="flex h-screen p-4 space-x-4">
    <!-- Cột bên trái: Ô nhập liệu, ô giá trị và ô lựa chọn -->
    <div class="flex flex-col flex-grow space-y-4 w-2/3">
      <!-- Ô nhập liệu và ô giá trị: Nằm cùng dòng -->
      <div class="flex space-x-4">
        <!-- Ô nhập liệu: Nằm ở phía trái -->
        <div class="bg-gray-100 p-4 rounded shadow-md flex-grow max-w-[200px] min-w-[200px]">
          <div class="mb-4">
            <label class="block text-sm font-semibold mb-2">Tên:</label>
            <input v-model="name" type="text" class="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Chú thích:</label>
            <textarea v-model="comment" rows="4" class="w-full px-3 py-2 border rounded-md"></textarea>
          </div>
        </div>

        <!-- Ô giá trị: Nằm ở phía phải -->
        <div class="bg-gray-100 p-4 rounded shadow-md flex-grow max-w[700px]">
          <h2 class="text-xl font-bold mb-4">Món ăn</h2>
          <div class="flex flex-wrap space-x-2 space-y-1 mb-4">
            <span v-for="(value, index) in displayedValues" :key="index" class="px-2 py-1 border-2 border-red-500 rounded-full">
              {{ value }}
            </span>
            </div>
          <button
            @click="confirmOrder"
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Đặt món
          </button>
        </div>
      </div>

      <!-- Ô lựa chọn: Nằm ngang phía dưới -->
      <div class="bg-gray-100 p-4 rounded shadow-md">
        <h2 class="text-xl font-bold mb-4">Menu</h2>
        <div class="flex flex-wrap space-x-2 space-y-1">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            @click="handleButtonClick(button)"
            :class="{
              'bg-green-500': isSelected(button),
              'bg-red-500': !isSelected(button),
            }"
            class="px-4 py-2 text-white rounded-md hover:bg-red-600"
          >
            {{ button }}
          </button>
        </div>
      </div>
    </div>

    <!-- Cột bên phải: Ô kết quả -->
    <div class="flex flex-col w-1/3 bg-gray-100 p-4 rounded shadow-md">
      <h2 class="text-xl font-bold mb-4">Kết quả</h2>
      <div v-for="(result, index) in results" :key="index" class="mb-4">
        <p><strong>Tên:</strong> {{ result.name }}</p>
        <p><strong>Chú thích:</strong> {{ result.comment }}</p>
        <p><strong>Món:</strong> {{ result.values.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '', // Tên
      comment: '', // Chú thích
      displayedValues: [], // Lưu trữ các giá trị đã được nhấn
      buttons: ['Gà xốt', 'Cá kho', 'Nem rán', 'Đậu nhồi thịt','Rau củ luộc', 'Cá rô rán', 'Mướp nhồi thị', 'Rau muốn xào','Gà xào nấm', 'Lạc rang', 'Cà pháo', 'Trứng cuộn'], // Danh sách button
      results: [], // Danh sách kết quả
    };
  },
  methods: {
    // Xử lý khi nhấn button
    handleButtonClick(button) {
      const index = this.displayedValues.indexOf(button);
      if (index === -1) {
        // Nếu button chưa được nhấn, thêm nó vào mảng
        this.displayedValues.push(button);
      } else {
        // Nếu button đã được nhấn, xóa nó khỏi mảng
        this.displayedValues.splice(index, 1);
      }
    },
    // Kiểm tra button có được chọn hay chưa
    isSelected(button) {
      return this.displayedValues.includes(button);
    },
    // Đặt món và xuất dữ liệu ra ô kết quả
    confirmOrder() {
      if (this.name.trim() === '') {
        alert('Vui lòng nhập tên.');
        return;
      }

      const values = this.displayedValues.slice(); // Sao chép mảng giá trị hiện tại
      this.results.push({
        name: this.name,
        comment: this.comment,
        values: values,
      });

      // Xóa giá trị đã chọn và reset ô nhập liệu
      this.displayedValues = [];
      this.name = '';
      this.comment = '';
    },
  },
};
</script>
