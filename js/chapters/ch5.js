/* CH5.JS - Chapter 5: Linear Regression with One Variable */

const quizData5 = [
    // ===== Introduction (سهل) =====
    {id:1, section:'ch5-intro', type:'mcq', difficulty:'easy',
     question:'Linear Regression is a method to:',
     options:['Classify data into categories','Predict a target by fitting the best linear relationship','Cluster similar data points','Build decision trees'],
     correct:1,
     explanation:'Linear Regression = طريقة للتنبؤ بمتغير مستهدف عن طريق إيجاد أفضل علاقة خطية بين المتغير المستقل والتابع بأقل خطأ ممكن.'},

    {id:2, section:'ch5-intro', type:'mcq', difficulty:'easy',
     question:'Linear Regression is a type of:',
     options:['Unsupervised Learning','Supervised Learning','Reinforcement Learning','Semi-supervised Learning'],
     correct:1,
     explanation:'Linear Regression = Supervised Learning لأن لدينا "right answers" أو "labeled data" — نعرف القيم الصحيحة مسبقاً ونتدرب عليها.'},

    {id:3, section:'ch5-intro', type:'mcq', difficulty:'easy',
     question:'Linear Regression predicts:',
     options:['Discrete categories (Yes/No)','Continuous valued output (like price)','Clusters of data','Binary labels'],
     correct:1,
     explanation:'Linear Regression يتنبأ بقيم مستمرة (Continuous) مثل: سعر المنزل، درجة الطالب، إيرادات يومية — وليس فئات منفصلة.'},

    {id:4, section:'ch5-intro', type:'mcq', difficulty:'easy',
     question:'The goal of Linear Regression is to find:',
     options:['The maximum entropy','The best fitting straight line through the data','The deepest decision tree','The nearest neighbor'],
     correct:1,
     explanation:'هدف Linear Regression = إيجاد أفضل خط مستقيم يمر عبر البيانات — بحيث يكون الفرق بين القيم الفعلية والمتوقعة أقل ما يمكن.'},

    {id:5, section:'ch5-intro', type:'mcq', difficulty:'easy',
     question:'An example of Linear Regression use case is:',
     options:['Classifying emails as spam','Predicting student grades based on study hours','Clustering customers','Detecting anomalies'],
     correct:1,
     explanation:'مثال: توقع درجات الطلاب بناءً على ساعات المذاكرة. كلما زادت ساعات المذاكرة → توقع درجة أعلى. هذه علاقة خطية!'},

    // ===== Types of Regression (سهل/متوسط) =====
    {id:6, section:'ch5-types', type:'mcq', difficulty:'easy',
     question:'Simple Linear Regression uses:',
     options:['Multiple independent variables','One independent variable and one dependent variable','No variables','Only categorical variables'],
     correct:1,
     explanation:'Simple Linear Regression = متغير مستقل واحد (X) ومتغير تابع واحد (Y).\nمثال: ساعات المذاكرة (X) → الدرجة (Y)'},

    {id:7, section:'ch5-types', type:'mcq', difficulty:'easy',
     question:'Multiple Linear Regression uses:',
     options:['One independent variable','Multiple independent variables','No dependent variable','Only one data point'],
     correct:1,
     explanation:'Multiple Linear Regression = عدة متغيرات مستقلة (X₁, X₂, X₃...) ومتغير تابع واحد (Y).\nمثال: مساحة المنزل + عدد الغرف + الموقع → السعر'},

    {id:8, section:'ch5-types', type:'mcq', difficulty:'medium',
     question:'Which of these is NOT a type of regression relationship?',
     options:['Positive Linear','Negative Linear','No Relationship','Circular Relationship'],
     correct:3,
     explanation:'أنواع العلاقات في Regression:\n• Positive Linear: Y تزيد مع X ↗️\n• Negative Linear: Y تقل مع X ↘️\n• No Relationship: لا علاقة\n• NOT Linear: العلاقة غير خطية\n\nلا يوجد شيء اسمه Circular Relationship.'},

    // ===== Model Representation (متوسط) =====
    {id:9, section:'ch5-model', type:'mcq', difficulty:'medium',
     question:'In Linear Regression, the hypothesis function h maps:',
     options:['Y values to X values','X values to predicted Y values','Features to classes','Errors to outputs'],
     correct:1,
     explanation:'دالة الفرضية h تأخذ قيمة X وتعطي القيمة المتوقعة لـ Y:\nh(x) = θ₀ + θ₁x\n\nتحول المدخلات (X) إلى تنبؤات (Ŷ).'},

    {id:10, section:'ch5-model', type:'mcq', difficulty:'medium',
     question:'The equation h(x) = θ₀ + θ₁x represents:',
     options:['A decision tree','A linear hypothesis function','An entropy formula','A kernel function'],
     correct:1,
     explanation:'h(x) = θ₀ + θ₁x هي دالة الفرضية الخطية:\n• θ₀ = Y-intercept (نقطة التقاطع مع Y)\n• θ₁ = Slope (الميل / معدل التغير)\n• x = المتغير المستقل (المدخل)'},

    {id:11, section:'ch5-model', type:'mcq', difficulty:'medium',
     question:'In the equation h(x) = θ₀ + θ₁x, what is θ₀?',
     options:['The slope','The Y-intercept','The input variable','The error'],
     correct:1,
     explanation:'θ₀ = Y-intercept (نقطة التقاطع مع محور Y)\n= القيمة المتوقعة لـ Y عندما X = 0\n= النقطة التي يقطع فيها الخط محور Y'},

    {id:12, section:'ch5-model', type:'mcq', difficulty:'medium',
     question:'In the equation h(x) = θ₀ + θ₁x, what is θ₁?',
     options:['The Y-intercept','The slope (rate of change)','The prediction','The cost'],
     correct:1,
     explanation:'θ₁ = Slope (الميل / معدل التغير)\n= كم تتغير Y عندما X تزيد بمقدار 1\n= ΔY / ΔX\n\nمثال: إذا θ₁ = 2 → لكل ساعة مذاكرة إضافية، الدرجة تزيد 2'},

    {id:13, section:'ch5-model', type:'mcq', difficulty:'medium',
     question:'(x⁽ⁱ⁾, y⁽ⁱ⁾) refers to:',
     options:['The i-th power of x and y','The i-th training example','The x and y intercepts','The error values'],
     correct:1,
     explanation:'(x⁽ⁱ⁾, y⁽ⁱ⁾) = مثال التدريب رقم i (الصف رقم i في البيانات)\n\nمثلاً: (x⁽¹⁾, y⁽¹⁾) = أول مثال تدريب\n= سطر واحد (one row) في جدول البيانات'},

    {id:14, section:'ch5-model', type:'mcq', difficulty:'easy',
     question:'In a training set, "m" represents:',
     options:['The slope','The number of training examples','The error','The intercept'],
     correct:1,
     explanation:'m = عدد أمثلة التدريب (عدد الصفوف في البيانات)\n\nمثال: إذا عندنا 500 صف بيانات → m = 500'},

    // ===== Slope & Intercept (متوسط) =====
    {id:15, section:'ch5-slope', type:'mcq', difficulty:'medium',
     question:'If the slope (θ₁) is positive, this indicates:',
     options:['Negative relationship','No relationship','Positive relationship: Y increases as X increases','The line is horizontal'],
     correct:2,
     explanation:'الميل الموجب = علاقة طردية (إيجابية)!\nكلما زاد X → زاد Y ↗️\n\nمثال: كلما زادت ساعات المذاكرة → زادت الدرجة'},

    {id:16, section:'ch5-slope', type:'mcq', difficulty:'medium',
     question:'If the slope (θ₁) is negative, this means:',
     options:['Y increases as X increases','Y decreases as X increases','No relationship','The model failed'],
     correct:1,
     explanation:'الميل السالب = علاقة عكسية (سلبية)!\nكلما زاد X → قل Y ↘️\n\nمثال: كلما زادت سرعة السيارة → قل الوقت المطلوب'},

    {id:17, section:'ch5-slope', type:'mcq', difficulty:'medium',
     question:'Changing the intercept (θ₀) while keeping the slope (θ₁) the same will:',
     options:['Rotate the line','Move the line up or down (parallel shift)','Change the angle of the line','Have no effect'],
     correct:1,
     explanation:'تغيير θ₀ (الـ Intercept) مع ثبات θ₁:\n→ الخط يتحرك لأعلى أو لأسفل بشكل موازي\n→ الميل (الزاوية) لا يتغير\n→ فقط نقطة التقاطع مع Y تتغير'},

    {id:18, section:'ch5-slope', type:'mcq', difficulty:'medium',
     question:'Changing the slope (θ₁) will:',
     options:['Move the line parallel','Rotate the line (change its angle)','Only change the intercept','Delete the line'],
     correct:1,
     explanation:'تغيير θ₁ (الميل):\n→ الخط يدور حول نقطة (يتغير ميله / زاويته)\n→ خط أكثر انحداراً أو أقل\n→ Intercept قد يتغير أيضاً'},

    // ===== Cost Function (صعب) =====
    {id:19, section:'ch5-cost', type:'mcq', difficulty:'hard',
     question:'The Cost Function in Linear Regression measures:',
     options:['The number of features','The difference between predicted and actual values','The number of training examples','The slope of the line'],
     correct:1,
     explanation:'Cost Function = دالة التكلفة\n→ تقيس الفرق بين القيم المتوقعة (predicted) والقيم الفعلية (actual)\n→ كلما كانت التكلفة أقل = الخط أفضل!'},

    {id:20, section:'ch5-cost', type:'mcq', difficulty:'hard',
     question:'Least Squares means:',
     options:['Finding the maximum error','Minimizing the sum of squared differences between actual and predicted values','Maximizing the slope','Finding the median'],
     correct:1,
     explanation:'Least Squares (المربعات الصغرى):\n→ "Best Fit" = الفرق بين القيم الفعلية والمتوقعة يكون أقل ما يمكن\n→ نربع الأخطاء ونجمعها → نقلل هذا المجموع\n→ SSE = Σ(Yᵢ - h(xᵢ))²'},

    {id:21, section:'ch5-cost', type:'mcq', difficulty:'hard',
     question:'SSE stands for:',
     options:['Sum of Simple Errors','Sum of Squared Errors','Standard Statistical Error','Sum of Slope Estimates'],
     correct:1,
     explanation:'SSE = Sum of Squared Errors (مجموع مربعات الأخطاء)\nSSE = Σ(Yᵢ - Ŷᵢ)²\n\nهو المقياس الأساسي لجودة خط الانحدار. كلما كان أصغر = الخط أفضل.'},

    {id:22, section:'ch5-cost', type:'mcq', difficulty:'hard',
     question:'The purpose of the Cost Function is to help us:',
     options:['Choose the best θ₀ and θ₁ values','Count the training examples','Remove outliers','Increase the data size'],
     correct:0,
     explanation:'هدف Cost Function = مساعدتنا في اختيار أفضل قيم لـ θ₀ و θ₁\n→ نجرب قيم مختلفة\n→ نحسب التكلفة لكل مجموعة\n→ نختار القيم اللي تعطي أقل تكلفة = أفضل خط!'},

    {id:23, section:'ch5-cost', type:'mcq', difficulty:'hard',
     question:'The error (ε) in linear regression represents:',
     options:['The slope','The difference between actual and predicted value','The intercept','The number of variables'],
     correct:1,
     explanation:'ε (إبسلون) = الخطأ\n= الفرق بين القيمة الفعلية والقيمة المتوقعة\n= Yactual - Ypredicted\n\nلا يوجد نموذج مثالي بدون خطأ! الهدف: تقليل هذا الخطأ.'},

    // ===== Practical Example (متوسط) =====
    {id:24, section:'ch5-example', type:'mcq', difficulty:'medium',
     question:'In the Ice Cream Revenue example, the independent variable (X) is:',
     options:['Daily revenue','Outside air temperature','Number of customers','Ice cream flavor'],
     correct:1,
     explanation:'المتغير المستقل X = درجة الحرارة الخارجية\nالمتغير التابع Y = الإيرادات اليومية\n\nنريد التنبؤ: إذا الحرارة كذا → الإيرادات تكون كذا'},

    {id:25, section:'ch5-example', type:'mcq', difficulty:'medium',
     question:'In the Ice Cream example, why is Linear Regression a good choice?',
     options:['The data is categorical','The relationship between temperature and revenue appears linear','There are many classes to predict','The data has no pattern'],
     correct:1,
     explanation:'من الرسم البياني (Scatter Plot) نلاحظ:\n→ العلاقة بين الحرارة والإيرادات تبدو خطية (طردية)\n→ كلما زادت الحرارة → زادت مبيعات الآيسكريم\n→ لذا Linear Regression مناسب!'},

    // ===== Scatter Plot (متوسط) =====
    {id:26, section:'ch5-scatter', type:'mcq', difficulty:'medium',
     question:'A Scatter Plot is:',
     options:['A bar chart','A plot of all (Xi, Yi) pairs that suggests how well the model will fit','A pie chart','A histogram'],
     correct:1,
     explanation:'Scatter Plot (مخطط انتشار/تبعثر):\n→ رسم كل أزواج (Xi, Yi) كنقاط على المستوى\n→ يساعدنا نشوف شكل العلاقة بين X و Y\n→ يوضح هل Linear Regression مناسب ولا لا'},

    {id:27, section:'ch5-scatter', type:'mcq', difficulty:'medium',
     question:'Before fitting a model, you should first:',
     options:['Calculate the cost function','Plot a scatter plot to visualize the relationship','Choose random θ values','Remove all data'],
     correct:1,
     explanation:'الخطوة الأولى دائماً = رسم Scatter Plot!\n→ يساعد نشوف هل في علاقة؟\n→ هل العلاقة خطية أو غير خطية؟\n→ هل في Outliers؟\n→ بناءً على ذلك نختار النموذج المناسب'},

    // ===== True/False =====
    {id:28, section:'ch5-intro', type:'mcq', difficulty:'easy',
     question:'True or False: Linear Regression can only predict discrete values.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ Linear Regression يتنبأ بقيم مستمرة (Continuous) مثل: سعر، درجة، إيرادات — وليس قيم منفصلة (Discrete).'},

    {id:29, section:'ch5-slope', type:'mcq', difficulty:'medium',
     question:'True or False: A slope of 0 means there is no linear relationship between X and Y.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ إذا الميل θ₁ = 0 → الخط أفقي → تغير X لا يؤثر على Y → لا توجد علاقة خطية بين المتغيرين.'},

    {id:30, section:'ch5-cost', type:'mcq', difficulty:'hard',
     question:'True or False: The goal is to maximize the Cost Function.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ الهدف هو تقليل (Minimize) Cost Function!\nCost أقل = فرق أقل بين التوقعات والقيم الفعلية = نموذج أفضل.'},

    // ===== Essay =====
    {id:31, section:'ch5-model', type:'essay', difficulty:'hard',
     question:'Explain the hypothesis function h(x) = θ₀ + θ₁x. What do θ₀ and θ₁ represent? How does changing each affect the line?',
     answer:'دالة الفرضية: h(x) = θ₀ + θ₁x\n\nθ₀ = Y-intercept (نقطة التقاطع مع محور Y):\n→ القيمة المتوقعة لـ Y عندما X = 0\n→ تغيير θ₀ = تحريك الخط لأعلى/أسفل بشكل موازي\n→ الميل لا يتغير\n\nθ₁ = Slope (الميل / معدل التغير):\n→ ΔY / ΔX — كم تتغير Y لكل وحدة تغير في X\n→ θ₁ > 0 = علاقة طردية (إيجابية)\n→ θ₁ < 0 = علاقة عكسية (سلبية)\n→ θ₁ = 0 = لا علاقة (خط أفقي)\n→ تغيير θ₁ = دوران الخط (تغيير الزاوية)\n\nالهدف: اختيار أفضل θ₀ و θ₁ بحيث التكلفة (SSE) تكون أقل ما يمكن.'},

    {id:32, section:'ch5-cost', type:'essay', difficulty:'hard',
     question:'What is the Cost Function and Least Squares method? Why do we square the errors?',
     answer:'Cost Function (دالة التكلفة):\n→ تقيس جودة الخط بحساب الفرق بين القيم المتوقعة والفعلية\n→ الهدف: تقليلها (Minimize)\n\nLeast Squares (المربعات الصغرى):\n→ SSE = Σ(Yᵢ - h(xᵢ))²\n→ نحسب الخطأ لكل نقطة = (القيمة الفعلية - المتوقعة)\n→ نربع الأخطاء\n→ نجمعها\n→ نختار θ₀ و θ₁ اللي تعطي أقل مجموع\n\nلماذا نربع الأخطاء؟\n1. إلغاء الأخطاء السالبة (بدون التربيع تلغي بعضها)\n2. تكبير الأخطاء الكبيرة (معاقبة الأخطاء الكبيرة أكثر)\n3. التربيع يجعل الدالة قابلة للاشتقاق (مهم للتحسين)'}
];

