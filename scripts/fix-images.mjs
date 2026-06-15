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

const IMAGE_MAP = {
  'المندي': '/mandi_lamb.jpg',
  'مشويات': '/mixed_grill.jpg',
  'مأكولات بدوية': '/mandi_lamb.jpg',
  'الطيور': '/mixed_grill.jpg',
  'محاشي وطواجن': '/hummus_appetizer.jpg',
  'كنافة': '/hummus_appetizer.jpg',
  'الحلو': '/hummus_appetizer.jpg',
  'الشوربة': '/hummus_appetizer.jpg',
  'مشروبات باردة': '/hummus_appetizer.jpg',
  'مشروبات ساخنة': '/hummus_appetizer.jpg',
};

const SPECIAL_IMAGES = {
  'ريش ضاني': '/lamb_chops.jpg',
  'فخادي ضاني شرائح': '/lamb_chops.jpg',
  'موزة مشوية بالواحدة': '/lamb_chops.jpg',
  'علاقة ضاني (700 جم)': '/lamb_chops.jpg',
  'طاجن بامية بالضاني صغير': '/mandi_lamb.jpg',
  'طاجن بسلة بالضاني': '/mandi_lamb.jpg',
  'طاجن كوارع': '/mandi_lamb.jpg',
  'طاجن عكاوي': '/mandi_lamb.jpg',
  'طاجن ورق عنب بالكوارع': '/mandi_lamb.jpg',
  'طبق مشكل محاشي': '/mandi_lamb.jpg',
  'طبق ممبار': '/mandi_lamb.jpg',
  'طبق جلاش': '/mandi_lamb.jpg',
  'طبق ملوخية خضرا': '/mandi_lamb.jpg',
  'طبق ورق عنب': '/hummus_appetizer.jpg',
  'طبق بطاطس': '/hummus_appetizer.jpg',
  'سمبوسة بالجبنة': '/hummus_appetizer.jpg',
};

async function fixImages() {
  console.log('🖼️  Fixing product images...');

  const snapshot = await db.collection('menu').get();
  const batch = db.batch();
  let updated = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const newImage = SPECIAL_IMAGES[data.title] || IMAGE_MAP[data.category] || '/mixed_grill.jpg';

    if (data.image !== newImage) {
      batch.update(doc.ref, { image: newImage });
      updated++;
    }
  }

  await batch.commit();
  console.log(`✅ Updated ${updated} items with correct images`);
  process.exit(0);
}

fixImages().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
