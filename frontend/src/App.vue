<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-indigo-700 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <span class="font-bold text-lg tracking-wide">桃園婦幼局 · 健康管理科洞見系統</span>
        <div class="flex gap-6 text-sm font-medium">
          <RouterLink to="/" class="hover:text-indigo-200 transition-colors" active-class="underline">總覽</RouterLink>
          <RouterLink to="/knowledge-map" class="hover:text-indigo-200 transition-colors" active-class="underline">知識圖譜</RouterLink>
          <RouterLink to="/search" class="hover:text-indigo-200 transition-colors" active-class="underline">業務搜尋</RouterLink>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 py-6">
      <RouterView />
    </main>
    <footer class="text-center text-xs text-gray-400 py-4">
      資料來源：桃園市政府婦幼發展局官網 · 最後更新 2026-04-22
    </footer>
  </div>
</template>
