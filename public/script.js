/**
 * @file script.js
 * @description Foundation script for Election Citizen Service App
 * @version 1.2.0
 */

// We assume brain.js loaded ELECTION_KNOWLEDGE before us.
const KNOWLEDGE = window.ELECTION_KNOWLEDGE || {};

document.addEventListener('DOMContentLoaded', () => {

    // ── 0. DOM CACHE ───────────────────────────────────────────────────
    const dom = {
        html: document.documentElement,
        navItems: document.querySelectorAll('.nav-item[data-target]'),
        modules: document.querySelectorAll('.module'),
        btnOpenAssistant: document.getElementById('btn-open-assistant'),
        themeBtn: document.getElementById('theme-btn'),
        langDropdown: document.getElementById('langDropdown'),
        userInput: document.getElementById('user-input'),
        sendBtn: document.getElementById('send-btn'),
        chatArea: document.getElementById('chat-area'),
        chatForm: document.getElementById('chat-form'),
        typingIndicator: document.getElementById('typing-indicator'),
        charCounter: document.getElementById('char-counter'),
        chipContainer: document.querySelector('.chip-scroll'),
        timelineContainer: document.getElementById('timeline-container'),
        candidateGrid: document.getElementById('candidate-grid'),
        complaintForm: document.getElementById('complaint-form'),
        complaintDesc: document.getElementById('complaint-desc'),
        descCounter: document.getElementById('desc-counter'),
        complaintSuccess: document.getElementById('complaint-success'),
        resultsTableBody: document.getElementById('results-table-body'),
        partySummaryGrid: document.getElementById('party-summary-grid'),
        antifakeContainer: document.getElementById('antifake-myths-container')
    };

    // ── 1. MODULE ROUTING ───────────────────────────────────────────────
    function switchModule(targetId) {
        dom.modules.forEach(mod => {
            mod.classList.remove('active');
            if (mod.id === targetId) mod.classList.add('active');
        });

        dom.navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === targetId) item.classList.add('active');
        });

        // Scroll to top when switching
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    dom.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchModule(item.getAttribute('data-target'));
        });
    });

    if (dom.btnOpenAssistant) {
        dom.btnOpenAssistant.addEventListener('click', () => {
            switchModule('module-assistant');
            dom.userInput.focus();
        });
    }

    // ── 2. THEME ────────────────────────────────────────────────────────
    const savedTheme = localStorage.getItem('eg-theme');
    if (savedTheme) dom.html.setAttribute('data-theme', savedTheme);

    if (dom.themeBtn) {
        dom.themeBtn.addEventListener('click', () => {
            const next = dom.html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            dom.html.setAttribute('data-theme', next);
            localStorage.setItem('eg-theme', next);
        });
    }

    // ── 3. UTILITIES ───────────────────────────────────────────────────
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = (input || "").trim().substring(0, 300);
        return div.innerHTML;
    }

    // ── 4. COUNTDOWN TIMER ──────────────────────────────────────────────
    const countdownTarget = new Date('May 15, 2029 08:00:00').getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownTarget - now;
        const ids = ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'];

        if (distance < 0) {
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = id === 'cd-days' ? '000' : '00';
            });
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const vals = [d.toString().padStart(3, '0'), h.toString().padStart(2, '0'), m.toString().padStart(2, '0'), s.toString().padStart(2, '0')];
        ids.forEach((id, i) => {
            const el = document.getElementById(id);
            if (el) el.textContent = vals[i];
        });
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ── 5. TRANSLATIONS ──────────────────────────────────────────────────
    const TRANSLATIONS = {
        en: {
            nav: ['Home', 'Ask Assistant', 'Timeline', 'Polling Support', 'Results', 'Help'],
            welcome: 'Welcome Citizen — Your Democratic Guide',
            actions: ['Understand Election', 'Find Polling Booth', 'Check Eligibility', 'Ask AI Assistant', 'View FAQs', 'See Results'],
            countdownLabel: 'Time Remaining to Next Election',
            noticesHeading: 'Latest Official Notices',
            pollingHeadings: ['Booth Locator', 'Voting Timings', 'Accepted Identity Documents', 'Accessibility Support', 'Emergency Helplines'],
            acceptedIds: ['Voter ID (EPIC)', 'Aadhaar Card', 'Passport', 'Driving Licence', 'PAN Card', 'MNREGA Job Card', 'Bank Passbook', 'Smart Card'],
            helplineLabels: ['National Voter Helpline (ECI)', 'Women Helpline', 'Disability Support', 'Police Emergency'],
            complaintLabels: { category: 'Category *', desc: 'Description *', location: 'Location', phone: 'Contact Number (Optional)', submit: 'Submit Complaint', track: 'Track Your Complaint', trackBtn: 'Track' },
            complaintCategories: ['Name Missing from Voter List', 'Booth Access Issue', 'Officer Misconduct', 'Bribery Attempt', 'Violence / Intimidation', 'Technical EVM Issue', 'Other'],
            resultsHeaders: ['Constituency', 'Leading Candidate', 'Party', 'Votes', 'Status'],
            antifakeHeading: 'Official Clarifications — Verified by Election Commission',
            footerDisclaimer: 'This platform provides educational information only and is not affiliated with any political party.',
            aiPlaceholder: 'Ask about elections, voting…'
        },
        hi: {
            nav: ['होम', 'सहायक', 'समयरेखा', 'मतदान सहायता', 'परिणाम', 'सहायता'],
            welcome: 'स्वागत नागरिक — आपकी लोकतांत्रिक मार्गदर्शिका',
            actions: ['चुनाव समझें', 'मतदान केंद्र खोजें', 'पात्रता जाँचें', 'AI सहायक से पूछें', 'FAQ देखें', 'परिणाम देखें'],
            countdownLabel: 'अगले चुनाव में शेष समय',
            noticesHeading: 'नवीनतम आधिकारिक सूचनाएं',
            pollingHeadings: ['मतदान केंद्र खोजें', 'मतदान का समय', 'स्वीकृत पहचान दस्तावेज', 'विकलांगता सहायता', 'आपातकालीन हेल्पलाइन'],
            acceptedIds: ['मतदाता पहचान पत्र', 'आधार कार्ड', 'पासपोर्ट', 'ड्राइविंग लाइसेंस', 'पैन कार्ड', 'मनरेगा जॉब कार्ड', 'बैंक पासबुक', 'स्मार्ट कार्ड'],
            helplineLabels: ['राष्ट्रीय मतदाता हेल्पलाइन', 'महिला हेल्पलाइन', 'दिव्यांग सहायता', 'पुलिस'],
            complaintLabels: { category: 'श्रेणी *', desc: 'विवरण *', location: 'स्थान', phone: 'संपर्क नंबर (वैकल्पिक)', submit: 'शिकायत दर्ज करें', track: 'शिकायत ट्रैक करें', trackBtn: 'ट्रैक' },
            complaintCategories: ['मतदाता सूची में नाम गायब', 'मतदान केंद्र पहुंच समस्या', 'अधिकारी का दुर्व्यवहार', 'रिश्वतखोरी का प्रयास', 'हिंसा / धमकी', 'ईवीएम तकनीकी समस्या', 'अन्य'],
            resultsHeaders: ['निर्वाचन क्षेत्र', 'आगे चल रहे प्रत्याशी', 'पार्टी', 'वोट', 'स्थिति'],
            antifakeHeading: 'आधिकारिक स्पष्टीकरण — चुनाव आयोग द्वारा सत्यापित',
            footerDisclaimer: 'यह प्लेटफॉर्म केवल शैक्षिक जानकारी प्रदान करता है और किसी भी राजनीतिक दल से संबद्ध नहीं है।',
            aiPlaceholder: 'चुनाव, मतदान के बारे में पूछें…'
        },
        mr: {
            nav: ['मुख्यपृष्ठ', 'सहाय्यक', 'वेळापत्रक', 'मतदान सहाय्य', 'निकाल', 'मदत'],
            welcome: 'स्वागत नागरिक — तुमचे लोकशाही मार्गदर्शन',
            actions: ['निवडणूक समजा', 'मतदान केंद्र शोधा', 'पात्रता तपासा', 'AI सहाय्यकाला विचारा', 'FAQ पहा', 'निकाल पहा'],
            countdownLabel: 'पुढील निवडणुकीसाठी उर्वरित वेळ',
            noticesHeading: 'अलीकडील अधिकृत सूचना',
            pollingHeadings: ['मतदान केंद्र शोधा', 'मतदानाची वेळ', 'स्वीकृत ओळखपत्रे', 'दिव्यांग सहाय्य', 'आणीबाणी हेल्पलाइन'],
            acceptedIds: ['मतदार ओळखपत्र', 'आधार कार्ड', 'पासपोर्ट', 'वाहन चालक परवाना', 'पॅन कार्ड', 'मनरेगा जॉब कार्ड', 'बँक पासबुक', 'स्मार्ट कार्ड'],
            helplineLabels: ['राष्ट्रीय मतदार हेल्पलाइन', 'महिला हेल्पलाइन', 'दिव्यांग सहाय्य', 'पोलीस आणीबाणी'],
            complaintLabels: { category: 'श्रेणी *', desc: 'तपशील *', location: 'स्थान', phone: 'संपर्क क्रमांक (पर्यायी)', submit: 'तक्रार सादर करा', track: 'तक्रार ट्रॅक करा', trackBtn: 'ट्रॅक' },
            complaintCategories: ['मतदार यादीत नाव नाही', 'मतदान केंद्र प्रवेश समस्या', ' अधिकाऱ्याचे गैरवर्तन', 'लाचेचा प्रयत्न', 'हिंसा / धमकी', 'EVM तांत्रिक समस्या', 'इतर'],
            resultsHeaders: ['मतदारसंघ', 'आघाडीवर असलेले उमेदवार', 'पक्ष', 'मते', 'स्थिती'],
            antifakeHeading: 'अधिकृत स्पष्टीकरण — निवडणूक आयोगाद्वारे सत्यापित',
            footerDisclaimer: 'हे व्यासपीठ केवळ शैक्षणिक माहिती प्रदान करते आणि कोणत्याही राजकीय पक्षाशी संबंधित नाही.',
            aiPlaceholder: 'निवडणूक, मतदानाबद्दल विचारा…'
        }
    };

    function applyTranslations(lang) {
        const t = TRANSLATIONS[lang];
        if (!t) return;

        // Desktop Nav
        document.querySelectorAll('.desktop-nav .nav-item').forEach((el, i) => { if (t.nav[i]) el.textContent = t.nav[i]; });
        // Mobile Nav
        document.querySelectorAll('.mobile-nav .nav-item').forEach((el, i) => {
            const span = el.querySelectorAll('span')[1];
            if (span && t.nav[i]) span.textContent = t.nav[i];
        });

        const welcomeH2 = document.querySelector('.banner-content h2');
        if (welcomeH2) welcomeH2.textContent = t.welcome;

        document.querySelectorAll('.action-label').forEach((el, i) => { if (t.actions[i]) el.textContent = t.actions[i]; });

        const cdLabel = document.querySelector('.countdown-card h3');
        if (cdLabel) cdLabel.textContent = t.countdownLabel;

        const noticesH3 = document.querySelector('.latest-notices h3');
        if (noticesH3) noticesH3.textContent = t.noticesHeading;

        if (dom.userInput) dom.userInput.placeholder = t.aiPlaceholder;
        const footer = document.querySelector('.app-footer p');
        if (footer) footer.textContent = t.footerDisclaimer;

        document.querySelectorAll('#module-polling .ps-section-title').forEach((el, i) => {
            if (t.pollingHeadings[i]) el.textContent = ['📍 ', '🕖 ', '🪪 ', '♿ ', '📞 '][i] + t.pollingHeadings[i];
        });

        document.querySelectorAll('.id-card span').forEach((el, i) => { if (t.acceptedIds[i]) el.textContent = t.acceptedIds[i]; });
        document.querySelectorAll('.helpline-label').forEach((el, i) => { if (t.helplineLabels[i]) el.textContent = t.helplineLabels[i]; });
        document.querySelectorAll('.results-table th').forEach((el, i) => { if (t.resultsHeaders[i]) el.textContent = t.resultsHeaders[i]; });

        const catLabel = document.querySelector('label[for="complaint-category"]');
        if (catLabel) catLabel.firstChild.textContent = t.complaintLabels.category + ' ';
        if (dom.complaintForm) {
            const submitBtn = document.getElementById('complaint-submit-btn');
            if (submitBtn) submitBtn.textContent = t.complaintLabels.submit;
            const trackBtn = document.getElementById('track-btn');
            if (trackBtn) trackBtn.textContent = t.complaintLabels.trackBtn;
            const catSelect = document.getElementById('complaint-category');
            if (catSelect) {
                Array.from(catSelect.options).forEach((opt, i) => {
                    if (i > 0 && t.complaintCategories[i - 1]) opt.text = t.complaintCategories[i - 1];
                });
            }
        }
    }

    if (dom.langDropdown) {
        dom.langDropdown.addEventListener('change', (e) => applyTranslations(e.target.value));
    }

    // ── 6. ASSISTANT CHAT ENGINE ────────────────────────────────────────
    let conversationHistory = [];
    const SYSTEM_PROMPT = "You are the Election Guide AI, a helpful and neutral assistant for the Election Citizen Services platform. Provide factual, non-partisan information about Indian elections, procedures, and voter rights. If asked for political opinions or predictions, remain neutral. Use English, Hindi, or Marathi based on user preference.";

    const keywordMap = new Map();
    for (const [key, topicData] of Object.entries(KNOWLEDGE)) {
        topicData.keywords.forEach(keyword => keywordMap.set(keyword.toLowerCase(), key));
    }

    function detectTopicFast(inputText) {
        const text = inputText.toLowerCase();
        if ((text.includes('lok sabha') && text.includes('rajya sabha')) || text.includes('difference')) return 'lok_sabha_vs_rajya_sabha';
        if (text.includes('myth') || text.includes('rumor')) return 'election_myths';
        for (const [keyword, topicKey] of keywordMap.entries()) {
            if (text.includes(keyword)) return topicKey;
        }
        return null;
    }

    function scrollToBottom() {
        requestAnimationFrame(() => { if (dom.chatArea) dom.chatArea.scrollTop = dom.chatArea.scrollHeight; });
    }

    function appendAiMessage(htmlContent, source = 'offline') {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg-row ai-row';
        const sourceLabel = source === 'api' ? '<span>🌐 Live AI</span>' : '<span>📜 Official Knowledge Base</span>';
        msgDiv.innerHTML = `
            <div class="msg-avatar ai-avatar" aria-hidden="true">🤖</div>
            <div class="msg-bubble ai-bubble">
                ${htmlContent}
                <div class="msg-source">${sourceLabel}</div>
            </div>`;
        dom.chatArea.appendChild(msgDiv);

        // Update history (strip tags for API context)
        conversationHistory.push({ role: 'assistant', content: htmlContent.replace(/<[^>]*>/g, '') });
        if (conversationHistory.length > 8) conversationHistory.shift();

        scrollToBottom();
        console.log(`Assistant Response Source: ${source.toUpperCase()}`);
    }

    function appendUserMessage(sanitizedText) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg-row user-row';
        msgDiv.innerHTML = `<div class="msg-avatar user-avatar" aria-hidden="true">👤</div><div class="msg-bubble user-bubble"><p>${sanitizedText}</p></div>`;
        dom.chatArea.appendChild(msgDiv);

        // Update history
        conversationHistory.push({ role: 'user', content: sanitizedText });
        if (conversationHistory.length > 8) conversationHistory.shift();

        scrollToBottom();
    }

    function generateFollowUp(text) {
        const sanitizedText = sanitizeInput(text).replace(/'/g, "&#39;");
        return `<div class="followup-bar" style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--clr-border); display: flex; flex-wrap: wrap; gap: 6px;">
                <button class="chip" onclick="document.getElementById('user-input').value='${sanitizedText}'; document.getElementById('chat-form').dispatchEvent(new Event('submit'));">${sanitizedText}</button>
            </div>`;
    }

    function buildResponse(topicKey, userInput) {
        const topicData = KNOWLEDGE[topicKey];
        if (!topicData) return null;
        
        const textLower = userInput.toLowerCase();
        const wantsSimple = textLower.includes('simplify') || textLower.includes('simple') || textLower.includes('easy');
        
        let html = '';

        // 1. Quick Answer
        html += `<p><strong>Quick Answer:</strong> ${topicData.quickAnswer}</p>`;

        // 2. Simplified Language check
        if (wantsSimple) {
            html += `<p style="font-style: italic; font-size: 13px; color: #2d7a3a;">Simplified for you: This helps make sure everyone gets a fair choice in who leads the country!</p>`;
        }

        // 3. Comparison Table handling
        if (topicData.comparisonTable) {
            const table = topicData.comparisonTable;
            html += `<div class="table-responsive"><table class="comparison-table"><thead><tr>`;
            table.headers.forEach(h => html += `<th>${h}</th>`);
            html += `</tr></thead><tbody>`;
            table.rows.forEach(row => {
                html += `<tr>`;
                row.forEach(cell => html += `<td>${cell}</td>`);
                html += `</tr>`;
            });
            html += `</tbody></table></div>`;
        }

        // 4. Myth-Reality handling
        if (topicData.myths) {
            topicData.myths.forEach(m => {
                html += `<div class="ai-myth-box">
                    <div class="ai-myth-label">Myth</div><p>${m.myth}</p>
                    <div class="ai-reality-label">Reality</div><p>${m.reality}</p>
                </div>`;
            });
        }

        // 5. Steps handling
        if (topicData.steps && topicData.steps.length > 0) {
            html += `<p><strong>Key Steps:</strong></p><ol>`;
            topicData.steps.forEach(step => html += `<li>${step}</li>`);
            html += `</ol>`;
        }

        // 6. Why It Matters
        if (topicData.whyItMatters) {
            html += `<p><strong>Why It Matters:</strong> ${topicData.whyItMatters}</p>`;
        }

        // 7. Follow Up Chips
        if (topicData.followUp) {
            html += generateFollowUp(topicData.followUp);
        }

        return html;
    }

    if (dom.userInput) {
        dom.userInput.addEventListener('input', () => {
            dom.userInput.style.height = 'auto';
            dom.userInput.style.height = dom.userInput.scrollHeight + 'px';
            const len = dom.userInput.value.length;
            dom.charCounter.textContent = `${len} / 300`;
            dom.sendBtn.disabled = len === 0 || window.isThinking;
        });
    }

    if (dom.chatForm) {
        dom.chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const rawVal = dom.userInput.value;
            const inputVal = sanitizeInput(rawVal);
            if (!inputVal || window.isThinking) return;

            window.isThinking = true;
            dom.userInput.value = '';
            dom.userInput.dispatchEvent(new Event('input'));

            appendUserMessage(inputVal);
            dom.typingIndicator.style.display = 'flex';

            let responseContent = null;
            let responseSource = 'offline';

            // 1. OFFLINE KNOWLEDGE FIRST
            const topicKey = detectTopicFast(inputVal);
            const offlineResp = buildResponse(topicKey, inputVal);
            
            const isPolitical = ['who will win', 'best party', 'vote for', 'bjp', 'congress', 'modi', 'rahul'].some(t => inputVal.toLowerCase().includes(t));
            
            if (isPolitical) {
                responseContent = `<p><strong>Political Neutrality:</strong> As a government-grade educational assistant, I maintain strict neutrality. I cannot comment on parties, leaders, or predictions. Please ask me about voting procedures, rights, or election history.</p>`;
                responseSource = 'offline';
            } else if (offlineResp) {
                responseContent = offlineResp;
                responseSource = 'offline';
            }

            // 2. API CALL IF NO OFFLINE MATCH
            if (!responseContent) {
                try {
                    console.log("Attempting secure proxy API call...");
                    const apiResponse = await fetch("/api/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ messages: conversationHistory })
                    });

                    if (apiResponse.ok) {
                        const data = await apiResponse.json();
                        if (data && data.content) {
                            responseContent = `<p>${data.content.replace(/\n/g, '<br>')}</p>`;
                            responseSource = 'api';
                        }
                    } else {
                        const errorData = await apiResponse.json();
                        console.error("Proxy API Error:", errorData);
                        responseContent = `<p><strong>Service Issue:</strong> The live AI service returned an error. Falling back to local mode.</p>`;
                    }
                } catch (err) {
                    console.error("Proxy connection failed:", err);
                    responseContent = `<p><strong>Connection Error:</strong> Could not connect to the assistant server. Please ensure the server is running.</p>`;
                }
            }

            // 3. FINAL FALLBACK
            if (!responseContent) {
                responseContent = `<p>I don't have a specific answer for that. Try asking about "How to vote" or "Voter rights".</p>`;
                responseSource = 'offline';
            }

            // 4. DISPLAY WITH 1200MS DELAY
            setTimeout(() => {
                dom.typingIndicator.style.display = 'none';
                appendAiMessage(responseContent, responseSource);
                window.isThinking = false;
                dom.userInput.focus();
            }, 1200);
        });
    }

    if (dom.chipContainer) {
        dom.chipContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.chip');
            if (chip && !window.isThinking) {
                dom.userInput.value = chip.querySelector('.chip-text')?.textContent.trim() || chip.textContent.trim();
                dom.userInput.dispatchEvent(new Event('input'));
                dom.chatForm.dispatchEvent(new Event('submit'));
            }
        });
    }

    // ── 6.5 VOTER EDUCATION HUB LOGIC ──────────────────────────────────
    const btnOpenEducation = document.getElementById('btn-open-education');
    if (btnOpenEducation) {
        btnOpenEducation.addEventListener('click', () => switchModule('module-education'));
    }

    const eduCards = document.querySelectorAll('.edu-card');
    eduCards.forEach(card => {
        const header = card.querySelector('.edu-card-header');
        const body = card.querySelector('.edu-card-body');
        
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Mobile Rule: Only one section open at a time
            if (window.innerWidth < 768 && !isExpanded) {
                eduCards.forEach(c => {
                    c.querySelector('.edu-card-header').setAttribute('aria-expanded', 'false');
                    c.querySelector('.edu-card-body').hidden = true;
                });
            }

            header.setAttribute('aria-expanded', !isExpanded);
            body.hidden = isExpanded;
        });
    });

    // ── 7. TIMELINE ────────────────────────────────────────────────────
    const ELECTION_STAGES = [
        { num: 1, icon: '📢', name: 'Election Announced', date: '01 Jan 2029', status: 'completed', desc: 'ECI announces schedule.', detail: 'MCC begins immediately.', citizenAction: 'Check ECI website.' },
        { num: 2, icon: '📝', name: 'Nomination Filing', date: '10 Jan 2029', status: 'completed', desc: 'Candidates file forms.', detail: 'Affidavits submitted.', citizenAction: 'Review affidavits.' },
        { num: 3, icon: '🔍', name: 'Scrutiny', date: '15 Jan 2029', status: 'completed', desc: 'Nominations checked.', detail: 'Eligibility verified.', citizenAction: 'View candidate lists.' },
        { num: 4, icon: '🚪', name: 'Withdrawal', date: '18 Jan 2029', status: 'active', desc: 'Final lists published.', detail: 'Last date to pull out.', citizenAction: 'Check final ballot.' },
        { num: 5, icon: '📣', name: 'Campaigning', date: '19 Jan 2029', status: 'upcoming', desc: 'Rallies and canvassing.', detail: 'MCC active.', citizenAction: 'Attend meetings.' },
        { num: 6, icon: '🤫', name: 'Silence Period', date: '06 Feb 2029', status: 'upcoming', desc: '48 hours before voting.', detail: 'No campaigning.', citizenAction: 'Report violations.' },
        { num: 7, icon: '🗳️', name: 'Polling Day', date: '08 Feb 2029', status: 'upcoming', desc: 'Citizens vote.', detail: 'Use EVM/VVPAT.', citizenAction: 'Bring valid ID.' },
        { num: 8, icon: '📊', name: 'Counting', date: '12 Feb 2029', status: 'upcoming', desc: 'Results declared.', detail: 'EVMs tallied.', citizenAction: 'Follow official ECI results.' }
    ];

    function renderTimeline() {
        if (!dom.timelineContainer) return;
        const completed = ELECTION_STAGES.filter(s => s.status === 'completed').length;
        const pct = Math.round((completed / ELECTION_STAGES.length) * 100);
        const pFill = document.getElementById('timeline-progress-fill');
        const pPct = document.getElementById('timeline-progress-pct');
        if (pFill) pFill.style.width = pct + '%';
        if (pPct) pPct.textContent = pct + '%';

        dom.timelineContainer.innerHTML = '';
        ELECTION_STAGES.forEach((s, i) => {
            const el = document.createElement('div');
            el.className = `timeline-stage ${s.status === 'active' ? 'active' : ''}`;
            el.innerHTML = `<div class="stage-connector"><div class="stage-circle status-${s.status}">${s.icon}</div></div>
        <div class="stage-body"><div class="stage-num">Stage ${s.num}</div><div class="stage-name">${s.name}</div><div class="stage-date">${s.date}</div><div class="stage-desc">${s.desc}</div>
        <div class="stage-expanded-detail" style="display:none;"><p>${s.detail}</p><div class="stage-action-box">${s.citizenAction}</div></div></div>`;
            el.addEventListener('click', () => {
                const d = el.querySelector('.stage-expanded-detail');
                d.style.display = d.style.display === 'none' ? 'block' : 'none';
            });
            dom.timelineContainer.appendChild(el);
        });
    }

    document.querySelectorAll('.nav-item[data-target="module-timeline"]').forEach(l => l.addEventListener('click', () => setTimeout(renderTimeline, 50)));

    // ── 8. RESULTS HUB ──────────────────────────────────────────────────
    const PARTY_DATA = [
        { name: 'NDA Alliance', won: 187, leading: 106, total: 293 },
        { name: 'INDIA Alliance', won: 141, leading: 91, total: 232 },
        { name: 'Others', won: 19, leading: 6, total: 25 }
    ];

    function renderResults() {
        if (dom.partySummaryGrid) {
            dom.partySummaryGrid.innerHTML = '';
            PARTY_DATA.forEach(p => {
                const div = document.createElement('div');
                div.className = 'party-card';
                div.innerHTML = `<div class="party-name">${p.name}</div><div class="party-seats-won">${p.won}</div><div class="party-seats-lead">+${p.leading} leading</div>`;
                dom.partySummaryGrid.appendChild(div);
            });
        }
        if (dom.resultsTableBody) {
            dom.resultsTableBody.innerHTML = '<tr><td>New Delhi</td><td>Ramesh B</td><td>NDA</td><td>4,82,116</td><td><span class="badge-final">Final</span></td></tr>';
        }
    }
    document.querySelectorAll('.nav-item[data-target="module-results"]').forEach(l => l.addEventListener('click', () => setTimeout(renderResults, 50)));

    // ── 9. COMPLAINTS ───────────────────────────────────────────────────
    const complaintTimestamps = [];
    if (dom.complaintForm) {
        dom.complaintForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const now = Date.now();
            const windowTime = now - 300000;
            while (complaintTimestamps.length > 0 && complaintTimestamps[0] < windowTime) complaintTimestamps.shift();
            if (complaintTimestamps.length >= 3) {
                dom.complaintSuccess.style.display = 'block';
                dom.complaintSuccess.textContent = 'Rate limit exceeded. Try later.';
                return;
            }
            complaintTimestamps.push(now);
            dom.complaintSuccess.style.display = 'block';
            dom.complaintSuccess.innerHTML = `✅ Submitted! Ref: ECS-${now}`;
            dom.complaintForm.reset();
        });
    }

    // ── 10. ANTI-MISINFORMATION ────────────────────────────────────────
    const MYTHS = [
        { m: "Vote is not secret", r: "It is 100% secret." },
        { m: "EVMs hacked", r: "EVMs are offline standalone devices." }
    ];
    function renderMyths() {
        if (!dom.antifakeContainer || dom.antifakeContainer.childElementCount > 0) return;
        MYTHS.forEach(x => {
            const d = document.createElement('div');
            d.className = 'myth-card';
            d.innerHTML = `<div class="myth-text">Myth: ${x.m}</div><div class="reality-text">Reality: ${x.r}</div>`;
            dom.antifakeContainer.appendChild(d);
        });
    }
    document.querySelectorAll('.nav-item[data-target="module-help"]').forEach(l => l.addEventListener('click', () => setTimeout(renderMyths, 50)));

    // Initial render
    updateCountdown();
    if (document.getElementById('module-timeline')?.classList.contains('active')) renderTimeline();

});
