import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const decompress = async () => {
  const fileName = "archive.gz";
  const outputFileName = "fileToCompress.txt";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));

  const filePath = path.resolve(currentModulePath, "files", fileName);
  const filePathOutput = path.resolve(
    currentModulePath,
    "files",
    outputFileName
  );

  const readStream = createReadStream(filePath);
  const gunzip = createGunzip();
  const writeStream = createWriteStream(filePathOutput);

  try {
    await pipeline(readStream, gunzip, writeStream);
    console.log("Decompression complete.");
  } catch (error) {
    console.error("Decompression failed:", error);
  }
};

await decompress();
