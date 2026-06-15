/* ═══════════════════════════════════════════════════════════════
   明办拍出所 · 颐和路街拍摄影 v3.0
   四步预约向导 · 时间段选择 · 支付凭证上传
   ═══════════════════════════════════════════════════════════════ */

var CONFIG = { pricePerPhoto: 20, deposit: 20 };
var isWeChat = /MicroMessenger/i.test(navigator.userAgent);

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

var state = { currentFilter: 'all', currentStep: 1, viewerIndex: -1, filteredPhotos: PHOTOS.slice(), proofData: null, galleryPage: 0 };
var GALLERY_PAGE_SIZE = 12;
var $ = function(s) { return document.querySelector(s); };
var $$ = function(s) { return document.querySelectorAll(s); };

// ═══ Toast ═══
function toast(msg, type) {
  type = type || 'info';
  var c = $('#toast-container');
  var el = document.createElement('div');
  el.className = 'toast ' + type; el.textContent = msg;
  c.appendChild(el);
  setTimeout(function() { el.classList.add('fade-out'); setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 300); }, 2200);
}

// ═══ 图片查看器 ═══
window.openViewer = function(i) {
  var list = state.filteredPhotos; if (!list.length) return;
  state.viewerIndex = i;
  var v = $('#photoViewer'); var img = v.querySelector('img');
  img.style.opacity = '0'; img.src = list[i].s;
  img.onload = function() { img.style.opacity = '1'; };
  img.style.transition = 'opacity 0.3s';
  v.querySelector('.viewer-counter').textContent = (i + 1) + ' / ' + list.length;
  v.classList.add('open'); document.body.style.overflow = 'hidden';
};
window.closeViewer = function() { $('#photoViewer').classList.remove('open'); document.body.style.overflow = ''; state.viewerIndex = -1; };
window.viewerPrev = function(e) { if (e) e.stopPropagation(); if (state.viewerIndex > 0) openViewer(state.viewerIndex - 1); };
window.viewerNext = function(e) { if (e) e.stopPropagation(); if (state.viewerIndex < state.filteredPhotos.length - 1) openViewer(state.viewerIndex + 1); };

document.addEventListener('keydown', function(e) {
  if (state.viewerIndex < 0) return;
  if (e.key === 'Escape') closeViewer();
  if (e.key === 'ArrowLeft') { e.preventDefault(); viewerPrev(e); }
  if (e.key === 'ArrowRight') { e.preventDefault(); viewerNext(e); }
});

