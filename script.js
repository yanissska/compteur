const startDate = new Date('2024-05-30T18:00:00');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById('time').textContent = `${days} jours, ${hours} heures`;
}

function createCanvas() {
    const canvas = document.getElementById('result-canvas');
    const ctx = canvas.getContext('2d');
    const text = document.getElementById('time').textContent;
    const message1 = `Yanis a passé :`;
    const message2 = `${text} sans son PC ! :(`;

    canvas.width = 600;
    canvas.height = 400;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 30px Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(message1, canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText(message2, canvas.width / 2, canvas.height / 2 + 20);

    document.getElementById('canvas-container').style.display = 'block';
}

function downloadCanvas() {
    const canvas = document.getElementById('result-canvas');
    const link = document.createElement('a');
    link.download = 'compteur_de_temps.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function shareCanvas() {
    const canvas = document.getElementById('result-canvas');
    canvas.toBlob(blob => {
        const file = new File([blob], 'compteur_de_temps.png', { type: 'image/png' });
        const filesArray = [file];
        const shareData = {
            files: filesArray,
        };
        navigator.share(shareData).catch(console.error);
    });
}

setInterval(updateCounter, 1000);
updateCounter();

document.getElementById('save-button').addEventListener('click', createCanvas);
document.getElementById('download-button').addEventListener('click', downloadCanvas);
document.getElementById('share-button').addEventListener('click', shareCanvas);
