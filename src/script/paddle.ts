export default class Paddle {
    width:number = 48;
    height:number = 16;
    dx:number = 0;
    color:string = 'black';
    x:number = 0;
    y:number = 0;

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
    move(direction: string) {
        if(direction === 'left') {
            this.dx = -5
        console.log(this.dx)
        }

        if(direction === 'right') {
            this.dx = 5
        console.log(this.dx)
        }

        if(direction === 'stop') {
            this.dx = 0
        console.log(this.dx)
        }
    }
    reset(context: CanvasRenderingContext2D) {
        this.x = context.canvas.width / 2 - this.width / 2
        this.y = context.canvas.height - this.height - 10
    }
}