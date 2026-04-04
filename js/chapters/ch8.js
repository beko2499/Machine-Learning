/* CH8.JS - Chapter 8: Random Forest Algorithm */

const quizData8 = [
    // ===== ما هو Random Forest (سهل) =====
    {id:1, section:'ch8-intro', type:'mcq', difficulty:'easy',
     question:'Random Forest is a:',
     options:['Unsupervised learning algorithm','Supervised learning algorithm','Reinforcement learning algorithm','Semi-supervised algorithm'],
     correct:1,
     explanation:'Random Forest = خوارزمية تعلم مُشرف (Supervised Learning).\nتُستخدم لكل من التصنيف (Classification) والتوقع (Regression).'},

    {id:2, section:'ch8-intro', type:'mcq', difficulty:'easy',
     question:'The "forest" in Random Forest refers to:',
     options:['A single large tree','An ensemble of decision trees','A neural network','A clustering algorithm'],
     correct:1,
     explanation:'الـ "غابة" = مجموعة (ensemble) من أشجار القرار (Decision Trees).\n\nRandom Forest يبني عدة أشجار قرار ويدمج نتائجها للحصول على تنبؤ أفضل وأكثر استقراراً.'},

    {id:3, section:'ch8-intro', type:'mcq', difficulty:'easy',
     question:'Random Forest can be used for:',
     options:['Classification only','Regression only','Both Classification and Regression','Neither'],
     correct:2,
     explanation:'Random Forest يعمل لكل من:\n→ التصنيف (Classification): Majority Voting\n→ التوقع (Regression): Averaging\n\nوهذا يشكل غالبية أنظمة التعلم الآلي الحالية.'},

    {id:4, section:'ch8-intro', type:'mcq', difficulty:'easy',
     question:'The general idea behind Random Forest is:',
     options:['Using one perfect tree','Combining multiple learning models to increase overall result','Removing all trees except the best','Using neural networks'],
     correct:1,
     explanation:'الفكرة الأساسية:\n→ دمج عدة نماذج تعلم (ensemble) يحسن النتيجة الكلية\n→ شجرة واحدة قد تخطئ، لكن غابة من الأشجار تخطئ أقل!\n→ "حكمة الجماعة" أفضل من "رأي الفرد" 🌲🌳🌲'},

    // ===== Bagging Method (متوسط) =====
    {id:5, section:'ch8-bagging', type:'mcq', difficulty:'medium',
     question:'Random Forest is trained using the:',
     options:['Boosting method','Bagging method','Stacking method','Pruning method'],
     correct:1,
     explanation:'Random Forest يستخدم طريقة Bagging:\n→ Bootstrap Aggregating\n→ كل شجرة تتدرب على عينة عشوائية من البيانات\n→ النتائج تُجمع (Aggregate) للحصول على التنبؤ النهائي'},

    {id:6, section:'ch8-bagging', type:'mcq', difficulty:'medium',
     question:'In Bagging, each tree is trained on:',
     options:['The entire dataset','A random subset of the dataset','Only one data point','The test data'],
     correct:1,
     explanation:'في Bagging:\n→ كل شجرة تأخذ عينة عشوائية (bootstrap sample)\n→ العينة تسحب مع الإرجاع (with replacement)\n→ كل شجرة ترى جزء مختلف من البيانات\n→ هذا يمنع Overfitting!'},

    {id:7, section:'ch8-bagging', type:'mcq', difficulty:'medium',
     question:'Random Forest randomly selects:',
     options:['Only observations','Only features','Both observations and features','Neither'],
     correct:2,
     explanation:'من الصور التوضيحية بالـ PDF:\n→ يختار عشوائياً observations (ملاحظات/صفوف)\n→ ويختار عشوائياً features (خصائص/أعمدة)\n→ كل شجرة تبنى من مجموعة فرعية عشوائية مختلفة\n\nهذا يعطي تنوع بين الأشجار!'},

    {id:8, section:'ch8-bagging', type:'mcq', difficulty:'hard',
     question:'Bootstrap sampling means:',
     options:['Sampling without replacement','Sampling with replacement','Taking the entire dataset','Removing outliers'],
     correct:1,
     explanation:'Bootstrap = سحب عينات مع الإرجاع:\n→ نفس النقطة قد تظهر أكثر من مرة\n→ بعض النقاط قد لا تظهر أبداً\n→ كل عينة Bootstrap حجمها = حجم البيانات الأصلية\n→ لكن محتواها مختلف → تنوع!'},

    // ===== كيف يعمل RF (متوسط) =====
    {id:9, section:'ch8-howitworks', type:'mcq', difficulty:'medium',
     question:'How does Random Forest make predictions?',
     options:['Uses only one tree','Builds multiple decision trees and merges results','Uses K nearest neighbors','Uses gradient descent'],
     correct:1,
     explanation:'من المحاضرة:\nRandom forest builds multiple decision trees and merges them together to get a more accurate and stable prediction.\n\n→ يبني عدة أشجار\n→ يدمج نتائجها\n→ النتيجة: أكثر دقة واستقراراً'},

    {id:10, section:'ch8-howitworks', type:'mcq', difficulty:'medium',
     question:'For classification, Random Forest uses:',
     options:['Averaging','Majority Voting','Gradient Descent','Backpropagation'],
     correct:1,
     explanation:'في التصنيف:\n→ كل شجرة تصوت لفئة\n→ الفئة الأكثر أصواتاً = التنبؤ النهائي\n→ Majority Voting (تصويت الأغلبية)\n\nمن صورة المحاضرة:\nTree1→C, Tree2→D, Tree3→B, Tree4→C\n→ C = 2 أصوات (أغلبية) → Final Class = C'},

    {id:11, section:'ch8-howitworks', type:'mcq', difficulty:'medium',
     question:'For regression, Random Forest uses:',
     options:['Majority Voting','Averaging of all predictions','Maximum value','Minimum value'],
     correct:1,
     explanation:'في التوقع (Regression):\n→ كل شجرة تعطي قيمة رقمية\n→ Average All Predictions (متوسط كل التنبؤات)\n→ النتيجة = المتوسط\n\nمن صورة المحاضرة:\nTree1→Pred1, Tree2→Pred2, ... Tree600→Pred600\n→ Average = Random Forest Prediction'},

    {id:12, section:'ch8-howitworks', type:'mcq', difficulty:'hard',
     question:'From the lecture diagram: X dataset is split into N₁, N₂, N₃, N₄ features. Each builds a separate tree. What happens next?',
     options:['Only the best tree is selected','All trees vote → Majority Voting → Final Class','Trees are pruned then combined','Features are removed'],
     correct:1,
     explanation:'من الصورة التوضيحية:\n→ X dataset يُقسم لمجموعات خصائص N₁, N₂, N₃, N₄\n→ كل مجموعة تبني شجرة مستقلة (Tree #1-4)\n→ كل شجرة تعطي class مختلف (C, D, B, C)\n→ Majority Voting → Final Class\n\nC = 2 أصوات (أغلبية) → الإجابة = C'},

    // ===== مثال عملي من الصور (متوسط-صعب) =====
    {id:13, section:'ch8-example', type:'mcq', difficulty:'medium',
     question:'In the lecture example: Tree1→Class C, Tree2→Class D, Tree3→Class B, Tree4→Class C. The final prediction is:',
     options:['Class D','Class B','Class C','Cannot determine'],
     correct:2,
     explanation:'Majority Voting:\n→ C يظهر مرتين (Tree1 + Tree4)\n→ D يظهر مرة (Tree2)\n→ B يظهر مرة (Tree3)\n\nC = 2 أصوات = الأغلبية\n→ Final Class = C ✅'},

    {id:14, section:'ch8-example', type:'mcq', difficulty:'hard',
     question:'From the lecture image: 600 trees make 600 predictions. The final result uses:',
     options:['Only the first prediction','Average of all 600 predictions','The maximum prediction','Only the last prediction'],
     correct:1,
     explanation:'من صورة المحاضرة (Regression):\n→ Test Sample → 600 شجرة\n→ كل شجرة تعطي Prediction\n→ Average All Predictions\n→ = Random Forest Prediction\n\n600 تنبؤ → متوسطهم = النتيجة النهائية'},

    {id:15, section:'ch8-example', type:'mcq', difficulty:'medium',
     question:'From the lecture workflow diagram: Dataset → Multiple trees → Results → Final Result. The aggregation step is:',
     options:['Minimum Selection','Majority Voting / Averaging','Random Selection','Maximum Selection'],
     correct:1,
     explanation:'من رسم سير العمل:\n→ Dataset → Decision Tree 1,2,...N\n→ كل شجرة تعطي Result\n→ تجميع النتائج:\n  • Classification: Majority Voting\n  • Regression: Averaging\n→ Final Result'},

    // ===== DT vs RF (صعب) =====
    {id:16, section:'ch8-vs-dt', type:'mcq', difficulty:'hard',
     question:'A main difference between Decision Tree and Random Forest is:',
     options:['DT uses multiple trees','RF randomly selects observations and features to build several trees then averages results','RF uses only one tree','DT prevents overfitting better'],
     correct:1,
     explanation:'الفرق الرئيسي (من المحاضرة):\nRF randomly selects observations and features to build several decision trees and then averages the results.\n\n→ DT = شجرة واحدة\n→ RF = عدة أشجار بخصائص وملاحظات عشوائية'},

    {id:17, section:'ch8-vs-dt', type:'mcq', difficulty:'hard',
     question:'Deep decision trees might suffer from:',
     options:['Underfitting','Overfitting','High bias','Low variance'],
     correct:1,
     explanation:'من المحاضرة:\n"Deep decision trees might suffer from overfitting"\n\n→ Overfitting = الإفراط في التعلم\n→ الشجرة تحفظ بيانات التدريب بدل التعلم\n→ أداء ممتاز على التدريب لكن سيء على بيانات جديدة'},

    {id:18, section:'ch8-vs-dt', type:'mcq', difficulty:'hard',
     question:'How does Random Forest prevent overfitting?',
     options:['By using one deep tree','By creating random subsets of features and building smaller trees','By removing all features','By increasing tree depth'],
     correct:1,
     explanation:'من المحاضرة:\n"Random forest prevents this by creating random subsets of the features and building smaller trees using those subsets."\n\n→ مجموعات فرعية عشوائية من الخصائص\n→ أشجار أصغر (ليست عميقة جداً)\n→ التنوع بين الأشجار = أقل Overfitting'},

    {id:19, section:'ch8-vs-dt', type:'mcq', difficulty:'medium',
     question:'Which is more accurate and stable?',
     options:['Single Decision Tree','Random Forest','Both are equal','Neither'],
     correct:1,
     explanation:'Random Forest أفضل لأنه:\n→ يجمع قرارات عدة أشجار\n→ أخطاء الأشجار الفردية تتلاشى بالتجميع\n→ أكثر دقة (accurate)\n→ أكثر استقراراً (stable)\n→ أقل عرضة لـ Overfitting'},

    // ===== Ensemble Learning (متوسط) =====
    {id:20, section:'ch8-bagging', type:'mcq', difficulty:'medium',
     question:'Ensemble learning means:',
     options:['Using one strong model','Combining multiple models to improve performance','Removing weak models','Training on one feature'],
     correct:1,
     explanation:'Ensemble Learning = التعلم التجميعي:\n→ دمج عدة نماذج ضعيفة = نموذج قوي!\n→ Random Forest = أشهر مثال\n→ مثل التصويت: رأي الجماعة أفضل من رأي فرد\n→ "حكمة الجماعة" 🗳️'},

    {id:21, section:'ch8-intro', type:'mcq', difficulty:'easy',
     question:'True or False: Random Forest builds only one decision tree.',
     options:['True','False'],
     correct:1,
     explanation:'خطأ! ❌\n→ Random Forest يبني عدة أشجار قرار\n→ "غابة" = مجموعة أشجار\n→ كل شجرة مختلفة (عينات وخصائص مختلفة)\n→ النتائج تُجمع بالتصويت أو المتوسط'},

    // ===== مزايا وعيوب (متوسط) =====
    {id:22, section:'ch8-pros', type:'mcq', difficulty:'medium',
     question:'An advantage of Random Forest is:',
     options:['Very slow','Reduces overfitting compared to single decision tree','Cannot handle classification','Needs only one tree'],
     correct:1,
     explanation:'مزايا Random Forest:\n✅ يقلل Overfitting مقارنة بشجرة واحدة\n✅ دقيق ومستقر\n✅ يعمل للتصنيف والتوقع\n✅ يتعامل مع بيانات كبيرة\n✅ يتعامل مع خصائص كثيرة'},

    {id:23, section:'ch8-pros', type:'mcq', difficulty:'medium',
     question:'A disadvantage of Random Forest is:',
     options:['Too simple','Computationally expensive and less interpretable than single tree','Cannot handle large data','Always overfits'],
     correct:1,
     explanation:'عيوب Random Forest:\n❌ مكلف حسابياً (عدة أشجار)\n❌ أقل قابلية للتفسير من شجرة واحدة\n❌ أبطأ في التدريب والتنبؤ\n❌ يحتاج ذاكرة أكثر\n\nلكنه يظل من أقوى الخوارزميات!'},

    {id:24, section:'ch8-pros', type:'mcq', difficulty:'easy',
     question:'Random Forest is more robust because:',
     options:['It uses one tree','Errors of individual trees cancel out when combined','It removes all features','It uses no data'],
     correct:1,
     explanation:'RF أقوى لأن:\n→ أخطاء الأشجار الفردية تتلاشى عند الدمج\n→ شجرة تخطئ هنا، لكن أشجار أخرى تصيب\n→ التصويت بالأغلبية يقلل الأخطاء\n→ "الجماعة أحكم من الفرد" 🌲🌳🌲'},

    // ===== Feature(f) والعقد (صعب) =====
    {id:25, section:'ch8-howitworks', type:'mcq', difficulty:'hard',
     question:'From the lecture diagram showing two trees with Feature(f) and Σ node: What does the Σ represent?',
     options:['A leaf node','The aggregation/summation of tree outputs','A root node','A split node'],
     correct:1,
     explanation:'من صورة المحاضرة:\n→ شجرتين بـ Feature(f)\n→ كل شجرة تعطي نتيجة (أوراق خضراء/حمراء)\n→ النتائج تنزل لعقدة Σ\n→ Σ = جمع/تجميع (Aggregation)\n→ هنا يتم Voting أو Averaging'},

    {id:26, section:'ch8-example', type:'mcq', difficulty:'medium',
     question:'If 5 trees predict: Cat, Dog, Cat, Cat, Dog. The final classification is:',
     options:['Dog','Cat','Cannot determine','Both'],
     correct:1,
     explanation:'Majority Voting:\n→ Cat = 3 أصوات\n→ Dog = 2 أصوات\n→ Cat = الأغلبية (3 > 2)\n→ Final Class = Cat ✅\n\nنفس مبدأ التصويت بالأغلبية!'},

    {id:27, section:'ch8-example', type:'mcq', difficulty:'hard',
     question:'If 3 trees predict values: 100, 120, 110 in regression. The final prediction is:',
     options:['100','120','110','Cannot determine'],
     correct:2,
     explanation:'في Regression → Average:\n→ (100 + 120 + 110) / 3 = 330 / 3 = 110\n\n→ Final Prediction = 110 ✅\n→ نفس مبدأ المتوسط الحسابي'},

    // ===== Subsets والتنوع (صعب) =====
    {id:28, section:'ch8-bagging', type:'mcq', difficulty:'hard',
     question:'Why does RF use random subsets of features for each tree?',
     options:['To make trees identical','To create diversity among trees and reduce correlation','To remove important features','To increase overfitting'],
     correct:1,
     explanation:'عشوائية الخصائص تخلق تنوع:\n→ كل شجرة ترى خصائص مختلفة\n→ الأشجار تصبح مختلفة (متنوعة)\n→ أخطاء غير مرتبطة (uncorrelated)\n→ عند الدمج: الأخطاء تتلاشى!\n→ = دقة أعلى + أقل Overfitting'},

    {id:29, section:'ch8-vs-dt', type:'mcq', difficulty:'medium',
     question:'Compared to a single Decision Tree, Random Forest:',
     options:['Is faster but less accurate','Is slower but more accurate and stable','Uses less memory','Is always worse'],
     correct:1,
     explanation:'مقارنة RF بـ DT:\n→ RF: أبطأ (عدة أشجار) لكن أدق وأكثر استقراراً\n→ DT: أسرع لكن قد يعاني من Overfitting\n→ RF: أقل Overfitting\n→ RF: أقل قابلية للتفسير'},

    // ===== Essay =====
    {id:30, section:'ch8-howitworks', type:'essay', difficulty:'hard',
     question:'Explain how Random Forest works step by step, including how it handles classification and regression.',
     answer:'Random Forest Algorithm:\n\n1. الفكرة: بناء عدة أشجار قرار ودمج نتائجها\n2. التدريب (Bagging):\n   → سحب عينات عشوائية (Bootstrap) من البيانات\n   → اختيار مجموعات فرعية عشوائية من الخصائص\n   → بناء شجرة قرار لكل مجموعة\n3. التنبؤ:\n   → كل شجرة تعطي تنبؤها المستقل\n   → Classification: Majority Voting (أغلبية الأصوات)\n   → Regression: Averaging (متوسط التنبؤات)\n4. مثال Classification: Trees→ C,D,B,C → C=2 (أغلبية) → C\n5. مثال Regression: 600 شجرة → Average All Predictions'},

    {id:31, section:'ch8-vs-dt', type:'essay', difficulty:'hard',
     question:'Compare Decision Tree and Random Forest. Why is RF better at preventing overfitting?',
     answer:'الفرق بين DT و RF:\n\nDecision Tree:\n→ شجرة واحدة\n→ سريعة لكن قد تعاني من Overfitting\n→ أشجار عميقة تحفظ بيانات التدريب\n→ سهلة التفسير\n\nRandom Forest:\n→ غابة من أشجار القرار\n→ أبطأ لكن أكثر دقة واستقراراً\n→ تمنع Overfitting عبر:\n  1. اختيار عشوائي للملاحظات (Bootstrap)\n  2. اختيار عشوائي للخصائص (Feature Subsets)\n  3. بناء أشجار أصغر\n  4. دمج النتائج (Ensemble)\n→ أقل قابلية للتفسير'},

    {id:32, section:'ch8-howitworks', type:'mcq', difficulty:'easy',
     question:'The term "Random" in Random Forest refers to:',
     options:['Random predictions','Random selection of data subsets and features','Random accuracy','Random tree structure'],
     correct:1,
     explanation:'"عشوائي" في Random Forest:\n→ اختيار عشوائي لعينات البيانات\n→ اختيار عشوائي للخصائص\n→ هذه العشوائية تخلق تنوع بين الأشجار\n→ التنوع + التجميع = دقة عالية!'}
];

