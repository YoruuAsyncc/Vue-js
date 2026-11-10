<script setup lang="ts"></script>

<template>
  <div class="p-2 rounded border w-64">
    <header class="pb-2 border-b text-lg font-bold">
      <slot name="header" />
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
