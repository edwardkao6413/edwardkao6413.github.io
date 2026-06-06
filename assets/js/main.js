// ── Navbar hamburger toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ── Hero keyword typewriter animation ──
const keywords = [
  'Bioinformatics',
  'Data Science',
  'Genomics',
  'Machine Learning',
  'Single-cell Analysis',
  'Computational Biology',
];

const keywordEl = document.getElementById('animated-keyword');

if (keywordEl) {
  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function type() {
    const word = keywords[wordIndex];

    if (!deleting) {
      keywordEl.textContent = word.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      keywordEl.textContent = word.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting  = false;
        wordIndex = (wordIndex + 1) % keywords.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }

  type();
}
