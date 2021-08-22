const circleFullAngle = 360;
const canvas = document.querySelector('#canvas');
var numericalTime = document.querySelector("#numerical-time");
var hourArrow = document.querySelector("#hour-line-rectangle");

function drawLine(ox, oy, tx, ty, color="red"){
    if(!canvas.getContext){
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(tx, ty);
    ctx.stroke();
}

function drawClock(second, minute, hour){
    if(!canvas.getContext){
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let cx = 225, cy = 225, radius = 225;

    // Draw second arrow
    const secondArrowLength = radius * 0.75;
    let secondArrowX = cx + secondArrowLength * Math.sin(second * (2 * Math.PI / 60));
    let secondArrowY = cy - secondArrowLength * Math.cos(second * (2 * Math.PI / 60));
    drawLine(cx, cy, secondArrowX, secondArrowY, "blue");

    // Draw minute arrow
    const minuteArrowLength = radius * 0.8;
    let minuteArrowX = cx + minuteArrowLength * Math.sin(minute * (2 * Math.PI / 60));
    let minuteArrowY = cy - minuteArrowLength * Math.cos(minute * (2 * Math.PI / 60));
    drawLine(cx, cy, minuteArrowX, minuteArrowY, "green");

    // Draw hour arrow
    const hourArrowLength = radius * 0.95;
    let hourArrowX = cx + hourArrowLength * Math.sin((hour % 12 + minute / 60) * (2 * Math.PI / 12));
    let hourArrowY = cy - hourArrowLength * Math.cos((hour % 12 + minute / 60) * (2 * Math.PI / 12));
    drawLine(cx, cy, hourArrowX, hourArrowY, "red");


    // Mini second lines
    for(let i = 0; i < 60; i++){
        let msx = cx + radius * Math.cos(2 * i * Math.PI / 60);
        let msy = cy + radius * Math.sin(2 * i * Math.PI / 60);
        let esx = msx - (radius / 30) * Math.cos(2 * i * Math.PI / 60);
        let esy = msy - (radius / 30) * Math.sin(2 * i * Math.PI / 60);
        drawLine(msx, msy, esx, esy, "black");
    }

    // Number text
    for(let i = 0, j = 3; i < 12; i++, j++){
        let mhx = cx + (radius ) * Math.cos(2 * i * Math.PI / 12);
        let mhy = cy + (radius ) * Math.sin(2 * i * Math.PI / 12);
        let ehx = mhx - (radius / 12) * Math.cos(2 * i * Math.PI / 12);
        let ehy = mhy - (radius / 12) * Math.sin(2 * i * Math.PI / 12);
        drawLine(mhx, mhy, ehx, ehy, "black");
        if(j == 13) j == 1;
        let textX = cx + (radius * 0.75) * Math.cos(2 * i * Math.PI / 12)
        let textY = cy + (radius * 0.75) * Math.sin(2 * i * Math.PI / 12)
        ctx.textAlign = "center";
        ctx.font = "21px Arial";
        ctx.fillText(j, textX, textY);
    }    
}


setInterval(() => {
    let currentTime = new Date();
    numericalTime.innerHTML = currentTime.toTimeString();
    drawClock(currentTime.getSeconds(), currentTime.getMinutes(), currentTime.getHours());
}, 1000);