// ═══ 作品集 ═══
function getCatLabel(c) { var m = { distant: '远景', close: '近景' }; return m[c] || c; }
function renderGallery(filter) {
  filter = filter || state.currentFilter; state.currentFilter = filter;
  var grid = $('#galleryGrid'); if (!grid) return;
  state.filteredPhotos = filter === 'all' ? PHOTOS.slice() : PHOTOS.filter(function(p) { return p.c === filter; });
  var btns = $$('.filter-btn');
  for (var i = 0; i < btns.length; i++) { btns[i].classList.toggle('active', btns[i].getAttribute('data-filter') === filter); }
  if (filter === 'all') {
    var counts = { all: PHOTOS.length, distant: 0, close: 0 };
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
  photographer: { icon:'📸', name:'摄影师', desc:'热爱街拍，有独立审美。我们提供拍摄机会和作品展示平台，期待你的镜头语言加入明办拍出所，一起记录颐和路的街头故事。' },
  assistant: { icon:'💡', name:'摄影助理', desc:'协助摄影师完成拍摄，负责补光、道具、引导客人。无需经验，对摄影有兴趣即可，在实践中学习成长，未来可晋升为独立摄影师。' },
  sales: { icon:'🤝', name:'业务员', desc:'负责线上推广与客户对接，通过抖音、小红书等平台为明办拍出所引流。善于沟通、了解街拍市场者优先，多劳多得，按单提成。' },
  investor: { icon:'🚀', name:'投资人', desc:'看好街拍市场，愿意为明办拍出所的品牌发展提供资金或资源支持。我们正在打造南京颐和路标志性街拍品牌，共享增长红利。' }
};

window.selectRole = function(role, el) {
  selectedRole = role;
  var cards = document.querySelectorAll('.join-card');
  for (var i = 0; i < cards.length; i++) cards[i].classList.remove('selected');
  el.classList.add('selected');
  var btn = document.getElementById('btnGetContact');
  if (btn) { btn.disabled = false; btn.textContent = '获取联系方式'; }
};

window.showContact = function() {
  if (!selectedRole) return;
  var d = roleData[selectedRole];
  document.getElementById('joinStep1').style.display = 'none';
  document.getElementById('joinStep2').style.display = 'block';
  document.getElementById('joinResultDesc').innerHTML =
    '<div style="font-size:48px;margin-bottom:8px;">' + d.icon + '</div>' +
    '<h3 style="font-family:var(--font-serif);margin-bottom:8px;">' + d.name + '</h3>' +
    '<p style="font-size:13px;color:var(--text-light);line-height:1.8;">' + d.desc + '</p>';
  window.scrollTo(0, document.getElementById('joinStep2').offsetTop - 80);
};

window.resetJoin = function() {
  selectedRole = null;
  document.getElementById('joinStep1').style.display = 'block';
  document.getElementById('joinStep2').style.display = 'none';
  var btn = document.getElementById('btnGetContact');
  if (btn) { btn.disabled = true; btn.textContent = '获取联系方式'; }
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
    savedAt: Date.now()
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

// 检查草稿
function checkDraft() {
  var d = loadDraft();
  if (d) { $('#draftBanner').classList.remove('hidden'); }
  else { $('#draftBanner').classList.add('hidden'); }
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
  if (n === 3) { saveDraft(); renderPaymentQR(); }
  window.scrollTo(0, $('#stepper').offsetTop - 70);
};

// ═══ 时间段选择 ═══
window.selectTimeSlot = function(el) {
  $$('.time-slot').forEach(function(s) { s.classList.remove('active'); s.querySelector('input').checked = false; });
  el.classList.add('active'); el.querySelector('input').checked = true;
};

// ═══ 支付方式选择 ═══
window.selectPayment = function(el) {
  $$('.payment-slot').forEach(function(s) { s.classList.remove('active'); s.querySelector('input').checked = false; });
  el.classList.add('active'); el.querySelector('input').checked = true;
  renderPaymentQR();
};

function renderPaymentQR() {
  var d = $('#paymentQRDisplay'); if (!d) return;
  var payment = (document.querySelector('input[name="payment"]:checked') || {}).value || 'alipay';
  if (payment === 'wechat') {
    d.innerHTML = '<div style="background:#fff;border-radius:16px;padding:12px;display:inline-block;box-shadow:0 2px 12px rgba(0,0,0,0.08);"><img src="images/wechat-qr-clean.png" style="width:200px;height:200px;display:block;border-radius:8px;"></div><p style="font-size:13px;color:#07c160;font-weight:700;margin-top:8px;">💚 微信收款码</p>';
  } else {
    d.innerHTML = '<div style="background:#fff;border-radius:16px;padding:12px;display:inline-block;box-shadow:0 2px 12px rgba(0,0,0,0.08);"><img src="images/alipay-qr.jpg" style="width:200px;height:200px;display:block;border-radius:8px;"></div><p style="font-size:13px;color:#1677ff;font-weight:700;margin-top:8px;">💙 支付宝收款码</p>';
  }
}

// ═══ 上传支付凭证 ═══
window.handleProofUpload = function(input) {
  var file = input.files[0]; if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast('图片不能超过5MB', 'error'); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var maxW = 800, scale = Math.min(1, maxW / img.width);
      canvas.width = img.width * scale; canvas.height = img.height * scale;
      var ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      state.proofData = canvas.toDataURL('image/jpeg', 0.7);
      var preview = $('#uploadPreview'); preview.src = state.proofData; preview.style.display = 'block';
      $('#uploadPlaceholder').style.display = 'none';
      $('#uploadArea').classList.add('has-file');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
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
  var payment = (document.querySelector('input[name="payment"]:checked') || {}).value || 'alipay';

  if (!name) { toast('请填写称呼', 'error'); goToStep(1); return; }
  if (!wechat) { toast('请填写微信号', 'error'); goToStep(1); return; }
  if (!date) { toast('请选择预约日期', 'error'); goToStep(2); return; }
  if (!timeSlot) { toast('请选择时间段', 'error'); goToStep(2); return; }
  if (!state.proofData) { toast('请上传支付凭证', 'error'); return; }

  var slotLabels = { afternoon: '14:00-19:00 下午·郁郁葱葱', evening: '19:00-22:00 晚间·灯火阑珊', night: '22:00-3:00 凌晨·轻声细语' };
  var total = count * CONFIG.pricePerPhoto;

  var order = {
    id: 'YH' + Date.now().toString(36).toUpperCase(),
    name: name, wechat: wechat, count: count, date: date,
    timeSlot: timeSlot, timeLabel: slotLabels[timeSlot] || timeSlot,
    style: style, note: note, payment: payment,
    total: total, deposit: CONFIG.deposit, status: 'pending',
    proof: state.proofData,
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
  state.proofData = null; state.currentStep = 1;
  $('#uploadPreview').style.display = 'none'; $('#uploadPlaceholder').style.display = 'block';
  $('#uploadArea').classList.remove('has-file');
  if ($('#bkCount')) $('#bkCount').value = 1;
  updatePricePreview(); renderPaymentQR();
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
  if (p === 'booking') { checkDraft(); goToStep(1); renderPaymentQR(); }
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
  var di = $('#bkDate'); if (di) di.setAttribute('min', new Date().toISOString().split('T')[0]);
  updatePricePreview();
  setTimeout(function() {
    var splash = $('#splash'); if (splash) splash.classList.add('fade-out');
    setTimeout(function() {
      if (splash) splash.classList.add('hidden');
      var n = $('#navbar'), f = $('#footer'), t = $('#tabbar');
      if (n) n.classList.remove('hidden'); if (f) f.classList.remove('hidden'); if (t) t.classList.remove('hidden');
      renderGallery(); renderPaymentQR();
    }, 600);
  }, 400);
});
