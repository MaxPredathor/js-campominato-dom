
myCode();

function myCode(){
    
    const btn = document.querySelector('button');
    const playground = document.getElementById('playground');
    const selector = document.querySelector('select');

    selector.addEventListener('change', function(){


        let numeroBoxes = selector.value;
        const NUM_BOMBS = 16;
        let bombs = bombCreation();

        btn.addEventListener('click', function(){

            playground.innerHTML = '';
            for(let i = 1; i <= numeroBoxes; i++){
                let x = boxCreation(i);
                playground.append(x);
            }
        });
    
        function boxCreation(myBoxIndex){
            const myBox = document.createElement('div'); 
            myBox.classList.add('box');
            myBox.innerHTML = myBoxIndex;
            let radiceQ = Math.sqrt(numeroBoxes);
            myBox.style.width = `calc(100% / ${radiceQ})`;
            myBox.style.height = `calc(100% / ${radiceQ})`;
            myBox.addEventListener('click', function clickMe(){
                console.log(this.innerText);


                if(bombs.includes(parseInt(myBox.innerText))){
                    myBox.classList.add('bomb');
                }else{
                    myBox.classList.add('onclick');
                }
                
                myBox.style.color = 'black';
                myBox.style.fontWeight = 'bold';
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

    })  

};



