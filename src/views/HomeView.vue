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
        <div class="bg-gray-100 p-4 rounded shadow-md flex-grow max-w-[900px]">
          <h2 class="text-xl font-bold mb-4">Món ăn Chính</h2>
          <div class="flex flex-wrap space-x-2  mb-4">
            <span v-for="(value, index) in displayedMainDishes" :key="index" class="px-2 py-1 border-2 border-red-500 rounded-full">
              {{ value }}
            </span>
            <span v-for="(value, index) in displayedVegetables" :key="index" class="px-2 py-1 border-2 border-yellow-500 rounded-full">
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
        <div class="grid grid-cols-8 gap-1 ">
          <!-- Các nút món chính (chỉ được chọn tối đa 3) -->
          <button
            v-for="(button, index) in buttons"
            :key="'main-' + index"
            @click="handleButtonClick(button, 'main')"
            :class="{
              'border-2 bg-red-500': isSelected(button, 'main'),
              'border-2 border-red-500': !isSelected(button, 'main'),
            }"
            class="px-4 py-2 text-black rounded-md hover:bg-red-600"
          >
            {{ button }}
          </button>

          <!-- Các nút rau củ (không giới hạn số lượng) -->
          <button 
            v-for="(button, index) in buttonsVegetable" 
            :key="'veg-' + index"
            @click="handleButtonClick(button, 'veg')"
            :class="{
              'border-2 bg-yellow-500 ': isSelected(button, 'veg'),
              'border-2 border-yellow-500': !isSelected(button, 'veg'),
            }"
            class="px-4 py-2 text-black rounded-md hover:bg-yellow-600"
          >
            {{ button }}
          </button>
        </div>
      </div>
    </div>

    <!-- Cột bên phải: Ô kết quả -->
    <div class="flex flex-col w-1/3 bg-gray-100 p-4 rounded shadow-md overflow-auto">
      <h2 class="text-xl font-bold mb-4">Kết quả</h2>
      <div v-for="(result, index) in results" :key="index" class="mb-4">
        <p><strong>Tên:</strong> {{ result.name }}</p>
        <p><strong>Chú thích:</strong> {{ result.comment }}</p>
        <p><strong>Món:</strong> {{ result.mainDishes.join(', ') }}, {{ result.vegetables.join(', ') }}</p>
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
      displayedMainDishes: [], // Lưu trữ các món chính đã chọn
      displayedVegetables: [], // Lưu trữ các rau củ đã chọn
      buttons: [
        'Gà xốt',
        'Cá kho',
        'Nem rán',
        'Đậu nhồi thịt',
        'Cá rô rán',
        'Gà xào nấm',
        'Trứng cuộn'
      ], // Danh sách button món chính
      buttonsVegetable: [
        'Rau củ luộc',
        'Mướp nhồi thị',
        'Rau muống xào',
        'Lạc rang',
        'Cà pháo'
      ], // Danh sách button rau củ
      results: [], // Danh sách kết quả
      maxMainDishes: 3, // Giới hạn số lượng món chính
    };
  },
  methods: {
    // Xử lý khi nhấn button
    handleButtonClick(button, type) {
      if (type === 'main') {
        const index = this.displayedMainDishes.indexOf(button);
        if (index === -1) {
          // Kiểm tra nếu đã đạt giới hạn
          if (this.displayedMainDishes.length >= this.maxMainDishes) {
            alert(`Bạn chỉ có thể chọn tối đa ${this.maxMainDishes} món chính.`);
            return;
          }
          this.displayedMainDishes.push(button);
        } else {
          this.displayedMainDishes.splice(index, 1);
        }
      } else if (type === 'veg') {
        const index = this.displayedVegetables.indexOf(button);
        if (index === -1) {
          this.displayedVegetables.push(button);
        } else {
          this.displayedVegetables.splice(index, 1);
        }
      }
    },
    // Kiểm tra button có được chọn hay chưa
    isSelected(button, type) {
      if (type === 'main') {
        return this.displayedMainDishes.includes(button);
      } else if (type === 'veg') {
        return this.displayedVegetables.includes(button);
      }
      return false;
    },
    // Đặt món và xuất dữ liệu ra ô kết quả
    confirmOrder() {
      if (this.name.trim() === '') {
        alert('Vui lòng nhập tên.');
        return;
      }

      if (this.displayedMainDishes.length === 0) {
        alert('Vui lòng chọn ít nhất một món chính.');
        return;
      }

      const mainDishes = this.displayedMainDishes.slice(); // Sao chép mảng món chính
      const vegetables = this.displayedVegetables.slice(); // Sao chép mảng rau củ

      this.results.push({
        name: this.name,
        comment: this.comment,
        mainDishes: mainDishes,
        vegetables: vegetables,
      });

      // Xóa giá trị đã chọn và reset ô nhập liệu
      this.displayedMainDishes = [];
      this.displayedVegetables = [];
      this.name = '';
      this.comment = '';
    },
  },
};
</script>
