
myCode();

function myCode(){
    
    const btn = document.getElementById('buttonGenera');
    const playground = document.getElementById('playground');
    const selector = document.querySelector('select');
    const btn2 = document.getElementById('buttonReset');

    selector.addEventListener('change', function(){

        let numeroBoxes = selector.value;
        const NUM_BOMBS = 16;
        let myBombs = bombCreation();
        let gameStatus = false;
        let ilTuoPunteggio = 0;
        const numberOfTry = numeroBoxes - NUM_BOMBS;

        btn.addEventListener('click', function(){

            playground.innerHTML = '';
            for(let i = 1; i <= numeroBoxes; i++){
                let x = boxCreation(i);
                playground.append(x);
            }
        });

        btn2.addEventListener('click', function(){
            playground.innerHTML = '';
            btn2.classList.add('d-none');
            btn.classList.remove('d-none');
            selector.classList.remove('d-none');
            gameStatus = false;
            ilTuoPunteggio = 0;
        })

        function boxCreation(myBoxIndex){
            const myBox = document.createElement('div'); 
            myBox.classList.add('box');
            myBox.innerHTML = myBoxIndex;
            let radiceQ = Math.sqrt(numeroBoxes);
            myBox.style.width = `calc(100% / ${radiceQ})`;
            myBox.style.height = `calc(100% / ${radiceQ})`;

            myBox.addEventListener('click', function clickMe(){
                console.log(this.innerText);
                let punteggio = document.getElementById('punteggio');

                if(gameStatus === false){
                    if(myBombs.includes(parseInt(myBox.innerText))){
                        myBox.classList.add('bomb');
                        myBox.style.color = 'black';
                        fineGame();
                        gameStatus = true;
                        punteggio.innerHTML = `You LOST!! ${ilTuoPunteggio}`
                    }else{
                        myBox.classList.add('onclick');
                        ilTuoPunteggio++;
                            if(numberOfTry === ilTuoPunteggio){
                                fineGame();
                                gameStatus = true;
                                punteggio.innerHTML = `You WON!! ${ilTuoPunteggio}`
                            }else{
                                punteggio.innerHTML = `Il tuo punteggio ${ilTuoPunteggio}`
                            }
                    }
                }else {
                    myBox.removeEventListener('click', clickMe);               
                }
                myBox.removeEventListener('click', clickMe); 
            });
            return myBox;
        }

        function bombCreation(){
            let bombArray = [];
            while(bombArray.length <= NUM_BOMBS - 1){
                let num = getRndInteger(1, numeroBoxes);
                if(bombArray.includes(num)){

                }else{
                    bombArray.push(num);
                }
            }
            console.log(bombArray.sort());
            return bombArray;
        }

        function fineGame(){
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
    })  
};