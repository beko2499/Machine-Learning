/* ============================================
   GAMIFICATION ENGINE
   XP, Levels, Streaks, Achievements, Confetti
   ============================================ */

const Gamify = {
    // --- State ---
    xp: 0,
    level: 0,
    streak: 0,
    bestStreak: 0,
    totalCorrect: 0,
    totalWrong: 0,
    achievements: {},
    studyStartTime: Date.now(),
    chaptersCompleted: new Set(),

    // --- Level Definitions ---
    levels: [
        { name: 'مبتدئ', icon: '🌱', xpNeeded: 0 },
        { name: 'طالب', icon: '📖', xpNeeded: 50 },
        { name: 'متعلم', icon: '🎓', xpNeeded: 150 },
        { name: 'متقدم', icon: '⭐', xpNeeded: 300 },
        { name: 'خبير', icon: '🏆', xpNeeded: 500 },
        { name: 'عالم سحابي', icon: '☁️', xpNeeded: 800 },
    ],

    // --- Achievement Definitions ---
    achievementDefs: [
        { id: 'first_correct', icon: '🌟', name: 'الخطوة الأولى', desc: 'أجب إجابة صحيحة واحدة' },
        { id: 'streak_5', icon: '🔥', name: 'سلسلة حارة', desc: '5 إجابات صحيحة متتالية' },
        { id: 'streak_10', icon: '💥', name: 'لا يُوقف', desc: '10 إجابات صحيحة متتالية' },
        { id: 'perfect_quiz', icon: '💯', name: 'كامل العلامات', desc: '100% في أي اختبار' },
        { id: 'all_chapters', icon: '📚', name: 'القارئ الشامل', desc: 'زُر كل الـ 10 فصول' },
        { id: 'xp_100', icon: '💎', name: 'جامع النقاط', desc: 'اجمع 100 نقطة XP' },
        { id: 'xp_500', icon: '👑', name: 'ملك النقاط', desc: 'اجمع 500 نقطة XP' },
        { id: 'flashcard_master', icon: '🃏', name: 'سيد البطاقات', desc: 'راجع 20 بطاقة' },
        { id: 'correct_50', icon: '🧠', name: 'عقل جبار', desc: '50 إجابة صحيحة إجمالي' },
        { id: 'night_owl', icon: '🦉', name: 'بومة الليل', desc: 'ادرس بعد الساعة 12 AM' },
    ],

    flashcardsReviewed: 0,

    // --- Initialize ---
    init() {
        this.load();
        this.createParticles();
        this.renderXPBar();
        this.updateXPBar();
        this.checkTimeAchievement();
        this.initInteractiveBackground();
    },

    // --- Persistence ---
    save() {
        const data = {
            xp: this.xp, level: this.level, streak: this.streak,
            bestStreak: this.bestStreak, totalCorrect: this.totalCorrect,
            totalWrong: this.totalWrong, achievements: this.achievements,
            flashcardsReviewed: this.flashcardsReviewed,
            chaptersCompleted: [...this.chaptersCompleted],
        };
        localStorage.setItem('cloudStudyGamify', JSON.stringify(data));
    },

    load() {
        try {
            const data = JSON.parse(localStorage.getItem('cloudStudyGamify'));
            if (data) {
                this.xp = data.xp || 0;
                this.level = data.level || 0;
                this.streak = data.streak || 0;
                this.bestStreak = data.bestStreak || 0;
                this.totalCorrect = data.totalCorrect || 0;
                this.totalWrong = data.totalWrong || 0;
                this.achievements = data.achievements || {};
                this.flashcardsReviewed = data.flashcardsReviewed || 0;
                this.chaptersCompleted = new Set(data.chaptersCompleted || []);
            }
        } catch (e) { /* fresh start */ }
    },

    // --- XP System ---
    addXP(amount, x, y) {
        this.xp += amount;
        this.showXPPopup(amount, x, y);
        this.updateXPBar();
        this.checkLevelUp();
        this.checkXPAchievements();
        this.save();
    },

    showXPPopup(amount, x, y) {
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = `+${amount} XP`;
        popup.style.left = (x || window.innerWidth / 2) + 'px';
        popup.style.top = (y || 200) + 'px';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1500);
    },

    renderXPBar() {
        const header = document.createElement('div');
        header.className = 'xp-header';
        header.id = 'xp-header';

        const lv = this.levels[this.level] || this.levels[0];
        header.innerHTML = `
            <div class="xp-level-badge" id="level-badge">
                <span class="level-icon">${lv.icon}</span>
                <span id="level-name">${lv.name}</span>
            </div>
            <div class="xp-bar-container">
                <div class="xp-bar">
                    <div class="xp-bar-fill" id="xp-bar-fill"></div>
                </div>
                <div class="xp-text"><span id="xp-current">${this.xp}</span> XP</div>
            </div>
        `;
        document.body.prepend(header);

        // Streak counter
        const streak = document.createElement('div');
        streak.className = 'streak-counter';
        streak.id = 'streak-counter';
        streak.innerHTML = `<span class="streak-fire">🔥</span> <span id="streak-num">0</span> متتالية!`;
        document.body.appendChild(streak);

        // Confetti container
        const confetti = document.createElement('div');
        confetti.className = 'confetti-container';
        confetti.id = 'confetti-container';
        document.body.appendChild(confetti);

        // Achievement toast
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.id = 'achievement-toast';
        toast.innerHTML = `
            <span class="toast-icon" id="toast-icon">🏆</span>
            <div class="toast-content">
                <div class="toast-title">إنجاز جديد!</div>
                <div class="toast-name" id="toast-name"></div>
                <div class="toast-desc" id="toast-desc"></div>
            </div>
        `;
        document.body.appendChild(toast);

        // Level up overlay
        const levelUp = document.createElement('div');
        levelUp.className = 'level-up-overlay';
        levelUp.id = 'level-up-overlay';
        levelUp.onclick = () => levelUp.classList.remove('show');
        levelUp.innerHTML = `
            <div class="level-up-card">
                <span class="level-icon-big" id="levelup-icon">⭐</span>
                <div class="level-text">ترقية!</div>
                <div class="level-name" id="levelup-name"></div>
            </div>
        `;
        document.body.appendChild(levelUp);
    },

    updateXPBar() {
        const lv = this.levels[this.level] || this.levels[0];
        const nextLv = this.levels[this.level + 1];
        const fill = document.getElementById('xp-bar-fill');
        const current = document.getElementById('xp-current');
        const badge = document.getElementById('level-badge');
        const nameEl = document.getElementById('level-name');

        if (fill) {
            if (nextLv) {
                const progress = ((this.xp - lv.xpNeeded) / (nextLv.xpNeeded - lv.xpNeeded)) * 100;
                fill.style.width = Math.min(100, Math.max(0, progress)) + '%';
            } else {
                fill.style.width = '100%';
            }
        }
        if (current) current.textContent = this.xp;
        if (nameEl) nameEl.textContent = lv.name;
        if (badge) {
            const iconEl = badge.querySelector('.level-icon');
            if (iconEl) iconEl.textContent = lv.icon;
        }
    },

    checkLevelUp() {
        const newLevel = this.levels.findIndex((lv, i) => {
            const next = this.levels[i + 1];
            return next ? this.xp < next.xpNeeded : true;
        });
        if (newLevel > this.level) {
            this.level = newLevel;
            this.showLevelUp();
            this.save();
        }
    },

    showLevelUp() {
        const lv = this.levels[this.level];
        const overlay = document.getElementById('level-up-overlay');
        const icon = document.getElementById('levelup-icon');
        const name = document.getElementById('levelup-name');
        if (icon) icon.textContent = lv.icon;
        if (name) name.textContent = lv.name;
        if (overlay) overlay.classList.add('show');
        this.launchConfetti(60);
        setTimeout(() => { if (overlay) overlay.classList.remove('show'); }, 3500);
    },

    // --- Streak System ---
    incrementStreak() {
        this.streak++;
        if (this.streak > this.bestStreak) this.bestStreak = this.streak;

        const counter = document.getElementById('streak-counter');
        const num = document.getElementById('streak-num');
        if (num) num.textContent = this.streak;
        if (counter) {
            counter.classList.add('visible');
            if (this.streak >= 5) counter.classList.add('fire');
        }

        if (this.streak === 5) this.unlockAchievement('streak_5');
        if (this.streak === 10) this.unlockAchievement('streak_10');
        this.save();
    },

    resetStreak() {
        this.streak = 0;
        const counter = document.getElementById('streak-counter');
        if (counter) {
            counter.classList.remove('visible', 'fire');
        }
        this.save();
    },

    // --- Confetti ---
    launchConfetti(count = 30) {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        const colors = ['#6c5ce7', '#00cec9', '#fdcb6e', '#e17055', '#00b894', '#a29bfe', '#ff7675', '#74b9ff'];
        const shapes = ['circle', 'square', 'strip'];

        for (let i = 0; i < count; i++) {
            const piece = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            piece.className = `confetti-piece ${shape}`;
            piece.style.background = color;
            piece.style.left = Math.random() * 100 + '%';
            piece.style.animationDuration = (2 + Math.random() * 2) + 's';
            piece.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(piece);
            setTimeout(() => piece.remove(), 4000);
        }
    },

    // --- Achievements ---
    unlockAchievement(id) {
        if (this.achievements[id]) return;
        this.achievements[id] = Date.now();
        this.save();

        const def = this.achievementDefs.find(a => a.id === id);
        if (!def) return;

        const toast = document.getElementById('achievement-toast');
        const icon = document.getElementById('toast-icon');
        const name = document.getElementById('toast-name');
        const desc = document.getElementById('toast-desc');

        if (icon) icon.textContent = def.icon;
        if (name) name.textContent = def.name;
        if (desc) desc.textContent = def.desc;
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }

        this.launchConfetti(25);
    },

    checkXPAchievements() {
        if (this.xp >= 100) this.unlockAchievement('xp_100');
        if (this.xp >= 500) this.unlockAchievement('xp_500');
    },

    checkTimeAchievement() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) this.unlockAchievement('night_owl');
    },

    // --- Quiz Integration ---
    onCorrectAnswer(event) {
        this.totalCorrect++;
        this.incrementStreak();
        const rect = event ? event.target.getBoundingClientRect() : null;
        const x = rect ? rect.left + rect.width / 2 : undefined;
        const y = rect ? rect.top : undefined;
        this.addXP(10, x, y);
        this.launchConfetti(15);

        if (this.totalCorrect === 1) this.unlockAchievement('first_correct');
        if (this.totalCorrect >= 50) this.unlockAchievement('correct_50');
    },

    onWrongAnswer() {
        this.totalWrong++;
        this.resetStreak();
        // Screen shake
        const main = document.getElementById('main-content');
        if (main) {
            main.classList.add('screen-shake');
            setTimeout(() => main.classList.remove('screen-shake'), 400);
        }
        this.save();
    },

    onQuizComplete(chapterId, percent) {
        this.chaptersCompleted.add(chapterId);
        this.addXP(25);
        if (percent >= 100) {
            this.unlockAchievement('perfect_quiz');
            this.launchConfetti(50);
        } else if (percent >= 80) {
            this.launchConfetti(30);
        }
        if (this.chaptersCompleted.size >= 10) this.unlockAchievement('all_chapters');
        this.save();
    },

    onFlashcardReview() {
        this.flashcardsReviewed++;
        if (this.flashcardsReviewed % 5 === 0) this.addXP(5);
        if (this.flashcardsReviewed >= 20) this.unlockAchievement('flashcard_master');
        this.save();
    },

    onChapterVisit(chapterId) {
        const visited = new Set();
        for (const chId of App.chapterOrder) {
            if (App.visitedSections.has(App.chapters[chId]?.overviewSection)) {
                visited.add(chId);
            }
        }
        if (visited.size >= 10) this.unlockAchievement('all_chapters');
    },

    // --- Floating Particles ---
    createParticles() {
        const container = document.createElement('div');
        container.className = 'particles-container';
        document.body.prepend(container);

        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = 3 + Math.random() * 8;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (15 + Math.random() * 25) + 's';
            p.style.animationDelay = Math.random() * 20 + 's';
            container.appendChild(p);
        }
    },

    // --- Get Stats ---
    getStudyTime() {
        const mins = Math.floor((Date.now() - this.studyStartTime) / 60000);
        return mins < 60 ? `${mins} دقيقة` : `${Math.floor(mins/60)}h ${mins%60}m`;
    },

    // --- Interactive Background ---
    initInteractiveBackground() {
        const shapes = document.querySelectorAll('.floating-shape');
        if (!shapes.length) return;

        // Store original positions
        shapes.forEach(shape => {
            shape._offsetX = 0;
            shape._offsetY = 0;
        });

        document.addEventListener('mousemove', (e) => {
            const mx = e.clientX;
            const my = e.clientY;

            shapes.forEach(shape => {
                const rect = shape.getBoundingClientRect();
                const sx = rect.left + rect.width / 2;
                const sy = rect.top + rect.height / 2;
                const dx = sx - mx;
                const dy = sy - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 300;

                if (dist < radius) {
                    const force = (1 - dist / radius) * 80;
                    const angle = Math.atan2(dy, dx);
                    shape._offsetX = Math.cos(angle) * force;
                    shape._offsetY = Math.sin(angle) * force;
                    shape.style.transform = `translate(${shape._offsetX}px, ${shape._offsetY}px) scale(${1 + (1 - dist/radius) * 0.15})`;
                    shape.style.opacity = 0.12 + (1 - dist/radius) * 0.18;
                } else {
                    shape.style.transform = '';
                    shape.style.opacity = '';
                }
            });
        });
    }
};
