import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const copy = async () => {
  const currentModulePath = dirname(fileURLToPath(import.meta.url));

  const sourceFolder = path.resolve(currentModulePath, "files");
  const targetFolder = path.resolve(currentModulePath, "files_copy");

  try {
    await fs.access(sourceFolder);
    await fs.access(targetFolder);

    console.error("Error: Target folder already exists.");
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await fs.mkdir(targetFolder);
        const files = await fs.readdir(sourceFolder);

        for (const file of files) {
          const sourceFilePath = path.join(sourceFolder, file);
          const targetFilePath = path.join(targetFolder, file);

          await fs.copyFile(sourceFilePath, targetFilePath);
        }

        console.log("Copy operation complete.");
      } catch (copyError) {
        console.error("Copy operation failed:", copyError);
      }
    } else {
      console.error("Error accessing folders:", error);
    }
  }
};

await copy();
