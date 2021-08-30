class Game{
    constructor(n){
        this.cards = n;
        this.matches = n/2;
        this.games = [];
    }
    createCards(){
        let main = document.querySelector(".main");
        for(let i = 0; i < this.cards; i++){
            let card = document.createElement("div");
            let card__content = document.createElement("div");
            card__content.classList.add("card__content");
            card__content.classList.add("hidden");
            card.append(card__content);
            card.classList.add("card");
            main.append(card)
        }
        // const cards = document.querySelectorAll(".card");
        // cards.forEach(card => document.addEventListener("click", activecard));
    }

    set_cards(){
        let game_cards ={
            1:"svg/01 Love/01 Crazy in love.svg",
            2:"svg/02 Happy/01 Smile.svg",
            3:"svg/03 Satisfaction/01 Excited.svg",
            4:"svg/04 Surprise/01 Surprised.svg",
            5:"svg/05 Irreverent/01 Wink.svg",
            6:"svg/06 Apathy/01 Unimpressed.svg",
            7:"svg/09 Anguish/01 Sad.svg",
            8:"svg/10 Sick/02 Virus.svg",
            9:"svg/08 Unhappy/05 Furious.svg",
            10:"svg/10 Sick/06 Freezing.svg",
            11:"svg/07 Concern/07 Pleading.svg",
            12:"svg/02 Happy/10 LMAO.svg",
            13:"svg/03 Satisfaction/02 Like a boss.svg"
        }
            for (let key in game_cards){
                if (key <= this.matches){
                    this.games.push(game_cards[key]);
                    this.games.push(game_cards[key]);
                }
            }
        }
    shuffle(){
        for (let i = this.games.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); 
            [this.games[i], this.games[j]] = [this.games[j], this.games[i]];
          }
    }

    pushElementsToCards(){
        let card__content = document.querySelectorAll(".card__content");
        card__content.forEach((card,i)=>{
            let img = document.createElement("img");
            img.classList.add("img");
            img.setAttribute("src",`${this.games[i]}`)
            img.setAttribute("alt","card");
            card.append(img);
        })
    }


}


function startGame(game){
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.addEventListener("click", activecard));


    let matches = game;
    localStorage.setItem("matches", matches);
    let card1 = null;
    let card2 = null;
    let attempts = game*3;

    let attmpt = document.querySelector(".attempts");
    attmpt.innerText = `counts left: ${attempts}`;

    function activecard(e){
        e.target.classList.add("card--active");
        e.target.firstElementChild.classList.remove("hidden");
        if (!card1){
            card1 = e.target;

        }else{
            card2 = e.target;
            compareTwoCards(card1,card2);
            card1 = null;
            card2 = null;
        }
    }


    function deadctivecard(e){

        e.classList.remove("card--active");
        e.firstElementChild.classList.add("hidden");
    }

    function compareTwoCards(card1,card2){
        attempts -= 1;
        attmpt.innerText = `counts left: ${attempts}`;
  

       if (card1 !== card2){
           if (card1.firstElementChild.firstElementChild.attributes.src.textContent !== card2.firstElementChild.firstElementChild.attributes.src.textContent){
                setTimeout(()=> deadctivecard(card1), 1000);
                setTimeout(()=> deadctivecard(card2), 1000);
           }else{
                
                matches -= 1;
                localStorage.setItem("matches", matches);
               if (matches === 0){
                   if (localStorage.level1 === "started"){
                       localStorage.level1 = "complete"
                   }
                   if (localStorage.level2 === "started"){
                       localStorage.level2 = "complete"
                   }
                   if (localStorage.level3 === "started"){
                       localStorage.level3 = "complete"
                   }
                   if (localStorage.level4 === "started"){
                       createWinLabel();
                       localStorage.level4 = "complete"
                   }

                   createButton();
               } 
           }
       }
       isOver(attempts,matches);
    }

    function isOver(attempts,matches) {
        if (attempts === 0 && matches > 0){
            let cards = document.querySelectorAll(".card");
            cards.forEach(card=> card.removeEventListener("click",activecard));
            createLoseLabel();
            createButton();

        }
    }
}


function game(p) {
    function play(game) {
        game.createCards();
        game.set_cards();
        game.shuffle();
        game.pushElementsToCards();
        startGame(game.matches);
    }

    buttons = document.querySelectorAll("button")
    buttons.forEach(button=> button.remove());

    if (!localStorage.level1 || localStorage.level1 ==="started"){
        localStorage.setItem("level1","started");
        deleteElements();
        let level = new Game(12);
        play(level);
        startGame(level.matches);
    }else if ((localStorage.level2 ==="started" || !localStorage.level2) && (localStorage.level1 === "complete")){
        localStorage.setItem("level2","started");
        deleteElements();
        let level = new Game(16);
        play(level);
        startGame(level.matches);
    }else if ((localStorage.level3 ==="started" || !localStorage.level3) && (localStorage.level2 === "complete")){
        localStorage.setItem("level3","started");
        deleteElements();
        let level = new Game(20);
        play(level);
        startGame(level.matches);
    }else if ((localStorage.level4 ==="started" || !localStorage.level4) && (localStorage.level3 === "complete")){
        localStorage.setItem("level4","started");
        deleteElements();
        let level = new Game(24);
        play(level);
        startGame(level.matches);
    }else{
        deleteElements();
        localStorage.clear();
        deleteAttempts();
        createButton();
    }
}

