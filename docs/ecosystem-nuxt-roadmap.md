# Vue 3 ke Nuxt.js: Roadmap, Ekosistem Library & Best Practices

Dokumentasi ini adalah peta jalan (*roadmap*) bagi kamu yang sedang menguasai Vue 3 + TypeScript dan bersiap melangkah ke **Nuxt.js (Framework Fullstack & SSR/SSG untuk Vue)**.

---

## 1. Library Ekosistem Wajib di Vue 3 & Nuxt

Berikut adalah *industry standard stack* yang paling sering digunakan oleh profesional:

| Kategori | Library Standar Industri | Kenapa Dipakai? |
| :--- | :--- | :--- |
| **Global State Management** | **Pinia** (`@pinia/nuxt`) | Pengganti resmi Vuex. Sangat ringan, modular, auto-completion TypeScript sempurna, tanpa mutations boilerplate. |
| **Server-State & Caching** | **TanStack Query** (`@tanstack/vue-query`) | Menangani caching API, auto-retry, refetch on window focus, pagination, & mutation rollback. |
| **Composables Toolkit** | **VueUse** (`@vueuse/core`) | "Pisau lipat" wajib developer Vue. Berisi ratusan fungsi siap pakai: `useLocalStorage`, `useDebounceFn`, `onClickOutside`, `useIntersectionObserver`, `useDark`, dll. |
| **Form & Validasi** | **Vee-Validate** + **Zod** | Menangani validasi kompleks, pesan error otomatis, dan type inference dari schema Zod. |
| **Komponen UI & Styling** | **Tailwind CSS** + **shadcn-vue** / **Reka UI** (Radix Vue) / **Nuxt UI** | Headless components yang accessible (A11y), mudah dikustomisasi, dan tidak membebani ukuran bundle. |
| **Icons** | **Lucide Vue Next** / `@nuxt/icon` | Set ikon modern, tree-shakeable, dan ringan. |
| **HTTP Client** | **ofetch** (Bawaan Nuxt `$fetch` / `useFetch`) | Alternatif modern Axios dari unjs: auto parse JSON, auto refresh token, support server-side & client-side. |
| **Testing** | **Vitest** + `@vue/test-utils` | Test runner super cepat berbasis Vite, kompatibel dengan API Jest. |

---

## 2. Jembatan Mental Model: Dari Vue 3 ke Nuxt 3

Nuxt bukan bahasa baru, melainkan **fondasi opiniated di atas Vue 3** yang mempermudah arsitektur aplikasi:

```text
Vue 3 SPA (Single Page App)             Nuxt 3 (Fullstack / Universal)
----------------------------             ---------------------------------
Router manual di router/index.ts  --->   File-based Routing di folder pages/
Import komponen manual satu-satu  --->   Auto-imports (components/, composables/)
Hanya render di browser (CSR)     --->   Server-Side Rendering (SSR) & Static (SSG)
Butuh backend server terpisah     --->   Bisa bikin API routes langsung di server/api/
SEO terbatas (blank HTML awal)    --->   SEO mantap dengan useHead() & useSeoMeta()
```

### Konsep Baru yang Akan Kamu Temukan di Nuxt:
1. **Universal Code:** Kode kamu akan dieksekusi di dua tempat: Node.js (Server) saat pertama kali buka web, dan Browser (Client) setelahnya (*Hydration*).
2. **`useFetch` & `useAsyncData`:** Fitur bawaan Nuxt untuk fetching data yang bebas dari masalah *double-fetch* antara server dan client.
3. **Auto-imports:** Di Nuxt kamu tidak perlu lagi `import { ref, computed } from "vue"` atau import komponen manual; semuanya otomatis terdeteksi!

---

## 3. Best Practices Industri (Standar Koding)

### A. Arsitektur Komponen
1. **Container vs Presentational (Smart vs Dumb Components):**
   - *Dumb:* Menerima `props`, mengeluarkan `emits`, tidak tahu urusan API (contoh: `BaseToast`, `BaseInput`, `BaseCard`).
   - *Smart:* Mengatur data fetching, state management, dan alur bisnis (contoh: `ProductForm`, `App.vue`, atau file di `pages/`).
2. **Satu Sumber Kebenaran (Single Source of Truth):**
   - Jangan duplikasi prop ke dalam `ref` lokal anak kecuali memang sengaja ingin membuat draft independen.

### B. TypeScript Strictness
1. Hindari tipe `any`. Selalu buat interface atau schema Zod.
2. Manfaatkan generic component saat membuat tabel atau list (`<script setup lang="ts" generic="T">`).

### C. State & Fetching Hygiene
1. Jangan campur *UI State* (misal modal kebuka/tutup) ke dalam cache *Server State*.
2. Pisahkan query key factory agar cache TanStack Query konsisten dan terhindar dari typo.
