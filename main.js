// Variables:
let score = 0
let bestScore = localStorage.getItem('BScore');
let main = document.getElementById("Main");
let StartButton = document.getElementById("playButton");
let StopButton = document.getElementById("Exit");
let Up = document.getElementById("RotateButton");
let Bottom = document.getElementById("DButton");
let Left = document.getElementById("LButton");
let Right = document.getElementById("RButton");
let scoreT = document.getElementById("score");
let BscoreT = document.getElementById("BScore");
let LS = document.getElementById("LS")
let WS = document.getElementById("WS")

BscoreT.innerHTML = "Best Score:" + bestScore 

let Row = 20;
let Col = 11;
const audio = new Audio('scorePlus.mp3');
const BGaudio = new Audio('background.mp3')
let LSound = new Audio('lose.mp3')
let WSound = new Audio('newBest.mp3')

// Game Map:
for (let i = 1; i < Col * Row + 1 ; ++i){
    let p = document.createElement('div');
    p.id = 'div'+i;
    p.style.background = 'rgba(16, 8, 136, 0.712)';
    p.style.border = 'black 0.4vh solid'
    main.appendChild(p)
}

//Shapes:
const block = [6,7,6+Col,7+Col]
const Arrow = [ 0,6,0,0,
                0,6+Col,0,0,
                0,6+Col*2,0,0,
                0,6+Col*3,0,0]

const Z = [
    0,7,0,
    6+Col,7+Col,0,
    6+Col*2,0,0
]
const S = [
    6,0,0,
    6+Col,7+Col,0,
    0,7+Col*2,0
]
const L = [0,6,0,
            0,6+Col,0,
            0,6+Col*2,7+Col*2]

const RL = [0,6,0,
            0,6+Col,0,
            5+Col*2,6+Col*2,0]

const Tr = [0,6,0
    ,5+Col,6+Col,7+Col
    ,0,0,0
]

