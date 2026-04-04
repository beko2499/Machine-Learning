/* ============================================
   CORE.JS - Application Core Engine
   Chapter Registry, Navigation, Quiz & Flashcard Engines
   ============================================ */

// ============ CHAPTER REGISTRY ============
const App = {
    chapters: {},
    chapterOrder: [],
    currentChapter: null,
    visitedSections: new Set(['overview']),

    // Register a chapter - called from each chapter file
    registerChapter(id, config) {
        this.chapters[id] = {
            id: id,
            label: config.label,
            navItems: config.navItems,
            overviewSection: config.overviewSection,
            quizData: config.quizData || [],
            flashcardData: config.flashcardData || [],
            quizStyle: config.quizStyle || 'detailed',
            quizContainerId: config.quizContainerId,
            quizState: { score: 0, answered: 0, correct: 0, wrong: 0 },
            flashcardState: { current: 0 }
        };
        this.chapterOrder.push(id);
    },

    getTotalSections() {
        let total = 0;
        for (const ch of this.chapterOrder) {
            total += this.chapters[ch].navItems.length;
        }
        return total;
    }
};

// ============ NAVIGATION ============
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('section-' + sectionId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionId) btn.classList.add('active');
    });

    App.visitedSections.add(sectionId);
    updateProgress();
    document.getElementById('sidebar').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function updateProgress() {
    const total = App.getTotalSections();
    const percent = total > 0 ? Math.round((App.visitedSections.size / total) * 100) : 0;
    document.getElementById('progress-percent').textContent = percent + '%';
    document.getElementById('progress-fill').style.width = percent + '%';
}

function switchChapter(chapter) {
    App.currentChapter = chapter;

    document.querySelectorAll('.chapter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.chapter === chapter);
    });

    document.querySelectorAll('.ch-nav').forEach(nav => nav.classList.remove('active'));
    const navEl = document.querySelector(`.${chapter}-nav`);
    if (navEl) navEl.classList.add('active');

    const ch = App.chapters[chapter];
    if (ch) showSection(ch.overviewSection);
    if (typeof Gamify !== 'undefined') Gamify.onChapterVisit(chapter);
}

// ============ BUILD SIDEBAR FROM REGISTERED CHAPTERS ============
function buildSidebar() {
    const tabsContainer = document.getElementById('chapter-tabs');
    const navContainer = document.getElementById('nav-links');
    tabsContainer.innerHTML = '';
    navContainer.innerHTML = '';

    App.chapterOrder.forEach((chId, idx) => {
        const ch = App.chapters[chId];

        // Tab button
        const btn = document.createElement('button');
        btn.className = 'chapter-tab' + (idx === 0 ? ' active' : '');
        btn.dataset.chapter = chId;
        btn.textContent = ch.label;
        btn.onclick = () => switchChapter(chId);
        tabsContainer.appendChild(btn);

        // Nav group
        const navDiv = document.createElement('div');
        navDiv.className = `ch-nav ${chId}-nav` + (idx === 0 ? ' active' : '');

        ch.navItems.forEach(item => {
            const navBtn = document.createElement('button');
            navBtn.className = 'nav-btn';
            navBtn.dataset.section = item.id;
            navBtn.innerHTML = `<span class="nav-icon">${item.icon}</span><span>${item.label}</span>`;
            navBtn.onclick = () => showSection(item.id);
            navDiv.appendChild(navBtn);
        });

        navContainer.appendChild(navDiv);
    });
}

