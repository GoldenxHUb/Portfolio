document.addEventListener('DOMContentLoaded', () => {
  // Intro text animation
  const firstText = document.getElementById('firstText');
  const secondText = document.getElementById('secondText');
  const mainContent = document.getElementById('mainContent');
  const contactButton = document.getElementById('contact-button');
  
  // Animation sequence
  setTimeout(() => firstText.style.opacity = 1, 100);
  setTimeout(() => firstText.style.animation = 'slideUpFadeOut 0.6s forwards', 800);
  setTimeout(() => secondText.style.opacity = 1, 1000);
  setTimeout(() => secondText.style.animation = 'slideDownFadeOut 0.6s forwards', 1600);
  setTimeout(() => {
    mainContent.style.opacity = 1;
    firstText.remove();
    secondText.remove();
  }, 2200);

  // Contact button email copy
  contactButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("ไปแอดชื่อในดิสเอาชื่อนี้ zynx._dev").then(() => {
      contactButton.textContent = 'Copied!';
      setTimeout(() => contactButton.textContent = 'Contact', 1000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  });

  // Popup Management System
  const popups = {
    tos: {
      trigger: document.querySelector('.footer-links a:nth-child(2)'), // Terms link
      popup: document.getElementById('tosPopup'),
      close: document.getElementById('closeTosPopup')
    },
    privacy: {
      trigger: document.querySelector('.footer-links a:nth-child(1)'), // Privacy link
      popup: document.getElementById('privacyPopup'),
      close: document.getElementById('closePrivacyPopup')
    }
  };

  // Initialize all popups
  const initPopups = () => {
    Object.values(popups).forEach(({trigger, popup, close}) => {
      if (trigger && popup && close) {
        // Open popup
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          document.body.style.overflow = 'hidden';
          popup.style.display = 'flex';
          
          // Trigger animation
          setTimeout(() => {
            popup.classList.add('active');
          }, 10);
        });

        // Close popup
        const closePopup = () => {
          popup.classList.remove('active');
          setTimeout(() => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
          }, 300);
        };

        close.addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => {
          if (e.target === popup) closePopup();
        });
      }
    });

    // Close all popups with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Object.values(popups).forEach(({popup}) => {
          if (popup.style.display === 'flex') {
            popup.classList.remove('active');
            setTimeout(() => {
              popup.style.display = 'none';
              document.body.style.overflow = '';
            }, 300);
          }
        });
        if (acceptanceFlow.style.display === 'flex') {
          closeAcceptanceFlow();
        }
      }
    });
  };

  initPopups();

  // Logo hover animation
  const logoHoverArea = document.querySelector('.logo-hover-area');
  if (logoHoverArea) {
    logoHoverArea.addEventListener('mouseenter', () => {
      const visualText = document.querySelector('.visual-text');
      if (visualText) {
        visualText.style.opacity = '1';
        visualText.style.maxWidth = '200px';
        visualText.style.marginLeft = '15px';
      }
    });

    logoHoverArea.addEventListener('mouseleave', () => {
      const visualText = document.querySelector('.visual-text');
      if (visualText) {
        visualText.style.opacity = '0';
        visualText.style.maxWidth = '0';
        visualText.style.marginLeft = '0';
      }
    });
  }

  const installButton = document.querySelector('.btn[href="#"]');
  const acceptanceFlow = document.getElementById('acceptanceFlow');
  const downloadUrl = "https://getvisual.cc/download";

  if (installButton) {
    installButton.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.acceptance-step').forEach(step => {
        step.style.display = 'none';
      });
      document.getElementById('tosAcceptStep').style.display = 'flex';
      document.body.style.overflow = 'hidden';
      acceptanceFlow.style.display = 'flex';
      setTimeout(() => {
        acceptanceFlow.classList.add('active');
      }, 10);
    });
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-accept')) {
      const nextStep = e.target.dataset.next;
      
      if (nextStep === 'download') {
        window.location.href = downloadUrl;
        closeAcceptanceFlow();
      } else {
        // Move to next step
        document.querySelectorAll('.acceptance-step').forEach(step => {
          step.style.display = 'none';
        });
        document.getElementById(nextStep).style.display = 'flex';
      }
    }
    
    if (e.target.classList.contains('btn-decline')) {
      closeAcceptanceFlow();
    }
  });

  function closeAcceptanceFlow() {
    acceptanceFlow.classList.remove('active');
    setTimeout(() => {
      acceptanceFlow.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }
});