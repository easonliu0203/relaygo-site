// Batch 1: Add Thai (th), Vietnamese (vi), Malay (ms) to first 2 tour guides
// 1. taipei-jiufen-shifen
// 2. sun-moon-lake
// Approach: GET current content, merge th/vi/ms, PATCH back

const SUPABASE_URL = 'https://vlyhwegpvpnjyocqmfqc.supabase.co/rest/v1';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWh3ZWdwdnBuanlvY3FtZnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODk3Nzk5NiwiZXhwIjoyMDc0NTUzOTk2fQ.nQPynfQcSIZ1QPVSjDcgscugQcEgfRPUauW0psSRTQo';

const headers = {
  apikey: KEY,
  Authorization: `Bearer ${KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

// ==========================================================================
// JIUFEN PHOTOS (same as update-jiufen-5lang.js)
// ==========================================================================
const JIUFEN_PHOTOS = {
  jiufen: {
    url: 'https://images.unsplash.com/photo-1594792780987-83273a3991dd?w=1200&q=80',
    credit: 'Nat Chen (@nat0408)',
    creditUrl: 'https://unsplash.com/@nat0408?utm_source=relaygo&utm_medium=referral',
  },
  jiufenTea: {
    url: 'https://images.unsplash.com/photo-1677628987592-c3ad2f546fef?w=1200&q=80',
    credit: 'Ricky LK (@rickyrynselo)',
    creditUrl: 'https://unsplash.com/@rickyrynselo?utm_source=relaygo&utm_medium=referral',
  },
  lantern: {
    url: 'https://images.unsplash.com/photo-1568119948624-ff9807d6be20?w=1200&q=80',
    credit: 'Bas Glaap (@basglaap)',
    creditUrl: 'https://unsplash.com/@basglaap?utm_source=relaygo&utm_medium=referral',
  },
  shifenWaterfall: {
    url: 'https://images.unsplash.com/photo-1697128212774-6777be75baca?w=1200&q=80',
    credit: 'James Virtudazo (@jamesvrtdz)',
    creditUrl: 'https://unsplash.com/@jamesvrtdz?utm_source=relaygo&utm_medium=referral',
  },
  yinyangSea: {
    url: 'https://images.unsplash.com/photo-1558251314-0164230213d4?w=1200&q=80',
    credit: 'Chromatograph (@chromatograph)',
    creditUrl: 'https://unsplash.com/@chromatograph?utm_source=relaygo&utm_medium=referral',
  },
  yinyangSea2: {
    url: 'https://images.unsplash.com/photo-1630562392536-0f203d3c9e97?w=1200&q=80',
    credit: 'Andy Kuo (@chyi826)',
    creditUrl: 'https://unsplash.com/@chyi826?utm_source=relaygo&utm_medium=referral',
  },
};

// ==========================================================================
// SUN MOON LAKE PHOTOS (same as update-sunmoonlake-5lang.js)
// ==========================================================================
const SML_PHOTOS = {
  sunmoonBoats: {
    url: 'https://images.unsplash.com/photo-1722824634219-679c9fe9aa6d?w=1200&q=80',
    credit: 'Winston Chen (@winstonchen)',
    creditUrl: 'https://unsplash.com/@winstonchen?utm_source=relaygo&utm_medium=referral',
  },
  sunmoonDock: {
    url: 'https://images.unsplash.com/photo-1605961002058-06a4606c178c?w=1200&q=80',
    credit: 'Imme (@imme)',
    creditUrl: 'https://unsplash.com/@imme?utm_source=relaygo&utm_medium=referral',
  },
  sunmoonCable: {
    url: 'https://images.unsplash.com/photo-1597773138675-521daa750435?w=1200&q=80',
    credit: 'Lisanto (@lisanto_)',
    creditUrl: 'https://unsplash.com/@lisanto_?utm_source=relaygo&utm_medium=referral',
  },
  wenwuTemple: {
    url: 'https://images.unsplash.com/photo-1600168488491-03d6c3486ab5?w=1200&q=80',
    credit: 'Lisanto (@lisanto_)',
    creditUrl: 'https://unsplash.com/@lisanto_?utm_source=relaygo&utm_medium=referral',
  },
  qingjingSheep: {
    url: 'https://images.unsplash.com/photo-1637515755087-3bbf0bc1b255?w=1200&q=80',
    credit: 'Norman Snow (@normansnow)',
    creditUrl: 'https://unsplash.com/@normansnow?utm_source=relaygo&utm_medium=referral',
  },
  qingjingMountain: {
    url: 'https://images.unsplash.com/photo-1681181573779-d4ec890f8628?w=1200&q=80',
    credit: 'Jeremy Kwok (@jxremy)',
    creditUrl: 'https://unsplash.com/@jxremy?utm_source=relaygo&utm_medium=referral',
  },
  hehuanshanRoad: {
    url: 'https://images.unsplash.com/photo-1593689952882-babc725e730e?w=1200&q=80',
    credit: 'Someus Christopher (@tofu44)',
    creditUrl: 'https://unsplash.com/@tofu44?utm_source=relaygo&utm_medium=referral',
  },
  hehuanshanPanorama: {
    url: 'https://images.unsplash.com/photo-1595162848849-d316c786e1f2?w=1200&q=80',
    credit: 'David Guenther (@daguenther)',
    creditUrl: 'https://unsplash.com/@daguenther?utm_source=relaygo&utm_medium=referral',
  },
};

function makePhotoMd(photos) {
  return function photoMd(key, alt) {
    const p = photos[key];
    return `![${alt}](${p.url})\n*📷 Photo by [${p.credit}](${p.creditUrl}) on [Unsplash](https://unsplash.com/?utm_source=relaygo&utm_medium=referral)*`;
  };
}

const jPhotoMd = makePhotoMd(JIUFEN_PHOTOS);
const sPhotoMd = makePhotoMd(SML_PHOTOS);

