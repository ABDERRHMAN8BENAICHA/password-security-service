const API_URL = "http://127.0.0.1:8000";

/* =======================
   🛡️ JWT Auth Hooks
======================= */
function getAuthHeaders() {
  const token = localStorage.getItem("jwt_token");
  const headers = { "Content-Type": "application/json" };
  if(token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}


/* =======================
   📱 Mobile Navigation
======================= */
function toggleNav() {
  const nav = document.getElementById("navLinks");
  if(nav) nav.classList.toggle("active");
}

/* =======================
   👁️ Show / Hide Password
======================= */
function togglePassword() {
  const input = document.getElementById("passwordInput");
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

/* =======================
   📋 Copy to Clipboard
======================= */
function copyToClipboard() {
  const input = document.getElementById("passwordInput");
  if (!input || !input.value) return;
  
  navigator.clipboard.writeText(input.value).then(() => {
    alert("✅ Copied to clipboard!");
  }).catch(err => {
    console.error('Failed to copy', err);
  });
}

/* =======================
   ⌨️ Live Validation
======================= */
function liveValidate() {
  const pwd = document.getElementById("passwordInput").value;
  
  const chkLen = document.getElementById("chk-len");
  const chkUpper = document.getElementById("chk-upper");
  const chkNum = document.getElementById("chk-num");
  const chkSym = document.getElementById("chk-sym");

  if(!chkLen) return; // Only run on analyzer page

  const hasLen = pwd.length >= 12;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNum = /[0-9]/.test(pwd);
  const hasSym = /[^A-Za-z0-9]/.test(pwd);

  chkLen.innerHTML = hasLen ? "✅ 12+ Characters" : "❌ 12+ Characters";
  chkLen.style.color = hasLen ? "#10b981" : "#64748b";

  chkUpper.innerHTML = hasUpper ? "✅ Uppercase Letter" : "❌ Uppercase Letter";
  chkUpper.style.color = hasUpper ? "#10b981" : "#64748b";

  chkNum.innerHTML = hasNum ? "✅ Number (0-9)" : "❌ Number (0-9)";
  chkNum.style.color = hasNum ? "#10b981" : "#64748b";

  chkSym.innerHTML = hasSym ? "✅ Symbol (!@#$)" : "❌ Symbol (!@#$)";
  chkSym.style.color = hasSym ? "#10b981" : "#64748b";
}

/* =======================
   ⏱️ Time to Crack Appx
======================= */
function estimateCrackTime(pwd) {
  let charset = 0;
  if (/[a-z]/.test(pwd)) charset += 26;
  if (/[A-Z]/.test(pwd)) charset += 26;
  if (/[0-9]/.test(pwd)) charset += 10;
  if (/[^A-Za-z0-9]/.test(pwd)) charset += 32;

  if (charset === 0) return "Instantly";

  // Approximate combinations
  const combinations = Math.pow(charset, pwd.length);
  const guessesPerSecond = 1e10; // 10 billion guesses/sec (modern botnet)
  const seconds = combinations / guessesPerSecond;

  if (seconds < 1) return "Instantly 🤯";
  if (seconds < 60) return "A few seconds ⚠️";
  if (seconds < 3600) return "A few minutes ⚠️";
  if (seconds < 86400) return "A few hours 🚨";
  if (seconds < 31536000) return "A few days/months 🛡️";
  if (seconds < 31536000 * 100) return "A few decades 🔒";
  return "Centuries 💎";
}


/* =======================
   🔐 Password Analyzer
======================= */
async function checkPassword() {
  const passwordInput = document.getElementById("passwordInput");
  const result = document.getElementById("result");
  const bar = document.getElementById("bar");

  if (!passwordInput || !result || !bar) return;

  const password = passwordInput.value;

  if (!password) {
    result.innerHTML = "<p style='color: #ef4444;'>⚠️ Please enter a password to analyze</p>";
    bar.style.width = "0%";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/password/check`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ password })
    });

    if (!res.ok) throw new Error("Network request failed");
    const data = await res.json();

    const percent = (data.score / 5) * 100;
    bar.style.width = percent + "%";

    let color = "#ef4444"; 
    if (data.strength === "medium") color = "#f97316"; 
    if (data.strength === "strong") color = "#22c55e"; 
    if (data.strength === "very strong") color = "#3b82f6"; 

    bar.style.background = color;
    
    const crackTime = estimateCrackTime(password);

    result.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
        <p style="color:${color}; font-weight:bold; font-size: 18px;">
          ${data.strength.toUpperCase()}
        </p>
        <div style="background: rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 5px;">
           ⏱️ Crack Time: <span style="color: ${color}; font-weight: bold;">${crackTime}</span>
        </div>
      </div>
      <p style="margin-top: 10px; margin-bottom: 10px;">Score: ${data.score} / 5</p>
      <ul>
        ${data.feedback.map(f => `<li>${f}</li>`).join("")}
      </ul>
    `;

  } catch (err) {
    console.error(err);
    result.innerHTML = "<p style='color: #ef4444;'>❌ Server connection error</p>";
    bar.style.width = "0%";
  }
}

/* =======================
   🚨 Data Breach Checker
======================= */
async function checkBreach() {
  const passwordInput = document.getElementById("passwordInput");
  const result = document.getElementById("result");
  const bar = document.getElementById("bar");

  if (!passwordInput || !result) return;
  const password = passwordInput.value;

  if (!password) {
    result.innerHTML = "<p style='color: #ef4444;'>⚠️ Please enter a password to check</p>";
    return;
  }

  try {
    result.innerHTML = "<p style='color: #38bdf8;'>⏳ Checking databases for breaches...</p>";
    if (bar) bar.style.width = "0%";

    const res = await fetch(`${API_URL}/password/breach-check`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ password })
    });

    if (!res.ok) throw new Error("Network request failed");
    const data = await res.json();

    if (data.breached) {
      result.innerHTML = `
        <p style="color:#ef4444; font-weight:bold; font-size: 18px; margin-top: 15px;">
          🚨 PASSWORD COMPROMISED!
        </p>
        <div style="background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 10px; margin-top: 10px;">
            <p style="color: #fca5a5;">This password has been seen <strong>${data.count.toLocaleString()}</strong> times in historic data breaches.</p>
            <p style="margin-top: 5px; color: #f87171; font-weight: bold;">⚠️ Global Threat Level: Extreme (Top 1% Worldwide)</p>
        </div>
        <p style="margin-top: 10px;">Please do not use this password under any circumstances.</p>
      `;
    } else {
      result.innerHTML = `
        <p style="color:#22c55e; font-weight:bold; font-size: 18px; margin-top: 15px;">
          ✅ SECURE!
        </p>
        <p style="color: #22c55e;">This password has not been found in any known public data breaches.</p>
      `;
    }

  } catch (err) {
    console.error(err);
    result.innerHTML = "<p style='color: #ef4444;'>❌ Server connection error during breach check.</p>";
  }
}

