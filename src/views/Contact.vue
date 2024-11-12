<template>
  <div class="bg-lime-900 text-white py-8">
    <div class="container mx-auto">
      <!-- Logo và mô tả -->
      <div class="flex justify-between items-start">
        <div class="flex items-start">
          <img src="@/assets/icon.png" alt="Plant logo" class="mr-4" width="50" height="50" />
          <div>
            <h1 class="text-2xl font-bold">Planto.</h1>
            <p class="mt-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <!-- Form đăng ký liên hệ -->
        <div>
          <h2 class="text-lg font-bold mb-4">Contact</h2>
          <div class="flex mb-4">
            <input
              type="email"
              placeholder="Enter Email"
              v-model="email"
              class="p-2 text-black rounded-l"
            />
            <button @click="subscribe" class="bg-white text-black px-4 rounded-r">SUBSCRIBE</button>
          </div>
          <div class="flex">
            <input
              type="tel"
              placeholder="Phone"
              v-model="phone"
              class="p-2 text-black rounded-l"
            />
            <button @click="subscribe" class="bg-white text-black px-4 rounded-r">SUBSCRIBE</button>
          </div>
        </div>
      </div>

      <!-- Liên kết mạng xã hội và chú thích bản quyền -->
      <div class="flex justify-between items-center mt-8">
        <div class="flex space-x-4">
          <a href="#" class="text-sm">FB</a>
          <a href="#" class="text-sm">TW</a>
          <a href="#" class="text-sm">LI</a>
        </div>
        <div class="text-sm">planto © all rights reserved</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      email: '',
      phone: ''
    }
  },
  methods: {
    subscribe() {
      if (this.email || this.phone) {
        alert(`Subscribed with: ${this.email || this.phone}`)
        this.email = ''
        this.phone = ''
      } else {
        alert('Please enter a valid email or phone number.')
      }
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
</style>
