import { ingoredComponentsFiles } from "@/constants/ignored-components-files";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "src", "components", "ui");

    // ignore all the folders and get only the files
    const files = (await fs.readdir(filePath)).filter(
      (file) =>
        file.includes(".tsx") &&
        !ingoredComponentsFiles.includes(file.replace(".tsx", ""))
    );

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
