import Level from "./level";
import Brick from "./brick";
import Paddle from "./paddle";
import Ball from "./ball";
import levels from "../config/levels.js";

export default class Game {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  bricks: any;
  brick: any;
  paddle: any;
  ball: any;
  wallSize: number = 12;
  gameStatus: boolean = false;
  level: any;
  currentLevel: number = 1;
  sprites: any;
  gameModeIndex: number = 0;
  menu: any;

  constructor() {
    this.sprites = {
      paddle: undefined,
      hp: undefined,
      ball: undefined,
      bricks: [],
    };
    this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.which === 32 && this.gameModeIndex === 1) {
        this.gameStatus = true;
        this.ball.move();
      }

      if (e.which === 27) {
        this.changeGameMode(0);
        this.gameStatus = false;
        this.initLevel();
      }

      if (!this.gameStatus) {
        e.preventDefault();
        if (e.which === 32 && this.menuItems[this.selectIndex].select) {
          this.menuItems[this.selectIndex].event();
        }
        if (e.which === 83 || e.which === 87) {
          if (this.selectIndex === null) {
            this.selectIndex = 0;
          } else {
            if (e.which === 83) {
              if (this.selectIndex >= this.menuItems.length - 1) return;
              this.selectIndex++;
            } else {
              if (this.selectIndex <= 0) return;
              this.selectIndex--;
            }
          }
          this.menuItems.forEach((el) => {
            el.select = false;
            this.checkSelect(el);
          });
          this.menuItems[this.selectIndex].select = true;
          this.checkSelect(this.menuItems[this.selectIndex]);
        }
      }
    });
    this.initMenu();
    this.initLevel();
    this.loop();
  }

  changeGameMode(gameModeIndex: number) {
    this.gameModeIndex = gameModeIndex;
    if (gameModeIndex === 0) {
      this.canvas.style.display = "none";
      this.menu.style.display = "flex";
    } else {
      this.canvas.style.display = "block";
      this.menu.style.display = "none";
    }
    this.gameStatus = false;
  }
  checkSelect = (item: any) => {
    if (item.select) {
      item.el.classList.add("menu-item--select");
    } else {
      item.el.classList.remove("menu-item--select");
    }
  };
  menuItems = [
    {
      name: "Normal",
      event: () => {
        this.changeGameMode(1);
      },
      select: false,
      el: null,
    },
    {
      name: "RandomMode",
      event: () => {
        console.log("RandomMode");
      },
      select: false,
      el: null,
    },
    {
      name: "UltraHardMode",
      event: () => {
        console.log("UltraHardMode");
      },
      select: false,
      el: null,
    },
    {
      name: "Exit",
      event: () => window.close(),
      select: false,
      el: null,
    },
  ];
  selectIndex: any = null;
  initMenu() {
    this.menu = document.querySelector(".menu") as HTMLElement;
    this.menuItems.forEach((item: any, index: number) => {
      item.el = document.createElement("div");
      item.el.innerHTML = item.name;
      item.el.classList.add("menu-item");
      item.el.addEventListener("click", () => {
        item.event();
      });

      const setSelect = (val: boolean) => {
        this.menuItems[index].select = val;
      };
      const eventHandler = (val: boolean) => {
        this.menuItems.forEach((el) => {
          el.select = false;
          this.checkSelect(el);
        });
        if (val) {
          this.selectIndex = index;
        } else {
          this.selectIndex = null;
        }
        setSelect(val);
        this.checkSelect(item);
      };
      item.el.addEventListener("mouseover", () => {
        eventHandler(true);
      });

      item.el.addEventListener("mouseout", () => {
        eventHandler(false);
      });

      this.menu.appendChild(item.el);
    });
  }

  initLevel() {
    this.level = new Level(levels[`level${this.currentLevel}`]);
    this.brick = new Brick();

    this.bricks = [];
    for (let row: number = 0; row < this.level.structure.length; row++) {
      for (let col: number = 0; col < this.level.structure[row].length; col++) {
        if (this.level.structure[row][col] !== "") {
          const colorCode: string = this.level.structure[row][col];

          const brickSprite = new Image();
          brickSprite.src = `./../../assets/img/sprites/${this.level.colorMap[colorCode]}.png`;

          this.bricks.push({
            x: this.wallSize + (this.brick.width + this.brick.gap) * col,
            y: this.wallSize + (this.brick.heigth + this.brick.gap) * row,
            width: this.brick.width,
            height: this.brick.heigth,
            brickSprite,
          });
        }
      }
    }

    this.paddle = new Paddle(this.context);
    this.ball = new Ball(this.paddle);
    this.sprites.paddle = new Image();
    this.sprites.paddle.src = this.paddle.sprite;
    this.sprites.ball = new Image();
    this.sprites.ball.src = this.ball.sprite;
    this.sprites.hp = new Image();
    this.sprites.hp.src = this.paddle.hpSprite;
  }

  createField() {
    this.context.beginPath();
    this.context.fillStyle = "rgba( 108, 108, 108, 1 )";
    this.context.fillRect(0, 0, this.canvas.width, this.wallSize);
    this.context.fillRect(0, 0, this.wallSize, this.canvas.height);
    this.context.fillRect(
      this.canvas.width - this.wallSize,
      0,
      this.wallSize,
      this.canvas.height
    );

    this.context.beginPath();
    this.bricks.forEach((brick: any) => {
      this.context.drawImage(brick.brickSprite, brick.x, brick.y);
    });

    this.context.beginPath();
    this.context.drawImage(this.sprites.paddle, this.paddle.x, this.paddle.y);

    let hpCoords = 24;
    for (let i = 0; i < this.paddle.hpCount; i++) {
      this.context.beginPath();
      this.context.drawImage(
        this.sprites.hp,
        this.paddle.x + hpCoords,
        this.paddle.y + 4,
        this.paddle.hpWidth,
        this.paddle.hpHeight
      );
      hpCoords += 20;
    }

    this.context.beginPath();
    this.context.drawImage(this.sprites.ball, this.ball.x, this.ball.y);
  }

  collides(obj1: any, obj2: any) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }

  loop() {
    requestAnimationFrame(() => this.loop());

    if (this.gameModeIndex === 1) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.createField();

      if (this.gameStatus) {
        this.paddle.x += this.paddle.dx;

        if (this.paddle.x < this.wallSize) {
          this.paddle.x = this.wallSize;
        } else if (
          this.paddle.x + this.paddle.width >
          this.canvas.width - this.wallSize
        ) {
          this.paddle.x = this.canvas.width - this.wallSize - this.paddle.width;
        }

        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;

        if (this.ball.x < this.wallSize) {
          this.ball.x = this.wallSize;
          this.ball.dx *= -1;
        } else if (
          this.ball.x + this.ball.width >
          this.canvas.width - this.wallSize
        ) {
          this.ball.x = this.canvas.width - this.wallSize - this.ball.width;
          this.ball.dx *= -1;
        }

        if (this.ball.y < this.wallSize) {
          this.ball.y = this.wallSize;
          this.ball.dy *= -1;
        }

        if (this.ball.y > this.canvas.height) {
          this.paddle.reset(this.context);
          this.ball = new Ball(this.paddle);
          this.gameStatus = false;
          this.paddle.hpCount--;

          if (this.paddle.hpCount < 1) {
            this.changeGameMode(0);
            this.gameStatus = false;
            this.initLevel();
            console.log("game over");
          }
        }

        if (this.collides(this.ball, this.paddle)) {
          this.ball.dy *= -1;
          this.ball.y = this.paddle.y - this.ball.height;
        }

        for (let i = 0; i < this.bricks.length; i++) {
          const brick = this.bricks[i];

          if (this.collides(this.ball, brick)) {
            this.bricks.splice(i, 1);

            if (
              this.ball.y + this.ball.height - this.ball.speed <= brick.y ||
              this.ball.y >= brick.y + brick.height - this.ball.speed
            ) {
              this.ball.dy *= -1;
            } else {
              this.ball.dx *= -1;
            }
            break;
          }
        }

        if (this.bricks.length <= 0) {
          this.gameStatus = false;
          this.currentLevel++;
          this.initLevel();
        }
      }
    }
  }
}