// ==========================================================================
// JIUFEN — Thai (th)
// ==========================================================================
const jiufenTh = `## ทำไมต้องเลือกเส้นทางนี้?

จิ่วเฟิ่น (九份) และสือเฟิ่น (十分) คือเส้นทางเช่ารถยอดนิยมอันดับหนึ่งของไต้หวันเหนือครับ ภายในวันเดียวคุณจะได้สัมผัสทั้ง "เสน่ห์เมืองเก่าบนภูเขา" และ "ความโรแมนติกริมทางรถไฟ" ออกจากไทเปแค่ชั่วโมงเดียว ระหว่างทางยังแวะชมน้ำตกทองคำและทะเลหยินหยางได้อีกด้วย เหมาะสำหรับผู้มาเยือนไต้หวันครั้งแรกครับ

## ไฮไลท์

### 🏮 ถนนเก่าจิ่วเฟิ่น — แรงบันดาลใจของสตูดิโอจิบลิ

${jPhotoMd('jiufen', 'โคมแดงและบันไดหินแห่งถนนเก่าจิ่วเฟิ่น')}

จิ่วเฟิ่นโด่งดังจากภาพยนตร์ "A City of Sadness" ตรอกหินคดเคี้ยว โคมไฟแดงแขวนตลอดทาง ร้านน้ำชาที่มองเห็นทะเล หลายคนบอกว่าที่นี่คือแรงบันดาลใจของ "Spirited Away" ของมิยาซากิ เดินบนถนนจีซาน (基山街) แล้วจะเข้าใจเลยครับ

**อาหารที่ต้องลอง：**
- **อากันอี๋ อวี่หยวน (阿柑姨芋圓)** — ร้านบัวลอยเผือกชื่อดังที่สุด นั่งกินบนยอดเขาพร้อมชมวิวทะเล
- **ไลอาโผ่ อวี่หยวน (賴阿婆芋圓)** — อีกร้านเก่าแก่ เนื้อสัมผัสต่างกันเล็กน้อย แต่ละร้านมีแฟนคลับของตัวเอง
- **อาหลาน เฉ่าจื่อกั๋ว (阿蘭草仔粿)** — ขนมข้าวเหนียวไส้เค็มและหวาน ราคาเบาๆ ของกินท้องถิ่นแท้ๆ
- **ฮู่หลี่จ่างเตอเตี้ยน (護理長的店)** — ข้าวหมูตุ๋นกับน้ำซุปลูกชิ้นปลา มื้อเที่ยงของคนท้องถิ่น

${jPhotoMd('jiufenTea', 'ร้านน้ำชาจิ่วเฟิ่น — จิบชาชมทะเลในบ้านร้อยปี')}

- **จิ่วเฟิ่นฉาฝาง (九份茶坊)** — ดื่มชาตงฟางเหม่ยเหริน (東方美人茶) ในอาคารอายุร้อยปีพร้อมวิวทะเล

**เคล็ดลับถ่ายรูป：** บันไดที่ถนนซู่ฉีลู่ (豎崎路) คือมุมถ่ายรูปคลาสสิกที่สุด แนะนำช่วงเย็นเมื่อโคมไฟเริ่มสว่าง จะได้บรรยากาศสุดๆ ครับ วันธรรมดาคนน้อยกว่ามาก ถ่ายรูปสวยได้ง่ายขึ้น

### 🎆 ถนนเก่าสือเฟิ่น — ปล่อยโคมลอยอธิษฐานบนทางรถไฟ

${jPhotoMd('lantern', 'โคมลอยสือเฟิ่น — ปล่อยโคมอธิษฐานบนทางรถไฟ')}

สิ่งพิเศษที่สุดของสือเฟิ่นคือรถไฟวิ่งผ่านกลางถนนเลยครับ การเขียนคำอธิษฐานบนโคมแล้วปล่อยขึ้นฟ้าบนทางรถไฟเป็นประสบการณ์ที่หาที่ไหนไม่ได้ในไต้หวัน มองโคมค่อยๆ ลอยสูงขึ้นไปบนท้องฟ้า เป็นความทรงจำที่ลืมไม่ลงครับ

**น่ารู้เกี่ยวกับโคมลอย：**
- โคมสีเดียว สีแดงยอดนิยมที่สุด (สัญลักษณ์แห่งความสุข)
- โคมสี่สี เขียนคำอธิษฐานต่างกันได้สี่ด้าน
- พนักงานร้านจะช่วยถ่ายรูปและจุดไฟให้ครับ

> หมายเหตุ：ก่อนปล่อยโคมอย่าลืมเช็คตารางเวลารถไฟด้วยนะครับ แม้จะมีเจ้าหน้าที่คอยเตือน แต่ระวังตัวเองไว้ปลอดภัยกว่า

### 💧 น้ำตกสือเฟิ่น — ไนแองการ่าแห่งไต้หวัน

${jPhotoMd('shifenWaterfall', 'น้ำตกสือเฟิ่น — น้ำตกแบบม่านน้ำใหญ่ที่สุดในไต้หวัน')}

น้ำตกสือเฟิ่นกว้างราว 40 เมตร สูงราว 20 เมตร เป็นน้ำตกแบบม่านน้ำที่ใหญ่ที่สุดในไต้หวัน ช่วงที่น้ำเยอะจะยิ่งดูสง่างาม ยืนบนจุดชมวิวก็รู้สึกละอองน้ำพุ่งมาถึงตัว เดินจากถนนเก่ามาถึงน้ำตกประมาณ 15-20 นาที ทางเดินราบเรียบสบายครับ

**เคล็ดลับถ่ายรูป：** จุดชมวิวด้านล่างน้ำตกเป็นมุมที่ดีที่สุด ถ่ายได้เห็นม่านน้ำเต็มๆ ฤดูฝน (พ.ค.-ก.ย.) น้ำเยอะสุดสวยสุด เตรียมถุงกันน้ำสำหรับมือถือไว้ด้วยนะครับ ละอองน้ำเยอะมาก

### ✨ น้ำตกทองคำ & ทะเลหยินหยาง — จานสีของธรรมชาติ

${jPhotoMd('yinyangSea', 'ทะเลหยินหยาง — จุดที่สีทองมาบรรจบกับสีน้ำเงินเข้ม')}

น้ำตกทองคำมีสีเหลืองทองเพราะแร่ธาตุออกซิไดซ์ เปล่งประกายระยิบระยับภายใต้แสงแดด ส่วนทะเลหยินหยางที่อยู่ใกล้กันเกิดจากน้ำแร่กรดไหลลงทะเล ทำให้ครึ่งหนึ่งเป็นสีทองและอีกครึ่งเป็นสีน้ำเงินเข้ม จอดรถข้างทางก็ชมได้เลยครับ ไม่ต้องเดินเยอะ

${jPhotoMd('yinyangSea2', 'มุมมองจากบนเขา — พาโนรามาทะเลหยินหยาง')}

**เคล็ดลับถ่ายรูป：** น้ำตกทองคำจะเปล่งประกายสวยที่สุดตอนแดดส่องตรงช่วงบ่าย จุดชมวิวทะเลหยินหยางที่ดีที่สุดอยู่บนที่สูงข้างลานจอดรถสุ่ยหนานต้ง (水湳洞) ถ่ายได้ทั้งเส้นแบ่งสีทองกับสีน้ำเงินในรูปเดียวครับ

## แผนการเดินทางแนะนำ

### ช่วงเช้า — ปล่อยโคมลอยที่สือเฟิ่น
1. **09:00** ออกจากโรงแรมในไทเป
2. **10:00** ถึงถนนเก่าสือเฟิ่น เลือกร้าน เขียนคำอธิษฐาน ปล่อยโคม (ราว 45 นาที)
3. **10:50** เดินไปน้ำตกสือเฟิ่น (ทางเดินราว 15 นาที)
4. **11:10** ชมน้ำตก ถ่ายรูป (ราว 40 นาที)

### ช่วงบ่าย — สำรวจจิ่วเฟิ่น
5. **12:00** ขับรถไปจิ่วเฟิ่น (ราว 30 นาที)
6. **12:30** อาหารกลางวัน — กินของอร่อยตามถนนเก่าจิ่วเฟิ่น
7. **13:30** เดินเที่ยวถนนจีซาน ซู่ฉีลู่ โรงหนังเซิงผิง (ราว 2 ชม.)
8. **15:30** นั่งจิบชาชมทะเล (แนะนำจิ่วเฟิ่นฉาฝางหรืออาเหมยฉาโหลว)

### ช่วงเย็น — มหัศจรรย์ธรรมชาติ
9. **16:15** ขับรถไปน้ำตกทองคำ (5 นาที แวะราว 15 นาที)
10. **16:40** จุดชมวิวทะเลหยินหยาง (ราว 10 นาที)
11. **17:00** กลับไทเป (ราว 1-1.5 ชม.)

## เคล็ดลับที่เป็นประโยชน์

- **ฤดูที่ดีที่สุด**：ไปได้ตลอดปี แต่ฤดูใบไม้ร่วง-หนาว (ต.ค.-ธ.ค.) บรรยากาศดีที่สุด หมอกปกคลุมเมืองบนเขาสวยมากครับ
- **หลีกเลี่ยงฝูงชน**：วันธรรมดาคนน้อยกว่ามาก วันหยุดควรออกก่อน 9 โมงเช้า
- **การแต่งตัว**：ใส่รองเท้าเดินสบาย จิ่วเฟิ่นเป็นบันไดทั้งหมด บนเขาเย็นกว่าพื้นราบ 3-5 องศา เตรียมเสื้อแจ็คเก็ตบางไว้
- **ร่มจำเป็น**：จิ่วเฟิ่นฝนตกบ่อยตลอดปี โดยเฉพาะช่วงลมมรสุมตะวันออกเฉียงเหนือ ต้องพกร่มหรือเสื้อกันฝนครับ
- **เวลาถ่ายรูปดีสุด**：บันไดซู่ฉีลู่สวยที่สุดช่วง 16:30-17:30 ตอนฟ้าเริ่มมืดและโคมไฟเริ่มสว่าง`;

