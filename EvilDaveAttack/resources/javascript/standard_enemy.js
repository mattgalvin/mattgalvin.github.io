/**
 * 
 */

function Enemy(initX, initY) {
	this.active = true;
	this.age = Math.floor(Math.random() * 128);

	this.x = initX;
	this.y = initY;
	this.xVelocity = 2;
	this.yVelocity = 0;

	this.moveDirection = 1;
	this.moveMagnitude = 25;
	
	this.needReload = false;

	this.sprite = Sprite("resources/images/dave.png");
	this.width = 40;
	this.height = 57;
	
	this.bullets = [];
}

Enemy.prototype.explode = function() {
	this.active = false;
};

Enemy.prototype.inBounds = function(drawContext) {
	return this.x >= 0 && this.x <= drawContext.canvas.width && this.y >= 0
				&& this.y <= drawContext.canvas.height;
};

Enemy.prototype.draw = function(drawContext) {
	if (this.active) {
		this.sprite.draw(drawContext, this.x, this.y);
	}
};

Enemy.prototype.update = function(drawContext) {
	mvmt = this.moveDirection * this.xVelocity;
	this.moveMagnitude += Math.abs(mvmt);
	this.x += mvmt;
	
	if (this.moveMagnitude > 50) {
		this.moveMagnitude = 0;
		this.moveDirection *= -1;
	}

	this.age++;

	this.active = this.active && this.inBounds(drawContext);
	
	if (this.active && !this.needReload) {
		if (Math.random() < 0.01) {
			var bulletPosition = this.midpoint();
			this.bullets.push(new Bullet(5, bulletPosition.x, bulletPosition.y, this.bulletMovement));
			
			this.needReload = true;
			setTimeout(function(en) {
				en.needReload = false;
			}, 1000, this);

		}
	}
};

Enemy.prototype.bulletMovement = function(bullet) {
	bullet.x += bullet.xVelocity;
	bullet.y -= bullet.yVelocity;
};

Enemy.prototype.midpoint = function() {
	return {
		x: this.x + this.width/2,
		y: this.y + this.height/2
	};
};

