//speed px/s
var playerSpeed = 200;
var enemySpeed = 150;


// Enemies our player must avoid
var Enemy = function() {
    this.xRange = [-150, 600];
    this.yValues = [60, 140, 220];
    this.speed = enemySpeed;

    this.sprite = 'images/enemy-bug.png'

    this.reset();
        
    
}

Enemy.prototype.reset = function() {
    var startPosition = this.xRange[0];

    this.x=startPosition;
    this.y=this.getY();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getY = function() {
    return this.yValues[Math.floor(Math.random() * this.yValues.length)];
}

var Hero = function () {
    this.xRange = [-2, 402];
    this.yRange = [-20, 380]
    this.sprite = 'images/char-boy.png'
    this.reset();
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

Hero.prototype.update = function() {
    this.checkCollisions();
}

Hero.prototype.checkCollisions = function() {
    if (this.y == -20) {
        this.reset();
    } else if (this.y >= 60 && this.y <= 220) {
        var self = this;
        allEnemies.forEach(function(enemy) {
            if (enemy.y == self.y) {
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    self.reset();
                }
            }
        });
    }
}

Hero.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
}

Hero.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Hero.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//generic enemies
var bug1 = new Enemy();
var bug2 = new Enemy();
var allEnemies = [bug1, bug2];

var player = new Hero;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
