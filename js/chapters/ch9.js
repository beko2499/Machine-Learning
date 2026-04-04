/* CH9.JS - Chapter 9: Gradient Descent & Advanced Regression */

const quizData9 = [
    // ===== مقدمة Gradient Descent (سهل) =====
    {id:1, section:'ch9-intro', type:'mcq', difficulty:'easy',
     question:'Gradient Descent is an optimization algorithm used to:',
     options:['Classify data','Minimize the cost/loss function','Build decision trees','Cluster data'],
     correct:1,
     explanation:'Gradient Descent = خوارزمية تحسين (Optimization).\n→ هدفها: تقليل دالة التكلفة (Cost/Loss Function)\n→ تبحث عن أقل نقطة (minimum) في الدالة\n→ مثل النزول التدريجي لأسفل التلة ⛰️'},

    {id:2, section:'ch9-intro', type:'mcq', difficulty:'easy',
     question:'The word "Gradient" refers to:',
     options:['The data points','The slope/derivative of the function','The learning rate','The number of iterations'],
     correct:1,
     explanation:'Gradient = الانحدار / الميل\n→ هو المشتقة (Derivative) للدالة\n→ يحدد اتجاه الزيادة\n→ نتحرك عكس الـ Gradient = اتجاه الانخفاض\n\nمن المحاضرة: المشتقة X ← تكامل'},

    {id:3, section:'ch9-intro', type:'mcq', difficulty:'easy',
     question:'The word "Descent" refers to:',
     options:['Going up','Going down towards the minimum','Going sideways','Staying at the same point'],
     correct:1,
     explanation:'Descent = النزول / الهبوط\n→ نتحرك للأسفل (نحو القيمة الدنيا)\n→ مثل شخص ينزل من جبل\n→ يخطو خطوات باتجاه الأسفل ⬇️'},

    {id:4, section:'ch9-intro', type:'mcq', difficulty:'easy',
     question:'Gradient Descent is used in:',
     options:['Only Decision Trees','Only KNN','Linear Regression and many ML algorithms','Only Random Forest'],
     correct:2,
     explanation:'GD يُستخدم في خوارزميات كثيرة:\n→ Linear Regression (إيجاد أفضل خط)\n→ Logistic Regression\n→ Neural Networks\n→ Deep Learning\n\nهو أساس التعلم في معظم خوارزميات ML!'},

    // ===== المشتقة والتكامل (متوسط) =====
    {id:5, section:'ch9-derivative', type:'mcq', difficulty:'medium',
     question:'The derivative of a function gives us:',
     options:['The area under the curve','The rate of change (slope) at any point','The maximum value','The number of variables'],
     correct:1,
     explanation:'المشتقة (Derivative) = معدل التغيّر\n→ تعطينا ميل الدالة عند أي نقطة\n→ ميل موجب = الدالة تزيد ↗️\n→ ميل سالب = الدالة تنقص ↘️\n→ ميل = 0 → نقطة minimum أو maximum'},

    {id:6, section:'ch9-derivative', type:'mcq', difficulty:'medium',
     question:'In Gradient Descent, we update parameters by moving:',
     options:['In the direction of the gradient','Opposite to the direction of the gradient','Randomly','In a fixed direction'],
     correct:1,
     explanation:'نتحرك عكس اتجاه الـ Gradient!\n→ Gradient يشير لاتجاه الزيادة ↗️\n→ نريد الانخفاض ↘️\n→ لذلك: θ = θ - α × ∇J(θ)\n→ الطرح (-) = عكس الاتجاه'},

    {id:7, section:'ch9-derivative', type:'mcq', difficulty:'medium',
     question:'The relationship between derivative and integral is:',
     options:['They are the same','They are inverse operations of each other','They are unrelated','Both give the slope'],
     correct:1,
     explanation:'من المحاضرة: المشتقة ↔ تكامل\n→ المشتقة = معكوس التكامل\n→ المشتقة: تعطي معدل التغير\n→ التكامل: يعطي المساحة تحت المنحنى\n→ عمليتان عكسيتان!'},

    {id:8, section:'ch9-derivative', type:'mcq', difficulty:'hard',
     question:'If f(x) = x⁴, the first derivative f\'(x) is:',
     options:['x³','4x³','4x⁴','x⁴'],
     correct:1,
     explanation:'من المحاضرة (أس من الرابعة):\nf(x) = x⁴\nf\'(x) = 4x³\n\nقاعدة الاشتقاق: d/dx(xⁿ) = n·xⁿ⁻¹\n→ n=4: 4·x⁴⁻¹ = 4x³'},

    // ===== Learning Rate (متوسط-صعب) =====
    {id:9, section:'ch9-lr', type:'mcq', difficulty:'medium',
     question:'The Learning Rate (α) controls:',
     options:['The number of features','The size of each step in Gradient Descent','The number of data points','The type of algorithm'],
     correct:1,
     explanation:'Learning Rate (α) = معدل التعلم\n→ يحدد حجم كل خطوة\n→ α كبير = خطوات كبيرة = سريع لكن قد يتجاوز\n→ α صغير = خطوات صغيرة = بطيء لكن أدق\n→ α مناسب = التوازن المطلوب!'},

    {id:10, section:'ch9-lr', type:'mcq', difficulty:'hard',
     question:'If Learning Rate is too large:',
     options:['Converges faster','May overshoot and never converge','Always finds the minimum','Uses less memory'],
     correct:1,
     explanation:'α كبير جداً:\n→ خطوات كبيرة جداً\n→ يتجاوز النقطة الدنيا (overshoot)\n→ يتأرجح حولها أو يبتعد\n→ قد لا يصل للحل أبداً!\n\nمثل: تقفز فوق الوادي بدل النزول فيه 🏃💨'},

    {id:11, section:'ch9-lr', type:'mcq', difficulty:'hard',
     question:'If Learning Rate is too small:',
     options:['Faster convergence','Very slow convergence and may get stuck','Always diverges','Increases accuracy immediately'],
     correct:1,
     explanation:'α صغير جداً:\n→ خطوات صغيرة جداً\n→ يحتاج وقت طويل للوصول\n→ قد يعلق في local minimum\n→ مكلف حسابياً\n\nمثل: تنزل من جبل بخطوات 1 سم 🐌'},

    {id:12, section:'ch9-lr', type:'mcq', difficulty:'medium',
     question:'The GD update formula is: θ = θ - α × ∂J/∂θ. What does ∂J/∂θ represent?',
     options:['The learning rate','The partial derivative of cost function w.r.t. parameter','The parameter value','The prediction'],
     correct:1,
     explanation:'∂J/∂θ = المشتقة الجزئية\n→ J = دالة التكلفة (Cost Function)\n→ θ = المعامل (Parameter)\n→ ∂J/∂θ = كيف تتغير التكلفة عند تغير θ\n→ نطرحها × α = خطوة التحسين'},

    // ===== تطبيق عملي GD (متوسط) =====
    {id:13, section:'ch9-practical', type:'mcq', difficulty:'medium',
     question:'From the lecture: In practical GD, we need to calculate:',
     options:['Only the mean','The first derivative of the cost function','The median','The mode'],
     correct:1,
     explanation:'من المحاضرة (تطبيق عملي GD):\n→ نحسب المشتقة الأولى (first derivative)\n→ للدالة التكلفة (Cost Function)\n→ ثم نحدّث المعاملات باستخدام:\nθ = θ - α × المشتقة'},

    {id:14, section:'ch9-practical', type:'mcq', difficulty:'medium',
     question:'GD stops when:',
     options:['After exactly 100 iterations','When the change in cost is very small (convergence)','When learning rate reaches zero','When all data is used'],
     correct:1,
     explanation:'GD يتوقف عند التقارب (Convergence):\n→ التغير في التكلفة يصبح صغير جداً\n→ أو عند الوصول لعدد iterations محدد\n→ أو عند الوصول لدقة مقبولة\n\nالتقارب = وصلنا لأقرب نقطة من الحد الأدنى'},

    {id:15, section:'ch9-practical', type:'mcq', difficulty:'easy',
     question:'The cost/loss function measures:',
     options:['The speed of the algorithm','The error between predicted and actual values','The number of features','The size of data'],
     correct:1,
     explanation:'دالة التكلفة (Cost/Loss Function):\n→ تقيس الخطأ بين التنبؤ والقيمة الحقيقية\n→ كلما قلت = أفضل!\n→ GD يحاول تقليلها\n\nمن المحاضرة: "تظهر نسبة من الخطأ"'},

    // ===== Multiple Linear Regression (متوسط-صعب) =====
    {id:16, section:'ch9-mlr', type:'mcq', difficulty:'medium',
     question:'Multiple Linear Regression is used when:',
     options:['There is one independent variable','There are two or more independent variables','There is no dependent variable','The data is categorical'],
     correct:1,
     explanation:'من المحاضرة:\nيستخدم الانحدار الخطي المتعدد في حال كان لدينا متغيران مستقلان أو أكثر.\n\n→ Simple LR: متغير مستقل واحد\n→ Multiple LR: متغيرين مستقلين أو أكثر\n→ أكثر فاعلية وواقعية!'},

    {id:17, section:'ch9-mlr', type:'mcq', difficulty:'hard',
     question:'The Multiple LR formula: Yi = B0 + B1·X1 + B2·X2 + ... + Bn·Xn + Ei. What does Ei represent?',
     options:['The constant','The coefficient','The random error','The dependent variable'],
     correct:2,
     explanation:'من المحاضرة:\n→ Yi = المتغير التابع (dependent)\n→ Xi = المتغيرات المستقلة (independent)\n→ B0 = قيمة ثابتة (constant)\n→ Bi = المعامل المرتبط بالمتغير\n→ Ei = الخطأ العشوائي (random error)\n→ n = عدد المتغيرات المستقلة'},

    {id:18, section:'ch9-mlr', type:'mcq', difficulty:'medium',
     question:'In Multiple LR, B0 represents:',
     options:['The slope','The value of Y when all X variables equal zero','The error','The number of variables'],
     correct:1,
     explanation:'من المحاضرة:\nB0 = قيمة ثابتة تعبر عن قيمة المتغير التابع عندما يكون المتغير المستقل مساوياً للصفر.\n\n→ = نقطة التقاطع مع محور Y (Y-intercept)'},

    {id:19, section:'ch9-mlr', type:'mcq', difficulty:'medium',
     question:'When n=1 in Multiple LR, we get:',
     options:['Polynomial Regression','Logistic Regression','Simple Linear Regression','No regression'],
     correct:2,
     explanation:'من المحاضرة:\n"عندما n=1 نعود للانحدار الخطي البسيط"\n\nYi = B0 + B1·X1 + Ei\n→ هذا هو Simple Linear Regression!\n→ متغير مستقل واحد فقط'},

    {id:20, section:'ch9-mlr', type:'mcq', difficulty:'hard',
     question:'A condition for Multiple LR is that independent variables should be:',
     options:['All equal','Not linearly correlated with each other','All binary','All positive'],
     correct:1,
     explanation:'من المحاضرة:\n"شريطة أن تكون المتغيرات غير مرتبطة خطياً"\n\n→ No Multicollinearity\n→ المتغيرات المستقلة يجب أن تكون مستقلة عن بعض\n→ إذا كانت مرتبطة = النموذج غير مستقر'},

    // ===== Polynomial Regression (صعب) =====
    {id:21, section:'ch9-poly', type:'mcq', difficulty:'medium',
     question:'Polynomial Regression models the relationship as:',
     options:['A straight line','A polynomial of degree n (curve)','A circle','A binary outcome'],
     correct:1,
     explanation:'من المحاضرة:\nالانحدار متعدد الحدود: نمذجة العلاقة بين المتغيرات في كثير حدود من الدرجة n.\n\n→ درجة 1 = خط مستقيم (Linear)\n→ درجة 2 = منحنى (Quadratic)\n→ درجة n = شكل منحني أكثر ملاءمة'},

    {id:22, section:'ch9-poly', type:'mcq', difficulty:'hard',
     question:'The difference between Linear and Polynomial Regression is:',
     options:['Both are straight lines','Polynomial does not require linear relationship between variables','Polynomial is simpler','Linear handles curves better'],
     correct:1,
     explanation:'من المحاضرة:\n"لا يتطلب أن تكون العلاقة بين المتغيرات المستقلة والتابعة خطية"\n\n→ Linear: خط مستقيم فقط\n→ Polynomial: منحنيات مختلفة حسب الدرجة\n→ الدرجة الأولى = Linear\n→ درجة أعلى = شكل منحني'},

    {id:23, section:'ch9-poly', type:'mcq', difficulty:'medium',
     question:'Increasing polynomial degree gives:',
     options:['A straight line','A more curved and better fitting shape','Always worse results','Fewer parameters'],
     correct:1,
     explanation:'من المحاضرة:\n"ازدياد درجة الحدود تعطينا الشكل المنحني الأكثر ملاءمة للبيانات"\n\n→ درجة 1: خط مستقيم\n→ درجة 2: منحنى بسيط (U)\n→ درجة 3: منحنى S\n→ درجة أعلى: أكثر تعقيداً\n\n⚠️ لكن حذراً من Overfitting!'},

    // ===== Logistic Regression (متوسط-صعب) =====
    {id:24, section:'ch9-logistic', type:'mcq', difficulty:'medium',
     question:'Logistic Regression is used when:',
     options:['The output is continuous','The dependent variable is categorical','There are no features','The data is unlabeled'],
     correct:1,
     explanation:'من المحاضرة:\n"يتم استخدامه في حال كان ناتج المتغير التابع فئوياً"\n\n→ فئوي = categorical (نعم/لا, 0/1)\n→ Output = احتمال بين [0,1]\n→ بعكس Linear Regression (ناتج مستمر)'},

    {id:25, section:'ch9-logistic', type:'mcq', difficulty:'medium',
     question:'Logistic Regression output is:',
     options:['Any real number','A probability between [0,1]','Always 0 or 1','A category name'],
     correct:1,
     explanation:'من المحاضرة:\n"تكون النتيجة عبارة عن احتمال [0,1]"\n\n→ بعكس Linear Regression: ناتج من -∞ إلى +∞\n→ Logistic: ناتج محصور بين 0 و 1\n→ نستخدم الدالة السينية (Sigmoid) لذلك'},

    {id:26, section:'ch9-logistic', type:'mcq', difficulty:'hard',
     question:'The S-shaped curve in Logistic Regression is called:',
     options:['Linear function','Sigmoid function (الوظيفة السينية)','Polynomial function','Exponential function'],
     correct:1,
     explanation:'من المحاضرة:\n"يعطي التابع منحنياً على شكل حرف S ويعرف باسم الوظيفة السينية"\n\n→ Sigmoid = σ(z) = 1/(1+e⁻ᶻ)\n→ تحول أي قيمة إلى [0,1]\n→ شكل S مميز\n→ تُستخدم للتصنيف الثنائي'},

    {id:27, section:'ch9-logistic', type:'mcq', difficulty:'easy',
     question:'Linear Regression vs Logistic Regression: the main difference is:',
     options:['Both give same results','LR outputs continuous values, Logistic outputs probabilities [0,1]','Logistic is faster','LR cannot use features'],
     correct:1,
     explanation:'الفرق الرئيسي:\n\n📈 Linear Regression:\n→ ناتج مستمر (-∞ إلى +∞)\n→ للتوقع (Regression)\n\n📊 Logistic Regression:\n→ ناتج احتمال [0,1]\n→ للتصنيف (Classification)\n→ يستخدم Sigmoid function'},

    // ===== أنواع Regression مقارنة (صعب) =====
    {id:28, section:'ch9-mlr', type:'mcq', difficulty:'hard',
     question:'The correct hierarchy of Regression types is:',
     options:['Polynomial→Linear→Logistic','Simple LR→Multiple LR→Polynomial→Logistic','Logistic→Linear→Polynomial','All are the same'],
     correct:1,
     explanation:'تسلسل أنواع الانحدار:\n\n1. Simple LR: Y = B0 + B1·X (متغير واحد)\n2. Multiple LR: Y = B0 + B1·X1 +...+ Bn·Xn\n3. Polynomial: Y = B0 + B1·X + B2·X² +...+ Bn·Xⁿ\n4. Logistic: σ(z) = 1/(1+e⁻ᶻ) → [0,1]'},

    {id:29, section:'ch9-intro', type:'mcq', difficulty:'medium',
     question:'GD is used in Linear Regression to find:',
     options:['The best features','The optimal values of B0 and B1 that minimize error','The number of data points','The best K value'],
     correct:1,
     explanation:'GD في Linear Regression:\n→ يبحث عن أفضل B0 (intercept) و B1 (slope)\n→ اللي تقلل الخطأ بين التنبؤ والقيمة الحقيقية\n→ يحدّث B0 و B1 في كل iteration\n→ حتى يجد أفضل خط ملائم'},

    // ===== Essay =====
    {id:30, section:'ch9-intro', type:'essay', difficulty:'hard',
     question:'Explain Gradient Descent algorithm and the role of Learning Rate.',
     answer:'Gradient Descent:\n\nالفكرة: النزول التدريجي نحو أقل قيمة لدالة التكلفة.\n\nالخطوات:\n1. ابدأ بقيم عشوائية للمعاملات (θ)\n2. احسب المشتقة (Gradient) لدالة التكلفة\n3. حدّث المعاملات: θ = θ - α × ∂J/∂θ\n4. كرر حتى التقارب (convergence)\n\nLearning Rate (α):\n→ يحدد حجم كل خطوة\n→ α كبير: سريع لكن قد يتجاوز ولا يتقارب\n→ α صغير: بطيء لكن أدق\n→ المثالي: α مناسب يوازن بين السرعة والدقة'},

    {id:31, section:'ch9-mlr', type:'essay', difficulty:'hard',
     question:'Compare Simple LR, Multiple LR, Polynomial Regression, and Logistic Regression.',
     answer:'مقارنة أنواع الانحدار:\n\n1. Simple LR:\n→ Yi = B0 + B1·Xi + Ei\n→ متغير مستقل واحد\n→ خط مستقيم\n\n2. Multiple LR:\n→ Yi = B0 + B1·X1 +...+ Bn·Xn + Ei\n→ متغيرين مستقلين أو أكثر\n→ شرط: المتغيرات غير مرتبطة خطياً\n→ أكثر واقعية\n\n3. Polynomial:\n→ Yi = B0 + B1·X + B2·X² +...+ Bn·Xⁿ + Ei\n→ منحنى (ليس خط مستقيم)\n→ لا يتطلب علاقة خطية\n\n4. Logistic:\n→ σ(z) = 1/(1+e⁻ᶻ)\n→ ناتج فئوي [0,1]\n→ دالة سينية (S-shaped)'},

    {id:32, section:'ch9-derivative', type:'mcq', difficulty:'easy',
     question:'True or False: GD can be used in Neural Networks.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅\n→ GD هو أساس تدريب Neural Networks\n→ يُستخدم مع Backpropagation\n→ يحدّث أوزان الشبكة\n→ يقلل دالة الخسارة (Loss Function)\n→ كل خوارزميات Deep Learning تعتمد عليه!'}
];

