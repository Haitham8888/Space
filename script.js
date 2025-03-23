document.addEventListener('DOMContentLoaded', function() {
    // تهيئة مكتبة AOS للتأثيرات الحركية
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        offset: 100,
    });

    // التأثير المرئي عند التمرير
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.padding = '15px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            header.style.background = 'rgba(18, 18, 18, 0.8)';
            header.style.padding = '20px 0';
        }
    });

    // إنشاء قائمة الجوال
    const createMobileMenu = () => {
        // لا نفعل شيء لأننا نستخدم nav-toggle بدلاً من هذه الوظيفة
        return;
    };

    // تحقق من عرض الشاشة وإنشاء القائمة المناسبة
    /*
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    */

    // إعادة تهيئة القائمة عند تغيير حجم الشاشة
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768) {
            if (!document.querySelector('.menu-button')) {
                createMobileMenu();
            }
        } else {
            const menuButton = document.querySelector('.menu-button');
            if (menuButton) {
                menuButton.remove();
                document.querySelector('nav').classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // معالجة نموذج الانضمام
    const joinForm = document.getElementById('join-form');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // إظهار رسالة نجاح مع تأثير بصري
            const formContainer = joinForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>تم استلام طلبك بنجاح!</h3>
                <p>سيتم التواصل معك قريباً.</p>
            `;
            
            // تبديل النموذج برسالة النجاح
            formContainer.style.height = formContainer.offsetHeight + 'px';
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // تأثير الظهور
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // إضافة زر التبديل بين وضع الإضاءة والوضع الداكن
    const createThemeToggle = () => {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);
        
        // حالة الوضع (افتراضياً وضع داكن)
        let darkMode = true;
        
        themeToggle.addEventListener('click', () => {
            darkMode = !darkMode;
            if (darkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
            themeToggle.classList.add('clicked');
            setTimeout(() => {
                themeToggle.classList.remove('clicked');
            }, 300);
        });
    };
    
    createThemeToggle();
    
    // إضافة تأثير الجسيمات في تذييل الصفحة
    const createFooterParticles = () => {
        const particlesContainer = document.querySelector('.footer-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('span');
            particle.className = 'particle';
            
            // قيم عشوائية للجسيمات
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    };
    
    createFooterParticles();

    // إدارة سلايدر الفعاليات
    const initEventsSlider = () => {
        const dots = document.querySelectorAll('.dot');
        const prevButton = document.querySelector('.slider-prev');
        const nextButton = document.querySelector('.slider-next');
        const eventsGrid = document.querySelector('.events-grid');
        const cards = document.querySelectorAll('.event-card');
        
        let currentSlide = 0;
        const cardWidth = cards.length > 0 ? cards[0].offsetWidth + 30 : 0; // العرض + المسافة
        
        // تحديث الحالة النشطة للنقاط
        const updateDots = (index) => {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        };
        
        // الانتقال إلى الشريحة المحددة
        const goToSlide = (index) => {
            if (window.innerWidth <= 768) { // على الشاشات الصغيرة
                currentSlide = index;
                const translateValue = -index * 100; // 100% لكل شريحة
                eventsGrid.style.transform = `translateX(${translateValue}%)`;
                updateDots(index);
            } else {
                // على الشاشات الكبيرة، نحتاج لحساب مختلف
                // لا نطبق تأثير السلايدر على الشاشات الكبيرة
            }
        };
        
        // إضافة مستمعي الأحداث للتنقل
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    goToSlide(currentSlide);
                }
            });
            
            nextButton.addEventListener('click', () => {
                if (currentSlide < cards.length - 1) {
                    currentSlide++;
                    goToSlide(currentSlide);
                }
            });
        }
        
        // إضافة مستمعي الأحداث للنقاط
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                goToSlide(currentSlide);
            });
        });
        
        // تحسين السلايدر للهواتف المحمولة
        if (window.innerWidth <= 768) {
            eventsGrid.style.display = 'flex';
            eventsGrid.style.transition = 'transform 0.5s ease';
            cards.forEach(card => {
                card.style.flex = '0 0 100%';
                card.style.maxWidth = '100%';
            });
        } else {
            // إعادة تعيين النمط للشاشات الكبيرة
            eventsGrid.style.display = 'grid';
            eventsGrid.style.transform = 'none';
            cards.forEach(card => {
                card.style.flex = 'unset';
                card.style.maxWidth = 'unset';
            });
        }
        
        // إعادة تهيئة عند تغيير حجم الشاشة
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                eventsGrid.style.display = 'flex';
                eventsGrid.style.transition = 'transform 0.5s ease';
                cards.forEach(card => {
                    card.style.flex = '0 0 100%';
                    card.style.maxWidth = '100%';
                });
                goToSlide(currentSlide);
            } else {
                eventsGrid.style.display = 'grid';
                eventsGrid.style.transform = 'none';
                cards.forEach(card => {
                    card.style.flex = 'unset';
                    card.style.maxWidth = 'unset';
                });
            }
        });

        // إضافة تفاعل لمعرض الصور
        const galleryButtons = document.querySelectorAll('.event-gallery');
        
        if (galleryButtons.length > 0) {
            galleryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // إنشاء معرض الصور المنبثق
                    createPhotoGallery();
                });
            });
        }
        
        // إنشاء معرض صور منبثق
        function createPhotoGallery() {
            // إنشاء عنصر المعرض المنبثق
            const galleryModal = document.createElement('div');
            galleryModal.className = 'gallery-modal';
            
            // إنشاء محتوى المعرض
            const modalContent = document.createElement('div');
            modalContent.className = 'gallery-content';
            
            // إضافة زر الإغلاق
            const closeBtn = document.createElement('button');
            closeBtn.className = 'gallery-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            modalContent.appendChild(closeBtn);
            
            // إنشاء عارض الصور مع رابط تويتر
            const imageViewer = document.createElement('div');
            imageViewer.className = 'image-viewer';
            
            imageViewer.innerHTML = `
                <div class="gallery-main">
                    <p>لقطات من فعالية جادة30 - دورة أدوات وتقنيات الذكاء الاصطناعي</p>
                    <div class="twitter-embed">
                        <a href="https://x.com/SpaceSA0/status/1899510325365354915" target="_blank" class="twitter-link">
                            <i class="fab fa-twitter"></i>
                            <span>مشاهدة اللقطات على منصة X</span>
                        </a>
                        <div class="twitter-preview">
                            <div class="twitter-icon">
                                <i class="fab fa-twitter"></i>
                            </div>
                            <p>تغريدة من حساب @SpaceSA0</p>
                        </div>
                    </div>
                    <div class="gallery-hashtag">#CopilotMasafa</div>
                </div>
            `;
            
            modalContent.appendChild(imageViewer);
            galleryModal.appendChild(modalContent);
            document.body.appendChild(galleryModal);
            
            // إضافة تحريك ظهور للمعرض
            setTimeout(() => {
                galleryModal.classList.add('active');
            }, 10);
            
            // إغلاق المعرض عند النقر على زر الإغلاق
            closeBtn.addEventListener('click', () => {
                galleryModal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(galleryModal);
                }, 300);
            });
            
            // إغلاق المعرض عند النقر خارج محتوى المعرض
            galleryModal.addEventListener('click', (e) => {
                if (e.target === galleryModal) {
                    galleryModal.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(galleryModal);
                    }, 300);
                }
            });
        }
    };
    
    // تنفيذ سلايدر الفعاليات
    if (document.querySelector('.events-slider')) {
        initEventsSlider();
    }

    // إضافة تأثير تِلْت على بطاقات التقنيات
    const initTiltEffect = () => {
        const tiltElements = document.querySelectorAll('.tech-card[data-tilt]');
        
        if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(tiltElements, {
                max: 10,
                speed: 400,
                glare: true,
                'max-glare': 0.2
            });
        }
    };
    
    // تحميل مكتبة VanillaTilt ديناميكيًا إذا لم تكن موجودة
    const loadVanillaTilt = () => {
        if (typeof VanillaTilt === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js';
            script.onload = initTiltEffect;
            document.head.appendChild(script);
        } else {
            initTiltEffect();
        }
    };
    
    loadVanillaTilt();
    
    // تفعيل تصفية فئات التقنيات
    const techCategories = document.querySelectorAll('.tech-category');
    if (techCategories.length > 0) {
        techCategories.forEach(category => {
            category.addEventListener('click', function() {
                // إزالة الفئة النشطة من جميع الفئات
                techCategories.forEach(c => c.classList.remove('active'));
                
                // إضافة الفئة النشطة للعنصر المنقور
                this.classList.add('active');
                
                // هنا يمكن إضافة منطق تصفية البطاقات حسب الفئة
                const categoryName = this.textContent;
                console.log(`تم اختيار فئة: ${categoryName}`);
                
                // أنيميشن بسيط عند تغيير الفئة
                const techCards = document.querySelectorAll('.tech-card');
                techCards.forEach(card => {
                    card.style.opacity = '0.5';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 300);
                });
            });
        });
    }

    // تهيئة فلاتر الفعاليات
    initEventsFilter();
    
    // تحديث العد التنازلي
    updateCountdowns();
    
    // تهيئة صفحات التنقل
    initEventsPagination();

    // تهيئة تأثير الجسيمات
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ff3636"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff3636",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // تأثير النص المكتوب بالآلة الكاتبة
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const originalText = typingTextElement.textContent;
        typingTextElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                typingTextElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // بدء تأثير الكتابة بعد تحميل الصفحة
        setTimeout(typeWriter, 1000);
    }

    // إظهار الحقل الإضافي عند اختيار "دور آخر"
    const roleOtherOption = document.getElementById('role-other');
    const otherRoleGroup = document.querySelector('.other-role-group');
    
    if (roleOtherOption && otherRoleGroup) {
        const roleOptions = document.querySelectorAll('input[name="role"]');
        
        roleOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (roleOtherOption.checked) {
                    otherRoleGroup.classList.remove('hidden');
                    document.getElementById('other-role').setAttribute('required', 'required');
                } else {
                    otherRoleGroup.classList.add('hidden');
                    document.getElementById('other-role').removeAttribute('required');
                }
            });
        });
    }
    
    // معالجة تقديم النموذج
    const joinForm = document.getElementById('join-form');
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيمة الدور المختار
            let selectedRole = '';
            const roleInputs = document.querySelectorAll('input[name="role"]');
            
            roleInputs.forEach(input => {
                if (input.checked) {
                    selectedRole = input.value;
                    if (input.id === 'role-other') {
                        selectedRole = document.getElementById('other-role').value;
                    }
                }
            });
            
            // بدء تأثير التحميل
            const submitButton = joinForm.querySelector('.submit-button');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<div class="loading-spinner"></div><span>جاري الإرسال...</span>';
            submitButton.disabled = true;
            
            // محاكاة الإرسال (يمكن استبدالها بإرسال فعلي للبيانات)
            setTimeout(() => {
                // إنشاء رسالة النجاح
                const formContainer = joinForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>تم استلام طلبك بنجاح!</h3>
                    <p>شكراً على اهتمامك بالانضمام إلى فريق مَـســـافـــــــة. سيتم التواصل معك قريباً.</p>
                    <div class="success-details">
                        <p><strong>الاسم:</strong> ${document.getElementById('fullName').value}</p>
                        <p><strong>البريد الإلكتروني:</strong> ${document.getElementById('email').value}</p>
                        <p><strong>الدور:</strong> ${selectedRole}</p>
                    </div>
                `;
                
                // حفظ ارتفاع النموذج الحالي
                const formHeight = joinForm.offsetHeight;
                formContainer.style.minHeight = `${formHeight}px`;
                
                // استبدال النموذج برسالة النجاح
                joinForm.style.opacity = '0';
                setTimeout(() => {
                    joinForm.style.display = 'none';
                    formContainer.appendChild(successMessage);
                    
                    // تأثير الظهور لرسالة النجاح
                    setTimeout(() => {
                        successMessage.style.opacity = '1';
                    }, 10);
                }, 300);
            }, 1500);
        });
    }
    
    // إضافة تأثيرات عند التركيز على الحقول
    const formElements = document.querySelectorAll('.join-form input, .join-form textarea, .join-form select');
    
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('form-group-focus');
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.classList.remove('form-group-focus');
        });
    });

    // تهيئة فلترة الفعاليات
    initEventsFilter();
    
    // معالجة نموذج النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            const originalButtonHTML = submitButton.innerHTML;
            
            // تغيير حالة الزر إلى تحميل
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            // محاكاة إرسال البيانات
            setTimeout(() => {
                // إظهار رسالة نجاح
                emailInput.value = '';
                submitButton.innerHTML = '<i class="fas fa-check"></i>';
                
                // إظهار رسالة تأكيد
                const newsletterSection = newsletterForm.closest('.footer-newsletter');
                const confirmMessage = document.createElement('div');
                confirmMessage.className = 'newsletter-confirm';
                confirmMessage.innerHTML = 'تم تسجيل بريدك الإلكتروني بنجاح!';
                newsletterSection.appendChild(confirmMessage);
                
                // إعادة الزر لحالته الأصلية بعد فترة
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonHTML;
                    submitButton.disabled = false;
                    
                    // إخفاء رسالة التأكيد بعد فترة
                    setTimeout(() => {
                        confirmMessage.style.opacity = '0';
                        setTimeout(() => {
                            newsletterSection.removeChild(confirmMessage);
                        }, 300);
                    }, 3000);
                }, 1500);
            }, 1000);
        });
    }
});

