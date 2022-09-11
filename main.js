import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy} from './enemies.js';
import { UI } from './UI.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.floatingMessage = [];
            this.maxParticles = 200;
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.lives = 5;
            this.winning = 100;
            this.energy = 100;
            this.MaxTime = 60000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        } 
        update(deltaTime) {
            if (this.energy < 100 && this.player.currentState !== this.player.states[4]) this.energy = this.energy + 0.02;
            this.time += deltaTime;
            //if (this.time > this.MaxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
            });
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if (this.particles.length > 50){
                this.particles.length = this.maxParticles;
            }
            this.collisions.forEach((collision, index) => {
                    collision.update(deltaTime);
            });
            this.floatingMessage.forEach((message, index) => {
                message.update();
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            this.particles = this.particles.filter(particle => !particle.markedForDeletion)
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)
            this.floatingMessage = this.floatingMessage.filter(message => !message.markedForDeletion)
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.collisions.forEach(collision => {
                collision.draw(context);
            })
            this.floatingMessage.forEach((message, index) => {
                message.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.4) this.enemies.push(
                new GroundEnemy(this)
            );
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);    
    }
    animate(0);
});