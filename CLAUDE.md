# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概覽

桃園市婦幼局健康管理科業務洞見系統。將政府公開業務頁面的文字資料，轉為結構化 JSON，再以 Vue 3 儀表板呈現給新任科長快速掌握業務全貌。

**目標網站**：`https://dowcd.tycg.gov.tw/cl.aspx?n=16385`  
**工作計劃主文件**：`PLAN.md`（含目前進度與下一步指令）

## 目前狀態（2026-04-22）

- Phase 1（資料抓取）：**完成** → `data/business_logic.json` v1.1，16筆業務
- Phase 2（洞見建模）：**完成** → `data/insight_report.md`
- Phase 3（前端）：**完成核心頁面** → `frontend/` Vue 3 專案，build ✓
- Phase 4（Prompt 指令集）：**待建立**

## 架構

```
data/
  business_logic.json   結構化業務資料主檔（Single Source of Truth）
  insight_report.md     管理洞見分析報告
frontend/               Vue 3 + Vite + Tailwind v4 + ECharts
  src/data/businessData.ts   前端資料層（TypeScript 型別定義 + 16筆資料）
  src/views/
    DashboardView.vue         總覽（圓餅圖、橫條圖、業務列表）
    BusinessDetailView.vue    業務詳細頁（含相關業務推薦）
    SearchView.vue            全文搜尋＋篩選
    KnowledgeMapView.vue      生命週期時間軸＋服務對象關聯矩陣
  src/router/index.ts         路由設定
backend/                待建立（Express API）
prompts/                待建立（Prompt 指令集）
```

### 資料流

```
政府網站（3層深度）→ WebFetch 抓取 → business_logic.json → businessData.ts → Vue 3 頁面
```

### business_logic.json Schema（v1.1）

```json
{
  "id": "M01-M16",
  "業務名稱": "string",
  "業務類型": "行政補助 | 醫療介入 | 諮詢服務",
  "目標族群": ["string"],
  "生命週期階段": "婚前 | 孕前 | 孕期 | 產後 | 幼童",
  "法律依據": "string",
  "補助對象條件": "string",
  "補助金額": "string | object",
  "服務內容": "string",
  "負責分機": "string",
  "來源URL": "string",
  "是否首創政策": "boolean",
  "風險等級": "高 | 中 | 低",
  "資料完整度": "高 | 中 | 部分 | 低",
  "備註": "string"
}
```

## 開發指令

### 前端
```bash
cd frontend && npm run dev     # dev server → http://localhost:5173
cd frontend && npm run build   # 靜態打包（build 已通過 ✓）
```

### 後端（待建立）
```bash
cd backend && node server.js   # Express API → port 3000
```

## 爬蟲注意事項

- 政府網站為 SSR，用 cheerio 即可，不需 Puppeteer
- URL 結構：`cl.aspx?n=` 為專區頁；`News.aspx?n=&sms=` 為業務列表；`News_Content.aspx?n=&s=` 為文章詳情
- 請求間加 1-2 秒延遲；加入 User-Agent header
- 不與衛福部補助重複是凍卵計畫（M10）的重要限制

## 接續工作

每次新對話，讀取順序：
1. `PLAN.md` — 確認目前進度與下一步
2. `data/business_logic.json` — 資料現況
3. `projectbrief.md` — 需求定義（較穩定）
