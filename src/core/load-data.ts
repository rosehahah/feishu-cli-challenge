import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { OrgProjectData } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadDemoData(customPath?: string): Promise<OrgProjectData> {
  const defaultPath = path.resolve(
    __dirname,
    "../../examples/demo-data/sample-org-project.json",
  );
  const targetPath = customPath ? path.resolve(process.cwd(), customPath) : defaultPath;
  const raw = await readFile(targetPath, "utf8");
  return JSON.parse(raw) as OrgProjectData;
}
