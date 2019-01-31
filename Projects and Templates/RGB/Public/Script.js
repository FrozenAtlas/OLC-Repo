//@input Component.SpriteAligner aligner
//@input Component.SpriteVisual sprite

const moveRange = .013;
const alphaMin = 0.7;
const alphaMax = 2.0;
const alphaThreshold = 0.4;

function getRand(minVal, maxVal) {
    return minVal + Math.random() * (maxVal - minVal);
}

function getRandPos() {
    return new vec2(getRand(-moveRange, moveRange),
        getRand(-moveRange, moveRange));
}

script.aligner.bindingPoint = getRandPos();

var col = script.sprite.mainPass.baseColor;

col.a = getRand(alphaMin, alphaMax);
col.a *= col.a;

if(col.a < alphaThreshold){
    col.a = 0.0;
}

script.sprite.mainPass.baseColor = col;