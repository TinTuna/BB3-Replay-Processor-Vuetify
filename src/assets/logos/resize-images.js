#!/usr/bin/env node

/**
 * Resizes all images in a directory to 256x256
 *
 * Usage:
 *   node resize-images.js [inputDir] [outputDir]
 *
 * Requirements:
 *   npm install sharp
 */

import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, extname } from "path";
import { existsSync } from "fs";

const INPUT_DIR = process.argv[2] || "./";
const OUTPUT_DIR = process.argv[3] || "./resized";
const TARGET_SIZE = 128;

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];

async function resizeImage(inputPath, outputPath) {
  await sharp(inputPath)
    .resize(TARGET_SIZE, TARGET_SIZE, {
      fit: "cover",
      position: "center",
    })
    .toFile(outputPath);
}

async function main() {
  console.log(`Scanning directory: ${INPUT_DIR}`);

  const files = await readdir(INPUT_DIR);
  const imageFiles = files.filter((file) =>
    IMAGE_EXTENSIONS.includes(extname(file).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log("No image files found.");
    return;
  }

  console.log(`Found ${imageFiles.length} images.`);

  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  let processed = 0;
  let failed = 0;

  for (const filename of imageFiles) {
    const inputPath = join(INPUT_DIR, filename);
    const outputPath = join(OUTPUT_DIR, filename);

    try {
      process.stdout.write(`Resizing ${filename}... `);
      await resizeImage(inputPath, outputPath);
      console.log("✓");
      processed++;
    } catch (error) {
      console.log(`✗ ${error.message}`);
      failed++;
    }
  }

  console.log(`\nComplete: ${processed} resized, ${failed} failed.`);
}

main().catch(console.error);
