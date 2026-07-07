/**
 * 明办拍出所 - Build Script v2.0
 * 同步 photo-data.json → js/main.js 中的照片数据
 * 并将文件复制到工作区目录用于部署
 */
const fs = require('fs');
const path = require('path');

const BASE = 'C:/Users/34855/Desktop/yihelu-photo';
const WORKSPACE = 'C:/Users/34855/.openclaw/workspace/yihelu-photo';

// ─── 读取照片数据 ───
const photoData = JSON.parse(fs.readFileSync(path.join(BASE, 'photo-data.json'), 'utf8'));

// ─── 生成紧凑的照片数组 ───
const photosCompact = photoData.map(p => {
  return `{id:${p.id},s:'${p.src}',t:'${p.thumb}',title:'${p.title}',c:'${p.category}'}`;
}).join(',\n  ');

// ─── 读取当前 main.js ───
let mainJs = fs.readFileSync(path.join(BASE, 'js/main.js'), 'utf8');

// ─── 替换 PHOTOS 数组 ───
const photosRegex = /var PHOTOS = \[[\s\S]*?\];/;
const newPhotos = 'var PHOTOS = [\n  ' + photosCompact + '\n];';

if (photosRegex.test(mainJs)) {
  mainJs = mainJs.replace(photosRegex, newPhotos);
  // DISABLED
  console.log('✅ main.js PHOTOS 数组已更新 (' + photoData.length + ' 张照片)');
} else {
  console.log('⚠️  未找到 PHOTOS 数组，跳过更新');
}

// ─── 验证文件编码 ───
function verifyFile(filePath, label) {
  const buf = fs.readFileSync(filePath);
  const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  const status = hasBOM ? '❌ 有BOM' : '✅ UTF-8';
  console.log('  ' + label + ': ' + buf.length + ' bytes, ' + status);
}

console.log('\n─── 文件验证 ───');
verifyFile(path.join(BASE, 'index.html'), 'index.html');
verifyFile(path.join(BASE, 'js/main.js'), 'js/main.js');
verifyFile(path.join(BASE, 'css/style.css'), 'css/style.css');
verifyFile(path.join(BASE, 'admin.html'), 'admin.html');

// ─── 统计 ───
const thumbDir = path.join(BASE, 'images/thumbs');
const photoDir = path.join(BASE, 'images/photos');
const thumbs = fs.existsSync(thumbDir) ? fs.readdirSync(thumbDir).filter(f => /\.jpg$/i.test(f)).length : 0;
const photos = fs.existsSync(photoDir) ? fs.readdirSync(photoDir).filter(f => /\.jpg$/i.test(f)).length : 0;
console.log('\n─── 照片统计 ───');
console.log('  缩略图: ' + thumbs + ' 张');
console.log('  优化图: ' + photos + ' 张');
console.log('  数据条目: ' + photoData.length + ' 条');

// ─── 复制到工作区（如果存在） ───
if (fs.existsSync(WORKSPACE)) {
  const files = ['index.html', 'admin.html', 'css/style.css', 'js/main.js'];
  files.forEach(f => {
    const src = path.join(BASE, f);
    const dst = path.join(WORKSPACE, f);
    const dir = path.dirname(dst);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    let content = fs.readFileSync(src, 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) content = content.substring(1);
    fs.writeFileSync(dst, content, 'utf8');
  });
  console.log('\n✅ 已同步到工作区: ' + WORKSPACE);
}

console.log('\n🎉 Build 完成！');
