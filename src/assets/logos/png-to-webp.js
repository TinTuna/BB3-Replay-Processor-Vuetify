#!/usr/bin/env node

/**
 * Converts all PNG images in a directory to WebP format
 * 
 * Usage:
 *   node png-to-webp.js [inputDir] [outputDir] [quality]
 * 
 * Requirements:
 *   npm install sharp
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = process.argv[2] || './';
const OUTPUT_DIR = process.argv[3] || './webp';
const QUALITY = parseInt(process.argv[4]) || 80;

async function convertToWebP(inputPath, outputPath, quality) {
  await sharp(inputPath)
    .webp({ quality, lossless: false })
    .toFile(outputPath);
}

async function main() {
  console.log(`Scanning directory: ${INPUT_DIR}`);
  console.log(`WebP quality: ${QUALITY}`);
  
  const files = await readdir(INPUT_DIR);
  const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
  
  if (pngFiles.length === 0) {
    console.log('No PNG files found.');
    return;
  }
  
  console.log(`Found ${pngFiles.length} PNG images.`);
  
  // Create output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }
  
  let converted = 0;
  let failed = 0;
  
  for (const filename of pngFiles) {
    const inputPath = join(INPUT_DIR, filename);
    const parsedName = parse(filename);
    const outputFilename = `${parsedName.name}.webp`;
    const outputPath = join(OUTPUT_DIR, outputFilename);
    
    try {
      process.stdout.write(`Converting ${filename} → ${outputFilename}... `);
      await convertToWebP(inputPath, outputPath, QUALITY);
      console.log('✓');
      converted++;
    } catch (error) {
      console.log(`✗ ${error.message}`);
      failed++;
    }
  }
  
  console.log(`\nComplete: ${converted} converted, ${failed} failed.`);
}

main().catch(console.error);