const flashcardData9 = [
    {front:'ما هو Gradient Descent؟', back:'⛰️ Gradient Descent\n\n📌 خوارزمية تحسين (Optimization)\n\n🎯 الهدف:\nتقليل دالة التكلفة (Cost Function)\nبإيجاد أقل نقطة (minimum)\n\n📋 الصيغة:\nθ = θ - α × ∂J/∂θ\n\n🏔️ التشبيه:\nشخص ينزل من جبل بخطوات\nباتجاه أعمق نقطة في الوادي'},

    {front:'Learning Rate (α)', back:'📏 معدل التعلم\n\n📌 يحدد حجم كل خطوة في GD\n\n⚠️ α كبير جداً:\n→ خطوات كبيرة = يتجاوز\n→ قد لا يتقارب أبداً! 💨\n\n⚠️ α صغير جداً:\n→ خطوات صغيرة = بطيء\n→ قد يعلق في local min 🐌\n\n✅ α مناسب:\n→ توازن بين السرعة والدقة'},

    {front:'المشتقة والتكامل', back:'📐 من المحاضرة:\n\n📌 المشتقة (Derivative):\n→ معدل تغير الدالة\n→ تعطي الميل عند أي نقطة\n→ d/dx(xⁿ) = n·xⁿ⁻¹\n→ مثال: x⁴ → 4x³\n\n📌 التكامل (Integral):\n→ معكوس المشتقة\n→ المساحة تحت المنحنى\n\n🔄 هما عمليتان عكسيتان!'},

    {front:'صيغة تحديث GD', back:'📋 Update Rule:\n\nθ = θ - α × ∂J/∂θ\n\n📌 حيث:\n→ θ = المعامل (parameter)\n→ α = Learning Rate\n→ ∂J/∂θ = المشتقة الجزئية\n→ J = دالة التكلفة\n\n🎯 المعنى:\n→ احسب الميل (gradient)\n→ تحرك عكسه (descent)\n→ بمقدار α (خطوة)\n→ كرر حتى التقارب!'},

    {front:'Multiple Linear Regression', back:'📈 الانحدار الخطي المتعدد\n\nYi = B0 + B1·X1 + ... + Bn·Xn + Ei\n\n📌 من المحاضرة:\n→ متغيران مستقلان أو أكثر\n→ أكثر فاعلية وواقعية\n→ عندما n=1 → Simple LR\n\n⚠️ شرط مهم:\nالمتغيرات المستقلة يجب أن\nتكون غير مرتبطة خطياً\n(No Multicollinearity)'},

    {front:'Polynomial Regression', back:'📊 انحدار متعدد الحدود\n\nYi = B0 + B1·X + B2·X² +...+ Bn·Xⁿ\n\n📌 من المحاضرة:\n→ منحنى (ليس خط مستقيم)\n→ الدرجة 1 = خط (Linear)\n→ الدرجة n = شكل منحني\n→ لا يتطلب علاقة خطية!\n\n✅ ازدياد الدرجة:\n→ شكل أكثر ملاءمة للبيانات\n⚠️ لكن حذراً من Overfitting!'},

    {front:'Logistic Regression', back:'📊 الانحدار اللوجستي\n\nσ(z) = 1/(1+e⁻ᶻ)\n\n📌 من المحاضرة:\n→ ناتج المتغير التابع فئوي\n→ النتيجة = احتمال [0,1]\n→ منحنى S = الوظيفة السينية\n   (Sigmoid Function)\n\n🔄 الفرق:\n→ Linear: ناتج من -∞ إلى +∞\n→ Logistic: ناتج [0,1]\n→ يُستخدم للتصنيف الثنائي'},

    {front:'أنواع الانحدار الأربعة', back:'📊 الأنواع:\n\n1️⃣ Simple LR:\nY = B0 + B1·X (واحد)\n\n2️⃣ Multiple LR:\nY = B0 + ΣBi·Xi (عدة)\n\n3️⃣ Polynomial:\nY = B0 + ΣBi·Xⁱ (منحنى)\n\n4️⃣ Logistic:\nσ(z) = 1/(1+e⁻ᶻ) → [0,1]\n\n📊 كلهم يستخدمون GD\nلإيجاد أفضل معاملات!'},

    {front:'التقارب (Convergence)', back:'🎯 Convergence\n\n📌 متى يتوقف GD؟\n\n1️⃣ التغير في التكلفة صغير جداً\n→ ΔJ ≈ 0\n\n2️⃣ الوصول لعدد iterations محدد\n→ مثلاً 1000 iteration\n\n3️⃣ الوصول لدقة مقبولة\n→ الخطأ < عتبة معينة\n\n⚠️ مشاكل:\n→ Local minimum ≠ Global minimum\n→ α كبير = لا يتقارب\n→ α صغير = بطيء جداً'},

    {front:'تطبيق عملي GD', back:'🔧 التطبيق العملي:\n\n1️⃣ حدد دالة التكلفة J(θ)\n2️⃣ احسب المشتقة الأولى ∂J/∂θ\n3️⃣ اختر α مناسب\n4️⃣ ابدأ بقيم عشوائية لـ θ\n5️⃣ حدّث: θ = θ - α × ∂J/∂θ\n6️⃣ كرر حتى التقارب\n\n📊 يُستخدم في:\n→ Linear Regression\n→ Logistic Regression\n→ Neural Networks\n→ Deep Learning'}
];

App.registerChapter('ch9', {
    label: 'Ch 9',
    overviewSection: 'ch9-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch9-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch9-intro', icon: '⛰️', label: 'مقدمة GD'},
        {id: 'ch9-derivative', icon: '📐', label: 'المشتقة'},
        {id: 'ch9-lr', icon: '📏', label: 'Learning Rate'},
        {id: 'ch9-practical', icon: '🔧', label: 'تطبيق عملي'},
        {id: 'ch9-mlr', icon: '📈', label: 'Multiple LR'},
        {id: 'ch9-poly', icon: '📊', label: 'Polynomial'},
        {id: 'ch9-logistic', icon: '🔮', label: 'Logistic'},
        {id: 'ch9-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch9-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch9-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData9,
    flashcardData: flashcardData9
});
