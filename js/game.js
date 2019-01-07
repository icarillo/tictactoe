(function startFunct(){
	const Move = function(el){
		const move = this;
		move.element = el;
		move.element.addEventListener("click", function(){
			const playerTurn = (typeof player !== 'undefined')?player:"cross";
			const arrClasses = this.classList;
			if(arrClasses[3]=="empty"){
				arrClasses.remove("empty");
				arrClasses.add(playerTurn);
				if(playerTurn == "cross"){
					player = "circle"
				}
				else if(playerTurn == "circle"){
					player = "cross";
				}
				console.log(arrClasses);
			}
			else{
				alert("Move aready token!");
			}
		});
	}	

	const arrMoves = document.getElementsByClassName("move");
	for(var i=0; i<arrMoves.length; i++){
		new Move(arrMoves[i]);
	}
//	var players = [{strName: "Italo"}];
//	localStorage.setItem("players", JSON.stringify(players));
	const arrPlayers = JSON.parse(localStorage.getItem("players"));
	const choosePlayer = document.getElementById("choosePlayer");
	if(arrPlayers){
		console.log(arrPlayers[0].strName);
		for(var i = 0; i<arrPlayers.length; i++){
			choosePlayer.querySelector("select").innerHTML += "<option>"+arrPlayers[i].strName+"</option>";
		}
	}
	else{
		choosePlayer.style.color = "#c3c3c3";
		choosePlayer.querySelector("select").style.color = "#c3c3c3";
		choosePlayer.querySelector("select").style.pointerEvents = "none";
	}
	
})();
