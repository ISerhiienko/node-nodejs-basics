import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
};

const rename = async () => {
  const fileName = "wrongFilename.txt";
  const fileNameChanged = "properFilename.md";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));

  const sourceFilePath = path.resolve(currentModulePath, "files", fileName);
  const targetFilePath = path.resolve(
    currentModulePath,
    "files",
    fileNameChanged
  );

  try {
    if (
      (await fileExists(sourceFilePath)) &&
      !(await fileExists(targetFilePath))
    ) {
      await fs.rename(sourceFilePath, targetFilePath);
      console.log("Rename operation complete.");
    } else {
      throw new Error(
        "Error: Target file already exists or source file does not exist."
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};

await rename();
