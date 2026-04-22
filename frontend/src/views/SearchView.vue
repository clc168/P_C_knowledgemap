<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { businesses, typeColors, riskColors } from '@/data/businessData'

const router = useRouter()
const query = ref('')
const selectedType = ref('')
const selectedLifecycle = ref('')

const types = ['行政補助', '醫療介入', '諮詢服務']
const lifecycles = ['婚前', '孕前', '孕期', '產後', '幼童']

const results = computed(() => {
  const q = query.value.toLowerCase()
  return businesses.filter(b => {
    const matchText = !q || [b.業務名稱, b.服務內容, b.補助對象條件, b.目標族群.join(' '), b.備註]
      .some(s => s.toLowerCase().includes(q))
    const matchType = !selectedType.value || b.業務類型 === selectedType.value
    const matchLifecycle = !selectedLifecycle.value || b.生命週期階段 === selectedLifecycle.value
    return matchText && matchType && matchLifecycle
  })
})
</script>

<template>
  <div class="space-y-5 max-w-4xl">
    <h1 class="text-xl font-bold text-gray-800">業務搜尋</h1>

    <div class="bg-white rounded-xl shadow p-5 space-y-3">
      <input
        v-model="query"
        type="text"
        placeholder="搜尋業務名稱、服務內容、補助對象..."
        class="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <div class="flex gap-3 flex-wrap">
        <select v-model="selectedType" class="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">全部類型</option>
          <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
        </select>
        <select v-model="selectedLifecycle" class="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
          <option value="">全部週期</option>
          <option v-for="l in lifecycles" :key="l" :value="l">{{ l }}</option>
        </select>
        <button @click="query = ''; selectedType = ''; selectedLifecycle = ''"
          class="text-sm text-gray-400 hover:text-gray-600 px-3 py-2">清除篩選</button>
      </div>
    </div>

    <p class="text-sm text-gray-400">找到 {{ results.length }} 筆結果</p>

    <div class="space-y-3">
      <div v-for="b in results" :key="b.id"
        class="bg-white rounded-xl shadow px-5 py-4 cursor-pointer hover:border-indigo-200 border border-transparent hover:shadow-md transition-all"
        @click="router.push(`/business/${b.id}`)">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <p class="text-xs text-gray-400 mb-0.5">{{ b.id }} · {{ b.生命週期階段 }}</p>
            <p class="font-semibold text-gray-800 text-sm">
              {{ b.業務名稱 }}
              <span v-if="b.是否首創政策" class="ml-1 text-xs text-amber-600">★首創</span>
            </p>
            <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ b.服務內容 }}</p>
          </div>
          <div class="flex flex-col gap-1 items-end shrink-0">
            <span :class="['text-xs px-2 py-0.5 rounded-full', typeColors[b.業務類型]]">{{ b.業務類型 }}</span>
            <span :class="['text-xs px-2 py-0.5 rounded-full', riskColors[b.風險等級]]">{{ b.風險等級 }}風險</span>
          </div>
        </div>
      </div>
      <div v-if="!results.length" class="text-center text-gray-400 py-12">查無符合條件的業務</div>
    </div>
  </div>
</template>
