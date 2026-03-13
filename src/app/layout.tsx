import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import './guide/[slug]/guide.css';
import './faq/faq.css';

export const metadata: Metadata = {
  title: 'RelayGo - 專業包車服務平台 | Professional Charter Service',
  description: 'RelayGo 提供專業包車服務，安全可靠的司機、即時追蹤、多元支付方式。立即下載 App 開始預約！',
  keywords: 'RelayGo, 包車, charter service, 專業司機, 即時追蹤, 台灣包車, チャーターサービス',
  openGraph: {
    title: 'RelayGo - 專業包車服務平台',
    description: '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
    type: 'website',
    url: 'https://relaygo.pro',
    siteName: 'RelayGo',
    locale: 'zh_TW',
    images: [
      {
        url: 'https://relaygo.pro/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RelayGo 專業包車服務平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RelayGo - 專業包車服務平台',
    description: '安全可靠的專業包車服務，即時追蹤、多元支付、AI 旅遊規劃',
    images: ['https://relaygo.pro/og-image.png'],
  },
  metadataBase: new URL('https://relaygo.pro'),
  alternates: {
    canonical: '/',
  },
  other: {
    'agd-partner-manual-verification': '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://emrld.cc/NTAzNDIx.js?t=503421"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'RelayGo',
              url: 'https://relaygo.pro',
              logo: 'https://relaygo.pro/og-image.png',
              description:
                '台灣專業包車服務平台，提供機場接送、包車旅遊、商務用車服務。App 內建多語翻譯（中/英/日/韓/泰/越/馬來文）。Professional charter car service in Taiwan with built-in multilingual translation (Chinese, English, Japanese, Korean, Thai, Vietnamese, Malay).',
              foundingDate: '2024',
              areaServed: {
                '@type': 'Country',
                name: 'Taiwan',
              },
              knowsLanguage: [
                'zh-TW', 'en', 'ja', 'ko', 'th', 'vi', 'ms',
              ],
              serviceType: [
                '機場接送',
                '包車旅遊',
                '商務用車',
                'Airport Transfer',
                'Charter Tour',
                'Business Transportation',
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'RelayGo 包車服務',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '機場接送 Airport Transfer',
                      description:
                        '桃園(TPE)、松山(TSA)、台中(RMQ)、高雄(KHH) 四大機場接送',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '包車旅遊 Charter Tour',
                      description:
                        '6/8 小時包車旅遊，九份、日月潭、太魯閣、墾丁、阿里山等全台熱門景點',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: '商務用車 Business Transportation',
                      description: '企業用車、會議接送、VIP 商務包車',
                    },
                  },
                ],
              },
              sameAs: [
                'https://apps.apple.com/app/relaygo/id6670425865',
                'https://play.google.com/store/apps/details?id=com.relaygo.customer',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: '包車是否能到府接送？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '可以。包車就是免去自駕的困擾，直接在家到府或指定地點上下車接送。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does RelayGo offer door-to-door pickup?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Our charter service picks you up at your hotel, Airbnb, or any designated location — no need to rent a car or navigate public transit.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'RelayGoは送迎サービスに対応していますか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'はい。ご宿泊先やご指定の場所まで送迎いたします。レンタカーや公共交通機関の心配は不要です。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'RelayGo는 숙소 픽업이 가능한가요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '네. 호텔, 에어비앤비 등 원하시는 장소로 픽업·샌딩 서비스를 제공합니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'RelayGo รับ-ส่งถึงที่พักได้ไหม?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ได้เลย บริการรถเหมาจะไปรับคุณถึงโรงแรม ที่พัก หรือจุดที่กำหนด โดยไม่ต้องเช่ารถหรือใช้ขนส่งสาธารณะ',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'RelayGo có đón tận nơi không?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Có. Dịch vụ xe riêng sẽ đón bạn tại khách sạn, Airbnb hoặc bất kỳ địa điểm nào bạn chỉ định — không cần thuê xe hay tìm phương tiện công cộng.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Adakah RelayGo menyediakan perkhidmatan jemput dari pintu ke pintu?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ya. Perkhidmatan sewa kenderaan kami akan menjemput anda di hotel, Airbnb, atau mana-mana lokasi yang ditetapkan — tanpa perlu menyewa kereta atau menggunakan pengangkutan awam.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '司機素質如何？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '所有司機皆具長期包車經驗且無負評。曾受負評之司機一概不派用，確保每一趟旅程的服務品質。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How is driver quality ensured?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'All drivers are experienced professionals with zero negative reviews. Any driver who receives a complaint is immediately removed from the roster.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'ドライバーの質はどうですか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '全ドライバーはチャーター経験豊富で、低評価のないプロフェッショナルです。クレームを受けたドライバーは即座に登録解除されます。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '기사님 서비스 품질은 어떤가요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '모든 기사님은 풍부한 차량 대절 경험을 갖추고 있으며 부정적 리뷰가 없는 분만 배정합니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'คนขับมีคุณภาพอย่างไร?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'คนขับทุกคนเป็นมืออาชีพที่มีประสบการณ์และไม่มีรีวิวเชิงลบ หากได้รับการร้องเรียนจะถูกถอดออกจากทีมทันที',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Chất lượng tài xế được đảm bảo như thế nào?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tất cả tài xế đều là người có kinh nghiệm lâu năm và không có đánh giá tiêu cực. Tài xế nào nhận được khiếu nại sẽ bị loại khỏi đội ngũ ngay lập tức.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Bagaimana kualiti pemandu dijamin?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Semua pemandu adalah profesional berpengalaman dengan sifar ulasan negatif. Mana-mana pemandu yang menerima aduan akan dikeluarkan daripada senarai serta-merta.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '車輛是否合法？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '所有車輛皆為合法營業之租賃車或多元計程車，絕非無保險理賠的白牌車，乘客權益有完整保障。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are the vehicles legally registered?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely. Every vehicle is a licensed rental car or registered rideshare vehicle with full insurance coverage — never an unlicensed vehicle.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '車両は合法ですか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'すべての車両は正規のレンタカーまたは登録済みライドシェア車両で、保険も完備しています。無許可の白タクは一切使用しません。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '차량은 합법인가요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '모든 차량은 정식 등록된 렌터카 또는 다원택시로, 보험이 완비되어 있습니다. 무허가 차량은 절대 배정하지 않습니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'รถที่ใช้ถูกกฎหมายหรือไม่?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'รถทุกคันเป็นรถเช่าที่จดทะเบียนถูกต้องหรือรถร่วมบริการที่มีประกันครบถ้วน ไม่ใช่รถผิดกฎหมาย',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Xe có đăng ký hợp pháp không?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tất cả xe đều là xe cho thuê có giấy phép hoặc xe hợp đồng đã đăng ký, có bảo hiểm đầy đủ — tuyệt đối không sử dụng xe trái phép.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Adakah kenderaan berdaftar secara sah?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sudah tentu. Setiap kenderaan adalah kereta sewa berlesen atau kenderaan e-hailing berdaftar dengan perlindungan insurans penuh — bukan kenderaan tanpa lesen.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '費用是否包含停車費、過路費等額外費用？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '報價時會將司機誤餐費、住宿費、停車費、燃料費、過路費等詳細記載，絕不會在用車過程中臨時加價。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are tolls, parking, and fuel included in the price?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'All costs — driver meals, accommodation, parking, fuel, and tolls — are clearly listed upfront. There are never any surprise surcharges during your trip.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '料金には駐車場代・通行料・燃料費が含まれていますか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ドライバーの食事代・宿泊費・駐車場代・燃料費・通行料など、すべての費用を事前に明示します。追加請求は一切ございません。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '요금에 주차비, 통행료, 유류비가 포함되나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '기사 식비, 숙박비, 주차비, 유류비, 통행료 등 모든 비용을 사전에 명확히 안내드리며 추가 요금은 없습니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'ค่าทางด่วน ค่าจอดรถ และค่าน้ำมันรวมอยู่ในราคาแล้วหรือไม่?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ค่าใช้จ่ายทั้งหมด ได้แก่ ค่าอาหารคนขับ ที่พัก ค่าจอดรถ ค่าน้ำมัน และค่าทางด่วน จะแจ้งให้ทราบล่วงหน้าอย่างชัดเจน ไม่มีค่าใช้จ่ายเพิ่มเติมระหว่างทาง',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Phí cầu đường, đỗ xe và nhiên liệu có bao gồm trong giá không?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tất cả chi phí — bữa ăn tài xế, chỗ ở, đỗ xe, nhiên liệu và phí cầu đường — đều được liệt kê rõ ràng từ đầu. Không có phụ phí phát sinh trong suốt chuyến đi.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Adakah tol, parkir, dan bahan api termasuk dalam harga?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Semua kos — makan pemandu, penginapan, parkir, bahan api, dan tol — disenaraikan dengan jelas terlebih dahulu. Tiada caj tambahan tersembunyi sepanjang perjalanan anda.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '包車需要給司機小費嗎？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '小費為鼓勵性質的額外補貼，並非強制。若您覺得司機服務周到且辛苦，歡迎自由給予小費鼓勵。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is tipping the driver expected?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tipping is not mandatory. It is entirely at your discretion — if you feel the driver provided excellent service, a tip is always appreciated.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'チップは必要ですか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'チップは義務ではありません。ドライバーのサービスにご満足いただけた場合、お気持ちとしてお渡しいただければ幸いです。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '기사님께 팁을 줘야 하나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '팁은 필수가 아닙니다. 기사님의 서비스가 만족스러우셨다면 자유롭게 감사의 마음을 전하실 수 있습니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'ต้องให้ทิปคนขับไหม?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ทิปไม่ได้บังคับ ขึ้นอยู่กับความพึงพอใจของคุณ หากคุณรู้สึกว่าคนขับให้บริการดีเยี่ยม การให้ทิปจะเป็นกำลังใจที่ดี',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Có cần tip cho tài xế không?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tip không bắt buộc. Hoàn toàn tùy thuộc vào bạn — nếu bạn hài lòng với dịch vụ của tài xế, một khoản tip nhỏ luôn được trân trọng.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Perlukah memberi tip kepada pemandu?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Memberi tip tidak diwajibkan. Ia bergantung sepenuhnya kepada anda — jika anda berpuas hati dengan perkhidmatan pemandu, tip sentiasa dihargai.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '包車行程可以自訂嗎？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '行程完全由您自訂。網站上的景點路線僅供參考，司機會按照您的路線行駛，路線不順時也會提供專業建議以節省交通時間。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I customize the itinerary?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely. You plan the route, and your driver follows it. The routes on our website are suggestions only. If a route isn\'t optimal, your driver will offer professional advice to save travel time.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '行程のカスタマイズは可能ですか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'もちろんです。お客様のご希望ルートに沿って走行します。サイト掲載のルートは参考例です。効率的でないルートの場合はドライバーがアドバイスいたします。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '일정을 직접 짤 수 있나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '네, 일정은 자유롭게 구성 가능합니다. 사이트의 코스는 참고용이며, 비효율적인 동선은 기사님이 전문적으로 조언해 드립니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'กำหนดเส้นทางเองได้ไหม?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ได้เลย คุณวางแผนเส้นทางเอง แล้วคนขับจะขับตามเส้นทางของคุณ เส้นทางบนเว็บไซต์เป็นเพียงคำแนะนำ หากเส้นทางไม่เหมาะสม คนขับจะแนะนำเพื่อประหยัดเวลาเดินทาง',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Tôi có thể tùy chỉnh lịch trình không?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Hoàn toàn được. Bạn lên lịch trình và tài xế sẽ đi theo. Các tuyến đường trên website chỉ mang tính tham khảo. Nếu tuyến đường chưa tối ưu, tài xế sẽ tư vấn chuyên môn để tiết kiệm thời gian di chuyển.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Bolehkah saya menyesuaikan jadual perjalanan?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sudah tentu. Anda merancang laluan dan pemandu akan mengikutinya. Laluan di laman web kami hanyalah cadangan. Jika laluan tidak optimum, pemandu akan memberikan nasihat profesional untuk menjimatkan masa perjalanan.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '如何預約包車？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '使用 RelayGo App 預約，預約完畢後可在 App 聊天頁面聯繫客服完成預約流程。建議一個月前預訂，以免旺季無車可訂。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I book a charter?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Book through the RelayGo app. After booking, you can contact customer service via the in-app chat. We recommend booking at least one month in advance during peak season.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'どうやって予約しますか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'RelayGo アプリからご予約ください。予約後、アプリ内チャットでカスタマーサポートに連絡できます。繁忙期は1ヶ月前のご予約をおすすめします。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '어떻게 예약하나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'RelayGo 앱에서 예약하세요. 예약 후 앱 내 채팅으로 고객센터에 문의할 수 있습니다. 성수기에는 1개월 전 예약을 권장합니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'จองรถเหมาอย่างไร?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'จองผ่านแอป RelayGo หลังจองแล้วสามารถติดต่อฝ่ายบริการลูกค้าผ่านแชทในแอปได้ แนะนำให้จองล่วงหน้าอย่างน้อย 1 เดือนในช่วงไฮซีซั่น',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Làm thế nào để đặt xe riêng?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Đặt xe qua ứng dụng RelayGo. Sau khi đặt, bạn có thể liên hệ bộ phận chăm sóc khách hàng qua tính năng chat trong ứng dụng. Chúng tôi khuyên nên đặt trước ít nhất 1 tháng vào mùa cao điểm.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Bagaimana cara membuat tempahan sewa kenderaan?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tempah melalui aplikasi RelayGo. Selepas tempahan, anda boleh menghubungi khidmat pelanggan melalui ruangan sembang dalam aplikasi. Kami syorkan membuat tempahan sekurang-kurangnya sebulan lebih awal semasa musim puncak.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '付款方式有哪些？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '支援 App 內線上刷卡支付，需預付訂金才完成訂車程序。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What payment methods are accepted?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Online credit card payment through the app. A deposit is required to confirm your booking.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '支払い方法は？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'アプリ内でクレジットカード決済が可能です。予約確定にはデポジット（前金）が必要です。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '결제 방법은 어떻게 되나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '앱 내 신용카드 온라인 결제를 지원하며, 예약 확정을 위해 보증금 선결제가 필요합니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'รองรับช่องทางชำระเงินอะไรบ้าง?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ชำระเงินผ่านบัตรเครดิตออนไลน์ในแอป โดยต้องชำระเงินมัดจำเพื่อยืนยันการจอง',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Chấp nhận những phương thức thanh toán nào?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Thanh toán bằng thẻ tín dụng trực tuyến qua ứng dụng. Cần đặt cọc để xác nhận đơn đặt xe.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Apakah kaedah pembayaran yang diterima?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Pembayaran kad kredit dalam talian melalui aplikasi. Deposit diperlukan untuk mengesahkan tempahan anda.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '出發前如何聯繫司機？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '出發前一日即可透過 App 聊天頁面與司機直接聯絡，確認接送細節。',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I contact my driver before the trip?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'You can message your driver directly through the in-app chat the day before departure to confirm pickup details.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '出発前にドライバーと連絡できますか？',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '出発前日からアプリ内チャットでドライバーと直接やり取りし、ピックアップの詳細を確認できます。',
                  },
                },
                {
                  '@type': 'Question',
                  name: '출발 전에 기사님과 연락할 수 있나요?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '출발 전날부터 앱 내 채팅으로 기사님과 직접 연락하여 픽업 세부사항을 확인할 수 있습니다.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'ติดต่อคนขับก่อนออกเดินทางได้อย่างไร?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'คุณสามารถส่งข้อความถึงคนขับโดยตรงผ่านแชทในแอป ล่วงหน้าหนึ่งวันก่อนออกเดินทาง เพื่อยืนยันรายละเอียดการรับ-ส่ง',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Làm thế nào để liên hệ tài xế trước chuyến đi?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Bạn có thể nhắn tin trực tiếp cho tài xế qua tính năng chat trong ứng dụng vào ngày trước khi khởi hành để xác nhận chi tiết đón.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Bagaimana untuk menghubungi pemandu sebelum perjalanan?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Anda boleh menghantar mesej terus kepada pemandu melalui ruangan sembang dalam aplikasi sehari sebelum berlepas untuk mengesahkan butiran jemput.',
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
