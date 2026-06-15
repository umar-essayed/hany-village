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
  title: 'قرية هاني للمأكولات البدوية والمشويات | الإسكندرية والقاهرة',
  description:
    'استمتع بتجربة بدوية أصيلة في فرعينا بالإسكندرية والقاهرة. مشاوي فاخرة، مندي لحم برقي، خيام خصوصية للعائلات. مفتوحون 24 ساعة على مدار الأسبوع.',
  keywords: 'مطعم بدوي, مشاوي, مندي, خيام بدوية, الإسكندرية, القاهرة, مأكولات بدوية, خروف برقي',
  openGraph: {
    title: 'قرية هاني للمأكولات البدوية والمشويات',
    description: 'عش التجربة البدوية الأصيلة — فرعين بالإسكندرية والقاهرة',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable} data-scroll-behavior="smooth">
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