// فلترة الفعاليات
const initEventsFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // إضافة تأثير للأزرار
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.transform = 'translateY(0)';
                });
                
                // تنشيط الزر المضغوط مع تأثير حركي
                this.classList.add('active');
                this.style.transform = 'translateY(-3px)';
                
                const filterValue = this.getAttribute('data-filter');
                
                // تطبيق الفلترة على البطاقات بتأثيرات متحركة
                eventCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8) translateY(20px)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1) translateY(0)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }
};

// تحديث العد التنازلي للفعاليات القادمة
const updateCountdowns = () => {
    const countdownElements = document.querySelectorAll('.event-countdown');
    
    countdownElements.forEach(countdownElement => {
        const targetDate = new Date(countdownElement.getAttribute('data-date')).getTime();
        
        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                // انتهى الوقت
                countdownElement.innerHTML = '<div class="countdown-ended">بدأت الفعالية</div>';
                return;
            }
            
            // حساب الوقت المتبقي
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            // تحديث العناصر
            const daysElement = countdownElement.querySelector('.countdown-item:nth-child(1) .countdown-number');
            const hoursElement = countdownElement.querySelector('.countdown-item:nth-child(2) .countdown-number');
            const minutesElement = countdownElement.querySelector('.countdown-item:nth-child(3) .countdown-number');
            
            if (daysElement && hoursElement && minutesElement) {
                daysElement.textContent = days.toString().padStart(2, '0');
                hoursElement.textContent = hours.toString().padStart(2, '0');
                minutesElement.textContent = minutes.toString().padStart(2, '0');
            }
        };
        
        updateTimer();
        setInterval(updateTimer, 60000); // تحديث كل دقيقة
    });
};