// Id
let id =  [...Tr]
const Shapes = [Tr,block,Arrow,Z,S,L,RL];
// Game Functions:
    function RColor(Id){
        let a = document.getElementById('div'+Id)
        if(a){
                a.style.background = 'red';
        }
    }
    function BColor(Id){
        let a = document.getElementById('div'+Id)
        if(a){
            a.style.background = 'rgba(16, 8, 136, 0.712)';


        }
    }


    function ToDown(){
        for (let Id = id.length - 1; Id >= 0 ; --Id){
                if (id[Id] == 0)
                    continue
                if (!(id[Id] <= Row * (Col-1) + 9 && (document.getElementById('div'+(id[Id] + Col)).style.background == 'rgba(16, 8, 136, 0.714)' || id.includes(id[Id] + Col) ) )) {
        
                    return false
        
                }
        }
        for (let Id = id.length - 1; Id >= 0 ; --Id){
            if (id[Id] == 0)
                continue
            BColor(id[Id]);
            id[Id]+=Col;
            RColor(id[Id]);
    
        }
        new Audio('move1.mp3').play()
        return true

    }

    function ToRight(){
        
        for (let Id in id){
            if (id[Id] == 0)
                continue
                if (id[Id]%Col == 0 || !(document.getElementById('div'+(id[Id] + 1)).style.background == 'rgba(16, 8, 136, 0.714)' || id.includes(id[Id] + 1) ) ){
                return false
            }
        }
        let A = []
        for (let Id in id){
            if (id[Id] == 0)
                continue
            if (!A.includes(id[Id])){
                BColor(id[Id]);
            }
            
            id[Id]+=1;
            A.push(id[Id]);
            RColor(id[Id]); 

        }
        new Audio('move1.mp3').play()
        return true
    }

    function ToLeft(){
        for (let Id in id){
            if (id[Id] == 0)
                continue
            if (id[Id]%Col == 1 || !(document.getElementById('div'+(id[Id] - 1)).style.background == 'rgba(16, 8, 136, 0.714)' || id.includes(id[Id] - 1))){
                return false
            }
        }
        let A = []

        for (let Id in id){
            if (id[Id] == 0)
                continue
            if (!A.includes(id[Id])){
                BColor(id[Id]);
            }

            id[Id]-=1;
            A.push(id[Id]);
            RColor(id[Id]); 

        }
        new Audio('move1.mp3').play()
        return true
    }
    function rotate(){

        if (! id.includes(0)) {
            return
        }

        let RowSize = Math.sqrt(id.length);
        let MR = false
        let ML = false
        // Verifying conditions
        for (let Id in id){
            if (id[Id] != 0){
        
                    if (!(id[Id] <= Row * (Col-1) + 9 && (document.getElementById('div'+(id[Id] + Col)).style.background == 'rgba(16, 8, 136, 0.714)' || id.includes(id[Id] + Col) ) )) {

                        return
            
                    }
                    if ((id[Id]%Col == 0) || !(document.getElementById('div'+(id[Id] + 1)).style.background == 'rgba(16, 8, 136, 0.714)' || id.includes(id[Id] + 1) )){
                        ML = true
                        if (RowSize == 4)
                            ToLeft()
                        ToLeft()
                    }
                    if ((id[Id]%Col == 1) || !(document.getElementById('div'+(id[Id] - 1)).style.background == 'rgba(16, 8, 136, 0.714)' || id.includes(id[Id] - 1))){
                        MR = true
                        ToRight()
                    }
        
        
            }
            
        }

        if (ML && MR)
            return
        else if (ML){
            if (RowSize == 4)
                ToLeft()
            ToLeft()
        }
        else if (MR){
            ToRight()
        }
            

        // deleteing Old posistion
        for (let Id in id){
            BColor(id[Id])
        }
        
        // making new posistion
        let Start
        for (let i in id){
            if (id[i] != 0) {
                if (i >= RowSize){
                    Start = id[i] - i%RowSize - Col
                }
                else {
                    Start = id[i] - i
                }
                
                break;
            }
        }

        let l = 0
        let r = RowSize;

        while (r-1 > l){
            
            for (let i = 0; i < r-1-l;++i){
                let top = l;
                let bottom = r-1;

                // saving the top left in temp variable
                let TopLeft = id[top*RowSize+l+i] //1*3+1

                // Moving Values
                id[top*RowSize+l+i] = id[(bottom-i)*RowSize+l]
                id[(bottom-i)*RowSize+l] = id[bottom*RowSize+r-1-i]
                id[bottom*RowSize+r-1-i] = id[(top+i)*RowSize+r-1]
                id[(top+i)*RowSize+r-1] = TopLeft
                
                
            }
            //Moving Inside
        
            --r
            ++l
        }
            

        for(let i = 0; i < RowSize*RowSize ;++i){
            
            if (id[i] != 0){
                id[i] = Start
                RColor(id[i])
            }
            if ((i+1) % RowSize == 0)
            {  
                Start += Col - RowSize + 1
            }
            else
                {++Start}

        }    
        new Audio('move1.mp3').play()        

    }

    StartButton.onclick = function(){
        score = 0
        scoreT.innerHTML = 'Score: 0'
        for (let i = 1; i < Col * Row + 1 ; ++i){
            document.getElementById('div'+i).style.background = 'rgba(16, 8, 136, 0.712)';
        }
        let a = Math.floor(Math.random() * 10) % Shapes.length
        id = [...Shapes[a]];

        BGaudio.play()
        BGaudio.loop = true
        LS.style.display = 'none'
        WS.style.display = 'none'
        StartButton.style.display = 'none'
        StopButton.style.display = 'block'
        Down = setInterval(function(){
        if (!ToDown()){
            score += 10;

            for (let i = 1 ; i <= Col*3 ; ++i){
                if (document.getElementById('div'+i).style.background == 'red'){
                    lose();
                    break;
                }
            }

            for (let i = 3; i <= Row; ++i){
                    let clear = true;
                    for (let j = 1; j <= Col; ++j){
                        if (document.getElementById('div'+(Col * (i - 1) + j)).style.background != 'red') {
                            clear = false;
                            break;
                        }
                    }
                    if (clear) {
                        score += 100
                        for (let j = 1; j <= Col; ++j){
                            BColor(Col * (i - 1) + j);
                        }
                        for (let k = i; k > 0; --k){
                            for (let j = 1; j <= Col; ++j){
                                if (document.getElementById('div'+(Col * (k - 1) + j)).style.background == 'red'){
                                    BColor(Col * (k - 1) + j);
                                    RColor(Col * k + j);
                                    audio.play()
                                }
                                
    
                            }
                        }
                    }

                }
                let a = Math.floor(Math.random() * 10) % (Shapes.length+1)
                id = [...Shapes[a]];
            scoreT.innerHTML = "Score:" + score
        }
        
     }
    
        
        ,1000)
        
    Up.onclick = rotate
    Bottom.onclick = ToDown
    Left.onclick = ToLeft
    Right.onclick = ToRight
    document.onkeydown = function(key){
        if  (key.key == "ArrowRight" || key.key.toLowerCase() == "d"){
            
            
            ToRight();
        }
        else if  (key.key == "ArrowLeft" || key.key.toLowerCase() == "a"){
            ToLeft();
        }
        else if (key.key == "ArrowDown" || key.key.toLowerCase() == "s"){
            ToDown();
        }
        else if (key.key == "ArrowUp" || key.key.toLowerCase() == "w"){
            rotate();
        }
    }
    }

    function lose(){
        BGaudio.pause()
        StartButton.style.display = 'block'
        StopButton.style.display = 'none'
        clearInterval(Down)
        if (score > bestScore){
            localStorage.setItem("BScore",score)
            BscoreT.innerHTML = "Best Score:" + score
            WS.style.display = 'block'
            WSound.play()
        }
        else {
            LS.style.display = 'block'
            LSound.play()
        }
        Up.onclick = function(){}
        Bottom.onclick = function(){}
        Left.onclick = function(){}
        Right.onclick = function(){}
        document.onkeydown  = function(){}
    }

    StopButton.onclick = lose
