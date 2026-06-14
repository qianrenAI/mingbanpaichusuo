/* ═══════════════════════════════════════════════════════════════
   明办拍出所 · 颐和路街拍摄影
   v2.0 — 真实照片 · 智能筛选 · 订单系统 · 图片查看器
   ═══════════════════════════════════════════════════════════════ */

// ─── 配置 ───
var CONFIG = {
  pricePerPhoto: 20,
  deposit: 20,
  alipayLink: 'https://qr.alipay.com/fkx16352ttjqubrzxzhrjce'
};

// ─── 作品照片数据 ───
var PHOTOS = [
  {id:1,s:'images/photos/DSC_0854.jpg',t:'images/thumbs/DSC_0854.jpg',title:'DSC 0854',c:'close'},
  {id:2,s:'images/photos/DSC_2708.jpg',t:'images/thumbs/DSC_2708.jpg',title:'DSC 2708',c:'close'},
  {id:3,s:'images/photos/DSC_2719.jpg',t:'images/thumbs/DSC_2719.jpg',title:'DSC 2719',c:'close'},
  {id:4,s:'images/photos/DSC_4223.jpg',t:'images/thumbs/DSC_4223.jpg',title:'DSC 4223',c:'close'},
  {id:5,s:'images/photos/DSC_4497 - 副本.jpg',t:'images/thumbs/DSC_4497 - 副本.jpg',title:'DSC 4497   副本',c:'distant'},
  {id:6,s:'images/photos/IMG_6837.jpg',t:'images/thumbs/IMG_6837.jpg',title:'IMG 6837',c:'distant'},
  {id:7,s:'images/photos/IMG_6838.jpg',t:'images/thumbs/IMG_6838.jpg',title:'IMG 6838',c:'distant'},
  {id:8,s:'images/photos/IMG_6840 - 副本.jpg',t:'images/thumbs/IMG_6840 - 副本.jpg',title:'IMG 6840   副本',c:'distant'},
  {id:9,s:'images/photos/IMG_6840.jpg',t:'images/thumbs/IMG_6840.jpg',title:'IMG 6840',c:'distant'},
  {id:10,s:'images/photos/IMG_6927.jpg',t:'images/thumbs/IMG_6927.jpg',title:'IMG 6927',c:'distant'},
  {id:11,s:'images/photos/IMG_7023.jpg',t:'images/thumbs/IMG_7023.jpg',title:'IMG 7023',c:'distant'},
  {id:12,s:'images/photos/IMG_7066.jpg',t:'images/thumbs/IMG_7066.jpg',title:'IMG 7066',c:'distant'},
  {id:13,s:'images/photos/IMG_7082.jpg',t:'images/thumbs/IMG_7082.jpg',title:'IMG 7082',c:'close'},
  {id:14,s:'images/photos/IMG_7083.jpg',t:'images/thumbs/IMG_7083.jpg',title:'IMG 7083',c:'close'},
  {id:15,s:'images/photos/IMG_9044.jpg',t:'images/thumbs/IMG_9044.jpg',title:'IMG 9044',c:'close'},
  {id:16,s:'images/photos/NIU_1037.jpg',t:'images/thumbs/NIU_1037.jpg',title:'NIU 1037',c:'distant'},
  {id:17,s:'images/photos/NIU_2161.jpg',t:'images/thumbs/NIU_2161.jpg',title:'NIU 2161',c:'distant'},
  {id:18,s:'images/photos/NIU_2180.jpg',t:'images/thumbs/NIU_2180.jpg',title:'NIU 2180',c:'distant'},
  {id:19,s:'images/photos/NIU_2212.jpg',t:'images/thumbs/NIU_2212.jpg',title:'NIU 2212',c:'close'},
  {id:20,s:'images/photos/NIU_2253.jpg',t:'images/thumbs/NIU_2253.jpg',title:'NIU 2253',c:'close'},
  {id:21,s:'images/photos/NIU_2460.jpg',t:'images/thumbs/NIU_2460.jpg',title:'NIU 2460',c:'close'},
  {id:22,s:'images/photos/NIU_2468.jpg',t:'images/thumbs/NIU_2468.jpg',title:'NIU 2468',c:'distant'},
  {id:23,s:'images/photos/NIU_2496.jpg',t:'images/thumbs/NIU_2496.jpg',title:'NIU 2496',c:'distant'},
  {id:24,s:'images/photos/NIU_2781.jpg',t:'images/thumbs/NIU_2781.jpg',title:'NIU 2781',c:'close'},
  {id:25,s:'images/photos/NIU_2792.jpg',t:'images/thumbs/NIU_2792.jpg',title:'NIU 2792',c:'close'},
  {id:26,s:'images/photos/NIU_3558.jpg',t:'images/thumbs/NIU_3558.jpg',title:'NIU 3558',c:'close'},
  {id:27,s:'images/photos/NIU_3616.jpg',t:'images/thumbs/NIU_3616.jpg',title:'NIU 3616',c:'close'},
  {id:28,s:'images/photos/NIU_3625.jpg',t:'images/thumbs/NIU_3625.jpg',title:'NIU 3625',c:'close'},
  {id:29,s:'images/photos/NIU_3630.jpg',t:'images/thumbs/NIU_3630.jpg',title:'NIU 3630',c:'close'},
  {id:30,s:'images/photos/NIU_3638.jpg',t:'images/thumbs/NIU_3638.jpg',title:'NIU 3638',c:'close'},
  {id:31,s:'images/photos/NIU_3643.jpg',t:'images/thumbs/NIU_3643.jpg',title:'NIU 3643',c:'close'},
  {id:32,s:'images/photos/NIU_3657.jpg',t:'images/thumbs/NIU_3657.jpg',title:'NIU 3657',c:'close'},
  {id:33,s:'images/photos/NIU_3672.jpg',t:'images/thumbs/NIU_3672.jpg',title:'NIU 3672',c:'distant'},
  {id:34,s:'images/photos/NIU_3695.jpg',t:'images/thumbs/NIU_3695.jpg',title:'NIU 3695',c:'close'},
  {id:35,s:'images/photos/NIU_3705.jpg',t:'images/thumbs/NIU_3705.jpg',title:'NIU 3705',c:'close'},
  {id:36,s:'images/photos/NIU_3920.jpg',t:'images/thumbs/NIU_3920.jpg',title:'NIU 3920',c:'close'},
  {id:37,s:'images/photos/NIU_4468.jpg',t:'images/thumbs/NIU_4468.jpg',title:'NIU 4468',c:'distant'},
  {id:38,s:'images/photos/NIU_4527.jpg',t:'images/thumbs/NIU_4527.jpg',title:'NIU 4527',c:'close'},
  {id:39,s:'images/photos/NIU_4567.jpg',t:'images/thumbs/NIU_4567.jpg',title:'NIU 4567',c:'distant'},
  {id:40,s:'images/photos/NIU_4880.jpg',t:'images/thumbs/NIU_4880.jpg',title:'NIU 4880',c:'close'},
  {id:41,s:'images/photos/NIU_5748.jpg',t:'images/thumbs/NIU_5748.jpg',title:'NIU 5748',c:'close'},
  {id:42,s:'images/photos/NIU_5750.jpg',t:'images/thumbs/NIU_5750.jpg',title:'NIU 5750',c:'close'},
  {id:43,s:'images/photos/NIU_5765.jpg',t:'images/thumbs/NIU_5765.jpg',title:'NIU 5765',c:'close'},
  {id:44,s:'images/photos/NIU_5772.jpg',t:'images/thumbs/NIU_5772.jpg',title:'NIU 5772',c:'close'},
  {id:45,s:'images/photos/NIU_5774.jpg',t:'images/thumbs/NIU_5774.jpg',title:'NIU 5774',c:'close'},
  {id:46,s:'images/photos/NIU_5776.jpg',t:'images/thumbs/NIU_5776.jpg',title:'NIU 5776',c:'close'},
  {id:47,s:'images/photos/NIU_6042.jpg',t:'images/thumbs/NIU_6042.jpg',title:'NIU 6042',c:'close'},
  {id:48,s:'images/photos/NIU_6155.jpg',t:'images/thumbs/NIU_6155.jpg',title:'NIU 6155',c:'distant'},
  {id:49,s:'images/photos/NIU_6171.jpg',t:'images/thumbs/NIU_6171.jpg',title:'NIU 6171',c:'distant'},
  {id:50,s:'images/photos/NIU_6181.jpg',t:'images/thumbs/NIU_6181.jpg',title:'NIU 6181',c:'distant'},
  {id:51,s:'images/photos/NIU_6184.jpg',t:'images/thumbs/NIU_6184.jpg',title:'NIU 6184',c:'distant'},
  {id:52,s:'images/photos/NIU_6779.jpg',t:'images/thumbs/NIU_6779.jpg',title:'NIU 6779',c:'distant'},
  {id:53,s:'images/photos/NIU_6793.jpg',t:'images/thumbs/NIU_6793.jpg',title:'NIU 6793',c:'distant'}
];

