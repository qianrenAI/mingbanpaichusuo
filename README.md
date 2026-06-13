# 明办拍出所 · 颐和路街拍摄影

南京颐和路街拍预约小程序。

## 功能

- 📷 作品集展示（支持筛选）
- 💰 定价说明（20元/张，定金20元）
- 📋 服务说明
- 📞 预约下单（含定金支付引导）
- 📱 抖音引流入口

## 技术栈

纯 HTML + CSS + JavaScript，移动端优先，零依赖。

## 部署

### Vercel（推荐）
```bash
npm i -g vercel
cd yihelu-photo
vercel --prod
```

### 手动上传
直接把 `yihelu-photo` 文件夹拖到 Vercel / Netlify / GitHub Pages 即可。

## 使用说明

### 第一步：替换自己的照片
1. 将真实照片放入 `images/` 目录
2. 修改 `js/main.js` 中的 `PHOTOS` 数组

### 第二步：替换支付二维码
1. 把自己的微信/支付宝收款码放入 `images/` 目录
2. 修改 `js/main.js` 中的 `CONFIG` 配置

### 第三步：自定义域名（可选）
在 Vercel 项目设置中添加自定义域名。

## 文件结构
```
yihelu-photo/
├── index.html       # 主页面
├── vercel.json      # Vercel 部署配置
├── css/
│   └── style.css    # 样式
├── js/
│   └── main.js      # 逻辑
├── logos/           # LOGO SVG 源文件
│   ├── logo1-seal.svg   # 经典印章风
│   ├── logo2-modern.svg # 现代简约风
│   └── logo3-retro.svg  # 复古招牌风
└── images/          # 照片目录
```
