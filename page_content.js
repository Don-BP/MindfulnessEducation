// --- page_content.js ---
const pages = { 
    home: `
        <section id="home-page" class="page-content active">
            <div class="hero-section">
                <h2 data-lang-key="homeTitle"></h2>
                <p data-lang-key="homeSubtitle"></p>
                <button class="general-app-button hero-button" onclick="window.loadPage('practices')" data-lang-key="explorePracticesBtn"></button>
            </div>
            <div class="content-section" style="background-color: #e9f3fd; border-left: 5px solid #4A90E2; margin-bottom: 2em; padding: 1.5em; text-align:left;">
                <h3 data-lang-key="whyMWJapanTitle" style="color: #357ABD;"></h3>
                <p data-lang-key="whyMWJapanDesc"></p>
                <a href="#" onclick="window.loadPage('about'); return false;" data-lang-key="learnMoreAboutNeedLink" style="color: #4A90E2; font-weight: bold;"></a>
            </div>
            <div class="home-content-grid">
                <div class="home-card">
                    <img src="images/icon-students.png" alt="Students icon" class="home-card-icon">
                    <h3 data-lang-key="forStudentsTitle"></h3>
                    <p data-lang-key="forStudentsDesc"></p>
                    <button class="general-app-button" onclick="window.loadPage('studentZone')" data-lang-key="goToStudentZoneBtn"></button>
                </div>
                <div class="home-card">
                    <img src="images/icon-teachers.png" alt="Teachers icon" class="home-card-icon">
                    <h3 data-lang-key="forEducatorsTitle"></h3>
                    <p data-lang-key="forEducatorsDesc"></p>
                    <button class="general-app-button" onclick="window.loadPage('adultCurriculum')" data-lang-key="adultCurriculumBtn"></button>
                </div>
                <div class="home-card">
                     <img src="images/icon-resources.png" alt="Resources icon" class="home-card-icon">
                    <h3 data-lang-key="teacherResourcesTitle"></h3>
                    <p data-lang-key="teacherResourcesDesc"></p>
                    <button class="general-app-button" onclick="window.loadPage('teacherResources')" data-lang-key="viewResourcesBtn"></button>
                </div>
            </div>
            <div id="featured-practice">
                <h3 data-lang-key="featuredPracticeTitle"></h3>
                <audio id="audio-quick-calm" src="audio/quick_calm_1min.mp3" preload="metadata"></audio>
                <div class="practice-controls">
                    <button data-action="play" class="general-app-button" onclick="window.handleAudioControl('audio-quick-calm', this)" data-lang-key="playBtn"></button>
                    <button data-action="restart" class="general-app-button restart-button" onclick="window.handleAudioControl('audio-quick-calm', this)" data-lang-key="restartBtn"></button>
                </div>
                <div class="progress-bar-container" onclick="window.seekAudio(event, 'audio-quick-calm')">
                    <div class="progress-bar" id="progress-audio-quick-calm"></div>
                </div>
                <div class="time-display" id="time-audio-quick-calm">0:00 / 0:00</div>
                <p class="practice-description" data-lang-key="featuredPracticeDesc"></p>
            </div>
        </section>
    `,
    practices: `
        <section id="practices-page" class="page-content">
            <h2 data-lang-key="practicesTitle"></h2>
            <div id="practice-list-container"></div>
        </section>
    `,
    studentZone: `
        <section id="student-zone-page" class="page-content student-engagement-page">
            <h2 data-lang-key="studentZoneTitle"></h2>
            <p data-lang-key="studentZoneDesc"></p>
            <div class="engagement-section">
                <h3 data-lang-key="mindPuppyTitle"></h3>
                <img src="images/mind_puppy_icon.png" alt="Mind Puppy icon" style="max-width:100px; margin: 0 auto 1em auto; display:block;">
                <p data-lang-key="mindPuppyDesc"></p>
                <button class="general-app-button" onclick="window.navigateToPractice('audio-listening-sounds-3min')" data-lang-key="explorePracticesBtn" style="margin: 0.5em auto; display:block;"></button> 
            </div>
            <div class="engagement-section">
                <h3 data-lang-key="shakeFreezeTitle"></h3>
                <img src="images/shake_freeze_icon.png" alt="Shake & Freeze icon" style="max-width:100px; margin: 0 auto 1em auto; display:block;">
                <p data-lang-key="shakeFreezeDesc"></p>
            </div>
            <div class="engagement-section">
                <h3 data-lang-key="amazingBrainTitle"></h3>
                 <img src="images/amazing_brain_icon.png" alt="Brain icon" style="max-width:100px; margin: 0 auto 1em auto; display:block;">
                <p data-lang-key="amazingBrainDesc"></p>
            </div>
            <div class="engagement-section">
                <h3 data-lang-key="mindfulWalkingTitle"></h3>
                <p data-lang-key="mindfulWalkingDesc"></p>
            </div>
            <div class="engagement-section">
                <h3 data-lang-key="storyTimeTitle"></h3>
                <p data-lang-key="storyTimeDesc"></p>
            </div>
            <div class="engagement-section" id="mindful-coloring-section">
                <h3 data-lang-key="mindfulColoringTitle"></h3>
                <p data-lang-key="mindfulColoringDesc"></p>
                <div id="coloring-image-selector">
                    <button class="general-app-button" onclick="window.loadColoringImage('images/coloring_mandala.png')" data-lang-key="mandalaBtn"></button>
                    <button class="general-app-button" onclick="window.loadColoringImage('images/coloring_nature.png')" data-lang-key="natureSceneBtn"></button>
                </div>
                <div id="coloring-image-container">
                    <p data-lang-key="selectImagePrompt"></p> 
                </div>
                <p>
                    <a href="pdfs/coloring_mandala_printable.pdf" target="_blank" download data-lang-key="downloadMandalaLink"></a> | 
                    <a href="pdfs/coloring_nature_printable.pdf" target="_blank" download data-lang-key="downloadNatureLink"></a>
                </p>
            </div>
            <div class="engagement-section" id="gratitude-journal-section">
                <h3 data-lang-key="gratitudeJournalTitle"></h3>
                <p data-lang-key="gratitudeJournalDesc"></p>
                <textarea id="gratitude-input" data-lang-key="gratitudePlaceholder"></textarea>
                <button id="add-gratitude-btn" class="general-app-button" data-lang-key="addGratitudeBtn"></button>
                <h4 data-lang-key="myGratitudeListTitle"></h4>
                <ul id="gratitude-list"></ul>
            </div>
        </section>
    `,
    elementaryCurriculum: `
        <section id="elementary-curriculum-page" class="page-content curriculum-page">
            <h2 data-lang-key="esCurriculumTitle"></h2>
            <p data-lang-key="esCurriculumDesc"></p>
            
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek1Title"></h3>
                <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek1D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek1D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek1D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek1D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek1D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-breathing-3min'); return false;" data-lang-key="practiceBreathing3MinText"></a></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek2Title"></h3>
                <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek2D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek2D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek2D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek2D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek2D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-thoughts-clouds-5min'); return false;" data-lang-key="practiceObservingThoughts5MinText"></a></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek3Title"></h3>
                <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek3D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek3D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek3D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek3D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek3D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-stop-practice-2min'); return false;" data-lang-key="practiceStop2MinText"></a></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek4Title"></h3>
                <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek4D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek4D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek4D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek4D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek4D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-kindness-5min'); return false;" data-lang-key="practiceKindness5MinText"></a></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek5Title"></h3>
                <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek5D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek5D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek5D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek5D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek5D5"></span></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek6Title"></h3>
                 <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek6D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek6D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek6D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek6D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek6D5"></span></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek7Title"></h3>
                <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek7D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek7D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek7D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek7D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek7D5"></span></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="esWeek8Title"></h3>
                <p><strong data-lang-key="esDay1"></strong>: <span data-lang-key="esWeek8D1"></span></p>
                <p><strong data-lang-key="esDay2"></strong>: <span data-lang-key="esWeek8D2"></span></p>
                <p><strong data-lang-key="esDay3"></strong>: <span data-lang-key="esWeek8D3"></span></p>
                <p><strong data-lang-key="esDay4"></strong>: <span data-lang-key="esWeek8D4"></span></p>
                <p><strong data-lang-key="esDay5"></strong>: <span data-lang-key="esWeek8D5"></span></p>
            </div>
            <p data-lang-key="esTeacherNote"></p>
        </section>
    `,
    juniorHighCurriculum: `
        <section id="junior-high-curriculum-page" class="page-content curriculum-page">
            <h2 data-lang-key="jhsCurriculumTitle"></h2>
            <p data-lang-key="jhsCurriculumDesc"></p>
            <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek1Title"></h3>
                <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek1D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek1D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek1D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek1D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek1D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-breathing-5min'); return false;" data-lang-key="practiceBreathing5MinText"></a></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek2Title"></h3>
                <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek2D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek2D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek2D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek2D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek2D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-thoughts-clouds-5min'); return false;" data-lang-key="practiceObservingThoughts5MinText"></a></p>
            </div>
             <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek3Title"></h3>
                <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek3D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek3D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek3D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek3D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek3D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-stop-practice-2min'); return false;" data-lang-key="practiceStop2MinText"></a></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek4Title"></h3>
                <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek4D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek4D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek4D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek4D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek4D5"></span></p>
                <p><strong>Related Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-gratitude-4min'); return false;" data-lang-key="practiceGratitude4MinText"></a></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek5Title"></h3>
                <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek5D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek5D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek5D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek5D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek5D5"></span></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek6Title"></h3>
                 <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek6D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek6D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek6D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek6D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek6D5"></span></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek7Title"></h3>
                <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek7D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek7D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek7D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek7D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek7D5"></span></p>
            </div>
            <div class="curriculum-module">
                <h3 data-lang-key="jhsWeek8Title"></h3>
                <p><strong data-lang-key="jhsDay1"></strong>: <span data-lang-key="jhsWeek8D1"></span></p>
                <p><strong data-lang-key="jhsDay2"></strong>: <span data-lang-key="jhsWeek8D2"></span></p>
                <p><strong data-lang-key="jhsDay3"></strong>: <span data-lang-key="jhsWeek8D3"></span></p>
                <p><strong data-lang-key="jhsDay4"></strong>: <span data-lang-key="jhsWeek8D4"></span></p>
                <p><strong data-lang-key="jhsDay5"></strong>: <span data-lang-key="jhsWeek8D5"></span></p>
            </div>
            <p data-lang-key="jhsTeacherNote"></p>
        </section>
    `,
    adultCurriculum: `
        <section id="adult-curriculum-page" class="page-content curriculum-page">
            <h2 data-lang-key="adultCurriculumTitleFull"></h2>
            <p data-lang-key="adultCurriculumDescFull"></p>
            <div class="curriculum-module"><h3 data-lang-key="adultModule1Title"></h3><p data-lang-key="adultModule1Desc"></p><p><strong>Key Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-breathing-5min'); return false;" data-lang-key="practiceBreathing5MinText"></a></p></div>
            <div class="curriculum-module"><h3 data-lang-key="adultModule2Title"></h3><p data-lang-key="adultModule2Desc"></p><p><strong>Key Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-body-scan-10min'); return false;" data-lang-key="practiceBodyScan10MinText"></a></p></div>
            <div class="curriculum-module"><h3 data-lang-key="adultModule3Title"></h3><p data-lang-key="adultModule3Desc"></p><p><strong>Key Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-thoughts-clouds-5min'); return false;" data-lang-key="practiceObservingThoughts5MinText"></a></p></div>
            <div class="curriculum-module"><h3 data-lang-key="adultModule4Title"></h3><p data-lang-key="adultModule4Desc"></p><p><strong>Key Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-stop-practice-2min'); return false;" data-lang-key="practiceStop2MinText"></a></p></div>
            <div class="curriculum-module"><h3 data-lang-key="adultModule5Title"></h3><p data-lang-key="adultModule5Desc"></p><p><strong>Key Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-breathing-3min'); return false;" data-lang-key="practiceBreathing3MinText"></a></p></div>
            <div class="curriculum-module"><h3 data-lang-key="adultModule6Title"></h3><p data-lang-key="adultModule6Desc"></p><p><strong>Key Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-kindness-5min'); return false;" data-lang-key="practiceKindness5MinText"></a></p></div>
            <div class="curriculum-module"><h3 data-lang-key="adultModule7Title"></h3><p data-lang-key="adultModule7Desc"></p></div>
            <div class="curriculum-module"><h3 data-lang-key="adultModule8Title"></h3><p data-lang-key="adultModule8Desc"></p><p><strong>Key Practice:</strong> <a href="#" onclick="window.navigateToPractice('audio-gratitude-4min'); return false;" data-lang-key="practiceGratitude4MinText"></a></p></div>
        </section>
    `,
    forParents: `
        <section id="for-parents-page" class="page-content parents-page">
            <h2 data-lang-key="forParentsTitle"></h2>
            <p data-lang-key="forParentsDesc"></p>
            
            <div class="content-section">
                <h3 data-lang-key="parentsWhyMWTitle"></h3>
                <p data-lang-key="parentsWhyMWP1"></p>
                <p data-lang-key="parentsWhyMWP2"></p>
                <ul style="margin-top:1em;">
                    <li data-lang-key="parentsBenefitFocus"></li>
                    <li data-lang-key="parentsBenefitEmotions"></li>
                    <li data-lang-key="parentsBenefitResilience"></li>
                    <li data-lang-key="parentsBenefitKindness"></li>
                </ul>
            </div>
            
            <div class="content-section">
                <h3 data-lang-key="parentsSimplePracticesTitle"></h3>
                <p data-lang-key="parentsSimplePracticesIntro"></p>
                <p><strong data-lang-key="practiceMindfulMinuteTitle"></strong>: <span data-lang-key="practiceMindfulMinuteDesc"></span></p>
                <p><strong data-lang-key="practiceMindfulListeningTitle"></strong>: <span data-lang-key="practiceMindfulListeningDesc"></span></p>
                <p><strong data-lang-key="practiceGratitudeSharingTitle"></strong>: <span data-lang-key="practiceGratitudeSharingDesc"></span></p>
                <p><strong data-lang-key="practiceMindfulEatingTitle"></strong>: <span data-lang-key="practiceMindfulEatingDesc"></span></p>
            </div>
            
            <div class="content-section">
                <h3 data-lang-key="parentsSupportChildTitle"></h3>
                <p data-lang-key="parentsSupportChildP1"></p>
                <ul>
                    <li data-lang-key="supportTipCuriosity"></li>
                    <li data-lang-key="supportTipModel"></li>
                    <li data-lang-key="supportTipPatience"></li>
                    <li data-lang-key="supportTipOwnPractice"></li>
                </ul>
            </div>

            <div class="content-section">
                <h3 data-lang-key="parentsWorkingWithSchoolTitle"></h3>
                <p data-lang-key="parentsWorkingWithSchoolP1"></p>
            </div>

             <div class="content-section">
                <h3 data-lang-key="parentsFurtherResourcesTitle"></h3>
                <p data-lang-key="parentsMiSPLink"></p>
                <p data-lang-key="parentsMfCPLink"></p>
            </div>
        </section>
    `,
    schoolPathways: `
        <section id="school-pathways-page" class="page-content school-pathways-page">
            <h2 data-lang-key="schoolPathwaysTitle"></h2>
            <p data-lang-key="schoolPathwaysDesc"></p>
            <div class="content-section">
                <h3 data-lang-key="pathwayStep1Title"></h3>
                <p data-lang-key="pathwayStep1Desc"></p>
            </div>
            <div class="content-section">
                <h3 data-lang-key="pathwayStep2Title"></h3>
                <p data-lang-key="pathwayStep2Desc"></p>
            </div>
            <div class="content-section">
                <h3 data-lang-key="pathwayStep3Title"></h3>
                <p data-lang-key="pathwayStep3Desc"></p>
            </div>
            <div class="content-section">
                <h3 data-lang-key="pathwayStep4Title"></h3>
                <p data-lang-key="pathwayStep4Desc"></p>
            </div>
            <div class="content-section">
                 <p data-lang-key="pathwayMiSPLink"></p>
            </div>
        </section>
    `,
    teacherResources: `
        <section id="teacher-resources-page" class="page-content teacher-resources-page">
            <h2 data-lang-key="teacherResourcesTitleFull"></h2>
            <p data-lang-key="teacherResourcesDescFull"></p>
            <div class="resource-section">
                <h3 data-lang-key="implementingMWTitle"></h3>
                <p data-lang-key="implementingMWP1"></p>
                <p data-lang-key="implementingMWP2"></p>
            </div>

            <div class="resource-section">
                <h3 data-lang-key="mindfulMeCurriculumTitle"></h3>
                <p data-lang-key="mindfulMeCurriculumDesc"></p>
                <div class="curriculum-module">
                    <h4 data-lang-key="mindfulMeL1Title"></h4><p data-lang-key="mindfulMeL1Desc"></p>
                    <h4 data-lang-key="mindfulMeL2Title"></h4><p data-lang-key="mindfulMeL2Desc"></p>
                    <h4 data-lang-key="mindfulMeL3Title"></h4><p data-lang-key="mindfulMeL3Desc"></p>
                    <h4 data-lang-key="mindfulMeL4Title"></h4><p data-lang-key="mindfulMeL4Desc"></p>
                    <h4 data-lang-key="mindfulMeL5Title"></h4><p data-lang-key="mindfulMeL5Desc"></p>
                    <h4 data-lang-key="mindfulMeL6Title"></h4><p data-lang-key="mindfulMeL6Desc"></p>
                    <h4 data-lang-key="mindfulMeL7Title"></h4><p data-lang-key="mindfulMeL7Desc"></p>
                    <h4 data-lang-key="mindfulMeL8Title"></h4><p data-lang-key="mindfulMeL8Desc"></p>
                    <h5>Optional Extension Lessons:</h5>
                    <h4 data-lang-key="mindfulMeExt1Title"></h4><p data-lang-key="mindfulMeExt1Desc"></p>
                    <h4 data-lang-key="mindfulMeExt2Title"></h4><p data-lang-key="mindfulMeExt2Desc"></p>
                </div>
            </div>
            
            <div class="resource-section">
                <h3 data-lang-key="bpOfferingsTitle"></h3>
                <p data-lang-key="bpOfferingsP1"></p>
                <ul>
                    <li data-lang-key="bpOfferingsLi1"></li>
                    <li data-lang-key="bpOfferingsLi2"></li>
                    <li data-lang-key="bpOfferingsLi3"></li>
                    <li data-lang-key="bpOfferingsLi4"></li>
                </ul>
                <p><em><span data-lang-key="bpOfferingsP2"></span></em></p>
            </div>
            <div class="resource-section"> 
                <h3 data-lang-key="classroomTipsTitle"></h3>
                <ul>
                    <li data-lang-key="classroomTipsP1"></li>
                    <li data-lang-key="classroomTipsP2"></li>
                    <li data-lang-key="classroomTipsP3"></li>
                    <li data-lang-key="classroomTipsP4"></li>
                    <li data-lang-key="classroomTipsP5"></li>
                </ul>
            </div>
            <div class="resource-section"> 
                <h3 data-lang-key="selfCareEducatorsTitle"></h3>
                <p data-lang-key="selfCareEducatorsP1"></p>
            </div>
            <div class="resource-section">
                <h3>Downloadable Brain Power Guides (PDF)</h3>
                <ul>
                    <li><a href="pdfs/What_Is_Mindfulness_BrainPower.pdf" target="_blank" download>What Is Mindfulness? - An Introduction</a></li>
                    <li><a href="pdfs/MiSP_MfCP_Overview_BrainPower.pdf" target="_blank" download>Overview of MiSP & MfCP Programs (Inspiration)</a></li>
                    <li><a href="pdfs/BrainPower_MW_Vision.pdf" target="_blank" download>Brain Power's Vision for MW in Schools</a></li>
                    <li><a href="pdfs/Mindful_Minutes_Guide_ES.pdf" target="_blank" download>Mindful Minutes Guide - Elementary School (ES)</a></li>
                    <li><a href="pdfs/Mindful_Minutes_Guide_JHS.pdf" target="_blank" download>Mindful Minutes Guide - Junior High School (JHS)</a></li>
                    <li><a href="pdfs/Adult_MW_Foundations_Overview.pdf" target="_blank" download>Adult MW Foundations - Course Overview</a></li>
                    <li><a href="pdfs/Tips_for_Teaching_Mindfulness.pdf" target="_blank" download>Tips for Teaching Mindfulness in the Classroom</a></li>
                    <li><a href="pdfs/Mindful_Me_Curriculum_Overview_BrainPower.pdf" target="_blank" download>Mindful Me - 8 Lesson Curriculum Overview</a></li> 
                </ul>
            </div>
            <div class="resource-section">
                <h3 data-lang-key="furtherLearningTitle"></h3>
                <p data-lang-key="furtherLearningP1"></p>
                <ul>
                    <li data-lang-key="furtherLearningLi1"></li>
                    <li data-lang-key="furtherLearningLi2"></li>
                </ul>
            </div>
            <div class="faq-section">
                <h3>Frequently Asked Questions (FAQs)</h3>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqLengthTitle"></h3><div class="faq-answer"><p data-lang-key="faqLengthAnswer"></p></div></div>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqEyesClosedTitle"></h3><div class="faq-answer"><p data-lang-key="faqEyesClosedAnswer"></p></div></div>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqRestlessClassTitle"></h3><div class="faq-answer"><p data-lang-key="faqRestlessClassAnswer"></p></div></div>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqBoringTitle"></h3><div class="faq-answer"><p data-lang-key="faqBoringAnswer"></p></div></div>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqDifficultShareTitle"></h3><div class="faq-answer"><p data-lang-key="faqDifficultShareAnswer"></p></div></div>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqExpertTeacherTitle"></h3><div class="faq-answer"><p data-lang-key="faqExpertTeacherAnswer"></p></div></div>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqAudioFindTitle"></h3><div class="faq-answer"><p data-lang-key="faqAudioFindAnswer"></p></div></div>
                <div class="faq-item"><h3 class="faq-question" data-lang-key="faqMispTrainingTitle"></h3><div class="faq-answer"><p data-lang-key="faqMispTrainingAnswer"></p></div></div>
            </div>
        </section>
    `,
    researchEvidence: `
        <section id="research-evidence-page" class="page-content research-evidence-page">
            <h2 data-lang-key="researchEvidenceTitle"></h2>
            <p data-lang-key="researchIntroP1"></p>
            <p data-lang-key="researchIntroP2"></p>
            
            <div class="content-section">
                <h3 data-lang-key="researchStudentBenefitsTitle"></h3>
                <ul>
                    <li data-lang-key="researchStudentLi1"></li>
                    <li data-lang-key="researchStudentLi2"></li>
                    <li data-lang-key="researchStudentLi3"></li>
                    <li data-lang-key="researchStudentLi4"></li>
                    <li data-lang-key="researchStudentLi5"></li>
                    <li data-lang-key="researchStudentLi6"></li>
                </ul>
            </div>
            
            <div class="content-section">
                <h3 data-lang-key="researchTeacherBenefitsTitle"></h3>
                <ul>
                    <li data-lang-key="researchTeacherLi1"></li>
                    <li data-lang-key="researchTeacherLi2"></li>
                    <li data-lang-key="researchTeacherLi3"></li>
                    <li data-lang-key="researchTeacherLi4"></li>
                </ul>
            </div>

            <div class="content-section">
                <h3 data-lang-key="researchImplementationTitle"></h3>
                <p data-lang-key="researchImplementationP1"></p>
                <ul>
                    <li data-lang-key="researchImplementationLi1"></li>
                    <li data-lang-key="researchImplementationLi2"></li>
                    <li data-lang-key="researchImplementationLi3"></li>
                    <li data-lang-key="researchImplementationLi4"></li>
                </ul>
            </div>
            
            <div class="content-section">
                <h3 data-lang-key="researchJapanContextTitle"></h3>
                <p data-lang-key="researchJapanP1"></p>
            </div>
            
            <div class="content-section">
                <p data-lang-key="researchMispMyriad"></p>
                <p data-lang-key="researchBrainPowerApproach"></p>
            </div>

            <div class="content-section">
                <h3 data-lang-key="researchFurtherReadingTitle"></h3>
                <ul>
                    <li data-lang-key="researchMiSPSiteLink"></li>
                    <li data-lang-key="researchMfCPSiteLink"></li>
                    <li data-lang-key="researchEIFLink"></li>
                </ul>
            </div>
        </section>
    `,
    about: `
        <section id="about-page" class="page-content about-section">
            <h2 data-lang-key="aboutMWTitle"></h2>
            <p data-lang-key="aboutMWP1"></p>
            <p data-lang-key="aboutMWP2"></p>
            <ul>
                <li data-lang-key="aboutMWStudentsBenefit"></li>
                <li data-lang-key="aboutMWTeachersBenefit"></li>
            </ul>
            <h3 data-lang-key="needInJapanTitle"></h3>
            <p data-lang-key="needInJapanP1"></p>
            <p data-lang-key="needInJapanP2"></p>
            <h3 data-lang-key="brainPowerVisionTitle"></h3>
            <p data-lang-key="brainPowerVisionP1"></p>
            <p data-lang-key="brainPowerVisionP2"></p>
            <h3 data-lang-key="mispInspiredTitle"></h3>
            <p data-lang-key="mispInspiredP1"></p>
        </section>
    `
};