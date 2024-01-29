import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const list = async () => {
  const currentModulePath = dirname(fileURLToPath(import.meta.url));
  const folderPath = path.resolve(currentModulePath, "files");

  try {
    const files = await fs.readdir(folderPath);
    console.log('Files in the "files" folder:');
    files.forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error('Error: "files" folder does not exist.');
    } else {
      console.error("List operation failed:", error);
    }
  }
};

await list();