// ============ GENERIC QUIZ ENGINE (DETAILED STYLE) ============
function renderQuizDetailed(chapterId, containerId) {
    const ch = App.chapters[chapterId];
    if (!ch) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    ch.quizState = { score: 0, answered: 0, correct: 0, wrong: 0 };

    const prefix = chapterId.replace('ch', '');

    ch.quizData.forEach((q) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `q${prefix}-card-${q.id}`;
        card.dataset.filter = q.difficulty;

        const diffLabel = q.difficulty === 'easy' ? '🟢 سهل' : q.difficulty === 'medium' ? '🟡 متوسط' : '🔴 صعب';
        const typeLabel = q.type === 'mcq' ? 'MCQ' : 'Essay';
        let bodyHTML = '';

        if (q.type === 'mcq') {
            const letters = ['A', 'B', 'C', 'D'];
            const optionsHTML = q.options.map((opt, i) => `
                <div class="q-option" data-qid="${prefix}-${q.id}" data-idx="${i}" onclick="selectOptionGeneric('${chapterId}', ${q.id}, ${i})">
                    <span class="option-letter">${letters[i]}</span>
                    <span>${opt}</span>
                </div>
            `).join('');
            bodyHTML = `
                <p class="q-text">${q.question}</p>
                <div class="q-options">${optionsHTML}</div>
                <div class="q-explanation" id="q${prefix}-exp-${q.id}">💡 ${q.explanation || ''}</div>
            `;
        } else {
            bodyHTML = `
                <p class="q-text">${q.question}</p>
                <textarea class="essay-textarea" placeholder="اكتب إجابتك هنا..."></textarea>
                <button class="show-answer-btn" onclick="showEssayGeneric('${chapterId}', ${q.id})">📖 أظهر الإجابة النموذجية</button>
                <div class="essay-answer" id="essay${prefix}-ans-${q.id}">
                    <strong>الإجابة النموذجية:</strong><br>${q.answer || ''}
                </div>
            `;
        }

        card.innerHTML = `
            <div class="question-header">
                <span class="q-number">${q.id}</span>
                <span class="q-difficulty ${q.difficulty}">${diffLabel}</span>
                <span class="q-type">${typeLabel}</span>
            </div>
            <div class="question-body">${bodyHTML}</div>
        `;
        container.appendChild(card);
    });
}

function selectOptionGeneric(chapterId, qid, selectedIdx) {
    const ch = App.chapters[chapterId];
    if (!ch) return;
    const prefix = chapterId.replace('ch', '');
    const q = ch.quizData.find(q => q.id === qid);
    if (!q) return;

    const card = document.getElementById(`q${prefix}-card-${qid}`);
    const options = card.querySelectorAll('.q-option');
    if (options[0].classList.contains('disabled')) return;

    options.forEach((opt, i) => {
        opt.classList.add('disabled');
        if (i === q.correct) opt.classList.add('show-correct');
    });

    if (selectedIdx === q.correct) {
        options[selectedIdx].classList.add('selected-correct');
        card.classList.add('answered-correct');
        ch.quizState.correct++;
        if (typeof Gamify !== 'undefined') Gamify.onCorrectAnswer(window.event);
    } else {
        options[selectedIdx].classList.add('selected-wrong');
        card.classList.add('answered-wrong');
        ch.quizState.wrong++;
        if (typeof Gamify !== 'undefined') Gamify.onWrongAnswer();
    }

    const expEl = document.getElementById(`q${prefix}-exp-${qid}`);
    if (expEl) expEl.classList.add('show');

    const correctEl = document.getElementById(`correct-count-${prefix}`);
    const wrongEl = document.getElementById(`wrong-count-${prefix}`);
    const percentEl = document.getElementById(`score-percent-${prefix}`);
    if (correctEl) correctEl.textContent = ch.quizState.correct;
    if (wrongEl) wrongEl.textContent = ch.quizState.wrong;
    const total = ch.quizState.correct + ch.quizState.wrong;
    const pctVal = total > 0 ? Math.round((ch.quizState.correct / total) * 100) : 0;
    if (percentEl) percentEl.textContent = pctVal + '%';

    // Check quiz completion
    const mcqCount = ch.quizData.filter(qq => qq.type === 'mcq').length;
    if (total === mcqCount && typeof Gamify !== 'undefined') {
        Gamify.onQuizComplete(chapterId, pctVal);
    }
}

function showEssayGeneric(chapterId, qid) {
    const prefix = chapterId.replace('ch', '');
    const ansDiv = document.getElementById(`essay${prefix}-ans-${qid}`);
    if (ansDiv) ansDiv.classList.toggle('show');
}

function resetQuizGeneric(chapterId, containerId) {
    const ch = App.chapters[chapterId];
    if (!ch) return;
    ch.quizState = { score: 0, answered: 0, correct: 0, wrong: 0 };
    const prefix = chapterId.replace('ch', '');
    const el = (id) => document.getElementById(id);
    if (el(`correct-count-${prefix}`)) el(`correct-count-${prefix}`).textContent = '0';
    if (el(`wrong-count-${prefix}`)) el(`wrong-count-${prefix}`).textContent = '0';
    if (el(`score-percent-${prefix}`)) el(`score-percent-${prefix}`).textContent = '0%';
    renderQuizDetailed(chapterId, containerId);
}

function filterQuizGeneric(chapterId, containerId, filter) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (filter === 'all') {
        container.querySelectorAll('.question-card').forEach(c => c.style.display = '');
    } else {
        container.querySelectorAll('.question-card').forEach(c => {
            c.style.display = c.dataset.filter === filter ? '' : 'none';
        });
    }
}

