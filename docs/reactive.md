# `reactive()` vs `ref()`

## 1. Konsep Dasar
- **`ref()`**: Menerima semua tipe data (primitive seperti `string`, `number`, `boolean`, maupun objek/array). Untuk mengakses atau mengubah nilainya di `<script>`, gunakan `.value`. Di `<template>`, nilainya otomatis di-unwrap sehingga tidak perlu `.value`.
- **`reactive()`**: Hanya menerima objek (`Object`, `Array`, `Map`, `Set`). Tidak memerlukan `.value` baik di `<script>` maupun di `<template>`.

---

## 2. Kapan Memakai `ref` vs `reactive`?

### Rekomendasi Modern (Vue 3 Community Best Practice):
> **Gunakan `ref()` sebagai default utama untuk hampir semua state.**

Alasan:
1. **Kehilangan Reaktivitas saat Destructure:** Objek dari `reactive()` akan kehilangan reaktivitasnya jika di-destructure, kecuali dibungkus dengan `toRefs()`.
2. **Tidak Bisa Reassign Objek Utuh:** `reactive()` tidak bisa langsung di-assign ulang dengan objek baru (`state = newState` akan merusak reaktivitasnya). Pada `ref()`, kamu bebas melakukan `state.value = newState`.
3. **Konsistensi Mental Model:** Dengan selalu memakai `ref()`, kamu selalu tahu bahwa variabel tersebut adalah state reaktif karena memakai `.value` di bagian script.

---

## 3. Contoh Penggunaan

### Menggunakan `ref` (Direkomendasikan)
```vue
<script setup lang="ts">
import { ref } from "vue";

// Primitive
const count = ref(0);
const name = ref("Yoruuu");

// Objek / Array
interface User {
  id: number;
  email: string;
}

const user = ref<User | null>(null);

function login() {
  // Reassign objek utuh aman dengan ref
  user.value = {
    id: 1,
    email: "yoruuu@example.com",
  };
}
</script>

<template>
  <div>
    <p>Nama: {{ name }}</p>
    <p v-if="user">User: {{ user.email }}</p>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>
```

### Menggunakan `reactive` (Untuk form state yang saling berkaitan erat)
```vue
<script setup lang="ts">
import { reactive, toRefs } from "vue";

const form = reactive({
  username: "",
  password: "",
  rememberMe: false,
});

// Jika ingin destructure tanpa hilang reaktivitas:
const { username } = toRefs(form);
</script>

<template>
  <form>
    <input v-model="form.username" placeholder="Username" />
    <input v-model="form.password" type="password" />
  </form>
</template>
```
