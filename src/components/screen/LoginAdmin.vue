<template>
    <div class="login-container">
      <h2 class="text-center text-2xl font-bold mb-6">Login</h2>
      <form @submit.prevent="handleLogin" class="max-w-sm mx-auto bg-white p-6 rounded shadow">
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            placeholder="Enter your username"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-2 mt-1 border border-gray-300 rounded"
            placeholder="Enter your password"
          />
        </div>
        <div class="flex justify-between items-center">
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </button>
          <a href="#" class="text-sm text-blue-500">Forgot password?</a>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        if (this.username && this.password) {
          // Handle login logic here
          console.log('Logging in...', this.username, this.password);
        } else {
          alert('Please fill in both fields.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    background-color: #f7fafc;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  