/* CH7.JS - Chapter 7: K-Nearest Neighbors (KNN) */

const quizData7 = [
    // ===== مقدمة KNN (سهل) =====
    {id:1, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'KNN is an algorithm for:',
     options:['Unsupervised learning','Supervised learning','Reinforcement learning','Semi-supervised learning'],
     correct:1,
     explanation:'KNN = خوارزمية تعلم مُشرف (Supervised Learning).\nالبيانات مُصنفة مسبقاً (labeled) ونستخدمها لتصنيف نقاط جديدة.'},

    {id:2, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'KNN can be used for:',
     options:['Classification only','Regression only','Both Classification and Regression','Neither'],
     correct:2,
     explanation:'KNN يُستخدم لكل من:\n→ التصنيف (Classification): أي فئة؟ → mode\n→ التوقع (Regression): أي قيمة؟ → mean\nلكنه أكثر استخداماً في التصنيف.'},

    {id:3, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'K in KNN refers to:',
     options:['The number of features','The number of nearest neighbors to consider','The number of categories','The distance threshold'],
     correct:1,
     explanation:'K = عدد الجيران الأقرب اللي نأخذهم بالاعتبار.\n\nمثلاً K=3 → ننظر لأقرب 3 نقاط → نصنف حسب الأغلبية بينهم.'},

    {id:4, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'The most preferred value for K is:',
     options:['1','3','5','10'],
     correct:2,
     explanation:'القيمة الأكثر تفضيلاً لـ K هي 5.\nلكن لا توجد طريقة محددة لاختيار أفضل K → نجرب عدة قيم ونختار الأفضل.'},

    {id:5, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'KNN classifies a new point based on:',
     options:['Random selection','The majority class of its K nearest neighbors','The farthest points','The centroid of all data'],
     correct:1,
     explanation:'KNN يصنف النقطة الجديدة حسب أغلبية (majority) فئات جيرانها الـ K الأقرب.\n\nمثال: K=5 → 3 من الفئة A + 2 من B → التصنيف = A ✅'},

    // ===== المسافة الإقليدية (متوسط) =====
    {id:6, section:'ch7-distance', type:'mcq', difficulty:'medium',
     question:'KNN uses which distance measure?',
     options:['Manhattan distance','Euclidean distance','Cosine similarity','Hamming distance'],
     correct:1,
     explanation:'KNN يستخدم المسافة الإقليدية (Euclidean Distance):\n\nd = √(Σ(xᵢ - yᵢ)²)\n\n= المسافة المستقيمة بين نقطتين في الفضاء.\nكلما قلت المسافة → زادت احتمالية الانتماء لنفس الفئة.'},

    {id:7, section:'ch7-distance', type:'mcq', difficulty:'medium',
     question:'In KNN, the closer the distance between two points:',
     options:['The less likely they belong to the same class','The more likely they belong to the same class','Distance does not matter','They are always in different classes'],
     correct:1,
     explanation:'كلما قلت المسافة بين نقطتين → زادت احتمالية انتمائهما لنفس الفئة.\n\nهذا مبدأ KNN الأساسي: الجيران القريبون أكثر تشابهاً!'},

    {id:8, section:'ch7-distance', type:'mcq', difficulty:'medium',
     question:'Why should variables be normalized before applying KNN?',
     options:['To make computation faster','To prevent higher range variables from biasing the result','To reduce the number of features','To increase K value'],
     correct:1,
     explanation:'بدون Normalization:\n→ متغير مداه 0-1000 يؤثر أكثر من متغير مداه 0-1\n→ المسافة تتحيز (bias) للمتغير ذو المدى الأعلى\n\nبعد Normalization: كل المتغيرات بنفس المقياس → عدالة!'},

    // ===== كيف يعمل KNN (متوسط) =====
    {id:9, section:'ch7-steps', type:'mcq', difficulty:'medium',
     question:'What is the FIRST step in the KNN algorithm?',
     options:['Calculate distances','Select the number K of neighbors','Sort the distances','Assign the category'],
     correct:1,
     explanation:'الخطوة الأولى: اختر عدد الجيران K!\n\n1️⃣ Select K\n2️⃣ Calculate Euclidean distance\n3️⃣ Take K nearest neighbors\n4️⃣ Count data points per category\n5️⃣ Assign to majority category'},

    {id:10, section:'ch7-steps', type:'mcq', difficulty:'medium',
     question:'After calculating distances, we:',
     options:['Pick the farthest K points','Sort distances in ascending order and pick first K','Pick random K points','Pick all points'],
     correct:1,
     explanation:'بعد حساب المسافات:\n→ رتب تصاعدياً (من الأقرب للأبعد)\n→ خذ أول K نقاط (الأقرب)\n→ صنف حسب الأغلبية بينهم'},

    {id:11, section:'ch7-steps', type:'mcq', difficulty:'medium',
     question:'For classification, KNN returns:',
     options:['The mean of K labels','The mode of K labels','The median of K labels','The sum of K labels'],
     correct:1,
     explanation:'في التصنيف (Classification):\n→ نرجع Mode (المنوال) = الفئة الأكثر تكراراً\n\nفي التوقع (Regression):\n→ نرجع Mean (المتوسط) = متوسط القيم'},

    {id:12, section:'ch7-steps', type:'mcq', difficulty:'medium',
     question:'For regression, KNN returns:',
     options:['The mode of K labels','The mean of K labels','The maximum value','The minimum value'],
     correct:1,
     explanation:'في Regression (التوقع):\n→ نرجع Mean (المتوسط) لقيم الـ K جيران\n\nمثال: K=3, جيران قيمهم 10, 20, 30\n→ التوقع = (10+20+30)/3 = 20'},

    // ===== اختيار K (صعب) =====
    {id:13, section:'ch7-kvalue', type:'mcq', difficulty:'hard',
     question:'Why is K=1 or K=2 not recommended?',
     options:['Too slow','Can be noisy and sensitive to outliers','Too many neighbors','Not enough computation'],
     correct:1,
     explanation:'K=1 أو K=2:\n→ حساس جداً للضوضاء (noisy)\n→ يتأثر بـ Outliers (القيم الشاذة)\n→ نقطة واحدة شاذة تغير التصنيف!\n\nK أكبر = أكثر استقراراً (لكن ليس كبير جداً)'},

    {id:14, section:'ch7-kvalue', type:'mcq', difficulty:'hard',
     question:'What happens when K is too large?',
     options:['More accurate','May find some difficulties and lose local patterns','Faster computation','Better for small datasets'],
     correct:1,
     explanation:'K كبير جداً:\n→ قد يضيع الأنماط المحلية\n→ يشمل نقاط بعيدة جداً\n→ يصبح التصنيف عاماً جداً\n→ تزيد التكلفة الحسابية\n\nالمثالي: K متوسط (مثل 5) وتجربة عدة قيم'},

    {id:15, section:'ch7-kvalue', type:'mcq', difficulty:'medium',
     question:'The best way to choose K is:',
     options:['Always use K=5','Try different values and evaluate','Use K equal to the number of classes','Use K=1 for best accuracy'],
     correct:1,
     explanation:'لا توجد طريقة محددة لأفضل K!\n→ نجرب عدة قيم (3, 5, 7, 9...)\n→ نقيم أداء كل قيمة\n→ نختار القيمة اللي تعطي أفضل دقة\n\n💡 عادة: K فردي (odd) لتجنب التعادل'},

    // ===== مثال عملي (متوسط) =====
    {id:16, section:'ch7-example', type:'mcq', difficulty:'medium',
     question:'If K=3, and the 3 nearest neighbors are: A, A, B. The classification is:',
     options:['Class B','Class A','Cannot determine','Both A and B'],
     correct:1,
     explanation:'K=3 → 3 جيران أقرب: A, A, B\n→ A = 2 (أغلبية) ✅\n→ B = 1\n→ التصنيف = Class A (حسب الأغلبية/Mode)'},

    {id:17, section:'ch7-example', type:'mcq', difficulty:'medium',
     question:'If K=5, and neighbors are: Red(3), Blue(2). Classification is:',
     options:['Blue','Red','Cannot determine','Both'],
     correct:1,
     explanation:'K=5 → Red = 3, Blue = 2\n→ Red هي الأغلبية (3 > 2)\n→ التصنيف = Red ✅\n\nدائماً: الفئة ذات العدد الأكبر بين الـ K جيران = التصنيف'},

    {id:18, section:'ch7-example', type:'mcq', difficulty:'hard',
     question:'Same data point: K=3 gives Class B, K=6 gives Class A. This shows:',
     options:['KNN is always wrong','The value of K affects the classification result','Both K values are wrong','K does not matter'],
     correct:1,
     explanation:'نفس النقطة تُصنف مختلفاً حسب K!\n→ K=3: أقرب 3 نقاط أغلبها B → Class B\n→ K=6: أقرب 6 نقاط أغلبها A → Class A\n\nهذا يوضح أهمية اختيار K المناسب!'},

    // ===== مزايا وعيوب (متوسط-صعب) =====
    {id:19, section:'ch7-pros', type:'mcq', difficulty:'easy',
     question:'Which is an advantage of KNN?',
     options:['Low computation cost','Simple to implement','Works only with small data','Needs no distance calculation'],
     correct:1,
     explanation:'مزايا KNN:\n✅ سهل التطبيق (Simple to implement)\n✅ قوي ضد الضوضاء (Robust to noisy data)\n✅ أكثر فعالية مع بيانات كبيرة'},

    {id:20, section:'ch7-pros', type:'mcq', difficulty:'medium',
     question:'Which is a disadvantage of KNN?',
     options:['Simple to implement','High computation cost','Works with small data','Robust to noise'],
     correct:1,
     explanation:'عيوب KNN:\n❌ تكلفة حسابية عالية (يحسب مسافة كل نقطة)\n❌ صعوبة تحديد أفضل K\n❌ يحتاج Normalization\n❌ بطيء مع بيانات كبيرة جداً'},

    {id:21, section:'ch7-pros', type:'mcq', difficulty:'medium',
     question:'KNN is robust to:',
     options:['High dimensions','Noisy training data','Missing values','Imbalanced classes'],
     correct:1,
     explanation:'KNN قوي ضد الضوضاء (Noisy Training Data):\n→ بما أنه يأخذ أغلبية K جيران\n→ نقطة ضوضاء واحدة لا تؤثر كثيراً (إذا K مناسب)\n→ التصويت بالأغلبية يقلل تأثير الشذوذ'},

    // ===== تحضير البيانات (صعب) =====
    {id:22, section:'ch7-distance', type:'mcq', difficulty:'hard',
     question:'Before applying KNN, we should:',
     options:['Increase all values','Remove noise, outliers, and normalize data','Delete all features','Add more categories'],
     correct:1,
     explanation:'قبل تطبيق KNN:\n1. Normalize: توحيد مقياس المتغيرات\n2. Remove Noise: إزالة الضوضاء\n3. Remove Outliers: إزالة القيم الشاذة\n\nهذا يحسن دقة الخوارزمية بشكل كبير!'},

    {id:23, section:'ch7-steps', type:'mcq', difficulty:'hard',
     question:'The correct order of KNN steps is:',
     options:['Assign → Calculate → Select K → Sort','Select K → Calculate distance → Sort → Pick K nearest → Count → Assign','Sort → Select → Calculate → Assign','Calculate → Assign → Sort → Select'],
     correct:1,
     explanation:'الترتيب الصحيح:\n1️⃣ Select K\n2️⃣ Calculate Euclidean distance\n3️⃣ Sort distances (ascending)\n4️⃣ Pick first K entries\n5️⃣ Count per category\n6️⃣ Assign to majority → Model ready!'},

    // ===== Process of Learning (سهل) =====
    {id:24, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'The process of learning a new algorithm includes:',
     options:['Just deploy it','Research theory → Search sklearn docs → Deploy test data → Evaluate','Only read documentation','Skip to evaluation'],
     correct:1,
     explanation:'عملية تعلم خوارزمية جديدة:\n1. ابحث عن المعرفة النظرية\n2. ابحث في وثائق sklearn\n3. طبق على بيانات تجريبية\n4. قيّم الأداء مقارنة بخوارزميات أخرى'},

    {id:25, section:'ch7-pros', type:'mcq', difficulty:'hard',
     question:'KNN is computationally expensive because:',
     options:['It needs GPU','It calculates distance between query and ALL training samples','It uses deep learning','It needs large memory only'],
     correct:1,
     explanation:'KNN مكلف حسابياً لأنه:\n→ يحسب المسافة بين النقطة الجديدة وكل نقط التدريب\n→ O(n) لكل تنبؤ (n = عدد نقاط التدريب)\n→ مع بيانات كبيرة = بطيء جداً'},

    // ===== Real-life analogy =====
    {id:26, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'The real-life analogy of KNN is:',
     options:['Reading a book','Judging a person by their closest friends and circles','Solving math equations','Building a house'],
     correct:1,
     explanation:'تشبيه KNN بالحياة اليومية:\n→ لمعرفة شخص ما → انظر لأصدقائه المقربين والدوائر اللي يقضي وقته فيها\n→ \"قل لي من تصاحب أقل لك من أنت!\" 🤝'},

    {id:27, section:'ch7-kvalue', type:'mcq', difficulty:'hard',
     question:'Why is it better to use odd K values?',
     options:['Faster computation','To avoid ties in classification votes','Better accuracy always','Required by the algorithm'],
     correct:1,
     explanation:'K فردي (odd) يتجنب التعادل!\n\nمثال مع K=4: Red=2, Blue=2 → تعادل! ماذا نختار؟\nمع K=5: Red=3, Blue=2 → Red ✅ واضح!\n\nK فردي = دائماً فائز واحد'},

    // ===== True/False =====
    {id:28, section:'ch7-intro', type:'mcq', difficulty:'easy',
     question:'True or False: KNN stores the training data and uses it during prediction.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ KNN = Lazy Learner (متعلم كسول)!\n→ لا يبني نموذج أثناء التدريب\n→ يحفظ كل البيانات\n→ يحسب المسافات وقت التنبؤ فقط\n→ لهذا يسمى Instance-Based Learning'},

    {id:29, section:'ch7-pros', type:'mcq', difficulty:'medium',
     question:'True or False: KNN works better with large training data.',
     options:['True','False'],
     correct:0,
     explanation:'صحيح ✅ كلما زادت بيانات التدريب:\n→ تمثيل أفضل للفئات\n→ جيران أكثر دقة\n→ تصنيف أفضل\n\nلكن ⚠️ التكلفة الحسابية تزيد أيضاً!'},

    // ===== Essay =====
    {id:30, section:'ch7-steps', type:'essay', difficulty:'hard',
     question:'Explain the KNN algorithm step by step and discuss how to choose K.',
     answer:'خوارزمية K-Nearest Neighbors:\n\nالفكرة: تصنيف نقطة جديدة بناءً على أقرب K جيران.\n\nالخطوات:\n1. اختر K (عدد الجيران)\n2. احسب المسافة الإقليدية d = √(Σ(xᵢ-yᵢ)²)\n3. رتب المسافات تصاعدياً\n4. خذ أقرب K نقاط\n5. عد النقاط في كل فئة\n6. صنف = الفئة ذات الأغلبية (Mode)\n   أو ارجع المتوسط (Mean) للتوقع\n\nاختيار K:\n→ لا توجد طريقة محددة\n→ K=5 الأكثر شيوعاً\n→ K صغير (1,2): حساس للضوضاء\n→ K كبير: يضيع الأنماط المحلية\n→ K فردي: يتجنب التعادل\n→ نجرب عدة قيم ونختار الأفضل'},

    {id:31, section:'ch7-pros', type:'essay', difficulty:'hard',
     question:'List the advantages and disadvantages of KNN algorithm.',
     answer:'مزايا KNN:\n✅ سهل التطبيق (Simple to implement)\n✅ قوي ضد الضوضاء (Robust to noisy data)\n✅ فعال مع بيانات تدريب كبيرة\n✅ لا يحتاج تدريب مسبق (Lazy Learner)\n✅ يعمل للتصنيف والتوقع\n\nعيوب KNN:\n❌ تكلفة حسابية عالية (يحسب مسافة لكل نقطة)\n❌ صعوبة تحديد أفضل K\n❌ يحتاج Normalization للمتغيرات\n❌ يفضل معالجة البيانات أولاً (noise, outliers)\n❌ بطيء مع بيانات كبيرة جداً'},

    {id:32, section:'ch7-distance', type:'mcq', difficulty:'medium',
     question:'Euclidean distance formula is:',
     options:['d = |x-y|','d = √(Σ(xᵢ-yᵢ)²)','d = Σ|xᵢ-yᵢ|','d = max(xᵢ-yᵢ)'],
     correct:1,
     explanation:'المسافة الإقليدية:\nd = √(Σ(xᵢ - yᵢ)²)\n\n= الجذر التربيعي لمجموع مربعات الفروق\n= المسافة المستقيمة بين نقطتين\n= نفس صيغة فيثاغورس!'},

    // ===== HPI Regression Example from slides =====
    {id:33, section:'ch7-example', type:'mcq', difficulty:'hard',
     question:'KNN Regression: K=3, nearest neighbors HPI values are 264, 139, 139. The predicted HPI is:',
     options:['264','139','180.7','181'],
     correct:2,
     explanation:'في KNN Regression نستخدم Mean (المتوسط):\n\nHPI = (264 + 139 + 139) / 3 = 542 / 3 = 180.7\n\n→ التوقع = متوسط قيم أقرب K جيران\n→ هذا مثال من المحاضرة لتوقع مؤشر أسعار المنازل (HPI)'},

    {id:34, section:'ch7-example', type:'mcq', difficulty:'medium',
     question:'In the HPI example, if K changes from 3 to 4, the prediction will:',
     options:['Stay the same','Change because a 4th neighbor is included in the average','Always increase','Always decrease'],
     correct:1,
     explanation:'عند تغيير K من 3 إلى 4:\n→ نضيف رابع أقرب جار\n→ المتوسط يتغير لأن هناك قيمة جديدة\n→ HPI الجديد = (264+139+139+قيمة الجار الرابع)/4\n\nالتوقع يتغير مع تغيير K!'}

];

