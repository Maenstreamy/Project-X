import Paddle from './paddle'
export default class Ball {
    width:number = 8;
    height:number = 8;
    dx:number = 0;
    dy:number = 0;
    color:string = 'white';
    x:number;
    y:number;
    speed:number = 2;

    constructor(paddle:Paddle) {
        this.x = paddle.x + paddle.width / 2 - this.width / 2
        this.y = paddle.y - this.height

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if(e.which === 32) {
                this.move()
            }
        })
    }

    public move() {
        if (this.dx === 0 && this.dy === 0) {
            this.dx = this.speed;
            this.dy = - this.speed;
          }
    }
}