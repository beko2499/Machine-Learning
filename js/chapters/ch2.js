/* CH2.JS - Chapter 2: Naive Bayes Classifier */

const quizData2 = [
    // ===== Bayes Theorem Basics (سهل) =====
    {id:1, section:'ch2-intro', type:'mcq', difficulty:'easy',
     question:'Why is the Naive Bayes algorithm called "Naive"?',
     options:['Because it is a simple algorithm','Because it assumes all features are independent of each other','Because it was invented by a naive person','Because it only works with small datasets'],
     correct:1,
     explanation:'"Naive" (ساذج) لأن الخوارزمية تفترض أن كل الخصائص (Features) مستقلة عن بعضها البعض. في الواقع هذا نادراً ما يكون صحيح، لكن الخوارزمية تعمل بشكل جيد رغم ذلك!'},

    {id:2, section:'ch2-intro', type:'mcq', difficulty:'easy',
     question:'Naive Bayes is built around which mathematical theorem?',
     options:['Pythagorean Theorem','Bayes Theorem','Central Limit Theorem','Fermat\'s Theorem'],
     correct:1,
     explanation:'خوارزمية Naive Bayes مبنية على نظرية بايز (Bayes Theorem) للاحتمالات الشرطية.'},

    {id:3, section:'ch2-intro', type:'mcq', difficulty:'easy',
     question:'Naive Bayes is a type of:',
     options:['Unsupervised Learning','Reinforcement Learning','Supervised Learning - Classification','Supervised Learning - Regression'],
     correct:2,
     explanation:'Naive Bayes هو خوارزمية Supervised Learning من نوع Classification. يصنّف البيانات إلى فئات محددة مسبقاً.'},

    {id:4, section:'ch2-intro', type:'mcq', difficulty:'easy',
     question:'What does Naive Bayes work with?',
     options:['Neural networks','Probabilities','Decision boundaries only','Clustering'],
     correct:1,
     explanation:'Naive Bayes يعمل مع الاحتمالات (Probabilities). يحسب احتمال كل فئة ويختار الفئة ذات الاحتمال الأعلى.'},

    // ===== Probability Review (متوسط) =====
    {id:5, section:'ch2-probability', type:'mcq', difficulty:'easy',
     question:'If we observe the sequence: 1, 2, 2, 3, 1, 1, 3, 2, 3, 1 — what is P(1)?',
     options:['0.3','0.4','0.5','0.2'],
     correct:1,
     explanation:'الرقم 1 ظهر 4 مرات من أصل 10 ملاحظات. P(1) = 4/10 = 0.4'},

    {id:6, section:'ch2-probability', type:'mcq', difficulty:'easy',
     question:'In the sequence 1, 2, 2, 3, 1, 1, 3, 2, 3, 1 — what is P(2)?',
     options:['0.4','0.2','0.3','0.5'],
     correct:2,
     explanation:'الرقم 2 ظهر 3 مرات من أصل 10 ملاحظات. P(2) = 3/10 = 0.3'},

    {id:7, section:'ch2-probability', type:'mcq', difficulty:'medium',
     question:'P(1,2,3) for the sequence 1,2,2,3,1,1,3,2,3,1 equals:',
     options:['0.7','0.6','1.0','0.9'],
     correct:2,
     explanation:'P(1,2,3) = (4+3+3)/10 = 10/10 = 1.0 — الاحتمال الكلي لجميع النتائج الممكنة يساوي 1.'},

    {id:8, section:'ch2-probability', type:'mcq', difficulty:'medium',
     question:'What does "probability" represent in the context of Naive Bayes?',
     options:['The number of data points','The ratio of times an event occurs to total observations','The size of the dataset','The number of features'],
     correct:1,
     explanation:'الاحتمال = عدد مرات حدوث الحدث ÷ العدد الإجمالي للملاحظات. مثال: ظهر المطر 5 مرات من 14 يوم → P(Rain) = 5/14'},

    // ===== Bayes Theorem Formula (متوسط/صعب) =====
    {id:9, section:'ch2-bayes', type:'mcq', difficulty:'medium',
     question:'The Bayes Theorem formula is:',
     options:['P(A|B) = P(A) + P(B)','P(A|B) = P(B|A) × P(A) / P(B)','P(A|B) = P(A) × P(B)','P(A|B) = P(B) / P(A)'],
     correct:1,
     explanation:'صيغة بايز: P(A|B) = P(B|A) × P(A) / P(B)\n\nحيث:\nP(A|B) = احتمال A بشرط حدوث B (Posterior)\nP(B|A) = احتمال B بشرط حدوث A (Likelihood)\nP(A) = الاحتمال المسبق لـ A (Prior)\nP(B) = الاحتمال الكلي لـ B (Evidence)'},

    {id:10, section:'ch2-bayes', type:'mcq', difficulty:'medium',
     question:'In Bayes Theorem, P(A|B) is read as:',
     options:['Probability of A and B','Probability of A given B','Probability of A or B','Probability of B given A'],
     correct:1,
     explanation:'P(A|B) تُقرأ "احتمال A بشرط حدوث B" (Probability of A given B). الخط العمودي | يعني "بشرط" أو "given".'},

    {id:11, section:'ch2-bayes', type:'mcq', difficulty:'hard',
     question:'In Bayes Theorem P(A|B) = P(B|A)P(A)/P(B), what is P(A) called?',
     options:['Posterior probability','Likelihood','Prior probability','Evidence'],
     correct:2,
     explanation:'P(A) = Prior Probability (الاحتمال المسبق): هو احتمال A قبل أن نعرف أي معلومة عن B. يمثل معرفتنا الأولية.'},

    {id:12, section:'ch2-bayes', type:'mcq', difficulty:'hard',
     question:'In Bayes Theorem, what is P(B|A) called?',
     options:['Prior','Posterior','Evidence','Likelihood'],
     correct:3,
     explanation:'P(B|A) = Likelihood (الإمكانية): احتمال مشاهدة الدليل B إذا كانت الفرضية A صحيحة. هي اللي تربط الدليل بالفرضية.'},

    {id:13, section:'ch2-bayes', type:'mcq', difficulty:'hard',
     question:'In Bayes Theorem, P(A|B) is called the:',
     options:['Prior probability','Likelihood','Evidence','Posterior probability'],
     correct:3,
     explanation:'P(A|B) = Posterior Probability (الاحتمال البَعدي): الاحتمال المُحدّث بعد مشاهدة الدليل B. هو الهدف النهائي من حساباتنا.'},

    // ===== Play Tennis Example (متوسط/صعب) =====
    {id:14, section:'ch2-tennis', type:'mcq', difficulty:'medium',
     question:'In the Play Tennis example, how many training examples are there?',
     options:['10','12','14','16'],
     correct:2,
     explanation:'في مثال Play Tennis يوجد 14 مثال تدريبي (D1 إلى D14). كل مثال يصف يوم بـ 4 خصائص (Outlook, Temperature, Humidity, Wind) + القرار (Yes/No).'},

    {id:15, section:'ch2-tennis', type:'mcq', difficulty:'medium',
     question:'In the Play Tennis dataset, what are the features used?',
     options:['Only Outlook and Temperature','Outlook, Temperature, Humidity, Wind','Day, Month, Year','Score, Team, Player'],
     correct:1,
     explanation:'الخصائص الأربعة: Outlook (حالة الطقس)، Temperature (درجة الحرارة)، Humidity (الرطوبة)، Wind (الرياح).'},

    {id:16, section:'ch2-tennis', type:'mcq', difficulty:'medium',
     question:'In the Play Tennis example, P(Play=Yes) equals:',
     options:['5/14','9/14','7/14','10/14'],
     correct:1,
     explanation:'من 14 يوم: 9 أيام قررنا نلعب (Yes). P(Play=Yes) = 9/14 ≈ 0.643'},

    {id:17, section:'ch2-tennis', type:'mcq', difficulty:'medium',
     question:'In the Play Tennis example, P(Play=No) equals:',
     options:['4/14','5/14','6/14','3/14'],
     correct:1,
     explanation:'من 14 يوم: 5 أيام ما لعبنا (No). P(Play=No) = 5/14 ≈ 0.357'},

    {id:18, section:'ch2-tennis', type:'mcq', difficulty:'hard',
     question:'In the Learning Phase, P(Outlook=Sunny | Play=Yes) equals:',
     options:['3/9','2/9','4/9','5/9'],
     correct:1,
     explanation:'من الأيام اللي لعبنا فيها (9 أيام): في يومين كان الطقس Sunny.\nP(Outlook=Sunny | Play=Yes) = 2/9'},

    {id:19, section:'ch2-tennis', type:'mcq', difficulty:'hard',
     question:'In the Test Phase, given x=(Sunny, Cool, High, Strong), the prediction is:',
     options:['Yes, play tennis','No, don\'t play tennis','Cannot be determined','Maybe'],
     correct:1,
     explanation:'بعد حساب الاحتمالات:\nP(Yes|x) = 0.0053 و P(No|x) = 0.0206\n\nبما أن P(No|x) > P(Yes|x)، القرار هو "No" — لا نلعب تنس هذا اليوم!'},

    // ===== Fruit Example (متوسط) =====
    {id:20, section:'ch2-fruit', type:'mcq', difficulty:'medium',
     question:'In the Fruit Classification example, how many training fruits are there?',
     options:['500','1000','1025','1500'],
     correct:2,
     explanation:'في مثال تصنيف الفاكهة يوجد 1025 فاكهة في مجموعة التدريب.'},

    {id:21, section:'ch2-fruit', type:'mcq', difficulty:'medium',
     question:'In the Fruit example, what are the three features used?',
     options:['Size, Weight, Shape','Yellow_Color, Big_Size, Sweet_Taste','Red, Green, Blue','Round, Long, Small'],
     correct:1,
     explanation:'الخصائص الثلاثة: Yellow_Color (لون أصفر)، Big_Size (حجم كبير)، Sweet_Taste (طعم حلو).'},

    {id:22, section:'ch2-fruit', type:'mcq', difficulty:'medium',
     question:'In the Fruit example, what are the three classes?',
     options:['Red, Green, Yellow','Apple, Banana, Other','Grape, Orange, Mango','Big, Medium, Small'],
     correct:1,
     explanation:'الفئات الثلاثة: Apple (تفاح: 400)، Banana (موز: 525)، Other (أخرى: 100). المجموع = 1025.'},

    {id:23, section:'ch2-fruit', type:'mcq', difficulty:'hard',
     question:'In the Fruit example, a fruit that is Yellow, Big, and Sweet is classified as:',
     options:['Apple','Other','Banana','Cannot be determined'],
     correct:2,
     explanation:'بعد حساب Total_Probability لكل فئة:\n- Banana حصل على أعلى احتمال (0.1544)\n\nلذلك: فاكهة صفراء + كبيرة + حلوة = 🍌 Banana!'},

    {id:24, section:'ch2-fruit', type:'mcq', difficulty:'medium',
     question:'Step 1 in Naive Bayes classification is to create a:',
     options:['Decision tree','Frequency table','Neural network','Random forest'],
     correct:1,
     explanation:'الخطوة 1: إنشاء Frequency Table (جدول التكرار) — يحسب عدد مرات ظهور كل خاصية لكل فئة.'},

    {id:25, section:'ch2-fruit', type:'mcq', difficulty:'medium',
     question:'Step 2 in Naive Bayes classification is to create a:',
     options:['Confusion matrix','Frequency table','Likelihood table','Decision tree'],
     correct:2,
     explanation:'الخطوة 2: إنشاء Likelihood Table (جدول الاحتمالات) — يحول التكرارات إلى احتمالات شرطية لكل خاصية مع كل فئة.'},

    // ===== Applications & Spam Filter (سهل/متوسط) =====
    {id:26, section:'ch2-spam', type:'mcq', difficulty:'easy',
     question:'One of the most famous applications of Naive Bayes is:',
     options:['Image generation','Spam email filtering','Video streaming','File compression'],
     correct:1,
     explanation:'تصفية البريد المزعج (Spam Filter) من أشهر تطبيقات Naive Bayes. يحسب احتمال أن الرسالة spam بناءً على الكلمات الموجودة فيها.'},

    {id:27, section:'ch2-spam', type:'mcq', difficulty:'medium',
     question:'How does a Naive Bayes spam filter work?',
     options:['It checks the sender address only','It counts good and spam words, then uses Bayes formula to classify','It blocks all emails','It only reads the subject line'],
     correct:1,
     explanation:'يحسب عدد الكلمات "الجيدة" (مقبولة) والكلمات "المزعجة" (مرسائل spam) في الرسالة، ثم يستخدم معادلة بايز لحساب الاحتمال وتصنيف الرسالة.'},

    // ===== Scikit-learn (سهل) =====
    {id:28, section:'ch2-sklearn', type:'mcq', difficulty:'easy',
     question:'Scikit-learn is built on top of:',
     options:['TensorFlow and Keras','NumPy and matplotlib','Java and C++','HTML and CSS'],
     correct:1,
     explanation:'Scikit-learn مبنية فوق NumPy (للحسابات) و matplotlib (للرسوم البيانية). هي المكتبة الأساسية لتطبيق ML في Python.'},

    // ===== True/False =====
    {id:29, section:'ch2-intro', type:'mcq', difficulty:'easy',
     question:'True or False: Naive Bayes assumes that all features are dependent on each other.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ العكس تماماً! Naive Bayes يفترض أن كل الخصائص (Features) مستقلة (independent) عن بعضها. لذلك يُسمى "Naive" (ساذج).'},

    {id:30, section:'ch2-bayes', type:'mcq', difficulty:'medium',
     question:'True or False: In Bayes Theorem, P(A|B) means the probability of A given that B has occurred.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ P(A|B) = احتمال حدوث A بشرط أن B حدث فعلاً. الخط العمودي | يعني "given" (بشرط).'},

    {id:31, section:'ch2-tennis', type:'mcq', difficulty:'medium',
     question:'True or False: In the Play Tennis example, if all features point to "No", the prediction must be "No".',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ إذا كان الاحتمال الشرطي لـ "No" أعلى من "Yes" بناءً على كل الخصائص المعطاة، فالقرار سيكون "No".'},

    {id:32, section:'ch2-intro', type:'mcq', difficulty:'easy',
     question:'True or False: Naive Bayes selects the class with the highest probability.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ Naive Bayes يحسب الاحتمال لكل فئة ثم يختار الفئة ذات الاحتمال الأعلى (Maximum Probability).'},

    // ===== Essay =====
    {id:33, section:'ch2-bayes', type:'essay', difficulty:'hard',
     question:'Write the Bayes Theorem formula and explain each component (Prior, Likelihood, Evidence, Posterior).',
     answer:'P(A|B) = P(B|A) × P(A) / P(B)\n\n1) P(A|B) = Posterior Probability (الاحتمال البَعدي)\n→ الاحتمال المُحدّث بعد مشاهدة الدليل\n→ هذا هو ما نريد حسابه\n\n2) P(B|A) = Likelihood (الإمكانية)\n→ احتمال مشاهدة الدليل B إذا كانت A صحيحة\n→ مثال: احتمال أن الرسالة تحتوي "مجاني" إذا كانت spam\n\n3) P(A) = Prior Probability (الاحتمال المسبق)\n→ احتمال A قبل أي دليل\n→ مثال: نسبة رسائل spam من كل الرسائل\n\n4) P(B) = Evidence (الدليل)\n→ الاحتمال الكلي لمشاهدة B\n→ يعمل كـ normalizing constant'},

    {id:34, section:'ch2-tennis', type:'essay', difficulty:'hard',
     question:'Explain the two phases of Naive Bayes (Learning Phase and Test Phase) using the Play Tennis example.',
     answer:'Phase 1: Learning Phase (مرحلة التعلم)\n→ نحسب الاحتمالات من بيانات التدريب:\n• P(Play=Yes) = 9/14, P(Play=No) = 5/14\n• لكل Feature نحسب الاحتمالات الشرطية:\n  P(Outlook=Sunny|Yes) = 2/9, P(Outlook=Sunny|No) = 3/5\n  P(Temperature=Cool|Yes) = 3/9, P(Temperature=Cool|No) = 1/5\n  إلخ...\n\nPhase 2: Test Phase (مرحلة الاختبار)\n→ لعنصر جديد x=(Sunny, Cool, High, Strong):\n• نحسب P(Yes|x) ≈ P(Sunny|Yes)×P(Cool|Yes)×P(High|Yes)×P(Strong|Yes)×P(Yes) = 0.0053\n• نحسب P(No|x) ≈ P(Sunny|No)×P(Cool|No)×P(High|No)×P(Strong|No)×P(No) = 0.0206\n• P(No|x) > P(Yes|x) → القرار: No (لا نلعب)'}
];

const flashcardData2 = [
    {front:'ليش الخوارزمية اسمها "Naive Bayes"؟', back:'"Naive" (ساذج) لأنها تفترض:\n→ كل Features مستقلة عن بعضها\n(في الواقع نادراً يكون صحيح!)\n\n"Bayes" لأنها مبنية على:\n→ Bayes Theorem (نظرية بايز)\nللاحتمالات الشرطية\n\n🎯 رغم الافتراض "الساذج"، تعمل بشكل ممتاز!'},

    {front:'ما هي صيغة Bayes Theorem؟', back:'P(A|B) = P(B|A) × P(A) / P(B)\n\n📊 المكونات:\n\n1️⃣ P(A|B) = Posterior (البَعدي)\n→ الاحتمال بعد مشاهدة الدليل\n\n2️⃣ P(B|A) = Likelihood (الإمكانية)\n→ احتمال الدليل إذا A صحيحة\n\n3️⃣ P(A) = Prior (المسبق)\n→ الاحتمال قبل أي دليل\n\n4️⃣ P(B) = Evidence (الدليل)\n→ الاحتمال الكلي للدليل'},

    {front:'كيف نحسب الاحتمال؟', back:'الاحتمال = عدد مرات الحدوث ÷ المجموع الكلي\n\n📊 مثال:\nسلسلة: 1, 2, 2, 3, 1, 1, 3, 2, 3, 1\n\nP(1) = 4/10 = 0.4\nP(2) = 3/10 = 0.3\nP(3) = 3/10 = 0.3\n\n✅ المجموع = 0.4 + 0.3 + 0.3 = 1.0\n(دائماً المجموع = 1)'},

    {front:'ما هو P(A|B) وكيف نقرأه؟', back:'P(A|B) = Conditional Probability\n\n📖 تُقرأ:\n"Probability of A given B"\n"احتمال A بشرط حدوث B"\n\n| يعني "given" (بشرط)\n\n💡 مثال:\nP(Spam | كلمة "مجاني") =\naحتمال أن الرسالة spam\nإذا كانت تحتوي كلمة "مجاني"'},

    {front:'اشرح مثال Play Tennis', back:'📋 14 يوم تدريب بـ 4 خصائص:\n• Outlook (Sunny/Overcast/Rain)\n• Temperature (Hot/Mild/Cool)\n• Humidity (High/Normal)\n• Wind (Strong/Weak)\n\n📊 النتائج:\nP(Play=Yes) = 9/14\nP(Play=No) = 5/14\n\n🧪 اختبار: x=(Sunny,Cool,High,Strong)\n→ P(Yes|x) = 0.0053\n→ P(No|x) = 0.0206\n→ القرار: ❌ No'},

    {front:'ما هي خطوات Naive Bayes؟', back:'خطوتان أساسيتان:\n\n📚 Step 1: Frequency Table\n→ جدول يحسب تكرار كل خاصية لكل فئة\n→ مثال: كم فاكهة صفراء من التفاح؟ 175\n\n📊 Step 2: Likelihood Table\n→ يحول التكرارات إلى احتمالات شرطية\n→ P(Yellow | Apple) = 175/400\n\n🎯 Step 3: التنبؤ\n→ نحسب الاحتمال لكل فئة\n→ نختار الفئة بأعلى احتمال'},

    {front:'اشرح مثال الفاكهة (Fruit Classification)', back:'📋 Dataset: 1025 فاكهة\n• Apple = 400 | Banana = 525 | Other = 100\n\n🔤 Features:\n• Yellow_Color | Big_Size | Sweet_Taste\n\n📊 Frequency Table:\nApple: 175 yellow, 225 big, 0 sweet\nBanana: 200 yellow, 150 big, 175 sweet\nOther: 25 yellow, 50 big, 25 sweet\n\n🎯 فاكهة صفراء+كبيرة+حلوة:\n→ Banana (أعلى احتمال 0.1544)\n→ 🍌 إذاً: موزة!'},

    {front:'ما هي Learning Phase و Test Phase؟', back:'📚 Learning Phase (التدريب):\n→ نجمع بيانات التدريب\n→ نحسب Frequency Table\n→ نحسب الاحتمالات الشرطية P(feature|class)\n→ نحسب P(class) لكل فئة\n\n🧪 Test Phase (الاختبار):\n→ لعنصر جديد x:\n→ نحسب P(class₁|x), P(class₂|x)...\n→ P(class|x) ∝ P(x₁|class) × P(x₂|class) × ... × P(class)\n→ نختار الفئة بأعلى احتمال'},

    {front:'كيف يعمل Spam Filter بـ Naive Bayes؟', back:'📧 تصفية البريد المزعج:\n\n1️⃣ Training:\n→ نجمع رسائل spam + رسائل عادية\n→ نحسب تكرار كل كلمة في كل فئة\n→ مثال: "مجاني" ظهرت 873 مرة في spam\n\n2️⃣ Classification:\n→ رسالة جديدة واردة\n→ نحسب P(spam|كلمات الرسالة)\n→ نحسب P(not spam|كلمات الرسالة)\n→ إذا P(spam) > P(not spam) = 🚫 spam!\n\n⚡ استُخدم حتى 2010 كمرشح أساسي'},

    {front:'ما الفرق بين Prior و Posterior و Likelihood؟', back:'🔄 الثلاثة مرتبطة بـ Bayes Theorem:\n\n1️⃣ Prior P(A) = الاحتمال المسبق\n→ ما نعرفه قبل أي دليل\n→ مثال: 40% من الرسائل spam\n\n2️⃣ Likelihood P(B|A) = الإمكانية\n→ احتمال الدليل إذا الفرضية صحيحة\n→ مثال: 90% من spam فيها "مجاني"\n\n3️⃣ Posterior P(A|B) = الاحتمال البَعدي\n→ الاحتمال المُحدّث بعد الدليل\n→ مثال: احتمال spam بعد ما شفنا "مجاني"'},

    {front:'ما هي مميزات وعيوب Naive Bayes؟', back:'✅ المميزات:\n• سريع جداً وبسيط\n• يعمل جيداً مع بيانات كثيرة\n• ممتاز لتصنيف النصوص\n• لا يحتاج بيانات تدريب كبيرة\n• يتعامل مع features كثيرة\n\n❌ العيوب:\n• افتراض الاستقلالية نادراً صحيح\n• Zero Frequency Problem\n  (إذا كلمة ما ظهرت في التدريب = احتمال 0)\n• قد يعطي احتمالات غير دقيقة\n\n💡 الحل: Laplace Smoothing'}
];

// Register Chapter 2
App.registerChapter('ch2', {
    label: 'Ch 2',
    overviewSection: 'ch2-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch2-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch2-intro', icon: '📐', label: 'Naive Bayes مقدمة'},
        {id: 'ch2-probability', icon: '🎲', label: 'مراجعة الاحتمالات'},
        {id: 'ch2-bayes', icon: '📊', label: 'نظرية بايز'},
        {id: 'ch2-tennis', icon: '🎾', label: 'مثال Play Tennis'},
        {id: 'ch2-fruit', icon: '🍌', label: 'مثال الفاكهة'},
        {id: 'ch2-spam', icon: '📧', label: 'Spam Filter'},
        {id: 'ch2-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch2-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch2-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData2,
    flashcardData: flashcardData2
});
