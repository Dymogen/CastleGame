const gamerPos = {
  x: 0,
  y: 0
};
let gamerIndex = 0;
let gamerFlipped = false;
let openDoor = null;

window.onload = () =>
{
  window.addEventListener("keydown", move, false);
  window.addEventListener("resize", resize, false);
  adjustCanvas();
  renderGhost();
  gamerPos.x = blockSize;
  gamerPos.y = blockSize;
  update();
};

function resize()
{
  adjustCanvas();
  update();
}


function update()
{
  const idx = getIndex(gamerPos);
  const shift = getShift(gamerPos);

  // Map drawing position
  idx.x--; idx.y--;

  applyChanges(gamerPos);

  drawMap(idx, shift, false);
  renderGamer();
  drawMap(idx, shift, true);
}

function drawMap(idx, shift, front)
{
  for (let i = 0; i < screenWidthInBlocks + 2; i++)
  {
    for (let j = 0; j < screenHeightInBlocks + 2; j++)
    {
      const ix = idx.x + i;
      const jy = idx.y + j;
      const left = blockSize * i - shift.x;
      const top = blockSize * j - shift.y;

      if (ix >= 0 && ix < gameMap[0].length && jy >= 0 && jy < gameMap.length)
      {
        const data = gameImages[gameMap[jy][ix]];
        const image = front ? data.front : data.back;

        if (!image) continue;
        ctx.drawImage(image, left, top, blockSize, blockSize);
      }
      else
      {
        // Clear background
        ctx.clearRect(left, top, blockSize, blockSize);
      }
    }
  }
}


function applyChanges(point)
{
  const idx = getMapIndex(point);
  const block = gameMap[idx.y][idx.x];

  if (block == 15 && !stop)
  {
    dialogue(1);
  }
  if (block == 34 && !teleportNotWorkNow)
  {
    teleport(idx);
  }
  if (block == 13)
  {
    openDoor = { x: point.x, y: point.y };
    setMapBlock(point, 14);
  }
  else if (block != 14 && openDoor)
  {
    setMapBlock(openDoor, 13);
    openDoor = null;
  }

}


function renderGamer()
{
  if (gamerFlipped)
  {
    ctx.setTransform(-drawScale, 0, 0, drawScale, (blockSize + gamerWidth) * drawScale, 0);
    ctx.drawImage(gamer[gamerIndex], 0, blockSize, gamerWidth, gamerHeight);
    ctx.setTransform(drawScale, 0, 0, drawScale, 0, 0);
  }
  else
  {
    ctx.drawImage(gamer[gamerIndex], blockSize, blockSize, gamerWidth, gamerHeight);
  }
  ctx.drawImage(GhostImg, GhostPos.x - gamerPos.x, GhostPos.y - gamerPos.y, GhostSize, GhostSize);
}


const KEYCODE = {
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};

function move(event)
{
  const newPos = { x: gamerPos.x, y: gamerPos.y };
  const shiftPos = { x: 0, y: 0 };

  switch (event.keyCode)
  {
    case KEYCODE.LEFT_ARROW:
      newPos.x = newPos.x - gamerStep;
      if (newPos.x < 0) newPos.x = 0;
      shiftPos.x = - gamerWidth / 2;
      gamerFlipped = true;
      break;

    case KEYCODE.RIGHT_ARROW:
      newPos.x = newPos.x + gamerStep;
      if (newPos.x >= mapWidthInUnits) newPos.x = mapWidthInUnits;
      shiftPos.x = gamerWidth / 2;
      gamerFlipped = false;
      break;

    case KEYCODE.UP_ARROW:
      newPos.y = newPos.y - gamerStep;
      if (newPos.y < 0) newPos.y = 0;
      shiftPos.y = - gamerHeight;
      break;

    case KEYCODE.DOWN_ARROW:
      newPos.y = newPos.y + gamerStep;
      if (newPos.y > mapHeightInUnits) newPos.y = mapHeightInUnits;
      break;

    default:
      return;
  }

  if (!solidBlocks.includes(getMapBlock({ x: newPos.x + shiftPos.x, y: newPos.y + shiftPos.y })))
  {
    gamerPos.x = newPos.x;
    gamerPos.y = newPos.y;
    gamerIndex = gamerIndex >= 3 ? 0 : gamerIndex + 1;
    update();
  }
}
