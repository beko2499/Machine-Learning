/* ============================================
   TTS.JS - Text-to-Speech & Word Click Popup
   Machine Learning Edition
   ============================================ */

let currentUtterance = null;

function speakText(text, btn) {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        document.querySelectorAll('.tts-btn.speaking').forEach(b => b.classList.remove('speaking'));
        if (btn && btn.classList.contains('speaking')) { btn.classList.remove('speaking'); return; }
    }
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US'; utterance.rate = 0.85; utterance.pitch = 1;
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                         voices.find(v => v.lang.startsWith('en-US')) ||
                         voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;
    if (btn) {
        btn.classList.add('speaking');
        utterance.onend = () => btn.classList.remove('speaking');
        utterance.onerror = () => btn.classList.remove('speaking');
    }
    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
}

function speakWord(word) {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US'; utterance.rate = 0.75;
    const voices = speechSynthesis.getVoices();
    const v = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
              voices.find(v => v.lang.startsWith('en-US')) ||
              voices.find(v => v.lang.startsWith('en'));
    if (v) utterance.voice = v;
    speechSynthesis.speak(utterance);
}

function injectTTSButtons() {
    document.querySelectorAll('.definition-quote').forEach(quote => {
        if (quote.querySelector('.tts-btn')) return;
        addTTSButton(quote);
    });
    // All paragraph-heavy containers (Ch1/Ch2 + Ch3)
    const selectors = [
        '.highlight-box p',
        '.highlight-box.green p',
        '.concept-block p',
        '.info-box p',
        '.comparison-item p',
        '.formula-box'
    ];
    document.querySelectorAll(selectors.join(', ')).forEach(el => {
        if (el.querySelector('.tts-btn')) return;
        const text = el.textContent || '';
        const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
        if (englishChars >= 15) addTTSButton(el);
    });
}

function addTTSButton(element) {
    const textContent = element.textContent || element.innerText;
    const btn = document.createElement('button');
    btn.className = 'tts-btn'; btn.title = 'استمع للنطق الصحيح'; btn.innerHTML = '🔊';
    btn.onclick = function(e) { e.stopPropagation(); speakText(textContent, this); };
    element.style.position = 'relative';
    element.insertBefore(btn, element.firstChild);
}