const flashcardData5 = [
    {front:'ما هو Linear Regression؟', back:'Linear Regression = الانحدار الخطي\n\n📌 التعريف:\nطريقة للتنبؤ بمتغير مستهدف عن طريق\nإيجاد أفضل علاقة خطية بأقل خطأ\n\n📊 النوع: Supervised Learning\n→ لدينا "labeled data"\n→ يتنبأ بقيم مستمرة (Continuous)\n\n🎯 مثال:\nساعات المذاكرة → توقع الدرجة\nالحرارة → توقع مبيعات الآيسكريم'},

    {front:'ما هي أنواع Linear Regression؟', back:'📊 نوعان:\n\n1️⃣ Simple Linear Regression:\n→ متغير مستقل واحد (X) + تابع واحد (Y)\n→ h(x) = θ₀ + θ₁x\n→ مثال: ساعات مذاكرة → درجة\n\n2️⃣ Multiple Linear Regression:\n→ عدة متغيرات مستقلة (X₁, X₂...)\n→ h(x) = θ₀ + θ₁x₁ + θ₂x₂ + ...\n→ مثال: مساحة + غرف + موقع → سعر'},

    {front:'ما هي دالة الفرضية h(x)؟', back:'📐 h(x) = θ₀ + θ₁x\n\n→ تأخذ X وتعطي القيمة المتوقعة لـ Y\n→ تحول المدخلات إلى تنبؤات\n\nθ₀ = Y-intercept:\n→ نقطة التقاطع مع محور Y\n→ قيمة Y عندما X = 0\n\nθ₁ = Slope (الميل):\n→ معدل التغير = ΔY / ΔX\n→ كم تتغير Y لكل وحدة X\n\n🎯 الهدف: إيجاد أفضل θ₀ و θ₁'},

    {front:'ما هو Slope و Intercept؟', back:'📈 Slope (θ₁) = الميل:\n→ ΔY / ΔX (معدل التغير)\n→ θ₁ > 0 = علاقة طردية ↗️\n→ θ₁ < 0 = علاقة عكسية ↘️\n→ θ₁ = 0 = لا علاقة (أفقي) ➡️\n→ تغييره = دوران الخط\n\n📍 Intercept (θ₀):\n→ نقطة تقاطع الخط مع محور Y\n→ قيمة Y عندما X = 0\n→ تغييره = تحريك الخط ↕️ (موازي)'},

    {front:'أنواع العلاقات في Regression', back:'📊 4 أنواع:\n\n1️⃣ Positive Linear ↗️\n→ X يزيد + Y يزيد\n→ مثال: ساعات مذاكرة → درجة\n\n2️⃣ Negative Linear ↘️\n→ X يزيد + Y يقل\n→ مثال: سرعة → وقت الوصول\n\n3️⃣ No Relationship ➡️\n→ لا علاقة بين X و Y\n→ الخط أفقي (θ₁ = 0)\n\n4️⃣ NOT Linear 〰️\n→ العلاقة موجودة لكن غير خطية'},

    {front:'ما هي Cost Function؟', back:'📉 Cost Function = دالة التكلفة\n\n📌 تقيس:\nالفرق بين القيم المتوقعة والفعلية\n\n🎯 الهدف:\nتقليلها (Minimize) = نموذج أفضل!\n\n📐 طريقة Least Squares:\nSSE = Σ(Yᵢ - h(xᵢ))²\n\n1. احسب الخطأ لكل نقطة\n2. ربّع الخطأ\n3. اجمع كل المربعات\n4. اختر θ₀ و θ₁ بأقل مجموع'},

    {front:'لماذا نربّع الأخطاء (SSE)؟', back:'🤔 لماذا التربيع؟\n\n1️⃣ إلغاء السالب:\n→ بدون تربيع: +3 و -3 يلغيان بعض = 0\n→ بالتربيع: 9 + 9 = 18 ✅\n\n2️⃣ معاقبة الأخطاء الكبيرة:\n→ خطأ 2 → 4\n→ خطأ 10 → 100 ❗\n→ الأخطاء الكبيرة تُعاقب أكثر\n\n3️⃣ قابلية الاشتقاق:\n→ التربيع يجعل الدالة سلسة\n→ مهم لخوارزميات التحسين'},

    {front:'ما هو Training Set؟', back:'📚 Training Set = مجموعة التدريب\n\n📊 المكونات:\n→ m = عدد أمثلة التدريب (الصفوف)\n→ (x⁽ⁱ⁾, y⁽ⁱ⁾) = المثال التدريبي رقم i\n→ x = المتغير المستقل (Input)\n→ y = المتغير التابع (Output)\n\n🔄 العملية:\nTraining Set → Learning Algorithm → h\n→ h تأخذ x جديد\n→ تعطي تنبؤ ŷ'},

    {front:'ما هو Scatter Plot؟', back:'📊 Scatter Plot = مخطط التبعثر\n\n📌 ماذا يعرض؟\n→ رسم كل أزواج (Xᵢ, Yᵢ) كنقاط\n→ يوضح شكل العلاقة بصرياً\n\n🎯 يساعد في:\n→ معرفة نوع العلاقة (خطية/غير خطية)\n→ اكتشاف Outliers\n→ تقييم هل النموذج مناسب\n\n⚡ دائماً الخطوة الأولى:\nارسم Scatter Plot قبل بناء النموذج!'},

    {front:'مثال: Ice Cream Revenue', back:'🍦 توقع إيرادات الآيسكريم:\n\n📊 البيانات:\n→ X = درجة الحرارة الخارجية (°C)\n→ Y = الإيرادات اليومية ($)\n→ 500+ عينة بيانات\n\n📈 من الرسم:\n→ العلاقة تبدو خطية (طردية)\n→ حرارة أعلى = مبيعات أكثر\n→ Linear Regression مناسب! ✅\n\n🎯 الهدف:\nبناء نموذج يتنبأ بالإيرادات\nبناءً على الحرارة المتوقعة'}
];

// Register Chapter 5
App.registerChapter('ch5', {
    label: 'Ch 5',
    overviewSection: 'ch5-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch5-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch5-intro', icon: '📈', label: 'مقدمة Linear Regression'},
        {id: 'ch5-types', icon: '🔀', label: 'أنواع الانحدار'},
        {id: 'ch5-model', icon: '🧮', label: 'تمثيل النموذج'},
        {id: 'ch5-slope', icon: '📐', label: 'Slope و Intercept'},
        {id: 'ch5-cost', icon: '📉', label: 'Cost Function'},
        {id: 'ch5-example', icon: '🍦', label: 'مثال عملي'},
        {id: 'ch5-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch5-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch5-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData5,
    flashcardData: flashcardData5
});
