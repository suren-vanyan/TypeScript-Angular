var mycolors = ["orange", "black", "white", "green", "blue", "yellow"];
var colorsCount = 2;
var sectorsCount = 2;

function plotData(coloringsItem, iterationIndex) {

    var myTotal = 360;
    var sAngle = 0;
    var angle = 360 / coloringsItem.length;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var canvasWidth = canvas.width / 6;
    var canvasHeight = canvas.height / 6;

    for (var i = 0; i < coloringsItem.length; i++) {

        var flooredNumber = Math.floor(iterationIndex / 8);
        var xCoord = canvasWidth + (iterationIndex * 100) - (flooredNumber * 800);
        var yCoord = canvasHeight + flooredNumber * 100;

        ctx.fillStyle = mycolors[coloringsItem[i]];
        ctx.beginPath();
        ctx.moveTo(xCoord, yCoord);

        var eAngle = sAngle + (Math.PI * 2 * (angle / myTotal));
        ctx.arc(xCoord, yCoord, 45, sAngle, eAngle, false);
        sAngle += Math.PI * 2 * (angle / myTotal);

        ctx.lineTo(xCoord, yCoord);
        ctx.lineWidth = 5;
        ctx.fill();

    }
}


function paint() {

    var colorings = generateAllColorings(this.sectorsCount, this.colorsCount);

    /* (n)*(n-1)*(n-2) */
    for (var i = 0; i < colorings.length - 1; i++) {
        for (var j = i + 1; j < colorings.length; j++) {
            if (checkColorings(colorings[i], colorings[j])) {
                colorings.splice(colorings.indexOf(colorings[j]), 1);
                j--;
            }
        }
    }

    for (var i = 0; i < colorings.length; i++) {
        plotData(colorings[i], i);
    }

}

function checkColorings(firstEl, secondEl) {
    for (var i = 0; i < firstEl.length; i++) {
        let itemIsRepeated = true;
        let k = i;
        for (var j = 0; j < secondEl.length; j++) {
            if (k == secondEl.length)
                k = 0;
            if (firstEl[k] != secondEl[j]) {
                itemIsRepeated = false;
                break;
            }
            k++;
        }
        if (itemIsRepeated == true)
            return true;
    }
    return false;
}



function generateAllColorings(sectorsCount, colorsCount) {

    let array = new Array();
    array.push(new Array());
    for (var i = 1; i <= sectorsCount; i++) {
        var tempArray = Recursive(i, colorsCount, array)
        array=tempArray.slice();
    }
    return array;

}

function Recursive(sectorsCount, colorsCount, array) {

    let result = [];

    for (var i = 0; i < sectorsCount; i++) {
        for (var j = 0; j < colorsCount; ++j) {
            let tempResult = array[i].slice();
            tempResult.push(j);
            result.push(tempResult);
        }
    }

    return result;
}