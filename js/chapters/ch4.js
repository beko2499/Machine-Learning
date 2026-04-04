/* CH4.JS - Chapter 4: Decision Trees */

const quizData4 = [
    // ===== Decision Tree Basics (سهل) =====
    {id:1, section:'ch4-intro', type:'mcq', difficulty:'easy',
     question:'Decision Trees are a type of:',
     options:['Unsupervised Learning only','Non-parametric Supervised Learning','Reinforcement Learning','Unsupervised Clustering'],
     correct:1,
     explanation:'Decision Trees هي خوارزمية Non-parametric Supervised Learning — تعمل للتصنيف (Classification) والانحدار (Regression). ما تحتاج افتراضات عن شكل البيانات.'},

    {id:2, section:'ch4-intro', type:'mcq', difficulty:'easy',
     question:'How do Decision Trees work?',
     options:['By calculating probabilities','By dividing data into subsections using separating lines','By finding the nearest neighbor','By drawing hyperplanes'],
     correct:1,
     explanation:'Decision Trees تقسم البيانات إلى أقسام فرعية باستخدام خطوط فاصلة. هذا يستمر حتى الفئات تصف البيانات بشكل مثالي أو يتم الوصول لمعيار معين.'},

    {id:3, section:'ch4-intro', type:'mcq', difficulty:'easy',
     question:'Decision Trees can be used for:',
     options:['Classification only','Regression only','Both Classification and Regression','Neither'],
     correct:2,
     explanation:'Decision Trees تعمل لكلا النوعين:\n• Classification: القيم المستهدفة منفصلة (Yes/No)\n• Regression: القيم المستهدفة مستمرة (أرقام)'},

    {id:4, section:'ch4-intro', type:'mcq', difficulty:'easy',
     question:'One advantage of Decision Trees over Neural Networks is:',
     options:['They are always more accurate','They are easier to understand (not a black box)','They require more data','They are faster to train'],
     correct:1,
     explanation:'Decision Trees أسهل في الفهم من الشبكات العصبية لأنها تشارك عملية اتخاذ القرار الداخلية (Internal Decision-Making). الشبكات العصبية = صندوق أسود (Black Box).'},

    {id:5, section:'ch4-intro', type:'mcq', difficulty:'easy',
     question:'The goal of a Decision Tree model is to:',
     options:['Maximize entropy','Predict the target variable by learning decision rules from features','Minimize the number of features','Create random splits'],
     correct:1,
     explanation:'هدف Decision Tree هو التنبؤ بقيمة المتغير المستهدف عن طريق تعلم قواعد قرار بسيطة من خصائص البيانات (Features).'},

    // ===== Tree Structure (سهل/متوسط) =====
    {id:6, section:'ch4-structure', type:'mcq', difficulty:'easy',
     question:'The topmost node in a Decision Tree is called the:',
     options:['Leaf Node','Branch','Root Node','Child Node'],
     correct:2,
     explanation:'Root Node (العقدة الجذرية) هي أعلى عقدة في الشجرة — السؤال الأول الذي يطرحه الموديل. تمثل أفضل تقسيم للبيانات.'},

    {id:7, section:'ch4-structure', type:'mcq', difficulty:'easy',
     question:'The terminal nodes in a Decision Tree are called:',
     options:['Root Nodes','Branch Nodes','Leaf Nodes','Split Nodes'],
     correct:2,
     explanation:'Leaf Nodes (العقد الورقية) هي النقاط النهائية في الشجرة — تمثل القرار النهائي (Yes/No) أو التصنيف. لا يتم تقسيمها أكثر.'},

    {id:8, section:'ch4-structure', type:'mcq', difficulty:'medium',
     question:'What does "Impurity" mean in Decision Trees?',
     options:['The tree has too many branches','Traces of one class exist in another class division','The data is too large','The tree is too deep'],
     correct:1,
     explanation:'Impurity (عدم النقاء) = وجود آثار من فئة في تقسيم فئة أخرى. مثلاً: قسم مخصص لـ "Yes" فيه بعض "No" — هذا Impurity. الهدف: تقليلها!'},

    // ===== Entropy (متوسط/صعب) =====
    {id:9, section:'ch4-entropy', type:'mcq', difficulty:'medium',
     question:'Entropy in Decision Trees measures:',
     options:['The speed of the algorithm','The degree of randomness or impurity','The number of features','The depth of the tree'],
     correct:1,
     explanation:'Entropy = درجة العشوائية أو عدم النقاء. كلما زادت الـ Entropy = البيانات أكثر عشوائية وصعب تصنيفها. كلما قلت = البيانات أنقى وأسهل.'},

    {id:10, section:'ch4-entropy', type:'mcq', difficulty:'medium',
     question:'The Entropy formula uses:',
     options:['Mean and standard deviation','The probability of each item: E = -Σ p(i) × log(p(i))','The distance between points','The count of features'],
     correct:1,
     explanation:'صيغة Entropy:\nE = -Σ p(i) × log₂(p(i))\n\nحيث p(i) = احتمال كل فئة. نحسب احتمال ظهور كل قيمة ونطبق الصيغة.'},

    {id:11, section:'ch4-entropy', type:'mcq', difficulty:'medium',
     question:'Entropy value ranges between:',
     options:['0 and 100','0 and 1','-1 and 1','0 and infinity'],
     correct:1,
     explanation:'Entropy تتراوح بين 0 و 1:\n• Entropy = 0: البيانات نقية 100% (كل العناصر من فئة واحدة)\n• Entropy = 1: أقصى عشوائية (50/50 بين فئتين)'},

    {id:12, section:'ch4-entropy', type:'mcq', difficulty:'hard',
     question:'If dice throws give 1,1,2,3, what is P(1)?',
     options:['0.25','0.5','0.75','0.33'],
     correct:1,
     explanation:'الرقم 1 ظهر مرتين من أصل 4 رميات.\nP(1) = 2/4 = 0.5\n\nوكذلك: P(2) = 1/4 = 0.25, P(3) = 1/4 = 0.25'},

    {id:13, section:'ch4-entropy', type:'mcq', difficulty:'hard',
     question:'For the sequence 1,1,2,3, the Entropy equals approximately:',
     options:['0.25','0.75','0.45','1.0'],
     correct:2,
     explanation:'E = -(0.5×log₂(0.5)) - (0.25×log₂(0.25)) - (0.25×log₂(0.25))\n= -(0.5×(-1)) - (0.25×(-2)) - (0.25×(-2))\n= 0.5 + 0.5 + 0.5 = 1.5 bits\n\nتقريباً 0.45 بالـ log₁₀'},

    {id:14, section:'ch4-entropy', type:'mcq', difficulty:'medium',
     question:'A lower Entropy value means:',
     options:['More randomness','Less randomness (purer data)','More features','Deeper tree'],
     correct:1,
     explanation:'Entropy منخفض = بيانات أنقى = تصنيف أسهل.\n• Entropy = 0 → البيانات نقية تماماً ✅\n• Entropy = 1 → أقصى عشوائية (أسوأ حالة) ❌'},

    {id:15, section:'ch4-entropy', type:'mcq', difficulty:'medium',
     question:'Entropy is always applied to:',
     options:['The first column','The last column (target variable)','All columns equally','Random columns'],
     correct:1,
     explanation:'Entropy دائماً يُطبق على العمود الأخير (Target Variable) — المتغير اللي نبي نتنبأ بقيمته. مثلاً: "Play Golf?" أو "Play Tennis?"'},

    // ===== Information Gain (متوسط/صعب) =====
    {id:16, section:'ch4-infogain', type:'mcq', difficulty:'medium',
     question:'Information Gain is calculated as:',
     options:['Entropy × 2','Entropy(parent) - [weighted average × entropy(children)]','Entropy + Information','Entropy / number of features'],
     correct:1,
     explanation:'Information Gain = Entropy(الأب) - [المتوسط المرجح × Entropy(الأبناء)]\n\nيقيس كم "معلومات" نكسب من تقسيم معين. كلما زاد IG = التقسيم أفضل!'},

    {id:17, section:'ch4-infogain', type:'mcq', difficulty:'medium',
     question:'A higher Information Gain value means:',
     options:['Worse split','Better split','No change','More impurity'],
     correct:1,
     explanation:'Information Gain عالي = تقسيم أفضل!\n\nالعلاقة عكسية مع Entropy:\n• Entropy: كلما قلّ = أفضل (0-1)\n• Information Gain: كلما زاد = أفضل'},

    {id:18, section:'ch4-infogain', type:'mcq', difficulty:'hard',
     question:'The relationship between Entropy and Information Gain is:',
     options:['Both increase together','Inverse: low Entropy = high Information Gain','They are the same thing','No relationship'],
     correct:1,
     explanation:'العلاقة عكسية:\n• Entropy ↓ (أقل عشوائية) = Information Gain ↑ (معلومات أكثر)\n• Entropy ↑ (أكثر عشوائية) = Information Gain ↓ (معلومات أقل)\n\nEntropy: 0-1 (أقل أفضل)\nIG: كلما زاد أفضل'},

    {id:19, section:'ch4-infogain', type:'mcq', difficulty:'hard',
     question:'Decision Trees choose the feature to split on by:',
     options:['Random selection','The feature with the highest Information Gain','The feature with the most values','Alphabetical order'],
     correct:1,
     explanation:'الشجرة تختار الخاصية اللي تعطي أعلى Information Gain كـ Root Node. ثم تكرر العملية لكل فرع حتى تصل لـ Leaf Nodes نقية.'},

    // ===== Golf Example (متوسط) =====
    {id:20, section:'ch4-golf', type:'mcq', difficulty:'medium',
     question:'In the Golf example, what are the features used?',
     options:['Height, Weight, Age','Outlook, Temperature, Humidity, Windy','Color, Size, Shape','Speed, Distance, Time'],
     correct:1,
     explanation:'الخصائص الأربعة: Outlook (حالة الطقس)، Temperature (درجة الحرارة)، Humidity (الرطوبة)، Windy (رياح). القرار: هل نلعب Golf ولا لا؟'},

    {id:21, section:'ch4-golf', type:'mcq', difficulty:'medium',
     question:'In the Golf example, given: Outlook=Rainy, Temp=Cool, Humidity=High, Windy=False — should we play?',
     options:['Yes, play golf','No, don\'t play','Cannot be determined','Maybe'],
     correct:0,
     explanation:'بناءً على شجرة القرار:\n• Outlook = Rainy ← نتبع هذا الفرع\n• Windy = False ← المسار يقود لـ Yes\n→ القرار: نعم، نلعب Golf! ✅'},

    {id:22, section:'ch4-golf', type:'mcq', difficulty:'medium',
     question:'The idea behind Decision Trees is to find:',
     options:['The question with the worst split','The question that gives the best data split','The longest question','The most complex question'],
     correct:1,
     explanation:'فكرة شجرة القرارات: البحث عن السؤال الذي يعطي أفضل تقسيم للبيانات. السؤال الأفضل = أعلى Information Gain = أقل Entropy بعد التقسيم.'},

    // ===== Advanced Topics (صعب) =====
    {id:23, section:'ch4-advanced', type:'mcq', difficulty:'medium',
     question:'ID3 stands for:',
     options:['Intelligent Decision 3','Iterative Dichotomiser 3','Information Data 3','Internal Decision 3'],
     correct:1,
     explanation:'ID3 = Iterative Dichotomiser 3 (ثنائي التفرع التكراري). هي واحدة من أشهر خوارزميات بناء Decision Trees. تستخدم Information Gain لاختيار أفضل Feature.'},

    {id:24, section:'ch4-advanced', type:'mcq', difficulty:'medium',
     question:'Decision Trees suffer from:',
     options:['Underfitting only','Overfitting problem','Cannot work with categorical data','Slow prediction'],
     correct:1,
     explanation:'Decision Trees تعاني من Overfitting — الشجرة تصير عميقة جداً وتحفظ بيانات التدريب بدل ما تتعلم الأنماط العامة. الحل: التقليم (Pruning) أو Random Forest.'},

    {id:25, section:'ch4-advanced', type:'mcq', difficulty:'hard',
     question:'Which modern algorithms are built on top of Decision Trees?',
     options:['SVM and Naive Bayes','Random Forest, Gradient Boosting, and XGBoost','K-Means and DBSCAN','Linear and Logistic Regression'],
     correct:1,
     explanation:'خوارزميات حديثة مبنية فوق Decision Trees:\n• Random Forest (Bagging)\n• Gradient Boosting (Boosting)\n• XGBoost (Boosting)\n\nكلها تستخدم مجموعة أشجار للحصول على دقة أعلى!'},

    {id:26, section:'ch4-golf', type:'mcq', difficulty:'medium',
     question:'In the Golf Decision Tree, if Temperature is not in the tree, it means:',
     options:['Temperature was forgotten','Temperature is not important for the decision','Temperature data was missing','Temperature is always the same'],
     correct:1,
     explanation:'إذا درجة الحرارة غير موجودة في الشجرة = غير مهمة وغير مؤثرة في القرار "هل نلعب Golf؟". لكن لو السؤال كان "هل أسافر؟" ممكن تكون مهمة!'},

    // ===== True/False =====
    {id:27, section:'ch4-intro', type:'mcq', difficulty:'easy',
     question:'True or False: Decision Trees are considered a "black box" algorithm.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ Decision Trees ليست صندوق أسود! هي من أسهل الخوارزميات في الفهم والتفسير — تقدر تشوف كل قرار ولماذا تم اتخاذه. عكس Neural Networks.'},

    {id:28, section:'ch4-entropy', type:'mcq', difficulty:'medium',
     question:'True or False: Entropy = 0 means the data is perfectly pure.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ Entropy = 0 يعني البيانات نقية 100% — كل العناصر من نفس الفئة. لا توجد أي عشوائية. هذا أفضل حالة!'},

    {id:29, section:'ch4-infogain', type:'mcq', difficulty:'medium',
     question:'True or False: The feature with the lowest Information Gain should be the Root Node.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ العكس! الخاصية بأعلى Information Gain هي اللي تصير Root Node. لأنها تعطي أفضل تقسيم وأكثر معلومات.'},

    {id:30, section:'ch4-advanced', type:'mcq', difficulty:'easy',
     question:'True or False: Decision Trees features include being easy to read.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ من ميزات شجرة القرار أنها سهلة القراءة وتساعد في التنبؤ. يمكن تمثيلها بصرياً بشكل واضح ومفهوم.'},

    // ===== Essay =====
    {id:31, section:'ch4-entropy', type:'essay', difficulty:'hard',
     question:'Explain Entropy and Information Gain. How are they related? Give an example.',
     answer:'Entropy (الإنتروبيا):\n→ مقياس لدرجة العشوائية / عدم النقاء\n→ الصيغة: E = -Σ p(i) × log₂(p(i))\n→ تتراوح بين 0 (نقي) و 1 (أقصى عشوائية)\n→ تُطبق على العمود الأخير (Target)\n\nInformation Gain (كسب المعلومات):\n→ IG = Entropy(أب) - متوسط مرجح × Entropy(أبناء)\n→ يقيس كم معلومات نكسب من تقسيم معين\n→ كلما زاد = التقسيم أفضل\n\nالعلاقة: عكسية\n→ Entropy ↓ = IG ↑ (أفضل)\n→ Entropy ↑ = IG ↓ (أسوأ)\n\nمثال: رمي نرد 1,1,2,3\nP(1)=0.5, P(2)=0.25, P(3)=0.25\nE = -(0.5×log(0.5))-(0.25×log(0.25))-(0.25×log(0.25)) ≈ 0.45'},

    {id:32, section:'ch4-intro', type:'essay', difficulty:'hard',
     question:'What are the advantages and disadvantages of Decision Trees? What modern algorithms solve their problems?',
     answer:'المميزات:\n✅ سهلة الفهم والتفسير (ليست Black Box)\n✅ تعمل للتصنيف والانحدار\n✅ لا تحتاج افتراضات عن البيانات (Non-parametric)\n✅ تتعامل مع بيانات فئوية وعددية\n✅ سهلة القراءة البصرية\n\nالعيوب:\n❌ Overfitting: الشجرة تصير عميقة جداً\n❌ حساسة للتغييرات الصغيرة في البيانات\n❌ قد تكون غير دقيقة بمفردها\n\nخوارزميات حديثة تحل المشاكل:\n→ Random Forest (Bagging): عدة أشجار + تصويت\n→ Gradient Boosting: أشجار متتالية تصحح الأخطاء\n→ XGBoost: نسخة محسنة من Gradient Boosting'}
];