// ==========================================================================
// JIUFEN — Vietnamese (vi)
// ==========================================================================
const jiufenVi = `## Vì sao nên chọn tuyến này?

Cửu Phần (九份) và Thập Phần (十分) là tuyến xe bao trọn gói nổi tiếng nhất Bắc Đài Loan. Chỉ trong một ngày, bạn sẽ được trải nghiệm cả "phố cổ trên núi" lẫn "sự lãng mạn đường sắt." Từ Đài Bắc đi chỉ khoảng 1 tiếng, dọc đường còn ghé Thác Vàng và Biển Âm Dương — tuyến đường lý tưởng cho lần đầu đến Đài Loan.

## Điểm nổi bật

### 🏮 Phố cổ Cửu Phần — Nguồn cảm hứng của Studio Ghibli

${jPhotoMd('jiufen', 'Đèn lồng đỏ và bậc đá phố cổ Cửu Phần')}

Cửu Phần nổi tiếng nhờ bộ phim "A City of Sadness." Những con hẻm đá quanh co, đèn lồng đỏ treo khắp nơi, quán trà nhìn ra biển — nhiều người nói đây là nguồn cảm hứng cho "Spirited Away" của Miyazaki. Đi dạo trên phố Cơ Sơn (基山街) bạn sẽ hiểu ngay.

**Món ăn nhất định phải thử：**
- **A Cam Di Vu Viên (阿柑姨芋圓)** — Quán chè khoai môn nổi tiếng nhất, ngồi trên đỉnh núi vừa ăn vừa ngắm biển
- **Lại A Bà Vu Viên (賴阿婆芋圓)** — Quán lâu đời khác, vị hơi khác một chút, mỗi quán có fan riêng
- **A Lan Thảo Tử Quả (阿蘭草仔粿)** — Bánh gạo nếp nhân mặn và ngọt, ăn vặt dân dã giá bình dân
- **Hộ Lý Trưởng Đích Điếm (護理長的店)** — Cơm thịt kho với canh cá viên, bữa trưa bình dân của người địa phương

${jPhotoMd('jiufenTea', 'Quán trà Cửu Phần — Thưởng trà ngắm biển trong ngôi nhà trăm năm')}

- **Cửu Phần Trà Phường (九份茶坊)** — Thưởng thức trà Đông Phương Mỹ Nhân trong tòa nhà trăm năm tuổi

**Mẹo chụp ảnh：** Bậc thang ở Thụ Kỳ Lộ (豎崎路) là góc chụp kinh điển nhất. Nên đến lúc chiều tối khi đèn lồng bắt đầu sáng, không khí sẽ rất đẹp. Ngày thường ít người hơn nhiều, dễ chụp được ảnh đẹp.

### 🎆 Phố cổ Thập Phần — Thả đèn trời trên đường ray xe lửa

${jPhotoMd('lantern', 'Đèn trời Thập Phần — Thả đèn ước nguyện bay lên trời')}

Điều đặc biệt nhất ở Thập Phần là xe lửa chạy xuyên qua giữa phố. Viết điều ước lên đèn trời rồi thả trên đường ray — đây là trải nghiệm độc nhất vô nhị ở Đài Loan. Nhìn chiếc đèn từ từ bay lên bầu trời mang theo ước nguyện của bạn, đó là kỷ niệm khó quên nhất.

**Kiến thức về đèn trời：**
- Đèn đơn sắc: đỏ được yêu thích nhất (tượng trưng cho hạnh phúc)
- Đèn bốn màu: viết điều ước khác nhau trên bốn mặt
- Nhân viên cửa hàng sẽ giúp chụp ảnh và đốt đèn

> Lưu ý：Trước khi thả đèn nhớ kiểm tra lịch tàu! Dù có nhân viên nhắc nhở nhưng tự chú ý vẫn an toàn hơn.

### 💧 Thác Thập Phần — Niagara của Đài Loan

${jPhotoMd('shifenWaterfall', 'Thác Thập Phần — Thác dạng rèm lớn nhất Đài Loan')}

Thác Thập Phần rộng khoảng 40 mét, cao khoảng 20 mét, là thác dạng rèm lớn nhất Đài Loan. Khi nước lớn rất hùng vĩ, đứng trên đài quan sát cảm nhận được hơi nước phả vào mặt. Từ phố cổ đi bộ đến thác khoảng 15-20 phút, đường bằng phẳng dễ đi.

**Mẹo chụp ảnh：** Đài quan sát phía dưới thác là vị trí chụp tốt nhất, chụp được toàn cảnh rèm nước. Mùa mưa (tháng 5-9) nước nhiều nhất, hùng vĩ nhất. Nên mang túi chống nước cho điện thoại vì hơi nước rất nhiều.

### ✨ Thác Vàng & Biển Âm Dương — Bảng màu của thiên nhiên

${jPhotoMd('yinyangSea', 'Biển Âm Dương — Nơi vàng kim gặp xanh thẳm')}

Thác Vàng có màu vàng óng nhờ khoáng chất bị oxy hóa, lấp lánh dưới ánh nắng. Biển Âm Dương gần đó hình thành do nước khoáng axit chảy ra biển, tạo nên cảnh tượng kỳ lạ nửa vàng nửa xanh. Hai điểm này rất gần nhau, đậu xe bên đường là ngắm được ngay.

${jPhotoMd('yinyangSea2', 'Toàn cảnh Biển Âm Dương từ trên cao')}

**Mẹo chụp ảnh：** Thác Vàng đẹp nhất lúc nắng chiều chiếu thẳng, vàng rực rỡ. Điểm ngắm Biển Âm Dương tốt nhất ở chỗ cao cạnh bãi đậu xe Thủy Nam Động (水湳洞), chụp được cả đường phân chia vàng-xanh trong một tấm.

## Lịch trình gợi ý

### Buổi sáng — Thả đèn trời ở Thập Phần
1. **09:00** Khởi hành từ khách sạn Đài Bắc
2. **10:00** Đến phố cổ Thập Phần, chọn quán, viết điều ước, thả đèn (khoảng 45 phút)
3. **10:50** Đi bộ đến Thác Thập Phần (khoảng 15 phút)
4. **11:10** Ngắm thác, chụp ảnh (khoảng 40 phút)

### Buổi chiều — Khám phá Cửu Phần
5. **12:00** Lái xe đến Cửu Phần (khoảng 30 phút)
6. **12:30** Ăn trưa — Thưởng thức ẩm thực phố cổ Cửu Phần
7. **13:30** Dạo phố Cơ Sơn, Thụ Kỳ Lộ, Rạp Thăng Bình (khoảng 2 tiếng)
8. **15:30** Uống trà ngắm biển (gợi ý Cửu Phần Trà Phường hoặc A Muội Trà Lâu)

### Buổi chiều tối — Kỳ quan thiên nhiên
9. **16:15** Lái xe đến Thác Vàng (5 phút, dừng khoảng 15 phút)
10. **16:40** Đài quan sát Biển Âm Dương (khoảng 10 phút)
11. **17:00** Về Đài Bắc (khoảng 1-1,5 tiếng)

## Mẹo hữu ích

- **Mùa đẹp nhất**：Quanh năm đều được, nhưng thu-đông (tháng 10-12) có sương mù bao phủ phố núi, rất đẹp
- **Tránh đông đúc**：Ngày thường vắng hơn nhiều. Cuối tuần nên đi trước 9 giờ sáng
- **Trang phục**：Mang giày đi bộ thoải mái — Cửu Phần toàn bậc thang. Trên núi mát hơn 3-5 độ, mang theo áo khoác mỏng
- **Mang ô**：Cửu Phần mưa quanh năm, nhất là mùa gió mùa đông bắc. Nhất định phải mang ô hoặc áo mưa
- **Giờ chụp ảnh đẹp nhất**：Bậc thang Thụ Kỳ Lộ đẹp nhất lúc 16:30-17:30, khi trời tối dần và đèn lồng bắt đầu sáng`;

