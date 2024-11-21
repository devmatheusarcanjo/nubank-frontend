const saldoDebito = document.getElementById('saldo-debito');

const saldoCredito = document.getElementById('saldo-credito');

document
  .getElementById('esconder-saldo')
  .addEventListener('click', esconderSaldo);

/* Botao para acrescentar saldo */

// document.getElementById("dom-add").addEventListener("click", () => {
//     let valor = prompt("Digite um valor");

//     console.log(valor)

//     if (valor) {
//         valor = valor.replace(",", ".");
//         valor = Number(valor);

//         aumentarValor(valor);

//     }

// })

/* Funções do app */
const funcoes = {
  esconderValores: {
    value: false,

    elements: [
      Array.from(document.querySelectorAll('[saldo]')),
      Array.from(document.querySelectorAll('[esconder]')),
    ],
  },
};

/* Informações de usuario */
const info = {
  nome: {
    _value: undefined,
    element: document.getElementById('nomeDeUsuario'),
    set value(nome) {
      this._value = nome;

      // Remover fundo de carregamento, inserir nome e carregar dados do usuario
      setTimeout(inserirInformacoes, 1000);
      this.element.classList.remove('dadosCarregando');
      this.element.innerHTML = this._value;

      // Remover popup
      const popup = document.getElementById('popup-nome');
      popup.style.display = 'none';
    },
    get value() {
      console.log(this._value);
      return this._value;
    },
  },

  saldoDebito: {
    value: 13.0,
    element: document.getElementById('saldo-debito'),
  },

  saldoCredito: {
    value: 4000,
    element: document.getElementById('saldo-credito'),
  },
};

/* FUNÇÃO PARA DEFINIR NOME */
function definirNome(e) {
  e.preventDefault();
  form = document.forms['nome-usuario'];
  let nome = form.nome.value;

  if (nome && nome != ' ') {
    info.nome.value = nome;
  }
}

/* Simular operação assincrona para atualizar valor */

setTimeout(removerCarregamento, 2000);

function removerCarregamento() {
  // Remover carregamento
  document.getElementById('carregamento-inicial').style.display = 'none';

  // Exibir popup
  const popup = document.getElementById('popup-nome');
  popup.style.display = 'flex';

  //setTimeout(inserirInformacoes, 1000)
}

// DEFININDO DADOS DO USUARIO;
function inserirInformacoes() {
  saldoCredito.innerHTML = tratarValor(info.saldoCredito.value);

  /* valores dos Objeto para array */
  const infoInArray = Object.values(info);

  infoInArray.forEach((ele, index, array) => {
    const valor = ele.value,
      element = ele.element;

    if (typeof valor === 'number') {
      element.innerHTML = tratarValor(valor);
    } else {
      element.innerHTML = valor;
    }

    element.classList.remove('dadosCarregando');
  });

  // Iniciar aumento de valor
  // aumentarValor(13563.46, false)
}

// Centralizar nav inferior.
setTimeout(centNavInf, 1500);
//centNavInf()

function centNavInf() {
  const navInferior = document.getElementById('nav-inferior');

  const esNavInferior = window.getComputedStyle(navInferior);

  const width = Number(esNavInferior.width.replace('px', '')) / 2;

  navInferior.style.left = `calc(50% - ${width}px)`;

  navInferior.style.visibility = 'visible';
}

// Função para esconder saldo ao clicar no olho do topo.

function esconderSaldo() {
  /* Boolean para confirmação ao esconder os elementos */
  let esconder = funcoes.esconderValores.value;

  const saldoC = tratarValor(info.saldoCredito.value);

  const saldoD = tratarValor(info.saldoDebito.value);

  if (funcoes.esconderValores.value) {
    funcoes.esconderValores.value = false;

    const [valor, esconder] = funcoes.esconderValores.elements;

    valor.forEach((ele) => (ele.style.display = 'block'));
    esconder.forEach((ele) => (ele.style.display = 'none'));

    this.setAttribute('class', 'bi bi-eye-slash');
  } else {
    const [valor, esconder] = funcoes.esconderValores.elements;

    valor.forEach((ele) => (ele.style.display = 'none'));
    esconder.forEach((ele) => (ele.style.display = 'block'));

    this.setAttribute('class', 'bi bi-eye');

    funcoes.esconderValores.value = true;
  }
}

/* Converter valor numerico para Real */
function tratarValor(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* Aumentar valor do saldo */
function aumentarValor(encrementar, animacao = true) {
  const total = info.saldoDebito.value + encrementar;

  // Divisao é o valor por qual sera dividido o valor a ser encrementado pra ceiar a animação de adição gradual

  let loop,
    divisao = 25;

  let acres = encrementar / divisao;
  let pouco = encrementar * 0.1;
  console.log(pouco);

  // let acres = 1.07;
  //let acres = 20000;

  // Estrutura para decidir se o valor sera acrescentado gradualmente ou tudo de uma vez.
  if (animacao) {
    loop = setInterval(acrescentarGradual, 50);
  } else {
    info.saldoDebito.value = total;
    atualizarSaldo(total);
  }

  function acrescentarGradual() {
    if (info.saldoDebito.value + acres > total) {
      info.saldoDebito.value = total;
    } else {
      info.saldoDebito.value += acres;
      acres += 0.01;

      if (info.saldoDebito.value + pouco > total) {
        divisao += 45;
        acres = encrementar / divisao;
      }
    }

    atualizarSaldo(info.saldoDebito.value);

    if (total <= info.saldoDebito.value) clearInterval(loop);
  }
}

function atualizarSaldo(valor) {
  const valorTratado = tratarValor(valor);

  saldoDebito.innerHTML = valorTratado;
}
