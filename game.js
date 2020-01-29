window.onload = function() {
  var config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 300 },
              debug: false
          }
      },
      scene: {
          preload: preload,
          create: create,
          update: update
      }
  };

  var loose = false;

  var gfx;

  var bird;
  var cursors;
  var enemies;
  var enemiesRect = [];

  var borders;

  var speed;

  var scoreText;
  var score = 0;

  var game = new Phaser.Game(config);

  function preload ()
  {
      this.load.image('background', 'assets/background.png'); // 1000 x 1000 px
      this.load.image('border', 'assets/border.png'); // 1000 x 10 px

      this.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 32, frameHeight: 32 });
      this.load.image('plane', 'assets/plane.png'); // 128 x 50
  }

  function create () {
    //  A simple cloudy background
    this.add.image(500, 300, 'background');

    // init graphics
    gfx = this.add.graphics({ lineStyle: { width: 2, color: 0x0000ff }, fillStyle: { color: 0xaa0000 }});

    // init speed 100px/ 1sec
    speed = Phaser.Math.GetSpeed(100, 1);

    // The bird and its settings
    bird = new Bird({scene: this, x: 100, y:300});

    // enemies group
    enemies = this.physics.add.group({
      key: "plane",
      dragY: 0,
      maxSize: 10,
      velocityX: 0,
      velocityY: 0,
      allowGravity: false,
      repeat: 5, // creates 6
      setXY: { x: 1000, y:25, stepX: 150 , stepY: 60}
    });

    //
    enemies.children.each(function (child, i) {
      var rect = new Phaser.Geom.Rectangle(child.x-64, child.y-25, child.width, child.height);
      enemiesRect.push(rect);
    });

    //top and bottom border
    borders = this.physics.add.staticGroup();
    borders.create(500, 0, 'border');
    borders.create(500, 600, 'border');

    //collider
    this.physics.add.collider(bird, enemies, destroy, null, this);
    this.physics.add.collider(bird, borders, destroy, null, this);

    // score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update (time, delta) {
    if(loose){
      return;
    }

    speed = Phaser.Math.GetSpeed(100 + score, 1);

    bird.move();

    //bird move
    if(cursors.space.isDown) {
      bird.setVelocityY(-100);
    }

    bird.resetLines();

    gfx.clear()

    //enemies move
    enemies.children.each(function (child, i) {
        child.x -= speed* delta;

        if(child.x <= 100){
          child.setPosition(1000, Phaser.Math.Between(0, 600));
            // update the score
            score += 1;
            scoreText.setText('Score: ' + score);
        }

        enemiesRect[i].x = child.x-64;
        enemiesRect[i].y = child.y-25;
        gfx.strokeRectShape(enemiesRect[i]);

        bird.updateDistances(enemiesRect[i]);
    });

    gfx.lineStyle(1, 0xFF00FF);
    bird.getLines().forEach(function(line){
      gfx.strokeLineShape(line);
    })
    gfx.lineStyle(1, 0x00FF);
  }

  function destroy(){
    loose = true;
    bird.destroy();
  }

}
