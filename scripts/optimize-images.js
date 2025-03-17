import { processImages } from '../lib/images.js';

// Run the optimization process
async function main() {
  console.log('Starting image optimization...');
  try {
    await processImages();
    console.log('Image optimization completed successfully!');
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

main();
