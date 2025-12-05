// Инициализация при зареждане на страницата
document.addEventListener('DOMContentLoaded', function() {
    // Инициализиране на навигацията
    initNavigation();
    
    // Инициализиране на интерактивния макет
    initModelViewer();
    
    // Инициализиране на графика
    initResearchChart();
    
    // Инициализиране на чат системата
    initChat();
    
    // Инициализиране на анкетната система
    initSurvey();
    
    // Анимации при скрол
    initScrollAnimations();
});

// Навигация
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Плавно скролиране до секции
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Затваряне на мобилното меню
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Интерактивен макет на училището
function initModelViewer() {
    const modelButtons = document.querySelectorAll('.model-btn');
    const roomTitle = document.getElementById('room-title');
    const roomDescription = document.getElementById('room-description');
    
    // Описания за всяка стая
    const roomDescriptions = {
        classroom: {
            title: "Приобщаваща класна стая",
            description: "Пространство, проектирано според принципите на UDL с гъвкава мебелировка: люлеещи се столове, топки за баланс, стоящи бюра и индивидуални 'гнезда'. Подкрепя различни стилове на учене и сензорни потребности."
        },
        sensory: {
            title: "Сензорна терапевтична стая",
            description: "Мултисензорна среда за регулация и интеграция на сетивата. Включва оборудване за визуална, тактилна и вестибуларна стимулация, базирано на принципите на Snoezelen терапията."
        },
        resource: {
            title: "Ресурсен кабинет",
            description: "Мултифункционално пространство за индивидуална работа и работа в малки групи. Оборудван с модулни маси, специализиран софтуер и дидактични материали за подкрепа на ученици със СОП."
        },
        playground: {
            title: "Дворно пространство - Сензорна градина",
            description: "Външна образователна среда, проектирана да стимулира всички сетива. Включва площадки за игра, сензорни лехи и пътека на усещанията с различни настилки."
        },
        corridor: {
            title: "Коридори и навигационна система",
            description: "Интелигентни коридори, проектирани като 'улици за учене' с разширения за социализация, тактилни настилки, цветово кодиране и визуална навигация."
        }
    };
    
    modelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Премахване на активен клас от всички бутони
            modelButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавяне на активен клас към текущия бутон
            this.classList.add('active');
            
            // Взимане на типа стая от data атрибута
            const roomType = this.getAttribute('data-room');
            
            // Обновяване на заглавието и описанието
            if (roomDescriptions[roomType]) {
                roomTitle.textContent = roomDescriptions[roomType].title;
                roomDescription.textContent = roomDescriptions[roomType].description;
            }
            
            // Тук може да добавите логика за промяна на визуализацията
            updateModelVisualization(roomType);
        });
    });
}

function updateModelVisualization(roomType) {
    const classroomDiagram = document.querySelector('.classroom');
    
    // Промяна на визуализацията според избраната стая
    switch(roomType) {
        case 'sensory':
            classroomDiagram.style.backgroundColor = '#e3f2fd';
            break;
        case 'resource':
            classroomDiagram.style.backgroundColor = '#f3e5f5';
            break;
        case 'playground':
            classroomDiagram.style.backgroundColor = '#e8f5e9';
            break;
        case 'corridor':
            classroomDiagram.style.backgroundColor = '#fff3e0';
            break;
        default:
            classroomDiagram.style.backgroundColor = 'white';
    }
}

// Графика за анализ на изследването
function initResearchChart() {
    const ctx = document.getElementById('researchChart').getContext('2d');
    
    // Примерни данни за трите измерения
    const data = {
        labels: ['Учители', 'Родители', 'Ученици', 'Екип ЕПЛР'],
        datasets: [
            {
                label: 'Култура',
                data: [4.2, 3.8, 4.0, 4.5],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            },
            {
                label: 'Политики',
                data: [3.5, 3.0, 3.2, 4.0],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            },
            {
                label: 'Практики',
                data: [4.0, 3.5, 3.8, 4.2],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }
        ]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Резултати от оценката по трите измерения'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Средна оценка (1-5)'
                    }
                }
            }
        }
    };
    
    new Chart(ctx, config);
}

