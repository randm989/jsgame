
var WIDTH = 400;
var HEIGHT = 300;
var mystage = new PIXI.Stage(0xEEFFFF, true);

// let pixi choose WebGL or canvas
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

// attach render to page
document.body.appendChild(renderer.view);

var texture = PIXI.Texture.fromImage('img/smiley.png');
var player = new PIXI.Sprite(texture);

function Point(x,y) {
    this.x = x;
    this.y = y;
}

Point.prototype.vectorTo = function(end)
{
    return new Point(end.x - this.x, end.y - this.y);
};

Point.prototype.lengthSq = function()
{
    return this.x * this.x + this.y * this.y;
};

// rotate around center
player.anchor.x = 0.5;
player.anchor.y = 0.5;

player.goal = new Point(WIDTH/2, HEIGHT/2);


// center in stage
player.position.x = WIDTH / 2;
player.position.y = HEIGHT / 2;

// place it on the stage for rendering
mystage.addChild(player);

kd.LEFT.down(
    function()
    {
        player.rotation += .02;
    }
);

kd.RIGHT.down(
    function()
    {
        player.rotation -= .02;
    }
);

mystage.mousedown = function(e)
{
    player.goal.x = e.global.x;
    player.goal.y = e.global.y;
};

function gameLoop() {
    requestAnimFrame(gameLoop);
    renderer.render(mystage);

    var goalVec = new Point(player.position.x, player.position.y).vectorTo(player.goal);
    var goalDist = Math.sqrt(goalVec.lengthSq());
    if ( goalDist > 0 )
    {
        player.position.x += goalVec.x / goalDist;
        player.position.y += goalVec.y / goalDist;
    }
    kd.tick();
}

requestAnimFrame(gameLoop);