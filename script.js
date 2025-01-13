const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');
const year = document.getElementById('current-year');

// Displaying current year
const now = new Date();
year.innerText = now.getFullYear();

// When user scrolled chnages the header bg color
const isSrolled = ()=>{
  if (window.scrollY > 200) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener('load',isSrolled);
window.addEventListener("scroll",isSrolled);

// When sidebar is open disabling the screen scrollbar vertically
function toggleBodyScroll() {
  if (navLinks.classList.contains("active")) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
}

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('openSidebar');
  toggleBodyScroll();
});

// Close sidebar when open or clicked on document except header
const closeSidebar = ()=>{
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('openSidebar');
    document.body.classList.remove("no-scroll");
  }
}

document.addEventListener('click',()=>{
  closeSidebar();
});

navbar.addEventListener('click',(e)=>e.stopPropagation());

// When clicking on sidebar's nav-link then scrolling to get specific section and closing the sidebar
navItems.forEach((navItem) => {
  navItem.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = navItem.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    closeSidebar();
  });
});

// When user submit the detail
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const contactData = {
    name,
    email,
    message,
  };

  const contactDataArray = JSON.parse(localStorage.getItem('contactData')) || [];
  contactDataArray.push(contactData);
  localStorage.setItem('contactData', JSON.stringify(contactDataArray));

  thankYouMessage.style.display = 'block';

  contactForm.reset();

  setTimeout(() => {
    thankYouMessage.style.display = 'none';
  }, 3000);
});
