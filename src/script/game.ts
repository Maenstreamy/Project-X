import Level from './level'
import Brick from './brick'
import Paddle from './paddle'
import Ball from './ball'

export default class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    bricks: any;
    brick: any;
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
      this.brick = new Brick()

      this.bricks = []
      for (let row:number = 0; row < level.structure.length; row++) {
        for (let col:number = 0; col < level.structure[row].length; col++) {
          
          if(level.structure[row][col] !== '') {
            const colorCode:string = level.structure[row][col];
      
            this.bricks.push({
              x: this.wallSize + (this.brick.width + this.brick.gap) * col,
              y: this.wallSize + (this.brick.heigth + this.brick.gap) * row,
              color: level.colorMap[colorCode],
              width: this.brick.width,
              height: this.brick.heigth
            });
          }
        }
      }
      this.paddle = new Paddle(this.context)
      this.ball = new Ball(this.paddle)
      this.loop()
    }
  
    createField() {
      this.context.beginPath()
      this.context.fillStyle = '#B0C4DE'
      this.context.fillRect(0, 0, this.canvas.width, this.wallSize)
      this.context.fillRect(0, 0, this.wallSize, this.canvas.height)
      this.context.fillRect(this.canvas.width - this.wallSize, 0, this.wallSize, this.canvas.height)
      
      this.context.beginPath()
      this.bricks.forEach((brick:any)=> {
        this.context.fillStyle = brick.color;
        this.context.fillRect(brick.x, brick.y, brick.width, brick.height);
      })

      this.context.beginPath()
      this.context.fillStyle = this.paddle.color
      this.context.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height)

      this.context.beginPath()
      this.context.fillStyle = this.ball.color;
      this.context.roundRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height, 10)
      this.context.fill();
    }

    collides(obj1:any, obj2:any) {
      return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }
    
    loop() {
      requestAnimationFrame(() => this.loop())
      this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

      this.paddle.x += this.paddle.dx

      if (this.paddle.x < this.wallSize) {
        this.paddle.x = this.wallSize
      } else if (this.paddle.x + this.paddle.width > this.canvas.width - this.wallSize) {
        this.paddle.x = this.canvas.width - this.wallSize - this.paddle.width;
      }

      this.ball.x += this.ball.dx;
      this.ball.y += this.ball.dy;
      
      if (this.ball.x < this.wallSize) {
        this.ball.x = this.wallSize;
        this.ball.dx *= -1;
      } else if (this.ball.x + this.ball.width > this.canvas.width - this.wallSize) {
        this.ball.x = this.canvas.width - this.wallSize - this.ball.width;
        this.ball.dx *= -1;
      }

      if (this.ball.y < this.wallSize) {
        this.ball.y = this.wallSize;
        this.ball.dy *= -1;
      }

      if (this.ball.y > this.canvas.height) {
        this.paddle.reset(this.context)
        this.ball = new Ball(this.paddle)
      }

      if (this.collides(this.ball, this.paddle)) {
        this.ball.dy *= -1;
    
        this.ball.y = this.paddle.y - this.ball.height;
      }

      for (let i = 0; i < this.bricks.length; i++) {
        
        const brick = this.bricks[i];
    
        
        if (this.collides(this.ball, brick)) {

          this.bricks.splice(i, 1);
    
          if (this.ball.y + this.ball.height - this.ball.speed <= brick.y ||
              this.ball.y >= brick.y + brick.height - this.ball.speed) {
            this.ball.dy *= -1;
          }

          else {
            this.ball.dx *= -1;
          }
          break;
        }
      }

      this.createField()

    }
  }