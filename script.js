// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Typewriter Effect
const texts = [
  "IT Enthusiast & Developer",
  "AI & Tech Explorer",
  "Multilingual Enthusiast",
  "German Fluency",
  "English Fluency"
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isWaiting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

const typingTextElement = document.getElementById('typing-text');
const typewriterContainer = document.querySelector('.typewriter-container');

function typeWriter() {
  if (isWaiting) return;
  
  const currentText = texts[currentTextIndex];
  
  if (!isDeleting) {
    typingTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    
    if (currentCharIndex % 2 === 0) {
      typewriterContainer.style.boxShadow = '0 0 40px rgba(139, 92, 246, 0.3)';
      setTimeout(() => {
        typewriterContainer.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.1)';
      }, 100);
    }
    
    if (currentCharIndex === currentText.length) {
      isWaiting = true;
      typewriterContainer.style.boxShadow = '0 0 50px rgba(139, 92, 246, 0.4)';
      setTimeout(() => {
        typewriterContainer.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.1)';
        isWaiting = false;
        isDeleting = true;
        typeWriter();
      }, pauseTime);
      return;
    }
  } else {
    typingTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    
    if (currentCharIndex % 2 === 0) {
      typewriterContainer.style.boxShadow = '0 0 35px rgba(14, 165, 233, 0.25)';
      setTimeout(() => {
        typewriterContainer.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.1)';
      }, 100);
    }
    
    if (currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      typewriterContainer.style.boxShadow = '0 0 45px rgba(14, 165, 233, 0.4)';
      setTimeout(() => {
        typewriterContainer.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.1)';
      }, 400);
    }
  }
  
  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 1500);

