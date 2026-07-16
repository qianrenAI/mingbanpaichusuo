/* ════════════════════════════════════════════════
   明办拍出所 · AI客服
   FAQ自动匹配 + 人工转接
   ════════════════════════════════════════════════ */

(function() {
  var FAQ = [
    { q: ['价格','多少钱','费用','收费','怎么收费'], a: '单张¥20含精修调色和人像修图，定金¥9.9即可预约。拍摄完成后自由挑选照片，只为选中的付费～' },
    { q: ['预约','怎么预约','如何预约','预定','下单'], a: '点击底部「预约」→ 填写称呼和微信号 → 选择日期和时间段 → 支付¥9.9定金 → 完成预约！摄影师会尽快联系你确认档期。' },
    { q: ['地点','哪里','在哪','位置','地址','颐和路'], a: '这个得根据当天颐和路具体情况来定～但放心，摄影师会带你去人相对少一点的路灯下、取景构图好的景，我们会为你的体验负责，包出片的！' },
    { q: ['定金','押金','预付','付款','支付','怎么付'], a: '定金只需¥9.9！点击预约页面的「在线支付」按钮，支持微信和支付宝，付完回到页面点「我已完成支付」就OK了。' },
    { q: ['时间','几点','多久','什么时候','时长'], a: '可选三个时间段：下午14:00-19:00（郁郁葱葱）、晚间19:00-22:00（灯火阑珊）、凌晨22:00-3:00（轻声细语）。建议选傍晚，光影最美～' },
    { q: ['人数','几个人','多少人','最多'], a: '每组不超过5人，单人、闺蜜、情侣都可以拍。也可以拍男生特辑哦！' },
    { q: ['精修','修图','后期','调色','修片'], a: '每张照片包含专业后期调色和人像修图，原片也会给你。自由挑选喜欢的，不满意不付费～' },
    { q: ['微信','微信','联系方式','电话','手机','联系','加微信'], a: '摄影师微信：HELLOqianren2021，电话：17536826272。添加时备注「预约街拍」即可～' },
    { q: ['你好','嗨','hi','hello','在吗','客服'], a: '你好呀！我是明办拍出所的AI小助手，有什么可以帮你的？你可以直接问我价格、预约、拍摄风格等问题～' }
  ];

  function matchFAQ(msg) {
    var best = null, bestScore = 0;
    msg = msg.toLowerCase();
    for (var i = 0; i < FAQ.length; i++) {
      for (var j = 0; j < FAQ[i].q.length; j++) {
        var kw = FAQ[i].q[j];
        if (msg.indexOf(kw) >= 0) {
          var score = kw.length;
          if (score > bestScore) { bestScore = score; best = FAQ[i]; }
        }
      }
    }
    return best;
  }

  // DOM
  var bubble, windowEl, body, input;
  var isOpen = false;

  function init() {
    bubble = document.createElement('div');
    bubble.id = 'chatBubble';
    bubble.innerHTML = '💬';
    bubble.title = 'AI客服';
    bubble.addEventListener('click', toggle);

    windowEl = document.createElement('div');
    windowEl.id = 'chatWindow';
    windowEl.innerHTML =
      '<div class="chat-header">' +
        '<h3>💬 AI小助手</h3>' +
        '<button class="chat-close">&times;</button>' +
      '</div>' +
      '<div class="chat-quick" id="chatQuick">' +
        '<button>价格？</button><button>怎么预约？</button>' +
        '<button>在哪拍？</button>' +
      '</div>' +
      '<div class="chat-body" id="chatBody">' +
        '<div class="chat-msg bot">你好！我是明办拍出所的AI小助手～<br>有什么可以帮你的？</div>' +
      '</div>' +
      '<div class="chat-input-wrap">' +
        '<input id="chatInput" type="text" placeholder="输入你的问题...">' +
        '<button id="chatSend">发送</button>' +
      '</div>';

    document.body.appendChild(bubble);
    document.body.appendChild(windowEl);

    body = document.getElementById('chatBody');
    input = document.getElementById('chatInput');

    windowEl.querySelector('.chat-close').addEventListener('click', function(){ close(); });
    document.getElementById('chatSend').addEventListener('click', send);
    input.addEventListener('keydown', function(e){ if (e.key === 'Enter') send(); });

    // 快捷按钮
    var qs = document.getElementById('chatQuick').querySelectorAll('button');
    for (var i = 0; i < qs.length; i++) {
      qs[i].addEventListener('click', function(){ input.value = this.textContent; send(); });
    }
  }

  function toggle() {
    if (isOpen) close(); else open();
  }

  function open() {
    windowEl.classList.add('open');
    bubble.style.display = 'none';
    isOpen = true;
    setTimeout(function(){ input.focus(); }, 100);
  }

  function close() {
    windowEl.classList.remove('open');
    bubble.style.display = 'flex';
    isOpen = false;
  }

  function addMsg(text, type) {
    var el = document.createElement('div');
    el.className = 'chat-msg ' + type;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function addTyping() {
    var el = document.createElement('div');
    el.className = 'chat-msg typing';
    el.textContent = '正在输入...';
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function send() {
    var msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    addMsg(msg, 'user');
    var typing = addTyping();

    setTimeout(function() {
      if (typing.parentNode) typing.parentNode.removeChild(typing);
      var faq = matchFAQ(msg);
      if (faq) {
        addMsg(faq.a, 'bot');
      } else {
        addMsg('这个问题我不太确定～你可以加摄影师微信直接问：HELLOqianren2021，或者换个问题试试～', 'bot');
      }
    }, 800 + Math.random() * 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
