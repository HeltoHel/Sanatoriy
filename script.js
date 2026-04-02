/**
 * JavaScript для Санатория «Щучинский»
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Анимация при скролле
    // ========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(el => observer.observe(el));
    
    // ========================================
    // Мобильное меню
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (menuToggle && navMenu && 
            !menuToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // ========================================
    // Плавный скролл к якорям
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Динамический header при скролле
    // ========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // Параллакс эффект для hero секции
    // ========================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxElements = hero.querySelectorAll('.hero-decor');
                parallaxElements.forEach(el => {
                    el.style.transform = `translateY(${scrolled * 0.3}px)`;
                });
            }
        });
    }
    
    // ========================================
    // Анимация кнопок при наведении
    // ========================================
    const buttons = document.querySelectorAll('.btn, .btn-video, .btn-more');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ========================================
    // Счетчик чисел (для статистики)
    // ========================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ========================================
    // Модальное окно для видео
    // ========================================
    const videoBtn = document.querySelector('.btn-video');
    
    if (videoBtn) {
        videoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-content">
                    <button class="video-modal-close">&times;</button>
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/ZvvQooNnZhI" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('video-modal-close')) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });
            
            // Добавляем стили для модального окна
            const style = document.createElement('style');
            style.textContent = `
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                
                .video-modal-content {
                    position: relative;
                    max-width: 900px;
                    width: 90%;
                }
                
                .video-modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                
                .video-modal-close:hover {
                    transform: scale(1.2);
                }
                
                .video-container {
                    position: relative;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                    border-radius: 10px;
                }
                
                .video-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        });
    }
    
    // ========================================
    // Активная навигация при скролле
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ========================================
    // Эффект печатания для заголовков
    // ========================================
    const typeWriterElements = document.querySelectorAll('.typewriter');
    
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };
    
    // ========================================
    // Lazy Loading для изображений
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // Форма обратной связи (если есть)
    // ========================================
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            try {
                // Здесь должна быть логика отправки на сервер
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.background = 'var(--whatsapp-green)';
                
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
            } catch (error) {
                submitBtn.textContent = 'Ошибка';
                submitBtn.style.background = 'var(--accent-red)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    });
    
    // ========================================
    // Тост уведомления
    // ========================================
    const showToast = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: ${type === 'success' ? 'var(--whatsapp-green)' : 'var(--primary-green)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };
    
    // Добавляем анимации для тостов
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(toastStyles);
    
    // ========================================
    // Консольное приветствие
    // ========================================
    console.log('%c🌿 Санаторий «Щучинский»', 'font-size: 20px; font-weight: bold; color: #0d7f3a;');
    console.log('%cДобро пожаловать на наш сайт!', 'font-size: 14px; color: #666;');
    
});

// ========================================
// Глобальные функции
// ========================================

// Функция для плавного скролла к элементу
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Функция для открытия WhatsApp
function openWhatsApp(message = '') {
    const phone = '77472265918';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
