/* CH3.JS - Chapter 3: Support Vector Machine (SVM) */

const quizData3 = [
    // ===== SVM Basics (سهل) =====
    {id:1, section:'ch3-intro', type:'mcq', difficulty:'easy',
     question:'What does SVM stand for?',
     options:['Simple Vector Machine','Support Vector Machine','Standard Variation Method','Supervised Vector Model'],
     correct:1,
     explanation:'SVM = Support Vector Machine (آلة المتجهات الداعمة). هي خوارزمية Supervised Learning تستخدم لتصنيف البيانات عن طريق إيجاد أفضل Hyperplane يفصل بين الفئات.'},

    {id:2, section:'ch3-intro', type:'mcq', difficulty:'easy',
     question:'SVM is a type of:',
     options:['Unsupervised Learning','Reinforcement Learning','Supervised Learning','Semi-supervised Learning'],
     correct:2,
     explanation:'SVM هي خوارزمية Supervised Learning — تحتاج بيانات تدريب مُعنونة (Labeled) عشان تتعلم وترسم الـ Hyperplane.'},

    {id:3, section:'ch3-intro', type:'mcq', difficulty:'easy',
     question:'The main goal of SVM is to find:',
     options:['The average of all data points','An optimal hyperplane that separates classes','The closest data points','Random decision boundaries'],
     correct:1,
     explanation:'الهدف الرئيسي لـ SVM هو إيجاد Optimal Hyperplane (مستوى فائق أمثل) يفصل بين الفئات بأكبر هامش ممكن.'},

    {id:4, section:'ch3-intro', type:'mcq', difficulty:'easy',
     question:'In 2D space, the hyperplane in SVM is:',
     options:['A circle','A curve','A straight line','A point'],
     correct:2,
     explanation:'في الفضاء ثنائي الأبعاد (2D)، الـ Hyperplane هو خط مستقيم (Line) يقسم المستوى إلى جزئين — كل فئة على جانب.'},

    {id:5, section:'ch3-intro', type:'mcq', difficulty:'easy',
     question:'What are "Support Vectors" in SVM?',
     options:['All data points','The data points closest to the hyperplane','The data points farthest from the hyperplane','Random data points'],
     correct:1,
     explanation:'Support Vectors = نقاط البيانات الأقرب للـ Hyperplane. هذه النقاط هي اللي تحدد موقع واتجاه الـ Hyperplane — لذلك سميت "داعمة".'},

    // ===== Hyperplane & Margin (متوسط) =====
    {id:6, section:'ch3-hyperplane', type:'mcq', difficulty:'medium',
     question:'A good margin in SVM is one where:',
     options:['The separation is as small as possible','The separation is as large as possible for both classes','Only one class is well separated','The line passes through data points'],
     correct:1,
     explanation:'الـ Good Margin (هامش جيد) هو اللي يكون فيه الفصل أكبر ما يمكن بين الفئتين — equidistant وبأبعد مسافة ممكنة من كلا الجانبين.'},

    {id:7, section:'ch3-hyperplane', type:'mcq', difficulty:'medium',
     question:'A "Bad margin" occurs when:',
     options:['The hyperplane is equidistant from both classes','The hyperplane is too close to one class','The margin is maximized','All points are support vectors'],
     correct:1,
     explanation:'Bad Margin يحصل لما يكون الـ Hyperplane قريب جداً من فئة معينة. هذا يعني إن أي نقطة جديدة قريبة من هذه الفئة ممكن يتم تصنيفها خطأ.'},

    {id:8, section:'ch3-hyperplane', type:'mcq', difficulty:'medium',
     question:'SVM tries to maximize the:',
     options:['Number of data points','Margin between classes','Training time','Number of features'],
     correct:1,
     explanation:'SVM يحاول يكبّر (Maximize) الـ Margin — المسافة بين الـ Hyperplane وأقرب نقاط البيانات (Support Vectors) من كلا الفئتين.'},

    // ===== Kernel (متوسط/صعب) =====
    {id:9, section:'ch3-kernel', type:'mcq', difficulty:'medium',
     question:'What is a Kernel in SVM?',
     options:['A type of data','A function that transforms data to a higher dimension','A type of error','A measurement unit'],
     correct:1,
     explanation:'الـ Kernel هو دالة تحول البيانات إلى فضاء ذو أبعاد أعلى (Higher Dimensional Space) حتى يمكن فصلها. مثلاً: بيانات في 2D ما ينفع نفصلها بخط → الكيرنل ينقلها لـ 3D عشان نفصلها بسطح.'},

    {id:10, section:'ch3-kernel', type:'mcq', difficulty:'medium',
     question:'Linear Kernel works by:',
     options:['Transforming data to 3D','Calculating inner products of input vector with all support vectors','Creating polynomial curves','Using neural networks'],
     correct:1,
     explanation:'Linear Kernel يحسب حاصل الضرب الداخلي (Inner Product) بين المتجه الجديد وكل Support Vectors في بيانات التدريب. مناسب لما البيانات قابلة للفصل بخط مستقيم.'},

    {id:11, section:'ch3-kernel', type:'mcq', difficulty:'medium',
     question:'Polynomial Kernel is used for:',
     options:['Linear separation only','Nonlinear separation using the kernel trick','Clustering data','Reducing dimensions'],
     correct:1,
     explanation:'Polynomial Kernel يستخدم لـ Nonlinear Separation — يحسب خط الفصل في بُعد أعلى (Higher Dimension). هذا يُسمى Kernel Trick وهو مفيد لما البيانات ما تنفصل بخط مستقيم.'},

    {id:12, section:'ch3-kernel', type:'mcq', difficulty:'hard',
     question:'The "Kernel Trick" refers to:',
     options:['Using a simple linear model','Transforming non-linearly separable data into linearly separable data in higher dimensions','Removing outliers from data','Normalizing data values'],
     correct:1,
     explanation:'Kernel Trick = تحويل البيانات غير القابلة للفصل الخطي إلى بيانات قابلة للفصل في فضاء ذو أبعاد أعلى. بدل ما نرسم خط في 2D، نرفع البيانات لـ 3D أو أكثر وهناك نفصلها بسطح مستوي.'},

    {id:13, section:'ch3-kernel', type:'mcq', difficulty:'hard',
     question:'When should you use a Polynomial Kernel instead of a Linear Kernel?',
     options:['When data is linearly separable','When data is NOT linearly separable','When you have very few data points','When features are independent'],
     correct:1,
     explanation:'نستخدم Polynomial Kernel لما البيانات ما تنفصل بخط مستقيم (Not Linearly Separable). الكيرنل ينقل البيانات لبُعد أعلى حيث يمكن فصلها.'},

    // ===== Regularization (متوسط/صعب) =====
    {id:14, section:'ch3-regularization', type:'mcq', difficulty:'medium',
     question:'The Regularization parameter (C) in SVM controls:',
     options:['The number of features','How much to avoid misclassifying training examples','The speed of training','The number of support vectors only'],
     correct:1,
     explanation:'معامل التنعيم C يتحكم في مقدار التسامح مع الأخطاء في التصنيف. كلما زاد C = تسامح أقل مع الأخطاء = فصل أدق بس ممكن Overfitting.'},

    {id:15, section:'ch3-regularization', type:'mcq', difficulty:'medium',
     question:'A higher C value in SVM means:',
     options:['More tolerance for outliers','Less tolerance for outliers, better separation','Wider margin','Fewer support vectors'],
     correct:1,
     explanation:'C عالي = تسامح أقل مع الـ Outliers = الـ Hyperplane يحاول يفصل البيانات بشكل أدق. لكن حذاري: C عالي جداً ممكن يسبب Overfitting!'},

    {id:16, section:'ch3-regularization', type:'mcq', difficulty:'hard',
     question:'A low C value in SVM results in:',
     options:['Perfect classification of training data','More tolerance for misclassification, wider margin','No margin at all','Error in training'],
     correct:1,
     explanation:'C منخفض = تسامح أكثر مع أخطاء التصنيف = هامش أعرض. هذا يعني الموديل أبسط وأقل عرضة لـ Overfitting، بس ممكن يخطئ في بعض نقاط التدريب.'},

    // ===== Gamma (متوسط/صعب) =====
    {id:17, section:'ch3-gamma', type:'mcq', difficulty:'medium',
     question:'The Gamma parameter in SVM defines:',
     options:['The size of the dataset','How far the influence of a single training example reaches','The number of classes','The type of kernel'],
     correct:1,
     explanation:'Gamma يحدد مدى تأثير نقطة تدريب واحدة. Low Gamma = تأثير يصل بعيد (Far). High Gamma = تأثير قريب فقط (Close).'},

    {id:18, section:'ch3-gamma', type:'mcq', difficulty:'medium',
     question:'Low Gamma in SVM means:',
     options:['Only nearby points are considered','Far away points are also considered','No points are considered','All points have equal weight'],
     correct:1,
     explanation:'Low Gamma = النقاط البعيدة تُؤخذ في الاعتبار أيضاً = منحنى قرار أكثر سلاسة (Smoother Decision Boundary). مناسب لما نبي الموديل يعمّم بشكل جيد.'},

    {id:19, section:'ch3-gamma', type:'mcq', difficulty:'hard',
     question:'High Gamma in SVM results in:',
     options:['Smooth decision boundary','Complex decision boundary, risk of overfitting','No decision boundary','Linear separation only'],
     correct:1,
     explanation:'High Gamma = فقط النقاط القريبة تُعتبر = منحنى قرار معقد ومتعرج. خطر Overfitting لأن الموديل يتأثر بكل نقطة قريبة.'},

    // ===== Parameters Overview (متوسط) =====
    {id:20, section:'ch3-parameters', type:'mcq', difficulty:'medium',
     question:'The THREE main parameters to tune in SVM are:',
     options:['Learning rate, Epochs, Batch size','Regularization (C), Kernel, Gamma','Mean, Median, Mode','Precision, Recall, F1-score'],
     correct:1,
     explanation:'الثلاث معاملات الرئيسية في SVM:\\n1️⃣ Regularization (C): التسامح مع الأخطاء\\n2️⃣ Kernel: نوع التحويل (Linear, Polynomial, RBF)\\n3️⃣ Gamma: مدى تأثير النقاط'},

    {id:21, section:'ch3-parameters', type:'mcq', difficulty:'medium',
     question:'In Scikit-learn, the SVM parameter for regularization is usually called:',
     options:['alpha','C','gamma','degree'],
     correct:1,
     explanation:'في Scikit-learn، معامل التنعيم يُسمى C (حرف كبير). كلما زاد C = فصل أدق بس خطر Overfitting أعلى.'},

    // ===== Practical / Obesity Example (متوسط) =====
    {id:22, section:'ch3-examples', type:'mcq', difficulty:'medium',
     question:'In the Obesity example from the lecture, what is the issue with a biased hyperplane?',
     options:['It is too fast','It has low accuracy because it favors one class','It uses too much memory','It cannot process the data'],
     correct:1,
     explanation:'الـ Hyperplane المتحيز يكون قريب جداً من فئة معينة — مما يقلل الدقة (Accuracy) لأنه يصنّف بعض النقاط بشكل خاطئ. الحل: إيجاد خط يكون متساوي البعد من الفئتين.'},

    {id:23, section:'ch3-examples', type:'mcq', difficulty:'medium',
     question:'The standard split for training and testing data mentioned in the lecture is:',
     options:['50% training, 50% testing','60% training, 40% testing','70% training, 30% testing','80% training, 20% testing'],
     correct:2,
     explanation:'تقسيم البيانات المعتاد: 70% للتدريب (Training) و 30% للاختبار (Testing). هذا يعطي الموديل بيانات كافية للتعلم مع الحفاظ على بيانات كافية للتقييم.'},

    // ===== Outliers (متوسط) =====
    {id:24, section:'ch3-hyperplane', type:'mcq', difficulty:'medium',
     question:'Outliers in SVM affect:',
     options:['Nothing, SVM ignores outliers','The position and angle of the hyperplane','Only the color of the plot','The number of features'],
     correct:1,
     explanation:'الـ Outliers (القيم الشاذة) تأثر على موقع واتجاه الـ Hyperplane. عشان كذا SVM يوفر معاملات مثل C و Gamma للتحكم في مدى تأثرها بالـ Outliers.'},

    // ===== True/False =====
    {id:25, section:'ch3-intro', type:'mcq', difficulty:'easy',
     question:'True or False: SVM can only be used for 2D data.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ SVM يعمل في أي عدد من الأبعاد! في 2D الـ Hyperplane هو خط، في 3D هو سطح مستوي، وفي أبعاد أعلى هو مستوى فائق (Hyperplane).'},

    {id:26, section:'ch3-kernel', type:'mcq', difficulty:'medium',
     question:'True or False: The Kernel Trick physically transforms data into a higher dimension.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ الـ Kernel Trick لا ينقل البيانات فعلياً! بل يحسب العلاقات كأن البيانات في بُعد أعلى. هذا يوفر وقت ومساحة ذاكرة كبيرة.'},

    {id:27, section:'ch3-regularization', type:'mcq', difficulty:'medium',
     question:'True or False: A very high C value always gives the best SVM model.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ C عالي جداً يسبب Overfitting — الموديل يحفظ بيانات التدريب بدل ما يتعلم الأنماط العامة. لازم نوازن بين الدقة والتعميم.'},

    {id:28, section:'ch3-gamma', type:'mcq', difficulty:'medium',
     question:'True or False: Low Gamma means only nearby points influence the decision boundary.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ العكس! Low Gamma = النقاط البعيدة تؤثر أيضاً (Far). High Gamma = فقط النقاط القريبة تؤثر (Close).'},

    {id:29, section:'ch3-hyperplane', type:'mcq', difficulty:'easy',
     question:'True or False: The hyperplane in SVM should maximize the margin.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ الـ Hyperplane المثالي يكون عنده أكبر Margin ممكن — متساوي البعد من أقرب نقاط الفئتين (Support Vectors).'},

    // ===== Essay =====
    {id:30, section:'ch3-intro', type:'essay', difficulty:'hard',
     question:'Explain how SVM works to classify data. Include: Hyperplane, Support Vectors, and Margin.',
     answer:'SVM (Support Vector Machine) يعمل كالتالي:\n\n1️⃣ Hyperplane (المستوى الفائق):\n→ خط (في 2D) أو سطح (في 3D) يفصل بين الفئات\n→ الهدف: إيجاد أفضل hyperplane يقسم البيانات\n\n2️⃣ Support Vectors (المتجهات الداعمة):\n→ نقاط البيانات الأقرب للـ hyperplane\n→ هذه النقاط تحدد موقع واتجاه الـ hyperplane\n→ تسمية الخوارزمية جاءت منهم\n\n3️⃣ Margin (الهامش):\n→ المسافة بين الـ hyperplane وأقرب نقاط من كل فئة\n→ SVM يحاول تكبير (Maximize) هذا الهامش\n→ Good Margin = متساوي وبعيد من الفئتين\n→ Bad Margin = قريب من فئة (تحيز)'},

    {id:31, section:'ch3-kernel', type:'essay', difficulty:'hard',
     question:'Compare Linear Kernel and Polynomial Kernel in SVM. When would you use each?',
     answer:'Linear Kernel:\n→ يحسب Inner Product بين المتجهات\n→ مناسب لما البيانات قابلة للفصل بخط مستقيم\n→ أسرع وأبسط\n→ مثال: فصل بين spam و not spam بناءً على عدد الكلمات\n\nPolynomial Kernel:\n→ يحسب خط الفصل في بُعد أعلى\n→ يستخدم Kernel Trick للفصل غير الخطي\n→ مناسب لما البيانات ما تنفصل بخط مستقيم\n→ مثال: تصنيف الصور حيث العلاقات بين البكسلات معقدة\n\nمتى نستخدم كل واحد؟\n• Linear: بيانات بسيطة وقابلة للفصل الخطي\n• Polynomial: بيانات معقدة ومتداخلة'},

    {id:32, section:'ch3-parameters', type:'essay', difficulty:'hard',
     question:'Explain the three main parameters of SVM: C, Kernel, and Gamma.',
     answer:'1️⃣ C (Regularization - التنعيم):\n→ يتحكم في التسامح مع أخطاء التصنيف\n→ C عالي = دقة أعلى على بيانات التدريب لكن خطر Overfitting\n→ C منخفض = هامش أعرض وتعميم أفضل لكن أخطاء أكثر\n\n2️⃣ Kernel (نوع التحويل):\n→ Linear: فصل خطي مباشر\n→ Polynomial: فصل غير خطي بالـ Kernel Trick\n→ RBF: فصل غير خطي بتأثير شعاعي\n\n3️⃣ Gamma (مدى التأثير):\n→ Low Gamma: نقاط بعيدة تؤثر → منحنى سلس\n→ High Gamma: نقاط قريبة فقط → منحنى معقد\n→ التوازن مهم لتجنب Overfitting'}
];

