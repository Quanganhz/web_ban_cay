<template>
  <div class="__className_c5f288 flex flex-row flex-nowrap h-dvh">
    <!-- Sidebar -->
    <div class="flex flex-col flex-nomal w-60 text-white bg-slate-700 min-h-full min-w-[240px]">
      <!-- Header -->
      <div class="flex flex-col p-6 border-purple-500">
        <h1 class="text-2xl font-bold">
          Nguyễn Đức Thắng - 2121050248
          <span class="text-x1 text-green-500">.</span>
        </h1>
        <div class="text-sm">Lunch time</div>
      </div>

      <!-- Tabs -->
      <div class="flex-grow">
        <ul>
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab"
            :class="{ 'bg-slate-300 font-bold': activeTab === tab }"
            class="px-4 py-3 font-bold cursor-pointer hover:bg-slate-300 text-black"
          >
            {{ tab }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-grow p-8">
      <h1 class="text-2xl font-bold">{{ activeTab }}</h1>
      <div v-if="activeTab === 'Order'">
        <HomeView />
      </div>

      <div v-else-if="activeTab === 'Kiểm tra dư nợ'">
        <p class="mt-4">This is content for "Kiểm tra dư nợ" tab.</p>
      </div>
    </div>
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue';

export default {
  components: {
    HomeView,
  },
  data() {
    return {
      tabs: ['Order', 'Kiểm tra dư nợ'],
      activeTab: 'Welcome anh chị quay trở lại với hệ thống đặt cơm của em thắng',
    };
  },
};
</script>

<style scoped></style>
