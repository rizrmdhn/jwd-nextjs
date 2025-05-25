import fs from "fs";
import { type NextRequest } from "next/server";
import getCurrentSession from "@/server/auth/sessions";
import { findFile } from "@/server/storage/find-file";

export async function GET(req: NextRequest) {
  const { session } = await getCurrentSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const rootDir = process.cwd();

  // pop url to get the file name and the uploads folder
  const url = req.url;
  const urlArr = url.split("/");
  const fileName = urlArr.pop();
  const uploads = urlArr.pop();

  if (!fileName || !uploads) {
    return new Response("Invalid URL", { status: 400 });
  }

  try {
    await findFile(uploads, fileName);

    const file = fs.readFileSync(
      `${rootDir}/public/uploads/${uploads}/${fileName}`,
    );

    if (!file) {
      return new Response("File not found", { status: 404 });
    }

    return new Response(file, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 404 });
    }

    return new Response("An error occurred", { status: 500 });
  }
}
