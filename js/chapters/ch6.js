/* CH6.JS - Chapter 6: Linear Regression (Part 2) - Cost Function & Gradient Descent */

const quizData6 = [
    // ===== Cost Function Review (سهل) =====
    {id:1, section:'ch6-cost', type:'mcq', difficulty:'easy',
     question:'Cost Function is a function that measures:',
     options:['The number of features','The performance of a Machine Learning model for given data','The number of training examples','The speed of training'],
     correct:1,
     explanation:'Cost Function = دالة تقيس أداء نموذج تعلم الآلة لبيانات معينة.\nتحسب الخطأ بين القيم المتوقعة والفعلية وتقدمه كرقم واحد.'},

    {id:2, section:'ch6-cost', type:'mcq', difficulty:'easy',
     question:'Cost Function calculates the error between:',
     options:['Features and labels','Predicted values and expected values','Training and testing data','Input and output variables'],
     correct:1,
     explanation:'Cost Function = حساب الخطأ بين القيم المتوقعة (predicted) والقيم المتوقعة الفعلية (expected) وتقديمه كرقم حقيقي واحد.'},

    {id:3, section:'ch6-cost', type:'mcq', difficulty:'easy',
     question:'The goal of training is to:',
     options:['Maximize the Cost Function','Minimize the Cost Function','Keep Cost Function constant','Ignore the Cost Function'],
     correct:1,
     explanation:'هدف التدريب = تقليل (Minimize) دالة التكلفة!\nCost أقل = فرق أقل بين التوقعات والقيم الفعلية = نموذج أفضل.'},

    {id:4, section:'ch6-cost', type:'mcq', difficulty:'easy',
     question:'In the equation y = b₀ + b₁*x₁, what is b₀?',
     options:['Coefficient','Constant (Y-intercept)','Independent variable','Error term'],
     correct:1,
     explanation:'b₀ = الثابت (Constant) = Y-intercept\n= نقطة التقاطع مع محور Y\n= القيمة المتوقعة لـ Y عندما كل المتغيرات المستقلة = 0'},

    {id:5, section:'ch6-cost', type:'mcq', difficulty:'easy',
     question:'In the equation y = b₀ + b₁*x₁, what is b₁?',
     options:['Y-intercept','Coefficient (slope)','Dependent variable','Error'],
     correct:1,
     explanation:'b₁ = المعامل (Coefficient) = الميل (Slope)\n= كم تتغير y لكل وحدة تغير في x₁\n= يحدد قوة واتجاه العلاقة'},

    // ===== General Equation (متوسط) =====
    {id:6, section:'ch6-equation', type:'mcq', difficulty:'medium',
     question:'The general linear regression equation is: yᵢ = β₀ + β₁xᵢ₁ + β₂xᵢ₂ + ... + βₚxᵢₚ + ε. What does ε represent?',
     options:['The slope','The intercept','The model\'s error term (residuals)','The number of variables'],
     correct:2,
     explanation:'ε (إبسلون) = حد الخطأ في النموذج (Error Term)\n= يُعرف أيضاً بـ Residuals (البواقي)\n= الفرق بين القيمة الفعلية والمتوقعة\n= لا يوجد نموذج مثالي بدون خطأ!'},

    {id:7, section:'ch6-equation', type:'mcq', difficulty:'medium',
     question:'In the general equation, β₀ is:',
     options:['Slope coefficient','Y-intercept (constant term)','Error term','Independent variable'],
     correct:1,
     explanation:'β₀ = Y-intercept (الحد الثابت)\n= القيمة المتوقعة لـ y عندما كل المتغيرات المستقلة (x) = 0\n= نقطة التقاطع مع محور Y'},

    {id:8, section:'ch6-equation', type:'mcq', difficulty:'medium',
     question:'In the general equation, βₚ represents:',
     options:['The error term','The constant','The slope coefficients for each explanatory variable','The dependent variable'],
     correct:2,
     explanation:'βₚ = معاملات الميل لكل متغير تفسيري\n= كل β يحدد مقدار تأثير المتغير المقابل على y\n= β₁ لـ x₁, β₂ لـ x₂, ... βₚ لـ xₚ'},

    {id:9, section:'ch6-equation', type:'mcq', difficulty:'medium',
     question:'In the equation, xᵢ represents:',
     options:['Dependent variable','Explanatory (independent) variables','Error term','Coefficients'],
     correct:1,
     explanation:'xᵢ = المتغيرات التفسيرية (Explanatory Variables)\n= المتغيرات المستقلة (Independent Variables)\n= المدخلات اللي نستخدمها للتنبؤ بـ y'},

    {id:10, section:'ch6-equation', type:'mcq', difficulty:'medium',
     question:'yᵢ in the equation represents:',
     options:['Independent variable','Explanatory variable','Dependent variable','Coefficient'],
     correct:2,
     explanation:'yᵢ = المتغير التابع (Dependent Variable)\n= المخرج اللي نريد التنبؤ به\n= يعتمد على قيم المتغيرات المستقلة x'},

    // ===== Gradient Descent (متوسط-صعب) =====
    {id:11, section:'ch6-gd', type:'mcq', difficulty:'medium',
     question:'Gradient Descent is an algorithm that:',
     options:['Maximizes the cost function','Iteratively moves towards values that minimise the loss function','Randomly selects parameters','Increases the error'],
     correct:1,
     explanation:'Gradient Descent = خوارزمية تتحرك تكرارياً نحو مجموعة القيم اللي تقلل دالة الخسارة (Loss Function).\n\nتبدأ بقيم عشوائية → تعدلها تدريجياً → حتى تصل للأقل تكلفة.'},

    {id:12, section:'ch6-gd', type:'mcq', difficulty:'medium',
     question:'Gradient Descent works by:',
     options:['Randomly guessing parameters','Following the slope of the cost function downhill','Trying all possible parameter combinations','Using decision trees'],
     correct:1,
     explanation:'Gradient Descent يتبع ميل (slope) دالة التكلفة نحو الأسفل!\n\nتخيل كرة على تل → تتدحرج للأسفل → تتوقف في أدنى نقطة.\nالكرة = النموذج | أدنى نقطة = أقل تكلفة (أفضل θ)'},

    {id:13, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'The Learning Rate (α) in Gradient Descent controls:',
     options:['The number of features','The size of each step towards the minimum','The number of training examples','The type of regression'],
     correct:1,
     explanation:'Learning Rate (α) = معدل التعلم\n= حجم الخطوة في كل تكرار\n\n→ α كبير = خطوات كبيرة (أسرع لكن قد يتخطى الحد الأدنى)\n→ α صغير = خطوات صغيرة (أبطأ لكن أدق)\n→ يجب اختيار α مناسب!'},

    {id:14, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'If the learning rate is too large:',
     options:['The algorithm converges faster','The algorithm may overshoot the minimum and diverge','The algorithm becomes more accurate','Nothing changes'],
     correct:1,
     explanation:'α كبير جداً:\n→ الخطوات كبيرة جداً\n→ قد يتخطى الحد الأدنى (overshoot)\n→ قد يتباعد (diverge) بدل ما يتقارب\n→ النموذج لا يتعلم!\n\nمثل: تقفز فوق الوادي بدل ما تنزل فيه!'},

    {id:15, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'If the learning rate is too small:',
     options:['The algorithm diverges','The algorithm converges very slowly','The algorithm fails completely','The error increases'],
     correct:1,
     explanation:'α صغير جداً:\n→ خطوات صغيرة جداً\n→ التقارب بطيء جداً (slow convergence)\n→ يحتاج تكرارات كثيرة جداً\n→ وقت تدريب طويل\n\nمثل: تمشي خطوات صغيرة جداً = توصل لكن بعد وقت طويل!'},

    {id:16, section:'ch6-gd', type:'mcq', difficulty:'medium',
     question:'Gradient Descent updates parameters:',
     options:['Once only','Iteratively until convergence','Randomly','Never'],
     correct:1,
     explanation:'Gradient Descent يحدّث المعاملات تكرارياً (Iteratively) حتى يتقارب (Converge):\n\n1. ابدأ بقيم عشوائية لـ θ\n2. احسب التكلفة (Cost)\n3. احسب الـ Gradient (اتجاه الانحدار)\n4. عدّل θ في اتجاه أقل تكلفة\n5. كرر حتى التكلفة لا تتغير كثيراً'},

    {id:17, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'The gradient (derivative) tells us:',
     options:['The value of the cost','The direction the cost is increasing','The number of iterations needed','The learning rate'],
     correct:1,
     explanation:'Gradient (المشتقة/التدرج) = اتجاه زيادة التكلفة\n\n→ نمشي عكس اتجاه التدرج = نتحرك نحو أقل تكلفة\n→ لهذا اسمه Gradient DESCENT (نزول التدرج)\n→ ننزل عكس اتجاه الصعود!'},

    {id:18, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'Convergence in Gradient Descent means:',
     options:['The error is increasing','The parameters have reached values that minimize the cost function','The algorithm has failed','The learning rate is zero'],
     correct:1,
     explanation:'Convergence (التقارب) = المعاملات وصلت لقيم تقلل التكلفة:\n→ التكلفة لا تتغير كثيراً بين التكرارات\n→ الـ Gradient قريب من الصفر\n→ وصلنا لـ \"أدنى نقطة\" في دالة التكلفة\n→ النموذج جاهز!'},

    // ===== Cost Function Details (صعب) =====
    {id:19, section:'ch6-cost', type:'mcq', difficulty:'hard',
     question:'The Cost Function presents the error as:',
     options:['A vector','A matrix','A single real number','A probability'],
     correct:2,
     explanation:'Cost Function تقدم الخطأ كـ رقم حقيقي واحد (single real number):\n→ رقم واحد يلخص أداء النموذج بالكامل\n→ أقل = أفضل\n→ يسهل المقارنة بين نماذج مختلفة'},

    {id:20, section:'ch6-equation', type:'mcq', difficulty:'hard',
     question:'Residuals are:',
     options:['The coefficients','The differences between actual and predicted values','The independent variables','The constants'],
     correct:1,
     explanation:'Residuals (البواقي) = ε = الفرق بين القيم الفعلية والمتوقعة\n\nResidual = yactual - ypredicted\n\n→ البواقي الصغيرة = نموذج جيد\n→ البواقي الكبيرة = نموذج سيئ'},

    // ===== Practical & Conceptual (متوسط) =====
    {id:21, section:'ch6-gd', type:'mcq', difficulty:'medium',
     question:'Which analogy best describes Gradient Descent?',
     options:['Climbing a mountain','A ball rolling downhill to the lowest point','Swimming across a river','Flying in the sky'],
     correct:1,
     explanation:'أفضل تشبيه: كرة تتدحرج لأسفل تل! ⬇️🏔️\n\n→ الكرة = النموذج (المعاملات θ)\n→ التل = دالة التكلفة\n→ أدنى نقطة = أقل تكلفة (أفضل معاملات)\n→ الجاذبية = الـ Gradient (اتجاه النزول)'},

    {id:22, section:'ch6-gd', type:'mcq', difficulty:'medium',
     question:'In Gradient Descent, we start with:',
     options:['Optimal parameters','Random initial parameter values','Zero parameters always','Maximum cost'],
     correct:1,
     explanation:'نبدأ بقيم عشوائية أولية للمعاملات (Random initialization):\n→ لا نعرف القيم المثالية مسبقاً\n→ نبدأ بأي نقطة\n→ الخوارزمية تعدل تدريجياً حتى تصل للأفضل'},

    {id:23, section:'ch6-cost', type:'mcq', difficulty:'medium',
     question:'MSE (Mean Squared Error) is calculated by:',
     options:['Summing all errors','Averaging the squared errors','Taking the maximum error','Counting the errors'],
     correct:1,
     explanation:'MSE = Mean Squared Error (متوسط مربعات الأخطاء)\n\nMSE = (1/m) × Σ(yᵢ - ŷᵢ)²\n\n→ مشابه لـ SSE لكن مقسوم على m\n→ يعطي متوسط الخطأ لكل نقطة\n→ أسهل للمقارنة بين أحجام بيانات مختلفة'},

    {id:24, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'The update rule in Gradient Descent is: θ = θ - α × ∂J/∂θ. The minus sign means:',
     options:['We increase the cost','We move in the opposite direction of the gradient','We increase the learning rate','We add the error'],
     correct:1,
     explanation:'علامة السالب = نتحرك عكس اتجاه التدرج!\n\n→ الـ Gradient يشير لاتجاه زيادة التكلفة\n→ نريد تقليل التكلفة\n→ لذا نمشي بالاتجاه المعاكس (−)\n→ نطرح بدل ما نجمع'},

    // ===== True/False =====
    {id:25, section:'ch6-cost', type:'mcq', difficulty:'easy',
     question:'True or False: A perfect model has Cost Function = 0.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ إذا التنبؤات تطابق القيم الفعلية تماماً → الخطأ = 0 → التكلفة = 0.\n(عملياً نادر الحدوث، لكن نظرياً صحيح)'},

    {id:26, section:'ch6-gd', type:'mcq', difficulty:'medium',
     question:'True or False: Gradient Descent always finds the global minimum.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ ❌ في بعض الدوال المعقدة، قد يتوقف عند Local Minimum (حد أدنى محلي) بدل Global Minimum.\n\nلكن في Linear Regression، دالة التكلفة Convex (محدبة) → يوجد حد أدنى واحد فقط → Gradient Descent يجده دائماً ✅'},

    {id:27, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'True or False: In Linear Regression, the cost function is convex (has only one minimum).',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ في Linear Regression:\n→ دالة التكلفة (MSE/SSE) محدبة (Convex)\n→ شكلها مثل الوعاء (Bowl shape)\n→ يوجد حد أدنى واحد فقط (Global Minimum)\n→ Gradient Descent سيجده دائماً!'},

    // ===== Comparison & Synthesis =====
    {id:28, section:'ch6-equation', type:'mcq', difficulty:'medium',
     question:'The difference between Simple and Multiple LR in terms of the equation is:',
     options:['Simple has no intercept','Multiple has multiple β coefficients for multiple x variables','Simple has no error term','They are identical'],
     correct:1,
     explanation:'Simple: y = β₀ + β₁x₁ + ε (متغير مستقل واحد)\nMultiple: y = β₀ + β₁x₁ + β₂x₂ + ... + βₚxₚ + ε (عدة متغيرات)\n\n→ الفرق: عدد المعاملات β والمتغيرات x'},

    {id:29, section:'ch6-gd', type:'mcq', difficulty:'hard',
     question:'Which is the correct order of Gradient Descent steps?',
     options:['Calculate gradient → Initialize → Update → Repeat','Initialize parameters → Calculate cost → Calculate gradient → Update parameters → Repeat','Update → Initialize → Calculate → Stop','Calculate → Stop → Update → Initialize'],
     correct:1,
     explanation:'الترتيب الصحيح:\n1️⃣ Initialize: ابدأ بقيم عشوائية لـ θ\n2️⃣ Calculate Cost: احسب التكلفة J(θ)\n3️⃣ Calculate Gradient: احسب المشتقة ∂J/∂θ\n4️⃣ Update: θ = θ - α × ∂J/∂θ\n5️⃣ Repeat: كرر حتى التقارب'},

    // ===== Essay =====
    {id:30, section:'ch6-gd', type:'essay', difficulty:'hard',
     question:'Explain how Gradient Descent works to find the best parameters for Linear Regression. Include the role of learning rate.',
     answer:'Gradient Descent (النزول التدرجي):\n\nالفكرة: إيجاد أفضل θ₀ و θ₁ بتقليل Cost Function.\n\nالخطوات:\n1. ابدأ بقيم عشوائية لـ θ₀ و θ₁\n2. احسب التكلفة J(θ) = (1/2m) × Σ(h(xᵢ) - yᵢ)²\n3. احسب Gradient (المشتقة) = اتجاه زيادة التكلفة\n4. حدّث: θ = θ - α × ∂J/∂θ (امشِ عكس اتجاه الزيادة)\n5. كرر حتى التقارب (التكلفة لا تتغير)\n\nLearning Rate (α):\n→ حجم الخطوة في كل تكرار\n→ α كبير = خطوات كبيرة (أسرع لكن قد يتخطى الحد الأدنى)\n→ α صغير = خطوات صغيرة (أدق لكن أبطأ)\n→ يجب اختيار α متوازن\n\nفي Linear Regression: Cost Function محدبة (Convex)\n→ حد أدنى واحد فقط → GD يجده دائماً!'},

    {id:31, section:'ch6-cost', type:'essay', difficulty:'hard',
     question:'Explain the general linear regression equation yᵢ = β₀ + β₁xᵢ₁ + ... + βₚxᵢₚ + ε. Define each component.',
     answer:'المعادلة العامة للانحدار الخطي:\nyᵢ = β₀ + β₁xᵢ₁ + β₂xᵢ₂ + ... + βₚxᵢₚ + ε\n\nالمكونات:\n\nyᵢ = المتغير التابع (Dependent Variable)\n→ القيمة المراد التنبؤ بها\n\nxᵢ = المتغيرات التفسيرية/المستقلة (Explanatory Variables)\n→ المدخلات (Features)\n\nβ₀ = Y-intercept (الحد الثابت / Constant)\n→ قيمة y عندما كل المتغيرات = 0\n\nβₚ = معاملات الميل (Slope Coefficients)\n→ كل βⱼ يحدد تأثير xⱼ على y\n→ β₁ لأول متغير، β₂ لثاني متغير...\n\nε = حد الخطأ (Error Term / Residuals)\n→ الفرق بين القيمة الفعلية والمتوقعة\n→ لا يوجد نموذج مثالي بدون خطأ\n\ni = رقم الملاحظة (من 1 إلى n)\np = عدد المتغيرات المستقلة'},

    {id:32, section:'ch6-gd', type:'mcq', difficulty:'medium',
     question:'Gradient Descent is used to find:',
     options:['The best features','The optimal values of θ₀ and θ₁ that minimize cost','The number of training examples','The type of regression'],
     correct:1,
     explanation:'Gradient Descent يجد القيم المثلى لـ θ₀ و θ₁:\n→ اللي تعطي أقل تكلفة (أقل SSE/MSE)\n→ = أفضل خط مستقيم يلائم البيانات'}
];

const flashcardData6 = [
    {front:'ما هي Cost Function؟', back:'📉 Cost Function = دالة التكلفة\n\n📌 التعريف:\nدالة تقيس أداء نموذج ML لبيانات معينة\n\n📊 ماذا تفعل؟\n→ تحسب الخطأ بين predicted و expected\n→ تقدمه كرقم حقيقي واحد\n\n🎯 الهدف:\nتقليلها (Minimize) = نموذج أفضل!\n\nCost = 0 → نموذج مثالي (نادر)\nCost كبير → نموذج سيئ'},

    {front:'المعادلة العامة للانحدار الخطي', back:'📐 yᵢ = β₀ + β₁xᵢ₁ + ... + βₚxᵢₚ + ε\n\n📊 المكونات:\nyᵢ = المتغير التابع (المخرج)\nxᵢ = المتغيرات المستقلة (المدخلات)\nβ₀ = Y-intercept (الثابت)\nβₚ = معاملات الميل (Coefficients)\nε = حد الخطأ (Residuals)\n\n📌 Simple: y = β₀ + β₁x + ε\nMultiple: عدة β و x'},

    {front:'ما هو Gradient Descent؟', back:'⬇️ Gradient Descent = النزول التدرجي\n\n📌 التعريف:\nخوارزمية تتحرك تكرارياً نحو\nالقيم اللي تقلل Loss Function\n\n🏔️ التشبيه:\nكرة تتدحرج لأسفل تل!\n→ الكرة = المعاملات (θ)\n→ أسفل التل = أقل تكلفة\n→ الجاذبية = الـ Gradient\n\n🎯 الهدف:\nإيجاد أفضل θ₀ و θ₁'},

    {front:'خطوات Gradient Descent', back:'📋 5 خطوات:\n\n1️⃣ Initialize:\nابدأ بقيم عشوائية لـ θ\n\n2️⃣ Calculate Cost:\nاحسب J(θ) = (1/2m) × Σ(h(x)-y)²\n\n3️⃣ Calculate Gradient:\nاحسب المشتقة ∂J/∂θ\n\n4️⃣ Update:\nθ = θ - α × ∂J/∂θ\n(امشِ عكس اتجاه الزيادة)\n\n5️⃣ Repeat:\nكرر حتى التقارب (Convergence)'},

    {front:'ما هو Learning Rate (α)؟', back:'📏 α = معدل التعلم = حجم الخطوة\n\n⚡ α كبير جداً:\n→ خطوات كبيرة = أسرع\n→ ❌ قد يتخطى الحد الأدنى (overshoot)\n→ ❌ قد يتباعد (diverge)\n\n🐢 α صغير جداً:\n→ خطوات صغيرة = أدق\n→ ❌ بطيء جداً\n→ ❌ يحتاج تكرارات كثيرة\n\n✅ α متوازن:\n→ يتقارب بسرعة معقولة\n→ لا يتخطى الحد الأدنى'},

    {front:'ما هو ε (Epsilon / Residuals)؟', back:'📊 ε = حد الخطأ (Error Term)\n\n📌 = Residuals (البواقي)\n= الفرق بين القيمة الفعلية والمتوقعة\n\nε = y_actual - y_predicted\n\n🎯 ملاحظات:\n→ لا يوجد نموذج بدون خطأ!\n→ ε صغير = نموذج جيد\n→ ε كبير = نموذج سيئ\n→ Cost Function = مقياس لحجم ε'},

    {front:'ما هو Convergence؟', back:'🎯 Convergence = التقارب\n\n📌 يعني:\nالمعاملات وصلت لقيم تقلل التكلفة\n\n📊 متى نعرف؟\n→ التكلفة لا تتغير بين التكرارات\n→ الـ Gradient ≈ 0\n→ وصلنا لأدنى نقطة\n\n⚠️ ملاحظة:\n→ في LR: دالة التكلفة Convex\n→ = حد أدنى واحد فقط\n→ GD يجده دائماً! ✅'},

    {front:'Convex vs Non-Convex', back:'📐 Convex Function (محدبة):\n→ شكلها مثل الوعاء (Bowl) 🥣\n→ حد أدنى واحد فقط (Global)\n→ GD يجده دائماً ✅\n→ مثال: Cost Function في LR\n\n📐 Non-Convex (غير محدبة):\n→ عدة قيعان (Hills & Valleys)\n→ عدة Local Minimums\n→ GD قد يتوقف عند Local Min ❌\n→ مثال: Neural Networks'},

    {front:'MSE vs SSE', back:'📊 SSE = Sum of Squared Errors\nSSE = Σ(yᵢ - ŷᵢ)²\n→ مجموع مربعات الأخطاء\n→ يزيد مع زيادة عدد البيانات\n\n📊 MSE = Mean Squared Error\nMSE = (1/m) × Σ(yᵢ - ŷᵢ)²\n→ متوسط مربعات الأخطاء\n→ يقسم على m\n→ أفضل للمقارنة بين أحجام\n   بيانات مختلفة\n\n🎯 كلاهما: أقل = أفضل!'},

    {front:'قاعدة التحديث في GD', back:'📐 θ = θ - α × ∂J/∂θ\n\n📊 المكونات:\nθ = المعامل الحالي\nα = Learning Rate (حجم الخطوة)\n∂J/∂θ = الـ Gradient (المشتقة)\n\n❓ لماذا الطرح (−)؟\n→ Gradient يشير لاتجاه الزيادة\n→ نريد التقليل = نمشي بالعكس\n→ لذا نطرح!\n\n🔄 نكرر حتى:\n→ θ لا يتغير كثيراً\n→ Cost لا تتغير = Convergence'}
];

// Register Chapter 6
App.registerChapter('ch6', {
    label: 'Ch 6',
    overviewSection: 'ch6-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch6-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch6-equation', icon: '📐', label: 'المعادلة العامة'},
        {id: 'ch6-cost', icon: '📉', label: 'Cost Function'},
        {id: 'ch6-gd', icon: '⬇️', label: 'Gradient Descent'},
        {id: 'ch6-lr', icon: '📏', label: 'Learning Rate'},
        {id: 'ch6-convergence', icon: '🎯', label: 'التقارب والأنواع'},
        {id: 'ch6-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch6-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch6-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData6,
    flashcardData: flashcardData6
});
