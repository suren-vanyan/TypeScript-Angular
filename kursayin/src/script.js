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
        let isRepeatingItem = true;
        let k = i;
        for (var j = 0; j < secondEl.length; j++) {
            if (k == secondEl.length)
                k = 0;
            if (firstEl[k] != secondEl[j]) {
                isRepeatingItem = false;
                break;
            }
            k++;
        }
        if (isRepeatingItem == true)
            return true;
    }
    return false;
}



function generateAllColorings(sectorsCount, colorsCount) {
    // var result = new Array(
    //     [0, 0],
    //     [0, 1],
    //     [1, 0],
    //     [1, 1]
    // )
    // return result;
var cmb;
cmb = Combinatorics.power(['a','b','c']);
    let result = [];
    if (sectorsCount === 0) {
         result.push(new Array());
        return result;
    }

    var tempResult = generateAllColorings(sectorsCount - 1, colorsCount);
    for (var i = 0; i < tempResult.length; i++) {

        for (var j = 0; j < colorsCount; ++j) {
            var newColoring =[tempResult[i]];
            newColoring.push(j);
            result.push(newColoring);
        }
    }
    return result;
}