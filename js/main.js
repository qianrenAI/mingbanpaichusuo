/* ═══════════════════════════════════════════════════════════════
   明办拍出所 · 颐和路街拍摄影 v3.0
   四步预约向导 · 时间段选择 · 支付凭证上传
   ═══════════════════════════════════════════════════════════════ */

var CONFIG = { pricePerPhoto: 20, deposit: 9.9 };
var isWeChat = /MicroMessenger/i.test(navigator.userAgent);

function getCatLabel(c) { var m = { 'couple-close': '情侣近景', 'couple-far': '情侣远景', 'female-close': '女生近景', 'female-far': '女生远景', 'male': '男生特辑' }; return m[c] || c; }
function renderGallery(filter) {
  filter = filter || state.currentFilter; state.currentFilter = filter;
  var grid = $('#galleryGrid'); if (!grid) return;
  state.filteredPhotos = filter === 'all' ? PHOTOS.slice() : PHOTOS.filter(function(p) { return p.c === filter; });
  var btns = $$('.filter-btn');
  for (var i = 0; i < btns.length; i++) { btns[i].classList.toggle('active', btns[i].getAttribute('data-filter') === filter); }
  if (filter === 'all') {
    var counts = { all: PHOTOS.length, 'couple-close': 0, 'couple-far': 0, 'female-close': 0, 'female-far': 0, 'male': 0 };
    for (var j = 0; j < PHOTOS.length; j++) counts[PHOTOS[j].c]++;
    for (var k = 0; k < btns.length; k++) {
      var f = btns[k].getAttribute('data-filter'), ex = btns[k].querySelector('.count');
      if (ex) ex.remove();
      if (f !== 'all' && counts[f]) { var sp = document.createElement('span'); sp.className = 'count'; sp.textContent = counts[f]; btns[k].appendChild(sp); }
    }
  }
  if (!state.filteredPhotos.length) { grid.innerHTML = '<div class="gallery-empty"><div class="empty-icon">📸</div><p>该分类暂无作品</p></div>'; return; }
  state.galleryPage = 1;
  renderGalleryPage();
}

function renderGalleryPage() {
  var grid = $('#galleryGrid'); if (!grid) return;
  var start = 0, end = state.galleryPage * GALLERY_PAGE_SIZE;
  if (end > state.filteredPhotos.length) end = state.filteredPhotos.length;
  if (state.galleryPage === 1) grid.innerHTML = '';

  // Remove old load-more button
  var oldBtn = grid.querySelector('.load-more-wrap');
  if (oldBtn) oldBtn.remove();

  for (var i = start; i < end; i++) {
    var p = state.filteredPhotos[i], item = document.createElement('div');
    item.className = 'gallery-item'; item.setAttribute('data-index', i);
    var src = p.thumb_mini || p.thumb_sm || p.t;
    item.innerHTML = '<img src="' + src + '" loading="lazy" onerror="this.style.opacity=0"><div class="gallery-overlay"><span class="gallery-tag">' + getCatLabel(p.c) + '</span></div><div class="gallery-index">' + (i + 1) + '</div>';
    item.addEventListener('click', (function(idx) { return function() { openViewer(idx); }; })(i));
    grid.appendChild(item);
  }

  // 还有更多？
  if (end < state.filteredPhotos.length) {
    var wrap = document.createElement('div'); wrap.className = 'load-more-wrap';
    var btn = document.createElement('button');
    btn.className = 'btn btn-outline full-width';
    btn.style.cssText = 'margin-top:16px;';
    btn.textContent = '加载更多 (' + (end) + '/' + state.filteredPhotos.length + ')';
    btn.addEventListener('click', function() { state.galleryPage++; renderGalleryPage(); window.scrollBy(0, 200); });
    wrap.appendChild(btn);
    grid.appendChild(wrap);
  }
}

// ═══ 加入我们 ═══
var selectedRole = null;
var roleData = {
  photographer: { icon:'📸', name:'摄影师' },
  assistant: { icon:'💡', name:'摄影助理' },
  sales: { icon:'🤝', name:'业务员' },
  investor: { icon:'🚀', name:'投资人' }
};

