<template>
  <div class="__className_c5f288 flex flex-row flex-nowrap h-dvh">
    <!-- Sidebar -->
    <div class="flex flex-col flex-nomal w-60 text-white bg-slate-700 min-w-[240px]">
      <!-- Header -->
      <div class="flex flex-col p-6 border-purple-500">
        <h1 class="text-2xl font-bold">
          ICSP VietNam
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
            class="px-4 py-3 cursor-pointer hover:bg-state-300 font-bold"
          >
            {{ tab }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-grow p-8">
      <h1 class="text-2xl font-bold">Tab: {{ activeTab }}</h1>
      <p class="mt-4">This is content for {{ activeTab }} tab.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ['Tạo Order', 'Kiểm tra dư nợ'],
      activeTab: 'Tạo Order'
    }
  }
}
</script>

<style scoped></style>
