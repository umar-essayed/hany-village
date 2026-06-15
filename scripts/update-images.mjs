import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const saPath = join(__dirname, '..', 'hany-village-firebase-adminsdk-fbsvc-218f9e2937.json');
const serviceAccount = JSON.parse(readFileSync(saPath, 'utf8'));

if (getApps().length === 0) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

// Item-specific image mapping
const ITEM_IMAGES = {
  // المندي
  'ك ضاني مندي': '/menu/mandi-lamb.jpg',
  'ك كندوز مندي': '/menu/mandi-lamb.jpg',
  'موزة ضاني مندي': '/menu/mandi-lamb.jpg',
  'فرخة مندي': '/menu/grilled-chicken.jpg',
  'تيس صندي (مندي)': '/menu/mandi-lamb.jpg',
  'نصف تيس صندي (مندي)': '/menu/mandi-lamb.jpg',
  'ربع تيس صندي (مندي)': '/menu/mandi-lamb.jpg',

  // مشويات
  'ريش ضاني': '/menu/lamb-chops.jpg',
  'فخادي ضاني شرائح': '/menu/lamb-chops.jpg',
  'مكس ضاني': '/menu/mixed-grill.jpg',
  'فلتو': '/menu/bedouin-meat.jpg',
  'روز بيف': '/menu/bedouin-meat.jpg',
  'طرب': '/menu/kebab.jpg',
  'كفتة': '/menu/kofta.jpg',
  'مشكل مشوي': '/menu/mixed-grill.jpg',
  'موزة مشوية بالواحدة': '/menu/lamb-chops.jpg',
  'فرخة مشوية': '/menu/grilled-chicken.jpg',
  'جوز حمام مشوي': '/menu/pigeon.jpg',
  'سدق بلدي مشوي': '/menu/kebab.jpg',

  // مأكولات بدوية
  'ك ضاني بالأرز أو مبكبكة': '/menu/bedouin-meat.jpg',
  'ك كندوز بالأرز أو مبكبكة': '/menu/bedouin-meat.jpg',
  'ك نيفا بالأرز أو مبكبكة': '/menu/bedouin-meat.jpg',
  'تحميره لحمة بالبصل': '/menu/bedouin-meat.jpg',
  'علاقة ضاني (700 جم)': '/menu/lamb-chops.jpg',
  'موزة ضاني بالأرز أو المكرونة': '/menu/mandi-lamb.jpg',
  'طبق أرز أو مكرونة': '/menu/rice-dish.jpg',

  // الطيور
  'ديك بلدي بالأرز أو المكرونة': '/menu/rooster.jpg',
  'جوز حمام محشي أرز': '/menu/pigeon.jpg',

  // محاشي وطواجن
  'طبق مشكل محاشي': '/menu/stuffed-grape.jpg',
  'طبق ممبار': '/menu/macarona.jpg',
  'طبق بطاطس': '/menu/fries.jpg',
  'طاجن بامية بالضاني صغير': '/menu/tagine.jpg',
  'طاجن بسلة بالضاني': '/menu/tagine.jpg',
  'طاجن كوارع': '/menu/tagine.jpg',
  'طاجن عكاوي': '/menu/tagine.jpg',
  'طاجن ورق عنب بالكوارع': '/menu/tagine.jpg',
  'سمبوسة بالجبنة': '/menu/sambousek.jpg',
  'طبق جلاش': '/menu/sambousek.jpg',
  'طبق ورق عنب': '/menu/stuffed-grape.jpg',
  'طبق ملوخية خضرا': '/menu/molokhia.jpg',

  // كنافة
  'كنافة قشطة': '/menu/kunafa.jpg',
  'كنافة جبنة': '/menu/kunafa.jpg',

  // الحلو
  'أم علي': '/menu/umm-ali.jpg',
  'مهلبية': '/menu/rice-pudding.jpg',
  'كريم كراميل': '/menu/cream-caramel.jpg',
  'جيلي فواكه': '/menu/pudding.jpg',
  'جيلي الماظية': '/menu/pudding.jpg',
  'أرز باللبن سادة': '/menu/rice-pudding.jpg',
  'أرز باللبن بالفواكه': '/menu/rice-pudding.jpg',
  'أرز باللبن فرن': '/menu/rice-pudding.jpg',
  'كاستر بالشيكولاتة': '/menu/pudding.jpg',
  'بودنج شيكولاتة': '/menu/pudding.jpg',
  'بودنج طوفي': '/menu/pudding.jpg',

  // شوربة
  'شوربة حمام': '/menu/soup.jpg',
  'شوربة كوارع': '/menu/soup.jpg',

  // مشروبات باردة
  'زجاجة ليمون بالنعناع': '/menu/lemonade.jpg',
  'زجاجة برتقال': '/menu/orange-juice.jpg',
  'زجاجة مانجو': '/menu/mango-juice.jpg',
  'زجاجة فراولة': '/menu/strawberry-juice.jpg',
  'زجاجة جوافة': '/menu/mango-juice.jpg',
  'زجاجة عناب': '/menu/hibiscus.jpg',
  'مياه معدنية صغيرة': '/menu/water-bottle.jpg',
  'شوب عصير فريش': '/menu/orange-juice.jpg',

  // مشروبات ساخنة
  'قهوة': '/menu/turkish-coffee.jpg',
  'قهوة حليب': '/menu/cappuccino.jpg',
  'شاي فتلة': '/menu/tea.jpg',
  'شاي أخضر زردة': '/menu/mint-tea.jpg',
  'شاي أحمر زردة': '/menu/tea.jpg',
  'نسكافيه': '/menu/cappuccino.jpg',
  'كابتشينو': '/menu/cappuccino.jpg',
  'كاكاو سخن': '/menu/hot-chocolate.jpg',
  'ينسون': '/menu/mint-tea.jpg',
  'كركديه': '/menu/hibiscus.jpg',
  'نعناع': '/menu/mint-tea.jpg',
};

async function updateImages() {
  console.log('🖼️  Updating product images in Firebase...');

  const snapshot = await db.collection('menu').get();
  const batch = db.batch();
  let updated = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const newImage = ITEM_IMAGES[data.title];
    if (newImage && data.image !== newImage) {
      batch.update(doc.ref, { image: newImage });
      updated++;
      console.log(`  ✅ ${data.title} → ${newImage}`);
    }
  }

  if (updated > 0) {
    await batch.commit();
  }
  console.log(`\n✅ Updated ${updated} items`);
  process.exit(0);
}

updateImages().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
