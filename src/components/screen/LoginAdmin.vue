<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="max-w-sm mx-auto bg-white p-6 rounded shadow">
      <h2 class="text-center font-bold text-xl">Login</h2>
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
      <div class="flex justify-center items-center text-center">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/stores/loginService';

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      if (this.username && this.password) {
        try {
          const response = await login(this.username, this.password);
          if (response) {
            console.log("Login successful", response);
            alert("Login successful!");
             this.$router.push("/adminPlants"); // Chuyển hướng
          } else {
            alert("Login failed. Please check your credentials.");
          }
        } catch (error) {
          console.error("Error during login:", error);
          alert("An error occurred during login.");
        }
      } else {
        alert("Please fill in both fields.");
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
