import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function optimizeImage(
  inputPath,
  outputPath,
  options = {
    width: 800,
    quality: 80,
  }
) {
  await sharp(inputPath)
    .resize(options.width, null, {
      withoutEnlargement: true,
    })
    .webp({ quality: options.quality })
    .toFile(outputPath);
}

export async function processImages() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const optimizedDir = path.join(process.cwd(), 'public/images/optimized');

  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  // Process all images
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(
        optimizedDir,
        `${path.parse(file).name}.webp`
      );

      await optimizeImage(inputPath, outputPath);
    }
  }
}