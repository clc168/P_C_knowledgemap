# Project Brief: 桃園市婦幼局健康管理科 - 業務洞見系統 (Health Insight Dashboard)

## 1. 專案目的 (Purpose)
本專案旨在將桃園市政府婦幼發展局「健康管理科」的公開業務資料，透過 **AI Agent (Claude)** 進行結構化拆解，並建構一個 **Node.js + Vue** 的 Web 介面。
* **管理視角**：讓新任科長能快速掌握業務權責、預算流向與政策優先順序。
* **數位轉型**：將傳統網頁條列式文字轉換為「可視化、可檢索、可追蹤」的數位洞見工具。

## 2. 初始切入點 (Starting Point)
開發起點為官方業務職掌頁面：[桃園市政府婦幼發展局 - 健康管理科](https://dowcd.tycg.gov.tw/cl.aspx?n=16385)

**閱讀與處理順序：**
1.  **Level 1 (科別職掌)**：確認健康管理科的 10 大核心任務（如：生育保健、兒童發育、心理諮商）。
2.  **Level 2 (子頁面遞迴)**：逐一掃描各項專案計畫（如：凍卵補助、產後心理、幼兒專責醫師）。
3.  **Level 3 (關聯性建模)**：識別不同業務項目之間的「共同對象」（如：孕產婦同時涉及補助與心理諮商）。

## 3. 工作分派邏輯 (Work Assignment Method)
為了讓 AI 代理有效執行，將任務拆解為以下三個階段：

### 第一階段：資料提取與結構化 (Data Scraping & Parsing)
* **任務**：針對目標 URL 進行遞迴抓取。
* **方法**：定義資料 Schema（JSON 格式），包含：`業務名稱`、`法律依據`、`補助對象`、`補助金額`、`負責分機`。
* **重點**：確保文字完整存檔，不遺漏任何子頁面的政策細節。

### 第二階段：管理洞見建模 (Insight Modeling)
* **任務**：從文字中提煉「科長視角」的管理重點。
* **方法**：
    * **權責劃分**：將業務分類為「行政補助」、「醫療介入」、「諮詢服務」。
    * **時序分析**：依據全生命週期（婚前 -> 孕前 -> 產後 -> 幼童）建立業務時間軸。
    * **風險評估**：識別哪些是「首創政策」（如凍卵金、產後心理諮商），需高頻監控。

### 第三階段：前端可視化實作 (UI/UX Development)
* **任務**：使用 Vue 3 建立儀表板。
* **方法**：
    * **Dashboard**：顯示各類業務的佈局比例。
    * **Knowledge Map**：建立業務與法規的關係圖譜。
    * **Search Engine**：針對存下來的文字建立全文檢索。

## 4. 預計目標 (Expected Goals)
1.  **結構化資產**：產出一份完整的 `business_logic.json`，作為後續系統開發的 Single Source of Truth。
2.  **原型系統**：一個能呈現健康管理科全貌的 Web 洞見網頁，具備導航、分類與關鍵指標展示。
3.  **Agent 指令集**：建立一套可重複運用的 Prompt，未來可直接餵入最新政策文件進行自動更新。

## 5. 推薦工具鏈 (Tech Stack & Tools)
* **AI Agent**：Claude 3.5 Sonnet (負責代碼生成與邏輯拆解)。
* **IDE**：Cursor / Claude Code (負責實作 Node.js 與 Vue 環境)。
* **Backend**：Node.js (Express/NestJS) 負責處理爬蟲數據與 API。
* **Frontend**：Vue 3 + Vite + Tailwind CSS + Echarts (負責 UI 展示)。
* **Storage**：Markdown Files (初期) / SQLite (進階)。

---

**給 Claude Agent 的下一步指令：**
> 「請根據上述 Brief，先分析目標網頁的 HTML 結構，並規劃第一階段資料抓取所需的 JSON Schema。隨後，請寫出一個 Node.js 腳本，準備進行遞迴式的文字抓取與存檔。」