(function startFunct(){
	//define the properties and methods for the moves as objects
	const Move = function(el){
		// save this object inside a contant to make mor ease to work with
		const move = this;
		// save each div of the moves as element of this object
		move.element = el;
		// attach a click event listener to the object
		move.element.addEventListener("click", function(){
			// get the classes of the clicked element to manipulate that
			const arrClasses = this.classList;
			// check if the move is empty
			if(arrClasses[3]=="empty"){
				//remove the empty class
				arrClasses.remove("empty");
				//add the class for the piece chosed by the current player
				arrClasses.add(pieceTurn);
				if(pieceTurn == "cross"){
					pieceTurn = "circle"
				}
				else if(pieceTurn == "circle"){
					pieceTurn = "cross";
				}
			}
			// Let the player know if that movement is not possible
			else{
				alert("Move aready token! Please try a empty move.");
			}
		});
	}	
	
	//get each possible move inside the borad and make a new object for each
	const arrMoves = document.getElementsByClassName("move");
	for(var i=0; i<arrMoves.length; i++){
		new Move(arrMoves[i]);
	}
	
	//create a array to push the players
	let arrPlayers = [];
	//create a pieceTurn cariable to be used along the game
	let pieceTurn = "";
	//create a playerChosing let and set to be player 1to be used along the game
	let playerChosing = "player1";
	
	//check if there is some player saved on localStorage
	function checkSavedPlayers(){
		//get the players already saved in the localStorage as a array of objects
		const savedPlayers = (localStorage.getItem("players"))?JSON.parse(localStorage.getItem("players")):arrPlayers;
		//get the player selection to manipulate that later
		const choosePlayer = document.getElementById("choosePlayer");
		//check if there is some player already created on this Browser
		if(savedPlayers.length != 0){
			//show the players as options to select
			savedPlayers.forEach((value, index) => {
				choosePlayer.querySelector("select").innerHTML += "<option value='"+index+"'>"+value.strName+"</option>";
			});
		}
		//if there is no player already created grey down the selection
		else{
			choosePlayer.style.color = "#c3c3c3";
			choosePlayer.querySelector("select").style.color = "#c3c3c3";
			choosePlayer.querySelector("select").style.pointerEvents = "none";
		}
	};
	
	//create a function to save new players
	function saveNewPlayer(strName){
		const oNewPlayer = {
			//set the properties of the new player using the input element value
			strName: strName,
			victories: 0,
			played: 0
		};
		// push the new player in the players array
		arrPlayers.push(oNewPlayer);
		localStorage.setItem("players", JSON.stringify(arrPlayers));
	};
	
	//attach a click event listener to the crate player buton 
	document.querySelector(".createPlayer").addEventListener("click", function () {
		//get the input that contain the name of the new player
		const newPlayer = document.getElementById("newPlayer");
		//save the new player
		saveNewPlayer(newPlayer.value);
		newPlayer.readOnly = true;
		newPlayer.style.border = "none";
		this.style.display = "none";
		return false;
	});
	
	// attach a click event listener to the pieces choice
	const pieces = document.getElementsByClassName("piece");
	for(var i = 0 ; i < pieces.length; i++){
		pieces[i].addEventListener("click", function(){
			pieceTurn = this.classList[1];
			this.style.pointerEvents = "none";
			this.style.border = "2px solid #25C004";
		});
	}
	
	//attach a click event to the Next button then the game can proced to the the next step
	document.getElementById("next").addEventListener("click", function(){
		if(playerChosing == "player1"){	document.querySelector("#playerSelection h3").textContent = "Player 2";

			const newPlayer = document.getElementById("newPlayer");
			newPlayer.readOnly = false;
			newPlayer.value = "";
			newPlayer.style.border = "1px solid #d9d6d6";
			document.querySelector(".createPlayer").style.display = "initial";
			document.querySelector("#playerSelection > label:nth-child(6)").style.display = "none";
			document.querySelector(".pieceChoice").style.display = "none";
			playerChosing = "player2";
		}
		else if(playerChosing == "player2"){
			document.querySelector(".modal.player").style.display = "none";	
		}
	});
	
	checkSavedPlayers();	
})();
