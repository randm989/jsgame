
var WIDTH = 400;
var HEIGHT = 300;
var mystage = new PIXI.Stage(0xEEFFFF, true);

// let pixi choose WebGL or canvas
var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);

// attach render to page
document.body.appendChild(renderer.view);

var texture = PIXI.Texture.fromImage('img/smiley.png');
var player = new PIXI.Sprite(texture);

// rotate around center
player.anchor.x = 0.5;
player.anchor.y = 0.5;



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
    player.position.x = e.global.x;
    player.position.y = e.global.y;
};

function gameLoop() {
    requestAnimFrame(gameLoop);
    renderer.render(mystage);
    kd.tick();
};

requestAnimFrame(gameLoop);