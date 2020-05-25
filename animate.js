function runOnStartUp()
{
    for (let i = 0; i < gameMap.length; i++)
    {
        for (let j = 0; j < gameMap[0].length; j++)
        {
            if (gameMap[i][j] === 0)
            {
                gameMap[i][j] = randomInteger(0, 6);
            }
            if (gameMap[i][j] === 7)
            {
                gameMap[i][j] = randomInteger(7, 12);
            }
        }
    }
}

runOnStartUp();



function randomInteger(min, max)
{
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function rndfaces()
{
    for (let i = 0; i < gameMap.length; i++)
    {
        for (let j = 0; j < gameMap[0].length; j++)
        {
            if (gameMap[i][j] > 17 && gameMap[i][j] <= 25)
            {
                gameMap[i][j] = randomInteger(18, 25);
            }
        }
    }
}
setInterval(rndfaces, 3000);
function rndflame()
{
    for (let i = 0; i < gameMap.length; i++)
    {
        for (let j = 0; j < gameMap[0].length; j++)
        {
            if (gameMap[i][j] > 25 && gameMap[i][j] <= 33)
            {
                gameMap[i][j] = randomInteger(26, 33);
            }
        }
    }

    update();
}
setInterval(rndflame, 500);
let teleportNotWorkNow = false;
function teleport(idx)
{
    let TeleportCoord = [];
    teleportNotWorkNow = true;
    for (let i = 0; i < gameMap.length; i++)
    {
        for (let j = 0; j < gameMap[0].length; j++)
        {
            if (gameMap[i][j] == 34 && i != idx.y && j != idx.x)
            {
                TeleportCoord[TeleportCoord.length] = { x: j, y: i };
            }
        }
    }
    const telepPlace = randomInteger(0, TeleportCoord.length - 1);
    gamerPos.x = TeleportCoord[telepPlace].x * blockSize;
    gamerPos.y = TeleportCoord[telepPlace].y * blockSize;
    setTimeout(() => { teleportNotWorkNow = false }, 5000);
}
