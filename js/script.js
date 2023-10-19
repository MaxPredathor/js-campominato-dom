
myCode();

function myCode(){
    
    const btn = document.querySelector('button');
    const playground = document.getElementById('playground');
    const selector = document.querySelector('select');

    selector.addEventListener('change', function(){

        let numeroBoxes = selector.value;

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
            myBox.addEventListener('click', function(){
                console.log(this.innerText);
                myBox.classList.add('onclick');
                myBox.style.color = 'black';
                myBox.style.fontWeight = 'bold';

            });
            return myBox;
    
        }
        
        function(){
            
        }
        

    })  

};



