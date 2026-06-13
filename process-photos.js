const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = 'C:/Users/34855/Desktop/颐和路001';
const THUMB_DIR = 'C:/Users/34855/Desktop/yihelu-photo/images/thumbs';
const FULL_DIR = 'C:/Users/34855/Desktop/yihelu-photo/images/photos';

// Ensure output directories
[THUMB_DIR, FULL_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Style categories mapped by filename patterns
function getCategory(filename) {
  const name = filename.toUpperCase();
  // Assign categories based on content patterns (user can adjust later)
  // For now, distribute evenly for demo
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const cats = ['portrait', 'street', 'vintage'];
  return cats[hash % cats.length];
}

// Human-readable title from filename
function getTitle(filename) {
  return filename.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s*-\s*副本$/, '');
}

async function processPhotos() {
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();

  console.log(`Found ${files.length} photos`);

  const photos = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const srcPath = path.join(SOURCE_DIR, file);
    const baseName = path.parse(file).name;
    const thumbPath = path.join(THUMB_DIR, `${baseName}.jpg`);
    const fullPath = path.join(FULL_DIR, `${baseName}.jpg`);

    try {
      // Generate thumbnail (400px wide, good quality)
      await sharp(srcPath)
        .resize(400, 600, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 82 })
        .toFile(thumbPath);

      // Generate web-optimized full version (1200px wide max)
      await sharp(srcPath)
        .resize(1200, 1800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 88 })
        .toFile(fullPath);

      const category = getCategory(file);
      const title = getTitle(file);

      photos.push({
        id: i + 1,
        src: `images/photos/${baseName}.jpg`,
        thumb: `images/thumbs/${baseName}.jpg`,
        title: title,
        category: category,
        tags: [category]
      });

      console.log(`[${i + 1}/${files.length}] ✓ ${file} → ${category}`);
    } catch (err) {
      console.error(`[${i + 1}/${files.length}] ✗ ${file}: ${err.message}`);
    }
  }

  // Write photo data as JSON for the build script
  const dataPath = 'C:/Users/34855/Desktop/yihelu-photo/photo-data.json';
  fs.writeFileSync(dataPath, JSON.stringify(photos, null, 2), 'utf8');
  console.log(`\n✅ Done! ${photos.length} photos processed.`);
  console.log(`   Thumbnails: ${THUMB_DIR}`);
  console.log(`   Full images: ${FULL_DIR}`);
  console.log(`   Data file: ${dataPath}`);
}

processPhotos().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
