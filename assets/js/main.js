// Lista de palavras
const words = [
    "termo", "jogar", "amigo", "sabor", "fruta", "cofre", "feliz",
    "troca", "veias", "lapis", "pasta", "porta", "calor", "barco",
    "campo", "vapor", "tempo", "chave", "vento", "arroz", "feira",
    "caixa", "vocal", "abeto", "limao", "canto", "fatos", "folha",
    "brisa", "terra", "nuvem", "ninho", "sobra", "pente", "carta",
    "linha", "poder", "norte", "custo", "leite", "janta", "reino",
    "cedro", "lucro", "cores", "busto", "astro", "puxar", "pedra",
    "mural", "dunas", "ceder", "calma", "tecla", "palha", "passe",
    "caixa", "rosto", "baixo", "toque", "haste", "valsa", "trena",
    "folga", "meias", "gosto", "peito", "tocha", "capuz", "metro",
    "mundo", "canal", "haste", "carro", "fosco", "dólar", "perna",
    "lindo", "teste", "socar", "cobra", "banal", "colar", "horto",
    "etica", "graça", "lutar", "ficha", "praga", "paris", "venus",
    "terra", "sonho", "prova", "festa", "molho", "grama", "terno",
    "chuva", "malha", "vinho", "natal", "subir", "prato", "fundo",
    "panel", "fundo", "verde", "gelar", "pouco", "hotel", "sorte",
    "velha", "baile", "norte", "nuvem", "bravo", "chama", "lento",
    "pular", "bruma", "vidro", "bruxa", "casar", "letra", "tempo",
    "quase", "fundo", "justo", "furor", "nobre", "mania", "canal",
    "manso", "sonar", "rosto", "choro", "brisa", "aroma", "cinza",
    "ciclo", "calma", "canto", "festa", "corte", "dores", "linha",
    "flora", "heroi", "morte", "noite", "capim", "cores", "papel",
    "beira", "moeda", "perda", "brisa", "reais", "porta", "couve",
    "antes", "dueto", "longo", "haste", "trama", "exato", "linha",
    "furia", "vapor", "ondas", "perna", "julho", "dente", "farto",
    "aceno", "brasa", "caixa", "azedo", "tumba", "ajuda", "arroz",
    "palco", "jejum", "barco", "banda", "astro", "grave", "lugar",
    "beijo", "faixa", "leito", "horto", "clima", "finas", "gesto",
    "selar", "catar", "pesar", "folha", "balsa", "folga", "armar",
    "virar", "tarde", "noiva", "aceno", "pista", "terra", "circo",
    "mosca", "novos", "justo", "torna", "claro", "curso", "manga",
    "selar", "ouvir", "deter", "morto", "rubro", "salsa", "pegar",
    "dever", "civil", "fuzil", "funil", "burro", "parto", "garfo",
    "marco", "largo", "adubo", "lerdo", "certo", "bater", "beber",
    "bolso", "perto", "berço", "pausa", "sopro", "fardo", "olhar",
    "pesca", "pisar", "bonus", "polir", "nevar", "falar", "trigo",
    "motor", "praia", "cheio", "levar", "cravo", "comum", "prego"
];

// Variáveis globais
let attempts = 0;
const maxAttempts = 6;
let currentAttempt = 0;
let wordToGuess;

// Função para selecionar uma palavra aleatória
function selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    wordToGuess = words[randomIndex];
}

