
let listaDeNumerosGerados = [];
let limiteMinimo = 0;
let limiteMaximo = 10;
let tentativas = 0;
let limiteTentativas = 5; 
let tentativasRestantes = limiteTentativas - tentativas;
let quantidadeMaximaDeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();


let botao = document.querySelector('input');
botao.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        document.getElementById('chutar').click();
    }
}) 


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
    if (chute >= limiteMinimo && chute <= limiteMaximo) {
        tentativas++; 
    }

    if (tentativas >= limiteTentativas) {
        exibirTextoNaTela('h1', 'Fim de Jogo!');
        exibirTextoNaTela('p', `Você atingiu o número máximo de tentativas, o número secreto era ${numeroSecreto}`);
        desativarBotao2();
        ativarBotao();
        limparCampo(); 
        return;
    }

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', "Acertou!");
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        desativarBotao2();
        ativarBotao();
    } else if (chute < numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é maior');
    } else {
        exibirTextoNaTela('p', 'O número secreto é menor');
    }

    limparCampo();
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeMaximaDeNumeros + 1);
    let tamanhoDaLista = listaDeNumerosGerados.length;
    if (tamanhoDaLista == quantidadeMaximaDeNumeros) {
        listaDeNumerosGerados = [];
    }
    if (listaDeNumerosGerados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosGerados.push(numeroEscolhido);
        console.log(listaDeNumerosGerados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function ativarBotao() {
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function ativarBotao2() {
    document.getElementById('chutar').removeAttribute('disabled');
}

function desativarBotao2() {
    document.getElementById('chutar').setAttribute('disabled', true);
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 0;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    ativarBotao2();
}

exibirMensagemInicial();