// ─── 全局状态 ───
var state = {
  currentFilter: 'all',
  viewerIndex: -1,
  filteredPhotos: PHOTOS.slice()
};

// ─── 快捷选择器 ───
var $ = function(s) { return document.querySelector(s); };
var $$ = function(s) { return document.querySelectorAll(s); };

// ═══════════════════ Toast 通知 ═══════════════════
function toast(msg, type) {
  type = type || 'info';
  var container = $('#toast-container');
  var el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(function() {
    el.classList.add('fade-out');
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
  }, 2200);
}

// ═══════════════════ 图片查看器 ═══════════════════
window.openViewer = function(index) {
  var list = state.filteredPhotos;
  if (!list.length) return;
  state.viewerIndex = index;
  var viewer = $('#photoViewer');
  var img = viewer.querySelector('img');
  var counter = viewer.querySelector('.viewer-counter');
  var fullSrc = list[index].s;
  counter.textContent = (index + 1) + ' / ' + list.length;
  img.style.opacity = '0';
  img.src = fullSrc;
  img.onload = function() { img.style.opacity = '1'; };
  img.style.transition = 'opacity 0.3s';
  viewer.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeViewer = function() {
  $('#photoViewer').classList.remove('open');
  document.body.style.overflow = '';
  state.viewerIndex = -1;
};

window.viewerPrev = function(e) { if (e) e.stopPropagation(); if (state.viewerIndex > 0) openViewer(state.viewerIndex - 1); };
window.viewerNext = function(e) { if (e) e.stopPropagation(); if (state.viewerIndex < state.filteredPhotos.length - 1) openViewer(state.viewerIndex + 1); };

document.addEventListener('keydown', function(e) {
  if (state.viewerIndex < 0) return;
  if (e.key === 'Escape') closeViewer();
  if (e.key === 'ArrowLeft') { e.preventDefault(); viewerPrev(e); }
  if (e.key === 'ArrowRight') { e.preventDefault(); viewerNext(e); }
});

// ═══════════════════ 作品集渲染 ═══════════════════
function getCatLabel(cat) {
  var map = { distant: '远景', close: '近景' };
  return map[cat] || cat;
}

function renderGallery(filter) {
  filter = filter || state.currentFilter;
  state.currentFilter = filter;
  var grid = $('#galleryGrid');
  if (!grid) return;

  if (filter === 'all') {
    state.filteredPhotos = PHOTOS.slice();
  } else {
    state.filteredPhotos = PHOTOS.filter(function(p) { return p.c === filter; });
  }

  var btns = $$('.filter-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
    if (btns[i].getAttribute('data-filter') === filter) {
      btns[i].classList.add('active');
    }
  }

  if (filter === 'all') {
    var counts = { all: PHOTOS.length, distant: 0, close: 0 };
    for (var j = 0; j < PHOTOS.length; j++) { counts[PHOTOS[j].c]++; }
    for (var k = 0; k < btns.length; k++) {
      var f = btns[k].getAttribute('data-filter');
      var existing = btns[k].querySelector('.count');
      if (existing) existing.remove();
      if (f !== 'all' && counts[f]) {
        var span = document.createElement('span');
        span.className = 'count';
        span.textContent = counts[f];
        btns[k].appendChild(span);
      }
    }
  }

  if (state.filteredPhotos.length === 0) {
    grid.innerHTML = '<div class="gallery-empty"><div class="empty-icon">📸</div><p>该分类暂无作品</p><p class="hint">敬请期待更多照片</p></div>';
    return;
  }

  grid.innerHTML = '';
  for (var i = 0; i < state.filteredPhotos.length; i++) {
    var photo = state.filteredPhotos[i];
    var item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-index', i);
    item.innerHTML =
      '<img src="' + photo.t + '" alt="' + photo.title + '" loading="lazy" onerror="this.style.opacity=\'0\'">' +
      '<div class="gallery-overlay">' +
        '<span class="gallery-tag">' + getCatLabel(photo.c) + '</span>' +
      '</div>' +
      '<div class="gallery-index">' + (i + 1) + '</div>';
    item.addEventListener('click', (function(idx) {
      return function() { openViewer(idx); };
    })(i));
    grid.appendChild(item);
  }
}

// ═══════════════════ 数量调整 ═══════════════════
window.adjustCount = function(delta) {
  var input = $('#bkCount');
  if (!input) return;
  var v = parseInt(input.value) + delta;
  if (v < 1) v = 1;
  if (v > 100) v = 100;
  input.value = v;
  updatePricePreview();
};

function updatePricePreview() {
  var countEl = $('#bkCount');
  var totalEl = $('#previewTotal');
  var balanceEl = $('#previewBalance');
  if (!countEl || !totalEl || !balanceEl) return;
  var v = parseInt(countEl.value) || 1;
  var price = CONFIG.pricePerPhoto;
  $('#previewCount').textContent = v;
  totalEl.textContent = v * price;
  balanceEl.textContent = Math.max(0, v * price - CONFIG.deposit);
}

// ═══════════════════ 支付 ═══════════════════
window.openAlipay = function() {
  window.location.href = CONFIG.alipayLink;
};

// ═══════════════════ 预约提交 ═══════════════════
var _pendingOrder = null;

function submitBooking() {
  var form = $('#bookingForm');
  if (!form) return false;

  var name = ($('#bkName').value || '').trim();
  var contact = ($('#bkContact').value || '').trim();
  var count = parseInt($('#bkCount').value) || 1;
  var style = (document.querySelector('input[name="style"]:checked') || {}).value || '日系清新';
  var date = $('#bkDate').value || '未指定';
  var note = ($('#bkNote').value || '').trim() || '无';

  if (!name || !contact) {
    toast('请填写称呼和联系方式', 'error');
    if (!name) $('#bkName').classList.add('error');
    if (!contact) $('#bkContact').classList.add('error');
    return false;
  }

  var total = count * CONFIG.pricePerPhoto;
  var order = {
    id: 'YH' + Date.now().toString(36).toUpperCase(),
    name: name, contact: contact, count: count,
    style: style, date: date, note: note,
    total: total, deposit: CONFIG.deposit,
    status: 'pending', createdAt: new Date().toISOString()
  };

  var orders = JSON.parse(localStorage.getItem('yh_orders') || '[]');
  orders.push(order);
  localStorage.setItem('yh_orders', JSON.stringify(orders));

  _pendingOrder = order;

  form.classList.add('hidden');
  $('#paymentStep').classList.remove('hidden');
  toast('请支付定金 ¥' + CONFIG.deposit, 'info');
  window.scrollTo(0, 0);
  return true;
}

window.confirmPayment = function() {
  if (!_pendingOrder) return;

  var orders = JSON.parse(localStorage.getItem('yh_orders') || '[]');
  for (var i = orders.length - 1; i >= 0; i--) {
    if (orders[i].id === _pendingOrder.id) {
      orders[i].status = 'paid';
      break;
    }
  }
  localStorage.setItem('yh_orders', JSON.stringify(orders));

  $('#paymentStep').classList.add('hidden');
  var success = $('#bookingSuccess');
  success.classList.remove('hidden');
  $('#bkResultInfo').textContent = '订单号 ' + _pendingOrder.id + ' · ' + _pendingOrder.count + '张 ' + _pendingOrder.style;
  toast('预约成功！', 'success');
  window.scrollTo(0, 0);
};

window.backToForm = function() {
  $('#paymentStep').classList.add('hidden');
  $('#bookingForm').classList.remove('hidden');
  window.scrollTo(0, 0);
};

window.resetBooking = function() {
  var form = $('#bookingForm');
  form.reset();
  form.classList.remove('hidden');
  $('#paymentStep').classList.add('hidden');
  $('#bookingSuccess').classList.add('hidden');
  if ($('#bkCount')) $('#bkCount').value = 1;
  $('#bkName').classList.remove('error');
  $('#bkContact').classList.remove('error');
  updatePricePreview();
  _pendingOrder = null;
  toast('可以继续预约了', 'info');
};

// ═══════════════════ 页面导航 ═══════════════════
var _pages, _tabs, _links;

window.navigateTo = function(p) {
  _pages = _pages || $$('.page');
  _tabs = _tabs || $$('.tab-item');
  _links = _links || $$('.nav-link');
  for (var i = 0; i < _pages.length; i++) _pages[i].classList.remove('active');
  var target = $('#page-' + p);
  if (target) target.classList.add('active');
  window.scrollTo(0, 0);
  for (var j = 0; j < _links.length; j++) _links[j].classList.remove('active');
  var al = document.querySelector('.nav-link[data-page="' + p + '"]');
  if (al) al.classList.add('active');
  for (var k = 0; k < _tabs.length; k++) _tabs[k].classList.remove('active');
  var at = document.querySelector('.tab-item[data-tab="' + p + '"]');
  if (at) at.classList.add('active');
  closeNav();
  if (p === 'gallery') renderGallery();
};

window.closeNav = function() {
  var toggle = $('#navToggle');
  var menu = $('#navMenu');
  if (toggle) toggle.classList.remove('active');
  if (menu) menu.classList.remove('open');
};

// ═══════════════════ 启动 ═══════════════════
window.addEventListener('DOMContentLoaded', function() {
  var navToggle = $('#navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      var menu = $('#navMenu');
      if (menu) menu.classList.toggle('open');
    });
  }

  var links = $$('.nav-link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(this.getAttribute('data-page'));
    });
  }

  var tabs = $$('.tab-item');
  for (var t = 0; t < tabs.length; t++) {
    tabs[t].addEventListener('click', function(e) {
      e.preventDefault();
      navigateTo(this.getAttribute('data-tab'));
    });
  }

  var filters = $$('.filter-btn');
  for (var f = 0; f < filters.length; f++) {
    filters[f].addEventListener('click', function() {
      var filter = this.getAttribute('data-filter');
      renderGallery(filter);
    });
  }

  var form = $('#bookingForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      submitBooking();
    });
  }

  var nameInput = $('#bkName');
  if (nameInput) nameInput.addEventListener('input', function() { this.classList.remove('error'); });
  var contactInput = $('#bkContact');
  if (contactInput) contactInput.addEventListener('input', function() { this.classList.remove('error'); });

  var viewer = $('#photoViewer');
  if (viewer) {
    viewer.addEventListener('click', function(e) {
      if (e.target === this) closeViewer();
    });
    var startX = 0, startY = 0;
    viewer.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, {passive: true});
    viewer.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx > 0) viewerPrev(e);
        else viewerNext(e);
      }
    });
  }

  window.addEventListener('scroll', function() {
    var navbar = $('#navbar');
    if (navbar) {
      if (window.scrollY > 10) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  }, {passive: true});

  var di = $('#bkDate');
  if (di) di.setAttribute('min', new Date().toISOString().split('T')[0]);

  updatePricePreview();

  setTimeout(function() {
    var splash = $('#splash');
    if (splash) splash.classList.add('fade-out');
    setTimeout(function() {
      if (splash) splash.classList.add('hidden');
      var navbar = $('#navbar');
      var footer = $('#footer');
      var tabbar = $('#tabbar');
      if (navbar) navbar.classList.remove('hidden');
      if (footer) footer.classList.remove('hidden');
      if (tabbar) tabbar.classList.remove('hidden');
      renderGallery();
    }, 600);
  }, 400);
});
