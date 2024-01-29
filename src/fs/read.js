import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const read = async () => {
  const fileName = "fileToRead.txt";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));
  const filePath = path.resolve(currentModulePath, "files", fileName);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    console.log(`Content of ${fileName}:`);
    console.log(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`Error: File ${fileName} does not exist.`);
    } else {
      console.error("Read operation failed:", error);
    }
  }
};

await read();