const flashcardData4 = [
    {front:'ما هي Decision Trees؟', back:'شجرة القرار = خوارزمية Supervised Learning\n\n🌳 كيف تعمل؟\n→ تقسم البيانات لأقسام فرعية\n→ تستخدم خطوط فاصلة (أسئلة)\n→ تستمر حتى الفئات تصف البيانات\n\n📊 تعمل لـ:\n• Classification (تصنيف): Yes/No\n• Regression (انحدار): أرقام\n\n💡 ميزتها الأساسية:\nليست Black Box! سهلة الفهم والتفسير'},

    {front:'ما هي أجزاء شجرة القرار؟', back:'🌳 أجزاء الشجرة:\n\n1️⃣ Root Node (العقدة الجذرية):\n→ أعلى عقدة في الشجرة\n→ أول سؤال (أفضل Feature)\n→ أعلى Information Gain\n\n2️⃣ Branch (الفرع):\n→ الخطوط اللي تربط العقد\n→ تمثل إجابة السؤال\n\n3️⃣ Leaf Node (العقدة الورقية):\n→ النقاط النهائية\n→ القرار النهائي (التصنيف)\n→ لا تُقسم أكثر'},

    {front:'ما هو Entropy؟', back:'Entropy = درجة العشوائية / عدم النقاء\n\n📐 الصيغة:\nE = -Σ p(i) × log₂(p(i))\n\n📊 القيم:\n• E = 0 → نقي 100% ✅ (أفضل)\n• E = 1 → أقصى عشوائية ❌ (أسوأ)\n\n💡 كلما قلّ = أفضل!\nدائماً يُطبق على العمود الأخير\n\n📝 مثال: نرد 1,1,2,3\nP(1)=0.5, P(2)=0.25, P(3)=0.25\nE ≈ 0.45'},

    {front:'ما هو Information Gain؟', back:'Information Gain = كسب المعلومات\n\n📐 الصيغة:\nIG = Entropy(أب) - متوسط مرجح × Entropy(أبناء)\n\n📊 القيم:\n• IG عالي = تقسيم أفضل ✅\n• IG منخفض = تقسيم سيء ❌\n\n🔄 العلاقة مع Entropy: عكسية!\n• Entropy ↓ = IG ↑ (أفضل)\n• Entropy ↑ = IG ↓ (أسوأ)\n\n🎯 الشجرة تختار Feature بأعلى IG\nكـ Root Node'},

    {front:'ما هو Impurity؟', back:'Impurity = عدم النقاء\n\n📌 التعريف:\nوجود آثار من فئة في تقسيم فئة أخرى\n\n📊 مثال:\nقسم مخصص لـ "Yes" فيه بعض "No"\n→ هذا Impurity!\n\n🎯 الهدف:\nتقليل Impurity قدر الإمكان\n\n📏 أدوات القياس:\n• Entropy (الأشهر)\n• Gini Index\n• Classification Error'},

    {front:'اشرح مثال لعب الغولف', back:'🏌️ مثال Golf:\n\n📋 بيانات: هل نلعب Golf بناءً على:\n• Outlook (Sunny/Overcast/Rainy)\n• Temperature (Hot/Mild/Cool)\n• Humidity (High/Normal)\n• Windy (True/False)\n\n🌳 بناء الشجرة:\n1. نحسب Entropy للعمود الأخير\n2. نحسب IG لكل Feature\n3. أعلى IG = Root Node\n4. نكرر لكل فرع\n\n🧪 اختبار:\nRainy + Cool + High + No Wind\n→ نتبع الفروع → Yes! ✅'},

    {front:'كيف نختار Root Node؟', back:'🌳 اختيار Root Node:\n\n📊 الخطوات:\n1️⃣ احسب Entropy للعمود الأخير (Target)\n2️⃣ لكل Feature:\n   → احسب Entropy بعد التقسيم\n   → احسب Information Gain\n3️⃣ الـ Feature بأعلى IG = Root Node!\n\n💡 ليش؟\nلأنها تعطي أفضل تقسيم للبيانات\n= أكثر معلومات مكتسبة\n= أقل عشوائية بعد التقسيم\n\n🔄 نكرر نفس العملية لكل فرع'},

    {front:'ما هو ID3 Algorithm؟', back:'ID3 = Iterative Dichotomiser 3\n(ثنائي التفرع التكراري)\n\n📊 خوارزمية لبناء Decision Trees:\n\n1️⃣ احسب Entropy للبيانات\n2️⃣ لكل Feature:\n   → احسب Information Gain\n3️⃣ اختر Feature بأعلى IG\n4️⃣ قسّم البيانات بناءً عليها\n5️⃣ كرر للأقسام الفرعية\n6️⃣ توقف عند:\n   → Entropy = 0 (نقي)\n   → لا توجد Features متبقية'},

    {front:'مشكلة Overfitting وحلولها', back:'⚠️ مشكلة Overfitting:\n→ الشجرة تصير عميقة جداً\n→ تحفظ بيانات التدريب\n→ ما تعمّم على بيانات جديدة\n\n✅ الحلول:\n\n1️⃣ Pruning (التقليم):\n→ قص الفروع غير المهمة\n\n2️⃣ Random Forest (Bagging):\n→ عدة أشجار + تصويت\n\n3️⃣ Gradient Boosting:\n→ أشجار متتالية تصحح الأخطاء\n\n4️⃣ XGBoost:\n→ نسخة محسنة وأسرع'},

    {front:'Entropy vs Information Gain', back:'🔄 المقارنة:\n\n📉 Entropy:\n→ مقياس العشوائية\n→ 0 = نقي (أفضل) | 1 = عشوائي (أسوأ)\n→ كلما قلّ = أفضل\n→ يُطبق على العمود الأخير\n\n📈 Information Gain:\n→ مقياس جودة التقسيم\n→ كلما زاد = أفضل\n→ يُحسب لكل Feature\n→ أعلى IG = Root Node\n\n⚡ العلاقة: عكسية!\nEntropy ↓ = Information Gain ↑'}
];

// Register Chapter 4
App.registerChapter('ch4', {
    label: 'Ch 4',
    overviewSection: 'ch4-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch4-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch4-intro', icon: '🌳', label: 'مقدمة Decision Trees'},
        {id: 'ch4-structure', icon: '🏗️', label: 'بنية الشجرة'},
        {id: 'ch4-entropy', icon: '🎲', label: 'Entropy'},
        {id: 'ch4-infogain', icon: '📊', label: 'Information Gain'},
        {id: 'ch4-golf', icon: '🏌️', label: 'مثال Golf'},
        {id: 'ch4-advanced', icon: '🚀', label: 'مواضيع متقدمة'},
        {id: 'ch4-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch4-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch4-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData4,
    flashcardData: flashcardData4
});
