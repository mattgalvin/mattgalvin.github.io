/**
 * Player object
 */

function Player(initX, initY) {
	this.x = initX;
	this.y = initY;
	this.bullets = [];
	this.needReload = false;
	this.score = 0;
	this.sprite = Sprite("resources/images/pineapple_player.png");
	this.width = 50;
	this.height = 49;
	this.playerDead = false;
}

Player.prototype.explode = function() {
	this.playerDead = true;
};

Player.prototype.draw = function(drawContext) {
	this.sprite.draw(drawContext, this.x, this.y);
};

Player.prototype.shoot = function() {
	if (!this.needReload) {
		this.bullets.push(new Bullet(5, this.x + 5, this.y + 5, this.bulletMovement));
		
		this.needReload = true;
		setTimeout(function(pl) {
			pl.needReload = false;
		}, 250, this);
	}
};

Player.prototype.bulletMovement = function(bullet) {
	bullet.x += bullet.xVelocity;
	bullet.y += bullet.yVelocity;
};
