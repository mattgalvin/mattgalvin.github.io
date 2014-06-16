/**
 * Bullet object
 */

function Bullet(speed, startX, startY, movement) {
	this.active = true;

	this.xVelocity = 0;
	this.yVelocity = -speed;
	this.width = 3;
	this.height = 3;
	this.color = "#000";
	this.x = startX;
	this.y = startY;
	this.movement = movement;
}

Bullet.prototype.inBounds = function(drawContext) {
	return this.x >= 0 && this.x <= drawContext.canvas.width &&
		   this.y >= 0 && this.y <= drawContext.canvas.height;

};

Bullet.prototype.draw = function(drawContext) {
	drawContext.fillStyle = this.color;
	drawContext.fillRect(this.x, this.y, this.width, this.height);
};

Bullet.prototype.update = function(drawContext) {
	this.movement(this);
	this.active = this.active && this.inBounds(drawContext);
};
