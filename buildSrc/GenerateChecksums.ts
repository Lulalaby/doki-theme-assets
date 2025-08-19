import fs from "fs";
import path from "path";
import { assetDirectories, rootDirectory, walkDir, createChecksum } from "./AssetTools";

async function generateChecksums() {
  for (const dir of assetDirectories) {
    const fullDir = path.join(rootDirectory, dir);
    if (!fs.existsSync(fullDir)) continue;
    const files = await walkDir(fullDir);
    for (const file of files) {
      if (file.endsWith('.checksum.txt')) continue;
      const data = fs.readFileSync(file);
      const checksum = createChecksum(data);
      const checksumPath = `${file}.checksum.txt`;
      fs.writeFileSync(checksumPath, checksum, 'utf8');
      console.log(`Checksum written: ${checksumPath}`);
    }
  }
}

generateChecksums().catch(e => {
  console.error('Error generating checksums:', e);
  process.exit(1);
});
