var deck = [];
var playerCards = [];
var dealerCards = [];
//Get Player Card spaces
for(i = 1; i <= 6; i++){
	var idString = "player-card-space" + i.toString();
	console.log(idString)
	playerCards[i] = document.getElementById(idString);
}
//Get Dealer Card spaces
for(i = 1; i <= 6; i++){
	dealerCards[i] = document.getElementById("dealer-card-space" + i.toString());
}
console.log(playerCards);
console.log(dealerCards);
function deal(){
	var deck = [];
	// fill our deck in order (for now)
	//suit loop
	var suit = "";
	for(s=1; s<=4; s++){
		if(s === 1){
			suit = "h";
		}
		else if(s === 2){
			suit = "s";
		}
		else if(s === 3){
			suit = "d";
		}
		else if(s === 4){
			suit = "c";
		}
		//card number loop
		for(i=1; i<=13; i++){
			deck.push(i+suit);
		}
	}
	console.log(deck);

	var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	// Shuffle the deck
	for(i = 0; i< numberOfTimesToShuffle; i++){
		//  pick two random cards from the deck, and switch them.
		var card1 = Math.floor(Math.random() * 52);
		var card2 = Math.floor(Math.random() * 52);
		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}

	console.log(deck);

	var playerSpaces = [];
	var dealerSpaces = [];
	for(i = 0; i < 6; i++){
		playerSpaces[i] = document.getElementById("player-card-space" + (i+1));
		dealerSpaces[i] = document.getElementById("dealer-card-space" + (i+1));
	}


	//Deal starting cards to players

	playerSpaces[0].innerHTML = deck[0];
	dealerSpaces[0].innerHTML = deck[1];	
	playerSpaces[1].innerHTML = deck[2];	
	dealerSpaces[1].innerHTML = deck[3];

	playerSpaces[0].className = "card";	
	playerSpaces[1].className = "card";	
	dealerSpaces[0].className = "card";	
	dealerSpaces[1].className = "card";	

	// for(i = 0; i<4; i++){
	// 	if(i === 0){
			
	// 	}

	// }


}

function stand(){

}

function hit(){

}