// Чат система
function initChat() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    
    if (sendButton && messageInput) {
        sendButton.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            // Създаване на ново съобщение
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            
            const now = new Date();
            const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                             now.getMinutes().toString().padStart(2, '0');
            
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="sender">Аз</span>
                    <span class="time">${timeString}</span>
                </div>
                <div class="message-content">${messageText}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            messageInput.value = '';
            
            // Автоматично скролиране към последното съобщение
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Симулиране на отговор (за демонстрационни цели)
            simulateReply(messageText);
        }
    }
    
    function simulateReply(userMessage) {
        setTimeout(() => {
            const replies = [
                "Интересна идея! Бихме могли да я обсъдим на следващата работна среща.",
                "Благодаря за предложението! Имате ли конкретни примери как да се приложи на практика?",
                "Това съответства на принципите на Универсалния дизайн за учене. Добра идея!",
                "Имаме подобно предложение от друг училищен екип. Ще ги свържаме.",
                "Това изисква допълнителни ресурси. Можем да кандидатстваме по проект."
            ];
            
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message received';
            
            const now = new Date();
            const timeString = (now.getHours()).toString().padStart(2, '0') + ':' + 
                             (now.getMinutes() + 1).toString().padStart(2, '0');
            
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="sender">Експерт по приобщаване</span>
                    <span class="time">${timeString}</span>
                </div>
                <div class="message-content">${randomReply}</div>
            `;
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// Анкетна система
function initSurvey() {
    const surveyForm = document.getElementById('inclusion-survey');
    
    if (surveyForm) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Събиране на данни от формата
            const formData = new FormData(this);
            const surveyData = {};
            
            // Обхождане на радио бутоните
            const radioGroups = {};
            document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
                surveyData[input.name] = input.value;
            });
            
            // Добавяне на отворените въпроси
            const openAnswers = document.querySelectorAll('textarea');
            openAnswers.forEach(textarea => {
                surveyData[textarea.id] = textarea.value;
            });
            
            // Тук бихме изпратили данните към сървър
            console.log('Данни от анкетата:', surveyData);
            
            // Показване на съобщение за успешно изпращане
            alert('Благодарим Ви за участието! Анкетата е изпратена успешно.');
            
            // Рестартиране на формата
            surveyForm.reset();
            
            // Тук може да добавите изпращане към сървър:
            // sendSurveyData(surveyData);
        });
    }
}

// Анимации при скрол
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаване на елементи за анимация
    document.querySelectorAll('.theory-card, .timeline-item, .idea-card').forEach(el => {
        observer.observe(el);
    });
}

// Функция за изпращане на данни от анкетата към сървър
async function sendSurveyData(data) {
    try {
        const response = await fetch('/api/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Грешка при изпращане на данните');
        }
    } catch (error) {
        console.error('Грешка:', error);
        alert('Възникна грешка при изпращането на анкетата. Моля, опитайте отново.');
    }
// 🔥 ИНТЕРАКТИВЕН МАКЕТ ФУНКЦИОНАЛНОСТ

class InteractiveModel {
    constructor() {
        this.rooms = {
            entrance: {
                name: "Входна зона",
                area: "45 m²",
                capacity: "20 души",
                access: "100% достъпна",
                description: "Входно пространство с автоматични плъзгащи се врати, видео интерком и тактилни насоки за хора с нарушено зрение.",
                equipment: [
                    "Автоматични плъзгащи се врати",
                    "Видео интерком система",
                    "Тактилни насоки на пода",
                    "Контрол на достъпа",
                    "Широк вход (2m)",
                    "Приемна зона с ниско бюро"
                ]
            },
            corridor: {
                name: "Коридори и навигация",
                area: "120 m²",
                capacity: "-",
                access: "100% достъпна",
                description: "'Улици за учене' с разширения за социализация, цветово кодиране и мултисензорна навигация.",
                equipment: [
                    "Тактилни ленти на пода",
                    "Цветово кодиране (синя/зелена линия)",
                    "Акустични тавани",
                    "Табели на Брайл",
                    "Пиктограми",
                    "Мека мебел в разширенията"
                ]
            },
            classroom: {
                name: "Приобщаваща класна стая",
                area: "60 m²",
                capacity: "20 ученика",
                access: "100% достъпна",
                description: "Зонирано пространство с гъвкава мебелировка, проектирано според UDL принципите.",
                equipment: [
                    "Люлеещи се столове (Hokki)",
                    "Топки за баланс",
                    "Стоящи бюра",
                    "Индивидуални 'гнезда'",
                    "Интерактивен дисплей",
                    "Таблети със специален софтуер"
                ]
            },
            sensory: {
                name: "Сензорна терапевтична стая",
                area: "35 m²",
                capacity: "4-6 деца",
                access: "100% достъпна",
                description: "Мултисензорна среда за регулация и интеграция, базирана на Snoezelen терапията.",
                equipment: [
                    "Кула с мехурчета (Bubble Tube)",
                    "Оптични влакна",
                    "Сензорна люлка",
                    "Тежки одеяла и дюшеци",
                    "Сензорни панели",
                    "Централен контролен панел"
                ]
            },
            resource: {
                name: "Ресурсен кабинет",
                area: "25 m²",
                capacity: "1-4 ученика",
                access: "100% достъпна",
                description: "Пространство за индивидуална работа и работа в малки групи с ученици със СОП.",
                equipment: [
                    "Модулни маси",
                    "Специализиран софтуер",
                    "Монтесори пособия",
                    "Тактилни карти",
                    "Ресурсна библиотека",
                    "Тих работни зони"
                ]
            },
            playground: {
                name: "Дворно пространство",
                area: "800 m²",
                capacity: "50+ деца",
                access: "100% достъпна",
                description: "Сензорна градина и приобщаваща площадка, проектирана като 'класна стая на открито'.",
                equipment: [
                    "Пътека на усещанията",
                    "Приобщаващи люлки",
                    "Въртележки на ниво терен",
                    "Ароматни лехи",
                    "Музикални инструменти",
                    "Жив плет за визуални бариери"
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupRoomClicks();
        this.setupControls();
        this.selectRoom('entrance'); // Показваме входа по подразбиране
    }
    
    setupRoomClicks() {
        // Добавяме клик event на всички стаи
        document.querySelectorAll('.room').forEach(room => {
            room.addEventListener('click', (e) => {
                const roomId = room.getAttribute('data-room');
                this.selectRoom(roomId);
            });
        });
    }
    
    setupControls() {
        // Контролни бутони
        document.querySelectorAll('.control-btn[data-view]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = btn.getAttribute('data-view');
                this.changeView(view);
                
                // Активен бутон
                document.querySelectorAll('.control-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
            });
        });
    }
    
    selectRoom(roomId) {
        const roomData = this.rooms[roomId];
        if (!roomData) return;
        
        // Премахваме активен клас от всички стаи
        document.querySelectorAll('.room').forEach(room => {
            room.classList.remove('active');
        });
        
        // Добавяме активен клас на избраната стая
        document.querySelector(`.room[data-room="${roomId}"]`).classList.add('active');
        
        // Обновяваме информацията
        document.getElementById('selected-room').textContent = roomData.name;
        document.getElementById('room-area').textContent = roomData.area;
        document.getElementById('room-capacity').textContent = roomData.capacity;
        document.getElementById('room-access').textContent = roomData.access;
        document.getElementById('room-description').innerHTML = `<p>${roomData.description}</p>`;
        
        // Обновяваме оборудването
        const equipmentList = document.getElementById('equipment-list');
        equipmentList.innerHTML = '';
        roomData.equipment.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle" style="color: #2ecc71;"></i> ${item}`;
            equipmentList.appendChild(li);
        });
        
        // Обновяваме снимките (в реална система ще зареждаме реални снимки)
        this.updatePhotos(roomId);
    }
    
    updatePhotos(roomId) {
        const photoGrid = document.getElementById('photo-grid');
        
        // Това са примерни линкове - в реален проект ще зареждаш истински снимки
        const photoTemplates = {
            entrance: [
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop'
            ],
            classroom: [
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop'
            ],
            sensory: [
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&auto=format&fit=crop&w=400&h=300'
            ],
            playground: [
                'https://images.unsplash.com/photo-1517486808906-6ca8b3f8f6be?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=400&h=300&fit=crop'
            ]
        };
        
        const photos = photoTemplates[roomId] || [
            'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
        ];
        
        photoGrid.innerHTML = '';
        
        photos.forEach(photoUrl => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'photo-item';
            imgDiv.innerHTML = `<img src="${photoUrl}" alt="${roomId}" style="width:100%; height:150px; object-fit:cover; border-radius:5px;">`;
            photoGrid.appendChild(imgDiv);
        });
    }
    
    changeView(viewType) {
        const model = document.querySelector('.school-model');
        
        switch(viewType) {
            case '3d':
                model.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(0deg)';
                break;
            case 'floorplan':
                model.style.transform = 'perspective(1000px) rotateX(90deg) rotateY(0deg)';
                break;
            case 'photos':
                // Тук може да се покаже галерия от снимки
                alert('Режим "Снимки" - ще се покаже галерия с реални снимки');
                break;
        }
    }
}

    // Инициализиране на макета при зареждане
