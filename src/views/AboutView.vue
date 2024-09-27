<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="sayHello">Click me</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      message: 'Hello, TypeScript in Vue!'
    };
  },
  methods: {
    sayHello(): void {
      alert(this.message);
    }
  }
});
</script>