// ==========================================================================
// JIUFEN — Malay (ms)
// ==========================================================================
const jiufenMs = `## Kenapa Pilih Laluan Ini?

Jiufen (九份) dan Shifen (十分) merupakan laluan cater kereta paling popular di Taiwan utara. Dalam satu hari sahaja, anda boleh menikmati "pesona bandar lama di pergunungan" dan "romantik landasan kereta api." Hanya sejam dari Taipei, laluan ini turut merangkumi Air Terjun Emas dan Laut Yin-Yang — sesuai untuk pelawat kali pertama ke Taiwan.

## Tarikan Utama

### 🏮 Pekan Lama Jiufen — Inspirasi Studio Ghibli

${jPhotoMd('jiufen', 'Tanglung merah dan tangga batu Pekan Lama Jiufen')}

Jiufen menjadi terkenal melalui filem "A City of Sadness." Lorong-lorong batu yang berliku, tanglung merah tergantung di mana-mana, kedai teh menghadap lautan — ramai yang percaya tempat ini menjadi inspirasi "Spirited Away" karya Miyazaki. Berjalan di sepanjang Jalan Jishan (基山街) dan anda akan faham sendiri.

**Makanan Wajib Cuba：**
- **Ah-Gan Auntie Taro Balls (阿柑姨芋圓)** — Kedai kuih keladi paling terkenal, makan di puncak bukit sambil memandang laut
- **Grandma Lai's Taro Balls (賴阿婆芋圓)** — Kedai lama yang lain, teksturnya sedikit berbeza, masing-masing ada peminat
- **Ah-Lan Grass Cake (阿蘭草仔粿)** — Kuih pulut inti masin dan manis, snek tempatan murah dan sedap
- **Nurse's Shop (護理長的店)** — Nasi daging rebus dengan sup bebola ikan, pilihan makan tengah hari penduduk tempatan

${jPhotoMd('jiufenTea', 'Kedai teh Jiufen — menikmati teh sambil memandang laut dalam bangunan berusia seratus tahun')}

- **Jiufen Teahouse (九份茶坊)** — Nikmati teh Oriental Beauty dalam bangunan berusia seratus tahun dengan pemandangan laut

**Tips Fotografi：** Tangga di Shuqi Road (豎崎路) adalah sudut paling ikonik. Disyorkan pada waktu petang apabila tanglung mula menyala untuk suasana terbaik. Hari biasa lebih kurang pengunjung, lebih mudah mendapat gambar yang cantik.

### 🎆 Pekan Lama Shifen — Melepaskan Tanglung ke Langit di Atas Landasan

${jPhotoMd('lantern', 'Tanglung langit Shifen — terbang membawa harapan')}

Keistimewaan Shifen ialah kereta api melalui tengah-tengah pekan. Menulis hasrat di tanglung langit dan melepaskannya di atas landasan kereta api merupakan pengalaman unik yang hanya ada di Taiwan. Melihat tanglung perlahan-lahan naik ke langit membawa impian anda — sungguh kenangan yang tidak dapat dilupakan.

**Panduan Tanglung Langit：**
- Tanglung satu warna: merah paling popular (melambangkan kebahagiaan)
- Tanglung empat warna: tulis hasrat berbeza pada setiap sisi
- Kakitangan kedai akan membantu mengambil gambar dan menyalakan tanglung

> Peringatan：Sebelum melepaskan tanglung, pastikan anda semak jadual kereta api! Walaupun ada petugas yang memberi amaran, lebih selamat jika anda sendiri berjaga-jaga.

### 💧 Air Terjun Shifen — Niagara Taiwan

${jPhotoMd('shifenWaterfall', 'Air Terjun Shifen — air terjun jenis tirai terbesar di Taiwan')}

Air Terjun Shifen selebar kira-kira 40 meter dengan ketinggian 20 meter, menjadikannya air terjun jenis tirai terbesar di Taiwan. Ketika air deras, pemandangannya sangat mengagumkan dan anda boleh merasakan kabus air dari pelantar pemerhatian. Kira-kira 15-20 minit berjalan kaki dari pekan lama, laluan rata dan mudah.

**Tips Fotografi：** Pelantar bawah memberikan sudut terbaik untuk menangkap keseluruhan tirai air terjun. Musim hujan (Mei-Sep) menawarkan jumlah air paling banyak dan paling menakjubkan. Bawa beg kalis air kerana kabus sangat tebal.

### ✨ Air Terjun Emas & Laut Yin-Yang — Palet Warna Alam Semula Jadi

${jPhotoMd('yinyangSea', 'Laut Yin-Yang — pertemuan emas dan biru tua')}

Air Terjun Emas mendapat warnanya daripada pengoksidaan mineral, menghasilkan aliran air keemasan yang berkilauan di bawah cahaya matahari. Berdekatan, Laut Yin-Yang menunjukkan pemisahan dramatik antara air keemasan-coklat dan biru tua di mana aliran air kaya mineral bertemu lautan.

${jPhotoMd('yinyangSea2', 'Pemandangan panorama Laut Yin-Yang dari atas')}

**Tips Fotografi：** Air Terjun Emas paling bersinar di bawah cahaya matahari petang. Untuk Laut Yin-Yang, titik pandang tinggi berhampiran tempat letak kereta Shuinandong (水湳洞) menangkap garis pemisah warna emas dan biru dengan sempurna.

## Cadangan Jadual Perjalanan

### Pagi — Tanglung Langit di Shifen
1. **09:00** Bertolak dari hotel di Taipei
2. **10:00** Pekan Lama Shifen — pilih kedai, tulis hasrat, lepaskan tanglung (~45 min)
3. **10:50** Berjalan ke Air Terjun Shifen (~15 min)
4. **11:10** Nikmati pemandangan air terjun (~40 min)

### Tengah Hari — Meneroka Jiufen
5. **12:00** Memandu ke Jiufen (~30 min)
6. **12:30** Makan tengah hari di Pekan Lama Jiufen
7. **13:30** Meneroka Jalan Jishan, Shuqi Road, Panggung Shengping (~2 jam)
8. **15:30** Minum teh petang dengan pemandangan laut

### Petang — Keajaiban Alam
9. **16:15** Air Terjun Emas (5 min pemanduan, ~15 min berhenti)
10. **16:40** Titik pandang Laut Yin-Yang (~10 min)
11. **17:00** Pulang ke Taipei (~1-1.5 jam)

## Tips Praktikal

- **Musim Terbaik**：Sepanjang tahun, tetapi musim luruh/sejuk (Okt-Dis) paling bersuasana dengan kabus menyelubungi bandar pergunungan
- **Elak Kesesakan**：Hari biasa jauh lebih sunyi; hujung minggu disyorkan bertolak sebelum 9 pagi
- **Pakaian**：Kasut selesa — Jiufen penuh tangga. Bawa jaket nipis, suhu lebih rendah 3-5°C berbanding Taipei
- **Bawa Payung**：Jiufen sering hujan sepanjang tahun, terutama musim monsun timur laut. Wajib bawa payung atau baju hujan
- **Masa Foto Terbaik**：Tangga Shuqi Road paling cantik pada pukul 4:30-5:30 petang apabila tanglung menyala`;

