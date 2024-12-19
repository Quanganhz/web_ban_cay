<template>
  <div class="bg-lime-900 text-white p-8">
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
          <h3>Phone: 0xxxx6789</h3>
          <h3>Email: example@doge.com</h3>
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
