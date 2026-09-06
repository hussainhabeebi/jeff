(function () {
  var PASSWORD = 'SH345';
  var SESSION_KEY = 'smcAccess';

  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  var style = document.createElement('style');
  style.textContent = [
    '#smc-maint-overlay{',
      'position:fixed;inset:0;z-index:2147483647;',
      'background:#f0f4f8;',
      'display:flex;align-items:center;justify-content:center;',
      'font-family:Inter,system-ui,sans-serif;',
    '}',
    '#smc-maint-box{',
      'background:#fff;border-radius:16px;',
      'box-shadow:0 8px 40px rgba(0,0,0,.12);',
      'padding:48px 40px;max-width:420px;width:90%;text-align:center;',
    '}',
    '#smc-maint-box svg{margin-bottom:20px;}',
    '#smc-maint-box h1{',
      'font-size:1.6rem;font-weight:700;color:#1a202c;margin:0 0 8px;',
    '}',
    '#smc-maint-box p{',
      'color:#718096;font-size:.95rem;margin:0 0 28px;line-height:1.55;',
    '}',
    '#smc-maint-input{',
      'width:100%;box-sizing:border-box;',
      'padding:12px 16px;border:2px solid #e2e8f0;border-radius:8px;',
      'font-size:1rem;outline:none;transition:border-color .2s;',
      'text-align:center;letter-spacing:.15em;',
    '}',
    '#smc-maint-input:focus{border-color:#3b82f6;}',
    '#smc-maint-btn{',
      'margin-top:12px;width:100%;padding:12px;',
      'background:#3b82f6;color:#fff;border:none;border-radius:8px;',
      'font-size:1rem;font-weight:600;cursor:pointer;transition:background .2s;',
    '}',
    '#smc-maint-btn:hover{background:#2563eb;}',
    '#smc-maint-err{',
      'margin-top:10px;color:#e53e3e;font-size:.88rem;min-height:1.2em;',
    '}',
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'smc-maint-overlay';
  overlay.innerHTML = [
    '<div id="smc-maint-box">',
      '<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '<circle cx="28" cy="28" r="28" fill="#EBF4FF"/>',
        '<path d="M28 16c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12S34.627 16 28 16zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 6c.552 0 1 .448 1 1v8a1 1 0 1 1-2 0v-8c0-.552.448-1 1-1z" fill="#3B82F6"/>',
      '</svg>',
      '<h1>Under Maintenance</h1>',
      '<p>We\'re making improvements to serve you better.<br>Please check back soon.</p>',
      '<input id="smc-maint-input" type="password" placeholder="Enter access password" autocomplete="off"/>',
      '<button id="smc-maint-btn">Unlock</button>',
      '<div id="smc-maint-err"></div>',
    '</div>',
  ].join('');

  document.documentElement.appendChild(overlay);

  function unlock() {
    var val = document.getElementById('smc-maint-input').value;
    if (val === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      overlay.remove();
      style.remove();
    } else {
      var err = document.getElementById('smc-maint-err');
      err.textContent = 'Incorrect password. Please try again.';
      document.getElementById('smc-maint-input').value = '';
      document.getElementById('smc-maint-input').focus();
    }
  }

  document.getElementById('smc-maint-btn').addEventListener('click', unlock);
  document.getElementById('smc-maint-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') unlock();
    document.getElementById('smc-maint-err').textContent = '';
  });
})();
