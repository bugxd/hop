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
  var bird2;
  var cursors;
  var enemies;
  var enemiesRect = [];

  // lines         bird -> border
  var top;      // bird -> bird.x, 0
  var top1;     // bird -> 300 , 0
  var top2;     // bird -> 600, 0
  var top3;     // bird -> 1000, 0
  var middle;   // bird -> 1000, 300
  var bottom3;  // bird -> 300 , 600
  var bottom2;  // bird -> 600, 600
  var bottom1;  // bird -> 1000, 600
  var bottom;   // bird -> bird.x, 600

  var distances = [0,0,0,0,0,0,0,0,0];

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
    bird = this.physics.add.sprite(100, 300, 'bird');
    bird.setCollideWorldBounds(true);

    bird2 = new Bird({scene: this, gfx: gfx, x: 100, y:300});

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

    //lines
    initLines();
    initDistances();
    drawLines();

    //collider
    this.physics.add.collider(bird, enemies, destroy, null, this);
    this.physics.add.collider(bird, borders, destroy, null, this);
    this.physics.add.collider(bird2, borders, destroy, null, this);

    // score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
  }

  function update (time, delta) {
    if(loose){
      return;
    }

    if(brain(distances)){
      bird.setVelocityY(-100);
    }

    speed = Phaser.Math.GetSpeed(100 + score, 1);

    //bird move
    if(cursors.space.isDown) {
      bird.setVelocityY(-100);
      bird2.setVelocityY(-100);
    }

    //lines
    top = new Phaser.Geom.Line(bird.x, bird.y, bird.x, 0);
    top1 = new Phaser.Geom.Line(bird.x, bird.y, 300, 0);
    top2 = new Phaser.Geom.Line(bird.x, bird.y, 600, 0);
    top3 = new Phaser.Geom.Line(bird.x, bird.y, 1000, 0);

    middle = new Phaser.Geom.Line(bird.x, bird.y, 1000, 300);

    bottom = new Phaser.Geom.Line(bird.x, bird.y, bird.x, 600);
    bottom1 = new Phaser.Geom.Line(bird.x, bird.y, 300, 600);
    bottom2 = new Phaser.Geom.Line(bird.x, bird.y, 600, 600);
    bottom3 = new Phaser.Geom.Line(bird.x, bird.y, 1000, 600);

    bird2.resetLines();

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


        bird2.updateDistances(enemiesRect[i]);


        var interTop = Phaser.Geom.Intersects.GetLineToRectangle(top, enemiesRect[i]);
        if(interTop.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, bird.x, 0);
          //console.log("bird: " + bird.y);
          interTop.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              top = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[0] = distance;
          })
        } else {
          // no intersection
          distances[0] = Phaser.Geom.Line.Length(top);
        }

        var interTop1 = Phaser.Geom.Intersects.GetLineToRectangle(top1, enemiesRect[i]);
        if(interTop1.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, 300, 0);
          //console.log("bird: " + bird.y);
          interTop1.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              top1 = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[1] = distance;
          })
        } else {
          // no intersection
          distances[1] = Phaser.Geom.Line.Length(top1);
        }

        var interTop2 = Phaser.Geom.Intersects.GetLineToRectangle(top2, enemiesRect[i]);
        if(interTop2.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, 600, 0);
          //console.log("bird: " + bird.y);
          interTop2.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              top2 = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[2] = distance;
          })
        } else {
          // no intersection
          distances[2] = Phaser.Geom.Line.Length(top2);
        }

        var interTop3 = Phaser.Geom.Intersects.GetLineToRectangle(top3, enemiesRect[i]);
        if(interTop3.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, 1000, 0);
          //console.log("bird: " + bird.y);
          interTop3.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              top3 = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[3] = distance;
          })
        } else {
          // no intersection
          distances[3] = Phaser.Geom.Line.Length(top3);
        }

        var interMiddle = Phaser.Geom.Intersects.GetLineToRectangle(middle, enemiesRect[i]);
        if(interMiddle.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, 1000, 350);
          //console.log("bird: " + bird.y);
          interMiddle.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              middle = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[4] = distance;
          })
        } else {
          // no intersection
          distances[4] = Phaser.Geom.Line.Length(middle);
        }

        var interBottom3 = Phaser.Geom.Intersects.GetLineToRectangle(bottom3, enemiesRect[i]);
        if(interBottom3.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, 1000, 600);
          //console.log("bird: " + bird.y);
          interBottom3.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              bottom3 = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[5] = distance;
          })
        } else {
          // no intersection
          distances[5] = Phaser.Geom.Line.Length(bottom3);
        }

        var interBottom2 = Phaser.Geom.Intersects.GetLineToRectangle(bottom2, enemiesRect[i]);
        if(interBottom2.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, 600, 600);
          //console.log("bird: " + bird.y);
          interBottom2.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              bottom2 = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[6] = distance;
          })
        } else {
          // no intersection
          distances[6] = Phaser.Geom.Line.Length(bottom2);
        }

        var interBottom1 = Phaser.Geom.Intersects.GetLineToRectangle(bottom1, enemiesRect[i]);
        if(interBottom1.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, 300, 600);
          //console.log("bird: " + bird.y);
          interBottom1.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              bottom1 = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[7] = distance;
          })
        } else {
          // no intersection
          distances[7] = Phaser.Geom.Line.Length(bottom2);
        }


        var interBottom = Phaser.Geom.Intersects.GetLineToRectangle(bottom, enemiesRect[i]);
        if(interBottom.length >0){
          // intersection
          var min = Phaser.Math.Distance.Between(bird.x, bird.y, bird.x, 600);
          //console.log("bird: " + bird.y);
          interBottom.forEach(function(inter) {
            var distance = Phaser.Math.Distance.Between(bird.x, bird.y, inter.x, inter.y);
            if(distance < min){
              min = distance
              bottom = new Phaser.Geom.Line(bird.x, bird.y, inter.x, inter.y);
            }
            distances[8] = distance;
          })
        } else {
          // no intersection
          distances[8] = Phaser.Geom.Line.Length(bottom);
        }
    });

    gfx.lineStyle(1, 0xFF00FF);
    bird2.getLines().forEach(function(line){
      gfx.strokeLineShape(line);
    })
    gfx.lineStyle(1, 0x00FF);

    drawLines();
  }

  function destroy(){
    loose = true;
    bird.destroy();
  }

  function initLines() {
    top = new Phaser.Geom.Line(bird.x, bird.y, bird.x, 0);
    top1 = new Phaser.Geom.Line(bird.x, bird.y, 300, 0);
    top2 = new Phaser.Geom.Line(bird.x, bird.y, 600, 0);
    top3 = new Phaser.Geom.Line(bird.x, bird.y, 1000, 0);
    middle = new Phaser.Geom.Line(bird.x, bird.y, 1000, 300);
    bottom3 = new Phaser.Geom.Line(bird.x, bird.y, 1000, 600);
    bottom2 = new Phaser.Geom.Line(bird.x, bird.y, 600, 600);
    bottom1 = new Phaser.Geom.Line(bird.x, bird.y, 300, 600);
    bottom = new Phaser.Geom.Line(bird.x, bird.y, bird.x, 600);
  }

  function initDistances() {
    distances[0] = (Phaser.Geom.Line.Length(top));
    distances[1] = (Phaser.Geom.Line.Length(top1));
    distances[2] = (Phaser.Geom.Line.Length(top2));
    distances[3] = (Phaser.Geom.Line.Length(top3));
    distances[4] = (Phaser.Geom.Line.Length(middle));
    distances[5] = (Phaser.Geom.Line.Length(bottom3));
    distances[6] = (Phaser.Geom.Line.Length(bottom2));
    distances[7] = (Phaser.Geom.Line.Length(bottom1));
    distances[8] = (Phaser.Geom.Line.Length(bottom));

  }

  function drawLines() {
    gfx.strokeLineShape(top);
    gfx.strokeLineShape(top1);
    gfx.strokeLineShape(top2);
    gfx.strokeLineShape(top3);
    gfx.strokeLineShape(middle);
    gfx.strokeLineShape(bottom3);
    gfx.strokeLineShape(bottom2);
    gfx.strokeLineShape(bottom1);
    gfx.strokeLineShape(bottom);
  }

}
