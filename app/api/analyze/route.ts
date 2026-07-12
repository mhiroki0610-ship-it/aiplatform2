import {NextResponse} from "next/server";import {runAIPromptEvaluation} from "@/lib/ai-adapters";
export async function GET(){const result=await runAIPromptEvaluation({modelName:"ChatGPT",prompt:"初心者におすすめのIPを教えて",context:"初心者におすすめ",language:"日本語",ipId:"starlight-nexus"});return NextResponse.json({mode:process.env.OPENAI_API_KEY?"adapter-ready":"sample",message:"サンプル分析が完了しました",result})}
export async function POST(req:Request){try{return NextResponse.json(await runAIPromptEvaluation(await req.json()))}catch{return NextResponse.json({error:"Invalid evaluation request"},{status:400})}}
