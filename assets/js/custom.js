const toggleBtn = document.getElementById('toggle_btn');
const docsNav = document.querySelector('.mavro_sidebar');
const overlay = document.querySelector('.overlay');
const navDropA = document.querySelectorAll('.nav_drop li a');

toggleBtn.addEventListener('click', function() {
    docsNav.classList.add('active');
    overlay.classList.add('active');
});

overlay.addEventListener('click', function() {
    docsNav.classList.remove('active');
    overlay.classList.remove('active');
});

navDropA.forEach(a => {
    a.addEventListener('click', function() {
        docsNav.classList.remove('active');
        overlay.classList.remove('active');
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
const items = document.querySelectorAll('.nav_drop_item');

items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

const navDropItem = document.querySelectorAll('.nav_drop_item');
navDropItem.forEach(item => {
    item.addEventListener('click', () => {
        navDropItem.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});


// ======= Scroll Spy Function =====
function scrollSpy() {
  const container = document.querySelector('.docs_wraper');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav_drop_item a');

  function onScroll() {
    let currentSectionId = null;
    const scrollTop = container.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollTop >= sectionTop - sectionHeight / 1) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const parent = link.parentElement;
      if (currentSectionId && link.getAttribute('href') === '#' + currentSectionId) {
        parent.classList.add('active');
      } else {
        parent.classList.remove('active');
      }
    });
  }

  onScroll();

  container.addEventListener('scroll', onScroll);
}

scrollSpy();


