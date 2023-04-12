export function displayScore(score) {
    let scoreElement = document.querySelector('#score');

    if (!scoreElement) {
        scoreElement = document.createElement('p');
        scoreElement.id = 'score';
        document.body.appendChild(scoreElement);
    }

    scoreElement.textContent = `Score: ${score}`;
}

export function displayCombo(combo) {
    let comboElement = document.querySelector('#combo');

    if (!comboElement) {
        comboElement = document.createElement('p');
        comboElement.id = 'combo';
        document.body.appendChild(comboElement);
    }

    comboElement.textContent = `Combo: ${combo}`;
}