# AI Fan Growth Intelligence

生成AI上でのIPの推薦・説明・比較と、SNS上のファン熱量をつなぎ、ファン育成と収益化施策を提示するIPホルダー向けB2B SaaS MVPです。架空IP「Starlight Nexus」のデータだけで、外部APIキーなしでも全画面をデモできます。

## セットアップ

```bash
npm install
copy .env.example .env.local
npm run dev
```

`http://localhost:3000` を開きます。型チェックは `npm run typecheck`、本番ビルドは `npm run build` です。VercelではリポジトリをImportし、必要に応じて環境変数を登録してください。

## 使用技術

- Next.js App Router / React / TypeScript
- Tailwind CSS、Radix Slot（shadcn/ui互換のUI基盤）、Lucide Icons
- Recharts
- Papa Parse（CSV）
- ローカルJSON + 決定論的サンプルデータ生成
- HTML印刷CSSによるPDF保存

## 画面

Home、Dashboard、AI Visibility、SNS Heat、Gap Analysis、Recommendations、Executive Report、Settings / Inputを実装しています。Dashboardは4 KPI、文脈別AI Visibility、SNS時系列、競合レーダー、施策マトリクス、インサイト、TOP5施策、リスクを表示します。

## データ構造

`lib/types.ts` に `IPProfile`、`AIPromptResult`、`SNSSignal`、`GapInsight`、`RecommendedAction` を定義しています。`data/` にプロファイルとサンプル定義を配置し、`lib/data.ts` が48件のAI評価、65件のSNSシグナルを再現可能な形で展開します。ギャップ11件、施策16件はJSONに収録しています。

## スコアリングロジック

- AI Visibility: Mention Rate 30%、Recommendation Rank 20%、Context Fit 20%、Sentiment 10%、Accuracy 10%、Source Quality 10%。順位点は1位100、2位80、3位60、4位40、5位以下20、未言及0です。
- SNS Heat: 投稿量25%、エンゲージメント率25%、ポジティブ感情20%、急上昇性15%、KOL関与15%。投稿量と率はデータ内最大値で正規化します。
- Fan Growth Opportunity: AI/SNSギャップ30%、新規獲得25%、海外20%、コアファン15%、実行容易性10%。
- Revenue Opportunity: グッズ25%、イベント20%、FC20%、コラボ15%、EC/アプリ/来店20%。

## CSVフォーマット

Settingsから最大5MBのCSVをアップロードできます。ヘッダーは対象型のフィールド名と一致させてください。配列はJSON配列または `|` 区切り、真偽値は `true/false`、日付はISO 8601を推奨します。必須値と数値型を行単位で検証し、成功件数とエラー行を表示します。アップロードはMVPでは検証・プレビューまでで永続化しません。

AI必須例: `id,ipId,modelName,prompt,context,language,mentioned,sentimentScore,contextFitScore,accuracyScore,sourceQualityScore,competitorGapScore,createdAt`

SNS必須例: `id,ipId,platform,keyword,hashtag,postVolume,engagementCount,engagementRate,sentimentScore,fanContext,language,region,createdAt`

各分析画面からAI Prompt Results、SNS Signals、Gap Insights、Recommended ActionsをUTF-8 BOM付きCSVで出力できます。

## API拡張方法

`lib/ai-adapters.ts` に `runAIPromptEvaluation`、`parseAIResponse`、`calculatePromptResult` の境界を用意しています。`.env.local` に `OPENAI_API_KEY`、`GEMINI_API_KEY`、`PERPLEXITY_API_KEY` を設定し、`runAIPromptEvaluation` 内のprovider実装を公式SDK/API呼び出しへ差し替えます。未設定時は必ずサンプル結果へフォールバックします。Web UIのスクレイピングは設計対象外です。定期実行はVercel Cron + Queue、結果保存はPostgreSQLを推奨します。

## 本番化ロードマップ

### Phase 1：MVP

- サンプルデータ、CSVアップロード、ダッシュボード、レポート出力

### Phase 2：AI API連携

- OpenAI API、Gemini API、Perplexity API、検索API、プロンプト定期実行

### Phase 3：SNSデータ連携

- X API、YouTube API、TikTok / Instagram、Reddit、Meltwater / Brandwatch

### Phase 4：クライアント向けSaaS化

- 認証、ワークスペース、権限管理、定期レポート、アラート通知

### Phase 5：収益貢献分析

- CRM連携、EC連携、ファンクラブデータ連携、広告データ連携、LTV / CV分析

## 利用規約・権利面での注意点

各AI・SNSは公式APIと最新の利用規約、レート制限、保存・二次利用条件に従って接続してください。投稿本文、ユーザーID、画像等には著作権、プライバシー、個人情報、肖像・パブリシティ権が関係します。必要最小限の取得、匿名化、保存期間、削除手段を定め、KOL評価を自動的な不利益判断に用いないでください。IP素材の利用範囲とファンUGCの掲載許諾も確認が必要です。AI回答は変動するため、監査日時、モデル、プロンプト、出典を記録し、人による確認を前提とします。

## 今後の改善案

- PostgreSQL/Drizzleによる永続化と監査ログ
- 統計的な急上昇検知、重複排除、ボット判定、地域推定の信頼度表示
- プロンプトセットの版管理と多言語回帰テスト
- 施策の承認ワークフロー、担当・期限・実績入力
- GA4/CRM/ECイベントとの因果・増分効果分析
- アクセシビリティ監査、E2E、Visual Regression、Storybook
