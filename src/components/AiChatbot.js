'use client';

import { useState, useRef, useEffect } from 'react';

const CHAT_RESPONSES = {
  مواعيد: {
    keywords: ['مواعيد', 'وقت', 'ساعات', 'متى', 'فتح', 'مفتوح', 'اوقات', 'الدوام'],
    response: '🕐 نحن مفتوحون **24 ساعة** طوال أيام الأسبوع، بدون أي توقف! يمكنك الحضور أو الطلب في أي وقت يناسبك.',
  },
  مندي: {
    keywords: ['مندي', 'خروف', 'برقي', 'سعر الخروف', 'كم المندي'],
    response: '🐑 خروف المندي البرقي يُقدَّم بسعر يبدأ من **575 ج.م** للنصف كيلو و**1150 ج.م** للكيلو. مطهي بالطريقة البدوية الأصيلة في حفرة البرميل!',
  },
  توصيل: {
    keywords: ['توصيل', 'ديليفري', 'دليفري', 'ارسال', 'إرسال', 'بيوصل'],
    response: '🛵 نعم! نوصل لجميع مناطق الإسكندرية والقاهرة. اضغط على "اطلب دليفري" في الصفحة الرئيسية أو تصفح قائمة الطعام وأضف للسلة!',
  },
  حجز: {
    keywords: ['حجز', 'احجز', 'خيمة', 'طاولة', 'reservation', 'book', 'مكان'],
    response: '⛺ يمكنك حجز خيمة بدوية خاصة أو طاولة عادية من خلال صفحة [**احجز خيمتك**](/book-tent). أو اتصل بنا مباشرة على **01100999920**!',
  },
  اسعار: {
    keywords: ['سعر', 'أسعار', 'اسعار', 'كم', 'غالي', 'تكلفة', 'بكام'],
    response: '💰 أسعارنا تبدأ من:\n• ريش ضاني: **600 ج.م**\n• كفتة: **495 ج.م**\n• مندي ضاني: **575 ج.م**\n• فرخة مشوية: **450 ج.م**\n\nتصفح [قائمة الطعام](/menu) لعرض كامل الأسعار!',
  },
  موقع: {
    keywords: ['عنوان', 'موقع', 'فين', 'أين', 'location', 'مكانكم', 'ازاي اجي', 'كيف أصل'],
    response: '📍 فرعينا:\n• **الإسكندرية**: طريق القاهرة الصحراوي الكيلو 30\n• **القاهرة**: الشيخ زايد — أمام داندي مول\n\nزيارة صفحة [**تواصل معنا**](/contact) لعرض الخريطة!',
  },
  فروع: {
    keywords: ['فرع', 'فروع', 'فرعين', 'القاهرة', 'الإسكندرية', 'اسكندرية'],
    response: '📍 عندنا **فرعين**:\n• 🏙️ **فرع الإسكندرية**: طريق القاهرة الصحراوي الكيلو 30\n• 🌆 **فرع القاهرة**: الشيخ زايد — أمام داندي مول\n\nالاتنين مفتوحين 24 ساعة!',
  },
  واتساب: {
    keywords: ['واتساب', 'whatsapp', 'واتس', 'تواصل'],
    response: '💬 تواصل معنا عبر واتساب مباشرة: [**اضغط هنا**](https://wa.me/201100999920) أو أرسل رسالة على **01100999920**',
  },
  مرحبا: {
    keywords: ['مرحبا', 'هلا', 'أهلاً', 'اهلا', 'سلام', 'السلام', 'صباح', 'مساء'],
    response: '👋 أهلاً وسهلاً بك في **قرية هاني للمأكولات البدوية**! كيف يمكنني مساعدتك اليوم؟\n\nيمكنني مساعدتك في:\n• 📋 قائمة الطعام والأسعار\n• 🛵 الطلب والتوصيل\n• ⛺ حجز خيمة أو طاولة\n• 📍 فروعنا وأوقات العمل',
  },
  كنافة: {
    keywords: ['كنافة', 'كنافه', 'حلويات'],
    response: '🍯 عندنا كنافة سورية على الفحم بأيدي متخصصة:\n• كنافة قشطة: من **150 ج.م**\n• كنافة جبنة: من **150 ج.م**\n\nالمقادير: صغير 150 | وسط 180 | كبير 250 🤤',
  },
  مشويات: {
    keywords: ['مشوي', 'مشويات', 'فحم', 'كفتة', 'ريش', 'طرب'],
    response: '🔥 أجمد مشويات على الفحم:\n• ريش ضاني: **600 ج.م** (1/2 كيلو)\n• مكس ضاني: **600 ج.م** (1/2 كيلو)\n• كفتة: **495 ج.م** (1/2 كيلو)\n• فرخة مشوية: **450 ج.م**\n\nكلها مشوية على الفحم الطبيعي! 🔥',
  },
};