let interactiveModel;

document.addEventListener('DOMContentLoaded', () => {
    interactiveModel = new InteractiveModel();
});

// Функция за нулиране на изгледа
function resetView() {
    const model = document.querySelector('.school-model');
    model.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(0deg)';
    
    // Нулиране на активните бутони
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.control-btn[data-view="3d"]').classList.add('active');
    
    // Връщане към входната зона
    interactiveModel.selectRoom('entrance');
}
}
// ==================== ИНТЕРАКТИВЕН МАКЕТ ====================

class InteractiveSchoolModel {
    constructor() {
        this.rooms = {
            entrance: {
                name: "Входна зона",
                area: "45 m²",
                capacity: "20 души",
                access: "100% достъпна",
                description: "Входно пространство с автоматични плъзгащи се врати на кота нула, видео интерком система и тактилни насоки за хора с нарушено зрение.",
                equipment: [
                    "Автоматични плъзгащи се врати",
                    "Видео интерком система",
                    "Тактилни насоки на пода",
                    "Контрол на достъпа с мониторинг",
                    "Широк вход (2m ширина)",
                    "Приемна зона с ниско бюро"
                ]
            },
            corridor: {
                name: "Коридори и навигация",
                area: "120 m²",
                capacity: "-",
                access: "100% достъпна",
                description: "'Улици за учене' с разширения за социализация, цветово кодиране и мултисензорна навигация според принципите на Универсалния дизайн.",
                equipment: [
                    "Тактилни ленти на пода за хора с нарушено зрение",
                    "Цветово кодиране (синя/зелена линия)",
                    "Акустични тавани за намаляване на шума",
                    "Табели на Брайл и пиктограми",
                    "Мека мебел в разширенията",
                    "Осветление с регулируем интензитет"
                ]
            },
            classroom: {
                name: "Приобщаваща класна стая",
                area: "60 m²",
                capacity: "20 ученика",
                access: "100% достъпна",
                description: "Зонирано пространство с гъвкава мебелировка, проектирано според UDL принципите за поддържане на различни стилове на учене.",
                equipment: [
                    "Люлеещи се столове (Hokki Stools)",
                    "Топки за баланс (Ball Chairs)",
                    "Стоящи бюра с регулируема височина",
                    "Индивидуални 'гнезда' за уединение",
                    "Интерактивен дисплей с регулируема височина",
                    "Таблети със софтуер за преобразуване на говор в текст"
                ]
            },
            sensory: {
                name: "Сензорна терапевтична стая",
                area: "35 m²",
                capacity: "4-6 деца",
                access: "100% достъпна",
                description: "Мултисензорна среда за регулация и интеграция, базирана на Snoezelen терапията. Възможност за контролирано дозиране на стимулите.",
                equipment: [
                    "Кула с мехурчета (Bubble Tube) за визуална стимулация",
                    "Оптични влакна (Fiber Optic Tails) за тактилна зона",
                    "Сензорна люлка (Platform Swing) за вестибуларна система",
                    "Тежки одеяла и дюшеци за Deep Pressure Therapy",
                    "Сензорни панели на стената за интерактивна зона",
                    "Централен контролен панел за управление на средата"
                ]
            },
            resource: {
                name: "Ресурсен кабинет",
                area: "25 m²",
                capacity: "1-4 ученика",
                access: "100% достъпна",
                description: "Пространство за индивидуална работа и работа в малки групи с ученици със специални образователни потребности (СОП).",
                equipment: [
                    "Модулни маси с регулируема височина",
                    "Специализиран софтуер за когнитивна рехабилитация",
                    "Монтесори пособия и дидактични материали",
                    "Тактилни карти и учебни ресурси",
                    "Ресурсна библиотека с адаптирани материали",
                    "Тих работни зони с шумоизолация"
                ]
            },
            playground: {
                name: "Дворно пространство",
                area: "800 m²",
                capacity: "50+ деца",
                access: "100% достъпна",
                description: "Сензорна градина и приобщаваща площадка, проектирана като 'класна стая на открито' със стимулиране на всички сетива.",
                equipment: [
                    "Пътека на усещанията с различни настилки",
                    "Приобщаващи люлки тип 'гнездо'",
                    "Въртележки на ниво терен за директен достъп",
                    "Ароматни лехи с билки (мента, розмарин)",
                    "Външни музикални инструменти (ксилофони)",
                    "Жив плет за визуални бариери и конфиденциалност"
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupRoomInteractions();
        this.setupModelControls();
        this.selectRoom('entrance');
    }
    
    setupRoomInteractions() {
        // Клик върху стая
        document.querySelectorAll('.room').forEach(room => {
            room.addEventListener('click', (e) => {
                e.stopPropagation();
                const roomId = room.dataset.room;
                this.selectRoom(roomId);
            });
            
            // Ховер ефект
            room.addEventListener('mouseenter', () => {
                room.style.zIndex = '100';
            });
            
            room.addEventListener('mouseleave', () => {
                if (!room.classList.contains('active')) {
                    room.style.zIndex = '1';
                }
            });
        });
    }
    
    setupModelControls() {
        // Бутони за промяна на изгледа
        document.querySelectorAll('.control-btn[data-view]').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.changeView(view);
                
                // Активен бутон
                document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Бутон за нулиране
        document.querySelector('.control-btn[onclick="resetView()"]').addEventListener('click', () => {
            this.resetView();
        });
    }
    
    selectRoom(roomId) {
        const roomData = this.rooms[roomId];
        if (!roomData) return;
        
        // Премахване на активен клас
        document.querySelectorAll('.room').forEach(room => room.classList.remove('active'));
        
        // Добавяне на активен клас
        const selectedRoom = document.querySelector(`.room[data-room="${roomId}"]`);
        if (selectedRoom) {
            selectedRoom.classList.add('active');
            selectedRoom.style.zIndex = '100';
        }
        
        // Обновяване на информацията
        this.updateRoomInfo(roomData);
        
        // Обновяване на снимките
        this.updateRoomPhotos(roomId);
    }
    
    updateRoomInfo(roomData) {
        document.getElementById('selected-room').textContent = roomData.name;
        document.getElementById('room-area').textContent = roomData.area;
        document.getElementById('room-capacity').textContent = roomData.capacity;
        document.getElementById('room-access').textContent = roomData.access;
        
        // Описание
        const descElement = document.getElementById('room-description');
        descElement.innerHTML = `<p>${roomData.description}</p>`;
        
        // Оборудване
        const equipmentList = document.getElementById('equipment-list');
        equipmentList.innerHTML = '';
        
        roomData.equipment.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <i class="fas fa-check" style="color: #27ae60; margin-right: 8px;"></i>
                ${item}
            `;
            equipmentList.appendChild(li);
        });
    }
    
    updateRoomPhotos(roomId) {
        const photoGrid = document.getElementById('photo-grid');
        
        // Примерни снимки за всяка стая
        const roomPhotos = {
            entrance: [
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop'
            ],
            classroom: [
                'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop'
            ],
            sensory: [
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&auto=format&fit=crop&w=400&h=300&q=80'
            ],
            resource: [
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1517486808906-6ca8b3f8f6be?w=400&h=300&fit=crop'
            ],
            playground: [
                'https://images.unsplash.com/photo-1517486808906-6ca8b3f8f6be?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=400&h=300&fit=crop'
            ],
            corridor: [
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
                'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop'
            ]
        };
        
        const photos = roomPhotos[roomId] || roomPhotos.entrance;
        
        photoGrid.innerHTML = '';
        
        photos.forEach((photoUrl, index) => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo-item';
            photoDiv.innerHTML = `
                <img src="${photoUrl}" 
                     alt="${this.rooms[roomId].name} - снимка ${index + 1}"
                     onerror="this.src='https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop'">
            `;
            photoGrid.appendChild(photoDiv);
        });
    }
    
    changeView(viewType) {
        const model = document.querySelector('.school-model');
        
        switch(viewType) {
            case '3d':
                model.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(0deg)';
                break;
            case 'floorplan':
                model.style.transform = 'perspective(1000px) rotateX(90deg) rotateY(0deg)';
                break;
            case 'photos':
                // Показване на галерия
                alert('Галерия снимки - в реална версия тук ще се покажат реални снимки от училището');
                break;
        }
    }
    
    resetView() {
        const model = document.querySelector('.school-model');
        model.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(0deg)';
        
        // Нулиране на контролите
        document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.control-btn[data-view="3d"]').classList.add('active');
        
        // Връщане към входната зона
        this.selectRoom('entrance');
    }
}

// Инициализация на макета
let schoolModel;

document.addEventListener('DOMContentLoaded', function() {
    // Проверка дали съществува секцията за макета
    if (document.getElementById('interactive-model')) {
        schoolModel = new InteractiveSchoolModel();
        console.log('Интерактивният макет е зареден успешно!');
    }
});

// Глобална функция за нулиране
function resetView() {
    if (schoolModel) {
        schoolModel.resetView();
    }
}