const flashcardData3 = [
    {front:'ما هو SVM (Support Vector Machine)؟', back:'خوارزمية Supervised Learning هدفها:\n→ إيجاد Optimal Hyperplane (مستوى فائق أمثل)\n→ يفصل بين الفئات المختلفة\n\n📏 في 2D: الـ Hyperplane = خط مستقيم\n📐 في 3D: الـ Hyperplane = سطح مستوي\n\n🎯 يختار الخط اللي يعطي أكبر هامش (Margin)\nبين أقرب نقاط الفئتين'},

    {front:'ما هي Support Vectors؟', back:'Support Vectors = المتجهات الداعمة\n\n📌 هي نقاط البيانات الأقرب من الـ Hyperplane\n\n🔑 أهميتها:\n→ تحدد موقع واتجاه الـ Hyperplane\n→ لو تغيرت = يتغير الـ Hyperplane\n→ باقي النقاط البعيدة ما تأثر\n\n💡 اسم الخوارزمية جاء منهم!\n"Support" = داعمة\n"Vector" = متجه (نقطة بيانات)'},

    {front:'ما الفرق بين Good Margin و Bad Margin؟', back:'✅ Good Margin:\n→ الـ Hyperplane متساوي البعد من الفئتين\n→ المسافة أكبر ما يمكن (Equidistant)\n→ تصنيف أدق للنقاط الجديدة\n\n❌ Bad Margin:\n→ الـ Hyperplane قريب جداً من فئة واحدة\n→ يسبب أخطاء في التصنيف\n→ تحيز (Bias) لفئة معينة\n\n🎯 SVM يهدف دائماً لـ Maximum Margin'},

    {front:'ما هو Kernel في SVM؟', back:'Kernel = دالة تحويل البيانات\n\n📐 أنواعه:\n\n1️⃣ Linear Kernel:\n→ Inner Product بين المتجهات\n→ للفصل الخطي المباشر\n\n2️⃣ Polynomial Kernel:\n→ ينقل البيانات لبُعد أعلى\n→ Kernel Trick للفصل غير الخطي\n\n💡 متى نستخدم كل واحد؟\n→ Linear: بيانات قابلة للفصل بخط\n→ Polynomial: بيانات متداخلة ومعقدة'},

    {front:'ما هي Kernel Trick؟', back:'Kernel Trick = حيلة الكيرنل\n\n🔄 الفكرة:\nتحويل بيانات غير قابلة للفصل\nإلى بيانات قابلة للفصل\n\n📊 كيف؟\n→ بيانات في 2D ما تنفصل بخط\n→ الكيرنل يحسبها كأنها في 3D أو أكثر\n→ في البُعد الأعلى يمكن فصلها بسطح\n\n⚡ الميزة:\nلا ينقل البيانات فعلياً!\nيحسب العلاقات فقط = أسرع وأوفر'},

    {front:'ما هو معامل C (Regularization)؟', back:'C = معامل التنعيم (Regularization)\n\n🎚️ يتحكم في التسامح مع الأخطاء:\n\n📈 C عالي:\n→ تسامح أقل مع الأخطاء\n→ فصل أدق لبيانات التدريب\n→ خطر Overfitting ⚠️\n\n📉 C منخفض:\n→ تسامح أكثر مع الأخطاء\n→ هامش أعرض\n→ تعميم أفضل ✅\n\n⚖️ لازم نوازن بين الدقة والتعميم'},

    {front:'ما هو معامل Gamma؟', back:'Gamma = مدى تأثير نقطة التدريب\n\n📉 Low Gamma:\n→ النقاط البعيدة تؤثر أيضاً\n→ منحنى قرار سلس (Smooth)\n→ تعميم أفضل ✅\n\n📈 High Gamma:\n→ فقط النقاط القريبة تؤثر\n→ منحنى قرار معقد ومتعرج\n→ خطر Overfitting ⚠️\n\n💡 تذكر:\nLow = Far (بعيد)\nHigh = Close (قريب)'},

    {front:'ما هي المعاملات الثلاثة الرئيسية في SVM؟', back:'🔧 Three Main Parameters:\n\n1️⃣ C (Regularization)\n→ التسامح مع أخطاء التصنيف\n→ عالي = دقة أكثر + خطر Overfitting\n→ منخفض = هامش أعرض + تعميم أفضل\n\n2️⃣ Kernel (نوع التحويل)\n→ Linear: فصل خطي\n→ Polynomial: فصل غير خطي\n→ RBF: فصل شعاعي\n\n3️⃣ Gamma (مدى التأثير)\n→ Low: نقاط بعيدة تؤثر\n→ High: نقاط قريبة فقط'},

    {front:'كيف يتعامل SVM مع البيانات المتداخلة؟', back:'عند تداخل البيانات (Overlapping):\n\n1️⃣ مشكلة:\n→ لا يمكن فصل البيانات بخط مستقيم\n→ هناك Outliers في كل فئة\n\n2️⃣ الحلول:\n→ استخدام Kernel Trick لرفع البُعد\n→ ضبط C للتسامح مع الأخطاء\n→ ضبط Gamma لتحديد تأثير النقاط\n\n3️⃣ النتيجة:\n→ منحنى قرار غير خطي\n→ فصل أفضل للبيانات المعقدة'},

    {front:'SVM vs Naive Bayes - ما الفرق؟', back:'📐 SVM:\n→ يبحث عن Hyperplane يفصل الفئات\n→ يعتمد على الهندسة (المسافات والزوايا)\n→ ممتاز لبيانات صغيرة/متوسطة\n→ يتعامل مع High-Dimensional Data\n\n📊 Naive Bayes:\n→ يحسب احتمالات كل فئة\n→ يعتمد على نظرية بايز\n→ سريع جداً وبسيط\n→ ممتاز لتصنيف النصوص\n\n🎯 الاختيار يعتمد على نوع البيانات!'},

    {front:'ما هو تقسيم Training/Testing؟', back:'📊 تقسيم البيانات:\n\n📚 Training Set = 70%\n→ البيانات اللي يتعلم منها الموديل\n→ يرسم الـ Hyperplane بناءً عليها\n\n🧪 Testing Set = 30%\n→ البيانات اللي نختبر بيها الموديل\n→ نقيس الدقة (Accuracy) عليها\n→ ما يشوفها أثناء التدريب!\n\n⚠️ مهم: لازم التقسيم يكون عشوائي\nحتى ما يكون فيه تحيز'}
];

// Register Chapter 3
App.registerChapter('ch3', {
    label: 'Ch 3',
    overviewSection: 'ch3-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch3-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch3-intro', icon: '🎯', label: 'مقدمة SVM'},
        {id: 'ch3-hyperplane', icon: '📏', label: 'Hyperplane والهامش'},
        {id: 'ch3-kernel', icon: '🔄', label: 'Kernel والتحويل'},
        {id: 'ch3-regularization', icon: '⚖️', label: 'Regularization (C)'},
        {id: 'ch3-gamma', icon: '📡', label: 'Gamma'},
        {id: 'ch3-examples', icon: '🧪', label: 'أمثلة عملية'},
        {id: 'ch3-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch3-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch3-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData3,
    flashcardData: flashcardData3
});
