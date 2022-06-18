//funcao copiada do Notion
function comparador() { 
	return Math.random() - 0.5; 
}

//array com todos os tipos de papagaio
const types = ['bobrossparrot' , 'explodyparrot' , 'fiestaparrot' , 'metalparrot' , 'revertitparrot' , 'tripletsparrot' , 'unicornparrot'];

let number = 0; //numero de cartas declarado pelo player
let selected = []; //array duas posicoes contendo as cartas viradas na jogada atual
let plays = 0; //numero de jogadas, vezes que se virou uma carta
let points = 0; //numero de pares já encontrados
let time = 0; //contador de tempo do bonus

//funcoes de criação das cartas
function createRandomPairList(number) {
    let list = [];
    let j = 0;
    for (let i=0;i<number;i=list.length) {
        list.push(types[j]);
        list.push(types[j]);
        j++
    }
    return list.sort(comparador);
}
function createCards(cards) {    
    document.querySelector(".game").innerHTML = '';
    for (let i=0;i<cards.length;i++) {
        document.querySelector(".game").innerHTML += `
            <div class="${cards[i]}" onclick="selectCard(this);" data-identifier="card">
                <div class="back" data-identifier="back-face">
                    <img src="images/back.png">
                </div>
                <div class="front" data-identifier="front-face">
                    <img src="images/${cards[i]}.gif">
                </div>
            </div>        
        `;
    }
}

//desvira as cartas no caso de par errado
function unturnWrongCards() {
    selected[0].classList.remove('turned');
    selected[1].classList.remove('turned');
    selected = [];
}



//funcao que inicializa o jogo perguntando numero de cartas
function initGame() {
    
    number = prompt('Quantidade de cartas (Par de 4 a 14)');
    if (number%2 != 0 || number < 4 || number > 14 || isNaN(number))
        initGame();
    
    selected = [];
    plays = 0;
    points = 0;
    time = 0;

    let cards = createRandomPairList(number);
    createCards(cards);
}
//funcao que finaliza o jogo e reseta para o novo inicio
function endGame () {
    alert(`Você ganhou em ${plays} jogadas!`);
    let reset = prompt("Reiniciar a partida?");
    if (reset === 'sim')
        initGame();
    else if (reset === 'não')
        alert("Que peninha... ;)");
    else
        endGame();
}



//funcao chamada pelo clique em uma carta
function selectCard (card) {

    if (!card.classList.contains("turned")) { //impede o duplo click na mesma carta ou em alguma já virada
        card.classList.add('turned');
        plays++;

        if (selected[0] == null) //verifica se é a primeira virada ou a segunda
            selected[0] = card;

        else {
            selected [1] = card;

            if (selected[0].classList.value === selected[1].classList.value) { //verifica se as viradas são pares
                selected = [];
                points++;
            } else {
                setTimeout(unturnWrongCards, 1000);
            }

            if (points == number/2) //verifica se todos os pares já foram encontrados
                setTimeout(endGame,500);
        }
    }
}

initGame();