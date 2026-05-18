import React, { useState } from 'react';
import { FaWhatsapp, FaStar, FaShippingFast, FaAward, FaSearch, FaFilter, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";

// --- مصفوفة تحتوي على 30 منتجاً مقسمة حسب الفئات ---
const allProducts = [
  // عطور شرقية وفخمة (1-8)
  { id: 1, name: "ملك العود - King Oud", price: "1,450", category: "oriental", desc: "دهن عود كمبودي معتق مع لمسة عنبرية فاخرة وثبات يدوم لأيام.", image: "https://images.unsplash.com/photo-1544467383-a436a211c4d0?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "مسك النخبة - Elite Musk", price: "890", category: "oriental", desc: "مسك أبيض نقي ممزوج بقطرات من روح الورد الطائفي.", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "ليالي القاهرة - Cairo Nights", price: "1,200", category: "oriental", desc: "مزيج دافئ وجذاب يعكس سحر وسهر ليالي الحسين والشرق القديم.", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "سحر العنبر - Amber Magic", price: "1,100", category: "oriental", desc: "عنبر هندي دافئ محاط بنوتات الفانيليا السوداء والأخشاب.", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop" },
  { id: 5, name: "مجد الشرق - Oriental Glory", price: "1,350", category: "oriental", desc: "عطر رسمي ثقيل يجمع بين الهيل، التوابل، والعود الملكي.", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "الخلطة الملكية - Royal Blend", price: "1,600", category: "oriental", desc: "تركيبة سرية من السيوف والمسك الأسود ومستخلص الورد النادر.", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "سر القافلة - Caravan Secret", price: "980", category: "oriental", desc: "رحلة شرقية ساحرة بنوتات اللبان العماني والزعفران.", image: "https://images.unsplash.com/photo-1588405748373-122b2321bc31?q=80&w=400&auto=format&fit=crop" },
  { id: 8, name: "أمير الصحراء - Desert Prince", price: "1,250", category: "oriental", desc: "عطر جلدي رجالي فاخر ممزوج بلمحة خشب الصندل النقي.", image: "https://images.unsplash.com/photo-1512207736890-6ffed8aee468?q=80&w=400&auto=format&fit=crop" },

  // عطور فرنسية وعالمية (9-16)
  { id: 9, name: "مخمل فرنسي - French Velvet", price: "1,150", category: "french", desc: "عطر باودري ناعم برائحة زهور السوسن والياسمين والمسك.", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=400&auto=format&fit=crop" },
  { id: 10, name: "أكسجين - Intense Oxygen", price: "950", category: "french", desc: "عطر صيفي منعش مليء بنوتات الحمضيات الإيطالية وأمواج البحر.", image: "https://images.unsplash.com/photo-1557177324-56c542165309?q=80&w=400&auto=format&fit=crop" },
  { id: 11, name: "جذاب - Allure Intense", price: "1,300", category: "french", desc: "مزيج غربي مثير من البرغموت والتونكا لإطلالة ليلية لا تُنسى.", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop" },
  { id: 12, name: "بيلادونا - Bella Donna", price: "1,400", category: "french", desc: "عطر نسائي ساحر برائحة الباتشولي السكري والفواكه الحمراء.", image: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=400&auto=format&fit=crop" },
  { id: 13, name: "توت بري - Wild Berries", price: "870", category: "french", desc: "رائحة سويت مبهجة ومنعشة غنية بخلاصة التوت والكرز.", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400&auto=format&fit=crop" },
  { id: 14, name: "جنتلمان - Pure Gentleman", price: "1,200", category: "french", desc: "عطر خشبي كلاسيكي مع نوتات التبغ الفاخر واللافندر.", image: "https://images.unsplash.com/photo-1583467875263-d50fed3d379c?q=80&w=400&auto=format&fit=crop" },
  { id: 15, name: "روز غولد - Rose Gold", price: "1,100", category: "french", desc: "أناقة باريسية خالصة في زجاجة من الورد الفريش والمسك.", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop" },
  { id: 16, name: "منتصف الليل - Midnight Blue", price: "1,050", category: "french", desc: "غموض وجاذبية نوتات الفلفل الأسود مع أخشاب الأرز.", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=400&auto=format&fit=crop" },

  // عطور النيش الحصرية والخاصة (17-24)
  { id: 17, name: "إمبيريال سيلك - Imperial Silk", price: "2,200", category: "niche", desc: "إصدار محدود يحاكي ملمس الحرير بنوتات دافئة من الزعفران والجلود الجافة.", image: "https://images.unsplash.com/photo-1615396899839-c99c121888b0?q=80&w=400&auto=format&fit=crop" },
  { id: 18, name: "توباكو فانيلا - Tobacco Vanille", price: "1,950", category: "niche", desc: "عطر دافئ جداً للمحترفين، يمزج حدة أوراق التبغ مع حلاوة الفانيليا النادرة.", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400&auto=format&fit=crop" },
  { id: 19, name: "سر الخلود - Eternal Secret", price: "2,500", category: "niche", desc: "تركيبة نيش معقدة من نبتة الفيتيفير والبارود البارد والأخشاب الثمينة.", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop" },
  { id: 20, name: "بخور النخبة - Pure Incense", price: "1,800", category: "niche", desc: "عطر روحاني عميق برائحة البخور المتصاعد والمسك النقي.", image: "https://images.unsplash.com/photo-1544467383-a436a211c4d0?q=80&w=400&auto=format&fit=crop" },
  { id: 21, name: "ياقوت - Crimson Ruby", price: "2,100", category: "niche", desc: "عطر مفعم بالطاقة يربط بين الفواكه الاستوائية والأخشاب الملكية.", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400&auto=format&fit=crop" },
  { id: 22, name: "جلد فاخر - Tuscan Leather", price: "2,350", category: "niche", desc: "رائحة الجلود المدبوغة الفاخرة الممزوجة بلمحات الزعتر والتوت الأسود.", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop" },
  { id: 23, name: "أوبال الأسود - Dark Opal", price: "2,600", category: "niche", desc: "عطر غامق وقوي للباحثين عن التميز بنوتات الباتشولي والكاكاو المر.", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=400&auto=format&fit=crop" },
  { id: 24, name: "هالة بيضاء - White Aura", price: "1,900", category: "niche", desc: "رائحة النظافة والنقاء المطلق بمزيج من زهر القطن والمسك السائل.", image: "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=400&auto=format&fit=crop" },

  // مجموعات الهدايا والبوكسات (25-30)
  { id: 25, name: "بوكس العروسين الملكي", price: "3,200", category: "sets", desc: "مجموعة تضم 3 عطور من اختيارك مع مبخرة ذكية مطلية بالذهب.", image: "https://images.unsplash.com/photo-1588405748373-122b2321bc31?q=80&w=400&auto=format&fit=crop" },
  { id: 26, name: "مجموعة المباخر والعود", price: "1,750", category: "sets", desc: "علبة فاخرة تحتوي على أوقية عود مروكي طبيعي ومبخرة هرمية.", image: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=400&auto=format&fit=crop" },
  { id: 27, name: "ثنائي التميز - Classic Duo", price: "1,900", category: "sets", desc: "عطر فرنسي صيفي وعطر شرقي شتوي في باقة واحدة موفرة.", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=400&auto=format&fit=crop" },
  { id: 28, name: "مجموعة المسك المصغرة", price: "990", category: "sets", desc: "4 زجاجات صغيرة من أنواع المسك (غزال، رمان، أبيض، ختام).", image: "https://images.unsplash.com/photo-1557177324-56c542165309?q=80&w=400&auto=format&fit=crop" },
  { id: 29, name: "بوكس كاريزما الرجالي", price: "2,100", category: "sets", desc: "تجميعة عطر جنتلمان وعطر أمير الصحراء في تغليف هدية راقي.", image: "https://images.unsplash.com/photo-1583467875263-d50fed3d379c?q=80&w=400&auto=format&fit=crop" },
  { id: 30, name: "مجموعة هدايا كوين النسائية", price: "2,300", category: "sets", desc: "مجموعة عطر بيلادونا مع لوشن معطر للجسم بنفس الرائحة الساحرة.", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop" },
];

export default function App() {
  const myNumber = "20109184571"; // ضع رقمك المصري هنا بالكود الدولي 
  
  // حالات البحث والتصفية (States)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const sendOrder = (perfumeName) => {
    const message = `السلام عليكم، أريد طلب عطر: ${perfumeName}`;
    window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // تصفية المنتجات بناءً على الفئة وكلمة البحث
  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.desc.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070708] text-[#f1f1f3] font-sans selection:bg-amber-500/40 relative overflow-x-hidden" dir="rtl">
      
      {/* الخلفية السينمائية الـ Catchy الجديدة */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-purple-500/[0.02] blur-[180px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-[20%] w-[500px] h-[500px] bg-amber-500/[0.04] blur-[150px] rounded-full pointer-events-none"></div>

      {/* --- Navbar --- */}
      <nav className="fixed w-full z-50 bg-[#070708]/70 backdrop-blur-xl border-b border-zinc-800/50 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-xl flex items-center justify-center text-black font-extrabold text-xl shadow-lg shadow-amber-500/20">أ</div>
          <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">أريج <span className="text-white/90 font-sans font-light text-xl">للعطور</span></h1>
        </div>
        
        <a 
          href={`https://wa.me/${myNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold text-sm shadow-xl shadow-green-900/20 group"
        >
          <FaWhatsapp size={18} className="group-hover:rotate-12 transition-transform" />
          <span>اطلب عبر الواتساب</span>
        </a>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-xs font-bold tracking-widest text-amber-500 bg-amber-500/10 px-4 py-1.5 rounded-full uppercase mb-6 inline-block border border-amber-500/20">فخامة تليق بك</span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6 text-white leading-tight">
            عطرك هو <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">بصمتك</span> <br/> التي لا تُنسى
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            مجموعة مختارة من أفخم الزيوت العطرية النقية والثابتة. مصنوعة ومصممة بأيدي مصرية لتنافس الماركات العالمية بنسبة ثبات تتعدى الـ 24 ساعة.
          </p>
        </motion.div>
      </section>

      {/* --- Features --- */}
      <section className="py-12 bg-zinc-900/20 border-y border-zinc-800/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <FaAward className="text-amber-500 text-3xl" />
            <h4 className="font-bold text-white text-lg">زيوت أصلية 100%</h4>
            <p className="text-sm text-zinc-500">خامات فرنسية نادرة بتركيز عالي وثبات خارق.</p>
          </div>
          <div className="flex flex-col items-center gap-2 border-y md:border-y-0 md:border-x border-zinc-800/50 py-6 md:py-0">
            <FaShippingFast className="text-amber-500 text-3xl" />
            <h4 className="font-bold text-white text-lg">شحن سريع لكل مصر</h4>
            <p className="text-sm text-zinc-500">توصيل آمن وباب البيت خلال 48 ساعة فقط.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaStar className="text-amber-500 text-3xl" />
            <h4 className="font-bold text-white text-lg">ضمان الاسترجاع</h4>
            <p className="text-sm text-zinc-500">إذا لم يعجبك الثبات، يمكنك استرداد أموالك بالكامل.</p>
          </div>
        </div>
      </section>

      {/* --- لوحة البحث والتصفية المتطورة --- */}
      <section className="pt-20 px-6 max-w-7xl mx-auto">
        <div className="bg-zinc-900/40 border border-zinc-800/60 p-6 rounded-[2rem] backdrop-blur-lg flex flex-col md:flex-row gap-6 justify-between items-center shadow-2xl">
          
          {/* شريط البحث */}
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              placeholder="ابحث عن عطرك المفضل..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-950/80 border border-zinc-800 text-white rounded-2xl px-5 py-3.5 pr-12 focus:outline-none focus:border-amber-500/50 transition-all text-sm group-hover:border-zinc-700"
            />
            <FaSearch className="absolute top-4 right-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors" size={16} />
          </div>

          {/* أزرار الفلترة */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
            {[
              { id: "all", label: "كل المنتجات" },
              { id: "oriental", label: "عطور شرقية" },
              { id: "french", label: "عطور فرنسية" },
              { id: "niche", label: "عطور النيش الفاخرة" },
              { id: "sets", label: "مجموعات الهدايا" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id 
                    ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" 
                    : "bg-zinc-950/60 border border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* --- شبكة المنتجات الـ 30 الفاخرة --- */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        
        {/* إنذار في حال عدم وجود نتائج للبحث */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 text-lg">عذراً، لم نجد عطوراً تطابق بحثك الحالي.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <motion.div 
              key={p.id}
              layout // أنيميشن سلس عند الفلترة والبحث
              whileHover={{ y: -8 }}
              className="bg-zinc-900/30 border border-zinc-800/40 rounded-[2.5rem] overflow-hidden flex flex-col group shadow-xl hover:border-amber-500/30 backdrop-blur-md transition-all duration-300"
            >
              {/* صورة المنتج */}
              <div className="h-60 overflow-hidden relative bg-zinc-950">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  loading="lazy" // تسريع تحميل الـ 30 صورة
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100" 
                />
                {/* السعر المصري المضيء */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-xl border border-amber-500/20 text-amber-400 font-extrabold text-sm shadow-lg">
                  {p.price} ج.م
                </div>
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold mb-2 text-white group-hover:text-amber-400 transition-colors">{p.name}</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-6 h-12 overflow-hidden line-clamp-2">{p.desc}</p>
                </div>
                
                {/* زر الطلب الفوري */}
                <button 
                  onClick={() => sendOrder(p.name)}
                  className="w-full bg-zinc-950/80 hover:bg-amber-500 text-zinc-300 hover:text-black border border-zinc-800 hover:border-amber-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md group/btn"
                >
                  <FaShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />
                  <span className="text-sm">اطلب العطر الآن</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-16 border-t border-zinc-800/50 text-center px-6 bg-zinc-950/20 backdrop-blur-md">
        <h2 className="text-3xl font-serif font-bold text-amber-500 mb-4">أريج للعطور الفاخرة</h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8">نشحن الشغف والفخامة في زجاجات إلى جميع أنحاء جمهورية مصر العربية.</p>
        <div className="w-12 h-[1px] bg-zinc-800 mx-auto mb-6"></div>
        <p className="text-xs text-zinc-600 tracking-wider">© جميع الحقوق محفوظة لـ أريج للعطور في مصر</p>
      </footer>

    </div>
  );
}