// ============ ML DICTIONARY ============
const dictionary = {
    'machine':'آلة / جهاز','learning':'تعلّم','algorithm':'خوارزمية',
    'algorithms':'خوارزميات','model':'نموذج','models':'نماذج',
    'data':'بيانات','dataset':'مجموعة بيانات','datasets':'مجموعات بيانات',
    'training':'تدريب','testing':'اختبار','prediction':'تنبؤ',
    'predictions':'تنبؤات','accuracy':'دقة','performance':'أداء',
    'experience':'خبرة / تجربة','task':'مهمة','tasks':'مهام',
    'measure':'مقياس','improve':'يتحسن','improves':'يتحسن',
    'supervised':'مُشرف عليه','unsupervised':'غير مُشرف عليه',
    'reinforcement':'تعزيز','classification':'تصنيف',
    'regression':'انحدار','clustering':'تجميع / عنقدة',
    'association':'ارتباط / ترابط','dimensionality':'أبعاد',
    'reduction':'تقليل / اختزال','feature':'خاصية / سمة',
    'features':'خصائص / سمات','label':'تسمية / علامة',
    'labeled':'مُعنون / مصنّف','unlabeled':'غير مُعنون',
    'input':'مُدخل','output':'مُخرج','predict':'يتنبأ',
    'pattern':'نمط','patterns':'أنماط','trend':'اتجاه',
    'trends':'اتجاهات','similarity':'تشابه',
    'category':'فئة','categories':'فئات',
    'numerical':'عددي','categorical':'فئوي','ordinal':'ترتيبي',
    'discrete':'منفصل','continuous':'مستمر',
    'naive':'ساذج','bayes':'بايز','bayesian':'بايزي',
    'support':'دعم','vector':'متجه','vectors':'متجهات',
    'decision':'قرار','tree':'شجرة','trees':'أشجار',
    'random':'عشوائي','forest':'غابة',
    'neural':'عصبي','network':'شبكة','networks':'شبكات',
    'deep':'عميق','layer':'طبقة','layers':'طبقات',
    'hidden':'مخفي','neuron':'عصبون','neurons':'عصبونات',
    'weight':'وزن','weights':'أوزان','bias':'انحياز',
    'activation':'تفعيل','function':'دالة / وظيفة',
    'gradient':'تدرّج','descent':'نزول / هبوط',
    'loss':'خسارة / فقدان','cost':'تكلفة',
    'optimization':'تحسين','optimizer':'محسّن',
    'overfit':'إفراط في التعلم','overfitting':'إفراط في التعلم',
    'underfit':'نقص في التعلم','underfitting':'نقص في التعلم',
    'cross-validation':'تحقق متقاطع','validation':'تحقق',
    'train':'تدريب','test':'اختبار','split':'تقسيم',
    'python':'بايثون','library':'مكتبة','libraries':'مكتبات',
    'numpy':'نمباي (مكتبة حسابية)','scipy':'سايباي (حوسبة علمية)',
    'matplotlib':'ماتبلوتلب (رسوم بيانية)',
    'scikit-learn':'ساي-كت لرن (تعلم آلة)',
    'pandas':'بانداس (تحليل بيانات)',
    'anaconda':'أناكوندا (بيئة بايثون)',
    'artificial':'اصطناعي','intelligence':'ذكاء',
    'application':'تطبيق','applications':'تطبيقات',
    'software':'برمجيات','computer':'حاسوب','program':'برنامج',
    'programs':'برامج','human':'بشري','intervention':'تدخل',
    'outcome':'نتيجة','outcomes':'نتائج',
    'environment':'بيئة','agent':'وكيل','action':'فعل / إجراء',
    'state':'حالة','reward':'مكافأة','trial':'محاولة',
    'error':'خطأ','value':'قيمة','values':'قيم',
    'variable':'متغير','variables':'متغيرات',
    'histogram':'مدرج تكراري','distribution':'توزيع',
    'mean':'متوسط','deviation':'انحراف','standard':'معياري',
    'normal':'طبيعي','array':'مصفوفة',
    'exploratory':'استكشافي','analysis':'تحليل',
    'process':'عملية','science':'علم',
    'weather':'طقس','stock':'أسهم','price':'سعر',
    'customer':'عميل','segmentation':'تقسيم',
    'spam':'بريد مزعج','filter':'تصفية / مرشح',
    'image':'صورة','recognition':'تعرّف',
    'recommendation':'توصية','system':'نظام',
    'autonomous':'ذاتي / مستقل','driving':'قيادة',
    'robot':'روبوت','game':'لعبة',
    'interdisciplinary':'متعدد التخصصات','field':'مجال',
    'classic':'كلاسيكي / تقليدي','modern':'حديث',
    'install':'تثبيت','download':'تحميل','version':'إصدار',
    'setup':'إعداد','configuration':'تكوين / إعداد',
    'example':'مثال','examples':'أمثلة',
    'type':'نوع','types':'أنواع',
    'method':'طريقة / أسلوب','approach':'نهج / منهج',
    'future':'مستقبل','revolution':'ثورة',
    'addicted':'مدمن','witness':'يشهد',
    'accurate':'دقيق','focus':'تركيز','development':'تطوير',
    'primary':'أساسي / أولي','aim':'هدف',
    'allow':'يسمح','automatically':'تلقائياً',
    // Ch2: Naive Bayes terms
    'probability':'احتمال','probabilities':'احتمالات',
    'conditional':'شرطي','prior':'مسبق / أولي',
    'posterior':'بَعدي / لاحق','likelihood':'إمكانية / مرجحية',
    'evidence':'دليل / برهان','theorem':'نظرية',
    'independent':'مستقل','independence':'استقلالية',
    'dependent':'تابع / معتمد','correlation':'ارتباط / علاقة',
    'correlated':'مترابط','frequency':'تكرار / تردد',
    'observed':'مُلاحَظ','observation':'ملاحظة',
    'observations':'ملاحظات','calculate':'يحسب',
    'maximum':'أعلى / أقصى','minimum':'أدنى / أقل',
    'class':'فئة / صنف','classify':'يصنّف',
    'classifier':'مصنّف','given':'بشرط / معطى',
    'tennis':'تنس','play':'يلعب','outlook':'حالة الطقس',
    'temperature':'درجة حرارة','humidity':'رطوبة',
    'wind':'رياح','sunny':'مشمس','overcast':'غائم',
    'rain':'مطر','hot':'حار','mild':'معتدل','cool':'بارد',
    'strong':'قوي','weak':'ضعيف','fruit':'فاكهة',
    'apple':'تفاحة','banana':'موزة','yellow':'أصفر',
    'sweet':'حلو','taste':'طعم / مذاق','size':'حجم',
    'color':'لون','total':'مجموع / إجمالي',
    'predictive':'تنبؤي','efficient':'فعّال / كفؤ',
    'accessible':'متاح / سهل الوصول','reusable':'قابل لإعادة الاستخدام',
    'implementing':'تنفيذ / تطبيق','implement':'ينفذ / يطبق',
    'gaussian':'غاوسي (توزيع طبيعي)','phase':'مرحلة',
    'step':'خطوة','steps':'خطوات',
    // Ch3: SVM terms
    'hyperplane':'مستوى فائق (خط الفصل)','margin':'هامش',
    'margins':'هوامش','kernel':'نواة / كيرنل','kernels':'نوى / كيرنلات',
    'gamma':'غاما (مدى التأثير)','regularization':'تنعيم / تنظيم',
    'parameter':'معامل / عامل','parameters':'معاملات / عوامل',
    'linear':'خطي','nonlinear':'غير خطي','polynomial':'متعدد الحدود',
    'trick':'حيلة / خدعة','dimension':'بُعد','dimensions':'أبعاد',
    'dimensional':'بُعدي','higher':'أعلى / أكبر',
    'tolerance':'تسامح / تحمّل','outlier':'قيمة شاذة','outliers':'قيم شاذة',
    'misclassify':'يصنّف خطأ','misclassifying':'تصنيف خطأ',
    'misclassification':'خطأ في التصنيف',
    'influence':'تأثير','reaches':'يصل','nearby':'قريب',
    'smooth':'سلس / ناعم','complex':'معقد',
    'equidistant':'متساوي البعد','separation':'فصل','separable':'قابل للفصل',
    'boundary':'حدود','decision-boundary':'حدود القرار',
    'inner':'داخلي','product':'ناتج / حاصل ضرب',
    'obesity':'بدانة / سمنة','obese':'بدين / سمين',
    'projection':'إسقاط','transform':'تحويل','transformation':'تحويل',
    'maximize':'يكبّر / يعظّم','maximize':'يكبّر / يعظّم',
    'optimal':'أمثل / مثالي','optimize':'يحسّن',
    'coefficient':'معامل','coefficients':'معاملات',
    'plane':'مستوى / سطح','surface':'سطح',
    'overlap':'تداخل','overlapping':'متداخل',
    // Ch4: Decision Trees terms
    'entropy':'إنتروبيا (درجة العشوائية)','impurity':'عدم النقاء',
    'information':'معلومات','gain':'كسب / ربح',
    'root':'جذر','node':'عقدة','nodes':'عقد',
    'leaf':'ورقة','branch':'فرع','branches':'فروع',
    'split':'تقسيم','splitting':'تقسيم',
    'pruning':'تقليم','depth':'عمق',
    'dichotomiser':'ثنائي التفرع','iterative':'تكراري',
    'boosting':'تعزيز','bagging':'تكييس / تجميع',
    'xgboost':'إكس جي بوست (تعزيز متطرف)',
    'golf':'غولف','windy':'عاصف / رياح',
    'overcast':'غائم','rainy':'ماطر',
    'weighted':'مرجح / موزون','average':'متوسط',
    'divide':'يقسم','subsection':'قسم فرعي',
    'criteria':'معايير / شروط','parametric':'معلمي / بارامتري',
    'inferred':'مستنتج / مستخلص','rules':'قواعد',
    'divisible':'قابل للقسمة','occurrence':'حدوث / ظهور',
    // Ch5: Linear Regression terms
    'regression':'انحدار','linear':'خطي',
    'slope':'ميل / انحدار','intercept':'تقاطع / نقطة التقاطع',
    'hypothesis':'فرضية','predict':'يتنبأ','prediction':'تنبؤ',
    'continuous':'مستمر','discrete':'منفصل',
    'dependent':'تابع','independent':'مستقل',
    'variable':'متغير','variables':'متغيرات',
    'cost':'تكلفة','minimize':'يقلل / يصغر',
    'squared':'مربع','error':'خطأ','errors':'أخطاء',
    'sum':'مجموع','difference':'فرق',
    'scatter':'تبعثر / انتشار','plot':'رسم بياني',
    'actual':'فعلي','predicted':'متوقع',
    'revenue':'إيرادات','temperature':'درجة حرارة',
    'housing':'إسكان / سكن','price':'سعر','prices':'أسعار',
    'epsilon':'إبسلون (الخطأ)','theta':'ثيتا (معامل)',
    'fit':'ملاءمة / مطابقة','best-fit':'أفضل ملاءمة',
    'relationship':'علاقة','positive':'إيجابي / موجب',
    'negative':'سلبي / سالب','parallel':'موازي',
    // Ch6: Cost Function & Gradient Descent terms
    'gradient':'تدرج / انحدار','descent':'نزول / هبوط',
    'convergence':'تقارب','converge':'يتقارب',
    'diverge':'يتباعد','overshoot':'يتخطى الحد',
    'iteration':'تكرار','iteratively':'تكرارياً',
    'convex':'محدب','residuals':'بواقي / متبقيات',
    'optimal':'أمثل / مثالي','update':'تحديث',
    'derivative':'مشتقة','partial':'جزئي',
    'initialize':'تهيئة / بدء','coefficient':'معامل',
    'constant':'ثابت','beta':'بيتا (معامل)',
    'loss':'خسارة','performance':'أداء',
    // Ch7: KNN terms
    'neighbor':'جار','neighbors':'جيران','nearest':'أقرب',
    'euclidean':'إقليدي','distance':'مسافة',
    'normalize':'توحيد المقياس','normalization':'توحيد المقياس',
    'outlier':'قيمة شاذة','outliers':'قيم شاذة',
    'noise':'ضوضاء','noisy':'مشوش / ضوضائي',
    'lazy':'كسول','instance':'حالة / مثال',
    'majority':'أغلبية','vote':'تصويت',
    'ascending':'تصاعدي','descending':'تنازلي',
    'kaggle':'كاقل (منصة بيانات)','sklearn':'سكايت ليرن',
    // Ch8: Random Forest terms
    'forest':'غابة','random':'عشوائي',
    'ensemble':'تجميعي / مجموعة','bagging':'باقينق (تجميع)',
    'bootstrap':'بوتستراب (سحب عينات)','aggregating':'تجميع',
    'voting':'تصويت','averaging':'حساب المتوسط',
    'overfitting':'إفراط في التعلم','underfitting':'نقص في التعلم',
    'subset':'مجموعة فرعية','subsets':'مجموعات فرعية',
    'interpretable':'قابل للتفسير','robust':'قوي / متين',
    'stable':'مستقر','accurate':'دقيق',
    'correlation':'ارتباط','uncorrelated':'غير مرتبط',
    // Ch9: Gradient Descent & Regression terms
    'gradient':'انحدار / ميل','descent':'نزول / هبوط',
    'optimization':'تحسين','minimize':'تقليل',
    'convergence':'تقارب','converge':'يتقارب',
    'diverge':'يتباعد','overshoot':'يتجاوز',
    'sigmoid':'سيجمويد (دالة S)','logistic':'لوجستي',
    'polynomial':'متعدد الحدود','quadratic':'تربيعي',
    'multicollinearity':'ارتباط خطي متعدد',
    'categorical':'فئوي','continuous':'مستمر',
    'iteration':'تكرار','iterations':'تكرارات',
    'update':'تحديث','converged':'تقارب'
};