// إضافة صفحات التنقل
const initEventsPagination = () => {
    const eventsWrapper = document.querySelector('.events-wrapper');
    const paginationContainer = document.querySelector('.events-pagination');
    const prevButton = document.querySelector('.events-nav.prev');
    const nextButton = document.querySelector('.events-nav.next');
    
    if (!eventsWrapper || !paginationContainer) return;
    
    const eventCards = eventsWrapper.querySelectorAll('.event-card');
    const totalEvents = eventCards.length;
    const eventsPerPage = 3;
    const pageCount = Math.ceil(totalEvents / eventsPerPage);
    
    let currentPage = 0;
    
    // إنشاء نقاط الصفحات
    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToPage(i);
        });
        
        paginationContainer.appendChild(dot);
    }
    
    // وظيفة الانتقال للصفحة
    const goToPage = (pageIndex) => {
        if (pageIndex < 0 || pageIndex >= pageCount) return;
        
        currentPage = pageIndex;
        
        // تحديث النقاط النشطة
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentPage);
        });
        
        // عرض البطاقات المناسبة
        eventCards.forEach((card, i) => {
            const startIndex = currentPage * eventsPerPage;
            const endIndex = startIndex + eventsPerPage - 1;
            
            if (i >= startIndex && i <= endIndex) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 * (i - startIndex));
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };
    
    // أزرار التنقل
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToPage(currentPage - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToPage(currentPage + 1);
        });
    }
    
    // البدء بالصفحة الأولى
    goToPage(0);
};
