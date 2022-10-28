//Grab couple of things I need
const section = document.querySelector(".game");
let playerTryCount = document.querySelector("span");
let playerTry = 0;

//Link text
playerTryCount.textContent = playerTry;

//Generate Data

const getData = ()  => [
    {imgSrc: "./img/cake.jpg", name: "cake"},
    {imgSrc: "./img/cake2.jpg", name: "cake2"},
    {imgSrc: "./img/cake3.jpg", name: "cake3"},
    {imgSrc: "./img/cake4.jpg", name: "cake4"},
    {imgSrc: "./img/cake5.jpg", name: "cake5"},
    {imgSrc: "./img/cake6.jpg", name: "cake6"},
    {imgSrc: "./img/cake7.jpg", name: "cake7"},
    {imgSrc: "./img/cake8.jpg", name: "cake8"},
    {imgSrc: "./img/cake.jpg", name: "cake"},
    {imgSrc: "./img/cake2.jpg", name: "cake2"},
    {imgSrc: "./img/cake3.jpg", name: "cake3"},
    {imgSrc: "./img/cake4.jpg", name: "cake4"},
    {imgSrc: "./img/cake5.jpg", name: "cake5"},
    {imgSrc: "./img/cake6.jpg", name: "cake6"},
    {imgSrc: "./img/cake7.jpg", name: "cake7"},
    {imgSrc: "./img/cake8.jpg", name: "cake8"},
]

//const data = getData();

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() -0.5); 
    return cardData;
};

randomize();

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    const cards = document.querySelectorAll(".card");
    cardData.forEach((item, index) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList ="card";
        face.classList ="face";
        back.classList ="back";
        //Attach the info to the cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};

//Check cards

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    
    
    //Logic
    if (flippedCards.length === 2) {
        section.style.pointerEvents = 'none';
        if (
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
            ) {
            console.log("match")
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents ="none";
                setTimeout(() => section.style.pointerEvents = 'unset', 2000); 
            });

        } else {
            console.log("wrong")
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 2000);
                setTimeout(() => section.style.pointerEvents = 'unset', 2000);              
            });
        }
        playerTry++;
        playerTryCount.textContent = playerTry;
        if (playerTry === 500) {
            restart();
        } 
        if (toggleCard.length === 16) {
            setTimeout( () => {
                modal.style.display ="block";
            }, 1500);
        }
    }   
    
};

cardGenerator();

//Restart
const restart = () => {
    let cardData =randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents ="none";
    cardData.forEach((item,index)=> {
        cards[index].classList.remove("toggleCard");
        //Randomize
        setTimeout( () => {
        cards[index].style.pointerEvents = "unset";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents ="unset";
     }, 1000);       
    })
    playerTry = 0;
    playerTryCount.textContent = playerTry;
}

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