const QUICK_REPLIES = [
  { label: '🔥 المشويات', query: 'إيه المشويات؟' },
  { label: '🐑 المندي', query: 'كم سعر المندي؟' },
  { label: '🍯 الكنافة', query: 'إيه أسعار الكنافة؟' },
  { label: '📍 فروعنا', query: 'فين فروعكم؟' },
  { label: '⏰ أوقات العمل', query: 'مواعيد العمل؟' },
];

function getBotReply(text) {
  const lowerText = text.toLowerCase();
  for (const key of Object.keys(CHAT_RESPONSES)) {
    const { keywords, response } = CHAT_RESPONSES[key];
    if (keywords.some((kw) => lowerText.includes(kw))) {
      return response;
    }
  }
  return '🤔 شكراً لسؤالك! للحصول على أفضل إجابة:\n\n📞 **01100999920**\n💬 [واتساب](https://wa.me/201100999920)\n\nأو تصفح [القائمة](/menu) مباشرة! 🌟';
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#D4A574] underline font-bold" target="_blank" rel="noopener">$1</a>')
    .replace(/\n/g, '<br/>');
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '👋 أهلاً! أنا مساعد قرية هاني. اسألني عن المنيو والأسعار والفروع!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const msgIdCounter = useRef(100);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setShowBubble(false);

    msgIdCounter.current += 1;
    const userMsg = {
      id: msgIdCounter.current,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotReply(text);
      msgIdCounter.current += 1;
      const botMsg = {
        id: msgIdCounter.current,
        sender: 'bot',
        text: botReply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[55]">
      {/* Chat Window */}
      {isOpen && (
        <div className="chat-appear w-[340px] sm:w-96 bg-[#0F0F0F] rounded-3xl flex flex-col overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60"
          style={{ height: 'min(500px, 70vh)' }}
        >
          {/* Header */}
          <div className="p-4 flex items-center gap-3 border-b border-white/[0.06] bg-gradient-to-l from-[#D4A574]/10 to-transparent">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D4A574] to-[#E8C547] flex items-center justify-center text-xl shadow-lg shadow-[#D4A574]/20">
                🍖
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#0F0F0F]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#F5F0EB] text-sm">مساعد قرية هاني</h3>
              <p className="text-green-400 text-[10px] font-semibold">متصل الآن</p>
            </div>
            <button
              id="close-chatbot-btn"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-[#A89B8C] transition-colors border border-white/[0.04]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0A0A0A]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#D4A574]/10 flex items-center justify-center text-sm ml-2 flex-shrink-0 mt-1 border border-[#D4A574]/20">
                    🍖
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#D4A574]/20 text-[#F5F0EB] rounded-tr-sm border border-[#D4A574]/15'
                      : 'bg-[#1A1A1A] text-[#A89B8C] rounded-tl-sm border border-white/[0.06]'
                  }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-end items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#D4A574]/10 flex items-center justify-center text-sm border border-[#D4A574]/20">
                  🍖
                </div>
                <div className="bg-[#1A1A1A] rounded-2xl px-4 py-3 border border-white/[0.06] rounded-tl-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#D4A574] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#D4A574] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#D4A574] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 py-2.5 border-t border-white/[0.06] bg-[#0A0A0A]/30 flex gap-2 overflow-x-auto scrollbar-none">
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr.label}
                onClick={() => sendMessage(qr.query)}
                className="flex-shrink-0 text-[11px] bg-[#1A1A1A] hover:bg-[#D4A574]/10 text-[#D4A574] border border-[#D4A574]/15 px-3 py-1.5 rounded-full font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/[0.06] bg-[#0F0F0F] flex items-center gap-2">
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اسألني أي حاجة..."
              className="flex-1 bg-[#1A1A1A] rounded-xl px-4 py-2.5 text-sm text-[#F5F0EB] border border-white/[0.06] focus:outline-none focus:border-[#D4A574]/30 transition-all placeholder:text-[#6B5E50]"
            />
            <button
              id="chatbot-send-btn"
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 rounded-xl btn-gold disabled:opacity-30 flex items-center justify-center text-[#0A0A0A] transition-all duration-200 hover:scale-105 disabled:scale-100 active:scale-95"
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Chat Bubble Notification */}
      {showBubble && !isOpen && (
        <div className="absolute bottom-full right-0 mb-3 chat-appear bg-[#1A1A1A]/95 backdrop-blur-xl rounded-2xl px-4 py-2.5 w-[180px] border border-[#D4A574]/20 shadow-xl">
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#1A1A1A] border-b border-r border-[#D4A574]/20 rotate-45" />
          <p className="text-[#F5F0EB] text-xs font-bold">👋 محتاج مساعدة؟</p>
          <p className="text-[#6B5E50] text-[10px] mt-0.5">اسألني عن المنيو!</p>
        </div>
      )}

      {/* Toggle Button */}
      <button
        id="chatbot-toggle-btn"
        onClick={() => { setIsOpen(!isOpen); setShowBubble(false); }}
        className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen
            ? 'bg-[#1A1A1A] border border-white/[0.08] text-[#A89B8C]'
            : 'btn-gold text-[#0A0A0A] shadow-[#D4A574]/30'
        }`}
        aria-label="فتح المساعد الذكي"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
