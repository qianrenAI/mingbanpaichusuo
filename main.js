const C={pricePerPhoto:20,deposit:20,wechatQR:"images/wechat-qr.jpg",alipayQR:"images/alipay-qr.jpg"};
const P=[{id:1,src:"images/placeholder-1.jpg"},{id:2,src:"images/placeholder-2.jpg"},{id:3,src:"images/placeholder-3.jpg"},{id:4,src:"images/placeholder-4.jpg"},{id:5,src:"images/placeholder-5.jpg"},{id:6,src:"images/placeholder-6.jpg"}];
var $=function(s){return document.querySelector(s);};
var $$=function(s){return document.querySelectorAll(s);};
var _p="wechat";

window.sp=function(el){_p=el.textContent.indexOf("微信")>=0?"wechat":"alipay";var a=$$(".payment-option");for(var i=0;i<a.length;i++)a[i].classList.remove("active");el.classList.add("active");pq();};
function pq(){var d=$("#paymentQR");if(!d)return;if(_p==="wechat"&&C.wechatQR){d.innerHTML='<img src="'+C.wechatQR+'" style="max-width:180px;border-radius:8px;"><p style="margin:8px 0 0;font-size:13px;color:#666;">微信扫码支付 ¥20</p>';}else if(_p==="alipay"&&C.alipayQR){d.innerHTML='<img src="'+C.alipayQR+'" style="max-width:180px;border-radius:8px;"><p style="margin:8px 0 0;font-size:13px;color:#666;">支付宝扫码支付 ¥20</p>';}}

// 页面导航
var _pages=$$(".page");var _tabs=$$(".tab-item");var _links=$$(".nav-link");
window.navigateTo=function(p){for(var i=0;i<_pages.length;i++)_pages[i].classList.remove("active");var t=$("#page-"+p);if(t)t.classList.add("active");window.scrollTo(0,0);for(var i=0;i<_links.length;i++)_links[i].classList.remove("active");var al=document.querySelector('.nav-link[data-page="'+p+'"]');if(al)al.classList.add("active");for(var i=0;i<_tabs.length;i++)_tabs[i].classList.remove("active");var at=document.querySelector('.tab-item[data-tab="'+p+'"]');if(at)at.classList.add("active");closeNav();};
function closeNav(){$("#navToggle").classList.remove("active");$("#navMenu").classList.remove("open");}
$("#navToggle").addEventListener("click",function(){this.classList.toggle("active");$("#navMenu").classList.toggle("open");});

for(var i=0;i<_links.length;i++)_links[i].addEventListener("click",function(e){e.preventDefault();navigateTo(this.getAttribute("data-page"));});
for(var i=0;i<_tabs.length;i++)_tabs[i].addEventListener("click",function(e){e.preventDefault();navigateTo(this.getAttribute("data-tab"));});

// 作品集
function gl(){var g=$("#galleryGrid");if(!g)return;g.innerHTML="";for(var i=0;i<P.length;i++){var it=document.createElement("div");it.className="gallery-item";it.innerHTML='<div style="background:hsl('+((P[i].id*60)%360)+',30%,60%);height:200px;border-radius:8px;"></div>';g.appendChild(it);}}
var _filters=$$(".filter-btn");for(var i=0;i<_filters.length;i++)_filters[i].addEventListener("click",function(){var b=$$(".filter-btn");for(var j=0;j<b.length;j++)b[j].classList.remove("active");this.classList.add("active");});

// 数量
window.adjustCount=function(d){var i=$("#bkCount");if(!i)return;var v=parseInt(i.value)+d;if(v<1)v=1;if(v>100)v=100;i.value=v;up();};
function up(){var c=$("#bkCount");var t=$("#previewTotal");var b=$("#previewBalance");if(!c||!t||!b)return;var v=parseInt(c.value)||1;$("#previewCount").textContent=v;t.textContent=v*20;b.textContent=Math.max(0,v*20-20);}

// 提交预约
$("#bookingForm").addEventListener("submit",function(e){e.preventDefault();var n=$("#bkName").value.trim();var c=$("#bkContact").value.trim();if(!n||!c){alert("请填写完整");return;}this.classList.add("hidden");$("#bookingSuccess").classList.remove("hidden");var q=$("#bookingSuccess").querySelector(".qr-box");if(_p==="wechat"&&C.wechatQR)q.innerHTML='<img src="'+C.wechatQR+'" style="width:100%;height:100%;object-fit:contain;">';else if(C.alipayQR)q.innerHTML='<img src="'+C.alipayQR+'" style="width:100%;height:100%;object-fit:contain;">';});
window.resetBooking=function(){$("#bookingForm").reset();$("#bookingForm").classList.remove("hidden");$("#bookingSuccess").classList.add("hidden");if($("#bkCount"))$("#bkCount").value=1;up();};

// 启动
window.addEventListener("DOMContentLoaded",function(){var di=$("#bkDate");if(di)di.setAttribute("min",new Date().toISOString().split("T")[0]);setTimeout(function(){$("#splash").classList.add("fade-out");setTimeout(function(){$("#splash").classList.add("hidden");$("#navbar").classList.remove("hidden");$("#footer").classList.remove("hidden");$("#tabbar").classList.remove("hidden");gl();pq();},600);},300);});
up();