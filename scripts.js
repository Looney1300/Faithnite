let levels = [
    {
        name: "Non-believer",
        points: 0
    }, 
    {
        name: "Excited Convert", 
        points: 10
    }, 
    {
        name: "Powerful Missionary", 
        points: 25
    }, 
    {
        name: "Stripling Warrior", 
        points: 50
    }, 
    {
        name: "Captain in God's Army", 
        points: 100
    }, 
    {
        name: "General in God's Army", 
        points: 250
    }, 
    {
        name: "God's Elect", 
        points: 600
    }, 
    {
        name: "Savior on Mount Zion", 
        points: 1000
    }, 
    {
        name: "Gospel Minister",
        points: 1700
    }, 
    {
        name: "Perfected through Repentance",
        points: 2500
    }, 
    {
        name: "In the Presence of God",
        points: 5000
    }, 
];

let player = {
    level: 0,
    name: 'Nephi',
    points: 0
};

let levelUpSound = new Audio('assets/Gleam-sound-effect.mp3');
let addPointsSound = new Audio('assets/Coin-drop-on-coins.mp3');

function saveState(){
    localStorage.setItem('player', JSON.stringify(player));
}

function getState(){
    let savedPlayer = JSON.parse(localStorage.getItem('player'));
    if (savedPlayer){
        player = savedPlayer;
    }
}

function addPoints(btn, points){
    addPointsSound.play();
    player.points += points;
    if (player.points >= levels[player.level + 1].points){
        ++player.level;
        levelUpSound.play();
    }
    refresh();

    btn.classList.add('disabled');
    setTimeout(function(){
        btn.classList.remove('disabled');
    }, 500);
}

// The following will set the innerText value of all members of the specified class to the specified value.
function setClassTextTo(className, value){
    let curClassList = document.getElementsByClassName(className);
    for (let i=0; i<curClassList.length; ++i){
        curClassList[i].innerText = value;
    }
}

function setSkills(){
    let curClassList = document.getElementsByClassName('skill');
    for (let i=0; i<curClassList.length; ++i){
        if (curClassList[i].getElementsByClassName('levelAvailable')[0].innerText > player.level){
            curClassList[i].classList.add('overlay');
            curClassList[i].getElementsByClassName('btn')[0].classList.add('disabled');
        }
        else if (curClassList[i].getElementsByClassName('btn')[0].classList.contains('disabled') &&
                    !curClassList[i].classList.contains('overlay')) {
            continue;
        }
        else {
            curClassList[i].classList.remove('overlay');
            curClassList[i].getElementsByClassName('btn')[0].classList.remove('disabled');
        }
    }
}

function updateLevelProgress(){
    let width = 1 - (levels[player.level + 1].points - player.points)/(levels[player.level + 1].points - levels[player.level].points);
    document.getElementById('levelProgress').style.width = `${width*100}%`;
}

function refresh(){
    setClassTextTo('currentLevel', player.level);
    setClassTextTo('nextLevel', player.level + 1);
    setClassTextTo('nextLevelPoints', levels[player.level + 1].points);
    setClassTextTo('totalPoints', player.points);
    setClassTextTo('playerName', player.name);
    setClassTextTo('levelName', levels[player.level].name);
    setSkills();
    updateLevelProgress();
    
    saveState();
}

function pageStart(){
    if (!player.name || player.name == "Nephi"){
        player.name = prompt("What do you want to be called?");
    }
    refresh();
}

getState();

