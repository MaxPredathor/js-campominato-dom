(function(){
    
    const btn = document.getElementById('buttonGenera');
    const btn2 = document.getElementById('buttonReset');
    const option = document.getElementById('selector');
    const NUM_BOMBS = 16;
    let gameStatus = false;
    let ilTuoPunteggio = 0;
    let punteggio = document.getElementById('punteggio');
    let bombExplosion = new Audio('../audio/Bomb, boom, cannon sound effect.mp3');
    let winSound = new Audio('../audio/WIN sound effect no copyright.mp3');
    let myBombs;
    let myBox;
    let click;
    let selector;

    btn.addEventListener('click', function(){
        selector = parseInt(document.querySelector('select').value);
        const playground = document.getElementById('playground');
        playground.innerHTML = '';
        ilTuoPunteggio = 0;
        punteggio.innerHTML = '0';

        myBombs = bombCreation(selector);

        for(let i = 0; i < selector; i++){
            myBox = boxCreation(i);
            playground.append(myBox);
        }
    });

    btn2.addEventListener('click', function(){
        ilTuoPunteggio = 0;
        punteggio.innerHTML = '0';
        playground.innerHTML = '';
        btn2.classList.add('d-none');
        btn.classList.remove('d-none');
        option.classList.remove('d-none');
        punteggio.classList.remove('lose','win');
        gameStatus = false;
    })

    function boxCreation(myBoxIndex){
        const myBox = document.createElement('div'); 
        const numberOfTry = selector - NUM_BOMBS;
        myBox.classList.add('box');
        myBox.innerHTML = myBoxIndex + 1;
        let radiceQ = Math.sqrt(selector);
        myBox.style.width = `calc(100% / ${radiceQ})`;
        myBox.style.height = `calc(100% / ${radiceQ})`;

        myBox.addEventListener('click', function clickMe(){
            
            console.log(this.innerText);
            if(gameStatus === false){
                if(myBombs.includes(parseInt(myBoxIndex + 1))){
                    myBox.classList.add('bomb');
                    myBox.style.color = 'black';
                    fineGame();
                    punteggio.innerHTML = `You LOST!! ${ilTuoPunteggio}`
                    bombExplosion.play();
                    punteggio.classList.add('lose');
                }else{
                    myBox.classList.add('onclick');
                    ilTuoPunteggio++;
                    adjacentCheck(myBox);
                    if(ilTuoPunteggio === numberOfTry){
                        fineGame();

                        punteggio.classList.add('win');
                        punteggio.innerHTML = `You WON!! ${ilTuoPunteggio}`
                        winSound.play();
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
        while(bombArray.length < NUM_BOMBS){
            let num = getRndInteger(1, selector);
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
                allBombs.classList.remove('bomb');
                allBombs.classList.add('bomb');
                allBombs.style.color = 'black';
                btn2.classList.remove('d-none');
                btn.classList.add('d-none');
                option.classList.add('d-none');
            }
        }
        gameStatus = true;
    } 
    
    function adjacentCheck(myBox){
        click = document.getElementsByClassName('myBox');       
        let adjacentArray = [];
        let x = parseInt(myBox.innerHTML);
        let root = parseInt(Math.sqrt(selector));
        let up = x - root;
        let down = x + root;
        let left = x - 1;
        let right = x + 1;
        let bombAmount = 0;
        if(x / selector === 1){
            adjacentArray.push(up, left);
            for(let b = 0; b < adjacentArray.length; b++){
                if(myBombs.includes(adjacentArray[b])){
                    bombAmount++;
                    console.log(bombAmount);
                }
            }   

        }else if(x / root === 1){
            adjacentArray.push(down, left);
            for(let n = 0; n < adjacentArray.length; n++){
                if(myBombs.includes(adjacentArray[n])){
                    bombAmount++;
                    console.log(bombAmount);
                }
            }

        }else if(x * 1 === 1){
            adjacentArray.push(down, right);
            for(let v = 0; v < adjacentArray.length; v++){
                if(myBombs.includes(adjacentArray[v])){
                    bombAmount++;
                    console.log(bombAmount);
                }
            }

        }else if((x + (root - 1)) / selector === 1){
            adjacentArray.push(up, right);
            for(let d = 0; d < adjacentArray.length; d++){
                if(myBombs.includes(adjacentArray[d])){
                    bombAmount++;
                    console.log(bombAmount);
                }
            }

        }else if(x < root){
            adjacentArray.push(down, right, left);
            for(let g = 0; g < adjacentArray.length; g++){
                if(myBombs.includes(adjacentArray[g])){
                    bombAmount++;
                    console.log(bombAmount);
                }
            }

        }else if(x > selector - root){
            adjacentArray.push(up, right, left);
            for(let g = 0; g < adjacentArray.length; g++){
                if(myBombs.includes(adjacentArray[g])){
                    bombAmount++;
                }
            }

        }else if((x - 1) % root === 0 ){
            adjacentArray.push(up, down, right);
            for(let g = 0; g < adjacentArray.length; g++){
                if(myBombs.includes(adjacentArray[g])){
                    bombAmount++;
                }
            }

        }else if(x % root === 0 ){
            adjacentArray.push(up, down, left);
            for(let g = 0; g < adjacentArray.length; g++){
                if(myBombs.includes(adjacentArray[g])){
                    bombAmount++;
                }
            }

        }else{
            adjacentArray.push(up, down, right, left);
            for(let g = 0; g < adjacentArray.length; g++){
                if(myBombs.includes(adjacentArray[g])){
                    bombAmount++;
                }
            }
        }

        myBox.innerHTML = bombAmount;
        myBox.classList.add('fs');
        myBox.classList.add('fw-bold');
        
        if(bombAmount === 4){
            myBox.style.color = 'firebrick';
        }else if(bombAmount === 3){
            myBox.style.color = 'orange';
        }else if(bombAmount === 2){
            myBox.style.color = 'purple';
        }else if(bombAmount === 1){
            myBox.style.color = 'yellow';
        }else{
            myBox.style.color = 'green';
        }            
    }
}) ();