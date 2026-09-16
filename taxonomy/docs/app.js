// Main Application JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderCards();
    animateCounters();
    initFilters();
    initSearch();
    initModal();
    initKeyboard();
}

// ===== Card Rendering =====
function renderCards() {
    renderCategoryCards('intents', taxonomyData.intents, 'intents-grid');
    renderCategoryCards('techniques', taxonomyData.techniques, 'techniques-grid');
    renderCategoryCards('evasions', taxonomyData.evasions, 'evasions-grid');
    renderCategoryCards('inputs', taxonomyData.inputs, 'inputs-grid');
    updateStats();
}

function deliveryLabel(d) {
    return d === 'direct' ? 'Direct'
        : d === 'indirect' ? 'Indirect'
        : 'Either';
}

function renderCategoryCards(category, items, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const labels = { techniques: 'Technique', evasions: 'Evasion', intents: 'Intent', inputs: 'Input' };
    const ordered = items
        .map((item, idx) => ({ item, idx }))
        .sort((a, b) => a.item.title.localeCompare(b.item.title, 'en', { sensitivity: 'base' }));

    grid.innerHTML = ordered.map(({ item, idx }) => {
        const delivery = item.delivery ? `<span class="delivery-dot delivery-${item.delivery}" title="${deliveryLabel(item.delivery)}"></span>` : '';
        const localTag = item.local ? '<span class="local-tag">LOCAL</span>' : '';
        const aliases = item.aliases && item.aliases.length
            ? `<p class="card-aka"><span class="card-aka-label">aka</span> ${escapeHtml(item.aliases.join(' · '))}</p>`
            : '';
        const examples = item.examples ? item.examples.length : 0;
        const ideas = item.ideas ? item.ideas.length : 0;

        return `
        <div class="card ${category}" data-category="${category}" data-index="${idx}" data-title="${escapeHtml(item.title.toLowerCase())}" data-description="${escapeHtml((item.description || '').toLowerCase())}" data-aliases="${escapeHtml((item.aliases || []).join(' | ').toLowerCase())}" data-code="${(item.code || '').toLowerCase()}" data-delivery="${item.delivery || ''}" data-local="${item.local ? 'local' : ''}">
            <div class="card-header">
                <div class="card-title-wrap">
                    ${item.code ? `<span class="card-code">${item.code}</span>` : ''}
                    <h3 class="card-title">${escapeHtml(item.title)}</h3>
                </div>
                <div class="card-tags">
                    ${localTag}
                    ${delivery}
                    <span class="card-badge">${labels[category]}</span>
                </div>
            </div>
            <p class="card-description">${escapeHtml(item.description)}</p>
            ${aliases}
            <div class="card-footer">
                <div class="card-meta">
                    <span class="card-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                        ${ideas} ideas
                    </span>
                    ${category !== 'inputs' ? `
                    <span class="card-meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
                        ${examples} prompts
                    </span>
                    ` : ''}
                </div>
                <span class="card-view-more">
                    View
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </span>
            </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.dataset.category;
            const index = parseInt(card.dataset.index);
            openModal(cat, index);
        });
    });
}

// ===== Stats Animation =====
function animateCounters() {
    const counts = [
        { el: 'total-count', key: 'total' },
        { el: 'intents-count', key: 'intents' },
        { el: 'techniques-count', key: 'techniques' },
        { el: 'evasions-count', key: 'evasions' },
        { el: 'inputs-count', key: 'inputs' }
    ];
    counts.forEach(({ el, key }) => {
        const target = taxonomyData[key]?.length || 0;
        const element = document.getElementById(el);
        if (!element) return;
        animateNumber(element, target, 1200);
    });
}

function animateNumber(element, target, duration) {
    const startTime = performance.now();
    const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(eased * target);
        element.textContent = current;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

// ===== Filters =====
function initFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });
}

function applyFilter(filter) {
    const sections = { techniques: 'techniques-section', evasions: 'evasions-section', intents: 'intents-section', inputs: 'inputs-section' };
    Object.entries(sections).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (el) {
            if (filter === 'all' || key === filter) {
                el.classList.remove('hidden');
                el.style.animation = 'none';
                el.offsetHeight; // trigger reflow
                el.style.animation = '';
            } else {
                el.classList.add('hidden');
            }
        }
    });
}

// ===== Search =====
function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    let timer;
    input.addEventListener('input', (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => performSearch(e.target.value.trim().toLowerCase()), 200);
    });
}

function performSearch(query) {
    const cards = document.querySelectorAll('.card');
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.dataset.title || '';
        const desc = card.dataset.description || '';
        const aliases = card.dataset.aliases || '';
        const code = card.dataset.code || '';
        const meta = `${card.dataset.local || ''} ${card.dataset.delivery || ''}`;
        const match = !query || title.includes(query) || desc.includes(query) || aliases.includes(query) || code.includes(query) || meta.includes(query);
        card.classList.toggle('hidden', !match);
        if (match) visibleCount++;
    });

    // Show/hide section headers based on visibility
    document.querySelectorAll('.category-section').forEach(section => {
        const visibleCards = section.querySelectorAll('.card:not(.hidden)');
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.style.display = visibleCards.length > 0 ? 'flex' : 'none';
        }
        if (query && visibleCards.length === 0 && !section.classList.contains('hidden')) {
            // Check if section has any cards at all
            const allCards = section.querySelectorAll('.card');
            if (allCards.length === 0) section.style.display = 'none';
        }
    });

    showNoResults(query, visibleCount, cards.length);
}

function showNoResults(query, visibleTotal, cardTotal) {
    let noResults = document.getElementById('no-results');
    if (query && visibleTotal === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.id = 'no-results';
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <p>No results found</p>
                <p class="no-results-sub">Try different keywords or clear the search</p>
            `;
            document.querySelector('.main-content').appendChild(noResults);
        } else {
            noResults.style.display = 'block';
        }
    } else if (noResults) {
        noResults.style.display = 'none';
    }
}

