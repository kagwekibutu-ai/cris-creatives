import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/work");
const files = readdirSync(dir).filter((f) => [".png", ".jpg", ".jpeg"].includes(path.extname(f).toLowerCase()));

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const src = path.join(dir, file);
  const out = path.join(dir, file.slice(0, -ext.length) + ".webp");
  await sharp(src)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out + ".tmp");
  renameSync(out + ".tmp", out);
  const before = statSync(src).size;
  const after = statSync(out).size;
  unlinkSync(src);
  console.log(`${file} -> ${path.basename(out)}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
}

const total = readdirSync(dir).reduce((s, f) => s + statSync(path.join(dir, f)).size, 0);
console.log(`TOTAL: ${(total / 1024 / 1024).toFixed(1)} MB across ${readdirSync(dir).length} files`);
