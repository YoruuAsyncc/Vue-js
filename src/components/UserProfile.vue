<script setup lang="ts">
import { inject } from "vue";
import { userNameKey } from "../keys/injectionKeys";
const userName = inject(userNameKey);
</script>

<template>
  <div>
    <p>Hello, {{ userName }}!</p>
  </div>
</template>
