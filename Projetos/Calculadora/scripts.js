const display = document.querySelector("#displayInput")
const botaoIgual = document.querySelector(".igual")
const botaoPonto = document.querySelector(".ponto")
const botoesNumeros = document.querySelectorAll(".num")
const botoesOperador = document.querySelectorAll(".operador")
const botaoClean = document.querySelector(".clean")

//Variavei Globais
let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

//Funções 
function atualizaDisplay(){
    display.value = operacaoAtual;
}

function insereNumero(evento){
    if(calculando){
        operacaoAtual = evento.target.textContent;
        calculando = false;
    }else{
        operacaoAtual += evento.target.textContent;
    }   
    atualizaDisplay();
}

function inserePonto(){
    if(operacaoAtual.indexOf(".") === -1){
        operacaoAtual += ".";
        atualizaDisplay();
    }
}

function insereOperador(evento){
    if(operacaoAtual !== ""){
        if(!calculando){
            if(operador !== null){
                calcula();
            }
            valorAnterior = operacaoAtual;
            operacaoAtual = "";
        }
        operador = evento.target.textContent;
    }
}

function clean(){
    operacaoAtual = ""
    operador = null;
    valorAnterior = "";
    calculando = false;
    atualizaDisplay();
}

function calcula(){
    let resultado = null;
    const operandoAnterior = parseFloat(valorAnterior)
    const operandoAtual = parseFloat(operacaoAtual)

    switch(operador){
        case "+":
            resultado = operandoAnterior + operandoAtual;
            break;
        case "-":
            resultado = operandoAnterior - operandoAtual;
            break;
        case "/":
            resultado = operandoAnterior / operandoAtual;
            break;
        case "*":
            resultado = operandoAnterior * operandoAtual;
            break;
    }
    operacaoAtual = String(resultado);
    valorAnterior = operacaoAtual;
    calculando = true;
    atualizaDisplay();
}
//Eventos 
botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero));
botaoPonto.addEventListener("click", inserePonto);
botoesOperador.forEach((botao) => botao.addEventListener("click", insereOperador));
botaoIgual.addEventListener("click", calcula);
botaoClean.addEventListener("click", clean)