// ==========================================================================
// SUN MOON LAKE — Thai (th)
// ==========================================================================
const smlTh = `## ทำไมต้องเลือกเส้นทางนี้?

ทะเลสาบสุริยันจันทรา (日月潭) และฟาร์มชิงจิ้ง (清境農場) คือสองสถานที่ท่องเที่ยวเด่นที่สุดของไต้หวันตอนกลางครับ ทะเลสาบสุริยันจันทราได้รับเลือกจาก National Geographic ให้เป็นหนึ่งในเส้นทางปั่นจักรยานที่สวยที่สุดในโลก ส่วนฟาร์มชิงจิ้งมีทุ่งหญ้าบนเขาสูงจนได้รับฉายาว่า "สวิตเซอร์แลนด์น้อยของไต้หวัน" ทริป 2 วัน 1 คืนนี้จะพาคุณจากริมทะเลสาบสู่ยอดเขา สัมผัสความยิ่งใหญ่และความสงบของไต้หวันตอนกลางอย่างเต็มที่ครับ

## ไฮไลท์

### 🌊 ทะเลสาบสุริยันจันทรา — อัญมณีแห่งไต้หวัน

${sPhotoMd('sunmoonBoats', 'ทะเลสาบสุริยันจันทรา — เรือกลางสายหมอกยามเช้า')}

ทะเลสาบสุริยันจันทราอยู่สูง 748 เมตร เป็นทะเลสาบธรรมชาติที่ใหญ่ที่สุดในไต้หวัน เกาะลาลู่แบ่งทะเลสาบเป็นฝั่ง "สุริยัน" กับ "จันทรา" จึงได้ชื่อนี้ ยามเช้าหมอกบางๆ ปกคลุมผิวน้ำราวกระจก สวยมากครับ

**วิธีเที่ยว：**
- **เรือล่องทะเลสาบ**：วนรับ-ส่งสามท่าเรือ (สุ่ยเชอ→เสวียนกวงซื่อ→อี้ต๋าเชา) เที่ยวถี่
- **ปั่นจักรยานรอบทะเลสาบ**：ระยะทางราว 30 กม. ช่วง "เซียงซาน" ได้รับเลือกจาก CNN ว่าสวยที่สุดในโลก
- **SUP พายยืน**：กิจกรรมสุดฮิตบนทะเลสาบในช่วงไม่กี่ปีมานี้

${sPhotoMd('sunmoonDock', 'ท่าเรือทะเลสาบสุริยันจันทรา — ช่วงเวลาพักผ่อนริมน้ำ')}

**อาหารท้องถิ่น：**
- **ถนนอาหารอี้ต๋าเชา (伊達邵美食街)** — กั๋วเปา ไส้กรอกหมูป่า ขนมโมจิข้าวฟ่าง ไข่ชาแดง
- **ชาแดงทะเลสาบสุริยันจันทรา** — แหล่งผลิตชาอัสสัมคุณภาพสูงสุดของไต้หวัน แนะนำไถฉา 18 "หงอวี้ (紅玉)" มีกลิ่นมิ้นท์และอบเชยอ่อนๆ
- **ปลาประธานาธิบดี (總統魚)** — ปลาเฉพาะถิ่นที่ประธานาธิบดีเจียงจิงกว๋อชอบ จึงได้ชื่อนี้

**สถานที่ลับ：**
- **ศูนย์บริการนักท่องเที่ยวเซียงซาน (向山遊客中心)** — ออกแบบโดยสถาปนิกญี่ปุ่น ตัวอาคารคอนกรีตเปลือยสวยงามเป็นงานศิลป์
- **โรงชาเก่าทะเลสาบสุริยันจันทรา (日月老茶廠)** — โรงชาร้อยปีที่ปรับปรุงใหม่ เข้าฟรี ชิมชาซื้อชาได้
- **เส้นทางเดินป่าเมาหลานซาน (猫囒山步道)** — ทางเดินเบาๆ ผ่านไร่ชา ยอดเขามองทะเลสาบได้ 360 องศา

**เคล็ดลับถ่ายรูป：** ช่วง 6:00-7:00 เช้าเป็นเวลาที่สวยที่สุด หมอกเช้าปกคลุมผิวน้ำกับเงาเทือกเขาไกลๆ จุดชมวิวยื่นออกไปที่ศูนย์บริการเซียงซานเป็นมุมถ่ายรูปดีที่สุดครับ

### ⛩️ วัดเหวินอู่ (文武廟) — วัดริมทะเลสาบที่มองจากที่สูง

${sPhotoMd('wenwuTemple', 'วัดเหวินอู่ — วัดงดงามเบื้องบนทะเลสาบสุริยันจันทรา')}

วัดเหวินอู่ตั้งอยู่บนเนินเขาทางเหนือของทะเลสาบ เป็นวัดแห่งเดียวในไต้หวันที่เปิดประตูมาก็เห็นทะเลสาบทันที โถงทองอร่ามกับผืนน้ำมรกตของทะเลสาบเป็นภาพที่ยิ่งใหญ่มาก บันได 365 ขั้น "เหนียนถี" ด้านหน้า แต่ละขั้นจารึกวันที่ต่างกัน หาขั้นวันเกิดตัวเองแล้วถ่ายรูปเป็นสิ่งที่ต้องทำครับ

### 🐑 ฟาร์มชิงจิ้ง (清境農場) — สวิตเซอร์แลนด์น้อยของไต้หวัน

${sPhotoMd('qingjingSheep', 'ฟาร์มชิงจิ้ง — แกะเดินเล่นบนทุ่งหญ้าเขียว')}

ฟาร์มชิงจิ้งตั้งอยู่บนเขาสูง 1,700-2,000 เมตร ทุ่งหญ้าเขียวกว้างใหญ่ แกะเดินเล่นอย่างสบายใจ เทือกเขาส่วนกลางเป็นฉากหลัง บวกกับทะเลเมฆที่ปรากฏบ่อยๆ รู้สึกเหมือนอยู่ยุโรปจริงๆ ครับ

**ต้องดู：**
- **โชว์แกะ** (เสาร์-อาทิตย์ 09:30/14:30) — คนเลี้ยงแกะชาวนิวซีแลนด์สาธิตการตัดขนแกะ สนุกมาก
- **ทางเดินลอยฟ้า (天空步道)** — ทางเดินยกสูง 1.6 กม. มองเทือกเขาส่วนกลางจากความสูง 1,700 เมตร
- **คฤหาสน์โอลด์อิงแลนด์ (老英格蘭莊園)** — ไม่ได้พักก็เข้าชมล็อบบี้ได้ สถาปัตยกรรมปราสาทยุโรปสวยมาก

${sPhotoMd('qingjingMountain', 'มองเทือกเขาส่วนกลางจากฟาร์มชิงจิ้ง — ทะเลเมฆอันยิ่งใหญ่')}

**ชมดาว：** ชิงจิ้งมีมลพิษทางแสงน้อย อยู่สูง เป็นหนึ่งในจุดชมดาวที่ดีที่สุดในไต้หวัน ทางช้างเผือกช่วงฤดูร้อนงดงามเป็นพิเศษ อย่าลืมเอาเสื้อแจ็คเก็ตไปด้วยนะครับ

**เคล็ดลับถ่ายรูป：** ก่อน 10:00 เช้า แสงบนทุ่งหญ้านุ่มนวลที่สุด เหมาะกับถ่ายฝูงแกะ ช่วงเย็นทะเลเมฆสวยที่สุด บนทางเดินลอยฟ้าเป็นจุดชมวิวดีที่สุดครับ

### 🏔️ เขาเหอฮวน (合歡山) — แนะนำเพิ่มเติม

${sPhotoMd('hehuanshanRoad', 'ถนนบนเขาเหอฮวน — ขับรถฝ่าหมอกบนเขาสูง')}

ถ้ามีเวลา จากชิงจิ้งขับรถขึ้นไปอีกราว 40 นาทีก็ถึงอู่หลิ่ง (武嶺) — จุดสูงสุดของถนนในไต้หวัน สูง 3,275 เมตร ยืนบนลานจอดรถมองลงไป เห็นเทือกเขาซ้อนๆ กับทะเลเมฆ วันฟ้าใสมองเห็นถึงมหาสมุทรแปซิฟิกครับ

${sPhotoMd('hehuanshanPanorama', 'ยอดเขาเหอฮวน — หลังคาของไต้หวัน')}

**เคล็ดลับถ่ายรูป：** ลานจอดรถอู่หลิ่งคือจุดชมวิวที่ดีที่สุด พระอาทิตย์ขึ้นตอนเช้าและทะเลเมฆตอนเย็นเป็นช่วงเวลาถ่ายรูปดีที่สุด ฤดูหนาวถ้ามีหิมะตก ยอดเขาปกคลุมหิมะกับฟ้าครามเป็นภาพหาดูยากในไต้หวันครับ

> หมายเหตุ：เขาเหอฮวานอยู่สูงมาก บางคนอาจมีอาการแพ้ความสูงเล็กน้อย (เวียนศีรษะ ปวดหัว) แนะนำเดินช้าๆ ดื่มน้ำมากๆ ฤดูหนาวอู่หลิ่งอาจมีหิมะ ตรวจสอบสภาพถนนก่อนเดินทางนะครับ

## แผนการเดินทางแนะนำ

### วันที่ 1 — ทะเลสาบสุริยันจันทรา

1. **08:00** ออกจากไทเป/ไถจง (จากไถจงราว 1.5 ชม. จากไทเปราว 3.5 ชม.)
2. **10:00** ศูนย์บริการเซียงซาน ปั่นจักรยานรอบทะเลสาบ (ราว 1.5 ชม.)
3. **11:30** นั่งเรือไปเสวียนกวงซื่อ (ลองไข่ใบชาอาโพ่)
4. **12:30** ถนนอาหารอี้ต๋าเชา กินมื้อเที่ยง
5. **14:00** วัดเหวินอู่ (หาบันไดวันเกิดตัวเองถ่ายรูป)
6. **15:00** โรงชาเก่าทะเลสาบสุริยันจันทรา (ชิมชา ซื้อของฝาก)
7. **16:30** เช็คอินโรงแรมริมทะเลสาบ
8. **เย็น** เดินเล่นริมทะเลสาบชมพระอาทิตย์ตก

### วันที่ 2 — ชิงจิ้ง

1. **08:30** เช็คเอาท์ ไปชิงจิ้ง (ราว 1.5 ชม.)
2. **10:00** ทุ่งหญ้าชิงชิง เดินเล่น เล่นกับแกะ ดูโชว์แกะ
3. **11:30** ทางเดินลอยฟ้า (ชมเทือกเขาส่วนกลาง)
4. **12:30** อาหารกลางวัน — แนะนำชิงจิ้งอวิ๋นอู่โหลวหรือเห่าจีพอ
5. **13:30** สวนสวิสน้อย (สวนสไตล์ยุโรป)
6. **14:30** เดินทางกลับ (หรือเพิ่มเขาเหอฮวนอู่หลิ่ง +1.5 ชม.)
7. **17:00-18:00** ถึงไถจง/ไทเป

## เคล็ดลับที่เป็นประโยชน์

- **ฤดูที่ดีที่สุด**：ฤดูใบไม้ร่วง-หนาว (ต.ค.-ก.พ.) อากาศเย็นสบาย ทะเลเมฆมีโอกาสเห็นสูง ฤดูใบไม้ผลิ (มี.ค.-เม.ย.) ชิงจิ้งมีซากุระ
- **การแต่งตัว**：ชิงจิ้งเย็นกว่าพื้นราบ 10 องศาขึ้นไป ฤดูหนาวอาจใกล้ 0 องศา ต้องเตรียมเสื้อกันหนาวหนาๆ ริมทะเลสาบสุริยันจันทราเช้าเย็นเย็นนิดหน่อย เสื้อแจ็คเก็ตบางพอครับ
- **หลีกเลี่ยงวันหยุด**：ชิงจิ้งวันหยุดคนเยอะมาก แนะนำไปวันธรรมดา
- **เช่าจักรยาน**：ข้างศูนย์บริการเซียงซานมีร้านเช่าหลายร้าน จักรยานไฟฟ้าสบายที่สุด
- **แนะนำเพิ่ม**：ถ้ามีเวลา ขึ้นอู่หลิ่ง (จุดสูงสุดถนนไต้หวัน 3,275 ม.) จากชิงจิ้งขับราว 40 นาที`;

