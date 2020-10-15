
//Load lGames widht example Data
lGames.push(new Gamepad(1, "Star Wars Jed: Fallen Order", "Five Start Studio", "12/12/2019", " Action", "16"));

function validateGameForm(){
    //let elemets = document.querySelectorAll("#frm-game input[type=text]");
    const elements = document.getElementById("frm-game").elements;

    //check mandatory fields

    for (let e of elements) {
        if ((e.type === "text" || e.type === "date" || e.type === "number") && e.value === "") {
            message("Tots els camps són obligatoris");
            e.focus();
            return false;            
        }
    }

    //Check PEGI : First we need to parser the string value of the string
    let pegi = Number.parseInt($("#game_pegi").val(), 10);
    if (!Number.isInteger(pegi) || pegi > 18) {
        message("El camp PEGI ha de ser un valor numèric entre 0 i 18");
        pegi.focus();
        return false;
    }
    return true;
}

function populateTableGames(lGames){
    let bodyGameList = document.getElementById("gamelist");
    bodyGameList.innerHTML = "";
    //Create rows in the table from the games list
    lGames.forEach((item)=> {
        let oGame = item;
        let sGame = `<tr>
                       <td scope = "row">${oGame.id}</td>
                       <td><${oGame.name}</td>
                       <td><${oGame.developer}</td>
                       <td><${oGame.release}</td>
                       <td><${oGame.pegi}</td>
                       <td><${oGame.genre}</td>
                       <td><i class= "fas fa-trash-alt" style = "color : red " data-game-id = "${oGame.id}"></i></td>
                    </tr>`;
    bodyGameList.innerHTML += sGame;
    });

setDeleteEvent();
}



function addGame(){
    if (!validateGameForm()) return false;

    // First we check the game is no repeated
    const even = (item) => item.name === $("#game_name").val();
    if (lGames.some(even)){
        message("Joc repetit");
    } else {
        let codiGame = ++indexGame;
        //data convered to dd/mm/aaaa
        let aDate = ($("#game_release").val().split("_"));
        let release = aDate[2] + "/" + aDate[1] + "/" + aDate[0];
        let oGame = new Game(codiGame,
            $("#game_name").val(),
            $("#game_developer").val(),
            release,
            $("#game_genre").val(),
            $("#game_pegi").val()
        );

        console.info("New info : " + oGame.toString());

        lGames.push(oGame);
        document.getElementById("frm-game").reset();
        populateTableGame(lGames);
    };
};