
myCode();

function myCode(){
    
    const btn = document.getElementById('buttonGenera');
    const btn2 = document.getElementById('buttonReset');
    const NUM_BOMBS = 16;
    let gameStatus = false;
    let ilTuoPunteggio = 0;
    let bombExplosion = new Audio('../audio/Bomb, boom, cannon sound effect.mp3');
    let winSound = new Audio('../WIN sound effect no copyright.mp3');

        btn.addEventListener('click', function(){
            const playground = document.getElementById('playground');
            const selector = parseInt(document.querySelector('select').value);

            let myBombs = bombCreation(selector);

            ilTuoPunteggio.innerHTML = '';
            playground.innerHTML = '';
            for(let i = 0; i < selector; i++){
                let x = boxCreation(i, myBombs, selector);
                playground.append(x);
            }
        });

        btn2.addEventListener('click', function(){
            playground.innerHTML = '';
            btn2.classList.add('d-none');
            btn.classList.remove('d-none');
            selector.classList.remove('d-none');
            punteggio.classList.remove('lose','win');
            gameStatus = false;
            ilTuoPunteggio = 0;
        })

        function boxCreation(myBoxIndex, myBombs, selector){
            const myBox = document.createElement('div'); 
            const numberOfTry = selector - NUM_BOMBS;
            myBox.classList.add('box');
            myBox.innerHTML = myBoxIndex + 1;
            let radiceQ = Math.sqrt(selector);
            myBox.style.width = `calc(100% / ${radiceQ})`;
            myBox.style.height = `calc(100% / ${radiceQ})`;

            myBox.addEventListener('click', function clickMe(){
                console.log(this.innerText);
                let punteggio = document.getElementById('punteggio');

                if(gameStatus === false){
                    if(myBombs.includes(parseInt(myBox.innerText))){
                        myBox.classList.add('bomb');
                        myBox.style.color = 'black';
                        fineGame(myBombs);
                        gameStatus = true;
                        punteggio.innerHTML = `You LOST!! ${ilTuoPunteggio}`
                        bombExplosion.play();
                        punteggio.classList.add('lose');
                    }else{
                        myBox.classList.add('onclick');
                        adjacentCheck(selector, myBombs, myBox);
                        ilTuoPunteggio++;
                            if(numberOfTry === ilTuoPunteggio){
                                fineGame(myBombs);
                                gameStatus = true;
                                punteggio.classList.add('win');
                                punteggio.innerHTML = `You WON!! ${ilTuoPunteggio}`
                                winSound.play();
                            }else{
                                punteggio.innerHTML = `Il tuo punteggio ${ilTuoPunteggio}`
                            }
                    }

                }else {

                }
                myBox.removeEventListener('click', clickMe); 
            });
            return myBox;
        }

        function bombCreation(selector){
            let bombArray = [];
            while(bombArray.length <= NUM_BOMBS - 1){
                let num = getRndInteger(1, selector);
                if(bombArray.includes(num)){

                }else{
                    bombArray.push(num);
                }
            }
            console.log(bombArray.sort());
            return bombArray;
        }

        function fineGame(myBombs){
            const myBoxes = document.getElementsByClassName('box');
            for(let i = 0; i < myBoxes.length; i++){
                let allBombs = myBoxes[i];
                if(myBombs.includes(parseInt(allBombs.innerHTML))){
                    allBombs.classList.add('bomb');
                    allBombs.style.color = 'black';
                    btn2.classList.remove('d-none');
                    btn.classList.add('d-none');
                    selector.classList.add('d-none');
                }
            }
        } 
        function adjacentCheck(selector, myBombs, myBox){
            const click = document.getElementsByClassName('onclick');
            for(let i = 0; i < click.length; i++){
                let adjacentArray = [];
                let x = parseInt(click[i].innerHTML);
                let root = Math.sqrt(selector);
                let north = x + root;
                let south = x - root;
                let west = x - 1;
                let east = x + 1;
                let bombAmount = 0;
                if(x / selector === 1){
                    
                }else if(x / root === 1){

                }else if(x * 1 === 1){

                }else if((x + (root - 1)) / selector === 1){

                }else if(x < root){

                }else if(x > selector - (root - 1)){

                }else if((x - 1) % root === 0 ){

                }else if(x % root === 0 ){

                }else{
                    adjacentArray.push(north, south, east, west);
                    console.log(adjacentArray);
                    for(let i = 0; i < adjacentArray.length; i++)
                        if(myBombs.includes(adjacentArray[i])){
                            console.log('yay');
                            bombAmount++;

                        }

                }
                myBox.innerHTML = bombAmount;
                
                

            }
            
        }
};