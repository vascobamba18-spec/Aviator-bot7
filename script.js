3. script.js

js
const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('input-message');
const sendBtn = document.getElementById('send-btn');
const toggleThemeBtn = document.getElementById('toggle-theme');
const historyEl = document.getElementById('history');

let rounds = [];
let isDark = false;
let chart;

function addMessage(text, sender = 'bot') {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function generateRound() {
[4/8 14:37] ChatGPT: // Simula um multiplicador entre 1.00 e 20.00, mais realista perto do Aviator
  const chance = Math.random();
  let multiplier;
  if (chance < 0.5) multiplier = (Math.random() * 3 + 1).toFixed(2);
  else if (chance < 0.8) multiplier = (Math.random() * 5 + 3).toFixed(2);
  else multiplier = (Math.random() * 15 + 8).toFixed(2);
  return parseFloat(multiplier);


function addRound(multiplier) 
  rounds.push(multiplier);
  if (rounds.length > 50) rounds.shift();
  updateHistory();
  updateChart();


function updateHistory() 
  historyEl.innerHTML = rounds.map((m, i) => `Rodada{i + 1}: x${m}`).join('<br>');
}

function updateChart() {
  if (!chart) {
    const ctx = document.getElementById('roundChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: rounds.map((_, i) => i + 1),
        datasets: [{
          label: 'Multiplicador',
          data: rounds,
          borderColor: '#25d366',
          backgroundColor: 'rgba(37, 211, 102, 0.2)',
          fill: true,
          tension: 0.3,
        }]
      },
      options: {
        animation: false,
        scales: {
          y: { beginAtZero: true, max: 25 }
        }
      }
    });
  } else {
    chart.data.labels = rounds.map((_, i) => i + 1);
[4/8 14:38] ChatGPT: function playRound() 
  const multiplier = generateRound();
  addRound(multiplier);
  addMessage(`Rodada finalizada! Multiplicador: x{multiplier.toFixed(2)}`);
  notify(`Rodada: x${multiplier.toFixed(2)}`);
  autoStrategy(multiplier);
}

function autoStrategy(multiplier) {
  // Exemplo simples de estratégia:
  // Entra quando o multiplicador anterior foi < 3 e sai em 2x
  if (rounds.length < 2) return;
  const last = rounds[rounds.length - 2];
  if (last < 3) {
    addMessage('Entrada sugerida: Apostar agora!');
    // Espera 5 segundos para saída simulada
    setTimeout(() => {
      addMessage('Saída sugerida: Retirar aos 2x!');
    }, 5000);
  }
}

function notify(text) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification(text);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") new Notification(text);
    });
  }
}

sendBtn.onclick = () => {
  const text = inputEl.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  inputEl.value = '';
  setTimeout(() => {
    handleUserMessage(text);
  }, 500);
};

function handleUserMessage(text) {
  const lower = text.toLowerCase();
  if (lower.includes('rodada')) {
[4/8 14:38] ChatGPT: else if (lower.includes('histórico') || lower.includes('history')) 
    addMessage(`Histórico:{rounds.map((m, i) => `Rod i+1: x{m}`).join(', ')}`);
  } else if (lower.includes('ajuda')) {
    addMessage('Digite "rodada" para simular uma rodada, "histórico" para ver o histórico.');
  } else {
    addMessage('Não entendi. Digite "ajuda" para comandos.');
  }
}

toggleThemeBtn.onclick = () => {
  isDark = !isDark;
  if (isDark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
};

// Inicialização
updateHistory();
updateChart();