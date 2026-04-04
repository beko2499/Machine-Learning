/* ============================================
   SPLASH.JS - ML Brain Splash Screen
   ============================================ */

function createBrainSVG() {
    return `
    <svg viewBox="0 0 120 120" class="brain-svg" style="width:100%;height:100%;">
        <defs>
            <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#60a5fa"/>
                <stop offset="50%" stop-color="#2563eb"/>
                <stop offset="100%" stop-color="#10b981"/>
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>
        <!-- Brain outline -->
        <path d="M60 15 C35 15 20 35 20 55 C20 72 30 85 45 90 L45 100 C45 103 48 105 50 105 L70 105 C72 105 75 103 75 100 L75 90 C90 85 100 72 100 55 C100 35 85 15 60 15Z" 
              fill="none" stroke="url(#brainGrad)" stroke-width="2.5" filter="url(#glow)"/>
        <!-- Brain center line -->
        <path d="M60 20 L60 85" fill="none" stroke="url(#brainGrad)" stroke-width="1.5" opacity="0.5"/>
        <!-- Left brain curves -->
        <path d="M55 30 C40 30 30 40 30 50" fill="none" stroke="#60a5fa" stroke-width="1.5" opacity="0.6"/>
        <path d="M55 45 C42 45 35 55 35 65" fill="none" stroke="#60a5fa" stroke-width="1.5" opacity="0.6"/>
        <path d="M50 60 C40 60 32 68 35 78" fill="none" stroke="#60a5fa" stroke-width="1.5" opacity="0.6"/>
        <!-- Right brain curves -->
        <path d="M65 30 C80 30 90 40 90 50" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.6"/>
        <path d="M65 45 C78 45 85 55 85 65" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.6"/>
        <path d="M70 60 C80 60 88 68 85 78" fill="none" stroke="#10b981" stroke-width="1.5" opacity="0.6"/>
        <!-- Neural nodes -->
        <circle cx="40" cy="35" r="3" fill="#60a5fa" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="80" cy="35" r="3" fill="#10b981" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="35" cy="55" r="3" fill="#60a5fa" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="85" cy="55" r="3" fill="#10b981" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="42" cy="72" r="3" fill="#8b5cf6" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="78" cy="72" r="3" fill="#f59e0b" opacity="0.8">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="50" r="4" fill="#2563eb" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <!-- Connection lines (neural network style) -->
        <line x1="40" y1="35" x2="60" y2="50" stroke="#60a5fa" stroke-width="0.8" opacity="0.3"/>
        <line x1="80" y1="35" x2="60" y2="50" stroke="#10b981" stroke-width="0.8" opacity="0.3"/>
        <line x1="35" y1="55" x2="60" y2="50" stroke="#60a5fa" stroke-width="0.8" opacity="0.3"/>
        <line x1="85" y1="55" x2="60" y2="50" stroke="#10b981" stroke-width="0.8" opacity="0.3"/>
        <line x1="42" y1="72" x2="60" y2="50" stroke="#8b5cf6" stroke-width="0.8" opacity="0.3"/>
        <line x1="78" y1="72" x2="60" y2="50" stroke="#f59e0b" stroke-width="0.8" opacity="0.3"/>
    </svg>`;
}

function triggerDataRain() {
    const container = document.getElementById('data-rain');
    if (!container) return;
    
    const terms = [
        'ML', 'AI', 'Data', 'Train', 'Predict',
        'Neural', 'Learn', 'Model', 'SVM', 'Bayes',
        'Python', 'NumPy', 'Pandas', 'Classify',
        '0101', '1010', 'f(x)', 'Σ', '∇', 'θ',
        'Regression', 'Cluster', 'Feature', 'Label'
    ];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.className = 'data-drop';
            drop.textContent = terms[Math.floor(Math.random() * terms.length)];
            drop.style.left = Math.random() * 100 + '%';
            drop.style.animationDelay = (Math.random() * 0.5) + 's';
            drop.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
            drop.style.color = ['#60a5fa', '#10b981', '#8b5cf6', '#f59e0b'][Math.floor(Math.random() * 4)];
            container.appendChild(drop);
        }, i * 80);
    }
    
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            if (splash) splash.style.display = 'none';
        }, 800);
    }, 2500);
}

// Set brain SVG on load
document.addEventListener('DOMContentLoaded', () => {
    const brainEl = document.getElementById('splash-brain');
    if (brainEl) brainEl.innerHTML = createBrainSVG() + '<div class="brain-glow"></div>';
});
