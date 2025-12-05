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

}
