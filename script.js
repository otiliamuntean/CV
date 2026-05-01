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
  const stepCertificates = [
    { title: 'Application Development on Python', date: '2024', grade: '100%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjIwIiBmaWxsPSIjRkZGOEY1IiBvcGFjaXR5PSIwLjYiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjMwOzI1OzMwOzM1OzMwIiBkdXI9IjhzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjQwOzM1OzQwOzQ1OzQwIiBkdXI9IjEycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iOTAiIHI9IjMwIiBmaWxsPSIjRTZGM0Q3IiBvcGFjaXR5PSIwLjUiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjkwOzg1OzkwOzk1OzkwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjMwOzI4OzMwOzMyOzMwIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMjAiIHI9IjE1IiBmaWxsPSIjRkZEQUI5IiBvcGFjaXR5PSIwLjciPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN5IiB2YWx1ZXM9IjIwOzE1OzIwOzI1OzIwIiBkdXI9IjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC43OzAuNTswLjc7MC44OzAuNyIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2NpcmNsZT4KPHBhdGggZD0iTTAgNjBMMTIwIDExME0xODAgNDBMNjAgODAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4yOzAuMTswLjI7MC4zOzAuMiIgZHVyPSI3cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L3BhdGg+CjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0ZGREJCOCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjQkJFMEZGIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRDhDRkNDIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+Cjwvc3ZnPg=='},
    { title: 'Kodu Game Lab',  date: '2024',  grade: '98%',  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+PGNpcmNsZSBjeD0iNDIiIGN5PSIzOCIgcj0iMjIiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMjUiLz48Y2lyY2xlIGN4PSIxNjUiIGN5PSI4MiIgcj0iMzAiIGZpbGw9IiNGRkQxNjYiIG9wYWNpdHk9IjAuNDUiLz48cGF0aCBkPSJNNjAgNzBMMTAwIDQ1TDE0MCA3MEwxMDAgOTVaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjM1Ii8+PGNpcmNsZSBjeD0iODUiIGN5PSI2OCIgcj0iNiIgZmlsbD0iIzEwYjk4MSIvPjxjaXJjbGUgY3g9IjExNSIgY3k9IjY4IiByPSI2IiBmaWxsPSIjZWY0NDQ0Ii8+PHBhdGggZD0iTTQwIDEwMEgxNjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjI1Ii8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiPjxzdG9wIHN0b3AtY29sb3I9IiMxMGI5ODEiLz48c3RvcCBvZmZzZXQ9IjAuNTUiIHN0b3AtY29sb3I9IiMzYjgyZjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmNTllMGIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4='},
    {title: 'Construct 3',  date: '2024',  grade: '97%',  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHJlY3QgeD0iMzAiIHk9IjI4IiB3aWR0aD0iNDQiIGhlaWdodD0iNDQiIHJ4PSIxMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4yNSIvPjxyZWN0IHg9Ijg0IiB5PSI0OCIgd2lkdGg9IjQ0IiBoZWlnaHQ9IjQ0IiByeD0iMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMzUiLz48cmVjdCB4PSIxMzgiIHk9IjI4IiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSIjZmRlNjhiIiBvcGFjaXR5PSIwLjY1Ii8+PHBhdGggZD0iTTUyIDUwSDExMEwxNTQgNDQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjM1Ii8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiPjxzdG9wIHN0b3AtY29sb3I9IiMxNGI4YTYiLz48c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iIzIyYzU1ZSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzg0Y2M0NyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='},
{
  title: 'WordPress',
  date: '2024',
  grade: '99%',
  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNjAiIHI9IjM2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjIyIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNjAiIHI9IjI2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iMC4zNSIvPjx0ZXh0IHg9IjEwMCIgeT0iNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSI5MDAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNzUiPldQPC90ZXh0PjxjaXJjbGUgY3g9IjQ1IiBjeT0iMzUiIHI9IjIwIiBmaWxsPSIjOTNkNWZmIiBvcGFjaXR5PSIwLjM1Ii8+PGNpcmNsZSBjeD0iMTYwIiBjeT0iODUiIHI9IjI1IiBmaWxsPSIjYmZkN2ZmIiBvcGFjaXR5PSIwLjM1Ii8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiPjxzdG9wIHN0b3AtY29sb3I9IiMyMTc1OWIiLz48c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iIzI1NjNlYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzBjNGE2ZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='
},
{
  title: 'Blender',
  date: '2024',
  grade: '95%',
  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+PGNpcmNsZSBjeD0iMTA1IiBjeT0iNjAiIHI9IjMzIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjI1Ii8+PGNpcmNsZSBjeD0iMTA1IiBjeT0iNjAiIHI9IjE0IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjU1Ii8+PHBhdGggZD0iTTcwIDQyTDM1IDMwTDY4IDU4TDQwIDgzTDgyIDc4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iOCIgY2FwPSJyb3VuZCIgb3BhY2l0eT0iMC41NSIvPjxjaXJjbGUgY3g9IjE1NSIgY3k9IjM1IiByPSIyMCIgZmlsbD0iI2ZmYjQ1NCIgb3BhY2l0eT0iMC40Ii8+PGNpcmNsZSBjeD0iNDUiIGN5PSI5NSIgcj0iMTgiIGZpbGw9IiNmZmVlOTMiIG9wYWNpdHk9IjAuMyIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTIwIj48c3RvcCBzdG9wLWNvbG9yPSIjZjU3MzE2Ii8+PHN0b3Agb2Zmc2V0PSIwLjU1IiBzdG9wLWNvbG9yPSIjZmE5NTAwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzY3NGI1Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+'
},
{
  title: 'Android',
  date: '2024',
  grade: '96%',
  image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHJlY3QgeD0iNzAiIHk9IjM4IiB3aWR0aD0iNjAiIGhlaWdodD0iNDgiIHJ4PSIxMiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4zNSIvPjxjaXJjbGUgY3g9Ijg4IiBjeT0iNTYiIHI9IjQiIGZpbGw9IiMzNGQzOTkiLz48Y2lyY2xlIGN4PSIxMTIiIGN5PSI1NiIgcj0iNCIgZmlsbD0iIzM0ZDM5OSIvPjxwYXRoIGQ9Ik04MiAzOEw3MiAyMk0xMTggMzhMMTI4IDIyIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBvcGFjaXR5PSIwLjYiLz48cGF0aCBkPSJNNjIgNTBINTBNMTM4IDUwSDE1ME02MiA3NEg1ME0xMzggNzRIMTUwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBvcGFjaXR5PSIwLjQ1Ii8+PGNpcmNsZSBjeD0iMzgiIGN5PSI5MiIgcj0iMjQiIGZpbGw9IiNiYmY3ZDQiIG9wYWNpdHk9IjAuMzUiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIzMiIgcj0iMjgiIGZpbGw9IiNkOWZjYjUiIG9wYWNpdHk9IjAuMzUiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwIiB5MT0iMCIgeDI9IjIwMCIgeTI9IjEyMCI+PHN0b3Agc3RvcC1jb2xvcj0iIzIyYzU1ZSIvPjxzdG9wIG9mZnNldD0iMC41NSIgc3RvcC1jb2xvcj0iIzM0ZDM5OSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE0Yjg2YSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='
},
    {title: '3Ds Max', date: '2024', grade: '94%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHBhdGggZD0iTTEwMCAyMEwxNDUgNDZWOTRMMTAwIDExNkw1NSA5NFY0NkwxMDAgMjBaIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjIyIi8+PHBhdGggZD0iTTEwMCAzOEwxMjggNTVWMODJMMTAwIDk4TDcyIDgyVjU1TDEwMCAzOFoiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjU1Ii8+PHBhdGggZD0iTTEwMCAzOFY5OE03MiA1NUwxMjggODJNNTIgODJMMTI4IDU1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC4yNSIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjIyIiBmaWxsPSIjYzRjNGZmIiBvcGFjaXR5PSIwLjM1Ii8+PGNpcmNsZSBjeD0iMTYyIiBjeT0iOTAiIHI9IjI4IiBmaWxsPSIjOTNhM2ZmIiBvcGFjaXR5PSIwLjM1Ii8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiPjxzdG9wIHN0b3AtY29sb3I9IiMyNTYzZWIiLz48c3RvcCBvZmZzZXQ9IjAuNTUiIHN0b3AtY29sb3I9IiM3YzNhZWQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwZWE1ZTkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4='},
    { title: '3D Design', date: '2024', grade: '96%', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjAiIHJ4PSI4IiBmaWxsPSJ1cmwoI2dyYWQpIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjMwIiByPSIyNSIgZmlsbD0iI0ZGQzREOSIgb3BhY2l0eT0iMC41Ij4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeCIgdmFsdWVzPSIxNjA7MTU1OzE2MDsxNjU7MTYwIiBkdXI9IjEwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSIzMDsyNTszMDszNTszMCIgZHVyPSIxMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIyNTsyMzsyNTsyNzsyNSIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+CjxjaXJjbGUgY3g9IjUwIiBjeT0iOTAiIHI9IjM1IiBmaWxsPSIjRTVDOUZGIiBvcGFjaXR5PSIwLjYiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjUwOzQ1OzUwOzU1OzUwIiBkdXI9IjE1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJjeSIgdmFsdWVzPSI5MDs4NTs5MDs5NTs5MCIgZHVyPSIxM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIzNTszMjszNTszODszNSIgZHVyPSIxMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSIxODAiIGN5PSIxMDAiIHI9IjEwIiBmaWxsPSIjRkZFQkM2IiBvcGFjaXR5PSIwLjgiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiB2YWx1ZXM9IjE4MDsxNzU7MTgwOzE4NTsxODAiIGR1cj0iN3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3kiIHZhbHVlcz0iMTAwOzk1OzEwMDsxMDU7MTAwIiBkdXI9IjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMTA7ODsxMDsxMjsxMCIgZHVyPSI5cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuODswLjY7MC44OzAuOTswLjgiIGR1cj0iMTBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgo8L2NpcmNsZT4KPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMiIgcng9IjQiPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9IngiIHZhbHVlcz0iMjA7MTU7MjA7MjU7MjAiIGR1cj0iMTBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InkiIHZhbHVlcz0iMjA7MTU7MjA7MjU7MjAiIGR1cj0iMTJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMC4yOzAuMTswLjI7MC4zOzAuMiIgZHVyPSI4cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9yZWN0Pgo8cmVjdCB4PSIxNjAiIHk9IjcwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMTUiIHJ4PSIxMCI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ieCIgdmFsdWVzPSIxNjA7MTU1OzE2MDsxNjU7MTYwIiBkdXI9IjE0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ5IiB2YWx1ZXM9IjcwOzY1OzcwOzc1OzcwIiBkdXI9IjE2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ3aWR0aCIgdmFsdWVzPSIyMDsxODsyMDsyMjsyMCIgZHVyPSIxMXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iaGVpZ2h0IiB2YWx1ZXM9IjIwOzE4OzIwOzIyOzIwIiBkdXI9IjEzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjAuMTU7MC4xOzAuMTU7MC4yOzAuMTUiIGR1cj0iOXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CjwvcmVjdD4KPGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCIgeTE9IjAiIHgyPSIyMDAiIHkyPSIxMjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRTdDOUZGIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNGRkM0RTAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkU4QjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz4KPC9zdmc+'}
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
