export default class Paddle {
    width: number = 104;
    height: number = 24;
    dx: number = 0;
    speed: number = 5;
    sprite: string = 'images/paddleRed.png';
    x: number = 0;
    y: number = 0;
    hpCount: number = 3;
    hpSprite: string = 'images/element_red_diamond_glossy.png'
    hpWidth: number = 15;
    hpHeight: number = 15;

    constructor(context: CanvasRenderingContext2D, gameModeIndex: number = 1) {
        this.reset(context, gameModeIndex)
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.which === 65) {
                this.move('left')
            } else if (e.which === 68) {
                this.move('right')
            }
        })

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.which === 65 || e.which === 68) {
                this.move('stop')
            }
        })
    }
    move(direction: string,) {
        if (direction === 'left') {
            this.dx = -this.speed
        }

        if (direction === 'right') {
            this.dx = this.speed
        }

        if (direction === 'stop') {
            this.dx = 0
        }
    }

    reset(context: CanvasRenderingContext2D, gameModeIndex: number) {
        if(gameModeIndex === 3) {
            this.speed = 10
        }
        this.x = context.canvas.width / 2 - this.width / 2
        this.y = context.canvas.height - this.height - 10
    }
}