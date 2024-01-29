import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream/promises";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const compress = async () => {
  const fileName = "fileToCompress.txt";
  const outputFileName = "archive.gz";

  const currentModulePath = dirname(fileURLToPath(import.meta.url));

  const filePath = path.resolve(currentModulePath, "files", fileName);
  const filePathOutput = path.resolve(
    currentModulePath,
    "files",
    outputFileName
  );

  const readStream = createReadStream(filePath);
  const gzip = createGzip();
  const writeStream = createWriteStream(filePathOutput);

  try {
    await pipeline(readStream, gzip, writeStream);
    console.log("Compression complete.");
  } catch (error) {
    console.error("Compression failed:", error);
  }
};

await compress();
