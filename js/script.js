const bunny = document.getElementById('bunny');
const duck = document.getElementById('duck');
const bird = document.getElementById('bird');
const poop = document.getElementById('poop');
const tornado = document.getElementById('tornado');
const chancla = document.getElementById('chancla');
const noice = document.getElementById('nice');

const score = document.getElementById('score-number');
const hearts = [
    document.getElementById('ht1'),
    document.getElementById('ht2'),
    document.getElementById('ht3'),
    document.getElementById('ht4'),
    document.getElementById('ht5')
]

let h = document.getElementById('game-window').clientHeight;
let t = 0; // time played
let s = 0;
let smacked = false;
let equipped = false;

// functions
function jump() {
    bunny.classList.add('bunny-jump');
    setTimeout(() => {
        bunny.classList.remove('bunny-jump');
    }, 350);
}


function smack() {
    bunny.classList.add('bunny-smack');
    if (collisionV(bunny, poop)) {
        defence();
        s += 5;
        smacked = true;
    }
    setTimeout(() => {
        bunny.classList.remove('bunny-smack');
        smacked = false;
    }, 1000);
}

function defence() {
    poop.classList.add('defense');
    setTimeout(() => {
        poop.classList.remove('defense');
    }, 1000);
}

function dropChancla() {
    tornado.classList.add('drop-chancla-1');
    chancla.classList.add('drop-chancla-2');
}

function equipChancla() {
    bunny.classList.add('equip-chancla');
    bird.classList.add('bird');
    poop.classList.add('poop');
    equipped = true;
}

function attack() {
    noice.classList.add('noice');
    setTimeout(() => {
        noice.classList.remove('noice');
    }, 500);
}

// Horizontal collision
function collisionH(obj1, obj2) {
    // get the width and height of the two elements
    const obj1Width = obj1.clientWidth;
    // get the distance to the edges of the two elements
    const obj1Left = parseInt(window.getComputedStyle(obj1).getPropertyValue('left'));
    const obj2Left = parseInt(window.getComputedStyle(obj2).getPropertyValue('left'));
    const obj1Top = parseInt(window.getComputedStyle(obj1).getPropertyValue('top'));
    const obj2Top = parseInt(window.getComputedStyle(obj2).getPropertyValue('top'));

    if ((obj2Left <= obj1Left + obj1Width) &&
        (obj2Top <= obj1Top) &&
        (obj2Left >= obj1Left)) {
        return true;
    }
}

// Vertical collision
function collisionV(obj1, obj2) {
    // get the width and height of the two elements
    const obj2Height = obj2.clientHeight;
    const obj1Width = obj1.clientWidth;

    // get the distance to the edges of the two elements
    const obj1Left = parseInt(window.getComputedStyle(obj1).getPropertyValue('left'));
    const obj2Left = parseInt(window.getComputedStyle(obj2).getPropertyValue('left'));
    const obj1Top = parseInt(window.getComputedStyle(obj1).getPropertyValue('top'));
    const obj2Top = parseInt(window.getComputedStyle(obj2).getPropertyValue('top'));

    if ((obj2Top + obj2Height >= obj1Top) &&
        (obj2Left <= obj1Left + 0.5 * obj1Width)) {
        return true;
    }
}

document.addEventListener('keypress', e => {
    if (e.code === 'Space' && !bunny.classList.contains('bunny-jump')) {
        jump();
    }
})

document.addEventListener('keydown', e => {
    if (!equipped) { /* do nothing */ }
    else if (e.code === 'KeyR' && !bunny.classList.contains('bunny-smack')) {
        smack();
    }
});

// game loop
setInterval(() => {
    t++;
    if (t > 100) { dropChancla(); }
    if (t > 199) { equipChancla(); }

    const duckLeft = parseInt(window.getComputedStyle(duck).getPropertyValue('left'));
    const bunnyTop = parseInt(window.getComputedStyle(bunny).getPropertyValue('top'));

    /* check if collision happens */
    if(collisionH(bunny, duck) && !smacked) {
        alert("Game over!\nYour score is: " + s + ".\nTime  Elapsed: " + t + "s.");
        location.reload();
    }

    if (collisionH(poop, duck)) {
        attack();
        s += 500;
    }

    // if (collisionV(bunny, poop)) {
         // TODO: lose one heart
         // TODO: if no hearts left, game over
    // }

    s++;
    score.innerText = s.toString();
}, 50);