// Navigation & all original functionality
document.addEventListener('DOMContentLoaded', function() {
  // BULB toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light-mode');
      themeToggle.classList.add('pulled');
      setTimeout(() => themeToggle.classList.remove('pulled'), 200);
      const isLight = document.body.classList.contains('light-mode');
      showToast(isLight ? "☀️ Light mode" : "🌙 Dark mode");
    });
  }

  // Navigation
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  
  function activateSection(targetId) {
    sections.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    navButtons.forEach(b => b.classList.remove('active'));
    
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add('active');
      target.style.display = 'block';
      
      if (targetId === 'hello') {
        forceHelloDisplay();
      }
    }
    
    const activeBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    // Pe mobil, ascunde sidebar-ul dacă nu ești pe hello
    if (window.innerWidth <= 768) {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        if (targetId === 'hello') {
          sidebar.style.display = 'block';
        } else {
          sidebar.style.display = 'none';
        }
      }
    }
  }
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      activateSection(targetId);
      if (targetId === 'hello') showToast("👋 Hello! Thanks for visiting!");
      else if (targetId === 'journey') showToast("📚 Exploring my journey timeline");
      else if (targetId === 'projects') showToast("📁 Exploring my projects");
      
      // Închide meniul mobil după click
      const nav = document.querySelector('nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (menuToggle) {
          menuToggle.innerHTML = '☰';
        }
      }
    });
  });

  function forceHelloDisplay() {
    const hello = document.getElementById('hello');
    if (!hello) return;
    hello.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important;';
    const container = hello.querySelector('.hello-container');
    if (container) container.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important;';
  }

  // Hello counter
  const counterEl = document.getElementById('helloCounter');
  if (counterEl) {
    let count = localStorage.getItem('helloCounter');
    count = count ? parseInt(count) + 1 : 158;
    localStorage.setItem('helloCounter', count);
    counterEl.textContent = count;
  }

  // Candidate generator
  const reasons = [
    "🌍 I speak Romanian, English, and German fluently.",
    "💡 I see challenges as puzzles and find innovative solutions.",
    "🚀 My curiosity drives me to constantly acquire new skills.",
    "🤝 I understand diverse perspectives and collaborate effectively.",
    "⚡ I thrive in dynamic environments and embrace change.",
    "🎯 My 'perfectionism' ensures quality and precision.",
    "🔍 I break down complex problems into manageable solutions.",
    "🌟 I bring genuine enthusiasm and dedication.",
    "🧠 I master new technologies and concepts rapidly.",
    "⚙ I easily integrate into new environments and collectives.",
    "💬 I prioritize meeting new people and building connections."
  ];
  
  const strengths = [
    "✨ My perfectionism ensures every detail is polished.",
    "🌱 My curiosity drives me to discover innovative approaches.",
    "🎨 My creative thinking brings unique perspectives.",
    "⚡ My adaptability makes me effective in fast-paced environments.",
    "💪 My determination means I never give up.",
    "🤔 My analytical nature questions assumptions to find better ways.",
    "🌈 My optimism helps me treat situations positively."
  ];
  
  const genDisplay = document.getElementById('generatorDisplay');
  const genBtn = document.getElementById('generateReason');
  const strengthBtn = document.getElementById('generateStrength');
  
  if (genBtn) genBtn.addEventListener('click', () => {
    genDisplay.textContent = reasons[Math.floor(Math.random() * reasons.length)];
  });
  
  if (strengthBtn) strengthBtn.addEventListener('click', () => {
    genDisplay.textContent = strengths[Math.floor(Math.random() * strengths.length)];
  });

  // Email functionality
  function openEmail(subject = "Hello Otilia", body = "I visited your portfolio and would like to connect!") {
    window.location.href = `mailto:otiliamuntean48@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + "\n\nBest regards,\n[Your Name]")}`;
  }

  document.getElementById('sendEmail')?.addEventListener('click', () => {
    showToast("📧 Opening email...");
    openEmail("Hello Otilia", "I visited your portfolio and I'm impressed with your work!");
  });

  document.getElementById('sendEmailAbout')?.addEventListener('click', () => {
    showToast("📧 Opening email...");
    openEmail("Hello Otilia", "I visited your portfolio and would like to discuss opportunities!");
  });

  document.getElementById('scheduleCall')?.addEventListener('click', () => {
    showToast("📅 Opening scheduling calendar...");
    setTimeout(() => window.open('https://calendly.com/', '_blank'), 800);
  });

  // Download CV
  document.getElementById('downloadCVHello')?.addEventListener('click', () => {
    showToast("📄 Preparing CV download...");
    const link = document.createElement('a');
    link.href = 'Muntean Otilia CV (1).pdf';
    link.download = 'Otilia_Muntean_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => showToast("✅ CV downloaded! Check your downloads folder."), 500);
  });
  
  // Business card download
  document.getElementById('downloadBusinessCard')?.addEventListener('click', (e) => {
    e.stopPropagation();
    showToast("📇 Downloading contact card...");
    
    setTimeout(() => {
      const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Otilia Muntean
N:Muntean;Otilia;;;
EMAIL;TYPE=INTERNET:otiliamuntean48@gmail.com
TEL;TYPE=CELL:
ADR;TYPE=WORK:;;Chisinau;Moldova;;;
TITLE:IT Enthusiast & Developer
ORG:Digital Portfolio
NOTE:Creative thinker • Desire to learn • Open-minded
URL:https://otiliamuntean48.wixsite.com/carteatacarteamea-1
CATEGORIES:Contact
END:VCARD`;
      
      const blob = new Blob([vCardData], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Otilia_Muntean.vcf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("✅ Contact saved! Check your downloads folder.");
    }, 500);
  });

  // Detailed request button
  document.getElementById('sendDetailedRequestBtn')?.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.detail-option:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);
    if (selected.length === 0) {
      showToast("⚠️ Please select at least one option!");
      return;
    }
    
    let body = "I am interested in receiving detailed information about the following:\n\n";
    selected.forEach(opt => {
      if (opt === 'certificates') body += "📜 Certificates & Achievements\n";
      else if (opt === 'projects') body += "💻 Project Code & Case Studies\n";
      else if (opt === 'recommendations') body += "⭐ Recommendations\n";
      else if (opt === 'languages') body += "🌍 Language Certificates\n";
    });
    body += "\nThank you!\n\n[Your Name]";
    
    const subject = "Request for detailed information";
    window.location.href = `mailto:otiliamuntean48@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast("📧 Opening email client with your request...");
  });

  // Ask question button
  document.getElementById('askQuestionBtn')?.addEventListener('click', () => {
    showToast("📝 Feel free to ask anything!");
    openEmail("Question about your work", "Hi Otilia,\n\nI have a specific question about...");
  });

  // Exam certificates data
// Exam certificates data
function certificateImage(colors, label) {
  const svg = `
    <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" rx="8" fill="url(#grad)"/>
      <circle cx="42" cy="34" r="22" fill="white" opacity="0.22"/>
      <circle cx="160" cy="86" r="30" fill="white" opacity="0.16"/>
      <path d="M35 88L88 42L118 72L164 35" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.28"/>
      <rect x="50" y="42" width="100" height="42" rx="14" fill="white" opacity="0.18"/>
      <text x="100" y="70" text-anchor="middle" font-size="20" font-weight="900" fill="#1e293b" stroke="white" stroke-width="0.7" paint-order="stroke" font-family="Arial, sans-serif">${label}</text>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="200" y2="120">
          <stop offset="0%" stop-color="${colors[0]}"/>
          <stop offset="55%" stop-color="${colors[1]}"/>
          <stop offset="100%" stop-color="${colors[2]}"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const stepCertificates = [
  {
    title: 'Application Development on Python',
    date: '2024',
    grade: '100%',
    image: certificateImage(['#fde68a', '#bfdbfe', '#ddd6fe'], 'PY')
  },
  {
    title: 'Python',
    date: '2024',
    grade: '98%',
    image: certificateImage(['#dbeafe', '#fef3c7', '#bfdbfe'], 'PY')
  },
  {
    title: 'HTML',
    date: '2024',
    grade: '99%',
    image: certificateImage(['#fed7aa', '#fee2e2', '#fef3c7'], 'HTML')
  },
  {
    title: 'CSS',
    date: '2024',
    grade: '99%',
    image: certificateImage(['#bfdbfe', '#dbeafe', '#e0e7ff'], 'CSS')
  },
  {
    title: '3D Design',
    date: '2024',
    grade: '96%',
    image: certificateImage(['#fbcfe8', '#ddd6fe', '#fde68a'], '3D')
  },
  {
    title: 'Kodu Game Lab',
    date: '2024',
    grade: '98%',
    image: certificateImage(['#bbf7d0', '#bfdbfe', '#fde68a'], 'KODU')
  },
  {
    title: 'Construct 3',
    date: '2024',
    grade: '97%',
    image: certificateImage(['#ccfbf1', '#dcfce7', '#ecfccb'], 'C3')
  },
  {
    title: 'WordPress',
    date: '2024',
    grade: '99%',
    image: certificateImage(['#dbeafe', '#e0f2fe', '#c7d2fe'], 'WP')
  },
  {
    title: 'Blender',
    date: '2024',
    grade: '95%',
    image: certificateImage(['#fed7aa', '#fde68a', '#bfdbfe'], 'BL')
  },
  {
    title: 'Android',
    date: '2024',
    grade: '96%',
    image: certificateImage(['#bbf7d0', '#d9f99d', '#ccfbf1'], 'AND')
  },
  {
    title: '3Ds Max',
    date: '2024',
    grade: '94%',
    image: certificateImage(['#c7d2fe', '#ddd6fe', '#bae6fd'], 'MAX')
  },
  {
    title: 'Photoshop',
    date: '2024',
    grade: '97%',
    image: certificateImage(['#bfdbfe', '#dbeafe', '#c7d2fe'], 'PS')
  },
  {
    title: 'Adobe Illustrator',
    date: '2024',
    grade: '96%',
    image: certificateImage(['#fed7aa', '#fde68a', '#fee2e2'], 'AI')
  },
  {
    title: 'Adobe Premiere Pro',
    date: '2024',
    grade: '95%',
    image: certificateImage(['#ddd6fe', '#e9d5ff', '#c7d2fe'], 'PR')
  },
  {
    title: 'Arduino Electronics',
    date: '2024',
    grade: '97%',
    image: certificateImage(['#ccfbf1', '#bfdbfe', '#dcfce7'], 'ARD')
  }
];
const stepContainer = document.getElementById('stepCertificatesContainer');
if (stepContainer) {
  stepContainer.innerHTML = '';

  stepCertificates.forEach(cert => {
    const item = document.createElement('div');
    item.className = 'exam-certificate-item';
    item.setAttribute('data-title', cert.title);
    item.innerHTML = `
      <img src="${cert.image}" alt="${cert.title}" class="exam-certificate-img">
      <div class="exam-certificate-info">
        <div class="exam-certificate-title">${cert.title}</div>
        <div class="exam-certificate-date">${cert.date}</div>
        <div class="exam-certificate-grade">${cert.grade}</div>
      </div>
    `;
    item.addEventListener('click', function() {
      const modal = document.getElementById('certificateModal');
      const modalTitle = document.getElementById('modalTitle');
      if (modal && modalTitle) {
        modalTitle.textContent = cert.title;
        modal.classList.add('active');
      }
    });
    stepContainer.appendChild(item);
  });
}


  // Close modal
  const modal = document.getElementById('certificateModal');
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.classList.remove('active');
    });
  }
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Toggle exam certificates
  const viewCertBtn = document.getElementById('viewStepCertificates');
  if (viewCertBtn) {
    viewCertBtn.addEventListener('click', function() {
      const slider = document.getElementById('stepCertificatesSlider');
      if (slider) {
        slider.classList.toggle('expanded');
        this.classList.toggle('expanded');
      }
    });
  }

  // Journey toggles
  document.querySelectorAll('.journey-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const card = this.closest('.journey-card');
      const details = card.querySelector('.journey-details');
      if (card && details) {
        card.classList.toggle('expanded');
        this.classList.toggle('expanded');
        details.classList.toggle('expanded');
      }
    });
  });

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      document.querySelectorAll('.journey-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== MENIU HAMBURGER =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav');
  
  if (menuToggle && navMenu) {
    menuToggle.innerHTML = '☰';
    
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      
      if (navMenu.classList.contains('active')) {
        menuToggle.innerHTML = '✕';
      } else {
        menuToggle.innerHTML = '☰';
      }
    });
    
    const allNavBtns = document.querySelectorAll('.nav-btn');
    allNavBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '☰';
      });
    });
    
    document.addEventListener('click', function(event) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(event.target) && 
          !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '☰';
      }
    });
  }

  // Toast function
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (toast && toastMessage) {
      toastMessage.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }
  
  window.showToast = showToast;
});
