import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

let adminDb = null;
let isConfigured = false;

function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Try service account JSON file first
  const saPath = join(process.cwd(), 'hany-village-firebase-adminsdk-fbsvc-218f9e2937.json');
  if (existsSync(saPath)) {
    try {
      const serviceAccount = JSON.parse(readFileSync(saPath, 'utf8'));
      isConfigured = true;
      return initializeApp({ credential: cert(serviceAccount) });
    } catch (e) {
      // fall through
    }
  }

  // Try env vars
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey && !privateKey.includes('REPLACE_WITH')) {
    try {
      isConfigured = true;
      return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
    } catch (e) {
      // fall through
    }
  }

  return null;
}

try {
  const adminApp = initFirebaseAdmin();
  if (adminApp && isConfigured) {
    adminDb = getFirestore(adminApp);
  }
} catch (e) {
  adminDb = null;
}

export { adminDb, isConfigured };
