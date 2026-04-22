# 桃園市婦幼局健康管理科 — 業務洞見系統 · 工作計劃

> **使用說明**：每次開啟新對話，請先讓 Claude 讀取此檔案（`PLAN.md`）與 `projectbrief.md`，即可接續上次進度。如有新進展，請同步更新「目前進度」與「Lessons Learned」兩節。

---

## 1. 專案目標 (Objectives)

| 層次 | 目標 | 驗收標準 |
|------|------|----------|
| **L1 資料** | 完整抓取健康管理科所有業務頁面 | `business_logic.json` 覆蓋全部子頁，無缺漏 |
| **L2 洞見** | 提煉科長視角的管理重點 | 業務分類、時間軸、風險標記皆完成 |
| **L3 系統** | Vue 3 Web 儀表板上線 | Dashboard / 知識圖譜 / 全文檢索三功能可用 |
| **L4 工具** | 可重複使用的 Prompt 指令集 | 未來餵入新政策文件能自動更新 JSON |

**核心服務對象**：新任健康管理科科長（快速掌握業務全貌）

---

## 2. 技術架構 (Tech Stack)

```
前端   Vue 3 + Vite + Tailwind CSS + ECharts
後端   Node.js (Express)
爬蟲   Node.js + axios + cheerio（遞迴抓取）
儲存   初期：Markdown + JSON 檔案 / 進階：SQLite
AI     Claude Sonnet（邏輯拆解 + 代碼生成）
IDE    Claude Code (CLI)
```

**目標網站入口**：`https://dowcd.tycg.gov.tw/cl.aspx?n=16385`

---

## 3. 執行計劃 (Execution Plan)

### Phase 1 — 資料提取與結構化 ⬜ 未開始

**目標**：產出 `data/business_logic.json`

#### Step 1-A：分析網頁結構
- [ ] 用 `WebFetch` 抓取入口頁 HTML
- [ ] 識別導覽選單、內容區、子連結的 CSS selector
- [ ] 記錄分頁規律（若有）

#### Step 1-B：定義 JSON Schema
```json
{
  "業務名稱": "string",
  "業務類型": "行政補助 | 醫療介入 | 諮詢服務",
  "目標族群": ["孕產婦", "幼童", "婦女", ...],
  "生命週期階段": "婚前 | 孕前 | 孕期 | 產後 | 幼童",
  "法律依據": "string",
  "補助對象條件": "string",
  "補助金額": "string",
  "服務內容": "string",
  "負責分機": "string",
  "來源URL": "string",
  "是否首創政策": "boolean",
  "風險等級": "高 | 中 | 低",
  "備註": "string"
}
```

#### Step 1-C：撰寫 Node.js 爬蟲腳本
- [ ] 建立 `scraper/index.js`（axios + cheerio）
- [ ] 實作遞迴子頁面爬取邏輯
- [ ] 輸出至 `data/raw/` 與 `data/business_logic.json`

#### Step 1-D：驗證資料完整性
- [ ] 比對官網業務項目數量
- [ ] 補齊缺漏欄位（人工或 AI 輔助）

---

### Phase 2 — 管理洞見建模 ⬜ 未開始

**目標**：將 JSON 資料轉為「科長視角」的管理框架

#### Step 2-A：業務分類
- 類型標記：行政補助 / 醫療介入 / 諮詢服務
- 識別跨類型業務（如：產後同時涉及補助＋心理）

#### Step 2-B：全生命週期時間軸
```
婚前 → 孕前 → 孕期 → 產後 → 幼童（0-6歲）→ 學齡
```
- 每個階段列出對應業務項目

#### Step 2-C：風險評估
- 首創政策標記（如：凍卵補助、產後心理諮商）
- 預算規模排序
- 跨局處協作業務識別

#### Step 2-D：共同對象分析
- 建立「服務對象 ↔ 多個業務」的關聯矩陣
- 識別政策空白與重疊

---

### Phase 3 — 前端可視化實作 ⬜ 未開始

**目標**：Vue 3 Web 儀表板

#### Step 3-A：專案初始化
- [ ] `npm create vue@latest` + Tailwind + ECharts
- [ ] 建立路由：Dashboard / 業務明細 / 知識圖譜 / 搜尋

#### Step 3-B：Dashboard 頁
- 業務類型佔比圓餅圖
- 生命週期橫向時間軸
- 首創政策 / 高風險業務警示卡

#### Step 3-C：Knowledge Map 頁
- ECharts 關係圖：業務 ↔ 法規 ↔ 服務對象
- 節點點擊跳轉業務詳細頁

#### Step 3-D：Search Engine 頁
- 基於 `business_logic.json` 的全文模糊搜尋
- 支援欄位篩選（類型、族群、生命週期）

#### Step 3-E：業務詳細頁
- 單一業務完整資訊卡
- 相關業務推薦（共同對象）

