let listaDeNumerosGerados = [];
let limiteMinimo = 0
let limiteMáximo = 10
let quantidadeMaximaDeNumeros = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', "Acertou!");
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        ativarBotao();
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        if (chute < limiteMinimo || chute > limiteMaximo) {
            exibirTextoNaTela('p', 'Tem que ser entre 1 ou 10');
            tentativas--;
        }
        tentativas++;
        limparCampo()
    }      
    console.log(numeroSecreto);
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
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

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

exibirMensagemInicial();
