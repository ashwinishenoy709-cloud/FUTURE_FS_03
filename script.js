// Mobile sidebar menu: open/close via toggle, close button, overlay click, or Escape
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  // ===================== FULL MENU MODAL =====================

const menuButtons = document.querySelectorAll('.view-menu-btn');
const menuModal = document.getElementById('menu-modal');
const menuModalClose = document.getElementById('menu-modal-close');
const menuImage = document.getElementById('menu-image');
const menuPrev = document.getElementById('menu-prev');
const menuNext = document.getElementById('menu-next');
const menuPageLabel = document.getElementById('menu-page-label');

const menuImages = [
  'assets/menu/menu1.jpeg',
  'assets/menu/menu2.jpeg',
  'assets/menu/menu3.jpeg',
  'assets/menu/menu4.jpeg',
  'assets/menu/menu5.jpeg',
  'assets/menu/menu6.jpeg',
  'assets/menu/menu7.jpeg',
  'assets/menu/menu8.jpeg',
  'assets/menu/menu9.jpeg',
  'assets/menu/menu10.jpeg'
];

let currentMenuPage = 0;

  function updateMenuImage() {
    menuImage.src = menuImages[currentMenuPage];
    menuImage.alt = `Coverse Cafe menu page ${currentMenuPage + 1}`;

    menuPageLabel.textContent =
      `Page ${currentMenuPage + 1} of ${menuImages.length}`;

    menuPrev.disabled = currentMenuPage === 0;
    menuNext.disabled = currentMenuPage === menuImages.length - 1;

    menuPrev.classList.toggle('opacity-40', menuPrev.disabled);
    menuNext.classList.toggle('opacity-40', menuNext.disabled);
  }

  function openFullMenu() {
    currentMenuPage = 0;
    updateMenuImage();

    menuModal.classList.remove('hidden');
    menuModal.classList.add('flex');

    menuModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
  }

  function closeFullMenu() {
    menuModal.classList.add('hidden');
    menuModal.classList.remove('flex');

    menuModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  }

  menuButtons.forEach(button => {
    button.addEventListener('click', openFullMenu);
  });

  menuModalClose.addEventListener('click', closeFullMenu);

  menuPrev.addEventListener('click', () => {
    if (currentMenuPage > 0) {
      currentMenuPage--;
      updateMenuImage();
    }
  });

  menuNext.addEventListener('click', () => {
    if (currentMenuPage < menuImages.length - 1) {
      currentMenuPage++;
      updateMenuImage();
    }
  });

  // Close when clicking the dark area outside the menu
  menuModal.addEventListener('click', (e) => {
    if (e.target === menuModal) {
      closeFullMenu();
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (menuModal.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      closeFullMenu();
    }

    if (e.key === 'ArrowLeft' && currentMenuPage > 0) {
      currentMenuPage--;
      updateMenuImage();
    }

    if (
      e.key === 'ArrowRight' &&
      currentMenuPage < menuImages.length - 1
    ) {
      currentMenuPage++;
      updateMenuImage();
    }
  });

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    menuOverlay.classList.add('opacity-0', 'pointer-events-none');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Contact form interception + validation + success state
  const form = document.getElementById('contact-form');
  const formFields = document.getElementById('form-fields');
  const successBox = document.getElementById('success-box');
  const submitBtn = document.getElementById('submit-btn');

  function showError(input, message) {
    const wrapper = input.closest('div');
    const errorEl = wrapper.querySelector('.error-text');
    input.classList.add('border-red-400');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
  }

  function clearError(input) {
    const wrapper = input.closest('div');
    const errorEl = wrapper.querySelector('.error-text');
    input.classList.remove('border-red-400');
    if (errorEl) errorEl.classList.add('hidden');
  }

  form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  let isValid = true;

  [nameInput, emailInput, messageInput].forEach(clearError);

  if (!nameInput.value.trim()) {
    showError(nameInput, 'Please enter your name.');
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailInput.value.trim() ||
    !emailPattern.test(emailInput.value.trim())
  ) {
    showError(emailInput, 'Please enter a valid email address.');
    isValid = false;
  }

  if (!messageInput.value.trim()) {
    showError(messageInput, 'Please add a short message.');
    isValid = false;
  }

  if (!isValid) return;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  submitBtn.classList.add('opacity-70');

  try {
    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      formFields.classList.add('hidden');
      successBox.classList.remove('hidden');

      form.reset();
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    alert('Unable to send your message. Please check your connection and try again.');
  } finally {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-70');
  }
});