import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const remove = async () => {
  const fileName = "fileToRemove.txt";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(currentModulePath, "files", fileName);

  try {
    await fs.unlink(filePath);
    console.log("Delete operation complete.");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Error: File does not exist.");
    } else {
      console.error("Delete operation failed:", error);
    }
  }
};

await remove();
