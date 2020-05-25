let GhostImg = new Image();
GhostImg.src = "img/ghost.png"

const mapWithArrows = [];

const GhostSize = blockSize / 1.5;

const GhostPos = {
    x: 4 * blockSize, // 240 units
    y: 4 * blockSize  // 120 units
};
function getDistToGamer()
{
    for (let i = 0; i < gameMap.length; i++)
    {
        mapWithArrows[i] = [];
        for (let j = 0; j < gameMap[0].length; j++)
        {
            mapWithArrows[i][j] = null;
        }
    }
    const queuedOperations = [СurrentGamerToGhostCoord];
    let i;
    while ((i = queuedOperations.shift()) !== undefined)
    {
        if (mapWithArrows[i.y + 1][i.x] === null && !solidBlocks.includes(gameMap[i.y + 1][i.x]))
        {
            mapWithArrows[i.y + 1][i.x] = "MoveUpGhost();";
            queuedOperations.push({ x: i.x, y: i.y + 1 });
        }
        if (mapWithArrows[i.y][i.x - 1] === null && !solidBlocks.includes(gameMap[i.y][i.x - 1]))
        {
            mapWithArrows[i.y][i.x - 1] = "MoveRightGhost();";
            queuedOperations.push({ x: i.x - 1, y: i.y });
        }
        if (mapWithArrows[i.y - 1][i.x] === null && !solidBlocks.includes(gameMap[i.y - 1][i.x]))
        {
            mapWithArrows[i.y - 1][i.x] = "MoveDownGhost();";
            queuedOperations.push({ x: i.x, y: i.y - 1 });
        }
        if (mapWithArrows[i.y][i.x + 1] === null && !solidBlocks.includes(gameMap[i.y][i.x + 1]))
        {
            mapWithArrows[i.y][i.x + 1] = "MoveLeftGhost();";
            queuedOperations.push({ x: i.x + 1, y: i.y });
        }
    }
}
let СurrentGamerToGhostCoord = getMapIndex({ x: GhostPos.x - 1, y: GhostPos.y - 1 });
let CurrentGhostCoord = getMapIndex({ x: GhostPos.x - 1, y: GhostPos.y - 1 });
function renderGhost()
{
    if (СurrentGamerToGhostCoord.x == CurrentGhostCoord.x && СurrentGamerToGhostCoord.y == CurrentGhostCoord.y)
    {
        СurrentGamerToGhostCoord = getMapIndex({ x: gamerPos.x + blockSize, y: gamerPos.y + blockSize });
        getDistToGamer();
    }

    ctx.drawImage(GhostImg, GhostPos.x - gamerPos.x, GhostPos.y - gamerPos.y, GhostSize, GhostSize);
    setTimeout(() => { update(); renderGhost(); }, 30);
}
function MoveLeftGhost()
{
    GhostPos.x--;
}
function MoveUpGhost()
{
    GhostPos.y--;
}
function MoveRightGhost()
{
    GhostPos.x++;
}
function MoveDownGhost()
{
    GhostPos.y++;
}
