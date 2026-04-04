/* ============================================
   INIT.JS - Application Initialization
   Machine Learning Edition
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Build sidebar from registered chapters
    buildSidebar();

    // Initialize quizzes for each chapter
    for (const chId of App.chapterOrder) {
        const ch = App.chapters[chId];
        const suffix = chId.replace('ch', '');
        const containerId = `questions-container-${suffix}`;
        const container = document.getElementById(containerId);
        if (container) {
            renderQuizDetailed(chId, containerId);
        }
        renderFlashcardGeneric(chId);
    }

    // Update progress
    updateProgress();

    // Initialize Gamification System
    if (typeof Gamify !== 'undefined') Gamify.init();

    // Set first chapter as active
    if (App.chapterOrder.length > 0) {
        App.currentChapter = App.chapterOrder[0];
    }

    // Initialize TTS
    if (speechSynthesis.getVoices().length > 0) injectTTSButtons();
    speechSynthesis.onvoiceschanged = () => injectTTSButtons();

    // Initialize word click popup
    initWordClickPopup();
});
