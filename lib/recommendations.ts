import type { AIPromptResult, RecommendedAction, SNSSignal } from "./types";
import { calculateAIVisibilityScore, calculateSNSHeatScore } from "./scoring";
const mk=(id:string,category:string,title:string,description:string,priority:RecommendedAction["priority"]="High"):RecommendedAction=>({id,ipId:"starlight-nexus",priority,category,title,description,expectedImpact:"90日以内に主要KPIを改善",effort:"Medium",targetFanSegment:"高熱量ファン",relatedKpi:"AI Visibility / Revenue",actionSteps:["対象文脈を特定","公式情報を制作","配信・計測","月次改善"],aiVisibilityImprovement:15,snsHeatImprovement:10,revenueImpact:78});
export function generateRecommendations(ai:AIPromptResult[],sns:SNSSignal[]){const result:RecommendedAction[]=[];const contexts=[...new Set(sns.map(s=>s.fanContext))];for(const c of contexts){const a=calculateAIVisibilityScore(ai.filter(x=>x.context.includes(c)||c.includes(x.context))),s=calculateSNSHeatScore(sns.filter(x=>x.fanContext===c));if(s>=65&&a<60)result.push(mk(`rule-gap-${c}`,"GEO / AI検索最適化",`${c}のファン熱量を公式情報へ転換`,"SNSでは強い一方AIに拾われていない文脈を、引用可能な公式ページへ変換します。"));}
if(ai.some(x=>x.competitorGapScore>65))result.push(mk("rule-competitor","公式サイト改善","競合優位文脈のFAQ・PR強化","競合に負ける検索意図ごとに一次情報を補強します。"));
if(calculateSNSHeatScore(sns.filter(x=>x.fanContext==="グッズ"))>65)result.push(mk("rule-goods","グッズ企画","限定グッズの予約・FC先行販売","需要を投稿熱量で検証し、受注販売へ接続します。"));
if(sns.some(x=>x.region!=="日本"&&x.postVolume>7000))result.push(mk("rule-global","海外展開","多言語公式ページと海外KOL施策","海外熱量の高い地域へ英語一次情報とKOL接点を整備します。"));
if(ai.some(x=>x.accuracyScore<60))result.push(mk("rule-accuracy","FAQ改善","誤情報修正と公式FAQ整備","回答の揺れを正誤表と更新日の明示で解消します。"));
if(ai.some(x=>x.sourceQualityScore<60))result.push(mk("rule-source","GEO / AI検索最適化","公式ソースと構造化データ整備","信頼できる一次情報とメディア記事を機械可読にします。"));return result;}