const flashcardData7 = [
    {front:'ما هو KNN؟', back:'📊 K-Nearest Neighbors\n\n📌 خوارزمية تعلم مُشرف (Supervised)\n\n🎯 الفكرة:\nتصنيف نقطة جديدة بناءً على\nأقرب K جيران إليها\n\n📊 يُستخدم لـ:\n→ التصنيف (Classification) = Mode\n→ التوقع (Regression) = Mean\n\n🤝 التشبيه:\n\"قل لي من تصاحب أقل لك من أنت!\"'},

    {front:'ما معنى K في KNN؟', back:'🔢 K = عدد الجيران الأقرب\n\n📌 أمثلة:\nK=3 → أقرب 3 نقاط\nK=5 → أقرب 5 نقاط (الأكثر شيوعاً)\n\n⚠️ ملاحظات:\n→ K=1,2: حساس للضوضاء ❌\n→ K كبير جداً: يضيع الأنماط ❌\n→ K فردي: يتجنب التعادل ✅\n→ لا توجد قيمة \"مثالية\" → جرب!'},

    {front:'خطوات KNN الست', back:'📋 الخطوات:\n\n1️⃣ اختر K (عدد الجيران)\n2️⃣ احسب المسافة الإقليدية\n   d = √(Σ(xᵢ-yᵢ)²)\n3️⃣ رتب المسافات تصاعدياً\n4️⃣ خذ أقرب K نقاط\n5️⃣ عد النقاط في كل فئة\n6️⃣ صنف = فئة الأغلبية (Mode)\n\n✅ النموذج جاهز!'},

    {front:'المسافة الإقليدية', back:'📐 Euclidean Distance\n\nd = √(Σ(xᵢ - yᵢ)²)\n\n📌 = الجذر التربيعي لمجموع\n   مربعات الفروق\n\n🎯 كلما قلت المسافة:\n→ زادت احتمالية نفس الفئة!\n\n⚠️ مهم:\nيجب Normalize المتغيرات\nلمنع التحيز للمتغيرات ذات\nالمدى الأعلى'},

    {front:'مزايا KNN', back:'✅ المزايا:\n\n1. سهل التطبيق (Simple)\n2. قوي ضد الضوضاء (Robust)\n3. فعال مع بيانات كبيرة\n4. لا يحتاج تدريب مسبق\n   (Lazy Learner)\n5. يعمل للتصنيف والتوقع\n6. لا يحتاج افتراضات\n   عن توزيع البيانات'},

    {front:'عيوب KNN', back:'❌ العيوب:\n\n1. تكلفة حسابية عالية\n   (يحسب مسافة لكل نقطة)\n2. صعوبة تحديد أفضل K\n3. يحتاج Normalization\n4. يفضل إزالة Noise & Outliers\n5. بطيء مع بيانات كبيرة جداً\n6. يتأثر بالأبعاد العالية\n   (Curse of Dimensionality)'},

    {front:'Classification vs Regression في KNN', back:'📊 في التصنيف:\n→ ارجع Mode (المنوال)\n→ = الفئة الأكثر تكراراً\n→ مثال: A,A,B → A ✅\n\n📈 في التوقع:\n→ ارجع Mean (المتوسط)\n→ = متوسط قيم الجيران\n→ مثال: 10,20,30 → 20 ✅\n\n📌 KNN أكثر استخداماً في التصنيف'},

    {front:'مثال K=3 vs K=6', back:'📊 نفس النقطة، K مختلف:\n\n🔵 K=3:\n→ أقرب 3: B, B, A\n→ B = 2 (أغلبية) → Class B\n\n🔵 K=6:\n→ أقرب 6: A, A, A, A, B, B\n→ A = 4 (أغلبية) → Class A\n\n⚠️ الدرس:\nقيمة K تؤثر على النتيجة!\nيجب اختيار K بعناية'},

    {front:'تحضير البيانات لـ KNN', back:'📋 قبل تطبيق KNN:\n\n1️⃣ Normalization:\n→ وحّد مقياس المتغيرات\n→ يمنع تحيز المتغيرات الكبيرة\n\n2️⃣ Remove Noise:\n→ أزل الضوضاء من البيانات\n\n3️⃣ Remove Outliers:\n→ أزل القيم الشاذة\n\n⚠️ بدون تحضير:\n→ النتائج غير دقيقة\n→ متغيرات كبيرة تسيطر'},

    {front:'Lazy Learner vs Eager Learner', back:'🐢 Lazy Learner (KNN):\n→ لا يبني نموذج أثناء التدريب\n→ يحفظ كل البيانات\n→ يحسب وقت التنبؤ فقط\n→ تدريب سريع, تنبؤ بطيء\n\n🐇 Eager Learner (مثل LR, DT):\n→ يبني نموذج أثناء التدريب\n→ يتعلم المعاملات/القواعد\n→ تنبؤ سريع, تدريب بطيء\n\nKNN = Instance-Based Learning'}
];

App.registerChapter('ch7', {
    label: 'Ch 7',
    overviewSection: 'ch7-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch7-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch7-intro', icon: '📊', label: 'مقدمة KNN'},
        {id: 'ch7-distance', icon: '📐', label: 'المسافة الإقليدية'},
        {id: 'ch7-steps', icon: '📋', label: 'خطوات KNN'},
        {id: 'ch7-kvalue', icon: '🔢', label: 'اختيار K'},
        {id: 'ch7-example', icon: '🎯', label: 'أمثلة عملية'},
        {id: 'ch7-pros', icon: '⚖️', label: 'مزايا وعيوب'},
        {id: 'ch7-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch7-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch7-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData7,
    flashcardData: flashcardData7
});
