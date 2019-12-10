var mycolors = ["#ff0080", "black", "#ffff00", "#0000ff", "#ff00bf", "rgb(255, 0, 71)", "rgb(255, 165, 0)", "rgb(255, 255, 0)"];
let colorsCount;
let sectorsCount;

//ֆունկցիան ստեղծում է շրջանագծեր,որոնք մեկը մյուսի պտույտից չեն ստացվում
function generateCircles(coloringItems, iterationIndex) {
    let sAngle = 0;
    let eAngle = 0;
    let angle = 2 / coloringItems.length;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    coloringItems.forEach(coloringEl => {

        var flooredNumber = Math.floor(iterationIndex / 8);
        var xCoord = 150 + (iterationIndex * 100) - (flooredNumber * 800);
        var yCoord = 50 + flooredNumber * 100;

        ctx.fillStyle = mycolors[coloringEl];
        ctx.beginPath();
        ctx.moveTo(xCoord, yCoord);

        eAngle = sAngle + angle;

        ctx.arc(xCoord, yCoord, 46, sAngle * Math.PI, eAngle * Math.PI, false);

        sAngle = eAngle

        ctx.lineTo(xCoord, yCoord);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "GreenYellow";
        ctx.stroke();
        ctx.fill();

    })
}


function paint(sectorsCount, colorsCount) {
    this.colorsCount = Number.parseInt(document.getElementById("input2").value); 
    this.sectorsCount=Number.parseInt(document.getElementById("input1").value); 


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
        generateCircles(colorings[i], i);
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
    for (var i = 0; i < sectorsCount; i++) {
        var tempArray = Recursive(i, colorsCount, array)
        array = tempArray.slice();
    }
    return array;

}

function Recursive(sectorsCount, colorsCount, array) {

    let result = [];

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < colorsCount; ++j) {
            let tempResult = array[i].slice();
            tempResult.push(j);
            result.push(tempResult);
        }
    }

    return result;
}