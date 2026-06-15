import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const IMAGES_DIR = join(process.cwd(), 'public', 'menu');

const downloads = [
  // المندي
  { file: 'mandi-lamb.jpg', url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80' },
  
  // مشويات
  { file: 'mixed-grill.jpg', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80' },
  { file: 'lamb-chops.jpg', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80' },
  { file: 'kofta.jpg', url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80' },
  { file: 'grilled-chicken.jpg', url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80' },
  { file: 'kebab.jpg', url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80' },
  { file: 'pigeon.jpg', url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80' },
  
  // مأكولات بدوية
  { file: 'bedouin-meat.jpg', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' },
  { file: 'rice-dish.jpg', url: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800&q=80' },
  { file: 'fattah.jpg', url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80' },
  
  // الطيور
  { file: 'rooster.jpg', url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800&q=80' },
  
  // محاشي وطواجن
  { file: 'tagine.jpg', url: 'https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=800&q=80' },
  { file: 'stuffed-grape.jpg', url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80' },
  { file: 'molokhia.jpg', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
  { file: 'fries.jpg', url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80' },
  { file: 'sambousek.jpg', url: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800&q=80' },
  { file: 'macarona.jpg', url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80' },
  
  // كنافة وحلو
  { file: 'kunafa.jpg', url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80' },
  { file: 'umm-ali.jpg', url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80' },
  { file: 'pudding.jpg', url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80' },
  { file: 'rice-pudding.jpg', url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80' },
  { file: 'cream-caramel.jpg', url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80' },
  
  // شوربة
  { file: 'soup.jpg', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80' },
  
  // مشروبات باردة
  { file: 'lemonade.jpg', url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80' },
  { file: 'orange-juice.jpg', url: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80' },
  { file: 'mango-juice.jpg', url: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80' },
  { file: 'strawberry-juice.jpg', url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&q=80' },
  { file: 'water-bottle.jpg', url: 'https://images.unsplash.com/photo-1560023907-5f339617ea4a?w=800&q=80' },
  
  // مشروبات ساخنة
  { file: 'turkish-coffee.jpg', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=800&q=80' },
  { file: 'tea.jpg', url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80' },
  { file: 'cappuccino.jpg', url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80' },
  { file: 'hibiscus.jpg', url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80' },
  { file: 'hot-chocolate.jpg', url: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800&q=80' },
  { file: 'mint-tea.jpg', url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80' },
];

function download() {
  console.log('📸 Downloading menu images from Unsplash...');
  
  if (!existsSync(IMAGES_DIR)) {
    execSync(`mkdir -p ${IMAGES_DIR}`);
  }

  let success = 0;
  let failed = 0;

  for (const img of downloads) {
    const path = join(IMAGES_DIR, img.file);
    if (existsSync(path)) {
      console.log(`  ⏭️  ${img.file} — already exists`);
      success++;
      continue;
    }
    
    try {
      execSync(`curl -sL -o "${path}" "${img.url}"`, { timeout: 15000 });
      const size = execSync(`stat -c%s "${path}" 2>/dev/null || echo 0`).toString().trim();
      if (parseInt(size) > 10000) {
        console.log(`  ✅ ${img.file}`);
        success++;
      } else {
        console.log(`  ⚠️  ${img.file} — too small, skipping`);
        execSync(`rm -f "${path}"`);
        failed++;
      }
    } catch (e) {
      console.log(`  ❌ ${img.file} — download failed`);
      failed++;
    }
  }

  console.log(`\n✅ Done: ${success} downloaded, ${failed} failed`);
}

download();