---

### Phase 4 — Prompt 指令集建立 ⬜ 未開始

- [ ] 建立 `prompts/` 資料夾
- [ ] 撰寫標準化 Prompt：資料提取、洞見分析、更新流程
- [ ] 記錄使用範例與輸出範例

---

## 4. 目前進度 (Current Progress)

**最後更新**：2026-04-22

### 已完成
- [x] 建立專案資料夾結構、`projectbrief.md`、`PLAN.md`、`CLAUDE.md`、`README.md`
- [x] **Phase 1 全部**：遞迴抓取 3 層深度（入口→子專區→業務→文章），16 筆業務完整整理
- [x] **Phase 1 補強**：M01 優生保健、M02 SMA篩檢、M10 凍卵金額全部補齊 → `business_logic.json` v1.1
- [x] **Phase 2**：管理洞見報告 → `data/insight_report.md`（類型分布、時間軸、首創政策、共同對象、預算排序、跨局協作）
- [x] **Phase 3 初始化**：Vue 3 + TypeScript + Vue Router + Tailwind CSS v4 + ECharts 專案建立完成
- [x] **Phase 3 核心頁面**：Dashboard（圖表＋全業務表）、業務詳細頁、全文搜尋頁、知識圖譜頁 — 全部完成
- [x] Build 測試通過（零型別錯誤，`npm run build` ✓）

### 進行中
- 無

### 下一步（Next Action）
> **優先**：補齊 M03 健康幸福家庭各補助項目金額（需抓各子文章）
>
> **後續優化**：
> - Phase 3 ECharts chunk 拆分（DashboardView 目前 533KB，可 lazy import）
> - 後端 Express API server（`backend/server.js`）提供 `/api/businesses` 端點
> - Phase 4：`prompts/` 資料夾，建立標準化 Prompt 指令集

### 阻礙 (Blockers)
- 無（dev server 運行中，網址：http://localhost:5173）

---

## 5. 檔案結構 (File Structure)

```
20260422 桃園婦幼局健康管理施政分析/
├── PLAN.md                    ← 本文件（主要工作計劃）
├── projectbrief.md            ← 專案需求定義
├── data/
│   ├── raw/                   ← 爬蟲原始 HTML/文字
│   └── business_logic.json    ← 結構化資料主檔（Phase 1 產出）
├── scraper/
│   ├── index.js               ← 爬蟲主程式
│   └── schema.js              ← JSON Schema 定義
├── backend/
│   └── server.js              ← Express API server
├── frontend/
│   └── (Vue 3 專案)
└── prompts/
    └── (可重複使用的 Prompt 指令集)
```

---

## 6. Lessons Learned

> 每次遇到問題或關鍵決策後，在此記錄。格式：日期 + 問題 + 解法 + 影響。

### 2026-04-22 — 專案啟動
- **觀察**：目標網站為政府網站，可能有反爬蟲機制或需要特定 User-Agent
- **預防措施**：爬蟲加入 `headers: { 'User-Agent': 'Mozilla/5.0...' }` 與適當延遲（1-2 秒）
- **觀察**：桃園市政府網站 URL 格式為 `cl.aspx?n=XXXXX`，子頁面可能用 `n` 參數區分，需確認

### 2026-04-22 — Phase 1 資料抓取完成（v1.0）
- **發現**：網站結構為三層：專區（cl.aspx?n=）→ 業務列表（News.aspx?n=&sms=）→ 文章內容（News_Content.aspx?n=&s=）
- **發現**：健康管理科共 **6 個子專區、16 項業務**（非原估計的 10 大核心任務）
- **發現**：部分業務頁面（列表頁）不含業務詳情，需再進入文章層才能取得補助金額
- **發現**：`幼兒安全宣導`（M12）頁面顯示「查無資料」，內容可能尚未上架
- **首創政策確認**：凍卵營養金（M10）與孕婦疫苗補助（M07）為最需監控的首創業務
- **資料完整度**：M07、M06、M16 資料完整度高；M10、M01、M15 資料完整度低，需補強
- **行動**：`data/business_logic.json` v1.0 產出，含管理洞見摘要（業務類型統計、生命週期分布、首創政策）

---

## 7. 關鍵決策紀錄 (Decision Log)

| 日期 | 決策 | 理由 |
|------|------|------|
| 2026-04-22 | 初期用 JSON 檔案儲存，不用資料庫 | 快速驗證，減少基礎設施複雜度 |
| 2026-04-22 | 前端選 Vue 3（非 React） | projectbrief 指定 |
| 2026-04-22 | 以 cheerio 做 HTML 解析（非 Puppeteer） | 政府網站多為 SSR，不需要瀏覽器渲染 |

---

## 8. 對話接續指令 (Resume Instructions)

接續工作的指令請見 **`README.md`**。
