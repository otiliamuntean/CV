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

// Navigation & all original functionality + bulb toggle
document.addEventListener('DOMContentLoaded', function() {
  // BULB toggle (instead of lamp)
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

  // original nav code (păstrat integral)
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
  }
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      activateSection(targetId);
      if (targetId === 'hello') showToast("👋 Hello! Thanks for visiting!");
      else if (targetId === 'journey') showToast("📚 Exploring my journey timeline");
      else if (targetId === 'projects') showToast("📁 Exploring my projects");
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

  // Download CV functional
  document.getElementById('downloadCVHello')?.addEventListener('click', () => {
  showToast("📄 Preparing CV download...");
  
  // Creează link temporar pentru descărcare
  const link = document.createElement('a');
  link.href = 'Muntean Otilia CV (1).pdf';   // asigură-te că numele corespunde
  link.download = 'Otilia_Muntean_CV.pdf';  // numele cu care se salvează (poți pune orice)
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

  // Detailed request button - MODIFICAT PENTRU A FUNCȚIONA REAL
  document.getElementById('sendDetailedRequestBtn')?.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.detail-option:checked');
    const selected = Array.from(checkboxes).map(cb => cb.value);
    if (selected.length === 0) {
      showToast("⚠️ Please select at least one option!");
      return;
    }
    
    // Construim corpul emailului
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

  // Exam certificates data (for IT Step) - păstrat
  const stepCertificates = [
    { title: 'Application Development on Python', date: '2024', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjIwIiBmaWxsPSIjRkZGOEY1IiBvcGFjaXR5PSIwLjYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjMwOzI1OzMwOzM1OzMwIiBkdXI9IjhzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjQwOzM1OzQwOzQ1OzQwIiBkdXI9IjEycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iOTAiIHI9IjMwIiBmaWxsPSIjRTZGM0Q3IiBvcGFjaXR5PSIwLjUiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjkwOzg1OzkwOzk1OzkwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjMwOzI4OzMwOzMyOzMwIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMjAiIHI9IjE1IiBmaWxsPSIjRkZEQUI5IiBvcGFjaXR5PSIwLjciPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjIwOzE1OzIwOzI1OzIwIiBkdXI9IjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC43OzAuNTswLjc7MC44OzAuNyIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT4KPHBhdGggZD0iTTAgNjBMMTIwIDExME0xODAgNDBMNjAgODAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4yOzAuMTswLjI7MC4zOzAuMiIgZHVyPSI3cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3BhdGg+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGREJCOCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjQkJFMEZGIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRDhDRkNDIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+Cjwvc3ZnPg=='},
    { title: '3D Design', date: '2024', grade: '96%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjMwIiByPSIyNSIgZmlsbD0iI0ZGQzREOSIgb3BhY2l0eT0iMC41Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgdmFsdWVzPSIxNjA7MTU1OzE2MDsxNjU7MTYwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSIzMDsyNTszMDszNTszMCIgZHVyPSIxMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIyNTsyMzsyNTsyNzsyNSIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjUwIiBjeT0iOTAiIHI9IjM1IiBmaWxsPSIjRTVDOUZGIiBvcGFjaXR5PSIwLjYiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjUwOzQ1OzUwOzU1OzUwIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI5MDs4NTs5MDs5NTs5MCIgZHVyPSIxM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIzNTszMjszNTszODszNSIgZHVyPSIxMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIxODAiIGN5PSIxMDAiIHI9IjEwIiBmaWxsPSIjRkZFQkM2IiBvcGFjaXR5PSIwLjgiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjE4MDsxNzU7MTgwOzE4NTsxODAiIGR1cj0iN3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3kiIHZhbHVlcz0iMTAwOzk1OzEwMDsxMDU7MTAwIiBkdXI9IjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMTA7ODsxMDsxMjsxMCIgZHVyPSI5cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuODswLjY7MC44OzAuOTswLjgiIGR1cj0iMTBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L2NpcmNsZT4KPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMiIgcng9IjQiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9IngiIHZhbHVlcz0iMjA7MTU7MjA7MjU7MjAiIGR1cj0iMTBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIHZhbHVlcz0iMjA7MTU7MjA7MjU7MjAiIGR1cj0iMTJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4yOzAuMTswLjI7MC4zOzAuMiIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9yZWN0Pgo8cmVjdCB4PSIxNjAiIHk9IjcwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMTUiIHJ4PSIxMCI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieCIgdmFsdWVzPSIxNjA7MTU1OzE2MDsxNjU7MTYwIiBkdXI9IjE0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiB2YWx1ZXM9IjcwOzY1OzcwOzc1OzcwIiBkdXI9IjE2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ3aWR0aCIgdmFsdWVzPSIyMDsxODsyMDsyMjsyMCIgZHVyPSIxMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iaGVpZ2h0IiB2YWx1ZXM9IjIwOzE4OzIwOzIyOzIwIiBkdXI9IjEzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuMTU7MC4xOzAuMTU7MC4yOzAuMTUiIGR1cj0iOXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvcmVjdD4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRTdDOUZGIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGRkM0RTAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkU4QjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPC9zdmc+' },
    { title: 'Web Design: JavaScript', date: '2023', grade: '99%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjcwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjQzdGOUNDIiBvcGFjaXR5PSIwLjciPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjcwOzUwOzcwOzkwOzcwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI0MDsyMDs0MDs2MDs0MCIgZHVyPSIxMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIyMDsxNTsyMDsyNTsyMCIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjE0MCIgY3k9Ijg1IiByPSIzMCIgZmlsbD0iI0I3RTBGNSIgb3BhY2l0eT0iMC42Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgdmFsdWVzPSIxNDA7MTEwOzE0MDsxNzA7MTQwIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI4NTs2MDs4NTsxMDA7ODUiIGR1cj0iMTNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMzA7MjU7MzA7MzU7MzAiIGR1cj0iMTFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC42OzAuNDswLjY7MC44OzAuNiIgZHVyPSI5cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjMwIiBjeT0iODAiIHI9IjE1IiBmaWxsPSIjRkZENTg1IiBvcGFjaXR5PSIwLjUiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjMwOzEwOzMwOzUwOzMwIiBkdXI9IjE0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI4MDs2MDs4MDs5MDs4MCIgZHVyPSIxNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIxNTsxMDsxNTsyMDsxNSIgZHVyPSIxMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIxODAiIGN5PSI0MCIgcj0iMTAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMyI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIHZhbHVlcz0iMTgwOzE2MDsxODA7MTkwOzE4MCIgZHVyPSIxMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3kiIHZhbHVlcz0iNDA7MjA7NDA7NTA7NDAiIGR1cj0iMTJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMTA7NzsxMDsxMzsxMCIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuMzswLjE7MC4zOzAuNTswLjMiIGR1cj0iMTBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L2NpcmNsZT4KPHBhdGggZD0iTTAgMjBMMjAwIDYwTTAgMTAwTDE1MCA0MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMTUiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4xNTswLjA1OzAuMTU7MC4yOzAuMTUiIGR1cj0iN3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvcGF0aD4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRDRFQ0U1Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNCOEU4RjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNDOEY4Q0YiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPC9zdmc+' },
    { title: 'Web Design: HTML/CSS', date: '2022', grade: '97%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+Cjxwb2x5Z29uIHBvaW50cz0iNTAsMzAgOTAsNDAgNzAsNzAgMzAsNjAiIGZpbGw9IiNGRkZFRTciIG9wYWNpdHk9IjAuNCI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0icG9pbnRzIiB2YWx1ZXM9IjUwLDMwIDkwLDQwIDcwLDcwIDMwLDYwOyA1NSwzNSA4NSw0NSA3NSw2NSAzNSw1NTsgNTAsMzAgOTAsNDAgNzAsNzAgMzAsNjAiIGR1cj0iMTJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L3BvbHlnb24+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjcwIiByPSIyNSIgZmlsbD0iI0ZGREQ5QyIgb3BhY2l0eT0iMC41Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgdmFsdWVzPSIxNTA7MTQwOzE1MDsxNjA7MTUwIiBkdXI9IjE0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI3MDs2MDs3MDs4MDs3MCIgZHVyPSIxNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSI0MCIgY3k9Ijk1IiByPSIxNSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC42Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgdmFsdWVzPSI0MDszMDs0MDs1MDs0MCIgZHVyPSIxMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3kiIHZhbHVlcz0iOTU7ODU7OTU7MTAwOzk1IiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxyZWN0IHg9IjEzMCIgeT0iMjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSIxMCIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4xIiByeD0iNSI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieCIgdmFsdWVzPSIxMzA7MTI1OzEzMDsxMzU7MTMwIiBkdXI9IjEzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiB2YWx1ZXM9IjIwOzE1OzIwOzI1OzIwIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9yZWN0Pgo8cmVjdCB4PSIyMCIgeT0iNTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4xNSIgcng9IjcuNSI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieCIgdmFsdWVzPSIyMDsxNTsyMDsyNTsyMCIgZHVyPSIxNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieSIgdmFsdWVzPSI1MDs0NTs1MDs1NTs1MCIgZHVyPSIxOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvcmVjdD4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRkZFQkU1Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGRkQ5QjgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkMzQTEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPC9zdmc+' },
    { title: 'Kodu Game Lab', date: '2020', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNjAiIHI9IjE1IiBmaWxsPSIjRkZCRjdEIiBvcGFjaXR5PSIwLjkiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjQwOzUwOzQwOzMwOzQwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjE1OzE4OzE1OzEyOzE1IiBkdXI9IjhzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L2NpcmNsZT4KPHBvbHlnb24gcG9pbnRzPSIxMjAsMzAgMTUwLDQwIDEzMCw3MCAxMDAsNjAiIGZpbGw9IiNGRkU1OUIiIG9wYWNpdHk9IjAuOCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InBvaW50cyIgdmFsdWVzPSIxMjAsMzAgMTUwLDQwIDEzMCw3MCAxMDAsNjA7IDExMCwyMCAxNDAsMzAgMTIwLDYwIDkwLDUwOyAxMjAsMzAgMTUwLDQwIDEzMCw3MCAxMDAsNjAiIGR1cj0iMTVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L3BvbHlnb24+CjxjaXJjbGUgY3g9IjE3MCIgY3k9Ijk1IiByPSIxMiIgZmlsbD0iIzhEQ0U5RiIgb3BhY2l0eT0iMC43Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI5NTs4MDs5NTsxMDA7OTUiIGR1cj0iMTJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC43OzAuOTswLjc7MC41OzAuNyIgZHVyPSIxNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8bGluZSB4MT0iMjAiIHkxPSI5MCIgeDI9IjcwIiB5Mj0iNDAiIHN0cm9rZT0iI0ZGQkVBNyIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjUiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkxIiB2YWx1ZXM9IjkwOzgwOzkwOzk1OzkwIiBkdXI9IjExcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9saW5lPgo8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwIiB5MT0iMCIgeDI9IjIwMCIgeTI9IjEyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkU1OUIiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI0ZGQkY3RCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzhEQ0U5RiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgo8L3N2Zz4=' },
    { title: 'Lego Robotics', date: '2020', grade: '99%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjE4IiBmaWxsPSIjRkZERDlDIiBvcGFjaXR5PSIwLjciPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjUwOzQwOzUwOzYwOzUwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjE0MCIgY3k9IjcwIiByPSIyMCIgZmlsbD0iI0ZGQzNBMSIgb3BhY2l0eT0iMC42Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI3MDs2MDs3MDs4MDs3MCIgZHVyPSIxMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8cmVjdCB4PSI5MCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZGRUJDNiIgb3BhY2l0eT0iMC4zIiByeD0iOCI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieCIgdmFsdWVzPSI5MDs4MDs5MDsxMDA7OTAiIGR1cj0iMTVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIHZhbHVlcz0iMjA7MTA7MjA7MzA7MjAiIGR1cj0iMTNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L3JlY3Q+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGREQ5QyIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjRkZDM0ExIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkZFQkM2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+Cjwvc3ZnPg==' },
    { title: 'Web Design WIX', date: '2020', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjE4IiBmaWxsPSIjQzBFQkVCIiBvcGFjaXR5PSIwLjkiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjUwOzQwOzUwOzYwOzUwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjE4OzIwOzE4OzE2OzE4IiBkdXI9IjhzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L2NpcmNsZT4KPHBhdGggZD0iTTgwLDcwIEM5MCw2MCAxMDAsNjAgMTEwLDcwIEMxMjAsODAgMTMwLDgwIDE0MCw3MCBDMTUwLDYwIDE2MCw2MCAxNzAsNzAiIHN0cm9rZT0iI0ZGRkVFNSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjciPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImQiIHZhbHVlcz0iTTgwLDcwIEM5MCw2MCAxMDAsNjAgMTEwLDcwIEMxMjAsODAgMTMwLDgwIDE0MCw3MCBDMTUwLDYwIDE2MCw2MCAxNzAsNzA7IE04MCw4MCBDOTAsNzAgMTAwLDcwIDExMCw4MCBDMTIwLDkwIDEzMCw5MCAxNDAsODAgQzE1MCw3MCAxNjAsNzAgMTcwLDgwOyBNODAsNzAgQzkwLDYwIDEwMCw2MCAxMTAsNzAgQzEyMCw4MCAxMzAsODAgMTQwLDcwIEMxNTAsNjAgMTYwLDYwIDE3MCw3MCIgZHVyPSIxOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvcGF0aD4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMzAiIHI9IjEyIiBmaWxsPSIjRkZFNUIwIiBvcGFjaXR5PSIwLjgiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjE1MDsxNDA7MTUwOzE2MDsxNTAiIGR1cj0iMTJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L2NpcmNsZT4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjQzBFQkVCIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiM3QkM5QzgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkZFRTUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPC9zdmc+' },
    { title: 'Scratch', date: '2019', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNzAiIHI9IjE2IiBmaWxsPSIjQTNFQkI5IiBvcGFjaXR5PSIwLjkiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjcwOzYwOzcwOzgwOzcwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxyZWN0IHg9IjEyMCIgeT0iNDAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0iI0ZGRTg3QyIgb3BhY2l0eT0iMC43IiByeD0iMTIiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9IngiIHZhbHVlcz0iMTIwOzEwMDsxMjA7MTQwOzEyMCIgZHVyPSIxNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieSIgdmFsdWVzPSI0MDsyMDs0MDs2MDs0MCIgZHVyPSIxNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvcmVjdD4KPGxpbmUgeDE9IjEwIiB5MT0iMzAiIHgyPSI3MCIgeTI9Ijk1IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iNCIgb3BhY2l0eT0iMC40Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4MiIgdmFsdWVzPSI3MDs2MDs3MDs4MDs3MCIgZHVyPSIxM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvbGluZT4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjQTNFQkI5Ii8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGRkU4N0MiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkZGRkYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPC9zdmc+' },
    { title: 'Mobile Apps Development', date: '2020', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxwYXRoIGQ9Ik0yMCwzMCBDNTAsMTAgODAsMTAgMTEwLDMwIEMxNDAsNTAgMTcwLDUwIDIwMCwzMCIgZmlsbD0iI0M1RDVCMCIgb3BhY2l0eT0iMC44Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJkIiB2YWx1ZXM9Ik0yMCwzMCBDNTAsMTAgODAsMTAgMTEwLDMwIEMxNDAsNTAgMTcwLDUwIDIwMCwzMDsgTTIwLDUwIEM1MCwzMCA4MCwzMCAxMTAsNTAgQzE0MCw3MCAxNzAsNzAgMjAwLDUwOyBNMjAsMzAgQzUwLDEwIDgwLDEwIDExMCwzMCBDMTQwLDUwIDE3MCw1MCAyMDAsMzA7IE0yMCw0MCBDNTAsMjAgODAsMjAgMTEwLDQwIEMxNDAsNjAgMTcwLDYwIDIwMCw0MCIgZHVyPSIxNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIwLjg7MC40OzAuODswLjU7MC44IiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9wYXRoPgo8cGF0aCBkPSJNNDAsOTAgQzcwLDcwIDEwMCw3MCAxMzAsOTAgQzE2MCwxMTAgMTkwLDExMCAyMjAsOTAiIGZpbGw9IiNCMkM1QjUiIG9wYWNpdHk9IjAuNyI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZCIgdmFsdWVzPSJNNDAsOTAgQzcwLDcwIDEwMCw3MCAxMzAsOTAgQzE2MCwxMTAgMTkwLDExMCAyMjAsOTA7IE00MCw3MCBDNzAsNTAgMTAwLDUwIDEzMCw3MCBDMTYwLDkwIDE5MCw5MCAyMjAsNzA7IE00MCw5MCBDNzAsNzAgMTAwLDcwIDEzMCw5MCBDMTYwLDExMCAxOTAsMTEwIDIyMCw5MDsgTTQwLDgwIEM3MCw2MCAxMDAsNjAgMTMwLDgwIEMxNjAsMTAwIDE5MCwxMDAgMjIwLDgwIiBkdXI9IjE2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuNzswLjM7MC43OzAuNDswLjciIGR1cj0iMTJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L3BhdGg+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjciIGZpbGw9IiNFOEVCRTMiIG9wYWNpdHk9IjAuOSI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSI3OzEyOzU7MTU7NyIgZHVyPSIxMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIHZhbHVlcz0iNTA7NDA7NTA7NjA7NTAiIGR1cj0iMTVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjUwOzQwOzUwOzYwOzUwIiBkdXI9IjE4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjcwIiByPSI2IiBmaWxsPSIjRDhFOEQ3IiBvcGFjaXR5PSIwLjkiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iNjsxMDs0OzEyOzYiIGR1cj0iMTBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjE1MDsxNDA7MTUwOzE2MDsxNTAiIGR1cj0iMTNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjcwOzYwOzcwOzgwOzcwIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjMwIiByPSI1IiBmaWxsPSIjQzVENEQwIiBvcGFjaXR5PSIwLjgiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iNTs4OzM7MTA7NSIgZHVyPSIxNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwIiB5MT0iMCIgeDI9IjIwMCIgeTI9IjEyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNFMEU4RDkiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI0Q4RThENyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0I1QzVDMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgo8L3N2Zz4=' },
    { title: 'Photolab', date: '2022', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEyIiBmaWxsPSIjRTJEMkU1IiBvcGFjaXR5PSIwLjkiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjUwOzMwOzUwOzcwOzUwOzIwOzUwOzgwOzUwIiBkdXI9IjE4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI1MDszMDs1MDs3MDs1MDs4MDs1MDsyMDs1MCIgZHVyPSIxOXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIxMjsxNTs4OzIwOzEwOzE4OzE0OzEyIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjcwIiByPSIxNSIgZmlsbD0iI0Q1QzFEQiIgb3BhY2l0eT0iMC44Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgdmFsdWVzPSIxMjA7OTA7MTIwOzE1MDsxMjA7MTgwOzEyMDs4MDsxMjAiIGR1cj0iMjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjcwOzUwOzcwOzEwMDs3MDs0MDs3MDs5MDs3MCIgZHVyPSIyMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIxNTsyMDsxMDsyNTsxMjsxODs4OzE1IiBkdXI9IjE2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjQwIiByPSIxMCIgZmlsbD0iI0Y4RTVGNSIgb3BhY2l0eT0iMC45Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgdmFsdWVzPSIxNjA7MTMwOzE2MDsxODA7MTYwOzE0MDsxNjA7MTcwOzE2MCIgZHVyPSIxN3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3kiIHZhbHVlcz0iNDA7MjA7NDA7NjA7NDA7ODA7NDA7MzA7NDAiIGR1cj0iMTlzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMTA7MTU7NjsyMDs4OzE4OzEyOzEwIiBkdXI9IjE0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjE0IiBmaWxsPSIjRTVENUVCIiBvcGFjaXR5PSIwLjgiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjkwOzYwOzkwOzEyMDs5MDs3MDs5MDsxMTA7OTAiIGR1cj0iMjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjkwOzcwOzkwOzExMDs5MDs1MDs5MDsxMDA7OTAiIGR1cj0iMjNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMTQ7MTg7MTA7MjI7MTI7MTY7ODsxNCIgZHVyPSIxN3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjcwIiByPSI4IiBmaWxsPSIjRTJEMkU1IiBvcGFjaXR5PSIwLjciPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjMwOzUwOzMwOzEwOzMwOzUwOzMwOzEwOzMwIiBkdXI9IjE2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI3MDs5MDs3MDs1MDs3MDs5MDs3MDs1MDs3MCIgZHVyPSIxOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8cG9seWdvbiBwb2ludHM9IjE3MCw5MCAxODAsNzAgMTkwLDkwIiBmaWxsPSIjRjhFNUY1IiBvcGFjaXR5PSIwLjYiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InBvaW50cyIgdmFsdWVzPSIxNzAsOTAgMTgwLDcwIDE5MCw5MDsgMTYwLDgwIDE4MCw1MCAyMDAsODA7IDE3MCw5MCAxODAsNzAgMTkwLDkwOyAxODAsMTAwIDE5MCw4MCAyMDAsMTAwIiBkdXI9IjE4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9wb2x5Z29uPgo8cG9seWdvbiBwb2ludHM9IjQwLDMwIDUwLDUwIDMwLDUwIiBmaWxsPSIjRDVDMURCIiBvcGFjaXR5PSIwLjYiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InBvaW50cyIgdmFsdWVzPSI0MCwzMCA1MCw1MCAzMCw1MDsgMzAsMjAgNDAsNDAgMjAsNDA7IDQwLDMwIDUwLDUwIDMwLDUwOyA1MCw0MCA2MCw2MCA0MCw2MCIgZHVyPSIxNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvcG9seWdvbj4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRTVENUVCIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFMkQyRTUiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNENUMxREIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPC9zdmc+' },
    { title: 'WordPress', date: '2024', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxwYXRoIGQ9Ik0yMCwzMCBDNTAsMTAgODAsNTAgMTEwLDMwIEMxNDAsMTAgMTcwLDUwIDIwMCwzMCIgc3Ryb2tlPSIjQzJCMkI1IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNiI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZCIgdmFsdWVzPSJNMjAsMzAgQzUwLDEwIDgwLDUwIDExMCwzMCBDMTQwLDEwIDE3MCw1MCAyMDAsMzA7IE0yMCw1MCBDNTAsMzAgODAsNzAgMTEwLDUwIEMxNDAsMzAgMTcwLDcwIDIwMCw1MDsgTTIwLDMwIEM1MCwxMCA4MCw1MCAxMTAsMzAgQzE0MCwxMCAxNzAsNTAgMjAwLDMwOyBNMjAsNDAgQzUwLDIwIDgwLDYwIDExMCw0MCBDMTQwLDIwIDE3MCw2MCAyMDAsNDAiIGR1cj0iMTZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L3BhdGg+CjxwYXRoIGQ9Ik00MCw4MCBDNzAsNjAgMTAwLDEwMCAxMzAsODAgQzE2MCw2MCAxOTAsMTAwIDIyMCw4MCIgc3Ryb2tlPSIjQjhDNUJEIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNSI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZCIgdmFsdWVzPSJNNDAsODAgQzcwLDYwIDEwMCwxMDAgMTMwLDgwIEMxNjAsNjAgMTkwLDEwMCAyMjAsODA7IE00MCw5MCBDNzAsNzAgMTAwLDExMCAxMzAsOTAgQzE2MCw3MCAxOTAsMTEwIDIyMCw5MDsgTTQwLDgwIEM3MCw2MCAxMDAsMTAwIDEzMCw4MCBDMTYwLDYwIDE5MCwxMDAgMjIwLDgwOyBNNDAsNzAgQzcwLDUwIDEwMCw5MCAxMzAsNzAgQzE2MCw1MCAxOTAsOTAgMjIwLDcwIiBkdXI9IjE4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9wYXRoPgo8cGF0aCBkPSJNMjAsOTAgQzYwLDcwIDEwMCwxMjAgMTQwLDkwIEMxODAsNjAgMjIwLDEwMCAyMjAsMTAwIiBzdHJva2U9IiNENEMyRDkiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC43Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJkIiB2YWx1ZXM9Ik0yMCw5MCBDNjAsNzAgMTAwLDEyMCAxNDAsOTAgQzE4MCw2MCAyMjAsMTAwIDIyMCwxMDA7IE0yMCw4MCBDNjAsNjAgMTAwLDExMCAxNDAsODAgQzE4MCw1MCAyMjAsOTAgMjIwLDkwOyBNMjAsOTAgQzYwLDcwIDEwMCwxMjAgMTQwLDkwIEMxODAsNjAgMjIwLDEwMCAyMjAsMTAwOyBNMjAsMTAwIEM2MCw4MCAxMDAsMTMwIDE0MCwxMDAgQzE4MCw3MCAyMjAsMTEwIDIyMCwxMTAiIGR1cj0iMjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L3BhdGg+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjgiIGZpbGw9IiNENEMyRDkiIG9wYWNpdHk9IjAuNyI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIHZhbHVlcz0iNTA7MzA7NTA7NzA7NTA7MjA7NTA7ODA7NTAiIGR1cj0iMTVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjUwOzMwOzUwOzcwOzUwOzgwOzUwOzQwOzUwIiBkdXI9IjE3cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9Ijg7MTI7NjsxMDs0OzE0OzgiIGR1cj0iMTBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L2NpcmNsZT4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iNzAiIHI9IjYiIGZpbGw9IiNCOEM1QkQiIG9wYWNpdHk9IjAuNiI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIHZhbHVlcz0iMTUwOzEyMDsxNTA7MTgwOzE1MDsxMzA7MTUwOzE3MDsxNTAiIGR1cj0iMTZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjcwOzUwOzcwOzkwOzcwOzYwOzcwOzgwOzcwIiBkdXI9IjE4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjEwIiBmaWxsPSIjQzJCMkI1IiBvcGFjaXR5PSIwLjgiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMTA7MTU7ODsxMjs2OzE4OzEwIiBkdXI9IjE0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0Q0QzJEOSIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjQjhDNUJEIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjQzJCMkI1Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+Cjwvc3ZnPg==' }
  ];

  const stepContainer = document.getElementById('stepCertificatesContainer');
  if (stepContainer) {
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
        modalTitle.textContent = cert.title;
        modal.classList.add('active');
      });
      stepContainer.appendChild(item);
    });
  }

  // Close modal functionality
  const modal = document.getElementById('certificateModal');
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.classList.remove('active');
    });
  }
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Toggle exam certificates for IT Step
  const viewCertBtn = document.getElementById('viewStepCertificates');
  if (viewCertBtn) {
    viewCertBtn.addEventListener('click', function() {
      const slider = document.getElementById('stepCertificatesSlider');
      const icon = this.querySelector('.lucide:last-child');
      slider.classList.toggle('expanded');
      this.classList.toggle('expanded');
      if (slider.classList.contains('expanded')) {
        icon.className = 'lucide lucide-chevron-up';
        this.querySelector('span').textContent = 'Hide Exam Certificates';
      } else {
        icon.className = 'lucide lucide-chevron-down';
        this.querySelector('span').textContent = 'View Exam Certificates';
      }
    });
  }

  // Journey toggles
  document.querySelectorAll('.journey-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const card = this.closest('.journey-card');
      const details = card.querySelector('.journey-details');
      const icon = this.querySelector('i');
      const textSpan = this.querySelector('span');
      
      card.classList.toggle('expanded');
      this.classList.toggle('expanded');
      details.classList.toggle('expanded');
      
      if (card.classList.contains('expanded')) {
        icon.className = 'lucide lucide-chevron-up';
        textSpan.textContent = 'Hide Details';
      } else {
        icon.className = 'lucide lucide-chevron-down';
        textSpan.textContent = 'View Details';
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

  // Mobile menu
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.innerHTML = nav.classList.contains('active') ? 
        '<i class="lucide lucide-x"></i>' : '<i class="lucide lucide-menu"></i>';
    });
  }

  // Toast
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Progress bars with random durations
  const progressFills = document.querySelectorAll('#horizons-container .progress-fill');
  progressFills.forEach(fill => {
    const duration = (Math.random() * 2 + 1).toFixed(2);
    fill.style.animation = `loading ${duration}s infinite`;
  });
});