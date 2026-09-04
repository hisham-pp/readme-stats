import { NextRequest } from "next/server";
import { handleTopLangs } from "../route";

export async function GET(request: NextRequest) {
  return handleTopLangs(request, "badge");
}
