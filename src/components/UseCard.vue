<script setup lang="ts">
const user = {
  name: "Rinaru",
  role: "Developer",
};
</script>

<template>
  <div class="p-2 my-10 rounded border w-64">
    <slot :user="user" />
  </div>
</template>
