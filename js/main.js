/* 明办拍出所 · 主 JavaScript - 简化版 */

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

const $ = function(s) { return document.querySelector(s); };
const $$ = function(s) { return document.querySelectorAll(s); };

var selectedPayment = 'wechat';

// 选择支付方式
window.selectPayment = function(pay, el) {
  selectedPayment = pay;
  var opts = document.querySelectorAll('.payment-option');
  for (var i = 0; i < opts.length; i++) { opts[i].classList.remove('active'); }
  if (el) { el.classList.add('active'); }
  showPaymentQR();
};

// 显示收款码
function showPaymentQR() {
  var d = $('#paymentQR');
  if (!d) return;
  if (selectedPayment === 'wechat' && CONFIG.wechatQR) {
    d.innerHTML = '<img src="' + CONFIG.wechatQR + '" alt="微信" style="max-width:180px;border-radius:8px;"><p style="margin-top:8px;font-size:13px;color:#666;">💚 微信扫码支付 ¥20</p>';
  } else if (selectedPayment === 'alipay' && CONFIG.alipayQR) {
    d.innerHTML = '<img src="' + CONFIG.alipayQR + '" alt="支付宝" style="max-width:180px;border-radius:8px;"><p style="margin-top:8px;font-size:13px;color:#666;">💙 支付宝扫码支付 ¥20</p>';
  } else {
    d.innerHTML = '<p style="color:#999;font-size:13px;">👆 选择支付方式</p>';
  }
}

// 页面就绪
window.addEventListener('DOMContentLoaded', function() {
  var di = $('#bkDate');
  if (di) {
    di.setAttribute('min', new Date().toISOString().split('T')[0]);
  }
  setTimeout(function() {
    var sp = $('#splash');
    sp.classList.add('fade-out');
    setTimeout(function() {
      sp.classList.add('hidden');
      $('#navbar').classList.remove('hidden');
      $('#footer').classList.remove('hidden');
      $('#tabbar').classList.remove('hidden');
      initGallery();
      showPaymentQR();
    }, 600);
  }, 1200);
});

// 页面导航
window.navigateTo = function(page) {
  var allPages = $$('.page');
  for (var i = 0; i < allPages.length; i++) { allPages[i].classList.remove('active'); }
  var target = $('#page-' + page);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
  var links = $$('.nav-link');
  for (var i = 0; i < links.length; i++) { links[i].classList.remove('active'); }
  var al = document.querySelector('.nav-link[data-page="' + page + '"]');
  if (al) al.classList.add('active');
  var tabs = $$('.tab-item');
  for (var i = 0; i < tabs.length; i++) { tabs[i].classList.remove('active'); }
  var at = document.querySelector('.tab-item[data-tab="' + page + '"]');
  if (at) at.classList.add('active');
  closeNav();
};

function closeNav() {
  $('#navToggle').classList.remove('active');
  $('#navMenu').classList.remove('open');
}

$('#navToggle').addEventListener('click', function() {
  this.classList.toggle('active');
  $('#navMenu').classList.toggle('open');
});

// 导航点击
var navLinks = $$('.nav-link');
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function(e) {
    e.preventDefault();
    navigateTo(this.getAttribute('data-page'));
  });
}

var tabItems = $$('.tab-item');
for (var i = 0; i < tabItems.length; i++) {
  tabItems[i].addEventListener('click', function(e) {
    e.preventDefault();
    navigateTo(this.getAttribute('data-tab'));
  });
}

// 作品集
function initGallery() {
  if (PHOTOS.length === 0) {
    $('#galleryEmpty').classList.remove('hidden');
    return;
  }
  $('#galleryEmpty').classList.add('hidden');
  renderGallery(PHOTOS);
}

function renderGallery(photos) {
  var grid = $('#galleryGrid');
  grid.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    var p = photos[i];
    var item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-tag', p.tag);
    var img = new Image();
    img.onload = function(p, item) {
      return function() {
        item.innerHTML = '<img src="' + p.src + '" alt="' + p.title + '" loading="lazy"><span class="gallery-tag">' + tagLabel(p.tag) + '</span>';
      };
    }(p, item);
    img.onerror = function(p, item) {
      return function() {
        var hue = (p.id * 60) % 360;
        item.innerHTML = '<div style="width:100%;height:100%;background:hsl(' + hue + ',30%,60%);display:flex;align-items:center;justify-content:center;font-size:32px;color:rgba(255,255,255,0.7);">📷</div><span class="gallery-tag">' + tagLabel(p.tag) + '</span>';
      };
    }(p, item);
    img.src = p.src;
    item.addEventListener('click', function(src) {
      return function() { openViewer(src); };
    }(p.src));
    grid.appendChild(item);
  }
}