// ==========================================================================
// SUN MOON LAKE — Vietnamese (vi)
// ==========================================================================
const smlVi = `## Vì sao nên chọn tuyến này?

Hồ Nhật Nguyệt (日月潭) và Nông trại Thanh Cảnh (清境農場) là hai điểm đến tiêu biểu nhất miền Trung Đài Loan. Hồ Nhật Nguyệt được National Geographic bình chọn là một trong những tuyến đạp xe đẹp nhất thế giới, còn đồng cỏ trên cao của Thanh Cảnh được mệnh danh "Thụy Sĩ thu nhỏ của Đài Loan." Hành trình 2 ngày 1 đêm đưa bạn từ bờ hồ lên đỉnh núi, trọn vẹn vẻ đẹp miền Trung.

## Điểm nổi bật

### 🌊 Hồ Nhật Nguyệt — Viên ngọc của Đài Loan

${sPhotoMd('sunmoonBoats', 'Hồ Nhật Nguyệt — thuyền nhỏ trong sương sớm')}

Nằm ở độ cao 748 mét, Hồ Nhật Nguyệt là hồ tự nhiên lớn nhất Đài Loan. Đảo Lalu chia hồ thành phần "Nhật" và phần "Nguyệt," vì thế mà có tên gọi này. Buổi sáng sớm sương mờ phủ mặt hồ như gương — thiên đường cho người yêu nhiếp ảnh.

**Cách khám phá：**
- **Tàu du hồ**：Nối ba bến tàu (Thủy Xã → Huyền Quang Tự → Y Đạt Thiệu), chuyến dày đặc
- **Đạp xe quanh hồ**：Tổng cộng khoảng 30 km, đoạn Hướng Sơn được CNN bình chọn đẹp nhất thế giới
- **SUP chèo đứng**：Hoạt động thời thượng nhất trên hồ mấy năm gần đây

${sPhotoMd('sunmoonDock', 'Bến tàu Hồ Nhật Nguyệt — khoảnh khắc bình yên bên mặt nước')}

**Ẩm thực địa phương：**
- **Phố ăn Y Đạt Thiệu (伊達邵美食街)** — Bánh bao kẹp, xúc xích heo rừng, bánh dày kê, trứng trà đen
- **Trà đen Hồ Nhật Nguyệt** — Vùng trà Assam hảo hạng nhất Đài Loan. Nên thử Hồng Ngọc (台茶18號 "紅玉") với hương bạc hà và quế thoang thoảng
- **Cá Tổng Thống (總統魚)** — Loài cá đặc hữu, được đặt tên vì cựu Tổng thống Tưởng Kinh Quốc ưa thích

**Điểm ẩn giấu：**
- **Trung tâm du khách Hướng Sơn (向山遊客中心)** — Do kiến trúc sư Nhật Bản thiết kế, tòa nhà bê tông trần bản thân đã là tác phẩm nghệ thuật
- **Xưởng trà cổ Nhật Nguyệt (日月老茶廠)** — Xưởng trà trăm năm cải tạo, vào cửa miễn phí, nếm trà mua trà
- **Đường mòn Māo Lán Sơn (猫囒山步道)** — Đường đi bộ nhẹ nhàng qua vườn trà, đỉnh núi ngắm toàn cảnh hồ 360 độ

**Mẹo chụp ảnh：** 6:00-7:00 sáng là thời khắc đẹp nhất, sương mờ trên mặt hồ cùng bóng núi xa xa. Đài quan sát nhô ra ở Trung tâm Hướng Sơn là góc chụp đẹp nhất.

### ⛩️ Miếu Văn Vũ (文武廟) — Ngôi miếu nhìn xuống hồ

${sPhotoMd('wenwuTemple', 'Miếu Văn Vũ — ngôi miếu hùng vĩ nhìn xuống Hồ Nhật Nguyệt')}

Miếu Văn Vũ nằm trên sườn núi phía bắc hồ, là ngôi miếu duy nhất ở Đài Loan mà vừa mở cổng đã thấy hồ. Điện thờ dát vàng với mặt hồ xanh ngọc tạo nên cảnh tượng hoành tráng. 365 bậc thang "Niên Thê" (年梯) trước miếu, mỗi bậc khắc một ngày, tìm bậc ngày sinh của mình rồi chụp ảnh là điều ai cũng làm.

### 🐑 Nông trại Thanh Cảnh (清境農場) — Thụy Sĩ thu nhỏ của Đài Loan

${sPhotoMd('qingjingSheep', 'Nông trại Thanh Cảnh — đàn cừu thong thả trên đồng cỏ xanh')}

Nằm ở độ cao 1.700-2.000 mét, đồng cỏ xanh mướt bao la, đàn cừu nhởn nhơ, dãy núi Trung Ương làm phông nền, cộng thêm biển mây thường xuyên xuất hiện — thật sự có cảm giác như đang ở châu Âu.

**Phải xem：**
- **Show cừu** (Thứ 7-CN 09:30/14:30) — Người chăn cừu New Zealand biểu diễn cắt lông cừu, rất vui
- **Đường đi bộ trên không (天空步道)** — Tổng 1,6 km đường đi bộ trên cao, ngắm dãy núi Trung Ương từ độ cao 1.700 m
- **Trang viên Old England (老英格蘭莊園)** — Không ở cũng tham quan được sảnh, kiến trúc lâu đài châu Âu rất đẹp

${sPhotoMd('qingjingMountain', 'Nhìn từ Thanh Cảnh — biển mây cuồn cuộn trên dãy núi Trung Ương')}

**Ngắm sao：** Thanh Cảnh ít ô nhiễm ánh sáng, độ cao lớn, là một trong những điểm ngắm sao tốt nhất Đài Loan. Dải Ngân Hà mùa hè đặc biệt hùng vĩ, nhớ mang áo khoác.

**Mẹo chụp ảnh：** Trước 10:00 sáng ánh sáng trên đồng cỏ mềm mại nhất, thích hợp chụp đàn cừu. Chiều tối biển mây đẹp nhất, trên Đường đi bộ trên không là điểm ngắm tốt nhất.

### 🏔️ Núi Hợp Hoan (合歡山) — Gợi ý thêm

${sPhotoMd('hehuanshanRoad', 'Đường núi Hợp Hoan — lái xe xuyên mây trên đỉnh cao')}

Nếu có thời gian, từ Thanh Cảnh lên Vũ Lĩnh (武嶺) chỉ khoảng 40 phút lái xe — độ cao 3.275 mét, điểm cao nhất trên đường nhựa ở Đài Loan. Đứng ở bãi đậu xe nhìn xuống, núi non trùng điệp và biển mây cuồn cuộn, trời đẹp nhìn thấy cả Thái Bình Dương.

${sPhotoMd('hehuanshanPanorama', 'Dãy núi Hợp Hoan — nóc nhà Đài Loan')}

**Mẹo chụp ảnh：** Bãi đậu xe Vũ Lĩnh là điểm ngắm đẹp nhất. Bình minh và biển mây buổi chiều đều là thời điểm chụp ảnh tuyệt vời. Mùa đông nếu gặp tuyết rơi, đỉnh núi phủ tuyết trắng với bầu trời xanh là cảnh hiếm có ở Đài Loan.

> Lưu ý：Núi Hợp Hoan rất cao, một số người có thể bị say độ cao nhẹ (chóng mặt, đau đầu). Nên đi chậm và uống nhiều nước. Mùa đông Vũ Lĩnh có thể có tuyết, nhớ kiểm tra tình trạng đường trước khi đi.

## Lịch trình gợi ý

### Ngày 1 — Hồ Nhật Nguyệt

1. **08:00** Khởi hành từ Đài Bắc/Đài Trung (từ Đài Trung khoảng 1,5 tiếng, từ Đài Bắc khoảng 3,5 tiếng)
2. **10:00** Trung tâm du khách Hướng Sơn, đạp xe quanh hồ (khoảng 1,5 tiếng)
3. **11:30** Tàu đến Huyền Quang Tự (thử trứng trà lá nổi tiếng)
4. **12:30** Ăn trưa ở phố ăn Y Đạt Thiệu
5. **14:00** Miếu Văn Vũ (tìm bậc thang ngày sinh của mình)
6. **15:00** Xưởng trà cổ Nhật Nguyệt (nếm trà, mua quà)
7. **16:30** Nhận phòng khách sạn ven hồ
8. **Chiều tối** Đi dạo ven hồ ngắm hoàng hôn

### Ngày 2 — Thanh Cảnh

1. **08:30** Trả phòng, đi Thanh Cảnh (khoảng 1,5 tiếng)
2. **10:00** Đồng cỏ xanh — chơi với cừu, xem show cừu
3. **11:30** Đường đi bộ trên không (ngắm dãy núi Trung Ương)
4. **12:30** Ăn trưa — gợi ý Vân Vũ Lâu hoặc Hảo Kê Bà
5. **13:30** Vườn Thụy Sĩ nhỏ (vườn kiểu châu Âu)
6. **14:30** Quay về (hoặc thêm Vũ Lĩnh +1,5 tiếng)
7. **17:00-18:00** Về đến Đài Trung/Đài Bắc

## Mẹo hữu ích

- **Mùa đẹp nhất**：Thu-đông (tháng 10-2) mát mẻ, xác suất biển mây cao; xuân (tháng 3-4) Thanh Cảnh có hoa anh đào
- **Trang phục**：Thanh Cảnh lạnh hơn vùng thấp trên 10 độ, mùa đông gần 0 độ — mang áo ấm dày. Ven Hồ Nhật Nguyệt sáng tối hơi se lạnh, áo khoác mỏng là đủ
- **Tránh cuối tuần**：Thanh Cảnh ngày lễ rất đông, nên đi ngày thường
- **Thuê xe đạp**：Nhiều tiệm cạnh Trung tâm Hướng Sơn, xe đạp điện thoải mái nhất
- **Gợi ý thêm**：Nếu có thời gian, lên Vũ Lĩnh (3.275 m, điểm cao nhất đường nhựa Đài Loan) — 40 phút lái xe từ Thanh Cảnh`;

