<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { businesses, typeColors, riskColors, lifecycleOrder } from '@/data/businessData'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart, BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([PieChart, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer])

const router = useRouter()

const typeCounts = computed(() => {
  const counts: Record<string, number> = {}
  businesses.forEach(b => { counts[b.業務類型] = (counts[b.業務類型] || 0) + 1 })
  return counts
})

const pieOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c}項 ({d}%)' },
  legend: { bottom: 0, textStyle: { fontSize: 12 } },
  color: ['#6366f1', '#10b981', '#a855f7'],
  series: [{
    type: 'pie', radius: ['40%', '70%'], center: ['50%', '45%'],
    data: Object.entries(typeCounts.value).map(([name, value]) => ({ name, value })),
    label: { show: true, formatter: '{b}\n{c}項' }
  }]
}))

const lifecycleData = computed(() => {
  const counts: Record<string, number> = {}
  lifecycleOrder.forEach(stage => { counts[stage] = 0 })
  businesses.forEach(b => { counts[b.生命週期階段] = (counts[b.生命週期階段] || 0) + 1 })
  return counts
})

const barOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 60, right: 20, top: 20, bottom: 40 },
  xAxis: { type: 'category', data: lifecycleOrder, axisLabel: { fontSize: 12 } },
  yAxis: { type: 'value', minInterval: 1, name: '業務數' },
  color: ['#6366f1'],
  series: [{ type: 'bar', data: lifecycleOrder.map(s => lifecycleData.value[s] || 0), barMaxWidth: 48 }]
}))

const highRisk = computed(() => businesses.filter(b => b.風險等級 === '高'))
const pioneering = computed(() => businesses.filter(b => b.是否首創政策))
</script>

<template>
  <div class="space-y-6">
    <!-- 標題 -->
    <div>
      <h1 class="text-2xl font-bold text-gray-800">健康管理科 · 業務總覽</h1>
      <p class="text-gray-500 text-sm mt-1">共 {{ businesses.length }} 項業務 · 6 個服務專區</p>
    </div>

    <!-- 統計卡片 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl shadow p-4 text-center">
        <div class="text-3xl font-bold text-indigo-600">{{ businesses.length }}</div>
        <div class="text-sm text-gray-500 mt-1">業務項目總數</div>
      </div>
      <div class="bg-white rounded-xl shadow p-4 text-center">
        <div class="text-3xl font-bold text-red-500">{{ highRisk.length }}</div>
        <div class="text-sm text-gray-500 mt-1">高風險業務</div>
      </div>
      <div class="bg-white rounded-xl shadow p-4 text-center">
        <div class="text-3xl font-bold text-amber-500">{{ pioneering.length }}</div>
        <div class="text-sm text-gray-500 mt-1">首創政策</div>
      </div>
      <div class="bg-white rounded-xl shadow p-4 text-center">
        <div class="text-3xl font-bold text-green-600">6</div>
        <div class="text-sm text-gray-500 mt-1">服務專區</div>
      </div>
    </div>

    <!-- 圖表區 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm font-semibold text-gray-600 mb-3">業務類型分布</h2>
        <VChart :option="pieOption" style="height:220px" autoresize />
      </div>
      <div class="bg-white rounded-xl shadow p-4">
        <h2 class="text-sm font-semibold text-gray-600 mb-3">生命週期業務分布</h2>
        <VChart :option="barOption" style="height:220px" autoresize />
      </div>
    </div>

    <!-- 首創政策警示 -->
    <div v-if="pioneering.length" class="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <h2 class="text-sm font-bold text-amber-800 mb-3">⚠ 首創政策 — 高頻監控</h2>
      <div class="space-y-2">
        <div v-for="b in pioneering" :key="b.id"
          class="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm cursor-pointer hover:bg-amber-50 transition-colors"
          @click="router.push(`/business/${b.id}`)">
          <div>
            <span class="font-medium text-gray-800 text-sm">{{ b.業務名稱 }}</span>
            <span class="ml-2 text-xs text-gray-400">{{ b.id }}</span>
          </div>
          <span :class="['text-xs px-2 py-0.5 rounded-full', riskColors[b.風險等級]]">{{ b.風險等級 }}風險</span>
        </div>
      </div>
    </div>

    <!-- 全部業務列表 -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <h2 class="text-sm font-semibold text-gray-600 px-5 pt-4 pb-2">全部業務列表</h2>
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-xs uppercase">
          <tr>
            <th class="px-4 py-2 text-left">ID</th>
            <th class="px-4 py-2 text-left">業務名稱</th>
            <th class="px-4 py-2 text-left">類型</th>
            <th class="px-4 py-2 text-left">生命週期</th>
            <th class="px-4 py-2 text-left">風險</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="b in businesses" :key="b.id"
            class="hover:bg-indigo-50 cursor-pointer transition-colors"
            @click="router.push(`/business/${b.id}`)">
            <td class="px-4 py-2.5 font-mono text-gray-400">{{ b.id }}</td>
            <td class="px-4 py-2.5 font-medium text-gray-800">
              {{ b.業務名稱 }}
              <span v-if="b.是否首創政策" class="ml-1 text-xs text-amber-600">★首創</span>
            </td>
            <td class="px-4 py-2.5">
              <span :class="['text-xs px-2 py-0.5 rounded-full', typeColors[b.業務類型]]">{{ b.業務類型 }}</span>
            </td>
            <td class="px-4 py-2.5 text-gray-500">{{ b.生命週期階段 }}</td>
            <td class="px-4 py-2.5">
              <span :class="['text-xs px-2 py-0.5 rounded-full', riskColors[b.風險等級]]">{{ b.風險等級 }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
