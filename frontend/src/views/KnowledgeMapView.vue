<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { businesses, lifecycleOrder } from '@/data/businessData'

const router = useRouter()

const typeColorMap: Record<string, string> = {
  '行政補助': '#6366f1',
  '醫療介入': '#10b981',
  '諮詢服務': '#a855f7',
}

const riskBorder: Record<string, string> = {
  '高': 'border-red-400',
  '中': 'border-yellow-400',
  '低': 'border-gray-200',
}

const grouped = computed(() => {
  return lifecycleOrder.map(stage => ({
    stage,
    items: businesses.filter(b => b.生命週期階段 === stage)
  }))
})

const audienceMap = computed(() => {
  const map: Record<string, string[]> = {}
  businesses.forEach(b => {
    b.目標族群.forEach(audience => {
      if (!map[audience]) map[audience] = []
      map[audience].push(b.id)
    })
  })
  return Object.entries(map)
    .filter(([, ids]) => ids.length >= 2)
    .sort((a, b) => b[1].length - a[1].length)
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-xl font-bold text-gray-800">知識圖譜 · 業務關係可視化</h1>

    <!-- 生命週期時間軸 -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-sm font-semibold text-gray-600 mb-5">全生命週期業務時間軸</h2>
      <div class="flex gap-0 overflow-x-auto pb-2">
        <div v-for="(group, idx) in grouped" :key="group.stage" class="flex items-stretch">
          <!-- 階段欄 -->
          <div class="min-w-44 flex flex-col">
            <div class="text-center py-1.5 rounded-t-lg text-xs font-bold text-white"
              :style="{ backgroundColor: ['#f59e0b','#6366f1','#3b82f6','#ec4899','#10b981'][idx] }">
              {{ group.stage }}
            </div>
            <div class="flex-1 border border-gray-100 rounded-b-lg p-2 space-y-2">
              <div v-for="b in group.items" :key="b.id"
                :class="['text-xs rounded px-2 py-1.5 cursor-pointer border-l-4 bg-gray-50 hover:bg-indigo-50 transition-colors', riskBorder[b.風險等級]]"
                @click="router.push(`/business/${b.id}`)">
                <span class="font-medium text-gray-700">{{ b.id }}</span>
                <p class="text-gray-500 leading-snug mt-0.5">{{ b.業務名稱.replace(/計畫|服務|補助|專區/g, '') }}</p>
                <span v-if="b.是否首創政策" class="text-amber-500 text-xs">★首創</span>
              </div>
              <div v-if="!group.items.length" class="text-xs text-gray-300 text-center py-4">—</div>
            </div>
          </div>
          <!-- 箭頭 -->
          <div v-if="idx < grouped.length - 1" class="flex items-center px-1 text-gray-300 text-lg">›</div>
        </div>
      </div>
    </div>

    <!-- 服務對象關聯矩陣 -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-sm font-semibold text-gray-600 mb-4">服務對象 × 業務關聯（2項以上業務）</h2>
      <div class="space-y-3">
        <div v-for="[audience, ids] in audienceMap" :key="audience">
          <div class="flex items-center gap-3 flex-wrap">
            <span class="text-sm font-medium text-gray-700 w-28 shrink-0">{{ audience }}</span>
            <div class="flex gap-2 flex-wrap">
              <span v-for="id in ids" :key="id"
                class="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors"
                @click="router.push(`/business/${id}`)">
                {{ id }} · {{ businesses.find(b => b.id === id)?.業務名稱.slice(0, 10) }}
              </span>
            </div>
          </div>
          <div class="border-b border-gray-50 mt-2"></div>
        </div>
      </div>
    </div>

    <!-- 業務類型說明 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="[type, color] in Object.entries(typeColorMap)" :key="type"
        class="bg-white rounded-xl shadow p-4">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: color }"></div>
          <span class="text-sm font-semibold text-gray-700">{{ type }}</span>
        </div>
        <div class="space-y-1.5">
          <div v-for="b in businesses.filter(b => b.業務類型 === type)" :key="b.id"
            class="text-xs text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors flex gap-1"
            @click="router.push(`/business/${b.id}`)">
            <span class="text-gray-300">{{ b.id }}</span>
            <span>{{ b.業務名稱 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
