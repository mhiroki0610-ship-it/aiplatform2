import {Suspense} from "react";import {AnalysisReport} from "@/components/analysis/analysis-report";
export default function Page(){return <Suspense fallback={<div className="p-10 text-center">診断結果を読み込んでいます…</div>}><AnalysisReport/></Suspense>}
