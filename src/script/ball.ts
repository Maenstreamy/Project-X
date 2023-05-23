import Paddle from './paddle'
export default class Ball {
    width: number = 22;
    height: number = 22;
    dx: number = 0;
    dy: number = 0;
    color: string = 'white';
    x: number;
    y: number;
    speed: number = 4;
    sprite: string = './../../assets/img/sprites/ballGrey.png';

    constructor(paddle: Paddle, gameModeIndex: number = 1) {
        if(gameModeIndex === 3) {
            this.width = 40
            this.height = 40
            this.speed = 10
        }
        this.x = paddle.x + paddle.width / 2 - this.width / 2
        this.y = paddle.y - this.height

        
    }

    public move() {
        if (this.dx === 0 && this.dy === 0) {
            this.dx = this.speed;
            this.dy = - this.speed;
        }
    }
}