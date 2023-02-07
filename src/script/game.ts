import Level from './level'

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
  
    constructor() {
      this.canvas = document.querySelector('canvas') as HTMLCanvasElement
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
      const level = new Level(this.context, [['123', '1', '2'], ['5', '6', '1']])
      console.log(level)
      this.createField()
    }
  
    private createField() {
      this.context.fillStyle = '#B0C4DE'
      this.context.fillRect(0, 0, this.canvas.width, 1)
      this.context.fillRect(0, 0, 1, this.canvas.height)
      this.context.fillRect(this.canvas.width - 1, 0, 1, this.canvas.height)
    }
  }
