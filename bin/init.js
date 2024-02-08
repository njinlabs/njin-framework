// copyFolder.mjs
import fs from "fs";
import path from "path";

async function copyFolderAsync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = await fs.promises.readdir(source);

  for (const file of files) {
    if (file === "bin") {
      continue;
    }

    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    const stats = await fs.promises.stat(sourcePath);
    if (stats.isDirectory()) {
      await copyFolderAsync(sourcePath, targetPath);
    } else {
      await fs.promises.copyFile(sourcePath, targetPath);
    }
  }
}

export function install(argv) {
  const sourceFolder = path.resolve();
  const targetFolder = path.resolve("../", argv[2]);

  copyFolderAsync(sourceFolder, targetFolder)
    .then(() => {
      console.log("Install successfully");
    })
    .catch((e) => {
      console.log(e);
    });
}
