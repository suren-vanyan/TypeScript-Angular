var myColor = ["orange", "black", "white", "green", "blue", "yellow"];
var colorsCount=2;
var sectorsCount=2;

function plotData(coloringsItem,iterationIndex) {

    var myTotal = 360;
    var lastend=0;
    var angle=360/coloringsItem.length;

   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext("2d");
   
    for (var i = 0; i < coloringsItem.length; i++) {
        
        ctx.beginPath();

       var xCoord=((iterationIndex * 100)-(iterationIndex / 8 * 100)) * 8;
       var yCoord=iterationIndex / 8 * 100;
        ctx.arc(xCoord, yCoord,45, lastend, lastend +
            (Math.PI * 2 * (angle / myTotal)), false);
        lastend += Math.PI * 2 * (angle / myTotal);
        ctx.lineWidth = 5;
        ctx.strokeStyle = coloringsItem[i];
        ctx.stroke();
      
       
    }
}




function paint() {

    var colorings = generateAllColorings(this.sectorsCount, this.colorsCount);

    for (var i = 0; i < colorings.length - 1; i++) {
        for (var j = i + 1; j < colorings.length; j++) {
            if (checkColorings(colorings[i], colorings[j])) {
                colorings.splice(colorings.indexOf(colorings[j]),1);
                j--;
            }
        }
    }

    for (var i = 0; i < colorings.length; i++) {
        plotData(colorings[i],i);
    }

}

 function checkColorings(firstEl, secondEl) 
{
    for (var i = 0; i < firstEl.length; i++) {
       let okay = true;
       let k = i;
        for (var j = 0; j < secondEl.length; j++) {
            if (k == secondEl.length)
                k = 0;
            if (firstEl[k] != secondEl[j]) {
                okay = false;
                break;
            }
            k++;
        }
        if (okay == true)
            return true;
    }
    return false;
}



function generateAllColorings(sectorsCount, colorsCount) 
{
    var result=new Array(
        [0,0],
        [0,1],
        [1,0],
        [1,1]
    )
    // return result;
    // let result = new Array();
    // if (sectorsCount === 0) {
    //     result.push(new Array());
    //     return result;
    // }

    // var tempResult = generateAllColorings(sectorsCount - 1, colorsCount);
    // for (var i = 0; i < tempResult.length; i++) {

    //     for (var j = 0; j < colorsCount; ++j) {
    //         var newColoring = new Array(tempResult[i]);
    //         newColoring.push(j);
    //         result.push(newColoring);
    //     }
    // }

     return result;
}