window.selectRole = function(role, el) {
  selectedRole = role;
  var cards = document.querySelectorAll('.join-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  el.classList.add('selected');
  var btn = document.getElementById('btnGetContact');
  if (btn) { btn.disabled = false; btn.textContent = '确认'; }
};

// Step 1 → 2: 选好身份，填信息
window.goToJoinStep2 = function() {
  if (!selectedRole) return;
  var d = roleData[selectedRole];
  document.getElementById('joinStep1').style.display = 'none';
  document.getElementById('joinStep2').style.display = 'block';
  document.getElementById('joinStep3').style.display = 'none';
  document.getElementById('joinStep2Role').innerHTML = '<p style="font-size:14px;color:var(--text-light);">您将作为 <strong>' + d.icon + ' ' + d.name + '</strong> 加入</p>';
  window.scrollTo(0, document.getElementById('joinStep2').offsetTop - 80);
};

// Step 2 → 1: 返回
window.goToJoinStep1 = function() {
  document.getElementById('joinStep1').style.display = 'block';
  document.getElementById('joinStep2').style.display = 'none';
  window.scrollTo(0, 0);
};

// Step 2 → 3: 确认信息，显示联系方式
window.showContact = function() {
  var name = (document.getElementById('joinName').value || '').trim();
  var contact = (document.getElementById('joinContact').value || '').trim();
  if (!name) { toast('请填写您的称呼', 'error'); return; }
  if (!contact) { toast('请填写手机号码或微信号', 'error'); return; }
  var d = roleData[selectedRole];
  // 保存到 localStorage
  var joins = JSON.parse(localStorage.getItem('yh_joins') || '[]');
  joins.push({
    id: 'JN' + Date.now().toString(36).toUpperCase(),
    role: selectedRole, roleName: d.name, name: name, contact: contact,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('yh_joins', JSON.stringify(joins));
  toast('申请已提交！', 'success');
  // 显示结果
  document.getElementById('joinStep2').style.display = 'none';
  document.getElementById('joinStep3').style.display = 'block';
  document.getElementById('joinResultRole').textContent = d.icon + ' ' + d.name + ' · ' + name;
  window.scrollTo(0, document.getElementById('joinStep3').offsetTop - 80);
};

window.resetJoin = function() {
  selectedRole = null;
  document.getElementById('joinStep1').style.display = 'block';
  document.getElementById('joinStep2').style.display = 'none';
  document.getElementById('joinStep3').style.display = 'none';
  document.getElementById('joinName').value = '';
  document.getElementById('joinContact').value = '';
  var btn = document.getElementById('btnGetContact');
  if (btn) { btn.disabled = true; btn.textContent = '确认'; }
  var cards = document.querySelectorAll('.join-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  window.scrollTo(0, 0);
};

// ═══ 复制 ═══
window.copyText = function(t) {
  if (navigator.clipboard) { navigator.clipboard.writeText(t).then(function() { toast('已复制: ' + t, 'success'); }); }
  else { var ta = document.createElement('textarea'); ta.value = t; ta.style.cssText = 'position:fixed;left:-9999px'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); toast('已复制: ' + t, 'success'); }
};

// ═══════════════════ 预约向导 ═══════════════════

// 保存草稿（去支付前自动保存）
function saveDraft() {
  var draft = {
    name: ($('#bkName').value || '').trim(),
    wechat: ($('#bkWechat').value || '').trim(),
    count: parseInt($('#bkCount').value) || 1,
    date: $('#bkDate').value || '',
    timeSlot: (document.querySelector('input[name="timeSlot"]:checked') || {}).value || '',
    style: (document.querySelector('input[name="style"]:checked') || {}).value || '日系清新',
    note: ($('#bkNote').value || '').trim() || '无',
    savedAt: Date.now(),
    paid: true  // 标记已发起支付
  };
  localStorage.setItem('yh_draft', JSON.stringify(draft));
}

// 恢复草稿
function loadDraft() {
  try {
    var raw = localStorage.getItem('yh_draft');
    if (!raw) return null;
    var d = JSON.parse(raw);
    if (Date.now() - d.savedAt > 3600000) { localStorage.removeItem('yh_draft'); return null; } // 1小时过期
    return d;
  } catch(e) { return null; }
}

// 清除草稿
function clearDraft() { localStorage.removeItem('yh_draft'); }

// 恢复草稿
window.resumeDraft = function() {
  var d = loadDraft(); if (!d) { toast('草稿已过期', 'error'); return; }
  $('#bkName').value = d.name || '';
  $('#bkWechat').value = d.wechat || '';
  $('#bkCount').value = d.count || 1;
  $('#bkDate').value = d.date || '';
  if (d.date) { var db = document.querySelector('.date-btn[data-date=\"' + d.date + '\"]'); if (db) { $$('.date-btn').forEach(function(b){b.classList.remove('selected');}); db.classList.add('selected'); } }
  if (d.timeSlot) { var ts = document.querySelector('input[name="timeSlot"][value="' + d.timeSlot + '"]'); if (ts) { ts.checked = true; var tsl = ts.closest('.time-slot'); if (tsl) tsl.classList.add('active'); } }
  var st = document.querySelector('input[name="style"][value="' + (d.style || '日系清新') + '"]'); if (st) st.checked = true;
  $('#bkNote').value = d.note !== '无' ? d.note : '';
  updatePricePreview();
  $('#draftBanner').classList.add('hidden');
  goToStep(3);
};

// 清除草稿提示
window.clearDraftBanner = function() {
  clearDraft(); $('#draftBanner').classList.add('hidden'); goToStep(1);
};

// 检查草稿 - 如果已发起支付，自动回到确认页
function checkDraft() {
  var d = loadDraft();
  if (d && d.paid) {
    // 已发起支付，自动回第三步确认页
    resumeDraftAuto(d);
  } else if (d) {
    $('#draftBanner').classList.remove('hidden');
  } else {
    $('#draftBanner').classList.add('hidden');
  }
}

// 支付后自动恢复
function resumeDraftAuto(d) {
  $('#bkName').value = d.name || '';
  $('#bkWechat').value = d.wechat || '';
  $('#bkCount').value = d.count || 1;
  $('#bkDate').value = d.date || '';
  if (d.date) { var db = document.querySelector('.date-btn[data-date=\"' + d.date + '\"]'); if (db) { $$('.date-btn').forEach(function(b){b.classList.remove('selected');}); db.classList.add('selected'); } }
  if (d.timeSlot) { var ts = document.querySelector('input[name="timeSlot"][value="' + d.timeSlot + '"]'); if (ts) { ts.checked = true; var tsl = ts.closest('.time-slot'); if (tsl) tsl.classList.add('active'); } }
  var st = document.querySelector('input[name="style"][value="' + (d.style || '日系清新') + '"]'); if (st) st.checked = true;
  $('#bkNote').value = d.note !== '无' ? d.note : '';
  updatePricePreview();
  $('#draftBanner').classList.add('hidden');
  goToStep(3);
  // 显示确认按钮
  var section = document.getElementById('payReturnSection');
  if (section) section.style.display = 'block';
}

window.goToStep = function(n) {
  state.currentStep = n;
  for (var i = 1; i <= 4; i++) { var p = $('#stepPanel' + i); if (p) p.classList.toggle('active', i === n); }
  var nodes = $$('.step-node');
  for (var j = 0; j < nodes.length; j++) {
    var step = parseInt(nodes[j].getAttribute('data-step'));
    nodes[j].classList.remove('active', 'done');
    if (step < n) nodes[j].classList.add('done');
    if (step === n) nodes[j].classList.add('active');
  }
  var lines = $$('.step-line');
  for (var k = 0; k < lines.length; k++) { lines[k].classList.toggle('done', k + 1 < n); }
  // 进入支付步骤时保存草稿
  if (n === 3) { saveDraft(); }
  window.scrollTo(0, $('#stepper').offsetTop - 70);
};

// ═══ 日期选择 ═══
window.selectDate = function(el, dateStr) {
  $$('.date-btn').forEach(function(b) { b.classList.remove('selected'); });
  el.classList.add('selected');
  $('#bkDate').value = dateStr;
};

// ═══ 时间段选择 ═══
window.selectTimeSlot = function(el) {
  $$('.time-slot').forEach(function(s) { s.classList.remove('active'); s.querySelector('input').checked = false; });
  el.classList.add('active'); el.querySelector('input').checked = true;
};

// ═══ 收钱吧在线支付 ═══
window.openAlipayPay = function() {
  var url = 'https://i.wosai.cn/5aUPUt';
  var w = window.open(url, '_blank');
  if (!w || w.closed) {
    window.location.href = url;
  }
  toast('正在打开支付页面...', 'info');
};

// 支付后显示确认按钮
window.showPayReturnBtn = function() {
  var section = document.getElementById('payReturnSection');
  if (section) section.style.display = 'block';
  window.scrollBy(0, 100);
};


// ═══ 提交预约 ═══
window.submitFullBooking = function() {
  var name = ($('#bkName').value || '').trim();
  var wechat = ($('#bkWechat').value || '').trim();
  var count = parseInt($('#bkCount').value) || 1;
  var date = $('#bkDate').value;
  var timeSlot = (document.querySelector('input[name="timeSlot"]:checked') || {}).value;
  var style = (document.querySelector('input[name="style"]:checked') || {}).value || '日系清新';
  var note = ($('#bkNote').value || '').trim() || '无';

  if (!name) { toast('请填写称呼', 'error'); goToStep(1); return; }
  if (!wechat) { toast('请填写微信号', 'error'); goToStep(1); return; }
  if (!date) { toast('请选择预约日期', 'error'); goToStep(2); return; }
  if (!timeSlot) { toast('请选择时间段', 'error'); goToStep(2); return; }

  var slotLabels = { afternoon: '14:00-19:00 下午·郁郁葱葱', evening: '19:00-22:00 晚间·灯火阑珊', night: '22:00-3:00 凌晨·轻声细语' };
  var total = count * CONFIG.pricePerPhoto;

  var order = {
    id: 'YH' + Date.now().toString(36).toUpperCase(),
    name: name, wechat: wechat, count: count, date: date,
    timeSlot: timeSlot, timeLabel: slotLabels[timeSlot] || timeSlot,
    style: style, note: note,
    total: total, deposit: CONFIG.deposit, status: 'pending',
    createdAt: new Date().toISOString()
  };

  var orders = JSON.parse(localStorage.getItem('yh_orders') || '[]');
  orders.push(order);
  localStorage.setItem('yh_orders', JSON.stringify(orders));

  $('#bkResultInfo').textContent = '订单号 ' + order.id + ' · ' + count + '人 · ' + (slotLabels[timeSlot] || '');
  clearDraft();
  goToStep(4);
  toast('预约成功！', 'success');
};

window.resetBooking = function() {
  $('#bookingForm').reset();
  state.currentStep = 1;
  if ($('#bkCount')) $('#bkCount').value = 1;
  updatePricePreview();
  clearDraft();
  goToStep(1);
};

// ═══ 数量 + 价格 ═══
window.adjustCount = function(d) {
  var input = $('#bkCount'); if (!input) return;
  var v = parseInt(input.value) + d; if (v < 1) v = 1; if (v > 5) v = 5;
  input.value = v; updatePricePreview();
};
function updatePricePreview() {
  // 价格固定，无需动态更新
}

// ═══ 页面导航 ═══
var _pages, _tabs, _links;
window.navigateTo = function(p) {
  _pages = _pages || $$('.page'); _tabs = _tabs || $$('.tab-item'); _links = _links || $$('.nav-link');
  for (var i = 0; i < _pages.length; i++) _pages[i].classList.remove('active');
  var t = $('#page-' + p); if (t) t.classList.add('active');
  window.scrollTo(0, 0);
  for (var j = 0; j < _links.length; j++) _links[j].classList.remove('active');
  var al = document.querySelector('.nav-link[data-page="' + p + '"]'); if (al) al.classList.add('active');
  for (var k = 0; k < _tabs.length; k++) _tabs[k].classList.remove('active');
  var at = document.querySelector('.tab-item[data-tab="' + p + '"]'); if (at) at.classList.add('active');
  closeNav();
  if (p === 'gallery') renderGallery();
  if (p === 'booking') { checkDraft(); goToStep(1); }
};
window.closeNav = function() {
  var t = $('#navToggle'), m = $('#navMenu');
  if (t) t.classList.remove('active'); if (m) m.classList.remove('open');
};

// ═══ 启动 ═══
window.addEventListener('DOMContentLoaded', function() {
  var navToggle = $('#navToggle');
  if (navToggle) navToggle.addEventListener('click', function() { this.classList.toggle('active'); var m = $('#navMenu'); if (m) m.classList.toggle('open'); });
  var links = $$('.nav-link');
  for (var i = 0; i < links.length; i++) links[i].addEventListener('click', function(e) { e.preventDefault(); navigateTo(this.getAttribute('data-page')); });
  var tabs = $$('.tab-item');
  for (var t = 0; t < tabs.length; t++) tabs[t].addEventListener('click', function(e) { e.preventDefault(); navigateTo(this.getAttribute('data-tab')); });
  var filters = $$('.filter-btn');
  for (var f = 0; f < filters.length; f++) filters[f].addEventListener('click', function() { renderGallery(this.getAttribute('data-filter')); });
  var viewer = $('#photoViewer');
  if (viewer) {
    viewer.addEventListener('click', function(e) { if (e.target === this) closeViewer(); });
    var sx = 0, sy = 0;
    viewer.addEventListener('touchstart', function(e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, {passive: true});
    viewer.addEventListener('touchend', function(e) { var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) { if (dx > 0) viewerPrev(e); else viewerNext(e); } });
  }
  window.addEventListener('scroll', function() { var nb = $('#navbar'); if (nb) nb.classList.toggle('scrolled', window.scrollY > 10); }, {passive: true});
  // 日期选择器
  var dp = $('#datePicker');
  if (dp) {
    var today = new Date();
    var days = ['周日','周一','周二','周三','周四','周五','周六'];
    var hint = $('#bkDateHint');
    var html = '';
    var todayStr = today.toISOString().split('T')[0];
    for (var d = 0; d < 7; d++) {
      var dt = new Date(today); dt.setDate(dt.getDate() + d);
      var ds = dt.toISOString().split('T')[0];
      var isToday = d === 0;
      html += '<div class="date-btn' + (isToday ? ' selected' : '') + '" data-date="' + ds + '" onclick="selectDate(this,\'' + ds + '\')">' +
        '<span class="d-weekday">' + days[dt.getDay()] + '</span>' +
        '<span class="d-date">' + (dt.getMonth()+1) + '.' + dt.getDate() + '</span>' +
        (isToday ? '<span class="d-today">今天</span>' : '') +
      '</div>';
    }
    dp.innerHTML = html;
    $('#bkDate').value = todayStr;
    if (hint) hint.textContent = '⭐ 未来7天可约，点击选择';
  }
  updatePricePreview();
  setTimeout(function() {
    var splash = $('#splash'); if (splash) splash.classList.add('fade-out');
    setTimeout(function() {
      if (splash) splash.classList.add('hidden');
      var n = $('#navbar'), f = $('#footer'), t = $('#tabbar');
      if (n) n.classList.remove('hidden'); if (f) f.classList.remove('hidden'); if (t) t.classList.remove('hidden');
      renderGallery();     }, 600);
  }, 400);
});