// ===== Modal =====
function initModal() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
}

function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(category, index) {
    const data = taxonomyData[category]?.[index];
    if (!data) return;

    const overlay = document.getElementById('modal-overlay');

    document.getElementById('modal-category').textContent = categoryLabels[category];
    document.getElementById('modal-code').textContent = data.code || '';

    const deliveryEl = document.getElementById('modal-delivery');
    if (data.delivery) {
        deliveryEl.style.display = 'inline-flex';
        deliveryEl.innerHTML = `<span class="delivery-dot delivery-${data.delivery}"></span> ${deliveryLabel(data.delivery)}`;
    } else {
        deliveryEl.style.display = 'none';
    }

    document.getElementById('modal-local-callout').style.display = data.local ? 'flex' : 'none';
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-description').textContent = data.description || '';

    // Aliases
    const aliasesSection = document.getElementById('modal-aliases-section');
    const aliasesEl = document.getElementById('modal-aliases');
    if (data.aliases && data.aliases.length > 0) {
        aliasesSection.style.display = 'block';
        aliasesEl.innerHTML = data.aliases.map(a => `<li class="alias-chip">${escapeHtml(a)}</li>`).join('');
    } else {
        aliasesSection.style.display = 'none';
    }

    // Ideas
    const ideasSection = document.getElementById('modal-ideas-section');
    const ideasEl = document.getElementById('modal-ideas');
    if (data.ideas && data.ideas.length > 0) {
        ideasSection.style.display = 'block';
        ideasEl.innerHTML = data.ideas.map(i => `<li>${escapeHtml(i)}</li>`).join('');
    } else {
        ideasSection.style.display = 'none';
    }

    // Examples
    const examplesSection = document.getElementById('modal-examples-section');
    const examplesEl = document.getElementById('modal-examples');
    const examplesHeading = document.getElementById('modal-examples-heading');
    if (data.examples && data.examples.length > 0) {
        examplesSection.style.display = 'block';
        examplesHeading.textContent = category === 'inputs' ? 'Examples' : 'Example Prompts';
        examplesEl.innerHTML = data.examples.map(e => `<li>${escapeHtml(e)}</li>`).join('');
    } else {
        examplesSection.style.display = 'none';
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Helpers =====
const categoryLabels = { techniques: 'Technique', evasions: 'Evasion', intents: 'Intent', inputs: 'Input' };

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
