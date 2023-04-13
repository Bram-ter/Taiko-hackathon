import {songNames} from "./songNames.js";

window.selectSong = function selectSong(songId){
    const songName = encodeURIComponent(songNames[songId])
    window.location.href = `game.html?songId=${songId}&songName=${songName}`
}