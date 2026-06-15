import { Tajawal } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiChatbot from '@/components/AiChatbot';
import CartDrawer from '@/components/CartDrawer';
import MobileNav from '@/components/MobileNav';
import CartToast from '@/components/CartToast';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  display: 'swap',
  variable: '--font-tajawal',
});

export const metadata = {
  metadataBase: new URL('https://hany-village.vercel.app'),
  title: {
    default: 'قرية هاني للمأكولات البدوية والمشويات | الإسكندرية والقاهرة',
    template: '%s | قرية هاني',
  },
  description:
    'استمتع بتجربة بدوية أصيلة في فرعينا بالإسكندرية والقاهرة. مشاوي فاخرة على الفحم، مندي لحم برقي، خيام بدوية خاصة للعائلات. مفتوحون 24 ساعة على مدار الأسبوع.',
  keywords: [
    'مطعم بدوي', 'مشاوي', 'مندي', 'خيام بدوية', 'الإسكندرية', 'القاهرة',
    'مأكولات بدوية', 'خروف برقي', 'مطعم مشويات', 'قرية هاني', 'مندي لحم',
    'حجز خيمة', 'توصيل', 'مطعم مفتوح 24 ساعة', 'شاورما', 'كفتة',
  ],
  authors: [{ name: 'قرية هاني', url: 'https://hany-village.vercel.app' }],
  creator: 'قرية هاني للمأكولات البدوية',
  publisher: 'قرية هاني',
  formatDetection: { telephone: true, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://hany-village.vercel.app',
    siteName: 'قرية هاني للمأكولات البدوية والمشويات',
    title: 'قرية هاني للمأكولات البدوية والمشويات',
    description: 'عش التجربة البدوية الأصيلة — فرعين بالإسكندرية والقاهرة. مشاوي فاخرة، مندي، خيام بدوية خاصة. مفتوح 24 ساعة.',
    images: [
      {
        url: '/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'قرية هاني للمأكولات البدوية والمشويات',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'قرية هاني للمأكولات البدوية والمشويات',
    description: 'عش التجربة البدوية الأصيلة — فرعين بالإسكندرية والقاهرة',
    images: ['/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  verification: {},
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="قرية هاني" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${tajawal.className} bg-[#0A0A0A] text-[#F5F0EB] antialiased`}>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4A574]/[0.03] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#8B4513]/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10">
          <Navbar />
          <main className="pb-16 md:pb-0">{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
          <MobileNav />
          <AiChatbot />
        </div>
      </body>
    </html>
  );
}
