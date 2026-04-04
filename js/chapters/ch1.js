/* CH1.JS - Chapter 1: Introduction to Machine Learning & Python */

const quizData1 = [
    // ===== ML Definitions (سهل) =====
    {id:1, section:'ch1-intro', type:'mcq', difficulty:'easy',
     question:'What is Machine Learning?',
     options:['A new programming language','A field that gives computers the ability to learn without being explicitly programmed','A type of hardware','A database management system'],
     correct:1,
     explanation:'تعلم الآلة = مجال يمنح الحواسيب القدرة على التعلم بدون برمجة صريحة. التعريف الأصلي من Arthur Samuel (1959).'},

    {id:2, section:'ch1-intro', type:'mcq', difficulty:'easy',
     question:'Who defined Machine Learning as "the ability to learn without being explicitly programmed"?',
     options:['Tom Mitchell','Andrew Ng','Arthur Samuel','Alan Turing'],
     correct:2,
     explanation:'Arthur Samuel (1959) هو أول من عرّف Machine Learning بهذا التعريف الشهير.'},

    {id:3, section:'ch1-intro', type:'mcq', difficulty:'medium',
     question:'According to Tom Mitchell, a program learns from experience E with respect to task T and performance measure P, if:',
     options:['It runs faster over time','Its performance on T, measured by P, improves with experience E','It uses more memory','It needs less code'],
     correct:1,
     explanation:'تعريف Tom Mitchell الرسمي: البرنامج يتعلم إذا تحسّن أداؤه (P) في المهمة (T) مع زيادة الخبرة (E). هذا التعريف الأكثر دقة علمياً.'},

    {id:4, section:'ch1-intro', type:'mcq', difficulty:'easy',
     question:'Machine Learning is a subset of:',
     options:['Database Management','Artificial Intelligence','Web Development','Computer Networking'],
     correct:1,
     explanation:'تعلم الآلة هو فرع من الذكاء الاصطناعي (Artificial Intelligence). AI هو المجال الأوسع.'},

    {id:5, section:'ch1-intro', type:'mcq', difficulty:'medium',
     question:'The primary aim of Machine Learning is to:',
     options:['Replace all programmers','Allow computers to learn automatically without human intervention','Make computers faster','Reduce internet usage'],
     correct:1,
     explanation:'الهدف الأساسي: السماح للحواسيب بالتعلم تلقائياً (automatically) بدون تدخل بشري (without human intervention).'},

    // ===== ML Types (متوسط) =====
    {id:6, section:'ch1-types', type:'mcq', difficulty:'easy',
     question:'How many main types of Machine Learning are there?',
     options:['2','3','4','5'],
     correct:1,
     explanation:'ثلاثة أنواع رئيسية: 1) Supervised Learning 2) Unsupervised Learning 3) Reinforcement Learning.'},

    {id:7, section:'ch1-types', type:'mcq', difficulty:'easy',
     question:'In Supervised Learning, the training data includes:',
     options:['Only inputs','Only outputs','Both inputs and desired outputs (labels)','Random data'],
     correct:2,
     explanation:'في التعلم المُشرف عليه: البيانات تحتوي على المُدخلات (inputs) + المُخرجات المطلوبة (desired outputs/labels). المودل يتعلم العلاقة بينهم.'},

    {id:8, section:'ch1-types', type:'mcq', difficulty:'easy',
     question:'Which type of ML works with unlabeled data?',
     options:['Supervised Learning','Unsupervised Learning','Reinforcement Learning','All of them'],
     correct:1,
     explanation:'التعلم غير المُشرف عليه (Unsupervised) يعمل مع بيانات بدون تسميات (unlabeled data). المودل يكتشف الأنماط بنفسه.'},

    {id:9, section:'ch1-types', type:'mcq', difficulty:'medium',
     question:'Classification is a type of:',
     options:['Unsupervised Learning','Reinforcement Learning','Supervised Learning','None of the above'],
     correct:2,
     explanation:'التصنيف (Classification) = نوع من Supervised Learning. المودل يتعلم تصنيف البيانات إلى فئات محددة مُسبقاً.'},

    {id:10, section:'ch1-types', type:'mcq', difficulty:'medium',
     question:'Clustering is an example of:',
     options:['Supervised Learning','Unsupervised Learning','Reinforcement Learning','Deep Learning'],
     correct:1,
     explanation:'التجميع (Clustering) = نوع من Unsupervised Learning. يجمع البيانات المتشابهة في مجموعات بدون تسميات مسبقة.'},

    {id:11, section:'ch1-types', type:'mcq', difficulty:'medium',
     question:'In Reinforcement Learning, the agent learns by:',
     options:['Memorizing all data','Receiving labeled examples','Interacting with environment and receiving rewards/penalties','Copying other models'],
     correct:2,
     explanation:'في تعلم التعزيز: العميل (Agent) يتفاعل مع البيئة (Environment) ويتلقى مكافآت (Rewards) أو عقوبات (Penalties). مثل تعليم طفل!'},

    {id:12, section:'ch1-types', type:'mcq', difficulty:'hard',
     question:'What is the key difference between Classification and Regression?',
     options:['Classification uses more data','Classification predicts discrete categories while Regression predicts continuous values','Regression is always more accurate','There is no difference'],
     correct:1,
     explanation:'التصنيف (Classification) = يتنبأ بفئات منفصلة (مثل: spam/not spam). الانحدار (Regression) = يتنبأ بقيم مستمرة (مثل: سعر منزل).'},

    // ===== ML Algorithms (متوسط/صعب) =====
    {id:13, section:'ch1-algorithms', type:'mcq', difficulty:'medium',
     question:'Which algorithm is based on Bayes\' Theorem of probability?',
     options:['Decision Tree','SVM','Naive Bayes','K-Means'],
     correct:2,
     explanation:'Naive Bayes مبني على نظرية بايز للاحتمالات. يُسمى "Naive" (ساذج) لأنه يفترض أن الخصائص (Features) مستقلة عن بعضها.'},

    {id:14, section:'ch1-algorithms', type:'mcq', difficulty:'medium',
     question:'SVM (Support Vector Machine) works by finding:',
     options:['The average of all data points','A hyperplane that best separates different classes','The closest data points','Random boundaries'],
     correct:1,
     explanation:'SVM يبحث عن "الحد الفاصل الأمثل" (hyperplane) الذي يفصل بين الفئات المختلفة بأكبر هامش (margin) ممكن.'},

    {id:15, section:'ch1-algorithms', type:'mcq', difficulty:'medium',
     question:'Decision Trees make decisions by:',
     options:['Random selection','Splitting data based on feature values in a tree structure','Using neural networks','Clustering data'],
     correct:1,
     explanation:'شجرة القرار تقسم البيانات بناءً على قيم الخصائص (features) في هيكل شجري. كل عقدة = سؤال، كل ورقة = قرار.'},

    {id:16, section:'ch1-algorithms', type:'mcq', difficulty:'hard',
     question:'Which of the following is NOT a Supervised Learning algorithm?',
     options:['Linear Regression','Naive Bayes','K-Means Clustering','Decision Trees'],
     correct:2,
     explanation:'K-Means Clustering هو خوارزمية Unsupervised Learning (تجميع). بقية الخيارات كلها Supervised Learning.'},

    {id:17, section:'ch1-algorithms', type:'mcq', difficulty:'hard',
     question:'Dimensionality Reduction is used to:',
     options:['Add more features to data','Reduce the number of features while preserving important information','Delete all data','Increase data size'],
     correct:1,
     explanation:'تقليل الأبعاد = تقليل عدد الخصائص (features) مع الحفاظ على المعلومات المهمة. مثال: PCA (Principal Component Analysis).'},

    // ===== Python & Libraries (سهل/متوسط) =====
    {id:18, section:'ch1-python', type:'mcq', difficulty:'easy',
     question:'Which Python library is primarily used for numerical computations with arrays?',
     options:['Pandas','Matplotlib','NumPy','Scikit-learn'],
     correct:2,
     explanation:'NumPy = المكتبة الأساسية للحسابات العددية والمصفوفات (arrays). كل مكتبات ML تعتمد عليها.'},

    {id:19, section:'ch1-python', type:'mcq', difficulty:'easy',
     question:'Which library is used for data visualization and plotting?',
     options:['NumPy','Matplotlib','SciPy','Pandas'],
     correct:1,
     explanation:'Matplotlib = المكتبة الأساسية لرسم الرسوم البيانية (plots, charts, histograms) في Python.'},

    {id:20, section:'ch1-python', type:'mcq', difficulty:'easy',
     question:'Scikit-learn is a Python library for:',
     options:['Web development','Machine Learning','Game development','Mobile apps'],
     correct:1,
     explanation:'Scikit-learn (sklearn) = المكتبة الأشهر لتعلم الآلة في Python. تحتوي على جميع الخوارزميات الأساسية.'},

    {id:21, section:'ch1-python', type:'mcq', difficulty:'medium',
     question:'Pandas is best described as a library for:',
     options:['Image processing','Data analysis and manipulation','Neural networks','Web scraping'],
     correct:1,
     explanation:'Pandas = مكتبة تحليل البيانات. توفر DataFrame (جداول) لتنظيم وتحليل البيانات بسهولة. أساسية في Data Science.'},

    {id:22, section:'ch1-python', type:'mcq', difficulty:'medium',
     question:'Anaconda is:',
     options:['A programming language','A Python distribution for data science','A database system','An operating system'],
     correct:1,
     explanation:'Anaconda = توزيعة Python جاهزة لعلم البيانات. تأتي مع كل المكتبات المطلوبة (NumPy, Pandas, Matplotlib...) مثبتة مسبقاً.'},

    // ===== Data Types (متوسط) =====
    {id:23, section:'ch1-python', type:'mcq', difficulty:'medium',
     question:'Which of the following is a Continuous numerical data type?',
     options:['Number of students in a class','Temperature readings','Color categories','T-shirt sizes (S, M, L)'],
     correct:1,
     explanation:'درجة الحرارة = بيانات عددية مستمرة (Continuous). يمكن أن تأخذ أي قيمة (36.5, 37.2...). عدد الطلاب = Discrete (منفصل).'},

    {id:24, section:'ch1-python', type:'mcq', difficulty:'medium',
     question:'Ordinal data is:',
     options:['Data with no order','Categorical data that has a meaningful order','Only numerical data','Random data'],
     correct:1,
     explanation:'بيانات ترتيبية (Ordinal) = فئات لها ترتيب معيّن. مثال: مقاسات الملابس (S < M < L < XL) أو التقييمات (ممتاز > جيد > مقبول).'},

    // ===== True/False =====
    {id:25, section:'ch1-intro', type:'mcq', difficulty:'easy',
     question:'True or False: Machine Learning is a branch of Artificial Intelligence.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ تعلم الآلة هو فرع من الذكاء الاصطناعي (AI). ML ⊂ AI.'},

    {id:26, section:'ch1-types', type:'mcq', difficulty:'easy',
     question:'True or False: In Unsupervised Learning, the training data has labels.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ في التعلم غير المُشرف (Unsupervised)، البيانات ليس لها تسميات (unlabeled). المودل يكتشف الأنماط بنفسه.'},

    {id:27, section:'ch1-algorithms', type:'mcq', difficulty:'medium',
     question:'True or False: K-Means is a Supervised Learning algorithm.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ K-Means هو خوارزمية Unsupervised Learning (تجميع/Clustering). لا يحتاج تسميات مسبقة.'},

    {id:28, section:'ch1-python', type:'mcq', difficulty:'easy',
     question:'True or False: NumPy is used for creating neural networks.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ NumPy تُستخدم للحسابات العددية والمصفوفات (arrays). لإنشاء شبكات عصبية نستخدم TensorFlow أو PyTorch.'},

    // ===== Essay =====
    {id:29, section:'ch1-intro', type:'essay', difficulty:'hard',
     question:'Define Machine Learning using both Arthur Samuel\'s and Tom Mitchell\'s definitions. Explain the relationship between AI and ML.',
     answer:'التعريف 1 (Arthur Samuel 1959): "Machine Learning is a field of study that gives computers the ability to learn without being explicitly programmed."\n\nالتعريف 2 (Tom Mitchell): "A computer program is said to learn from Experience (E) with respect to some Task (T) and Performance measure (P), if its performance on T, as measured by P, improves with experience E."\n\nالعلاقة: ML هو فرع/مجموعة جزئية من AI (Artificial Intelligence). AI هو المجال الأوسع الذي يهدف لمحاكاة الذكاء البشري، بينما ML يركز تحديداً على التعلم من البيانات.'},

    {id:30, section:'ch1-types', type:'essay', difficulty:'hard',
     question:'Compare the three main types of Machine Learning with examples for each.',
     answer:'1) Supervised Learning (التعلم المُشرف):\n- بيانات مُعنونة (labeled data)\n- المودل يتعلم من أمثلة محلولة\n- أنواعه: Classification (تصنيف) + Regression (انحدار)\n- مثال: تصنيف spam emails، توقع أسعار المنازل\n\n2) Unsupervised Learning (التعلم غير المُشرف):\n- بيانات بدون تسميات (unlabeled data)\n- المودل يكتشف الأنماط بنفسه\n- أنواعه: Clustering (تجميع) + Association + Dimensionality Reduction\n- مثال: تجميع العملاء حسب سلوك الشراء\n\n3) Reinforcement Learning (تعلم التعزيز):\n- Agent يتفاعل مع Environment\n- يتعلم من trial and error\n- يحصل على Reward (مكافأة) أو Penalty (عقوبة)\n- مثال: تعليم روبوت المشي، AlphaGo'}
];