function deleteElements() {
    let main = document.querySelector(".main");
    for (let i =0;main.firstElementChild !== null;i++){
        main.firstElementChild.remove();
    }
}

function clearStorage() {
    localStorage.clear();
}

function createLogo() {
let i = 50;
    function designLogo() {
        setTimeout(function () {
            let logo = document.querySelector(".logo");
            let top = 400;
            let text = document.createElement("div");
            let limit = 450;
            text.innerHTML= "Memory";
            text.classList.add("text");
            text.classList.add("text__upper");
            if (i<limit){
            let text = document.createElement("div");
            text.innerHTML= "Memory";
            text.classList.add("text");
            text.classList.add("text__upper");
            text.setAttribute("style",`top:${top-i}px`);
            logo.prepend(text)
            i+=50;
            designLogo();
            
        }
        
        },50)
    }
    designLogo();
}

function deleteLogo() {
    let i = 9;
    let length = 1;
    function deleteElem() {
        setTimeout(function () {
        let logo = Array.from(document.querySelectorAll(".text"));
        if (i>length){
            i--;
            logo[i].remove();
            deleteElem();
        }
        },50)
    }
    deleteElem();
}

function setLevel() {
    let levels = document.querySelectorAll(".level");
    levels.forEach(level=> level.remove());

    let div = document.createElement("div");
    
    div.classList.add("level");
    if (localStorage.level1 =="started"){
    div.innerText = "level 1";
    }else if(localStorage.level2 == "started"){
        div.innerText ="level 2";
    }else if(localStorage.level3 == "started"){
        div.innerText = "level 3";
    }else if(localStorage.level4 == "started"){
        div.innerText ="level 4";
    }

    let logo = document.querySelector(".logo");
    logo.after(div);
}
function setAttempts() {    
    let attempt = document.querySelector(".attempts");
    if(!attempt){
    let div = document.createElement("div");

    div.classList.add("attempts");

    let logo = document.querySelector(".logo");
    logo.after(div);
    }
}

function deleteAttempts() {
    let attempts = document.querySelector(".attempts");
    attempts.remove();
}

function createButton() {
    let button = document.createElement("button");
    let img = document.createElement("img");

    button.classList.add("button");
    img.classList.add("button__play_sign");

    if (localStorage.level1){
        if (localStorage.level4 === "complete"){
            button.innerHTML = "try again";
            button.classList.add("button__continue");
        }else{
            
            button.innerHTML = "continue";
            button.classList.add("button__continue");
        }
    }else{
        button.innerText ="play";
    }

    img.setAttribute("src","icons/triangle.png")

    button.prepend(img);
    
    
    
    let logo = document.querySelector(".logo");
    logo.after(button);

    let start = document.querySelectorAll(".button");
    start.forEach(button=>button.addEventListener("click",setAttempts));
    start.forEach(button=>button.addEventListener("click",game));
    start.forEach(button=>button.addEventListener("click",setLevel));
    start.forEach(button=>button.addEventListener("click",deleteLabel));
}

function createWinLabel() {
    let label_top = document.createElement("div");
    let label_down = document.createElement("div");

    label_top.classList.add("label");
    label_down.classList.add("label");
    label_top.classList.add("label__win");
    label_down.classList.add("label__win");
    label_down.classList.add("label__down");

    label_top.innerText = "you";
    label_down.innerText = "win";

    let logo = document.querySelector(".logo");
    logo.append(label_top);
    logo.append(label_down);    

} 

function createLoseLabel() {
    let label_top = document.createElement("div");
    let label_down = document.createElement("div");

    label_top.classList.add("label");
    label_down.classList.add("label");
    label_top.classList.add("label__lose");
    label_down.classList.add("label__lose");
    label_down.classList.add("label__downlose");

    label_top.innerText = "you";
    label_down.innerText = "lose";

    let logo = document.querySelector(".logo");
    logo.append(label_top);
    logo.append(label_down);    

} 




function deleteLabel() {
    let labels  = document.querySelectorAll(".label");
    labels.forEach(label => label.remove());
}

setTimeout(()=>createLogo(),1000);
setTimeout(()=>deleteLogo(),2000);
setTimeout(()=>createButton(),2700);