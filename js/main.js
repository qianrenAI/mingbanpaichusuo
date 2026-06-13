'use strict';

const CONFIG = {
  pricePerPhoto: 20,
  deposit: 20,
  photographerWechat: '',
  photographerPhone: '',
  wechatQR: 'images/wechat-qr.jpg',
  alipayQR: 'images/alipay-qr.jpg',
};

const PHOTOS = [
  { id: 1, src: 'images/placeholder-1.jpg', tag: 'street', title: '颐和路街景' },
  { id: 2, src: 'images/placeholder-2.jpg', tag: 'portrait', title: '街头人像' },
  { id: 3, src: 'images/placeholder-3.jpg', tag: 'vintage', title: '梧桐树下' },
  { id: 4, src: 'images/placeholder-4.jpg', tag: 'street', title: '民国建筑' },
  { id: 5, src: 'images/placeholder-5.jpg', tag: 'portrait', title: '光影之间' },
  { id: 6, src: 'images/placeholder-6.jpg', tag: 'vintage', title: '老街时光' },
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

var selectedPayment = 'wechat';

window.selectPayment = function(pay) {
  selectedPayment = pay;
  document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
  var t = event && event.currentTarget;
  if (t) t.classList.add('active');
  showPaymentQR();
};

function showPaymentQR() {
  var p = selectedPayment || 'wechat';
  var d = $('#paymentQR');
  try {
    if (p === 'wechat' && CONFIG.wechatQR) {
      d.innerHTML = '<img src="' + CONFIG.wechatQR + '" style="max-width:180px;border-radius:8px;"><p style="margin-top:8px;font-size:13px;color:#666;">💚 微信扫码支付 ¥20</p>';
    } else if (p === 'alipay' && CONFIG.alipayQR) {
      d.innerHTML = '<img src="' + CONFIG.alipayQR + '" style="max-width:180px;border-radius:8px;"><p style="margin-top:8px;font-size:13px;color:#666;">💙 支付宝扫码支付 ¥20</p>';
    } else {
      d.innerHTML = '<p style="color:#999;font-size:13px;">👆 选择支付方式</p>';
    }
  } catch(e) { d.innerHTML = '<p style="color:#999;">请提交预约</p>'; }
}

// 导航
const splash = $('#splash'), navbar = $('#navbar'), footer = $('#footer'), tabbar = $('#tabbar');
const navToggle = $('#navToggle'), navMenu = $('#navMenu'), photoViewer = $('#photoViewer');
const galleryGrid = $('#galleryGrid'), galleryEmpty = $('#galleryEmpty');
const bookingForm = $('#bookingForm'), bookingSuccess = $('#bookingSuccess');

window.addEventListener('DOMContentLoaded', () => {
  var d = $('#bkDate');
  if (d) d.setAttribute('min', new Date().toISOString().split('T')[0]);
  setTimeout(() => {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.classList.add('hidden');
      navbar.classList.remove('hidden');
      footer.classList.remove('hidden');
      tabbar.classList.remove('hidden');
      initGallery();
      showPaymentQR();
    }, 600);
  }, 1200);
});

window.navigateTo = function(p) {
  pages.forEach(el => el.classList.remove('active'));
  var t = $('#page-' + p);
  if (t) { t.classList.add('active'); window.scrollTo(0,0); }
  document.querySelectorAll('.nav-link, .tab-item').forEach(el => el.classList.remove('active'));
  var a = document.querySelector('.nav-link[data-page="' + p + '"]');
  if (a) a.classList.add('active');
  var b = document.querySelector('.tab-item[data-tab="' + p + '"]');
  if (b) b.classList.add('active');
  closeNav();
};

function closeNav() { navToggle.classList.remove('active'); navMenu.classList.remove('open'); }
navToggle.addEventListener('click', () => { navToggle.classList.toggle('active'); navMenu.classList.toggle('open'); });
document.querySelectorAll('.nav-link, .tab-item').forEach(el => {
  el.addEventListener('click', function(e) { e.preventDefault(); navigateTo(this.dataset.page || this.dataset.tab); });
});

