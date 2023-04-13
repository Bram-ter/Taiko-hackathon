export function drawBeatMap(taikoCv, BEAT_MAP_WIDTH, BEAT_MAP_HEIGHT, hitZoneX, hitZoneY, hitZoneRadius, notes, noteSpeed,blue1,orange1, hitZoneColor)
{
    console.log(BEAT_MAP_WIDTH, BEAT_MAP_HEIGHT)
    taikoCv.clearRect(0, 0, BEAT_MAP_WIDTH, BEAT_MAP_HEIGHT);
    taikoCv.fillStyle = "black";
    taikoCv.fillRect(0, 0, BEAT_MAP_WIDTH, BEAT_MAP_HEIGHT);
    taikoCv.fillStyle = "white";
    taikoCv.fillRect(0, BEAT_MAP_HEIGHT / 2, BEAT_MAP_WIDTH, 1);

    taikoCv.fillStyle = hitZoneColor;
    taikoCv.beginPath();
    taikoCv.arc(hitZoneX, hitZoneY, hitZoneRadius, 0, 2 * Math.PI);
    taikoCv.fill();

    // inner cicrle drawing
    const bonusCircleRadius = hitZoneRadius * 0.6;
    taikoCv.fillStyle = "rgba(255, 255, 255, 0.5)";
    taikoCv.beginPath();
    taikoCv.arc(hitZoneX, hitZoneY, bonusCircleRadius, 0, 2 * Math.PI);
    taikoCv.fill();

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        note.x -= noteSpeed;

        if (note.type === "blue1") {
            taikoCv.drawImage(blue1, note.x, note.y, 50, 50);
        } else if (note.type === "orange1") {
            taikoCv.drawImage(orange1, note.x, note.y, 50, 50);
        }

        if (note.x < -50) {
            notes.splice(i, 1);
            i--;
        }
    }
}