function tagLabel(tag) {
  if (tag === 'street') return '街景';
  if (tag === 'portrait') return '人像';
  if (tag === 'vintage') return '复古';
  return '街拍';
}

// 分类筛选
var filterBtns = $$('.filter-btn');
for (var i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener('click', function() {
    var allBtns = $$('.filter-btn');
    for (var j = 0; j < allBtns.length; j++) { allBtns[j].classList.remove('active'); }
    this.classList.add('active');
    var f = this.getAttribute('data-filter');
    var items = $$('.gallery-item');
    for (var k = 0; k < items.length; k++) {
      items[k].style.display = (f === 'all' || items[k].getAttribute('data-tag') === f) ? '' : 'none';
    }
  });
}

// 图片查看
function openViewer(src) {
  var v = $('#photoViewer');
  v.classList.add('open');
  v.innerHTML = '<button class="viewer-close" onclick="closeViewer()">✕</button><img src="' + src + '">';
}

window.closeViewer = function() {
  $('#photoViewer').classList.remove('open');
};

$('#photoViewer').addEventListener('click', function(e) {
  if (e.target === this) closeViewer();
});

// 数量调整
window.adjustCount = function(delta) {
  var input = $('#bkCount');
  var val = parseInt(input.value) + delta;
  if (val < 1) val = 1;
  if (val > 100) val = 100;
  input.value = val;
  updatePrice();
};

function updatePrice() {
  var count = parseInt($('#bkCount').value) || 1;
  var total = count * 20;
  var balance = Math.max(0, total - 20);
  $('#previewCount').textContent = count;
  $('#previewTotal').textContent = total;
  $('#previewBalance').textContent = balance;
}

// 提交预约
$('#bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var name = $('#bkName').value.trim();
  var contact = $('#bkContact').value.trim();
  var count = parseInt($('#bkCount').value) || 1;
  var styleEl = document.querySelector('input[name="style"]:checked');
  var style = styleEl ? styleEl.value : '日系清新';
  var date = $('#bkDate').value;
  var note = $('#bkNote').value.trim();
  var payment = selectedPayment || 'wechat';
  var total = count * 20;
  if (!name) { alert('请输入称呼'); return; }
  if (!contact) { alert('请输入联系方式'); return; }
  var order = {
    id: 'YH' + Date.now().toString(36).toUpperCase(),
    name: name, contact: contact, count: count, style: style,
    date: date || '待定', note: note || '无',
    total: total, deposit: 20, balance: total - 20,
    payment: payment, createdAt: new Date().toISOString()
  };
  this.classList.add('hidden');
  $('#bookingSuccess').classList.remove('hidden');
  var qrBox = $('#bookingSuccess').querySelector('.qr-box');
  if (payment === 'wechat' && CONFIG.wechatQR) {
    $('#bookingSuccess').querySelector('p').textContent = '💚 微信支付';
    qrBox.innerHTML = '<img src="' + CONFIG.wechatQR + '" style="width:100%;height:100%;object-fit:contain;">';
  } else if (CONFIG.alipayQR) {
    $('#bookingSuccess').querySelector('p').textContent = '💙 支付宝';
    qrBox.innerHTML = '<img src="' + CONFIG.alipayQR + '" style="width:100%;height:100%;object-fit:contain;">';
  }
  var orders = JSON.parse(localStorage.getItem('yh_orders') || '[]');
  orders.push(order);
  localStorage.setItem('yh_orders', JSON.stringify(orders));
});

window.resetBooking = function() {
  $('#bookingForm').reset();
  $('#bookingForm').classList.remove('hidden');
  $('#bookingSuccess').classList.add('hidden');
  $('#bkCount').value = 1;
  updatePrice();
};

updatePrice();
