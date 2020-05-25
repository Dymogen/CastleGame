// Size of the map block is 30x30 units
const blockSize = 30;
const gamerStep = 1;
const gamerWidth = 11;
const gamerHeight = 13;
const screenWidthInBlocks = 10;//10
const screenHeightInBlocks = 7;//7

const dialogFontSize = blockSize / 7;

const screenWidthInUnits = screenWidthInBlocks * blockSize;
const screenHeightInUnits = screenHeightInBlocks * blockSize;

const mapWidthInUnits = gameMap[0].length * blockSize;
const mapHeightInUnits = gameMap.length * blockSize;

let drawScale = 1;

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


function adjustCanvas()
{
    const widthScale = window.innerWidth / screenWidthInUnits;
    const heightScale = window.innerHeight / screenHeightInUnits;

    if (widthScale > heightScale)
    {
        drawScale = heightScale;
        canvas.style.marginLeft = (window.innerWidth - screenWidthInUnits * drawScale) / 2 + "px";
        canvas.style.marginTop = 0;
    } else
    {
        drawScale = widthScale;
        canvas.style.marginLeft = 0;
        canvas.style.marginTop = (window.innerHeight - screenHeightInUnits * drawScale) / 2 + "px";
    }

    canvas.width = screenWidthInUnits * drawScale;
    canvas.height = screenHeightInUnits * drawScale;

    ctx.setTransform(drawScale, 0, 0, drawScale, 0, 0);
}

function getIndex(point)
{
    return {
        x: Math.floor(point.x / blockSize),
        y: Math.floor(point.y / blockSize)
    };
}

function getShift(point)
{
    return {
        x: point.x % blockSize,
        y: point.y % blockSize
    };
}

function getMapIndex(point)
{
    return {
        x: Math.floor((point.x + gamerWidth / 2) / blockSize),
        y: Math.floor((point.y + gamerHeight) / blockSize)
    };
}

function getMapBlock(point)
{
    const idx = getMapIndex(point);
    return gameMap[idx.y][idx.x];
}

function setMapBlock(point, block)
{
    const idx = getMapIndex(point);
    gameMap[idx.y][idx.x] = block;
}