// إدارة السمات وتحسين التجربة العامة

document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثير التمرير للهيدر
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // تحسين تتبع السكرول وتحديث القائمة النشطة
    const updateActiveSection = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    };
    
    updateActiveSection();
    
    // إضافة تأثير النقر على الروابط والأزرار
    const addClickEffect = () => {
        const clickableElements = document.querySelectorAll('a, button, .role-card, .tech-card, .event-card');
        
        clickableElements.forEach(element => {
            element.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    };
    
    addClickEffect();
    
    // تحسين المحتوى عند التمرير
    const enhanceScrolling = () => {
        // إضافة مكتبة AOS إذا كانت موجودة
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100,
            });
        }
        
        // إضافة تأثيرات إضافية للعناصر عند التمرير
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        
        if (elementsToAnimate.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1 });
            
            elementsToAnimate.forEach(element => {
                observer.observe(element);
            });
        }
    };
    
    enhanceScrolling();
    
    // إزالة وظيفة createMobileMenu القديمة
    // وتعويضها بوظيفة nav-toggle الموجودة بالفعل
    
    // التأكد من أن وظيفة createMobileMenu لم تعد تستدعى
    // ولا حاجة لإعادة تهيئتها عند تغيير حجم الشاشة
    
    window.addEventListener('resize', function() {
        // إزالة الشيفرة القديمة التي كانت تنشئ menu-button
        // والاكتفاء بعنصر nav-toggle الموجود في HTML
        
        // فقط نتأكد من إغلاق القائمة عند تغيير حجم الشاشة للنسخة المكتبية
        if (window.innerWidth > 768) {
            document.querySelector('nav').classList.remove('active');
            document.getElementById('nav-toggle').classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// إضافة وظيفة تنشيط شريط التنقل
document.addEventListener('DOMContentLoaded', function() {
    // تأثير التمرير للهيدر
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.querySelector('nav');
    
    // تأثير التمرير للهيدر
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // التنقل بين القوائم وتنشيط الروابط
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        let scrollPosition = window.scrollY;
        
        // يضيف قيمة للتعويض عن ارتفاع الهيدر
        const scrollOffset = 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - scrollOffset;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // تبديل قائمة الهاتف المحمول
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        
        // تعطيل التمرير عندما تكون القائمة مفتوحة
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // إغلاق القائمة عند النقر على الروابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها أو التمرير
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && !nav.contains(event.target) && !navToggle.contains(event.target)) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
