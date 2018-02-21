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
	this.cartavolteada =0;
	this.estadopartida = "Memory Game";
	this.cartasEncontradas = 0;

	this.initGame = function () {
		this.cartasPosibles =["8-ball","dinosaur","guy","kronos","potato","rocket","unicorn","zeppelin"];
		for (i = 0; i < 16; i+=2) { 
			this.arrayCartas[i] = new MemoryGameCard(this.cartasPosibles[i/2]);
		 	this.arrayCartas[i+1] = new MemoryGameCard(this.cartasPosibles[i/2]);
		}
		this.arrayCartas = shuffle(this.arrayCartas);
		this.loop();
	};

	this.loop = function () {
		//console.log(this.arrayCartas[0].valor);
		setInterval(this.draw.bind(this),16);
	};

	this.draw = function () {
		//console.log(this.arrayCartas[0].valor);
		//this.grafic.draw(this.arrayCartas[0].valor,0);
		this.grafic.drawMessage(this.estadopartida);
		for (i = 0; i < 16; i++) { 
			if(this.arrayCartas[i].estado == "bocabajo"){
				this.grafic.draw("back",i);
			}else{
				this.grafic.draw(this.arrayCartas[i].valor,i);
			}
			
		}
	};
	/*
	Este método se llama cada vez que el jugador pulsa sobre alguna de las cartas (identificada por el número que ocupan en el array de cartas del juego). Es el responsable de voltear la carta y, si hay dos volteadas, comprobar si son la misma (en cuyo caso las marcará como encontradas). En caso de no ser la misma las volverá a poner boca abajo1.
	*/
	this.onClick = function (cardID) {
		this.carta=cardID;
		this.arrayCartas[this.carta].flip();
		this.cartavolteada++;
		this.posotraCarta;
		if(this.cartavolteada == 2){
			for (i = 0; i < 16; i++) { 
				if((this.arrayCartas[i].estado=="bocarriba")&&(this.arrayCartas[this.carta]!= this.arrayCartas[i])){
					this.posotraCarta = i;
				}		
			}
			this.arrayCartas[this.carta].compareTo(this.arrayCartas[this.posotraCarta]);
			if(this.arrayCartas[this.carta].estado!="encontrada"){
				//window.releaseEvents(Event.CLICK)
				setTimeout(volteardos.bind(this), 1000);
				//window.captureEvents(Event.CLICK)
				this.estadopartida="Try Again";
				/*this.arrayCartas[this.carta].flip();
				this.arrayCartas[posotraCarta].flip();*/
			}else{
				this.cartasEncontradas+=2;
				this.estadopartida="Match Found";
			}
			this.cartavolteada = 0;
		}
		if(this.cartasEncontradas==16){
			this.estadopartida="You Win";
		}

		volteardos = function(){
			this.arrayCartas[this.carta].flip();
			this.arrayCartas[this.posotraCarta].flip();
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
		carta1=this;
		carta2=otherCard;
		if(carta1.valor==carta2.valor){
			carta1.found();
			carta2.found();
		}
	};
	this.found = function() {
		this.estado = "encontrada";
	}
};
