import { ingoredComponentsFiles } from "@/constants/ignored-components-files";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let filename = searchParams.get("filename")!;

  try {
    const file = filename.split("/");
    const isIgnored = ingoredComponentsFiles.includes(file[file.length - 1]);

    console.log({ isIgnored });

    if (isIgnored)
      return NextResponse.json({ error: "File not found" }, { status: 404 });

    filename = filename + ".tsx";

    const filePath = path.join(
      process.cwd(),
      "src",
      "components",
      "ui",
      ...filename.split("/")
    );

    const fileContents = await fs.readFile(filePath, "utf8");
    return NextResponse.json({ content: fileContents });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