const flashcardData1 = [
    {front:'ما هو تعريف Machine Learning؟ (Arthur Samuel)', back:'مجال دراسي يمنح الحواسيب القدرة على التعلم\nبدون برمجة صريحة\n\n"A field that gives computers the ability to learn\nwithout being explicitly programmed"\n\n🗓️ Arthur Samuel (1959)'},

    {front:'ما هو تعريف Tom Mitchell التقني؟', back:'البرنامج يتعلم من خبرة E بالنسبة لمهمة T\nومقياس أداء P، إذا:\n\n📈 أداؤه في T (مقاساً بـ P)\nيتحسن مع زيادة الخبرة E\n\nT = Task (المهمة)\nP = Performance (الأداء)\nE = Experience (الخبرة)'},

    {front:'ما هي الأنواع الثلاثة الرئيسية لـ ML؟', back:'1) Supervised Learning 📋\n→ بيانات مُعنونة (labeled)\n→ Classification + Regression\n\n2) Unsupervised Learning 🔍\n→ بيانات بدون تسميات (unlabeled)\n→ Clustering + Association\n\n3) Reinforcement Learning 🎮\n→ Agent + Environment\n→ Trial and Error + Rewards'},

    {front:'ما الفرق بين Classification و Regression؟', back:'Classification (تصنيف) 📊\n→ يتنبأ بفئات منفصلة (discrete categories)\n→ مثال: Spam أو Not Spam\n→ مثال: صورة قطة أو كلب\n\nRegression (انحدار) 📈\n→ يتنبأ بقيم مستمرة (continuous values)\n→ مثال: سعر منزل = $350,000\n→ مثال: درجة الحرارة غداً = 28.5°'},

    {front:'ما هو Supervised Learning بالتفصيل؟', back:'التعلم المُشرف عليه\n\n📋 البيانات: Input + Output (labeled)\n🎓 المودل يتعلم من أمثلة "محلولة"\n\nأنواعه:\n📊 Classification → فئات (Cat/Dog)\n📈 Regression → قيم (Price = $X)\n\nخوارزميات:\n• Naive Bayes • SVM\n• Decision Trees • Linear Regression'},

    {front:'ما هو Unsupervised Learning بالتفصيل؟', back:'التعلم غير المُشرف\n\n🔍 البيانات: Input فقط (unlabeled)\n🧩 المودل يكتشف الأنماط بنفسه\n\nأنواعه:\n🎯 Clustering → تجميع (Customer segments)\n🔗 Association → ارتباطات (Market basket)\n📉 Dimensionality Reduction → تقليل أبعاد\n\nمثال الفاكهة:\nيجمع التفاح مع بعض والموز مع بعض بدون ما نقوله!'},

    {front:'ما هو Reinforcement Learning؟', back:'تعلم التعزيز 🎮\n\n🤖 Agent (العميل) يتفاعل مع:\n🌍 Environment (البيئة)\n\nالعملية:\n1️⃣ Agent يتخذ Action (فعل)\n2️⃣ يحصل على Reward أو Penalty\n3️⃣ يتعلم من Trial and Error\n\nأمثلة:\n🎮 AlphaGo (لعبة Go)\n🚗 Self-driving cars\n🤖 Robot walking'},

    {front:'ما هو Naive Bayes؟', back:'خوارزمية Naive Bayes\n\n📐 مبنية على: نظرية بايز للاحتمالات\n📊 نوعها: Supervised (Classification)\n\n"Naive" (ساذج) لأنه يفترض:\n→ كل Feature مستقل عن الباقي\n\nاستخداماته:\n📧 تصنيف Spam\n😊 تحليل المشاعر (Sentiment)\n📰 تصنيف النصوص'},

    {front:'ما هو SVM (Support Vector Machine)؟', back:'آلة المتجهات الداعمة\n\n🎯 الهدف: إيجاد Hyperplane\nيفصل بين الفئات بأكبر Margin\n\n📐 Support Vectors = النقاط الأقرب للحد الفاصل\n\nاستخداماته:\n🖼️ تصنيف الصور\n✍️ التعرف على الكتابة\n🧬 تحليل البيانات الجينية'},

    {front:'ما هي مكتبات Python الأساسية لـ ML؟', back:'6 مكتبات أساسية:\n\n🔢 NumPy → حسابات عددية + مصفوفات\n🔬 SciPy → حوسبة علمية متقدمة\n📊 Matplotlib → رسوم بيانية\n🤖 Scikit-learn → خوارزميات ML\n📋 Pandas → تحليل بيانات + DataFrames\n\n💡 Anaconda = توزيعة جاهزة\nتأتي مع كل المكتبات مثبتة!'},

    {front:'ما هي أنواع البيانات في Data Science؟', back:'3 أنواع رئيسية:\n\n1️⃣ Numerical (عددية)\n→ Discrete (منفصلة): عدد طلاب = 30\n→ Continuous (مستمرة): حرارة = 36.7°\n\n2️⃣ Categorical (فئوية)\n→ فئات بدون ترتيب\n→ مثال: ألوان (أحمر، أزرق، أخضر)\n\n3️⃣ Ordinal (ترتيبية)\n→ فئات لها ترتيب\n→ مثال: S < M < L < XL'},

    {front:'ما العلاقة بين AI و ML و Deep Learning؟', back:'الهرم من الأوسع للأضيق:\n\n🧠 AI (الذكاء الاصطناعي)\n→ المجال الأشمل\n→ محاكاة الذكاء البشري\n\n⊃ 🤖 ML (تعلم الآلة)\n→ فرع من AI\n→ التعلم من البيانات\n\n⊃ 🔬 Deep Learning (التعلم العميق)\n→ فرع من ML\n→ شبكات عصبية عميقة\n\nAI ⊃ ML ⊃ DL'},

    {front:'ما هو Histogram؟ وكيف ننشئه بـ NumPy؟', back:'المدرج التكراري (Histogram)\n\n📊 رسم بياني يوضح توزيع البيانات\n→ المحور X = القيم (bins)\n→ المحور Y = التكرار (frequency)\n\nالكود:\nimport numpy as np\nimport matplotlib.pyplot as plt\n\ndata = np.random.normal(170, 10, 250)\nplt.hist(data)\nplt.show()'}
];

// Register Chapter 1
App.registerChapter('ch1', {
    label: 'Ch 1',
    overviewSection: 'ch1-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch1-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch1-intro', icon: '🧠', label: 'ما هو تعلم الآلة؟'},
        {id: 'ch1-types', icon: '📊', label: 'أنواع ML'},
        {id: 'ch1-algorithms', icon: '🔧', label: 'خوارزميات ML'},
        {id: 'ch1-python', icon: '🐍', label: 'Python والمكتبات'},
        {id: 'ch1-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch1-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch1-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData1,
    flashcardData: flashcardData1
});
