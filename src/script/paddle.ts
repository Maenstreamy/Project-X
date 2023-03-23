export default class Level {
    width:number = 48;
    height:number = 16;
    dx:number = 0;
    color:string = 'black';
    x:number;
    y:number;

    constructor(context: CanvasRenderingContext2D) {
        this.x = context.canvas.width / 2 - this.width / 2
        this.y = context.canvas.height - this.height - 10
    }
}