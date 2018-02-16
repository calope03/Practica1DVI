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
	this.initGame = function () {
		this.cartasPosibles =["8-ball","dinosaur","guy","kronos","potato","rocket","unicorn","zeppelin"];
		for (i = 0; i < 16; i+=2) { 
			this.arrayCartas[i] = new MemoryGameCard(this.cartasPosibles[i/2]);
		 	this.arrayCartas[i+1] = new MemoryGameCard(this.cartasPosibles[i/2]);
		}
		this.loop();
	};

	this.loop = function () {
		setInterval(this.draw,10000);
	};

	this.draw = function () {
		console.log(arrayCartas[0].valor);
		//this.grafic.draw(this.arrayCartas[0].valor,0);
		/*for (i = 0; i < 16; i++) { 

			this.grafic.draw(this.arrayCartas[i].valor,i);
		}*/
	};

};


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

};
