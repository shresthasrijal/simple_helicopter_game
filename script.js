var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

//animation for the block to move from left to right
hole.addEventListener('animationiteration', () => {
    let min = 100;
    let max = 325;
    var random = (Math.floor(Math.random() * (max - min + 1) + min));
    //var random = -((Math.random()*300) +150);
    console.log('random', random)
    hole.style.top = random + "px";
});

setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    
    //gravity
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }

    var holeLeft = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    // var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    // var blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
    
    var touchBoundry = (characterTop>400) || (characterTop<100);
    var touchBlock = holeLeft<15 && holeLeft>-50&& characterTop >= holeTop - 15 && characterTop <= holeTop +75;

    console.log({characterTop, holeTop})
    console.log('holeLeft < 15', holeLeft < 15)
    console.log('holeLeft > -50', holeLeft >-50)
    console.log('Char >>>> HoleTop',characterTop >= holeTop - 15)
    console.log('Char <<<<<< HoleTop',characterTop <= holeTop +75)

    console.log({touchBlock})
    //gameover
    if(touchBoundry || touchBlock){
        alert("Game over. Score: "+(counter-1));
        character.style.top = 185 + "px";
        counter=0;
    }

    counter++;     //score by distance 
},10);

//this will be the jump function to make the character go up slightly
function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    }, 10);
}