window.onload = function() {
  //global values
  var width = 1000;
  var height = 600;
  var population = 10;

  var config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 300 },
              debug: true
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

  var birds;
  var cursors;
  var enemies;
  var enemiesRect = [];

  var borders;

  var speed;

  var scoreText;
  var score = 0;

  var network;

  var game = new Phaser.Game(config);

  function preload ()
  {
      this.load.image('background', 'assets/background.png'); // 1000 x 1000 px
      this.load.image('border', 'assets/border.png'); // 1000 x 10 px

      this.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 32, frameHeight: 32 });
      this.load.image('plane', 'assets/plane.png'); // 128 x 50
  }

  function create () {
    network = new Network();
    network.show();

    //  A simple cloudy background
    this.add.image(width/2, height/2, 'background');

    // init graphics
    gfx = this.add.graphics({ lineStyle: { width: 2, color: 0x0000ff }, fillStyle: { color: 0xaa0000 }});

    // init speed 100px/ 1sec
    speed = Phaser.Math.GetSpeed(100, 1);

    birds = this.physics.add.group();

    var i = 0;
    for(i; i<population; i++){
      birds.add(new Bird({scene: this, x: 100, y:height/2, brain: {gte: 100+i*10, lte:100+i*10}}));
    }


    // enemies group
    enemies = this.physics.add.group({
      key: "plane",
      dragY: 0,
      maxSize: 10,
      velocityX: 0,
      velocityY: 0,
      allowGravity: false,
      repeat: 5, // creates 6
      setXY: { x: width, y:25, stepX: 150 , stepY: 60}
    });

    //
    enemies.children.each(function (child, i) {
      var rect = new Phaser.Geom.Rectangle(child.x-64, child.y-25, child.width, child.height);
      enemiesRect.push(rect);
    });

    //top and bottom border
    borders = this.physics.add.staticGroup();
    borders.create(width/2, 0, 'border');
    borders.create(width/2, height, 'border');

    //collider
    this.physics.add.collider(birds, enemies, destroy, null, this);
    this.physics.add.collider(birds, borders, destroy, null, this);

    // score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update (time, delta) {
    if(birds.getLength() === 0){
      return;
    }

    speed = Phaser.Math.GetSpeed(100 + score, 1);

    birds.children.each(function (bird) {
      bird.move();
      bird.resetLines();
    });

    gfx.clear()

    //enemies move
    enemies.children.each(function (child, i) {
        child.x -= speed* delta;

        if(child.x <= 100){
          child.setPosition(width, Phaser.Math.Between(0, height));
            // update the score
            score += 1;
            scoreText.setText('Score: ' + score);
        }

        enemiesRect[i].x = child.x-64;
        enemiesRect[i].y = child.y-25;
        gfx.strokeRectShape(enemiesRect[i]);

        birds.children.each(function (bird) {
          bird.updateDistances(enemiesRect[i]);
        });
    });
  }

  function destroy(bird){
    birds.remove(bird);
  }

}
