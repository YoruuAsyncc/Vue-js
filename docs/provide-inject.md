# `provide()` & `inject()` (Dependency Injection)

## 1. Konsep Dasar
- **Tujuan:** Mengalirkan data atau fungsi dari komponen leluhur (*ancestor*) langsung ke komponen keturunan (*descendant*) di tingkat berapa pun, **tanpa harus mengoper props satu per satu** melalui komponen perantara (*menghindari Prop Drilling*).
- **Alur Data:**
  ```text
  Parent (provide)
     ↓
  Child Level 1 (tidak perlu tahu)
     ↓
  Child Level 2 (inject data langsung)
  ```

---

## 2. Best Practice dengan TypeScript: `InjectionKey<T>`

Jangan menggunakan string biasa sebagai key inject (misal `provide('user', user)`), karena berisiko *typo* dan tipe datanya menjadi `unknown`.

Gunakan `InjectionKey<T>` dari Vue dengan `Symbol()` agar 100% type-safe:

### Langkah 1: Buat Injection Key terpusat (`src/keys/injectionKeys.ts`)
```ts
import type { InjectionKey, Ref } from "vue";

// Definisikan tipe datanya, misalnya Ref<string>
export const userNameKey: InjectionKey<Ref<string>> = Symbol("userNameKey");
```

### Langkah 2: Parent Menyediakan Data (`App.vue`)
```vue
<script setup lang="ts">
import { ref, provide } from "vue";
import { userNameKey } from "./keys/injectionKeys";
import UserProfile from "./components/UserProfile.vue";

const userName = ref("Rinaru");

// Sediakan nilai untuk komponen anak
provide(userNameKey, userName);
</script>

<template>
  <UserProfile />
</template>
```

### Langkah 3: Child Mengambil Data (`UserProfile.vue`)
```vue
<script setup lang="ts">
import { inject, ref } from "vue";
import { userNameKey } from "../keys/injectionKeys";

// Nilai kedua adalah default value jika provider tidak ditemukan
const userName = inject(userNameKey, ref("Guest"));
</script>

<template>
  <p>User Aktif: {{ userName }}</p>
</template>
```

---

## 3. Aturan Emas Provide / Inject
1. **Mutasi Data Sebaiknya Berada di Provider:** Jika data perlu diubah oleh komponen anak, sediakan juga fungsi pengubahnya dari provider:
   ```ts
   provide(userKey, {
     user,
     updateUser: (newName: string) => { user.value = newName; }
   });
   ```
2. **Kapan Menggunakan Pinia vs Provide/Inject:**
   - Gunakan **Provide/Inject** untuk kebutuhan lokal hierarki (seperti library komponen `BaseCard`, Compound Component, Tab/Accordion).
   - Gunakan **Pinia** untuk global state aplikasi (Auth, User Session, Keranjang Belanja, Setting Tema).