// ============ GENERIC QUIZ ENGINE (COMPACT STYLE) ============
function renderQuizCompact(chapterId, containerId) {
    const ch = App.chapters[chapterId];
    if (!ch) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    ch.quizState = { score: 0, answered: 0, correct: 0, wrong: 0 };

    const mcqs = ch.quizData.filter(q => q.type === 'mcq');
    const essays = ch.quizData.filter(q => q.type === 'essay');
    const suffix = chapterId.replace('ch', '');

    mcqs.forEach(q => {
        const diffLabel = q.difficulty === 'easy' ? '🟢 سهل' : q.difficulty === 'medium' ? '🟡 متوسط' : '🔴 صعب';
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <div class="q-header"><span class="q-badge">${diffLabel}</span><span class="q-badge">MCQ</span></div>
            <p class="q-text">${q.question}</p>
            <div class="q-options">${q.options.map((opt, i) => `<button class="q-option" onclick="checkAnswerCompact('${chapterId}',this,${i},${q.correct})">${opt}</button>`).join('')}</div>
            <div class="q-feedback" style="display:none;"></div>
        `;
        container.appendChild(card);
    });

    essays.forEach(q => {
        const diffLabel = q.difficulty === 'easy' ? '🟢 سهل' : q.difficulty === 'medium' ? '🟡 متوسط' : '🔴 صعب';
        const card = document.createElement('div');
        card.className = 'question-card';
        card.innerHTML = `
            <div class="q-header"><span class="q-badge">${diffLabel}</span><span class="q-badge">Essay</span></div>
            <p class="q-text">${q.question}</p>
            <button class="q-option" onclick="this.style.display='none';this.nextElementSibling.style.display='block';" style="background:rgba(108,92,231,0.15);border-color:rgba(108,92,231,0.3);color:var(--primary-light);text-align:center;">👁️ إظهار الإجابة النموذجية</button>
            <div class="q-feedback" style="display:none;padding:1rem;background:rgba(0,184,148,0.08);border:1px solid rgba(0,184,148,0.2);border-radius:var(--radius-sm);"><p style="color:var(--success-light);font-size:0.9rem;">✅ ${q.answer}</p></div>
        `;
        container.appendChild(card);
    });

    const totalEl = document.getElementById(`score-total-${suffix}`);
    if (totalEl) totalEl.textContent = mcqs.length;
}

function checkAnswerCompact(chapterId, btn, selected, correct) {
    const ch = App.chapters[chapterId];
    if (!ch) return;
    const options = btn.parentElement.querySelectorAll('.q-option');
    if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

    options.forEach((opt, i) => {
        opt.style.pointerEvents = 'none';
        if (i === correct) opt.classList.add('correct');
    });

    if (selected === correct) {
        ch.quizState.correct++;
        if (typeof Gamify !== 'undefined') Gamify.onCorrectAnswer(window.event);
    } else {
        btn.classList.add('wrong');
        if (typeof Gamify !== 'undefined') Gamify.onWrongAnswer();
    }

    ch.quizState.answered++;
    const mcqCount = ch.quizData.filter(q => q.type === 'mcq').length;
    const suffix = chapterId.replace('ch', '');
    if (ch.quizState.answered === mcqCount) {
        const scoreDiv = document.getElementById(`quiz-score-${suffix}`);
        if (scoreDiv) scoreDiv.style.display = 'block';
        const numEl = document.getElementById(`score-num-${suffix}`);
        if (numEl) numEl.textContent = ch.quizState.correct;
        const pct = Math.round((ch.quizState.correct / mcqCount) * 100);
        const msgEl = document.getElementById(`score-msg-${suffix}`);
        if (msgEl) msgEl.textContent = pct >= 80 ? '🎉 ممتاز!' : pct >= 60 ? '👍 جيد، واصل!' : '💪 راجع المادة وحاول مرة ثانية';
    }
}

// ============ GENERIC FLASHCARD ENGINE ============
function renderFlashcardGeneric(chapterId) {
    const ch = App.chapters[chapterId];
    if (!ch || !ch.flashcardData.length) return;
    const suffix = chapterId.replace('ch', '');
    const idx = ch.flashcardState.current;
    const fc = ch.flashcardData[idx];

    const frontEl = document.getElementById(`fc-front-${suffix}`);
    const backEl = document.getElementById(`fc-back-${suffix}`);
    const counterEl = document.getElementById(`fc-counter-${suffix}`);
    const currentEl = document.getElementById(`fc-current-${suffix}`);
    const totalEl = document.getElementById(`fc-total-${suffix}`);
    const flashcardEl = document.getElementById(`flashcard-${suffix}`);
    const dotsEl = document.getElementById(`fc-dots-${suffix}`);

    if (frontEl) frontEl.innerHTML = `<p>${fc.front}</p>`;
    if (backEl) backEl.innerHTML = `<p>${fc.back}</p>`;
    if (counterEl) counterEl.textContent = `${idx + 1} / ${ch.flashcardData.length}`;
    if (currentEl) currentEl.textContent = idx + 1;
    if (totalEl) totalEl.textContent = ch.flashcardData.length;
    if (flashcardEl) flashcardEl.classList.remove('flipped');

    if (dotsEl) {
        dotsEl.innerHTML = '';
        ch.flashcardData.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'fc-dot' + (i === idx ? ' active' : '');
            dot.onclick = () => { ch.flashcardState.current = i; renderFlashcardGeneric(chapterId); };
            dotsEl.appendChild(dot);
        });
    }
}

function nextCardGeneric(chapterId) {
    const ch = App.chapters[chapterId];
    if (!ch) return;
    ch.flashcardState.current = (ch.flashcardState.current + 1) % ch.flashcardData.length;
    renderFlashcardGeneric(chapterId);
    if (typeof Gamify !== 'undefined') Gamify.onFlashcardReview();
}

function prevCardGeneric(chapterId) {
    const ch = App.chapters[chapterId];
    if (!ch) return;
    ch.flashcardState.current = (ch.flashcardState.current - 1 + ch.flashcardData.length) % ch.flashcardData.length;
    renderFlashcardGeneric(chapterId);
}

// ============ BACKWARD COMPAT WRAPPERS (Ch5 uses old function names in HTML) ============
// These wrap the generic engine for Ch5 which has onclick handlers in HTML
function selectOption(qid, idx) { selectOptionGeneric('ch5', qid, idx); }
function showEssayAnswer(qid) { showEssayGeneric('ch5', qid); }
function resetQuiz() { resetQuizGeneric('ch5', 'questions-container'); }
function filterQuiz(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch5', 'questions-container', filter);
}
function renderQuiz(filter) { renderQuizDetailed('ch5', 'questions-container'); }
function renderFlashcard() { renderFlashcardGeneric('ch5'); }
function flipCard(el) { el.classList.toggle('flipped'); }
function nextCard() { nextCardGeneric('ch5'); }
function prevCard() { prevCardGeneric('ch5'); }
function updateScore() {
    const ch = App.chapters['ch5'];
    if (!ch) return;
    document.getElementById('correct-count').textContent = ch.quizState.correct;
    document.getElementById('wrong-count').textContent = ch.quizState.wrong;
    const total = ch.quizState.correct + ch.quizState.wrong;
    const percent = total > 0 ? Math.round((ch.quizState.correct / total) * 100) : 0;
    document.getElementById('score-percent').textContent = percent + '%';
}

// Ch6 backward compat wrappers
function selectOption6(qid, idx) { selectOptionGeneric('ch6', qid, idx); }
function showEssayAnswer6(qid) { showEssayGeneric('ch6', qid); }
function resetQuiz6() { resetQuizGeneric('ch6', 'questions-container-6'); }
function filterQuiz6(filter) {
    document.querySelectorAll('#section-ch6-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch6', 'questions-container-6', filter);
}
function renderQuiz6(filter) { renderQuizDetailed('ch6', 'questions-container-6'); }
function renderFlashcard6() { renderFlashcardGeneric('ch6'); }
function nextCard6() { nextCardGeneric('ch6'); }
function prevCard6() { prevCardGeneric('ch6'); }

// Ch7 backward compat wrappers
function renderQuiz7() { renderQuizDetailed('ch7', 'questions-container-7'); }
function resetQuiz7() { resetQuizGeneric('ch7', 'questions-container-7'); }
function filterQuiz7(filter) {
    document.querySelectorAll('#section-ch7-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch7', 'questions-container-7', filter);
}
function renderFlashcard7() { renderFlashcardGeneric('ch7'); }
function nextCard7() { nextCardGeneric('ch7'); }
function prevCard7() { prevCardGeneric('ch7'); }

// Ch1 backward compat wrappers
function renderQuiz1() { renderQuizDetailed('ch1', 'questions-container-1'); }
function resetQuiz1() { resetQuizGeneric('ch1', 'questions-container-1'); }
function filterQuiz1(filter) {
    document.querySelectorAll('#section-ch1-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch1', 'questions-container-1', filter);
}
function renderFlashcard1() { renderFlashcardGeneric('ch1'); }
function nextCard1() { nextCardGeneric('ch1'); }
function prevCard1() { prevCardGeneric('ch1'); }

// Ch2 backward compat wrappers
function renderQuiz2() { renderQuizDetailed('ch2', 'questions-container-2'); }
function resetQuiz2() { resetQuizGeneric('ch2', 'questions-container-2'); }
function filterQuiz2(filter) {
    document.querySelectorAll('#section-ch2-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch2', 'questions-container-2', filter);
}
function renderFlashcard2() { renderFlashcardGeneric('ch2'); }
function nextCard2() { nextCardGeneric('ch2'); }
function prevCard2() { prevCardGeneric('ch2'); }

// Ch3 backward compat wrappers
function renderQuiz3() { renderQuizDetailed('ch3', 'questions-container-3'); }
function resetQuiz3() { resetQuizGeneric('ch3', 'questions-container-3'); }
function filterQuiz3(filter) {
    document.querySelectorAll('#section-ch3-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch3', 'questions-container-3', filter);
}
function renderFlashcard3() { renderFlashcardGeneric('ch3'); }
function nextCard3() { nextCardGeneric('ch3'); }
function prevCard3() { prevCardGeneric('ch3'); }

// Ch4 backward compat wrappers
function renderQuiz4() { renderQuizDetailed('ch4', 'questions-container-4'); }
function resetQuiz4() { resetQuizGeneric('ch4', 'questions-container-4'); }
function filterQuiz4(filter) {
    document.querySelectorAll('#section-ch4-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch4', 'questions-container-4', filter);
}
function renderFlashcard4() { renderFlashcardGeneric('ch4'); }
function nextCard4() { nextCardGeneric('ch4'); }
function prevCard4() { prevCardGeneric('ch4'); }

// Ch8 backward compat wrappers
function renderQuiz8() { renderQuizDetailed('ch8', 'questions-container-8'); }
function resetQuiz8() { resetQuizGeneric('ch8', 'questions-container-8'); }
function filterQuiz8(filter) {
    document.querySelectorAll('#section-ch8-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch8', 'questions-container-8', filter);
}
function renderFlashcard8() { renderFlashcardGeneric('ch8'); }
function nextCard8() { nextCardGeneric('ch8'); }
function prevCard8() { prevCardGeneric('ch8'); }

// Ch9 backward compat wrappers
function renderQuiz9() { renderQuizDetailed('ch9', 'questions-container-9'); }
function resetQuiz9() { resetQuizGeneric('ch9', 'questions-container-9'); }
function filterQuiz9(filter) {
    document.querySelectorAll('#section-ch9-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch9', 'questions-container-9', filter);
}
function renderFlashcard9() { renderFlashcardGeneric('ch9'); }
function nextCard9() { nextCardGeneric('ch9'); }
function prevCard9() { prevCardGeneric('ch9'); }

// Ch10 backward compat wrappers
function renderQuiz10() { renderQuizDetailed('ch10', 'questions-container-10'); }
function resetQuiz10() { resetQuizGeneric('ch10', 'questions-container-10'); }
function filterQuiz10(filter) {
    document.querySelectorAll('#section-ch10-quiz .filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterQuizGeneric('ch10', 'questions-container-10', filter);
}
function renderFlashcard10() { renderFlashcardGeneric('ch10'); }
function nextCard10() { nextCardGeneric('ch10'); }
function prevCard10() { prevCardGeneric('ch10'); }

// ============ KEYBOARD NAV ============
document.addEventListener('keydown', (e) => {
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection || !activeSection.id.includes('flashcard')) return;

    for (const chId of App.chapterOrder) {
        const suffix = chId.replace('ch', '');
        if (activeSection.id === `section-${chId}-flashcards` || activeSection.id === 'section-flashcards') {
            if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                const fc = document.getElementById(`flashcard-${suffix}`) || document.querySelector('.flashcard');
                if (fc) fc.classList.toggle('flipped');
            } else if (e.key === 'ArrowLeft') {
                nextCardGeneric(chId);
            } else if (e.key === 'ArrowRight') {
                prevCardGeneric(chId);
            }
            break;
        }
    }
});

// Close sidebar on mobile click outside
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('mobile-toggle');
    if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    }
});
