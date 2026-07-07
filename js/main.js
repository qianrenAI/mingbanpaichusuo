/* ═══════════════════════════════════════════════════════════════
   明办拍出所 · 颐和路街拍摄影 v3.0
   四步预约向导 · 时间段选择 · 支付凭证上传
   ═══════════════════════════════════════════════════════════════ */

var CONFIG = { pricePerPhoto: 20, deposit: 9.9 };
var isWeChat = /MicroMessenger/i.test(navigator.userAgent);

var PHOTOS = [
{id:1,s:'images/gallery/photos/couple-close-1.JPG',t:'images/gallery/thumbs/couple-close-1.JPG',c:'couple-close'},
{id:2,s:'images/gallery/photos/couple-close-10.jpg',t:'images/gallery/thumbs/couple-close-10.jpg',c:'couple-close'},
{id:3,s:'images/gallery/photos/couple-close-11.jpg',t:'images/gallery/thumbs/couple-close-11.jpg',c:'couple-close'},
{id:4,s:'images/gallery/photos/couple-close-12.jpg',t:'images/gallery/thumbs/couple-close-12.jpg',c:'couple-close'},
{id:5,s:'images/gallery/photos/couple-close-13.jpg',t:'images/gallery/thumbs/couple-close-13.jpg',c:'couple-close'},
{id:6,s:'images/gallery/photos/couple-close-14.jpg',t:'images/gallery/thumbs/couple-close-14.jpg',c:'couple-close'},
{id:7,s:'images/gallery/photos/couple-close-15.JPG',t:'images/gallery/thumbs/couple-close-15.JPG',c:'couple-close'},
{id:8,s:'images/gallery/photos/couple-close-16.JPG',t:'images/gallery/thumbs/couple-close-16.JPG',c:'couple-close'},
{id:9,s:'images/gallery/photos/couple-close-17.jpg',t:'images/gallery/thumbs/couple-close-17.jpg',c:'couple-close'},
{id:10,s:'images/gallery/photos/couple-close-18.jpg',t:'images/gallery/thumbs/couple-close-18.jpg',c:'couple-close'},
{id:11,s:'images/gallery/photos/couple-close-19.JPG',t:'images/gallery/thumbs/couple-close-19.JPG',c:'couple-close'},
{id:12,s:'images/gallery/photos/couple-close-2.JPG',t:'images/gallery/thumbs/couple-close-2.JPG',c:'couple-close'},
{id:13,s:'images/gallery/photos/couple-close-20.JPG',t:'images/gallery/thumbs/couple-close-20.JPG',c:'couple-close'},
{id:14,s:'images/gallery/photos/couple-close-21.jpg',t:'images/gallery/thumbs/couple-close-21.jpg',c:'couple-close'},
{id:15,s:'images/gallery/photos/couple-close-22.JPG',t:'images/gallery/thumbs/couple-close-22.JPG',c:'couple-close'},
{id:16,s:'images/gallery/photos/couple-close-23.jpg',t:'images/gallery/thumbs/couple-close-23.jpg',c:'couple-close'},
{id:17,s:'images/gallery/photos/couple-close-24.JPG',t:'images/gallery/thumbs/couple-close-24.JPG',c:'couple-close'},
{id:18,s:'images/gallery/photos/couple-close-25.JPG',t:'images/gallery/thumbs/couple-close-25.JPG',c:'couple-close'},
{id:19,s:'images/gallery/photos/couple-close-26.jpg',t:'images/gallery/thumbs/couple-close-26.jpg',c:'couple-close'},
{id:20,s:'images/gallery/photos/couple-close-27.jpg',t:'images/gallery/thumbs/couple-close-27.jpg',c:'couple-close'},
{id:21,s:'images/gallery/photos/couple-close-28.JPG',t:'images/gallery/thumbs/couple-close-28.JPG',c:'couple-close'},
{id:22,s:'images/gallery/photos/couple-close-29.jpg',t:'images/gallery/thumbs/couple-close-29.jpg',c:'couple-close'},
{id:23,s:'images/gallery/photos/couple-close-3.jpg',t:'images/gallery/thumbs/couple-close-3.jpg',c:'couple-close'},
{id:24,s:'images/gallery/photos/couple-close-30.jpg',t:'images/gallery/thumbs/couple-close-30.jpg',c:'couple-close'},
{id:25,s:'images/gallery/photos/couple-close-31.jpg',t:'images/gallery/thumbs/couple-close-31.jpg',c:'couple-close'},
{id:26,s:'images/gallery/photos/couple-close-32.jpg',t:'images/gallery/thumbs/couple-close-32.jpg',c:'couple-close'},
{id:27,s:'images/gallery/photos/couple-close-33.jpg',t:'images/gallery/thumbs/couple-close-33.jpg',c:'couple-close'},
{id:28,s:'images/gallery/photos/couple-close-4.jpg',t:'images/gallery/thumbs/couple-close-4.jpg',c:'couple-close'},
{id:29,s:'images/gallery/photos/couple-close-5.jpg',t:'images/gallery/thumbs/couple-close-5.jpg',c:'couple-close'},
{id:30,s:'images/gallery/photos/couple-close-6.JPG',t:'images/gallery/thumbs/couple-close-6.JPG',c:'couple-close'},
{id:31,s:'images/gallery/photos/couple-close-7.jpg',t:'images/gallery/thumbs/couple-close-7.jpg',c:'couple-close'},
{id:32,s:'images/gallery/photos/couple-close-8.jpg',t:'images/gallery/thumbs/couple-close-8.jpg',c:'couple-close'},
{id:33,s:'images/gallery/photos/couple-close-9.jpg',t:'images/gallery/thumbs/couple-close-9.jpg',c:'couple-close'},
{id:34,s:'images/gallery/photos/couple-far-34.JPG',t:'images/gallery/thumbs/couple-far-34.JPG',c:'couple-far'},
{id:35,s:'images/gallery/photos/couple-far-35.JPG',t:'images/gallery/thumbs/couple-far-35.JPG',c:'couple-far'},
{id:36,s:'images/gallery/photos/couple-far-36.jpg',t:'images/gallery/thumbs/couple-far-36.jpg',c:'couple-far'},
{id:37,s:'images/gallery/photos/couple-far-37.jpg',t:'images/gallery/thumbs/couple-far-37.jpg',c:'couple-far'},
{id:38,s:'images/gallery/photos/couple-far-38.jpg',t:'images/gallery/thumbs/couple-far-38.jpg',c:'couple-far'},
{id:39,s:'images/gallery/photos/couple-far-39.jpg',t:'images/gallery/thumbs/couple-far-39.jpg',c:'couple-far'},
{id:40,s:'images/gallery/photos/couple-far-40.jpg',t:'images/gallery/thumbs/couple-far-40.jpg',c:'couple-far'},
{id:41,s:'images/gallery/photos/couple-far-41.jpg',t:'images/gallery/thumbs/couple-far-41.jpg',c:'couple-far'},
{id:42,s:'images/gallery/photos/couple-far-42.jpg',t:'images/gallery/thumbs/couple-far-42.jpg',c:'couple-far'},
{id:43,s:'images/gallery/photos/couple-far-43.jpg',t:'images/gallery/thumbs/couple-far-43.jpg',c:'couple-far'},
{id:44,s:'images/gallery/photos/couple-far-44.jpg',t:'images/gallery/thumbs/couple-far-44.jpg',c:'couple-far'},
{id:45,s:'images/gallery/photos/couple-far-45.jpg',t:'images/gallery/thumbs/couple-far-45.jpg',c:'couple-far'},
{id:46,s:'images/gallery/photos/couple-far-46.jpg',t:'images/gallery/thumbs/couple-far-46.jpg',c:'couple-far'},
{id:47,s:'images/gallery/photos/couple-far-47.JPG',t:'images/gallery/thumbs/couple-far-47.JPG',c:'couple-far'},
{id:48,s:'images/gallery/photos/couple-far-48.JPG',t:'images/gallery/thumbs/couple-far-48.JPG',c:'couple-far'},
{id:49,s:'images/gallery/photos/couple-far-49.JPG',t:'images/gallery/thumbs/couple-far-49.JPG',c:'couple-far'},
{id:50,s:'images/gallery/photos/couple-far-50.JPG',t:'images/gallery/thumbs/couple-far-50.JPG',c:'couple-far'},
{id:51,s:'images/gallery/photos/couple-far-51.JPG',t:'images/gallery/thumbs/couple-far-51.JPG',c:'couple-far'},
{id:52,s:'images/gallery/photos/couple-far-52.jpg',t:'images/gallery/thumbs/couple-far-52.jpg',c:'couple-far'},
{id:53,s:'images/gallery/photos/couple-far-53.jpg',t:'images/gallery/thumbs/couple-far-53.jpg',c:'couple-far'},
{id:54,s:'images/gallery/photos/couple-far-54.jpg',t:'images/gallery/thumbs/couple-far-54.jpg',c:'couple-far'},
{id:55,s:'images/gallery/photos/couple-far-55.jpg',t:'images/gallery/thumbs/couple-far-55.jpg',c:'couple-far'},
{id:56,s:'images/gallery/photos/couple-far-56.jpg',t:'images/gallery/thumbs/couple-far-56.jpg',c:'couple-far'},
{id:57,s:'images/gallery/photos/couple-far-57.jpg',t:'images/gallery/thumbs/couple-far-57.jpg',c:'couple-far'},
{id:58,s:'images/gallery/photos/couple-far-58.jpg',t:'images/gallery/thumbs/couple-far-58.jpg',c:'couple-far'},
{id:59,s:'images/gallery/photos/couple-far-59.jpg',t:'images/gallery/thumbs/couple-far-59.jpg',c:'couple-far'},
{id:60,s:'images/gallery/photos/couple-far-60.jpg',t:'images/gallery/thumbs/couple-far-60.jpg',c:'couple-far'},
{id:61,s:'images/gallery/photos/couple-far-61.jpg',t:'images/gallery/thumbs/couple-far-61.jpg',c:'couple-far'},
{id:62,s:'images/gallery/photos/couple-far-62.jpg',t:'images/gallery/thumbs/couple-far-62.jpg',c:'couple-far'},
{id:63,s:'images/gallery/photos/couple-far-63.jpg',t:'images/gallery/thumbs/couple-far-63.jpg',c:'couple-far'},
{id:64,s:'images/gallery/photos/couple-far-64.jpg',t:'images/gallery/thumbs/couple-far-64.jpg',c:'couple-far'},
{id:65,s:'images/gallery/photos/female-close-100.jpg',t:'images/gallery/thumbs/female-close-100.jpg',c:'female-close'},
{id:66,s:'images/gallery/photos/female-close-101.jpg',t:'images/gallery/thumbs/female-close-101.jpg',c:'female-close'},
{id:67,s:'images/gallery/photos/female-close-102.jpg',t:'images/gallery/thumbs/female-close-102.jpg',c:'female-close'},
{id:68,s:'images/gallery/photos/female-close-103.jpg',t:'images/gallery/thumbs/female-close-103.jpg',c:'female-close'},
{id:69,s:'images/gallery/photos/female-close-104.jpg',t:'images/gallery/thumbs/female-close-104.jpg',c:'female-close'},
{id:70,s:'images/gallery/photos/female-close-105.jpg',t:'images/gallery/thumbs/female-close-105.jpg',c:'female-close'},
{id:71,s:'images/gallery/photos/female-close-106.jpg',t:'images/gallery/thumbs/female-close-106.jpg',c:'female-close'},
{id:72,s:'images/gallery/photos/female-close-107.jpg',t:'images/gallery/thumbs/female-close-107.jpg',c:'female-close'},
{id:73,s:'images/gallery/photos/female-close-108.jpg',t:'images/gallery/thumbs/female-close-108.jpg',c:'female-close'},
{id:74,s:'images/gallery/photos/female-close-109.jpg',t:'images/gallery/thumbs/female-close-109.jpg',c:'female-close'},
{id:75,s:'images/gallery/photos/female-close-110.jpg',t:'images/gallery/thumbs/female-close-110.jpg',c:'female-close'},
{id:76,s:'images/gallery/photos/female-close-111.jpg',t:'images/gallery/thumbs/female-close-111.jpg',c:'female-close'},
{id:77,s:'images/gallery/photos/female-close-65.jpg',t:'images/gallery/thumbs/female-close-65.jpg',c:'female-close'},
{id:78,s:'images/gallery/photos/female-close-66.jpg',t:'images/gallery/thumbs/female-close-66.jpg',c:'female-close'},
{id:79,s:'images/gallery/photos/female-close-67.jpg',t:'images/gallery/thumbs/female-close-67.jpg',c:'female-close'},
{id:80,s:'images/gallery/photos/female-close-68.JPG',t:'images/gallery/thumbs/female-close-68.JPG',c:'female-close'},
{id:81,s:'images/gallery/photos/female-close-69.jpg',t:'images/gallery/thumbs/female-close-69.jpg',c:'female-close'},
{id:82,s:'images/gallery/photos/female-close-70.jpg',t:'images/gallery/thumbs/female-close-70.jpg',c:'female-close'},
{id:83,s:'images/gallery/photos/female-close-71.jpg',t:'images/gallery/thumbs/female-close-71.jpg',c:'female-close'},
{id:84,s:'images/gallery/photos/female-close-72.jpg',t:'images/gallery/thumbs/female-close-72.jpg',c:'female-close'},
{id:85,s:'images/gallery/photos/female-close-73.jpg',t:'images/gallery/thumbs/female-close-73.jpg',c:'female-close'},
{id:86,s:'images/gallery/photos/female-close-74.jpg',t:'images/gallery/thumbs/female-close-74.jpg',c:'female-close'},
{id:87,s:'images/gallery/photos/female-close-75.jpg',t:'images/gallery/thumbs/female-close-75.jpg',c:'female-close'},
{id:88,s:'images/gallery/photos/female-close-76.jpg',t:'images/gallery/thumbs/female-close-76.jpg',c:'female-close'},
{id:89,s:'images/gallery/photos/female-close-77.jpg',t:'images/gallery/thumbs/female-close-77.jpg',c:'female-close'},
{id:90,s:'images/gallery/photos/female-close-78.jpg',t:'images/gallery/thumbs/female-close-78.jpg',c:'female-close'},
{id:91,s:'images/gallery/photos/female-close-79.jpg',t:'images/gallery/thumbs/female-close-79.jpg',c:'female-close'},
{id:92,s:'images/gallery/photos/female-close-80.jpg',t:'images/gallery/thumbs/female-close-80.jpg',c:'female-close'},
{id:93,s:'images/gallery/photos/female-close-81.jpg',t:'images/gallery/thumbs/female-close-81.jpg',c:'female-close'},
{id:94,s:'images/gallery/photos/female-close-82.jpg',t:'images/gallery/thumbs/female-close-82.jpg',c:'female-close'},
{id:95,s:'images/gallery/photos/female-close-83.jpg',t:'images/gallery/thumbs/female-close-83.jpg',c:'female-close'},
{id:96,s:'images/gallery/photos/female-close-84.jpg',t:'images/gallery/thumbs/female-close-84.jpg',c:'female-close'},
{id:97,s:'images/gallery/photos/female-close-85.JPG',t:'images/gallery/thumbs/female-close-85.JPG',c:'female-close'},
{id:98,s:'images/gallery/photos/female-close-86.jpg',t:'images/gallery/thumbs/female-close-86.jpg',c:'female-close'},
{id:99,s:'images/gallery/photos/female-close-87.jpg',t:'images/gallery/thumbs/female-close-87.jpg',c:'female-close'},
{id:100,s:'images/gallery/photos/female-close-88.jpg',t:'images/gallery/thumbs/female-close-88.jpg',c:'female-close'},
{id:101,s:'images/gallery/photos/female-close-89.jpg',t:'images/gallery/thumbs/female-close-89.jpg',c:'female-close'},
{id:102,s:'images/gallery/photos/female-close-90.jpg',t:'images/gallery/thumbs/female-close-90.jpg',c:'female-close'},
{id:103,s:'images/gallery/photos/female-close-91.jpg',t:'images/gallery/thumbs/female-close-91.jpg',c:'female-close'},
{id:104,s:'images/gallery/photos/female-close-92.jpg',t:'images/gallery/thumbs/female-close-92.jpg',c:'female-close'},
{id:105,s:'images/gallery/photos/female-close-93.JPG',t:'images/gallery/thumbs/female-close-93.JPG',c:'female-close'},
{id:106,s:'images/gallery/photos/female-close-94.jpg',t:'images/gallery/thumbs/female-close-94.jpg',c:'female-close'},
{id:107,s:'images/gallery/photos/female-close-95.jpg',t:'images/gallery/thumbs/female-close-95.jpg',c:'female-close'},
{id:108,s:'images/gallery/photos/female-close-96.jpg',t:'images/gallery/thumbs/female-close-96.jpg',c:'female-close'},
{id:109,s:'images/gallery/photos/female-close-97.jpg',t:'images/gallery/thumbs/female-close-97.jpg',c:'female-close'},
{id:110,s:'images/gallery/photos/female-close-98.JPG',t:'images/gallery/thumbs/female-close-98.JPG',c:'female-close'},
{id:111,s:'images/gallery/photos/female-close-99.jpg',t:'images/gallery/thumbs/female-close-99.jpg',c:'female-close'},
{id:112,s:'images/gallery/photos/female-far-112.jpg',t:'images/gallery/thumbs/female-far-112.jpg',c:'female-far'},
{id:113,s:'images/gallery/photos/female-far-113.jpg',t:'images/gallery/thumbs/female-far-113.jpg',c:'female-far'},
{id:114,s:'images/gallery/photos/female-far-114.jpg',t:'images/gallery/thumbs/female-far-114.jpg',c:'female-far'},
{id:115,s:'images/gallery/photos/female-far-115.jpg',t:'images/gallery/thumbs/female-far-115.jpg',c:'female-far'},
{id:116,s:'images/gallery/photos/female-far-116.jpg',t:'images/gallery/thumbs/female-far-116.jpg',c:'female-far'},
{id:117,s:'images/gallery/photos/female-far-117.jpg',t:'images/gallery/thumbs/female-far-117.jpg',c:'female-far'},
{id:118,s:'images/gallery/photos/female-far-118.jpg',t:'images/gallery/thumbs/female-far-118.jpg',c:'female-far'},
{id:119,s:'images/gallery/photos/female-far-119.jpg',t:'images/gallery/thumbs/female-far-119.jpg',c:'female-far'},
{id:120,s:'images/gallery/photos/female-far-120.JPG',t:'images/gallery/thumbs/female-far-120.JPG',c:'female-far'},
{id:121,s:'images/gallery/photos/female-far-121.JPG',t:'images/gallery/thumbs/female-far-121.JPG',c:'female-far'},
{id:122,s:'images/gallery/photos/female-far-122.JPG',t:'images/gallery/thumbs/female-far-122.JPG',c:'female-far'},
{id:123,s:'images/gallery/photos/female-far-123.JPG',t:'images/gallery/thumbs/female-far-123.JPG',c:'female-far'},
{id:124,s:'images/gallery/photos/female-far-124.JPG',t:'images/gallery/thumbs/female-far-124.JPG',c:'female-far'},
{id:125,s:'images/gallery/photos/female-far-125.JPG',t:'images/gallery/thumbs/female-far-125.JPG',c:'female-far'},
{id:126,s:'images/gallery/photos/female-far-126.JPG',t:'images/gallery/thumbs/female-far-126.JPG',c:'female-far'},
{id:127,s:'images/gallery/photos/female-far-127.JPG',t:'images/gallery/thumbs/female-far-127.JPG',c:'female-far'},
{id:128,s:'images/gallery/photos/female-far-128.JPG',t:'images/gallery/thumbs/female-far-128.JPG',c:'female-far'},
{id:129,s:'images/gallery/photos/female-far-129.jpg',t:'images/gallery/thumbs/female-far-129.jpg',c:'female-far'},
{id:130,s:'images/gallery/photos/female-far-130.jpg',t:'images/gallery/thumbs/female-far-130.jpg',c:'female-far'},
{id:131,s:'images/gallery/photos/female-far-131.jpg',t:'images/gallery/thumbs/female-far-131.jpg',c:'female-far'},
{id:132,s:'images/gallery/photos/female-far-132.jpg',t:'images/gallery/thumbs/female-far-132.jpg',c:'female-far'},
{id:133,s:'images/gallery/photos/female-far-133.JPG',t:'images/gallery/thumbs/female-far-133.JPG',c:'female-far'},
{id:134,s:'images/gallery/photos/female-far-134.JPG',t:'images/gallery/thumbs/female-far-134.JPG',c:'female-far'},
{id:135,s:'images/gallery/photos/female-far-135.JPG',t:'images/gallery/thumbs/female-far-135.JPG',c:'female-far'},
{id:136,s:'images/gallery/photos/female-far-136.JPG',t:'images/gallery/thumbs/female-far-136.JPG',c:'female-far'},
{id:137,s:'images/gallery/photos/female-far-137.jpg',t:'images/gallery/thumbs/female-far-137.jpg',c:'female-far'},
{id:138,s:'images/gallery/photos/female-far-138.jpg',t:'images/gallery/thumbs/female-far-138.jpg',c:'female-far'},
{id:139,s:'images/gallery/photos/female-far-139.jpg',t:'images/gallery/thumbs/female-far-139.jpg',c:'female-far'},
{id:140,s:'images/gallery/photos/female-far-140.jpg',t:'images/gallery/thumbs/female-far-140.jpg',c:'female-far'},
{id:141,s:'images/gallery/photos/female-far-141.jpg',t:'images/gallery/thumbs/female-far-141.jpg',c:'female-far'},
{id:142,s:'images/gallery/photos/female-far-142.jpg',t:'images/gallery/thumbs/female-far-142.jpg',c:'female-far'},
{id:143,s:'images/gallery/photos/female-far-143.jpg',t:'images/gallery/thumbs/female-far-143.jpg',c:'female-far'},
{id:144,s:'images/gallery/photos/female-far-144.jpg',t:'images/gallery/thumbs/female-far-144.jpg',c:'female-far'},
{id:145,s:'images/gallery/photos/female-far-145.jpg',t:'images/gallery/thumbs/female-far-145.jpg',c:'female-far'},
{id:146,s:'images/gallery/photos/female-far-146.jpg',t:'images/gallery/thumbs/female-far-146.jpg',c:'female-far'},
{id:147,s:'images/gallery/photos/female-far-147.jpg',t:'images/gallery/thumbs/female-far-147.jpg',c:'female-far'},
{id:148,s:'images/gallery/photos/female-far-148.jpg',t:'images/gallery/thumbs/female-far-148.jpg',c:'female-far'},
{id:149,s:'images/gallery/photos/female-far-149.jpg',t:'images/gallery/thumbs/female-far-149.jpg',c:'female-far'},
{id:150,s:'images/gallery/photos/female-far-150.jpg',t:'images/gallery/thumbs/female-far-150.jpg',c:'female-far'},
{id:151,s:'images/gallery/photos/female-far-151.jpg',t:'images/gallery/thumbs/female-far-151.jpg',c:'female-far'},
{id:152,s:'images/gallery/photos/female-far-152.jpg',t:'images/gallery/thumbs/female-far-152.jpg',c:'female-far'},
{id:153,s:'images/gallery/photos/female-far-153.jpg',t:'images/gallery/thumbs/female-far-153.jpg',c:'female-far'},
{id:154,s:'images/gallery/photos/female-far-154.jpg',t:'images/gallery/thumbs/female-far-154.jpg',c:'female-far'},
{id:155,s:'images/gallery/photos/female-far-155.jpg',t:'images/gallery/thumbs/female-far-155.jpg',c:'female-far'},
{id:156,s:'images/gallery/photos/female-far-156.jpg',t:'images/gallery/thumbs/female-far-156.jpg',c:'female-far'},
{id:157,s:'images/gallery/photos/female-far-157.jpg',t:'images/gallery/thumbs/female-far-157.jpg',c:'female-far'},
{id:158,s:'images/gallery/photos/female-far-158.jpg',t:'images/gallery/thumbs/female-far-158.jpg',c:'female-far'},
{id:159,s:'images/gallery/photos/female-far-159.jpg',t:'images/gallery/thumbs/female-far-159.jpg',c:'female-far'},
{id:160,s:'images/gallery/photos/female-far-160.jpg',t:'images/gallery/thumbs/female-far-160.jpg',c:'female-far'},
{id:161,s:'images/gallery/photos/female-far-161.jpg',t:'images/gallery/thumbs/female-far-161.jpg',c:'female-far'},
{id:162,s:'images/gallery/photos/female-far-162.jpg',t:'images/gallery/thumbs/female-far-162.jpg',c:'female-far'},
{id:163,s:'images/gallery/photos/male-163.jpg',t:'images/gallery/thumbs/male-163.jpg',c:'male'},
{id:164,s:'images/gallery/photos/male-164.jpg',t:'images/gallery/thumbs/male-164.jpg',c:'male'},
{id:165,s:'images/gallery/photos/male-165.JPG',t:'images/gallery/thumbs/male-165.JPG',c:'male'},
{id:166,s:'images/gallery/photos/male-166.jpg',t:'images/gallery/thumbs/male-166.jpg',c:'male'},
{id:167,s:'images/gallery/photos/male-167.jpg',t:'images/gallery/thumbs/male-167.jpg',c:'male'},
{id:168,s:'images/gallery/photos/male-168.jpg',t:'images/gallery/thumbs/male-168.jpg',c:'male'},
{id:169,s:'images/gallery/photos/male-169.jpg',t:'images/gallery/thumbs/male-169.jpg',c:'male'},
{id:170,s:'images/gallery/photos/male-170.jpg',t:'images/gallery/thumbs/male-170.jpg',c:'male'},
{id:171,s:'images/gallery/photos/male-171.jpg',t:'images/gallery/thumbs/male-171.jpg',c:'male'},
{id:172,s:'images/gallery/photos/male-172.jpg',t:'images/gallery/thumbs/male-172.jpg',c:'male'},
{id:173,s:'images/gallery/photos/male-173.jpg',t:'images/gallery/thumbs/male-173.jpg',c:'male'},
{id:174,s:'images/gallery/photos/male-174.jpg',t:'images/gallery/thumbs/male-174.jpg',c:'male'},
{id:175,s:'images/gallery/photos/male-175.jpg',t:'images/gallery/thumbs/male-175.jpg',c:'male'},
{id:176,s:'images/gallery/photos/male-176.JPG',t:'images/gallery/thumbs/male-176.JPG',c:'male'},
{id:177,s:'images/gallery/photos/male-177.JPG',t:'images/gallery/thumbs/male-177.JPG',c:'male'},
{id:178,s:'images/gallery/photos/male-178.jpg',t:'images/gallery/thumbs/male-178.jpg',c:'male'},
{id:179,s:'images/gallery/photos/male-179.JPG',t:'images/gallery/thumbs/male-179.JPG',c:'male'},
{id:180,s:'images/gallery/photos/male-180.jpg',t:'images/gallery/thumbs/male-180.jpg',c:'male'},
{id:181,s:'images/gallery/photos/male-181.jpg',t:'images/gallery/thumbs/male-181.jpg',c:'male'},
{id:182,s:'images/gallery/photos/male-182.jpg',t:'images/gallery/thumbs/male-182.jpg',c:'male'},
{id:183,s:'images/gallery/photos/male-183.JPG',t:'images/gallery/thumbs/male-183.JPG',c:'male'},
{id:184,s:'images/gallery/photos/male-184.JPG',t:'images/gallery/thumbs/male-184.JPG',c:'male'},
{id:185,s:'images/gallery/photos/male-185.JPG',t:'images/gallery/thumbs/male-185.JPG',c:'male'},
{id:186,s:'images/gallery/photos/male-186.JPG',t:'images/gallery/thumbs/male-186.JPG',c:'male'},
{id:187,s:'images/gallery/photos/male-187.JPG',t:'images/gallery/thumbs/male-187.JPG',c:'male'},
{id:188,s:'images/gallery/photos/male-188.JPG',t:'images/gallery/thumbs/male-188.JPG',c:'male'},
{id:189,s:'images/gallery/photos/male-189.JPG',t:'images/gallery/thumbs/male-189.JPG',c:'male'},
{id:190,s:'images/gallery/photos/male-190.JPG',t:'images/gallery/thumbs/male-190.JPG',c:'male'},
{id:191,s:'images/gallery/photos/male-191.JPG',t:'images/gallery/thumbs/male-191.JPG',c:'male'},
{id:192,s:'images/gallery/photos/male-192.JPG',t:'images/gallery/thumbs/male-192.JPG',c:'male'},
{id:193,s:'images/gallery/photos/male-193.jpg',t:'images/gallery/thumbs/male-193.jpg',c:'male'},
{id:194,s:'images/gallery/photos/male-194.jpg',t:'images/gallery/thumbs/male-194.jpg',c:'male'},
{id:195,s:'images/gallery/photos/male-195.JPG',t:'images/gallery/thumbs/male-195.JPG',c:'male'},
{id:196,s:'images/gallery/photos/male-196.JPG',t:'images/gallery/thumbs/male-196.JPG',c:'male'},
{id:197,s:'images/gallery/photos/male-197.jpg',t:'images/gallery/thumbs/male-197.jpg',c:'male'},
{id:198,s:'images/gallery/photos/male-198.jpg',t:'images/gallery/thumbs/male-198.jpg',c:'male'},
{id:199,s:'images/gallery/photos/male-199.JPG',t:'images/gallery/thumbs/male-199.JPG',c:'male'},
{id:200,s:'images/gallery/photos/male-200.jpg',t:'images/gallery/thumbs/male-200.jpg',c:'male'},
{id:201,s:'images/gallery/photos/male-201.JPG',t:'images/gallery/thumbs/male-201.JPG',c:'male'},
{id:202,s:'images/gallery/photos/male-202.JPG',t:'images/gallery/thumbs/male-202.JPG',c:'male'},
{id:203,s:'images/gallery/photos/male-203.jpg',t:'images/gallery/thumbs/male-203.jpg',c:'male'},
{id:204,s:'images/gallery/photos/male-204.jpg',t:'images/gallery/thumbs/male-204.jpg',c:'male'},
{id:205,s:'images/gallery/photos/male-205.jpg',t:'images/gallery/thumbs/male-205.jpg',c:'male'},
{id:206,s:'images/gallery/photos/male-206.JPG',t:'images/gallery/thumbs/male-206.JPG',c:'male'},
{id:207,s:'images/gallery/photos/male-207.JPG',t:'images/gallery/thumbs/male-207.JPG',c:'male'},
{id:208,s:'images/gallery/photos/male-208.JPG',t:'images/gallery/thumbs/male-208.JPG',c:'male'},
{id:209,s:'images/gallery/photos/male-209.JPG',t:'images/gallery/thumbs/male-209.JPG',c:'male'},
{id:210,s:'images/gallery/photos/male-210.JPG',t:'images/gallery/thumbs/male-210.JPG',c:'male'},
{id:211,s:'images/gallery/photos/male-211.JPG',t:'images/gallery/thumbs/male-211.JPG',c:'male'},
{id:212,s:'images/gallery/photos/male-212.JPG',t:'images/gallery/thumbs/male-212.JPG',c:'male'},
{id:213,s:'images/gallery/photos/male-213.JPG',t:'images/gallery/thumbs/male-213.JPG',c:'male'}
];
var state = { currentFilter: 'couple-close', currentStep: 1, viewerIndex: -1, filteredPhotos: [], proofData: null, galleryPage: 0 };
var GALLERY_PAGE_SIZE = 12;
var $ = function(s) { return document.querySelector(s); };
var $$ = function(s) { return document.querySelectorAll(s); };
function getCatLabel(c) { var m = { 'couple-close': '情侣近景', 'couple-far': '情侣远景', 'female-close': '女生近景', 'female-far': '女生远景', 'male': '男生特辑' }; return m[c] || c; }
function renderGallery(filter) {
  filter = filter || 'couple-close'; state.currentFilter = filter;
  var grid = $('#galleryGrid'); if (!grid) return;
  state.filteredPhotos = PHOTOS.filter(function(p) { return p.c === filter; });
  var btns = $$('.filter-btn');
  for (var i = 0; i < btns.length; i++) { btns[i].classList.toggle('active', btns[i].getAttribute('data-filter') === filter); }
  // 更新各分类计数
  var counts = { 'couple-close': 0, 'couple-far': 0, 'female-close': 0, 'female-far': 0, 'male': 0 };
  for (var j = 0; j < PHOTOS.length; j++) { var c = PHOTOS[j].c; if (counts[c] !== undefined) counts[c]++; }
  for (var k = 0; k < btns.length; k++) {
    var f = btns[k].getAttribute('data-filter'), ex = btns[k].querySelector('.count');
    if (ex) ex.remove();
    if (counts[f]) { var sp = document.createElement('span'); sp.className = 'count'; sp.textContent = counts[f]; btns[k].appendChild(sp); }
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
