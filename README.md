# 桃園市婦幼局健康管理科 — 業務洞見系統

## 如何接續工作（對話重啟指令）

每次開啟新的 Claude 對話後，貼上以下指令即可從上次進度繼續：

```
請讀取以下檔案後告訴我目前進度，然後繼續執行下一步：
1. PLAN.md
2. projectbrief.md
3. （如果存在）data/business_logic.json

讀完後，根據 PLAN.md 第 4 節「下一步」繼續執行。
```

## 重要檔案說明

| 檔案 | 用途 |
|------|------|
| `README.md` | 本文件，接續工作入口 |
| `PLAN.md` | 主工作計劃：目標、執行計劃、進度、Lessons Learned |
| `projectbrief.md` | 專案需求定義（勿修改） |
| `data/business_logic.json` | 結構化業務資料主檔（Phase 1 產出後存在） |