const flashcardData8 = [
    {front:'ما هو Random Forest؟', back:'🌲 Random Forest\n\n📌 خوارزمية تعلم مُشرف (Supervised)\n\n🎯 الفكرة:\nبناء عدة أشجار قرار (ensemble)\nودمج نتائجها للحصول على\nتنبؤ أدق ومستقر\n\n📊 يُستخدم لـ:\n→ التصنيف: Majority Voting\n→ التوقع: Averaging\n\n🌳 "حكمة الجماعة > رأي الفرد"'},

    {front:'ما هو Bagging؟', back:'🎒 Bootstrap Aggregating\n\n📌 طريقة تدريب RF:\n\n1️⃣ Bootstrap Sampling:\n→ سحب عينات عشوائية مع الإرجاع\n\n2️⃣ Feature Subsets:\n→ اختيار خصائص عشوائية لكل شجرة\n\n3️⃣ Build Trees:\n→ كل شجرة تتدرب على عينتها\n\n4️⃣ Aggregate Results:\n→ دمج النتائج بالتصويت/المتوسط'},

    {front:'Classification vs Regression في RF', back:'📊 في التصنيف:\n→ Majority Voting (تصويت الأغلبية)\n→ كل شجرة تصوّت لفئة\n→ الفئة الأكثر أصواتاً = النتيجة\n→ مثال: C,D,B,C → C ✅ (أغلبية)\n\n📈 في التوقع:\n→ Averaging (المتوسط)\n→ كل شجرة تعطي قيمة\n→ متوسط القيم = النتيجة\n→ مثال: 600 prediction → Average'},

    {front:'مثال Majority Voting', back:'🗳️ المثال من المحاضرة:\n\nX Dataset → 4 أشجار بخصائص مختلفة:\n\n🌲 Tree #1 (N₁ features) → Class C\n🌲 Tree #2 (N₂ features) → Class D\n🌲 Tree #3 (N₃ features) → Class B\n🌲 Tree #4 (N₄ features) → Class C\n\n📊 التصويت:\nC = 2 أصوات ✅ (أغلبية)\nD = 1 | B = 1\n\n→ Final Class = C'},

    {front:'Decision Tree vs Random Forest', back:'🌲 Decision Tree:\n→ شجرة واحدة\n→ سريعة وسهلة التفسير\n→ قد تعاني من Overfitting\n→ أشجار عميقة = حفظ البيانات\n\n🌲🌲🌲 Random Forest:\n→ عدة أشجار (ensemble)\n→ أبطأ لكن أدق وأكثر استقراراً\n→ تمنع Overfitting\n→ أقل قابلية للتفسير\n→ تختار features عشوائية'},

    {front:'كيف يمنع RF الـ Overfitting؟', back:'🛡️ آليات منع Overfitting:\n\n1️⃣ Random Feature Subsets:\n→ كل شجرة ترى خصائص مختلفة\n→ تنوع بين الأشجار\n\n2️⃣ Smaller Trees:\n→ أشجار أصغر (ليست عميقة)\n→ أقل حفظ للبيانات\n\n3️⃣ Bootstrap Sampling:\n→ كل شجرة ترى عينة مختلفة\n→ أخطاء غير مرتبطة\n\n4️⃣ Ensemble:\n→ الأخطاء تتلاشى بالدمج'},

    {front:'مزايا Random Forest', back:'✅ المزايا:\n\n1. دقيق ومستقر\n2. يقلل Overfitting\n3. يعمل للتصنيف والتوقع\n4. يتعامل مع بيانات كبيرة\n5. يتعامل مع خصائص كثيرة\n6. قوي ضد الضوضاء\n7. لا يحتاج Feature Scaling\n8. يعطي أهمية الخصائص\n   (Feature Importance)'},

    {front:'عيوب Random Forest', back:'❌ العيوب:\n\n1. مكلف حسابياً\n   (عدة أشجار = وقت أكثر)\n2. أقل قابلية للتفسير\n   (صعب فهم \"لماذا هذا القرار\")\n3. أبطأ في التدريب والتنبؤ\n4. يحتاج ذاكرة أكثر\n5. ليس الأفضل لـ Real-time\n\n⚖️ لكنه يظل من أقوى\nالخوارزميات على الإطلاق!'},

    {front:'Ensemble Learning', back:'🤝 التعلم التجميعي\n\n📌 الفكرة:\n→ دمج عدة نماذج ضعيفة\n→ النتيجة = نموذج قوي!\n\n📊 أنواع:\n→ Bagging (مثل Random Forest)\n→ Boosting (مثل XGBoost)\n→ Stacking\n\n🎯 المبدأ:\n\"حكمة الجماعة أحكم من الفرد\"\n\"Two heads are better than one\" 🗳️'},

    {front:'مثال عملي: 600 شجرة', back:'🌲 مثال Regression من المحاضرة:\n\nTest Sample Input:\n\n→ Tree 1 → Prediction 1\n→ Tree 2 → Prediction 2\n→ (...)\n→ Tree 600 → Prediction 600\n\n📊 الخطوة التالية:\n→ Average All Predictions\n→ = Random Forest Prediction\n\n✅ 600 رأي مختلف\n→ متوسطهم = نتيجة دقيقة!'}
];

App.registerChapter('ch8', {
    label: 'Ch 8',
    overviewSection: 'ch8-overview',
    quizStyle: 'detailed',
    navItems: [
        {id: 'ch8-overview', icon: '🏠', label: 'نظرة عامة'},
        {id: 'ch8-intro', icon: '🌲', label: 'مقدمة RF'},
        {id: 'ch8-bagging', icon: '🎒', label: 'Bagging'},
        {id: 'ch8-howitworks', icon: '⚙️', label: 'كيف يعمل'},
        {id: 'ch8-example', icon: '🎯', label: 'أمثلة عملية'},
        {id: 'ch8-vs-dt', icon: '⚔️', label: 'RF vs DT'},
        {id: 'ch8-pros', icon: '⚖️', label: 'مزايا وعيوب'},
        {id: 'ch8-mindmap', icon: '🗺️', label: 'خريطة ذهنية'},
        {id: 'ch8-quiz', icon: '📝', label: 'أسئلة تدريبية'},
        {id: 'ch8-flashcards', icon: '🃏', label: 'بطاقات المراجعة'}
    ],
    quizData: quizData8,
    flashcardData: flashcardData8
});
