//Array of all games
let lGames = [];

//Loading lGames with examples
function example() {
    let movie = new Game( 1, "Terminator", "Jesucristo", "12/12/2001", "Action", "12")
    lGames.push(movie);
}


// Containers and global objects 
const buttonAdd = document.getElementById('btn-addGame');

//example()
init();
example();


//Main function
function init() {
    populateTableGames();
    buttonAdd.addEventListener("click", (e) => {
        e.preventDefault();
        addGame();
    })
}

function validateGameForm() {
    //check mandatory fields
    let elements = document.querySelectorAll("#frm-game input[type=text]")

    //const [dni, name, surname, date, phone, email, acount, category] = elements;

    for (let e of elements) {

        if ((e.type === "text" || e.type === "date" || e.type === "number") && e.value === "") {
            alert("Tots els camps són obligatoris");
            e.focus();
            return false;
        }
    }

    //Check PEGI : First we need to parser the string value of the string
    let pegi = Number.parseInt($("#game_pegi").val(), 10);
    if (!Number.isInteger(pegi) || pegi > 18) {
        alert("El camp PEGI ha de ser un valor numèric entre 0 i 18");
        pegi.focus();
        return false;
    }
    return true;
}

function populateTableGames() {

    //Create rows in the table from the games list
    lGames.forEach((item) => {
        let bodyGameList = document.getElementById('gamelist');
        bodyGameList.innerHTML = "";
        let oGame = item;
        bodyGameList.innerHTML += `
                <tr>
                    <td scope = "row">${item.id}</td>
                    <td>${oGame.name}</td>
                    <td>${oGame.developer}</td>
                    <td>${oGame.release}</td>
                    <td>${oGame.pegi}</td>
                    <td>${oGame.genre}</td>
                    <td><i class= "fas fa-trash-alt" style = "color : red " data-game-id = "${oGame.id}"></i></td>
                </tr>
                `;
    });
    //setDeleteEvent();
}



function addGame() {
    console.log("Checking form data ...")

    if (!validateGameForm()) return false;

    // First we check the game is no repeated
    const even = (item) => item.name === $("#game_name").val();
    if (lGames.some(even)) {
        alert("Joc repetit");
    } else {
            //data convered to dd/mm/aaaa
            let aDate = ($("#game_release").val()).split("_");
            let release = aDate[2] + "/" + aDate[1] + "/" + aDate[0];
            let oGame = new Game(
                //++indexGame,
                $("#game_name").val(),
                $("#game_developer").val(),
                release,
                $("#game_genre").val(),
                $("#game_pegi").val()
            );
            console.info("New info : " + oGame.toString());
            console.log(lGames);

            lGames.push(oGame);
            document.getElementById("frm-game").reset();
            populateTableGames();
        
    };
};
