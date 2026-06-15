import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '..', 'hany-village-firebase-adminsdk-fbsvc-218f9e2937.json'), 'utf8')
);

if (getApps().length === 0) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

const menuData = [
  {
    category: 'المندي',
    categoryPriority: 100,
    items: [
      { title: 'ك ضاني مندي', description: 'لحم ضاني مستوي في برميل المندي تحت الأرض، مدخن ودايب زبدة، وبينزل مع الرز البسمتي المبهر.', price: 575, priceNote: '1/2 كيلو 575 | كيلو 1150', image: '/mandi_lamb.jpg', badge: 'الأكثر طلباً', isPopular: true, popularOrder: 10, priority: 100 },
      { title: 'ك كندوز مندي', description: 'لحم كندوز واخد تسوية مندي بطيئة تحت الأرض، طعم الدخان والتتبيلة واصل لآخر نسيج في اللحمة.', price: 565, priceNote: '1/2 كيلو 565 | كيلو 1130', image: '/mandi_lamb.jpg', badge: null, isPopular: false, priority: 90 },
      { title: 'موزة ضاني مندي', description: 'موزة ضاني مستوية بطريقة المندي الأصيلة، اللحمة بتسيب العضم من حلاوتها وتسويتها الصح.', price: 700, image: '/mandi_lamb.jpg', badge: null, isPopular: false, priority: 80 },
      { title: 'فرخة مندي', description: 'فرخة كاملة تسوية مندي بلونها الدهبي الجميل وريحة الفحم والدخان، بتتقدم مع رز مندي بالزبيب.', price: 550, priceNote: '1/2 فرخة 275 | فرخة كاملة 550', image: '/mandi_lamb.jpg', badge: null, isPopular: false, priority: 70 },
      { title: 'تيس صندي (مندي)', description: 'تيس كامل مستوي في حفرة المندي، ينفع لعزوماتك الكبيرة والولائم، بتوزنه والسعر بالكيلو.', price: 1080, priceNote: '1080 سعر الكيلو (حسب الوزن)', image: '/mandi_lamb.jpg', badge: 'للمناسبات', isPopular: false, priority: 60 },
      { title: 'نصف تيس صندي (مندي)', description: 'نص تيس مندي دايب بالرز والمكسرات لعزومة معتبرة تشرفك قدام ضيوفك.', price: 0, priceNote: 'السعر حسب الوزن', image: '/mandi_lamb.jpg', badge: null, isPopular: false, priority: 50 },
      { title: 'ربع تيس صندي (مندي)', description: 'ربع تيس مندي يكفي العيلة ويسد معاك في الطعم والجودة العالية.', price: 0, priceNote: 'السعر حسب الوزن', image: '/mandi_lamb.jpg', badge: null, isPopular: false, priority: 40 },
    ]
  },
  {
    category: 'مشويات',
    categoryPriority: 90,
    items: [
      { title: 'ريش ضاني', description: 'ريش ضاني متبلة بمية البصل والبهارات وممشوية على الفحم، تاكل صوابعك وراها.', price: 600, priceNote: '1/2 كيلو 600 | كيلو 1200', image: '/lamb_chops.jpg', badge: 'الأكثر طلباً', isPopular: true, popularOrder: 9, priority: 100 },
      { title: 'فخادي ضاني شرائح', description: 'شرايح فخدة ضاني طرية ومشوية بتتبيلة الحاتي، مفيش أطعم من كده.', price: 600, priceNote: '1/2 كيلو 600 | كيلو 1200', image: '/mixed_grill.jpg', badge: null, isPopular: false, priority: 90 },
      { title: 'مكس ضاني', description: 'تشكيلة من أطعم حتت اللحمة الضاني مشوية على الفحم، ميكس مزاج عالي.', price: 600, priceNote: '1/2 كيلو 600 | كيلو 1200', image: '/mixed_grill.jpg', badge: 'مميز', isPopular: true, popularOrder: 8, priority: 85 },
      { title: 'فلتو', description: 'عرق فلتو مشوي تسوية مظبوطة، طري جدا وبيدوب في البق من غير مجهود.', price: 600, priceNote: '1/2 كيلو 600 | كيلو 1200', image: '/mixed_grill.jpg', badge: null, isPopular: false, priority: 80 },
      { title: 'روز بيف', description: 'شرايح روز بيف بلدي مشوية على الفحم بطعم خيالي ومقرمشة من برة.', price: 550, priceNote: '1/2 كيلو 550 | كيلو 1100', image: '/mixed_grill.jpg', badge: null, isPopular: false, priority: 75 },
      { title: 'طرب', description: 'صوابع كفتة ملفوفة في المنديل الضاني، بتنزل سمنتها على الفحم وتديك ريحة وطعم ملوش حل.', price: 495, priceNote: '1/2 كيلو 495 | كيلو 990', image: '/mixed_grill.jpg', badge: null, isPopular: false, priority: 70 },
      { title: 'كفتة', description: 'كفتة حاتي بلدي على السيخ، متبلة صح الصح ومش بتفك منك.', price: 495, priceNote: '1/2 كيلو 495 | كيلو 990', image: '/mixed_grill.jpg', badge: null, isPopular: true, popularOrder: 7, priority: 65 },
      { title: 'مشكل مشوي', description: 'كيلو مشكل فيه كفتة ولحمة وطرب، صينية ترضي كل الأذواق وتظبط العيلة.', price: 550, priceNote: '1/2 كيلو 550 | كيلو 1100', image: '/mixed_grill.jpg', badge: 'للمجموعات', isPopular: true, popularOrder: 6, priority: 60 },
      { title: 'موزة مشوية بالواحدة', description: 'موزة ضاني مشوية سليمة زي ما هي، مقرمشة من برة ودايبة وطعمها غني من جوة.', price: 650, image: '/lamb_chops.jpg', badge: null, isPopular: false, priority: 55 },
      { title: 'فرخة مشوية', description: 'فرخة كاملة مشوية على الفحم ومتبلة بصلصة البصل والطماطم والبهارات اللي بتخش في العضم.', price: 450, priceNote: '1/2 فرخة 225 | فرخة كاملة 450', image: '/mixed_grill.jpg', badge: null, isPopular: false, priority: 50 },
      { title: 'جوز حمام مشوي', description: 'حمام بلدي مفرود ومشوي على الفحم، متبل بخلطة بتخليه مقرمش ولذيذ يتاكل بعضمه.', price: 310, priceNote: 'فردة 155 | جوز 310', image: '/mixed_grill.jpg', badge: null, isPopular: false, priority: 45 },
      { title: 'سدق بلدي مشوي', description: 'سجق بلدي محشي لحمة صافي وتوابل متحبشة، مشوي على الفحم وريحته تجيبك من بعيد.', price: 495, priceNote: '1/2 كيلو 495 | كيلو 990', image: '/mixed_grill.jpg', badge: null, isPopular: false, priority: 40 },
    ]
  },
  {
    category: 'مأكولات بدوية',
    categoryPriority: 80,
    items: [
      { title: 'ك ضاني بالأرز أو مبكبكة', description: 'لحمة ضاني دايبة دوب، بتنزلك مع رز خلطة أو حلة مكرونة مبكبكة بالصلصة متسبكة على أبوه.', price: 575, priceNote: '1/2 كيلو 575 | كيلو 1150', image: '/mandi_lamb.jpg', priority: 100 },
      { title: 'ك كندوز بالأرز أو مبكبكة', description: 'لحم كندوز بلدي طري، متقدم مع رز مبهر أو مكرونة مبكبكة سخنة تدفي.', price: 575, priceNote: '1/2 كيلو 575 | كيلو 1150', image: '/mandi_lamb.jpg', priority: 90 },
      { title: 'ك نيفا بالأرز أو مبكبكة', description: 'لحم نيفا مخصوص واخد تسوية بدوي صح، مع الرز أو المكرونة الغرقانة في الصلصة.', price: 575, priceNote: '1/2 كيلو 575 | كيلو 1150', image: '/mandi_lamb.jpg', priority: 80 },
      { title: 'تحميره لحمة بالبصل', description: 'طاسة لحمة متحمرة في السمنة البلدي مع البصل المكرمل، ريحتها وطعمها يودوك في حتة تانية.', price: 575, priceNote: '1/2 كيلو 575 | كيلو 1150', image: '/mandi_lamb.jpg', priority: 70 },
      { title: 'علاقة ضاني (700 جم)', description: 'علاقة ضاني بلدي وزن 700 جرام، مشوية ومتبلة تتبيلة بدوية أصيلة تشرفك.', price: 800, image: '/lamb_chops.jpg', priority: 60 },
      { title: 'موزة ضاني بالأرز أو المكرونة', description: 'موزة ضاني ملبسة ودايبة بتفصل من العضم لوحدها، مع سرفيس رز أو مكرونة.', price: 700, image: '/mandi_lamb.jpg', priority: 50 },
      { title: 'طبق أرز أو مكرونة', description: 'طبق رز خلطة أو مكرونة بالصلصة، اطلب الحجم اللي يكمل أكلتك ويسد جوعك.', price: 100, priceNote: 'صغير 100 | وسط 150 | كبير 200', image: '/mandi_lamb.jpg', priority: 40 },
    ]
  },
  {
    category: 'الطيور',
    categoryPriority: 70,
    items: [
      { title: 'ديك بلدي بالأرز أو المكرونة', description: 'ديك بلدي شامورت متربي على الغالي، مسلوق ومتحمر في السمنة ونازل مع سرفيس رز أو مكرونة.', price: 650, image: '/mixed_grill.jpg', priority: 100 },
      { title: 'جوز حمام محشي أرز', description: 'جوز حمام بلدي جامبو محشي خلطة رز بالكبد والقوانص، ومتحمر في السمنة البلدي لحد ما لونه بقى دهبي.', price: 380, image: '/mixed_grill.jpg', priority: 90 },
    ]
  },
  {
    category: 'محاشي وطواجن',
    categoryPriority: 60,
    items: [
      { title: 'طبق مشكل محاشي', description: 'سرفيس محشي مشكل (كرنب، ورق عنب، بتنجان، فلفل) بخلطة مصرية أصيلة وريحة الشبت والكزبرة مفحفحة.', price: 200, image: '/mandi_lamb.jpg', priority: 100 },
      { title: 'طبق ممبار', description: 'طبق ممبار بلدي محشي خلطة رز جبارة، ومتحمر بيقرمش من برة وطري من جوة.', price: 200, image: '/mandi_lamb.jpg', priority: 95 },
      { title: 'طبق بطاطس', description: 'طبق بطاطس محمرة مقرمشة وفريش، أحلى تسالي جنب الأكل.', price: 90, image: '/hummus_appetizer.jpg', priority: 90 },
      { title: 'طاجن بامية بالضاني صغير', description: 'طاجن بامية متسبكة بالصلصة ومضروبالها طشة، وجواها قطع لحمة ضاني دايبة.', price: 270, image: '/mandi_lamb.jpg', priority: 85 },
      { title: 'طاجن بسلة بالضاني', description: 'طاجن بسلة بالجزر متسبك صح في الفرن مع اللحمة الضاني اللي بتدي للصلصة طعم حكاية.', price: 270, image: '/mandi_lamb.jpg', priority: 80 },
      { title: 'طاجن كوارع', description: 'طاجن كوارع مخلية متسبكة بالدمعة والبصل في الفرن، حاجة ترم العضم وتلزق الشفايف.', price: 330, image: '/mandi_lamb.jpg', priority: 75 },
      { title: 'طاجن عكاوي', description: 'طاجن عكاوي بلدي بالبصل مكمور في الفرن لحد ما اللحمة بتدوب وبتبقى زبدة.', price: 330, image: '/mandi_lamb.jpg', priority: 70 },
      { title: 'طاجن ورق عنب بالكوارع', description: 'ميكس الدمار الشامل.. ورق عنب مزز مرصوص مع كوارع دايبة في طاجن واحد بيغلي في الفرن.', price: 330, image: '/mandi_lamb.jpg', priority: 65 },
      { title: 'سمبوسة بالجبنة', description: 'حبات سمبوسة مقلية ومقرمشة، محشية ميكس جبن سايحة بتمط معاك.', price: 180, image: '/hummus_appetizer.jpg', priority: 60 },
      { title: 'طبق جلاش', description: 'قطع جلاش باللحمة المفرومة، مورقة ومقرمشة من برة وطرية ومليانة عصاج من جوة.', price: 230, image: '/mandi_lamb.jpg', priority: 55 },
      { title: 'طبق ورق عنب', description: 'طبق ورق عنب ملفوف عالشعرة ومزز، يفتح نفسك على الأكل.', price: 210, image: '/hummus_appetizer.jpg', priority: 50 },
      { title: 'طبق ملوخية خضرا', description: 'طبق ملوخية خضرا معمولها طشة توم وكزبرة، ريحتها تقلب المكان وتتاكل بالعيش أو الرز.', price: 80, image: '/mandi_lamb.jpg', priority: 45 },
    ]
  },
  {
    category: 'كنافة',
    categoryPriority: 50,
    items: [
      { title: 'كنافة قشطة', description: 'صينية كنافة سورية متقمرة على الفحم، محشية قشطة بلدي طازة وبتبظ من كل ناحية.', price: 150, priceNote: 'صغير 150 | وسط 180 | كبير 250', image: '/hummus_appetizer.jpg', badge: 'على الفحم', isPopular: true, popularOrder: 5, priority: 100 },
      { title: 'كنافة جبنة', description: 'كنافة نابلسية سخنة بالجبنة العكاوي السايحة اللي بتمط معاك لأخر الشارع.', price: 150, priceNote: 'صغير 150 | وسط 180 | كبير 250', image: '/hummus_appetizer.jpg', badge: 'على الفحم', isPopular: true, popularOrder: 4, priority: 90 },
    ]
  },
  {
    category: 'الحلو',
    categoryPriority: 40,
    items: [
      { title: 'أم علي', description: 'طاجن أم علي متغرق لبن وقشطة ومكسرات، طالع سخن مولع من الفرن.', price: 75, image: '/hummus_appetizer.jpg', badge: 'الأكثر طلباً', isPopular: true, popularOrder: 3, priority: 100 },
      { title: 'مهلبية', description: 'طبق مهلبية بيتي كريمي وعليها رشة مكسرات، بتدوب في البق.', price: 60, image: '/hummus_appetizer.jpg', priority: 90 },
      { title: 'كريم كراميل', description: 'كريم كراميل ساقع وناعم بطعم الكراميل المكرمل اللذيذ.', price: 70, image: '/hummus_appetizer.jpg', priority: 85 },
      { title: 'جيلي فواكه', description: 'طبق جيلي ساقع متدلع بقطع الفواكه الفريش.', price: 40, image: '/hummus_appetizer.jpg', priority: 80 },
      { title: 'جيلي الماظية', description: 'جيلي ألماظية شفاف وخفيف، يحلي بقك بعد الأكل.', price: 60, image: '/hummus_appetizer.jpg', priority: 75 },
      { title: 'أرز باللبن سادة', description: 'طبق رز بلبن كريمي وسادة، طعم زمان الأصلي.', price: 60, image: '/hummus_appetizer.jpg', priority: 70 },
      { title: 'أرز باللبن بالفواكه', description: 'رز بلبن غرقان في اللبن ومحطوط عليه تشكيلة فواكه طازة.', price: 65, image: '/hummus_appetizer.jpg', priority: 65 },
      { title: 'أرز باللبن فرن', description: 'طاجن رز بلبن واخد وش جراتان محمر في الفرن، ريحته تجنن.', price: 60, image: '/hummus_appetizer.jpg', priority: 60 },
      { title: 'كاستر بالشيكولاتة', description: 'كاستر شوكولاتة غني وتقيل، لمحبي العظمة والشوكولاتة.', price: 60, image: '/hummus_appetizer.jpg', priority: 55 },
      { title: 'بودنج شيكولاتة', description: 'بودنج شوكولاتة ناعم وساقع، بيدوب في البق دوب.', price: 60, image: '/hummus_appetizer.jpg', priority: 50 },
      { title: 'بودنج طوفي', description: 'بودنج بطعم التوفي والكراميل، حاجة كده من الآخر.', price: 60, image: '/hummus_appetizer.jpg', priority: 45 },
    ]
  },
  {
    category: 'الشوربة',
    categoryPriority: 30,
    items: [
      { title: 'شوربة حمام', description: 'بولة شوربة حمام دسمة ورايقة ومحبشة بالبهارات، تشربها ترم عضمك وتسند طولك.', price: 150, image: '/hummus_appetizer.jpg', priority: 100 },
      { title: 'شوربة كوارع', description: 'شوربة كوارع بالبهارات، دفا وتغذية وتظبيط دماغ من أول معلقة.', price: 150, image: '/hummus_appetizer.jpg', priority: 90 },
    ]
  },
  {
    category: 'مشروبات باردة',
    categoryPriority: 20,
    items: [
      { title: 'زجاجة ليمون بالنعناع', description: 'عصير ليمون فريش مضروب مع نعناع ساقع، يطري على قلبك.', price: 100, image: '/hummus_appetizer.jpg', priority: 100 },
      { title: 'زجاجة برتقال', description: 'عصير برتقال بلدي فريش متلج، كله فيتامينات وانتعاش.', price: 100, image: '/hummus_appetizer.jpg', priority: 95 },
      { title: 'زجاجة مانجو', description: 'عصير مانجة مركز وتقيل، من بتاع الصيف اللي يروق الدم.', price: 130, image: '/hummus_appetizer.jpg', priority: 90 },
      { title: 'زجاجة فراولة', description: 'عصير فراولة طازة ومسكر ومضروب صح.', price: 100, image: '/hummus_appetizer.jpg', priority: 85 },
      { title: 'زجاجة جوافة', description: 'عصير جوافة باللبن تقيل ومغذي، طعمه حكاية.', price: 100, image: '/hummus_appetizer.jpg', priority: 80 },
      { title: 'زجاجة عناب', description: 'عناب ساقع مشبر ومزز، يروي العطش في الحر.', price: 90, image: '/hummus_appetizer.jpg', priority: 75 },
      { title: 'مياه معدنية صغيرة', description: 'قزازة ماية معدنية صغيرة ساقعة متلجة.', price: 15, image: '/hummus_appetizer.jpg', priority: 70 },
      { title: 'شوب عصير فريش', description: 'شوب عصير فريش طبيعي، اختار اللي على مزاجك.', price: 55, image: '/hummus_appetizer.jpg', priority: 65 },
    ]
  },
  {
    category: 'مشروبات ساخنة',
    categoryPriority: 10,
    items: [
      { title: 'قهوة', description: 'فنجان قهوة تركي بوش مظبوط، يعدل الدماغ بعد الأكلة الدسمة.', price: 70, image: '/hummus_appetizer.jpg', priority: 100 },
      { title: 'قهوة حليب', description: 'قهوة فرنساوي بالحليب السخن، خفيفة وتفوقك.', price: 70, image: '/hummus_appetizer.jpg', priority: 95 },
      { title: 'شاي فتلة', description: 'كوباية شاي خفيفة تظبط الأداء وتهضم.', price: 40, image: '/hummus_appetizer.jpg', priority: 90 },
      { title: 'شاي أخضر زردة', description: 'شاي أخضر بدوي معمول على الحطب، يهضم ويريح المعدة.', price: 60, image: '/hummus_appetizer.jpg', priority: 85 },
      { title: 'شاي أحمر زردة', description: 'شاي أحمر زردة تقيل ومخمخ، بتاع القعدة الصح.', price: 60, image: '/hummus_appetizer.jpg', priority: 80 },
      { title: 'نسكافيه', description: 'مج نسكافيه سخن يصحصحك ويظبط مودك.', price: 60, image: '/hummus_appetizer.jpg', priority: 75 },
      { title: 'كابتشينو', description: 'كابتشينو بوش غني وكريمي، لمحبي الروقان.', price: 60, image: '/hummus_appetizer.jpg', priority: 70 },
      { title: 'كاكاو سخن', description: 'مشروب كاكاو دافي وغني بالشوكولاتة، يدفي في برد الشتا.', price: 60, image: '/hummus_appetizer.jpg', priority: 65 },
      { title: 'ينسون', description: 'ينسون مغلي فريش، يهدي الأعصاب ويروق البال.', price: 60, image: '/hummus_appetizer.jpg', priority: 60 },
      { title: 'كركديه', description: 'كركديه سخن ومزز، يظبط الضغط والمزاج.', price: 60, image: '/hummus_appetizer.jpg', priority: 55 },
      { title: 'نعناع', description: 'نعناع بلدي مغلي فريش، ريحته لوحدها ترد الروح.', price: 60, image: '/hummus_appetizer.jpg', priority: 50 },
    ]
  },
];

async function seed() {
  console.log('🌱 Seeding menu to Firebase...');

  const menuCollection = db.collection('menu');

  // Clear existing
  const existing = await menuCollection.get();
  const batch = db.batch();
  existing.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  console.log(`🗑️  Cleared ${existing.docs.length} existing items`);

  // Add new items
  let count = 0;
  for (const cat of menuData) {
    for (const item of cat.items) {
      await menuCollection.add({
        ...item,
        category: cat.category,
        categoryPriority: cat.categoryPriority,
        createdAt: new Date().toISOString(),
      });
      count++;
    }
  }

  console.log(`✅ Seeded ${count} menu items across ${menuData.length} categories`);
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
