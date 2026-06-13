/* ═══════════════════════════════════════════
   明办拍出所 · 颐和路街拍摄影
   主 JavaScript
   ═══════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════
// 配置
// ═══════════════════════════════════════════

const CONFIG = {
  pricePerPhoto: 20,
  deposit: 20,
  // 摄影师联系方式 - 蟹哥自行替换
  photographerWechat: '',
  photographerPhone: '',
  // 支付二维码图片路径 - 蟹哥替换为自己的收款码
  wechatQR: 'images/wechat-qr.jpg',
  alipayQR: 'images/alipay-qr.jpg',
};

// ═══════════════════════════════════════════
// 作品数据 - 蟹哥自行替换为真实照片
// ═══════════════════════════════════════════

const PHOTOS = [
  // 示例占位，使用 colored placeholders
  // 格式: { id, src, thumb, tag, title }
  // 正式上线时把 images/ 里的照片路径填进去
  { id: 1, src: 'images/placeholder-1.jpg', tag: 'street', title: '颐和路街景' },
  { id: 2, src: 'images/placeholder-2.jpg', tag: 'portrait', title: '街头人像' },
  { id: 3, src: 'images/placeholder-3.jpg', tag: 'vintage', title: '梧桐树下' },
  { id: 4, src: 'images/placeholder-4.jpg', tag: 'street', title: '民国建筑' },
  { id: 5, src: 'images/placeholder-5.jpg', tag: 'portrait', title: '光影之间' },
  { id: 6, src: 'images/placeholder-6.jpg', tag: 'vintage', title: '老街时光' },
];

// ═══════════════════════════════════════════
// DOM 引用
// ═══════════════════════════════════════════

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const splash = $('#splash');
const navbar = $('#navbar');
const footer = $('#footer');
const tabbar = $('#tabbar');
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
const navLinks = $$('.nav-link');
const tabItems = $$('.tab-item');
const pages = $$('.page');
const galleryGrid = $('#galleryGrid');
const galleryEmpty = $('#galleryEmpty');
const bookingForm = $('#bookingForm');
const bookingSuccess = $('#bookingSuccess');
const photoViewer = $('#photoViewer');

// ═══════════════════════════════════════════
// 加载动画
// ═══════════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
  // 设置日期最小值（今天）
  const dateInput = $('#bkDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.classList.add('hidden');
      navbar.classList.remove('hidden');
      footer.classList.remove('hidden');
      tabbar.classList.remove('hidden');
      initGallery();
    }, 600);
  }, 1200);
});

// ═══════════════════════════════════════════
// 页面导航
// ═══════════════════════════════════════════

window.navigateTo = function(page) {
  // 隐藏所有页面
  pages.forEach(p => p.classList.remove('active'));
  // 显示目标页面
  const target = $(`#page-${page}`);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 更新导航状态
  navLinks.forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add('active');

  tabItems.forEach(t => t.classList.remove('active'));
  const activeTab = document.querySelector(`.tab-item[data-tab="${page}"]`);
  if (activeTab) activeTab.classList.add('active');

  // 关闭菜单
  closeNav();
};

// 汉堡菜单
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

function closeNav() {
  navToggle.classList.remove('active');
  navMenu.classList.remove('open');
}

// 导航链接点击
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// Tab 点击
tabItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(item.dataset.tab);
  });
});

// ═══════════════════════════════════════════
// 作品集
// ═══════════════════════════════════════════

function initGallery() {
  if (PHOTOS.length === 0) {
    galleryEmpty.classList.remove('hidden');
    return;
  }
  galleryEmpty.classList.add('hidden');
  renderGallery(PHOTOS);
}

function renderGallery(photos) {
  galleryGrid.innerHTML = '';
  photos.forEach(photo => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.tag = photo.tag;

    // 如果图片不存在，显示彩色占位
    const img = new Image();
    img.onload = () => {
      item.innerHTML = `
        <img src="${photo.src}" alt="${photo.title}" loading="lazy">
        <span class="gallery-tag">${getTagLabel(photo.tag)}</span>
      `;
    };
    img.onerror = () => {
      // 生成彩色占位
      const hue = (photo.id * 60) % 360;
      item.innerHTML = `
        <div style="width:100%;height:100%;background:hsl(${hue}, 30%, 60%);display:flex;align-items:center;justify-content:center;font-size:32px;color:rgba(255,255,255,0.7);">📷</div>
        <span class="gallery-tag">${getTagLabel(photo.tag)}</span>
      `;
    };
    img.src = photo.src;

    item.addEventListener('click', () => {
      openViewer(photo.src);
    });

    galleryGrid.appendChild(item);
  });
}

function getTagLabel(tag) {
  const map = { street: '街景', portrait: '人像', vintage: '复古' };
  return map[tag] || '街拍';
}

// 筛选
$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const items = $$('.gallery-item');
    items.forEach(item => {
      if (filter === 'all' || item.dataset.tag === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// 图片查看器
function openViewer(src) {
  photoViewer.classList.add('open');
  photoViewer.innerHTML = `
    <button class="viewer-close" onclick="closeViewer()">✕</button>
    <img src="${src}" alt="照片">
  `;
}

window.closeViewer = function() {
  photoViewer.classList.remove('open');
};

photoViewer.addEventListener('click', (e) => {
  if (e.target === photoViewer) closeViewer();
});

// ═══════════════════════════════════════════
// 预约表单
// ═══════════════════════════════════════════

// 数量调整
window.adjustCount = function(delta) {
  const input = $('#bkCount');
  let val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 100) val = 100;
  input.value = val;
  updatePricePreview();
};

function updatePricePreview() {
  const count = parseInt($('#bkCount').value) || 1;
  const total = count * CONFIG.pricePerPhoto;
  const balance = Math.max(0, total - CONFIG.deposit);

  $('#previewCount').textContent = count;
  $('#previewTotal').textContent = total;
  $('#previewBalance').textContent = balance;
}

// 表单提交
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = $('#bkName').value.trim();
  const contact = $('#bkContact').value.trim();
  const count = parseInt($('#bkCount').value) || 1;
  const style = document.querySelector('input[name="style"]:checked')?.value || '日系清新';
  const date = $('#bkDate').value;
  const note = $('#bkNote').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked')?.value || 'wechat';
  const total = count * CONFIG.pricePerPhoto;

  // 验证
  if (!name) { alert('请输入你的称呼'); return; }
  if (!contact) { alert('请输入联系方式'); return; }

  // 构造订单信息
  const order = {
    id: 'YH' + Date.now().toString(36).toUpperCase(),
    name, contact, count, style, date: date || '待定',
    note: note || '无',
    total,
    deposit: CONFIG.deposit,
    balance: total - CONFIG.deposit,
    payment,
    createdAt: new Date().toISOString(),
  };

  // 显示成功页
  bookingForm.classList.add('hidden');
  bookingSuccess.classList.remove('hidden');

  // 显示支付信息
  const qrBox = bookingSuccess.querySelector('.qr-box');
  if (payment === 'wechat') {
    bookingSuccess.querySelector('p').textContent = '💚 微信支付';
    if (CONFIG.wechatQR) {
      qrBox.innerHTML = `<img src="${CONFIG.wechatQR}" alt="微信收款码" style="width:100%;height:100%;object-fit:contain;">`;
    } else {
      qrBox.textContent = '微信收款码';
    }
  } else {
    bookingSuccess.querySelector('p').textContent = '💙 支付宝';
    if (CONFIG.alipayQR) {
      qrBox.innerHTML = `<img src="${CONFIG.alipayQR}" alt="支付宝收款码" style="width:100%;height:100%;object-fit:contain;">`;
    } else {
      qrBox.textContent = '支付宝收款码';
    }
  }

  // 将订单信息存入本地 (方便以后查看)
  const orders = JSON.parse(localStorage.getItem('yh_orders') || '[]');
  orders.push(order);
  localStorage.setItem('yh_orders', JSON.stringify(orders));

  console.log('📋 订单已创建:', order);
});

// 重置预约
window.resetBooking = function() {
  bookingForm.reset();
  bookingForm.classList.remove('hidden');
  bookingSuccess.classList.add('hidden');
  $('#bkCount').value = 1;
  updatePricePreview();
  // 日期默认
  const today = new Date().toISOString().split('T')[0];
  $('#bkDate').setAttribute('min', today);
};

// ═══════════════════════════════════════════
// 初始化
// ═══════════════════════════════════════════

updatePricePreview();