// ==========================================================================
// SUN MOON LAKE — Malay (ms)
// ==========================================================================
const smlMs = `## Kenapa Pilih Laluan Ini?

Tasik Sun Moon (日月潭) dan Ladang Qingjing (清境農場) merupakan dua destinasi paling terkenal di Taiwan tengah. Tasik Sun Moon disenaraikan oleh National Geographic sebagai salah satu laluan berbasikal paling indah di dunia, manakala padang rumput tinggi Ladang Qingjing digelar "Switzerland Kecil Taiwan." Perjalanan 2 hari 1 malam ini membawa anda dari tepi tasik ke puncak gunung, menikmati keindahan Taiwan tengah sepenuhnya.

## Tarikan Utama

### 🌊 Tasik Sun Moon — Permata Taiwan

${sPhotoMd('sunmoonBoats', 'Tasik Sun Moon — perahu dalam kabus pagi')}

Pada ketinggian 748 meter, Tasik Sun Moon ialah tasik semula jadi terbesar di Taiwan. Pulau Lalu membahagikan tasik kepada bahagian "Matahari" dan "Bulan," justeru namanya. Waktu subuh, kabus nipis menyelubungi permukaan tasik bagai cermin — syurga bagi pencinta fotografi.

**Cara Meneroka：**
- **Bot Pelancongan**：Menghubungkan tiga jeti (Shuishe → Xuanguang → Ita Thao), kerap berlepas
- **Berbasikal**：Laluan 30 km di tepi tasik, bahagian Xiangshan dinobatkan antara paling cantik oleh CNN
- **SUP Paddleboard**：Aktiviti paling trending di tasik beberapa tahun kebelakangan ini

${sPhotoMd('sunmoonDock', 'Jeti Tasik Sun Moon — detik tenang di tepi air')}

**Makanan Tempatan：**
- **Jalan Makanan Ita Thao (伊達邵美食街)** — Sosej babi hutan, mochi millet, telur teh
- **Teh Hitam Tasik Sun Moon** — Kawasan teh Assam terbaik di Taiwan. Cuba "Ruby" (Teh No. 18) dengan aroma pudina dan kayu manis yang unik
- **Ikan Presiden (總統魚)** — Spesies tempatan yang dinamakan sempena bekas Presiden Chiang Ching-kuo

**Permata Tersembunyi：**
- **Pusat Pelawat Xiangshan (向山遊客中心)** — Direka oleh arkitek Jepun, bangunan konkrit itu sendiri merupakan karya seni
- **Kilang Teh Lama Sun Moon (日月老茶廠)** — Kilang teh berusia seratus tahun yang diubahsuai, kemasukan percuma, boleh merasa dan membeli teh
- **Jejak Gunung Maolan (猫囒山步道)** — Laluan santai melalui ladang teh, puncak menawarkan pemandangan 360° tasik

**Tips Fotografi：** Waktu terbaik ialah subuh, 6:00-7:00 pagi apabila kabus menyelubungi tasik. Platform cantilever di Pusat Pelawat Xiangshan menawarkan sudut paling ikonik.

### ⛩️ Kuil Wenwu (文武廟) — Kuil dengan Pemandangan Tasik

${sPhotoMd('wenwuTemple', 'Kuil Wenwu — kuil agung menghadap Tasik Sun Moon')}

Kuil Wenwu terletak di lereng bukit utara Tasik Sun Moon — satu-satunya kuil di Taiwan di mana anda melihat tasik sebaik sahaja melangkah masuk. Dewan berlapis emas dengan latar tasik zamrud sungguh memukau. Jangan lepaskan 365 anak tangga "Year Ladder" — cari anak tangga bertarikh hari lahir anda dan ambil gambar.

### 🐑 Ladang Qingjing (清境農場) — Switzerland Kecil Taiwan

${sPhotoMd('qingjingSheep', 'Ladang Qingjing — kambing biri-biri meragut di padang rumput hijau')}

Terletak pada ketinggian 1,700-2,000 meter, padang rumput hijau luas, kambing biri-biri yang santai, Banjaran Gunung Tengah sebagai latar — benar-benar terasa seperti di Eropah.

**Mesti Lihat：**
- **Pertunjukan Biri-biri** (Sab-Ahad 09:30/14:30) — Penggembala dari New Zealand menunjukkan cara mencukur bulu, interaktif dan menyeronokkan
- **Laluan Langit (天空步道)** — Laluan bertingkat 1.6 km pada ketinggian 1,700 m menghadap Banjaran Gunung Tengah
- **Old England Manor (老英格蘭莊園)** — Seni bina istana Gothic, lokasi foto hebat walaupun tidak menginap

${sPhotoMd('qingjingMountain', 'Pemandangan dari Ladang Qingjing — awan bergulung di atas Banjaran Gunung Tengah')}

**Pemerhatian Bintang：** Dengan pencemaran cahaya minimum pada ketinggian ini, Qingjing merupakan salah satu lokasi terbaik di Taiwan untuk melihat bintang. Bima Sakti pada musim panas sungguh menakjubkan.

**Tips Fotografi：** Cahaya pagi sebelum 10:00 paling lembut untuk menangkap biri-biri di padang rumput. Lautan awan paling mengagumkan pada waktu petang, Laluan Langit menawarkan pandangan terbaik.

### 🏔️ Gunung Hehuanshan (合歡山) — Destinasi Bonus

${sPhotoMd('hehuanshanRoad', 'Jalan gunung Hehuanshan — memandu melalui puncak berkabus')}

Jika ada masa, Pas Wuling hanya 40 minit dari Qingjing — pada ketinggian 3,275 meter, ia merupakan jalan berturap tertinggi di Taiwan. Berdiri di tempat letak kereta, anda akan melihat lapisan gunung dan awan bergulung di bawah. Pada hari cerah, anda boleh melihat hingga Lautan Pasifik.

${sPhotoMd('hehuanshanPanorama', 'Puncak-puncak Hehuanshan — bumbung Taiwan')}

**Tips Fotografi：** Tempat letak kereta Pas Wuling ialah titik pandang utama. Matahari terbit dan lautan awan petang memberikan gambar yang dramatik. Jika bernasib baik mendapat salji musim sejuk, puncak bersalji dengan langit biru merupakan pemandangan alpine paling luar biasa di Taiwan.

> Nota：Sebahagian pelawat mungkin mengalami simptom ketinggian ringan (pening, sakit kepala). Berjalan perlahan dan minum banyak air. Pada musim sejuk, Wuling mungkin bersalji — semak keadaan jalan sebelum mendaki.

## Cadangan Jadual Perjalanan

### Hari 1 — Tasik Sun Moon

1. **08:00** Bertolak dari Taipei/Taichung (1.5 jam dari Taichung, 3.5 jam dari Taipei)
2. **10:00** Pusat Pelawat Xiangshan + berbasikal di tepi tasik (~1.5 jam)
3. **11:30** Bot ke Kuil Xuanguang (cuba telur teh terkenal)
4. **12:30** Makan tengah hari di jalan makanan Ita Thao
5. **14:00** Kuil Wenwu (cari hari lahir anda di Year Ladder)
6. **15:00** Kilang Teh Lama Sun Moon (merasa teh, beli cenderamata)
7. **16:30** Daftar masuk hotel tepi tasik
8. **Petang** Berjalan-jalan di tepi tasik sambil menikmati matahari terbenam

### Hari 2 — Qingjing

1. **08:30** Daftar keluar, memandu ke Qingjing (~1.5 jam)
2. **10:00** Padang Rumput Hijau — interaksi dengan biri-biri, pertunjukan biri-biri
3. **11:30** Laluan Langit dengan pemandangan gunung
4. **12:30** Makan tengah hari (Qingjing Yunwulou atau Haojipo Chicken)
5. **13:30** Taman Swiss Kecil
6. **14:30** Perjalanan pulang (atau tambah Pas Wuling +1.5 jam)
7. **17:00-18:00** Tiba di Taichung/Taipei

## Tips Praktikal

- **Musim Terbaik**：Luruh/sejuk (Okt-Feb) untuk cuaca nyaman dan lautan awan; musim bunga (Mac-Apr) untuk bunga sakura di Qingjing
- **Pakaian**：Qingjing lebih sejuk 10°C+ berbanding tanah rendah — bawa pakaian tebal. Tasik Sun Moon sederhana, jaket nipis untuk pagi/petang sudah memadai
- **Elak Hujung Minggu**：Qingjing sangat sesak pada cuti dan hujung minggu
- **Sewa Basikal**：Beberapa kedai berhampiran Pusat Pelawat Xiangshan; e-basikal paling mudah
- **Bonus**：Tambah Pas Wuling (3,275 m, jalan berturap tertinggi Taiwan) — 40 minit dari Qingjing`;

