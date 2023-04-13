import {Player, Transport} from "https://cdn.skypack.dev/tone";
import {generateNotesFromNoteMap} from "./rythm.js";
import {drawBeatMap} from "./draw.js";
import {displayCombo, displayScore} from "./score.js";
import {noteMaps as noteMap} from "./noteMaps.js";
import {audioSources} from "./audioSources.js";

const canvas = document.getElementById("game-canvas");
const startButton = document.querySelector("button");
const taikoCv = canvas.getContext("2d");

const urlParams = new URLSearchParams(window.location.search)
const songId = urlParams.get('songId')

const songName = decodeURIComponent(urlParams.get('songName'))
document.getElementById('song-name').textContent = songName

const updateCanvasWidth = () => {
    canvas.width = window.innerWidth * 0.75;
    const test = canvas.width; // Declare the 'test' variable here
    console.log(test);

    // Add any additional logic for updating canvas content or rendering here
    return test;
};

const updateCanvasHeight = () => {
    canvas.height = window.innerHeight / 3.32;
    const test2 = canvas.height;
    console.log(test2);

    return test2;
}

// Initial call to set canvas width on page load
const BEAT_MAP_WIDTH = updateCanvasWidth();
const BEAT_MAP_HEIGHT = updateCanvasHeight();

window.addEventListener('resize', () => {
    const BEAT_MAP_WIDTH = updateCanvasWidth();
    const BEAT_MAP_HEIGHT = updateCanvasHeight();
    // Use the 'BEAT_MAP_WIDTH' variable here to adjust the canvas content or rendering as needed
});

const hitZoneX = 100;
const hitZoneY = BEAT_MAP_HEIGHT / 2;
const hitZoneRadius = 50;

let blue1 = new Image();
blue1.src = "assets/drums/blue1.svg";

let orange1 = new Image();
orange1.src = "assets/drums/orange1.svg";


const audioUrl = audioSources[songId]

const hitSoundJ = new Audio('assets/sounds/drum.mp3')
const hitSoundK = new Audio('assets/sounds/bluedrum.mp3')
let hitZoneColor = "rgba(255, 0, 0, 0.5)";

// Create a new Tone.Player object with the mp3 file path
const player = new Player(audioUrl).toDestination();

let score = 0;
let notes = [];

const bpm = 152;
Transport.bpm.value = bpm;
const pixelsPerBeat = 4250;
const noteSpeed = (Transport.bpm.value / 60) * (pixelsPerBeat / 1000)

const currentNoteMap = noteMap[songId]
startButton.addEventListener("click", async function () {
    console.log("im getting clicked");
    canvas.setAttribute("tabindex", "0");
    canvas.focus();
    generateNotesFromNoteMap(currentNoteMap, BEAT_MAP_WIDTH, BEAT_MAP_HEIGHT, notes);
    await player.load(audioUrl);
    player.start();
    Transport.start();
});

let combo = 0;


canvas.addEventListener("keydown", function (event) {

    if (event.key === "j" || event.key === "k") {
        let noteHit = false;
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];


            if (note.hit) continue;

            const hitZone = hitZoneX;
            const hitThreshold = 50;
            const bonusThreshold = 10;

            const distanceToHitZone = Math.abs(note.x - hitZone);

            if (distanceToHitZone <= hitThreshold) {
                if (event.key === note.key) {
                    if (distanceToHitZone <= bonusThreshold) {
                        score += 2; // 2 points for griffondor if you're good
                    } else {
                        score++; // 1 point if you suck
                    }
                    note.hit = true;
                    console.log(`Key ${event.key} has been pressed. Score: ${score}`);
                    displayScore(score)
                    // yoink the note away
                    notes.splice(i, 1);
                    i--;
                    noteHit = true;
                }
            }
        }

        if (noteHit) {
            combo++;
            console.log(`Current combo is ${combo}`)
            displayCombo(combo)
        } else {
            combo = 0;
            console.log(`Combo is 0`)
            displayCombo(combo)

        }
    }

    hitZoneColor = 'rgba(200,0,0,0.5)'

    // sound effects go here
    if (event.key === "j") {
        //cool trick to make it not play TWICE TWICE - gandalf
        hitSoundJ.cloneNode(true).play();
    } else if (event.key === "k") {
        hitSoundK.cloneNode(true).play();
    }

    // onclicky dark rood hitzone kleur
    taikoCv.fillStyle = hitZoneColor;
    taikoCv.beginPath();
    taikoCv.arc(hitZoneX, hitZoneY, hitZoneRadius, 0, 2 * Math.PI);
    taikoCv.fill();
});

setInterval(() => {
    drawBeatMap(taikoCv, BEAT_MAP_WIDTH, BEAT_MAP_HEIGHT, hitZoneX, hitZoneY, hitZoneRadius, notes, noteSpeed, blue1, orange1, hitZoneColor);
}, 60);