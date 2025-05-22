// --- app.js ---
document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area');
    const currentYearSpan = document.getElementById('current-year');
    const largeCountdownDisplay = document.getElementById('large-countdown-timer');
    let largeCountdownInterval = null;
    let deferredInstallPrompt = null;
    const installButtonContainer = document.getElementById('install-button-container');
    const appTitleH1 = document.getElementById('app-title');
    const pageTitleTag = document.querySelector('title');
    const htmlTag = document.documentElement;

    let currentLanguage = localStorage.getItem('brainPowerMWLang') || (navigator.language.startsWith('ja') ? 'ja' : 'en');
    const languageToggleBtn = document.getElementById('language-toggle-btn');

    // --- Hamburger Menu Elements ---
    const hamburgerMenuButton = document.getElementById('hamburger-btn'); 
    const mainNavElement = document.getElementById('main-nav'); 
    const navButtons = mainNavElement ? mainNavElement.querySelectorAll('button[data-page]') : [];

    if (hamburgerMenuButton && mainNavElement) {
        hamburgerMenuButton.addEventListener('click', () => {
            mainNavElement.classList.toggle('nav-open');
            const icon = hamburgerMenuButton.querySelector('i');
            const isExpanded = mainNavElement.classList.contains('nav-open');
            hamburgerMenuButton.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navButtons.forEach(button => {
            button.addEventListener('click', () => { 
                if (mainNavElement.classList.contains('nav-open')) {
                    mainNavElement.classList.remove('nav-open');
                    const icon = hamburgerMenuButton.querySelector('i');
                    if (icon) { // Check if icon exists
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    hamburgerMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    } else {
        console.error("Hamburger button (#hamburger-btn) or main navigation (#main-nav) not found. Check HTML IDs.");
    }
    // --- End Mobile Navigation Toggle ---

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- HELPER FUNCTIONS ---
    function formatTime(totalSeconds) {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "0:00";
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function clearLargeCountdown() {
        if (largeCountdownInterval) {
            clearInterval(largeCountdownInterval);
            largeCountdownInterval = null;
        }
        if (largeCountdownDisplay) largeCountdownDisplay.style.display = 'none';
    }

    function updateInitialTimeDisplay(audioEl) {
        const timeDisplay = document.getElementById(`time-${audioEl.id}`);
        if (timeDisplay) {
            if (audioEl.duration && !isNaN(audioEl.duration) && audioEl.duration > 0) {
                const displayCurrentTime = (audioEl.currentTime > 0 && audioEl.currentTime < audioEl.duration && !audioEl.ended) ? audioEl.currentTime : 0;
                timeDisplay.textContent = `${formatTime(displayCurrentTime)} / ${formatTime(audioEl.duration)}`;
            } else {
                timeDisplay.textContent = `0:00 / --:--`;
            }
        }
    }
    
    window.loadColoringImage = (imageSrc) => {
        const container = document.getElementById('coloring-image-container');
        if (container) {
            container.innerHTML = `<img src="${imageSrc}" alt="Coloring Page Preview" style="max-width:100%; height:auto; border-radius: 8px;">`;
        }
    };
    // --- END OF HELPER FUNCTIONS ---

    // langStrings and pages are now expected to be globally defined by language_strings.js and page_content.js

    // --- Practice Data (audio file mappings) ---
    const practiceData = [ 
        {
            categoryKey: "coreMindfulnessCategory",
            tracks: [
                { id: "audio-quick-calm-list", titleKey: "quickCalmTitle", descriptionKey: "quickCalmDesc", src: "audio/quick_calm_1min.mp3" },
                { id: "audio-breathing-3min", titleKey: "breathing3MinTitle", descriptionKey: "breathing3MinDesc", src: "audio/mindful_breathing_3min.mp3" },
                { id: "audio-breathing-5min", titleKey: "breathing5MinTitle", descriptionKey: "breathing5MinDesc", src: "audio/mindful_breathing_5min.mp3" },
                { id: "audio-body-scan-10min", titleKey: "bodyScan10MinTitle", descriptionKey: "bodyScan10MinDesc", src: "audio/body_scan_10min.mp3" },
                { id: "audio-listening-sounds-3min", titleKey: "listeningSounds3MinTitle", descriptionKey: "listeningSounds3MinDesc", src: "audio/mindful_listening_sounds_3min.mp3" }
            ]
        },
        {
            categoryKey: "thoughtsFeelingsCategory",
            tracks: [
                { id: "audio-thoughts-clouds-5min", titleKey: "thoughtsClouds5MinTitle", descriptionKey: "thoughtsClouds5MinDesc", src: "audio/thoughts_as_clouds_5min.mp3" },
                { id: "audio-stop-practice-2min", titleKey: "stopPractice2MinTitle", descriptionKey: "stopPractice2MinDesc", src: "audio/stop_practice_2min.mp3" }
            ]
        },
        {
            categoryKey: "kindnessGratitudeCategory",
            tracks: [
                { id: "audio-kindness-5min", titleKey: "kindness5MinTitle", descriptionKey: "kindness5MinDesc", src: "audio/loving_kindness_5min.mp3" },
                { id: "audio-gratitude-4min", titleKey: "gratitude4MinTitle", descriptionKey: "gratitude4MinDesc", src: "audio/gratitude_reflection_4min.mp3" }
            ]
        }
    ];
    
    function translatePage() {
        // Ensure langStrings is defined before using it
        if (typeof langStrings === 'undefined') {
            console.error("langStrings object is not defined. Make sure language_strings.js is loaded correctly.");
            return;
        }

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            const langObject = langStrings[currentLanguage] || langStrings.en; 

            if (langObject && langObject[key] !== undefined) {
                if (el.tagName === 'TEXTAREA' && key === 'gratitudePlaceholder') {
                    el.placeholder = langObject[key];
                } else {
                    el.innerHTML = langObject[key];
                }
            } else if (langStrings.en[key] !== undefined) { 
                 if (el.tagName === 'TEXTAREA' && key === 'gratitudePlaceholder') {
                    el.placeholder = langStrings.en[key];
                } else {
                    el.innerHTML = langStrings.en[key];
                }
            }
        });

        htmlTag.lang = currentLanguage;
        pageTitleTag.textContent = langStrings[currentLanguage]?.appTitle || langStrings.en.appTitle;
        if (appTitleH1) {
             appTitleH1.textContent = langStrings[currentLanguage]?.appTitle || langStrings.en.appTitle;
        }

        if (languageToggleBtn) {
            languageToggleBtn.textContent = currentLanguage === 'en' ? 
                (langStrings.en.toggleToJapanese || "日本語へ") : 
                (langStrings.jp.toggleToEnglish || "To English");
        }
        
        const practicesPage = document.getElementById('practices-page');
        if (practicesPage && practicesPage.classList.contains('active')) {
            renderPractices(true); 
        }
        
        const installBtn = document.getElementById('install-app-button');
        if (installBtn) {
            installBtn.textContent = langStrings[currentLanguage]?.installAppBtn || langStrings.en.installAppBtn;
        }
        
        const activePageContent = document.querySelector('.page-content.active');
        if (activePageContent) {
            activePageContent.querySelectorAll('.practice-controls button').forEach(btn => {
                const action = btn.dataset.action;
                let icon = btn.innerHTML.match(/^(▶ |❚❚ |↺ )/) ? btn.innerHTML.match(/^(▶ |❚❚ |↺ )/)[0] : '';

                if (action === 'play') {
                     if (icon.includes("❚❚")) icon = icon.replace("❚❚ ","▶ ");
                     btn.innerHTML = (icon || '▶ ') + (langStrings[currentLanguage]?.playBtn || langStrings.en.playBtn);
                } else if (action === 'pause') { 
                     if (icon.includes("▶")) icon = icon.replace("▶ ","❚❚ ");
                     btn.innerHTML = (icon || '❚❚ ') + (langStrings[currentLanguage]?.pauseBtn || langStrings.en.pauseBtn);
                } else if (action === 'restart') {
                    btn.innerHTML = (icon || '↺ ') + (langStrings[currentLanguage]?.restartBtn || langStrings.en.restartBtn);
                }
            });
             if(activePageContent.id === 'student-zone-page') {
                const gratitudeList = document.getElementById('gratitude-list');
                if(gratitudeList) {
                    gratitudeList.querySelectorAll('button.general-app-button').forEach(delBtn => {
                        delBtn.textContent = langStrings[currentLanguage]?.deleteBtnText || langStrings.en.deleteBtnText;
                    });
                }
                 const addGratitudeButton = document.getElementById('add-gratitude-btn');
                if(addGratitudeButton) {
                    addGratitudeButton.textContent = langStrings[currentLanguage]?.addGratitudeBtn || langStrings.en.addGratitudeBtn;
                }
            }
        }
        if (hamburgerMenuButton) { 
            hamburgerMenuButton.setAttribute('aria-label', currentLanguage === 'en' ? "Toggle navigation menu" : "ナビゲーションメニューを開閉");
        }
    }
    
    function renderPractices(isTranslationUpdate = false) {
        const container = document.getElementById('practice-list-container');
        if (!container) {
            if (!isTranslationUpdate) console.error("Practice list container not found");
            return;
        }
         if (typeof langStrings === 'undefined') {
            console.error("langStrings not available for renderPractices");
            return;
        }
        let html = '';
        practiceData.forEach(category => {
            const categoryTitle = langStrings[currentLanguage]?.[category.categoryKey] || langStrings.en[category.categoryKey];
            html += `<div class="practice-category"><h3>${categoryTitle}</h3><ul class="practice-list">`;
            category.tracks.forEach(track => {
                const trackTitle = langStrings[currentLanguage]?.[track.titleKey] || langStrings.en[track.titleKey];
                const trackDescription = langStrings[currentLanguage]?.[track.descriptionKey] || langStrings.en[track.descriptionKey];
                html += `
                    <li id="li-${track.id}">
                        <h3>${trackTitle}</h3>
                        <p class="practice-description">${trackDescription}</p>
                        <audio id="${track.id}" src="${track.src}" preload="metadata"></audio>
                        <div class="practice-controls">
                            <button data-action="play" class="general-app-button" onclick="window.handleAudioControl('${track.id}', this)">${langStrings[currentLanguage]?.playBtn || langStrings.en.playBtn}</button>
                            <button data-action="restart" class="general-app-button restart-button" onclick="window.handleAudioControl('${track.id}', this)">${langStrings[currentLanguage]?.restartBtn || langStrings.en.restartBtn}</button>
                        </div>
                        <div class="progress-bar-container" onclick="window.seekAudio(event, '${track.id}')">
                            <div class="progress-bar" id="progress-${track.id}"></div>
                        </div>
                        <div class="time-display" id="time-${track.id}">0:00 / 0:00</div>
                    </li>
                `;
            });
            html += `</ul></div>`;
        });
        container.innerHTML = html;
        document.querySelectorAll('#practices-page audio').forEach(audioEl => {
            audioEl.onloadedmetadata = null; 
            audioEl.addEventListener('loadedmetadata', () => updateInitialTimeDisplay(audioEl), {once: true});
            if (audioEl.readyState >= 1 && audioEl.duration && !isNaN(audioEl.duration)) {
                updateInitialTimeDisplay(audioEl);
            }
        });
    }
    
    function setupFaqToggle() {
        const faqItems = document.querySelectorAll('.faq-section .faq-item'); 
        faqItems.forEach(item => {
            const questionEl = item.querySelector('.faq-question');
            const answerEl = item.querySelector('.faq-answer');
            if (questionEl && answerEl) {
                answerEl.style.display = "none";
                item.classList.remove('open');

                const newQuestionEl = questionEl.cloneNode(true); 
                questionEl.parentNode.replaceChild(newQuestionEl, questionEl);

                newQuestionEl.addEventListener('click', () => {
                    const isCurrentlyOpen = item.classList.contains('open');
                    
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            if (otherAnswer) otherAnswer.style.display = "none";
                        }
                    });

                    if (isCurrentlyOpen) {
                        item.classList.remove('open');
                        answerEl.style.display = "none";
                    } else {
                        item.classList.add('open');
                        answerEl.style.display = "block";
                    }
                });
            }
        });
    }

    function setupGratitudeJournal() {
        const addButton = document.getElementById('add-gratitude-btn');
        const gratitudeInput = document.getElementById('gratitude-input');
        const gratitudeList = document.getElementById('gratitude-list');

        if (!addButton || !gratitudeInput || !gratitudeList) return;
         if (typeof langStrings === 'undefined') {
            console.error("langStrings not available for setupGratitudeJournal");
            return;
        }

        let gratitudes = JSON.parse(localStorage.getItem('bpGratitudes')) || [];

        function renderGratitudes() {
            gratitudeList.innerHTML = '';
            gratitudes.forEach((item, index) => {
                const li = document.createElement('li');
                const textSpan = document.createElement('span');
                textSpan.textContent = item;
                li.appendChild(textSpan);
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = langStrings[currentLanguage]?.deleteBtnText || langStrings.en.deleteBtnText;
                deleteBtn.classList.add('general-app-button');
                deleteBtn.title = 'Delete this item';
                deleteBtn.onclick = (e) => { e.stopPropagation(); deleteGratitude(index); };
                li.appendChild(deleteBtn);
                gratitudeList.appendChild(li);
            });
        }

        function addGratitude() {
            const text = gratitudeInput.value.trim();
            if (text) {
                gratitudes.unshift(text);
                if (gratitudes.length > 20) gratitudes.pop();
                localStorage.setItem('bpGratitudes', JSON.stringify(gratitudes));
                gratitudeInput.value = '';
                renderGratitudes();
            }
        }

        function deleteGratitude(index) {
            gratitudes.splice(index, 1);
            localStorage.setItem('bpGratitudes', JSON.stringify(gratitudes));
            renderGratitudes();
        }
        
        const newAddButton = addButton.cloneNode(true);
        addButton.parentNode.replaceChild(newAddButton, addButton);
        newAddButton.addEventListener('click', addGratitude);
        newAddButton.textContent = langStrings[currentLanguage]?.addGratitudeBtn || langStrings.en.addGratitudeBtn;
        
        renderGratitudes();
    }
    
    window.loadPage = (pageName, isLangChange = false) => { 
        clearLargeCountdown();
        
        if (mainNavElement && mainNavElement.classList.contains('nav-open')) {
            const previouslyActivePageButton = mainNavElement.querySelector('button.active');
            const previouslyActivePage = previouslyActivePageButton ? previouslyActivePageButton.dataset.page : null;
             if (!isLangChange || (isLangChange && previouslyActivePage !== pageName)) {
                mainNavElement.classList.remove('nav-open');
                if (hamburgerMenuButton) {
                    const icon = hamburgerMenuButton.querySelector('i');
                    if (icon) { 
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    hamburgerMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
        }
        
        // Ensure 'pages' object is defined
        if (typeof pages === 'undefined') {
            console.error("Pages object is not defined. Make sure page_content.js is loaded correctly before app.js.");
            contentArea.innerHTML = `<p>Error: Page content not available.</p>`;
            return;
        }

        if (pages[pageName]) {
            const previouslyActivePageButton = mainNavElement ? mainNavElement.querySelector('button.active') : null;
            const previouslyActivePage = previouslyActivePageButton ? previouslyActivePageButton.dataset.page : null;

            if (!isLangChange || (isLangChange && previouslyActivePage !== pageName) ) {
                document.querySelectorAll('audio').forEach(audio => {
                    audio.pause(); 
                    audio.currentTime = 0;
                    const controlContainer = audio.closest('li, div#featured-practice');
                    if (controlContainer) {
                        const playButton = controlContainer.querySelector('button[data-action="pause"], button[data-action="play"]');
                        if (playButton) {
                            let currentIcon = playButton.innerHTML.match(/^(▶ |❚❚ |↺ )/) ? playButton.innerHTML.match(/^(▶ |❚❚ |↺ )/)[0] : '▶ ';
                            if (currentIcon.includes("❚❚")) currentIcon = currentIcon.replace("❚❚ ","▶ ");
                            playButton.innerHTML = currentIcon + (langStrings[currentLanguage]?.playBtn || langStrings.en.playBtn);
                            playButton.dataset.action = 'play';
                            playButton.classList.remove('playing');
                        }
                        const progressBar = controlContainer.querySelector('.progress-bar');
                        if (progressBar) progressBar.style.width = '0%';
                    }
                    updateInitialTimeDisplay(audio);
                });
            }

            contentArea.innerHTML = pages[pageName]; 
            
            if (pageName === 'practices') {
                renderPractices(); 
            } else if (pageName === 'teacherResources' || pageName === 'schoolPathways' || pageName === 'forParents' || pageName === 'researchEvidence') {
                setupFaqToggle();
            } else if (pageName === 'studentZone') {
                setupGratitudeJournal();
                 const coloringContainer = document.getElementById('coloring-image-container');
                 if (coloringContainer && !coloringContainer.querySelector('img')) {
                     coloringContainer.innerHTML = `<p data-lang-key="selectImagePrompt"></p>`;
                 }
            } else if (pageName === 'home') {
                const homeAudio = document.getElementById('audio-quick-calm');
                if (homeAudio) {
                     if (homeAudio.readyState >=1 && homeAudio.duration && !isNaN(homeAudio.duration)) {
                         updateInitialTimeDisplay(homeAudio);
                     } else {
                        homeAudio.onloadedmetadata = null;
                        homeAudio.addEventListener('loadedmetadata', () => updateInitialTimeDisplay(homeAudio), {once: true});
                     }
                }
            }
            
            const newPageContent = contentArea.querySelector('.page-content');
            document.querySelectorAll('.page-content.active').forEach(el => el.classList.remove('active'));
            if(newPageContent) newPageContent.classList.add('active');

            if (navButtons && navButtons.length > 0) { 
                navButtons.forEach(button => {
                    button.classList.remove('active');
                    if (button.dataset.page === pageName) {
                        button.classList.add('active');
                    }
                });
            }
            translatePage();
        } else {
            contentArea.innerHTML = `<p>Content for '${pageName}' not found.</p>`;
            console.error("Page key not found in pages object:", pageName);
        }
    }

    if (navButtons && navButtons.length > 0) { 
        navButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const pageName = event.target.dataset.page;
                window.loadPage(pageName);
            });
        });
    }
    
    window.handleAudioControl = (audioId, buttonEl) => {
        const audio = document.getElementById(audioId);
        if (!audio) { console.error("Audio element not found:", audioId); return; }
        if (typeof langStrings === 'undefined') { console.error("langStrings not available for handleAudioControl"); return;}
        
        const action = buttonEl.dataset.action;
        const controlContainer = buttonEl.closest('li') || buttonEl.closest('#featured-practice');
        if (!controlContainer) { console.error("Control container not found for button:", buttonEl); return; }
        const playPauseButton = controlContainer.querySelector('button[data-action="play"], button[data-action="pause"]');

        clearLargeCountdown();

        if (action === 'restart') {
            document.querySelectorAll('audio').forEach(otherAudio => {
                if (otherAudio !== audio && !otherAudio.paused) {
                    otherAudio.pause(); 
                    const otherContainer = otherAudio.closest('li, div#featured-practice');
                    if(otherContainer){
                        const otherPlayBtn = otherContainer.querySelector('button[data-action="pause"]');
                        if (otherPlayBtn) { 
                            otherPlayBtn.innerHTML = '▶ ' + (langStrings[currentLanguage]?.playBtn || langStrings.en.playBtn);
                            otherPlayBtn.dataset.action = 'play'; 
                            otherPlayBtn.classList.remove('playing'); 
                        }
                    }
                    updateProgress(otherAudio.id);
                }
            });
            audio.currentTime = 0;
            audio.play();
            if (playPauseButton) { 
                playPauseButton.innerHTML = '❚❚ ' + (langStrings[currentLanguage]?.pauseBtn || langStrings.en.pauseBtn);
                playPauseButton.dataset.action = 'pause'; 
                playPauseButton.classList.add('playing'); 
            }
            startLargeCountdown(audio);
        } else if (audio.paused) { 
            document.querySelectorAll('audio').forEach(otherAudio => { 
                if (otherAudio !== audio && !otherAudio.paused) {
                    otherAudio.pause();
                    const otherContainer = otherAudio.closest('li, div#featured-practice');
                     if(otherContainer){
                        const otherPlayBtn = otherContainer.querySelector('button[data-action="pause"]');
                        if (otherPlayBtn) { 
                            otherPlayBtn.innerHTML = '▶ ' + (langStrings[currentLanguage]?.playBtn || langStrings.en.playBtn);
                            otherPlayBtn.dataset.action = 'play'; 
                            otherPlayBtn.classList.remove('playing'); 
                        }
                    }
                    updateProgress(otherAudio.id);
                }
            });
            audio.play();
            if (playPauseButton) { 
                playPauseButton.innerHTML = '❚❚ ' + (langStrings[currentLanguage]?.pauseBtn || langStrings.en.pauseBtn);
                playPauseButton.dataset.action = 'pause'; 
                playPauseButton.classList.add('playing'); 
            }
            startLargeCountdown(audio);
        } else { 
            audio.pause();
            if (playPauseButton) { 
                playPauseButton.innerHTML = '▶ ' + (langStrings[currentLanguage]?.playBtn || langStrings.en.playBtn);
                playPauseButton.dataset.action = 'play'; 
                playPauseButton.classList.remove('playing'); 
            }
        }

        audio.ontimeupdate = () => updateProgress(audioId);
        audio.onended = () => {
            if (playPauseButton) { 
                playPauseButton.innerHTML = '▶ ' + (langStrings[currentLanguage]?.playBtn || langStrings.en.playBtn);
                playPauseButton.dataset.action = 'play'; 
                playPauseButton.classList.remove('playing'); 
            }
            const progressBar = controlContainer.querySelector('.progress-bar');
            if(progressBar) progressBar.style.width = '0%';
            updateInitialTimeDisplay(audio); 
            clearLargeCountdown();
        };
        
        if (audio.readyState < 1 || isNaN(audio.duration)) {
             audio.onloadedmetadata = null; 
             audio.addEventListener('loadedmetadata', function onMeta() {
                updateInitialTimeDisplay(audio);
                if (!audio.paused) startLargeCountdown(audio);
            }, {once: true});
        } else {
            updateInitialTimeDisplay(audio);
             if (!audio.paused) startLargeCountdown(audio);
        }
    };
    
    function startLargeCountdown(audio) {
        if (!audio || isNaN(audio.duration) || audio.duration === 0) {
            clearLargeCountdown();
            return;
        }
        clearLargeCountdown(); 
        if(largeCountdownDisplay) largeCountdownDisplay.style.display = 'block';
        
        function updateTimer() {
            if (!audio || audio.paused || audio.ended || isNaN(audio.duration) || isNaN(audio.currentTime) || audio.duration === 0) {
                clearLargeCountdown();
                return;
            }
            const timeLeft = audio.duration - audio.currentTime;
            if(largeCountdownDisplay) largeCountdownDisplay.textContent = formatTime(timeLeft);
        }
        updateTimer();
        largeCountdownInterval = setInterval(updateTimer, 1000);
    }

    function updateProgress(audioId) {
        const audio = document.getElementById(audioId);
        if (!audio) return;
        const controlContainer = audio.closest('li') || audio.closest('#featured-practice'); 
        if (!controlContainer) return;

        const progressBar = controlContainer.querySelector('.progress-bar');
        const timeDisplay = controlContainer.querySelector('.time-display');

        if (audio && progressBar && timeDisplay) {
            if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
                const totalDuration = formatTime(audio.duration);
                const currentTimeFormatted = formatTime(audio.currentTime);
                timeDisplay.textContent = `${currentTimeFormatted} / ${totalDuration}`;
            } else if (timeDisplay) {
                 const currentTimeFormatted = formatTime(audio.currentTime || 0);
                 timeDisplay.textContent = `${currentTimeFormatted} / --:--`;
            }
        }
    }
    
    window.seekAudio = (event, audioId) => {
        const audio = document.getElementById(audioId);
        const progressBarContainer = event.currentTarget;
        if (audio && audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
            const rect = progressBarContainer.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const barWidth = progressBarContainer.offsetWidth;
            const seekTime = (clickX / barWidth) * audio.duration;
            audio.currentTime = seekTime;
            updateProgress(audioId); 
            if(!audio.paused) {
                startLargeCountdown(audio);
            } else {
                const timeLeft = audio.duration - audio.currentTime;
                if(largeCountdownDisplay && largeCountdownDisplay.style.display === 'block') {
                    largeCountdownDisplay.textContent = formatTime(timeLeft);
                }
            }
        }
    };

    window.navigateToPractice = (audioIdToHighlight) => {
        window.loadPage('practices');
        setTimeout(() => { 
            const practiceAudioElement = document.getElementById(audioIdToHighlight);
            if (practiceAudioElement) {
                const practiceItem = practiceAudioElement.closest('li');
                if (practiceItem) {
                    practiceItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    practiceItem.classList.add('highlighted-practice');
                    setTimeout(() => practiceItem.classList.remove('highlighted-practice'), 2500);
                }
            } else {
                console.warn("Could not find practice item for ID:", audioIdToHighlight);
            }
        }, 250); 
    };

    window.addEventListener('beforeinstallprompt', (event) => { 
        event.preventDefault(); 
        deferredInstallPrompt = event;
        if(installButtonContainer) showInstallButton();
        console.log('`beforeinstallprompt` event was fired.');
    });
    function showInstallButton() { 
        if(!installButtonContainer) return;
         if (typeof langStrings === 'undefined') {
            console.error("langStrings not available for showInstallButton");
            return;
        }
        const installButton = document.createElement('button');
        installButton.id = 'install-app-button'; 
        installButton.classList.add('general-app-button');
        installButton.textContent = langStrings[currentLanguage]?.installAppBtn || langStrings.en.installAppBtn;
        installButtonContainer.innerHTML = ''; 
        installButtonContainer.appendChild(installButton);
        installButtonContainer.style.display = 'block'; 
        installButton.addEventListener('click', async () => { 
            installButtonContainer.style.display = 'none'; 
            if (deferredInstallPrompt) {
                deferredInstallPrompt.prompt();
                const { outcome } = await deferredInstallPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredInstallPrompt = null;
            }
        });
    }
    window.addEventListener('appinstalled', () => {
        if(installButtonContainer) installButtonContainer.style.display = 'none';
        deferredInstallPrompt = null;
        console.log('Brain Power MW PWA was installed');
    });
    if ('serviceWorker' in navigator) { 
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(error => {
                    if (!location.protocol.startsWith('file')) {
                        console.log('ServiceWorker registration failed: ', error);
                    }
                });
        });
    }
    
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'jp' : 'en';
            localStorage.setItem('brainPowerMWLang', currentLanguage);
            
            if (mainNavElement && mainNavElement.classList.contains('nav-open')) {
                mainNavElement.classList.remove('nav-open');
                if (hamburgerMenuButton) {
                    const icon = hamburgerMenuButton.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    hamburgerMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
            const currentPageButton = mainNavElement ? mainNavElement.querySelector('button.active') : null;
            if (currentPageButton) {
                window.loadPage(currentPageButton.dataset.page, true); 
            } else {
                window.loadPage('home', true); 
            }
        });
    }
    
    // Initial Page Load - Ensure global data objects are loaded from other files before this.
    if (typeof pages !== 'undefined' && typeof langStrings !== 'undefined') {
        window.loadPage('home'); 
    } else {
        console.error("Critical data (pages or langStrings) not loaded. Check script loading order in index.html.");
        contentArea.innerHTML = "<p>Error initializing application. Please ensure all scripts are loaded correctly.</p>";
    }
});