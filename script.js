const nomeInput = document.getElementById('nomeUsuario');
const btnEntrar = document.getElementById('btnEntrar');
const containerNome = document.getElementById('entrada-nome');
const containerSemaforo = document.getElementById('semaforo-container');
const boasVindas = document.getElementById('boasVindas');

const luzes = {
  vermelha: document.querySelector('.vermelha'),
  amarela: document.querySelector('.amarela'),
  verde: document.querySelector('.verde'),
};

const contador = document.getElementById('contador');
const statusTexto = document.getElementById('status');
const btnPedestre = document.getElementById('btnPedestre');

let faseAtual = 0;
let intervalo;
let pedestreQuerAtravessar = false;

const somPedestre = new Audio('som-pedestre.mp3');

btnEntrar.addEventListener('click', () => {
  const nome = nomeInput.value.trim();
  if (nome !== '') {
    containerNome.style.display = 'none';
    containerSemaforo.style.display = 'block';
    boasVindas.innerText = `Bem-vindo(a), ${nome}!`;
    iniciarSemaforo();
  }
});

btnPedestre.addEventListener('click', () => {
  pedestreQuerAtravessar = true;
  statusTexto.innerText = '🚨 Pedestre pediu para atravessar!';
});

function iniciarSemaforo() {
  atualizarSemaforo();
  intervalo = setInterval(atualizarSemaforo, 7000);
}

function atualizarSemaforo() {
  limparLuzes();

  if (pedestreQuerAtravessar) {
    luzes.vermelha.classList.add('ativa-vermelha');
    statusTexto.innerText = '🚶 Carros Parados - Pedestre atravessando!';
    iniciarContagem(5);
    somPedestre.play();
    pedestreQuerAtravessar = false;
  } else {
    switch (faseAtual % 3) {
      case 0:
        luzes.verde.classList.add('ativa-verde');
        statusTexto.innerText = '🟢 Carros passando';
        iniciarContagem(5);
        break;
      case 1:
        luzes.amarela.classList.add('ativa-amarela');
        statusTexto.innerText = '🟡 Atenção: Vai fechar';
        iniciarContagem(3);
        break;
      case 2:
        luzes.vermelha.classList.add('ativa-vermelha');
        statusTexto.innerText = '🔴 Carros Parados';
        iniciarContagem(5);
        break;
    }
    faseAtual++;
  }
}

function limparLuzes() {
  luzes.vermelha.classList.remove('ativa-vermelha');
  luzes.amarela.classList.remove('ativa-amarela');
  luzes.verde.classList.remove('ativa-verde');
}

function iniciarContagem(segundos) {
  let tempo = segundos;
  contador.innerText = tempo + 's';
  const contagem = setInterval(() => {
    tempo--;
    contador.innerText = tempo + 's';
    if (tempo <= 0) clearInterval(contagem);
  }, 1000);
}