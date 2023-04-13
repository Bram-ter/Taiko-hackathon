import {Transport} from 'https://cdn.skypack.dev/tone'
export function generateNotesFromNoteMap(noteMap, BEAT_MAP_WIDTH, BEAT_MAP_HEIGHT, notes) {
    noteMap.forEach((noteInfo) => {
        const time = noteInfo.time;
        const noteType = noteInfo.type;
        const noteKey = noteType === "blue1" ? "j" : "k";

        Transport.schedule((time) => {
            const note = {
                type: noteType,
                key: noteKey,
                x: BEAT_MAP_WIDTH,
                y: BEAT_MAP_HEIGHT / 2.5,
                hit: false,
            };
            notes.push(note);
        }, time);
    });
}