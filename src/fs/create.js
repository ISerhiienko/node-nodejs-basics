import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const create = async () => {
  const fileName = "fresh.txt";
  const content = "I am fresh and young";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));

  const filePath = path.resolve(currentModulePath, "files", fileName);

  try {
    await fs.writeFile(filePath, content, { flag: "wx" });
    console.log("Create operation complete.");
  } catch (error) {
    if (error.code === "EEXIST") {
      console.error("Error: File already exists.");
    } else {
      console.error("Create operation failed:", error);
    }
  }
};

await create();
