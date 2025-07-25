document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is fully loaded
    // Smooth scrolling for anchor links
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Element references for mini-letter and particles
    const envelopeElement = document.getElementById('envelopeElement');
    const miniLetterOverlay = document.getElementById('miniLetterOverlay');
    const miniLetterCard = document.querySelector('#miniLetterOverlay .mini-letter-card');

    // Elements for multi-page letter
    const miniLetterPages = document.querySelectorAll('.mini-letter-page');
    const paginationDotsContainer = document.querySelector('.pagination-dots');
    let currentPageIndex = 0;

    // Function to create pagination dots
    function createPaginationDots() {
        paginationDotsContainer.innerHTML = '';
        miniLetterPages.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentPageIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToPage(index);
            });
            paginationDotsContainer.appendChild(dot);
        });
    }

    // Function to update page display
    function updatePageDisplay() {
        miniLetterPages.forEach((page, index) => {
            if (index === currentPageIndex) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
        updatePaginationDots();
        if (currentPageIndex === 1) {
            generatePage2Icons();
        } else {
            clearPage2Icons();
        }
    }

    // Function to update active dot
    function updatePaginationDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentPageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Function to change page (called by nav buttons)
    window.changePage = function(direction) { // Make it global so onclick can find it
        currentPageIndex += direction;
        if (currentPageIndex < 0) {
            currentPageIndex = miniLetterPages.length - 1;
        } else if (currentPageIndex >= miniLetterPages.length) {
            currentPageIndex = 0;
        }
        updatePageDisplay();
    }

    // Function to go to a specific page (called by pagination dots)
    function goToPage(index) {
        currentPageIndex = index;
        updatePageDisplay();
    }

    const iconTypes = [
        'fas fa-heart', 'fas fa-birthday-cake', 'fas fa-cat', 'fas fa-paw',
        'fas fa-star', 'fas fa-candy-cane', 'fas fa-gift', 'fas fa-smile',
        'fas fa-cookie-bite', 'fas fa-ghost', 'fas fa-gem', 'fas fa-sparkles',
        'fas fa-bell', 'fas fa-lightbulb', 'fas fa-rainbow', 'fas fa-leaf',
        'fas fa-cloud', 'fas fa-moon', 'fas fa-sun', 'fas fa-cloud-moon', 'fas fa-cloud-sun'
    ];
    function generateRandomAnimationValues() {
        const randRotRange = 30;
        const randScaleChange = 0.1;
        const startScale = 1 - randScaleChange + (Math.random() * 2 * randScaleChange);
        const startRot = (Math.random() - 0.5) * randRotRange;
        const midScale = 1 - randScaleChange + (Math.random() * 2 * randScaleChange);
        const midRot = (Math.random() - 0.5) * randRotRange;
        const endScale = 1 - randScaleChange + (Math.random() * 2 * randScaleChange);
        const endRot = (Math.random() - 0.5) * randRotRange;
        return {
            startScale: startScale, startRot: `${startRot}deg`,
            midScale: midScale, midRot: `${midRot}deg`,
            endScale: endScale, endRot: `${endRot}deg`
        };
    }

    function generatePage2Icons() {
        const page2 = document.getElementById('page2');
        let cuteElementsContainer = page2.querySelector('.cute-elements-page2');

        if (!cuteElementsContainer) {
            cuteElementsContainer = document.createElement('div');
            cuteElementsContainer.classList.add('cute-elements-page2');
            page2.appendChild(cuteElementsContainer);
        }

        clearPage2Icons();

        const numIcons = 15;
        for (let i = 0; i < numIcons; i++) {
            const iconDiv = document.createElement('div');
            iconDiv.classList.add('cute-icon-item');

            const randomIconClass = iconTypes[Math.floor(Math.random() * iconTypes.length)];
            iconDiv.innerHTML = `<i class="${randomIconClass}"></i>`;

            const iconSize = 1.5 + Math.random() * 1.0;
            iconDiv.style.fontSize = `${iconSize}em`;
            cuteElementsContainer.appendChild(iconDiv);

            const animValues = generateRandomAnimationValues();
            iconDiv.style.setProperty('--start-scale', animValues.startScale);
            iconDiv.style.setProperty('--start-rot', animValues.startRot);
            iconDiv.style.setProperty('--mid-scale', animValues.midScale);
            iconDiv.style.setProperty('--mid-rot', animValues.midRot);
            iconDiv.style.setProperty('--end-scale', animValues.endScale);
            iconDiv.style.setProperty('--end-rot', animValues.endRot);
            iconDiv.style.animationDelay = `${Math.random() * 2}s`;
            iconDiv.style.animationDuration = `${7 + Math.random() * 5}s`;
        }
    }

    function clearPage2Icons() {
        const page2 = document.getElementById('page2');
        const cuteElementsContainer = page2.querySelector('.cute-elements-page2');
        if (cuteElementsContainer) {
            cuteElementsContainer.innerHTML = '';
        }
    }

    // Event listener for envelopeElement click
    envelopeElement.addEventListener('click', (event) => {
        if (!miniLetterOverlay.classList.contains('active')) {
            envelopeElement.classList.add('clicked');
            miniLetterOverlay.classList.add('active');
            currentPageIndex = 0;
            updatePageDisplay();
            createPaginationDots();
        }
    });

    window.closeMiniLetter = function() {
        miniLetterOverlay.classList.remove('active');
        envelopeElement.classList.remove('clicked');
        currentPageIndex = 0;
        updatePageDisplay();
    }

    // Gift Letter functionality
    const giftLetterOverlay = document.getElementById('giftLetterOverlay');
    const giftElement = document.getElementById('giftElement');
    const giftQuestionSection = document.getElementById('giftQuestionSection');
    const giftContentSection = document.getElementById('giftContentSection');
    const noGiftBtn = document.getElementById('noGiftBtn');
    const yesGiftBtn = document.getElementById('yesGiftBtn');
    const noGiftSound = document.getElementById('noGiftSound');
    const giftCard = document.getElementById('giftCard');
    const giftButtonsContainer = document.querySelector('.gift-buttons-container');

    giftElement.addEventListener('click', (event) => {
        openGiftLetter();
    });

    window.openGiftLetter = function() {
        giftLetterOverlay.classList.add('active');
        // Reset tampilan kado setiap kali dibuka
        giftQuestionSection.style.display = 'flex'; // Tampilkan pertanyaan dan tombol
        giftContentSection.style.display = 'none'; // Sembunyikan konten kado
        giftContentSection.style.opacity = '0'; // Atur opacity untuk transisi
        
        // Reset posisi tombol "GA" dan "Maauuuuu" ke urutan default (GA kiri, Maauuuuu kanan)
        noGiftBtn.style.order = '0'; // Default order
        yesGiftBtn.style.order = '0'; // Default order
        // Pastikan tidak ada inline style position absolute yang mengganggu flexbox
        noGiftBtn.style.position = '';
        noGiftBtn.style.left = '';
        noGiftBtn.style.top = '';
        noGiftBtn.style.transform = '';
        noGiftBtn.style.transition = 'background 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease'; // Reset transisi
    }

    window.closeGiftLetter = function() {
        giftLetterOverlay.classList.remove('active');
    }

    // Logika tombol "GA" (Merah)
    noGiftBtn.addEventListener('click', () => {
        if (noGiftSound) {
            noGiftSound.currentTime = 0;
            noGiftSound.play();
        }
        
        // Bertukar posisi antara GA dan Maauuuuu
        const currentNoOrder = noGiftBtn.style.order;
        if (currentNoOrder === '0' || currentNoOrder === '') {
            noGiftBtn.style.order = '1';
            yesGiftBtn.style.order = '0';
        } else {
            noGiftBtn.style.order = '0';
            yesGiftBtn.style.order = '1';
        }

        // Pergerakan acak tombol "GA" dalam kontainer
        const containerRect = giftButtonsContainer.getBoundingClientRect();
        const noBtnRect = noGiftBtn.getBoundingClientRect();
        const yesBtnRect = yesGiftBtn.getBoundingClientRect();

        let newX_relativeToContainer, newY_relativeToContainer;
        let attempts = 0;
        const maxAttempts = 50;
        const padding = 10; // Padding tambahan agar tombol tidak terlalu mepet tepi container

        do {
            const availableWidth = containerRect.width - noBtnRect.width - (2 * padding);
            const availableHeight = containerRect.height - noBtnRect.height - (2 * padding);

            let tempNewX = padding + (Math.random() * availableWidth);
            let tempNewY = padding + (Math.random() * availableHeight);

            let targetYesBtnRect = {};
            // Tentukan targetYesBtnRect berdasarkan order yang telah diubah
            // Ini untuk memastikan tombol GA tidak menimpa YesBtn pada posisi barunya
            // Asumsi: YesBtn selalu 'melarikan diri' ke sisi berlawanan dari GA
            if (noGiftBtn.style.order === '0') { // GA di kiri, Yes di kanan (secara visual)
                targetYesBtnRect = {
                    left: containerRect.width - yesBtnRect.width - padding,
                    right: containerRect.width - padding,
                    top: padding, // Asumsi Y tetap pada level yang sama atau mirip
                    bottom: containerRect.height - padding
                };
            } else { // GA di kanan, Yes di kiri (secara visual)
                targetYesBtnRect = {
                    left: padding,
                    right: padding + yesBtnRect.width,
                    top: padding,
                    bottom: containerRect.height - padding
                };
            }

            const isOverlapping = !(
                (tempNewX + noBtnRect.width < targetYesBtnRect.left) ||
                (tempNewX > targetYesBtnRect.right) ||
                (tempNewY + noBtnRect.height < targetYesBtnRect.top) || // Cek tumpang tindih Y
                (tempNewY > targetYesBtnRect.bottom)
            );

            if (!isOverlapping) {
                newX_relativeToContainer = tempNewX;
                newY_relativeToContainer = tempNewY;
                break;
            }
            attempts++;
        } while (attempts < maxAttempts);

        if (attempts < maxAttempts) {
            noGiftBtn.style.position = 'absolute';
            
            const currentNoBtnX_relativeToContainer = noBtnRect.left - containerRect.left;
            const currentNoBtnY_relativeToContainer = noBtnRect.top - containerRect.top;

            const offsetX = newX_relativeToContainer - currentNoBtnX_relativeToContainer;
            const offsetY = newY_relativeToContainer - currentNoBtnY_relativeToContainer;

            noGiftBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            noGiftBtn.style.transition = 'transform 0.2s ease-out';
        } else {
            console.warn("Could not find a non-overlapping random position for 'GA' button. Resetting to default.");
            noGiftBtn.style.position = '';
            noGiftBtn.style.transform = '';
            noGiftBtn.style.transition = 'background 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease';
        }
    });

    // Logika tombol "Maauuuuu" (Hijau)
    yesGiftBtn.addEventListener('click', () => {
        giftQuestionSection.style.display = 'none';
        giftContentSection.style.display = 'flex';
        setTimeout(() => {
            giftContentSection.style.opacity = '1';
        }, 50);
    });

    // Background music
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play().catch(e => {
        console.log("Autoplay blocked or failed on load:", e);
    });

    // Cursor trail
    const cursorTrailContainer = document.getElementById('cursor-trail-container');
    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        const type = Math.random() < 0.5 ? 'heart' : 'sparkle';
        particle.classList.add('cursor-particle');
        particle.classList.add(type);
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        cursorTrailContainer.appendChild(particle);
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    });

    // Confetti generation
    function generateConfetti(x, y) {
        const confettiColors = [
            getComputedStyle(document.documentElement).getPropertyValue('--confetti-pink'),
            getComputedStyle(document.documentElement).getPropertyValue('--confetti-purple'),
            getComputedStyle(document.documentElement).getPropertyValue('--confetti-yellow')
        ];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${x + (Math.random() - 0.5) * 20}px`;
            confetti.style.top = `${y + (Math.random() - 0.5) * 20}px`;
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.transform = `translate(${Math.random() * 200 - 100}px,${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // START: Heart Clicker Game Logic
    const gameElement = document.getElementById('gameElement');
    const gameOverlay = document.getElementById('gameOverlay');
    const closeGameBtn = document.getElementById('closeGameBtn');
    const gameArea = document.getElementById('gameArea');
    const gameScoreDisplay = document.getElementById('gameScoreDisplay');
    const gameLivesDisplay = document.getElementById('gameLivesDisplay');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const restartGameBtn = document.getElementById('restartGameBtn');

    const heartSound = document.getElementById('heartSound');
    const bombSound = document.getElementById('bombSound');

    let gameInterval;
    let animationFrameId;
    let lastFrameTime = 0;

    let score = 0;
    let lives = 3;
    let spawnInterval = 1200;
    const baseItemFallSpeed = 4.0;
    const randomSpeedFactor = 3.0;

    const itemTypes = ['heart', 'bomb'];
    const bombChance = 0.3;

    function startGame() {
        score = 0;
        lives = 3;
        spawnInterval = 1200;
        gameArea.innerHTML = '';

        const cloud1 = document.createElement('div'); cloud1.classList.add('cloud', 'cloud-1'); gameArea.appendChild(cloud1);
        const cloud2 = document.createElement('div'); cloud2.classList.add('cloud', 'cloud-2'); gameArea.appendChild(cloud2);
        const cloud3 = document.createElement('div'); cloud3.classList.add('cloud', 'cloud-3'); gameArea.appendChild(cloud3);

        gameOverMessage.style.display = 'none';
        restartGameBtn.style.display = 'none';
        updateGameStats();

        if (gameInterval) {
            clearInterval(gameInterval);
        }
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        gameInterval = setInterval(spawnGameItem, spawnInterval);
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(updateFallingItems);
    }

    function updateGameStats() {
        gameScoreDisplay.textContent = `Skor: ${score}`;
        gameLivesDisplay.innerHTML = `Nyawa: ${'❤️'.repeat(lives)}${'🖤'.repeat(3 - lives)}`;
    }

    function spawnGameItem() {
        if (lives <= 0) {
            endGame();
            return;
        }

        const item = document.createElement('div');
        item.classList.add('game-item');

        const isBomb = Math.random() < bombChance;
        item.classList.add(isBomb ? 'bomb' : 'heart');
        item.innerHTML = isBomb ? '<i class="fas fa-bomb"></i>' : '<i class="fas fa-heart"></i>';
        const areaWidth = gameArea.offsetWidth;
        const itemVisualWidth = 60;
        item.style.left = `${Math.random() * (areaWidth - itemVisualWidth)}px`;
        item.style.top = `-60px`;

        item.dataset.type = isBomb ? 'bomb' : 'heart';
        item.dataset.y = -60;
        let calculatedFallSpeed = baseItemFallSpeed + (Math.random() * randomSpeedFactor);
        if (calculatedFallSpeed < 2.0) calculatedFallSpeed = 2.0;
        item.dataset.fallSpeed = calculatedFallSpeed;

        item.addEventListener('click', handleItemClick);
        gameArea.appendChild(item);
    }

    function handleItemClick(event) {
        const item = event.currentTarget;
        const type = item.dataset.type;

        if (type === 'heart') {
            score++;
            if (heartSound) {
                heartSound.currentTime = 0;
                heartSound.play();
            }
            item.style.transform = 'scale(1.2)';
            item.style.opacity = '0.5';
        } else if (type === 'bomb') {
            lives--;
            if (bombSound) {
                bombSound.currentTime = 0;
                bombSound.play();
            }
            item.style.transform = 'scale(0.8) rotate(10deg)';
            item.style.opacity = '0.5';
        }
        item.remove();
        updateGameStats();
        if (lives <= 0) {
            endGame();
        }
    }

    function updateFallingItems(currentTime) {
        if (lives <= 0) {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            return;
        }

        const deltaTime = currentTime - lastFrameTime;
        lastFrameTime = currentTime;

        const items = gameArea.querySelectorAll('.game-item');
        items.forEach(item => {
            let currentY = parseFloat(item.dataset.y);
            const fallSpeed = parseFloat(item.dataset.fallSpeed);

            currentY += fallSpeed * (deltaTime / 16.67);
            item.dataset.y = currentY;
            item.style.top = `${currentY}px`;

            if (currentY > gameArea.offsetHeight) {
                if (item.dataset.type === 'heart') {
                    lives--;
                    if (bombSound) {
                        bombSound.currentTime = 0;
                        bombSound.play();
                    }
                    updateGameStats();
                    if (lives <= 0) {
                        endGame();
                        return;
                    }
                }
                item.remove();
            }
        });
        animationFrameId = requestAnimationFrame(updateFallingItems);
    }

    function endGame() {
        if (gameInterval) {
            clearInterval(gameInterval);
            gameInterval = null;
        }
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        gameArea.innerHTML = '';
        gameOverMessage.style.display = 'block';
        restartGameBtn.style.display = 'block';
    }

    // Event listeners for Game Overlay
    gameElement.addEventListener('click', () => {
        gameOverlay.classList.add('active');
        startGame();
    });
    closeGameBtn.addEventListener('click', () => {
        gameOverlay.classList.remove('active');
        endGame();
    });
    restartGameBtn.addEventListener('click', () => {
        startGame();
    });
    // END: Heart Clicker Game Logic

    // START: Age Calculator Logic
    const calculatorElement = document.getElementById('calculatorElement');
    const ageCalculatorOverlay = document.getElementById('ageCalculatorOverlay');
    const closeAgeCalculatorBtn = document.getElementById('closeAgeCalculatorBtn');
    const birthDaySelect = document.getElementById('birthDay');
    const birthMonthSelect = document.getElementById('birthMonth');
    const birthYearSelect = document.getElementById('birthYear');
    const currentDaySelect = document.getElementById('currentDay');
    const currentMonthSelect = document.getElementById('currentMonth');
    const currentYearSelect = document.getElementById('currentYear');
    const calculateAgeBtn = document.getElementById('calculateAgeBtn');
    const ageResult = document.getElementById('ageResult');

    function populateDropdowns() {
        birthDaySelect.innerHTML = '';
        birthMonthSelect.innerHTML = '';
        birthYearSelect.innerHTML = '';
        currentDaySelect.innerHTML = '';
        currentMonthSelect.innerHTML = '';
        currentYearSelect.innerHTML = '';

        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            birthDaySelect.appendChild(option.cloneNode(true));
            currentDaySelect.appendChild(option.cloneNode(true));
        }

        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                            "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        for (let i = 0; i < 12; i++) {
            const option = document.createElement('option');
            option.value = i + 1;
            option.textContent = monthNames[i];
            birthMonthSelect.appendChild(option.cloneNode(true));
            currentMonthSelect.appendChild(option.cloneNode(true));
        }

        const currentFullYear = new Date().getFullYear();
        for (let i = currentFullYear; i >= 1950; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            birthYearSelect.appendChild(option);
        }

        for (let i = currentFullYear + 5; i >= currentFullYear - 5; i--) {
             const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            currentYearSelect.appendChild(option);
        }
        currentYearSelect.value = currentFullYear;
    }

    function setRealtimeCurrentDate() {
        const today = new Date();
        currentDaySelect.value = today.getDate();
        currentMonthSelect.value = today.getMonth() + 1;
        currentYearSelect.value = today.getFullYear();
    }

    function calculateAge() {
        const birthDay = parseInt(birthDaySelect.value);
        const birthMonth = parseInt(birthMonthSelect.value);
        const birthYear = parseInt(birthYearSelect.value);

        const currentDay = parseInt(currentDaySelect.value);
        const currentMonth = parseInt(currentMonthSelect.value);
        const currentYear = parseInt(currentYearSelect.value);

        if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear) ||
            isNaN(currentDay) || isNaN(currentMonth) || isNaN(currentYear)) {
            ageResult.textContent = "Mohon lengkapi semua tanggal.";
            return;
        }

        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
        const currentDate = new Date(currentYear, currentMonth - 1, currentDay);

        if (isNaN(birthDate.getTime()) || birthDate.getMonth() + 1 !== birthMonth || birthDate.getDate() !== birthDay ||
            isNaN(currentDate.getTime()) || currentDate.getMonth() + 1 !== currentMonth || currentDate.getDate() !== currentDay) {
            ageResult.textContent = "Tanggal tidak valid.";
            return;
        }

        let age = currentYear - birthYear;
        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
            age--;
        }

        ageResult.textContent = `Umur kamu: ${age} tahun!`;
    }

    // Event listeners for Age Calculator
    calculatorElement.addEventListener('click', () => {
        ageCalculatorOverlay.classList.add('active');
        populateDropdowns();
        setRealtimeCurrentDate();
        ageResult.textContent = '';
    });

    closeAgeCalculatorBtn.addEventListener('click', () => {
        ageCalculatorOverlay.classList.remove('active');
    });

    calculateAgeBtn.addEventListener('click', calculateAge);
    // END: Age Calculator Logic
}); // End DOMContentLoaded
