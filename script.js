const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteAnimations = []; //images of all the frames
let x = 0;
let gameFrame = 0;
const JumpSound = new Audio("Sounds/jump-up.mp3");
const PunchSound = new Audio("Sounds/punch.mp3");
let isPunching = false;
function generateFrameNames(prefix, count) {
    return Array.from({ length: count }, (_, i) => `${prefix}${i.toString().padStart(2, "0")}.png`);
}
const spriteStates = [
    {
        name: "idle",
        dir: "00_idle/",
        imgsrc: generateFrameNames("skeleton-00_idle_", 21),
    },
    {
        name: "runReady",
        dir: "01_run_00ready/",
        imgsrc: generateFrameNames("skeleton-01_run_00ready_", 11),
    },
    {
        name: "StartRun",
        dir: "01_run_01start/",
        imgsrc: generateFrameNames("skeleton-01_run_01start_", 25),
    },
    {
        name: "FinishRun",
        dir: "01_run_02finish/",
        imgsrc: generateFrameNames("skeleton-01_run_02finish_", 11),
    },
    {
        name: "JumpReady",
        dir: "02_jump_00ready/",
        imgsrc: generateFrameNames("skeleton-02_jump_00ready_", 11),
    },
    {
        name: "JumpStart",
        dir: "02_jump_01start/",
        imgsrc: generateFrameNames("skeleton-02_jump_01start_", 11),
    },
    {
        name: "JumpFinish",
        dir: "02_jump_02finish/",
        imgsrc: generateFrameNames("skeleton-02_jump_02finish_", 11),
    },
    {
        name: "ko",
        dir: "03_ko/",
        imgsrc: generateFrameNames("skeleton-03_ko_", 41),
    },
    {
        name: "Punch",
        dir: "04_punch/",
        imgsrc: generateFrameNames("skeleton-04_punch_", 10),
    }
];


spriteStates.forEach((state)=>{
    let sa = [];
    for(let i = 0; i < state.imgsrc.length; ++i){
        let img = new Image();
        img.src = "curly_boy/" + state.dir + state.imgsrc[i];
       sa.push(img);
    }
    spriteAnimations[state.name] = sa;
});

let playerState = "idle";
window.addEventListener("keyup",(event)=>{

    if(event.key != 'p'){
        isPunching = false;
    }
     switch(event.key){
        case "d":
            playerState = "StartRun";
            x = 0;
            break;
        case "w":
            playerState = "JumpStart";
            JumpSound.play();
            x = 0;
            break;
        case "p":
            playerState = "Punch";
            isPunching = true;
            x = 0;
            break;
        case "k":
            playerState = "ko";
            x = 0;
            break;
        default:
            playerState = "idle";
            x = 0;
     }
});

function animate(){
    
    let boyImage = spriteAnimations[playerState][x];
    let n = spriteAnimations[playerState].length;
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(boyImage,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    if(isPunching)
        PunchSound.play();
    if(gameFrame%6 == 0)
        x = (x+1)%n;
    gameFrame = (gameFrame+1)%205;
    requestAnimationFrame(animate);
}

animate();
