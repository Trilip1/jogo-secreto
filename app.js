
let listaDeNumerosGerados = [];
let limiteMinimo = 0;
let limiteMaximo = 10;
let tentativas = 0;
let limiteTentativas = 5; 
let tentativasRestantes = limiteTentativas - tentativas;
let numeroSecreto = gerarNumeroAleatorio();

let botao = document.querySelector('input');

let cimento = function (event) {
    if (event.key == 'Enter') {
        verificarChute();
    }
}

botao.addEventListener('keydown', cimento); 

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    
    // Primeiro verifica se o chute está fora do limite
    if (chute < limiteMinimo || chute > limiteMaximo || isNaN(chute)) {
        exibirTextoNaTela('p', `Você só pode colocar números entre ${limiteMinimo} e ${limiteMaximo}`);
        limparCampo();
        return; // impede que o resto do código execute
    } 

    // Chute válido → conta tentativa
        tentativas++;
        
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', "Acertou!");
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        disableBotao('chutar', true);
        disableBotao('reiniciar', false);
        botao.removeEventListener('keydown', cimento, false);
        limparCampo();
        return;
    } else if (chute < numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é maior');
    } else {
        exibirTextoNaTela('p', 'O número secreto é menor');
    }   

    if (tentativas  >= limiteTentativas) {
        exibirTextoNaTela('h1', 'Fim de Jogo!');
        exibirTextoNaTela('p', `Você atingiu o número máximo de tentativas, o número secreto era ${numeroSecreto}`);
        disableBotao('chutar', true);
        disableBotao('reiniciar', false);
        botao.removeEventListener('keydown', cimento, false);
        limparCampo(); 
        return;
    }
    
    limparCampo();
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteMaximo + 1);
    let tamanhoDaLista = listaDeNumerosGerados.length;
    if (tamanhoDaLista == limiteMaximo) {
        listaDeNumerosGerados = [];
    }
    if (listaDeNumerosGerados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosGerados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function disableBotao(idBotao, ativar) {
    if (ativar == true) {
        document.getElementById(idBotao).setAttribute('disabled', true);
    } else {
        document.getElementById(idBotao).removeAttribute('disabled');
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    disableBotao('reiniciar', true);
    disableBotao('chutar', false);
}

exibirMensagemInicial();