//Função para enviar a tentativa
function submitGuess(event) {
    if (event.keyCode === 13) {
        const guess = document.getElementById('guess').value.toLowerCase();
        console.log('Tentativa:', guess);

        // Verifica se o comprimento do palpite é de 5 letras
        if (guess.length !== 5) {
            showModal('A palavra deve ter 5 letras.');
            document.getElementById('guess').value = ''; 
            document.getElementById('guess').blur();
            return;
        }
        // Obter a tentativa atual e a palavra correta
        const currentAttemptDiv = document.querySelectorAll('.attempt')[currentAttempt];
        const guessLetters = guess.split('');
        const wordToGuessLetters = wordToGuess.split('');
        // Usar contadores de letras para acompanhar as letras já processadas
        const correctLetters = {};
        const presentLetters = {};
        const usedLetters = {};

        // Passagem 1: Verificar letras corretas
        for (let i = 0; i < guess.length; i++) {
            const charElement = currentAttemptDiv.children[i];
            const guessLetter = guessLetters[i];
            const wordLetter = wordToGuessLetters[i];

            // Verifica se a letra está na posição correta
            if (guessLetter === wordLetter) {
                charElement.classList.add('correct');
                charElement.classList.remove('present', 'incorrect');
                correctLetters[i] = true;
                usedLetters[wordLetter] = (usedLetters[wordLetter] || 0) + 1;

                // Adiciona a letra ao elemento
                charElement.textContent = guessLetter;
            } else {
                charElement.classList.remove('correct');
            }
        }

        // Passagem 2: Verificar letras presentes
        for (let i = 0; i < guess.length; i++) {
            if (!correctLetters[i]) {
                const charElement = currentAttemptDiv.children[i];
                const guessLetter = guessLetters[i];

                // Verifica se a letra está na palavra, mas em outra posição
                if (wordToGuess.includes(guessLetter) && !usedLetters[guessLetter]) {
                    charElement.classList.add('present');
                    charElement.classList.remove('incorrect');
                    presentLetters[i] = true;
                    usedLetters[guessLetter] = (usedLetters[guessLetter] || 0) + 1;

                    // Adiciona a letra ao elemento
                    charElement.textContent = guessLetter;
                } else {
                    charElement.classList.add('incorrect');
                    charElement.classList.remove('present');
                    // Adiciona a letra ao elemento
                    charElement.textContent = guessLetter;
                }
            }
        }
        // Atualizar tentativas
        attempts++;
        currentAttempt++;
        // Verificar se a palavra foi adivinhada ou se as tentativas acabaram
        if (guess === wordToGuess) {
            showModal('Parabéns! Você acertou a palavra!');
            document.getElementById('guess').disabled = true;
            document.getElementById('reset-button').style.display = 'block';
        } else if (attempts >= maxAttempts) {
            showModal(`Você atingiu o número máximo de tentativas! A palavra era ${wordToGuess.toUpperCase()}.`);
            document.getElementById('guess').disabled = true;
            document.getElementById('reset-button').style.display = 'block';
        }

        // Limpa a entrada
        document.getElementById('guess').value = '';
        document.getElementById('guess').blur();
    }
}

// Função para reiniciar o jogo
function resetGame() {
    attempts = 0;
    currentAttempt = 0;
    document.getElementById('guess').disabled = false;
    document.getElementById('guess').value = '';
    
    // Limpa o tabuleiro do jogo
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    // Cria as áreas vazias para cada tentativa
    for (let i = 0; i < maxAttempts; i++) {
        const attemptDiv = document.createElement('div');
        attemptDiv.className = 'attempt';

        for (let j = 0; j < 5; j++) {
            const charElement = document.createElement('div');
            charElement.className = 'letter';
            attemptDiv.appendChild(charElement);
        }

        gameBoard.appendChild(attemptDiv);
    }

    document.getElementById('reset-button').style.display = 'none';
        // No local do erro
    const modalMessageElement = document.getElementById('modalMessage');
    if (modalMessageElement) {
        modalMessageElement.textContent = ''; // Apenas se modalMessageElement não for null
    }
    selectRandomWord();
}

// Inicia o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    resetGame();
});

// Função para exibir o modal de ajuda
function showHelp() {
    $('#help-modal').modal('show');
}

$(document).ready(function() {
    // Chama a função showHelp() para abrir automaticamente o modal de ajuda ao iniciar o app
    showHelp();
    
    $('#help-button').on('click', showHelp);
});

//Função para alterar o dark-mode
function toggleDarkMode() {
    const body = document.body;
    const toggleButton = document.getElementById('toggle-mode');
    const toggleIcon = document.getElementById('toggle-icon');
    const modal = document.getElementById('alertModal');
    
    body.classList.toggle('dark-mode');
    modal.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        toggleIcon.textContent = 'wb_sunny';
    } else {
        toggleIcon.textContent = 'brightness_2';
    }
}

document.getElementById('toggle-mode').addEventListener('click', toggleDarkMode);

// Referências aos elementos do modal
const modal = document.getElementById('alertModal');
const closeModalButton = document.querySelector('.close');
const modalMessageElement = document.getElementById('modalMessage');

// Função para exibir o modal com a mensagem fornecida
function showModal(message) {
    const modal = document.getElementById('alertModal');
    const modalMessageElement = document.getElementById('modalMessage');
    modalMessageElement.textContent = message;
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
    modal.style.display = 'none';
}

closeModalButton.addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

window.onkeydown = function(event) {
    event = event || window.event;
    
    // Verificando se a tecla pressionada é a de escape e, caso positivo, fecha o modal
    if (event.key == 'Escape' || event.keyIdentifier == 'U+001B') {
        closeModal();
    }
};
