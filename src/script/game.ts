import Level from './level'
import Brick from './brick'
import Paddle from './paddle'
import Ball from './ball'

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    bricks: any;
    paddle: any;
    ball: any;
    wallSize:number = 12;

    constructor() {
      this.canvas = document.querySelector('canvas') as HTMLCanvasElement
      this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
      const level = new Level(this.context, [
        [],
        [],
        [],
        ['','','','','R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
        ['','','','','R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
        ['','','','','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
        ['','','','','O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
        ['','','','','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
        ['','','','','G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
        ['','','','','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'],
        ['','','','','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y']
      ])
      const brick = new Brick()

      this.bricks = []
      for (let row:number = 0; row < level.structure.length; row++) {
        for (let col:number = 0; col < level.structure[row].length; col++) {
          
          if(level.structure[row][col] !== '') {
            const colorCode:string = level.structure[row][col];
      
            this.bricks.push({
              x: this.wallSize + (brick.width + brick.gap) * col,
              y: this.wallSize + (brick.heigth + brick.gap) * row,
              color: level.colorMap[colorCode],
              width: brick.width,
              height: brick.heigth
            });
          }
        }
      }
      this.paddle = new Paddle(this.context)
      this.ball = new Ball(this.paddle)
      this.createField()
    }
  
    private createField() {
      this.context.fillStyle = '#B0C4DE'
      this.context.fillRect(0, 0, this.canvas.width, this.wallSize)
      this.context.fillRect(0, 0, this.wallSize, this.canvas.height)
      this.context.fillRect(this.canvas.width - this.wallSize, 0, this.wallSize, this.canvas.height)
      
      this.bricks.forEach((brick:any)=> {
        this.context.fillStyle = brick.color;
        this.context.fillRect(brick.x, brick.y, brick.width, brick.height);
      });
      this.context.fillStyle = this.paddle.color
      this.context.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height)
      
      this.context.fillStyle = this.ball.color;
      this.context.roundRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height, 10)
      this.context.fill();
    }

    // проверка на пересечение объектов
    private collides(obj1:any, obj2:any) {
      return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }
  }
