const toggleBtn = document.getElementById('toggle_btn');
const docsNav = document.querySelector('.mavro_sidebar');
const overlay = document.querySelector('.overlay');
const navDropA = document.querySelectorAll('.nav_drop li a');
const ToggleBtnClose = document.querySelector('#toggle_btn_close');

toggleBtn.addEventListener('click', function() {
    docsNav.classList.add('active');
    overlay.classList.add('active');
});

overlay.addEventListener('click', function() {
    docsNav.classList.remove('active');
    overlay.classList.remove('active');
});

ToggleBtnClose.addEventListener('click', function() {
    docsNav.classList.remove('active');
    overlay.classList.remove('active');
});

navDropA.forEach(a => {
    a.addEventListener('click', function() {
        docsNav.classList.remove('active');
        overlay.classList.remove('active');
    });
});


document.querySelectorAll('.navs_item .nav_toggle').forEach(function(input) {
    input.addEventListener('click', function () {
        docsNav.classList.remove('active');
        overlay.classList.remove('active');
        const parentLi = this.closest('.navs_item');
        const link = parentLi.querySelector('a');
        if (link) {
            link.click();
        }
    });
});

const toggles = document.querySelectorAll('.nav_toggle');
toggles.forEach(toggle => {
    toggle.addEventListener('change', function () {
        if (this.checked) {
            toggles.forEach(other => {
                if (other !== this) {
                    other.checked = false;
                }
            });
        }
    });
});


// ===== Click Function =====
const navDropItem = document.querySelectorAll('.nav_drop_item');

navDropItem.forEach(item => {
    item.addEventListener('click', () => {
        navDropItem.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.nav_item > .nav_toggle').forEach(cb => {
            cb.checked = false;
        });

        const navDrop = item.closest('.nav_drop');
        if (navDrop) {
            const navItem = navDrop.closest('.nav_item');
            if (navItem) {
                const checkbox = navItem.querySelector(':scope > .nav_toggle');
                if (checkbox) checkbox.checked = true;
            }
        }
    });
});

// navs_item এর link click
const navsItem = document.querySelector('.navs_item');
if (navsItem) {
    navsItem.querySelector('a').addEventListener('click', () => {
        navDropItem.forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.nav_item > .nav_toggle').forEach(cb => {
            cb.checked = false;
        });
        navsItem.querySelector('.nav_toggle').checked = true;
    });
}


// ===== Smooth Scroll with Offset Fix =====
document.querySelectorAll('.nav_drop_item a, .navs_item a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            const container = document.querySelector('.docs_wraper');
            container.scrollTo({
                top: target.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});


// ===== Scroll Spy Function =====
function scrollSpy() {
    const container = document.querySelector('.docs_wraper');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav_drop_item a');

    function onScroll() {
        let currentSectionId = null;
        const scrollTop = container.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollTop >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav_item > .nav_toggle').forEach(cb => {
            cb.checked = false;
        });
        navDropItem.forEach(i => i.classList.remove('active'));

        // navs_item (welcome) check করো
        if (currentSectionId === 'welcome1') {
            if (navsItem) navsItem.querySelector('.nav_toggle').checked = true;
            return;
        }

        navLinks.forEach(link => {
            const parent = link.parentElement;
            if (currentSectionId && link.getAttribute('href') === '#' + currentSectionId) {
                parent.classList.add('active');

                const navDrop = parent.closest('.nav_drop');
                if (navDrop) {
                    const navItem = navDrop.closest('.nav_item');
                    if (navItem) {
                        const checkbox = navItem.querySelector(':scope > .nav_toggle');
                        if (checkbox) checkbox.checked = true;
                    }
                }
            }
        });
    }

    onScroll();
    container.addEventListener('scroll', onScroll);
}

scrollSpy();


document.querySelectorAll('.sv_step_theme_img span').forEach(function(span) {
    span.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});