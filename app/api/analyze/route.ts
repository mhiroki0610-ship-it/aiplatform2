import {NextResponse} from "next/server";import {getDataset} from "@/lib/ip-datasets";
export async function GET(req:Request){const slug=new URL(req.url).searchParams.get("ip");return NextResponse.json({mode:"illustrative_demo",message:"展示用の参考診断を返しました。リアルタイム分析ではありません。",result:getDataset(slug)})}
export async function POST(req:Request){try{const body=await req.json();return NextResponse.json({mode:"illustrative_demo",result:getDataset(body.ip)})}catch{return NextResponse.json({error:"診断条件を確認してください。"},{status:400})}}
