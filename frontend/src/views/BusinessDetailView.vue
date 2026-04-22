<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { businesses, typeColors, riskColors } from '@/data/businessData'

const route = useRoute()
const router = useRouter()

const business = computed(() => businesses.find(b => b.id === route.params.id))
const related = computed(() => {
  if (!business.value) return []
  return businesses.filter(b =>
    b.id !== business.value!.id &&
    b.目標族群.some(t => business.value!.目標族群.includes(t))
  ).slice(0, 4)
})

const completenessColor: Record<string, string> = {
  '高': 'text-green-600', '中': 'text-yellow-600', '部分': 'text-orange-500', '低': 'text-red-500'
}

const subsidyText = computed(() => {
  const amt = business.value?.補助金額
  if (typeof amt === 'string') return amt
  if (typeof amt === 'object') return Object.entries(amt).map(([k, v]) => `${k}：${v}`).join('\n')
  return ''
})
</script>

<template>
  <div v-if="business" class="space-y-6 max-w-3xl">
    <button @click="router.back()" class="text-indigo-600 text-sm hover:underline flex items-center gap-1">
      ← 返回
    </button>

    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex items-start justify-between flex-wrap gap-3">
        <div>
          <p class="text-xs text-gray-400 mb-1">{{ business.id }} · {{ business.專區名稱 }}</p>
          <h1 class="text-xl font-bold text-gray-800">{{ business.業務名稱 }}</h1>
          <div class="flex gap-2 mt-2 flex-wrap">
            <span :class="['text-xs px-2 py-0.5 rounded-full', typeColors[business.業務類型]]">{{ business.業務類型 }}</span>
            <span :class="['text-xs px-2 py-0.5 rounded-full', riskColors[business.風險等級]]">{{ business.風險等級 }}風險</span>
            <span v-if="business.是否首創政策" class="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">★ 首創政策</span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-400">資料完整度</p>
          <p :class="['text-sm font-bold', completenessColor[business.資料完整度]]">{{ business.資料完整度 }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow divide-y divide-gray-100">
      <div class="grid grid-cols-2 gap-4 px-6 py-4">
        <div>
          <p class="text-xs text-gray-400 mb-1">生命週期階段</p>
          <p class="text-sm font-medium text-gray-700">{{ business.生命週期階段 }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 mb-1">目標族群</p>
          <p class="text-sm font-medium text-gray-700">{{ business.目標族群.join('、') }}</p>
        </div>
      </div>

      <div class="px-6 py-4">
        <p class="text-xs text-gray-400 mb-1">法律依據</p>
        <p class="text-sm text-gray-700">{{ business.法律依據 }}</p>
      </div>

      <div class="px-6 py-4">
        <p class="text-xs text-gray-400 mb-1">補助對象條件</p>
        <p class="text-sm text-gray-700 whitespace-pre-line">{{ business.補助對象條件 }}</p>
      </div>

      <div class="px-6 py-4">
        <p class="text-xs text-gray-400 mb-1">補助金額</p>
        <p class="text-sm text-gray-700 whitespace-pre-line font-medium text-indigo-700">{{ subsidyText }}</p>
      </div>

      <div class="px-6 py-4">
        <p class="text-xs text-gray-400 mb-1">服務內容</p>
        <p class="text-sm text-gray-700">{{ business.服務內容 }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 px-6 py-4">
        <div>
          <p class="text-xs text-gray-400 mb-1">聯絡電話</p>
          <p class="text-sm text-gray-700">{{ business.負責分機 }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 mb-1">資料來源</p>
          <a :href="business.來源URL" target="_blank" class="text-xs text-indigo-500 hover:underline break-all">官網連結</a>
        </div>
      </div>

      <div v-if="business.備註" class="px-6 py-4 bg-amber-50">
        <p class="text-xs text-amber-600 font-semibold mb-1">備註</p>
        <p class="text-sm text-amber-800">{{ business.備註 }}</p>
      </div>
    </div>

    <div v-if="related.length" class="bg-white rounded-xl shadow p-5">
      <h2 class="text-sm font-semibold text-gray-600 mb-3">相關業務（共同服務對象）</h2>
      <div class="space-y-2">
        <div v-for="r in related" :key="r.id"
          class="flex items-center justify-between px-4 py-2 rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-colors"
          @click="router.push(`/business/${r.id}`)">
          <span class="text-sm text-gray-700">{{ r.業務名稱 }}</span>
          <span :class="['text-xs px-2 py-0.5 rounded-full', typeColors[r.業務類型]]">{{ r.業務類型 }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-gray-400 text-center py-20">找不到此業務項目</div>
</template>
