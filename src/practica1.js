/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame

 Esta clase guarda un array con las cartas y el estado en el que se encuentra el juego en
cada momento, por lo que es la responsable de decidir cuándo ha terminado el juego.
También guarda el mensaje que aparece en pantalla y que se irá cambiando a medida
que interactuamos con el juego. También ha de tener una referencia al servidor gráfico
para poder dibujar el estado del juego. Esta clase ha de implementar al menos los
siguientes métodos
 */
MemoryGame = function(gs) {

	this.arrayCartas = [];
	this.grafic = gs;
	this.cartavolteada = 0;
	this.estadopartida = "Memory Game";
	this.cartasEncontradas = 0;
	this.espera = false;

	this.initGame = function () {
		var cartasPosibles =["8-ball","dinosaur","guy","kronos","potato","rocket","unicorn","zeppelin"];
		for (var i = 0; i < 16; i+=2) { 
			this.arrayCartas[i] = new MemoryGameCard(cartasPosibles[i/2]);
		 	this.arrayCartas[i+1] = new MemoryGameCard(cartasPosibles[i/2]);
		}
		this.arrayCartas = shuffle(this.arrayCartas);
		this.loop();
	};

	this.loop = function () {
		this.pararPartida = setInterval(this.draw.bind(this),16);
		
	};

	this.draw = function () {
		this.grafic.drawMessage(this.estadopartida);
		for (var i = 0; i < 16; i++) { 
			if(this.arrayCartas[i].estado == "bocabajo"){
				this.grafic.draw("back",i);
			}else{
				this.grafic.draw(this.arrayCartas[i].valor,i);
			}
			
		}
		if(this.cartasEncontradas==16){
				this.estadopartida="You Win";
				this.grafic.drawMessage(this.estadopartida);
				clearInterval(this.pararPartida);
		}
	};
	/*
	Este método se llama cada vez que el jugador pulsa sobre alguna de las cartas (identificada por el número que ocupan en el array de cartas del juego). Es el responsable de voltear la carta y, si hay dos volteadas, comprobar si son la misma (en cuyo caso las marcará como encontradas). En caso de no ser la misma las volverá a poner boca abajo1.
	*/
	this.onClick = function (cardID) {
		if(this.espera == false){
			if(cardID && this.arrayCartas[this.carta]){
				this.carta=cardID;
				if (this.arrayCartas[this.carta] != this.cartavolteada){
					this.arrayCartas[this.carta].flip();
					if(this.cartavolteada != 0){
						this.arrayCartas[this.carta].compareTo(this.cartavolteada);
						if(this.arrayCartas[this.carta].estado!="encontrada"){
							this.espera = true; 
							setTimeout(volteardos.bind(this), 500);
							this.estadopartida="Try Again";
						}else{
							this.cartasEncontradas+=2;
							this.estadopartida="Match Found";
							this.cartavolteada = 0;
						}
					}else{
						this.cartavolteada = this.arrayCartas[this.carta];
					}
				}
			}
		}
		volteardos = function(){
			this.arrayCartas[this.carta].flip();
			this.cartavolteada.flip();
			this.espera = false;
			this.cartavolteada = 0;
		};
	};
};

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
 }

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	this.estado = "bocabajo";
	this.valor = id;

	this.flip = function () {
		if(this.estado == "bocabajo"){
			this.estado = "bocarriba";
		}
		else if(this.estado == "bocarriba"){
			this.estado = "bocabajo";
		}
	};

	this.compareTo = function (otherCard) {
		var carta1=this;
		var carta2=otherCard;
		if(carta1.valor==carta2.valor){
			carta1.found();
			carta2.found();
		}
	};
	this.found = function() {
		this.estado = "encontrada";
	}
};