// ============ WORD CLICK POPUP ============
let wordPopup = null;

function createWordPopup() {
    const popup = document.createElement('div');
    popup.className = 'word-popup'; popup.id = 'word-popup';
    popup.innerHTML = `
        <div class="wp-word" id="wp-word"></div>
        <div class="wp-actions">
            <button class="wp-btn wp-speak" id="wp-speak"><span>🔊</span> نطق</button>
            <button class="wp-btn wp-translate" id="wp-translate"><span>🌐</span> ترجمة</button>
        </div>
        <div class="wp-result" id="wp-result"></div>
    `;
    document.body.appendChild(popup);
    return popup;
}

function showWordPopup(word, x, y) {
    if (!wordPopup) wordPopup = createWordPopup();
    const cleanWord = word.replace(/[^a-zA-Z\-]/g, '');
    if (!cleanWord || cleanWord.length < 2) return;
    const resultDiv = wordPopup.querySelector('#wp-result');
    resultDiv.classList.remove('show'); resultDiv.textContent = '';
    wordPopup.classList.remove('show');
    wordPopup.querySelector('#wp-word').textContent = cleanWord;
    const vw = window.innerWidth;
    let posX = x, posY = y - 10;
    if (posX + 200 > vw) posX = vw - 220;
    if (posX < 10) posX = 10;
    if (posY < 80) posY = y + 25;
    wordPopup.style.left = posX + 'px'; wordPopup.style.top = posY + 'px';
    wordPopup.querySelector('#wp-speak').onclick = (e) => { e.stopPropagation(); speakWord(cleanWord); };
    wordPopup.querySelector('#wp-translate').onclick = async (e) => {
        e.stopPropagation();
        const key = cleanWord.toLowerCase();
        const localTranslation = dictionary[key];
        if (localTranslation) {
            resultDiv.innerHTML = `<span class="wp-ar">📖 ${localTranslation}</span>`;
            resultDiv.classList.add('show');
        } else {
            resultDiv.innerHTML = `<span class="wp-loading">⏳ جاري الترجمة...</span>`;
            resultDiv.classList.add('show');
            try {
                const resp = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=en|ar`);
                const data = await resp.json();
                if (data.responseStatus === 200 && data.responseData.translatedText) {
                    const tr = data.responseData.translatedText;
                    resultDiv.innerHTML = `<span class="wp-ar">🌐 ${tr}</span>`;
                    dictionary[key] = tr; // cache for future use
                } else {
                    resultDiv.innerHTML = `<span class="wp-no">❌ تعذرت الترجمة</span>`;
                }
            } catch(err) {
                resultDiv.innerHTML = `<span class="wp-no">⚠️ لا يوجد اتصال بالإنترنت</span>`;
            }
        }
    };
    requestAnimationFrame(() => wordPopup.classList.add('show'));
}

function hideWordPopup() { if (wordPopup) wordPopup.classList.remove('show'); }

function getWordAtPoint(element, x, y) {
    let range;
    if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(x, y);
    } else if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y);
        if (pos) { range = document.createRange(); range.setStart(pos.offsetNode, pos.offset); range.setEnd(pos.offsetNode, pos.offset); }
    }
    if (!range || !range.startContainer || range.startContainer.nodeType !== 3) return null;
    const text = range.startContainer.textContent;
    const offset = range.startOffset;
    let start = offset, end = offset;
    while (start > 0 && /[a-zA-Z\-]/.test(text[start - 1])) start--;
    while (end < text.length && /[a-zA-Z\-]/.test(text[end])) end++;
    const word = text.substring(start, end);
    return word.length >= 2 ? word : null;
}

function initWordClickPopup() {
    document.querySelector('.main-content').addEventListener('click', function(e) {
        if (e.target.closest('button, input, textarea, .tts-btn, .q-option, .nav-btn, .word-popup, .flashcard')) return;
        const word = getWordAtPoint(e.target, e.clientX, e.clientY);
        if (word && /^[a-zA-Z\-]{2,}$/.test(word.trim())) {
            showWordPopup(word, e.clientX, e.clientY);
        } else { hideWordPopup(); }
    });
    document.addEventListener('click', function(e) {
        if (wordPopup && !e.target.closest('.word-popup') && !e.target.closest('.main-content')) hideWordPopup();
    });
    document.addEventListener('scroll', hideWordPopup, true);
}