function initGallery() { galleryEmpty.classList.add('hidden'); renderGallery(PHOTOS); }

function renderGallery(photos) {
  galleryGrid.innerHTML = '';
  photos.forEach(p => {
    var item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.tag = p.tag;
    var img = new Image();
    img.onload = function() { item.innerHTML = '<img src="' + p.src + '" loading="lazy"><span class="gallery-tag">' + ({street:'街景',portrait:'人像',vintage:'复古'}[p.tag]||'街拍') + '</span>'; };
    img.onerror = function() { item.innerHTML = '<div style="width:100%;height:100%;background:hsl(' + ((p.id*60)%360) + ',30%,60%);display:flex;align-items:center;justify-content:center;font-size:32px;color:rgba(255,255,255,0.7);">📷</div><span class="gallery-tag">' + ({street:'街景',portrait:'人像',vintage:'复古'}[p.tag]||'街拍') + '</span>'; };
    img.src = p.src;
    item.addEventListener('click', function() { openViewer(p.src); });
    galleryGrid.appendChild(item);
  });
}

document.querySelectorAll('.filter-btn').forEach(function(b) {
  b.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(x) { x.classList.remove('active'); });
    this.classList.add('active');
    var f = this.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(function(x) { x.style.display = (f === 'all' || x.dataset.tag === f) ? '' : 'none'; });
  });
});

function openViewer(src) { photoViewer.classList.add('open'); photoViewer.innerHTML = '<button class="viewer-close" onclick="closeViewer()">✕</button><img src="' + src + '">'; }
window.closeViewer = function() { photoViewer.classList.remove('open'); };
photoViewer.addEventListener('click', function(e) { if (e.target === photoViewer) closeViewer(); });

window.adjustCount = function(d) { var i = $('#bkCount'); var v = parseInt(i.value) + d; if (v < 1) v = 1; if (v > 100) v = 100; i.value = v; updatePrice(); };
function updatePrice() { var c = parseInt($('#bkCount').value) || 1; var t = c * 20; $('#previewCount').textContent = c; $('#previewTotal').textContent = t; $('#previewBalance').textContent = Math.max(0, t - 20); }

bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();
  var n = $('#bkName').value.trim(), c = $('#bkContact').value.trim(), cnt = parseInt($('#bkCount').value) || 1;
  var s = document.querySelector('input[name="style"]:checked')?.value || '日系清新';
  var d = $('#bkDate').value, nt = $('#bkNote').value.trim(), pay = selectedPayment || 'wechat';
  if (!n) { alert('请输入称呼'); return; }
  if (!c) { alert('请输入联系方式'); return; }
  var order = { id: 'YH' + Date.now().toString(36).toUpperCase(), name: n, contact: c, count: cnt, style: s, date: d || '待定', note: nt || '无', total: cnt * 20, deposit: 20, balance: cnt * 20 - 20, payment: pay, createdAt: new Date().toISOString() };
  bookingForm.classList.add('hidden');
  bookingSuccess.classList.remove('hidden');
  var qr = bookingSuccess.querySelector('.qr-box');
  if (pay === 'wechat' && CONFIG.wechatQR) { bookingSuccess.querySelector('p').textContent = '💚 微信支付'; qr.innerHTML = '<img src="' + CONFIG.wechatQR + '" style="width:100%;height:100%;object-fit:contain;">'; }
  else if (CONFIG.alipayQR) { bookingSuccess.querySelector('p').textContent = '💙 支付宝'; qr.innerHTML = '<img src="' + CONFIG.alipayQR + '" style="width:100%;height:100%;object-fit:contain;">'; }
  else { qr.textContent = '收款码'; }
  var orders = JSON.parse(localStorage.getItem('yh_orders') || '[]');
  orders.push(order);
  localStorage.setItem('yh_orders', JSON.stringify(orders));
});

window.resetBooking = function() { bookingForm.reset(); bookingForm.classList.remove('hidden'); bookingSuccess.classList.add('hidden'); $('#bkCount').value = 1; updatePrice(); };

updatePrice();