/* =======================
   🗄️ Local Vault History
======================= */
function addToVault(pwd) {
    let vault = JSON.parse(localStorage.getItem('pwdVault') || '[]');
    vault.unshift(pwd); // add to top
    if(vault.length > 5) vault.pop(); // keep last 5
    localStorage.setItem('pwdVault', JSON.stringify(vault));
    renderVault();
}

function renderVault() {
    const list = document.getElementById("vaultList");
    if(!list) return;
    
    let vault = JSON.parse(localStorage.getItem('pwdVault') || '[]');
    if(vault.length === 0) {
        list.innerHTML = "<p style='color: #64748b; font-size: 13px; text-align: center; padding: 10px;'>Your vault is empty</p>";
        return;
    }
    
    list.innerHTML = vault.map(v => `
        <div style="display: flex; justify-content: space-between; background: #1e293b; padding: 8px 12px; border-radius: 6px; margin-bottom: 5px;">
            <span style="font-family: monospace; color: #94a3b8;">${v}</span>
            <span style="cursor: pointer; color: #38bdf8;" onclick="navigator.clipboard.writeText('${v}')" title="Copy">📋</span>
        </div>
    `).join('');
}

function clearVault() {
    localStorage.removeItem('pwdVault');
    renderVault();
}

/* =======================
   🔑 Generate Password
======================= */
async function generatePassword() {
  const input = document.getElementById("passwordInput");
  const result = document.getElementById("result");

  try {
    const res = await fetch(`${API_URL}/password/generate?length=16&symbols=true&numbers=true`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Network request failed");
    const data = await res.json();

    if (input) {
      input.value = data.password;
      input.type = "text"; 
    }

    if (result) {
      result.innerHTML = "<p style='color: #22c55e; margin-top: 15px;'>✅ Secure password generated successfully!</p>";
    }
    
    addToVault(data.password);

  } catch (err) {
    console.error(err);
    if (result) result.innerHTML = "<p style='color: #ef4444; margin-top: 15px;'>❌ Error generating password</p>";
  }
}

/* =======================
   📝 Generate Passphrase
======================= */
async function generatePassphrase() {
  const input = document.getElementById("passwordInput");
  const result = document.getElementById("result");

  try {
    const res = await fetch(`${API_URL}/passphrase/generate?words=4`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Network request failed");
    const data = await res.json();

    if (input) {
      input.value = data.passphrase;
      input.type = "text"; 
    }

    if (result) {
      result.innerHTML = "<p style='color: #10b981; margin-top: 15px;'>✅ Secure passphrase generated successfully!</p>";
    }
    
    addToVault(data.passphrase);

  } catch (err) {
    console.error(err);
    if (result) result.innerHTML = "<p style='color: #ef4444; margin-top: 15px;'>❌ Error generating passphrase.</p>";
  }
}

/* =======================
   🔐 2FA Setup
======================= */
async function setup2FA() {
  const setupBox = document.getElementById("setup-result");
  const secretDisplay = document.getElementById("secretDisplay");

  try {
    const res = await fetch(`${API_URL}/2fa/setup-demo`, { 
        method: "POST",
        headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("Network request failed");
    const data = await res.json();

    if (setupBox && secretDisplay) {
      setupBox.classList.remove("hidden");
      secretDisplay.innerText = data.secret;
      
      const qrTarget = document.getElementById("qrcode");
      if (qrTarget) {
        qrTarget.innerHTML = ""; 
        new QRCode(qrTarget, {
            text: data.otp_uri,
            width: 150,
            height: 150,
            colorDark: "#020617",
            colorLight: "#ffffff"
        });
      }
    }

  } catch (err) {
    console.error(err);
    alert("❌ Failed to contact the backend to setup 2FA.");
  }
}

/* =======================
   🔐 2FA Verify
======================= */
async function verify2FA() {
  const codeInput = document.getElementById("otp");
  const result = document.getElementById("verify-result");

  if (!codeInput) return;
  const code = codeInput.value;

  if (!code) {
    result.innerHTML = "<p style='color: #ef4444; margin-top: 15px;'>⚠️ Please enter the 6-digit code.</p>";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/2fa/verify-demo`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ code: code }) 
    });

    if (!res.ok) throw new Error("Network request failed");
    const data = await res.json();

    if (result) {
      if (data.valid) {
        result.innerHTML = "<p style='color: #22c55e; margin-top: 15px; font-weight: bold;'>✅ Valid Code! Authentication Successful.</p>";
      } else {
        result.innerHTML = "<p style='color: #ef4444; margin-top: 15px; font-weight: bold;'>❌ Invalid Code. Please try again.</p>";
      }
    }

  } catch (err) {
    console.error(err);
    if (result) result.innerHTML = "<p style='color: #ef4444; margin-top: 15px;'>❌ Backend connection error.</p>";
  }
}

/* =======================
   📊 Render Chart.js
======================= */
function renderChart() {
    const ctx = document.getElementById('passwordChart');
    if(!ctx) return;
    
    // Top Passwords by observed frequencies in breaches (Approximate estimations for UI impact)
    const labels = ["123456", "password", "12345678", "qwerty", "12345", "123456789", "admin", "1234", "111111", "iloveyou"];
    const frequencies = [23236311, 7856402, 5742129, 3217433, 2900010, 2400500, 1800200, 1200000, 950000, 750000];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Usage Count Worldwide (in millions)',
                data: frequencies,
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: '#ef4444',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#334155' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#cbd5e1' }
                }
            },
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });
}