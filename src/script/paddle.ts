export default class Paddle {
    width: number = 104;
    height: number = 24;
    dx: number = 0;
    sprite: string = './../../assets/img/sprites/paddleRed.png';
    x: number = 0;
    y: number = 0;
    hpCount: number = 3;
    hpSprite: string = './../../assets/img/sprites/element_red_diamond_glossy.png'
    hpWidth: number = 15;
    hpHeight: number = 15;

    constructor(context: CanvasRenderingContext2D) {
        this.reset(context)
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
            this.dx = -5
        }

        if (direction === 'right') {
            this.dx = 5
        }

        if (direction === 'stop') {
            this.dx = 0
        }
    }

    reset(context: CanvasRenderingContext2D) {
        this.x = context.canvas.width / 2 - this.width / 2
        this.y = context.canvas.height - this.height - 10
    }
}