// ==========================================================================
// Title & description translations
// ==========================================================================
const jiufenTitle = {
  th: 'จิ่วเฟิ่น & สือเฟิ่น — ทัวร์หมู่บ้านบนเขาและโคมลอยหนึ่งวัน',
  vi: 'Cửu Phần & Thập Phần — Tour phố cổ trên núi và đèn trời một ngày',
  ms: 'Jiufen & Shifen — Lawatan Sehari Bandar Gunung & Tanglung Langit',
};

const jiufenDesc = {
  th: 'สำรวจถนนเก่าจิ่วเฟิ่นที่ได้แรงบันดาลใจจากจิบลิ ปล่อยโคมลอยบนทางรถไฟที่สือเฟิ่น ชมน้ำตกสือเฟิ่น น้ำตกทองคำ และทะเลหยินหยาง',
  vi: 'Khám phá phố cổ Cửu Phần đầy cảm hứng Ghibli, thả đèn trời trên đường ray tại Thập Phần, ngắm Thác Thập Phần, Thác Vàng và Biển Âm Dương',
  ms: 'Terokai pekan lama Jiufen yang diilhamkan Ghibli, lepaskan tanglung langit di landasan kereta Shifen, lawati Air Terjun Shifen, Air Terjun Emas dan Laut Yin-Yang',
};

const smlTitle = {
  th: 'ทะเลสาบสุริยันจันทรา & ฟาร์มชิงจิ้ง — ทริป 2 วัน 1 คืน',
  vi: 'Hồ Nhật Nguyệt & Nông trại Thanh Cảnh — Tour 2 ngày 1 đêm',
  ms: 'Tasik Sun Moon & Ladang Qingjing — Lawatan 2 Hari 1 Malam',
};

const smlDesc = {
  th: 'ล่องเรือชมทะเลสาบสุริยันจันทรา ปั่นจักรยานรอบทะเลสาบ เยี่ยมชมฟาร์มชิงจิ้งกับฝูงแกะบนเขาสูง เลือกขึ้นเขาเหอฮวนชมทะเลเมฆ',
  vi: 'Du thuyền Hồ Nhật Nguyệt, đạp xe quanh hồ, thăm Nông trại Thanh Cảnh với đàn cừu trên cao, tùy chọn lên núi Hợp Hoan ngắm biển mây',
  ms: 'Pelayaran di Tasik Sun Moon, berbasikal mengelilingi tasik, melawat Ladang Qingjing dengan biri-biri di tanah tinggi, pilihan tambahan ke Gunung Hehuanshan untuk lautan awan',
};

// ==========================================================================
// Main: fetch → merge → patch for each guide
// ==========================================================================
async function fetchGuide(slug) {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.${slug}&select=*`,
    { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }
  );
  if (!res.ok) throw new Error(`GET ${slug} failed: ${res.status}`);
  const rows = await res.json();
  if (!rows.length) throw new Error(`Guide not found: ${slug}`);
  return rows[0];
}

async function patchGuide(slug, patch) {
  const res = await fetch(
    `${SUPABASE_URL}/tour_guides?slug=eq.${slug}`,
    { method: 'PATCH', headers, body: JSON.stringify(patch) }
  );
  const text = await res.text();
  if (!res.ok) throw new Error(`PATCH ${slug} failed: ${res.status} ${text}`);
  return JSON.parse(text);
}

async function main() {
  console.log('=== Batch 1: Adding th/vi/ms to first 2 guides ===\n');

  // --- 1. taipei-jiufen-shifen ---
  console.log('1) Fetching taipei-jiufen-shifen...');
  const jiufen = await fetchGuide('taipei-jiufen-shifen');
  console.log(`   Current content langs: ${Object.keys(jiufen.content || {}).join(', ')}`);
  console.log(`   Current title langs: ${Object.keys(jiufen.title || {}).join(', ')}`);

  const jiufenPatch = {
    content: { ...jiufen.content, th: jiufenTh, vi: jiufenVi, ms: jiufenMs },
    title: { ...jiufen.title, ...jiufenTitle },
    description: { ...jiufen.description, ...jiufenDesc },
  };

  console.log('   Patching taipei-jiufen-shifen...');
  const jiufenResult = await patchGuide('taipei-jiufen-shifen', jiufenPatch);
  const jiufenLangs = Object.keys(jiufenResult[0]?.content || {});
  console.log(`   Done! Content langs: ${jiufenLangs.join(', ')}`);

  // --- 2. sun-moon-lake ---
  console.log('\n2) Fetching sun-moon-lake...');
  const sml = await fetchGuide('sun-moon-lake');
  console.log(`   Current content langs: ${Object.keys(sml.content || {}).join(', ')}`);
  console.log(`   Current title langs: ${Object.keys(sml.title || {}).join(', ')}`);

  const smlPatch = {
    content: { ...sml.content, th: smlTh, vi: smlVi, ms: smlMs },
    title: { ...sml.title, ...smlTitle },
    description: { ...sml.description, ...smlDesc },
  };

  console.log('   Patching sun-moon-lake...');
  const smlResult = await patchGuide('sun-moon-lake', smlPatch);
  const smlLangs = Object.keys(smlResult[0]?.content || {});
  console.log(`   Done! Content langs: ${smlLangs.join(', ')}`);

  console.log('\n=== Batch 1 complete! ===');
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
