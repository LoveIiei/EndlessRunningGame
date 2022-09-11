export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText("Score: "+this.game.score, 20, 50);
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Timer: '+(this.game.time * 0.001).toFixed(1), 20, 80)
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 25 * i + 20, 93, 23, 25);
        }
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText('Energy: ' + this.game.energy.toFixed(1), 20, 140)
        if (this.game.gameOver) {
            if (this.game.score > this.game.winning) {
                context.textAlign = 'center';
                context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
                context.fillText('Victory!', this.game.width * 0.5, this.game.height *
                    0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('You are as good as Owen', this.game.width * 0.5, this.game.height *
                    0.5 + 20);
            } else {
                context.textAlign = 'center';
                context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
                context.fillText('NONONO!', this.game.width * 0.5, this.game.height *
                    0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('You might catch Owen one day', this.game.width * 0.5, this.game.height *
                    0.5 + 20);
            }
        }
        context.restore();
    }
}