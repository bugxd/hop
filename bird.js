class Bird extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, "bird");
    this.config = config;

    config.scene.add.existing(this);

    config.scene.physics.world.enableBody(this);

    //init lines
    this.top = new Phaser.Geom.Line(this.x, this.y, this.x, 0);
    this.top1 = new Phaser.Geom.Line(this.x, this.y, 300, 0);
    this.top2 = new Phaser.Geom.Line(this.x, this.y, 600, 0);
    this.top3 = new Phaser.Geom.Line(this.x, this.y, 1000, 0);
    this.middle = new Phaser.Geom.Line(this.x, this.y, 1000, 300);
    this.bottom3 = new Phaser.Geom.Line(this.x, this.y, 1000, 600);
    this.bottom2 = new Phaser.Geom.Line(this.x, this.y, 600, 600);
    this.bottom1 = new Phaser.Geom.Line(this.x, this.y, 300, 600);
    this.bottom = new Phaser.Geom.Line(this.x, this.y, this.x, 600);

    //init distances with line length
    this.distances = [
      Phaser.Geom.Line.Length(this.top),
      Phaser.Geom.Line.Length(this.top1),
      Phaser.Geom.Line.Length(this.top2),
      Phaser.Geom.Line.Length(this.top3),
      Phaser.Geom.Line.Length(this.middle),
      Phaser.Geom.Line.Length(this.bottom3),
      Phaser.Geom.Line.Length(this.bottom2),
      Phaser.Geom.Line.Length(this.bottom1),
      Phaser.Geom.Line.Length(this.bottom)
    ];
  }

  resetLines() {
    this.top = new Phaser.Geom.Line(this.x, this.y, this.x, 0);
    this.top1 = new Phaser.Geom.Line(this.x, this.y, 300, 0);
    this.top2 = new Phaser.Geom.Line(this.x, this.y, 600, 0);
    this.top3 = new Phaser.Geom.Line(this.x, this.y, 1000, 0);
    this.middle = new Phaser.Geom.Line(this.x, this.y, 1000, 300);
    this.bottom3 = new Phaser.Geom.Line(this.x, this.y, 1000, 600);
    this.bottom2 = new Phaser.Geom.Line(this.x, this.y, 600, 600);
    this.bottom1 = new Phaser.Geom.Line(this.x, this.y, 300, 600);
    this.bottom = new Phaser.Geom.Line(this.x, this.y, this.x, 600);
  }

  /**
  update distance acording to enemy rectangle
  */
  updateDistances(enmey) {
    var interTop = Phaser.Geom.Intersects.GetLineToRectangle(this.top, enmey);
    if(interTop.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, this.x, 0);
      var i = 0;
      for(i; i < interTop.length; i++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interTop[i].x, interTop[i].y);
        if(distance < min){
          min = distance
          this.top = new Phaser.Geom.Line(this.x, this.y, interTop[i].x, interTop[i].y);
        }
        this.distances[0] = distance;
      }
    } else {
      // no intersection
      this.distances[0] = Phaser.Geom.Line.Length(this.top);
    }

    var interTop1 = Phaser.Geom.Intersects.GetLineToRectangle(this.top1, enmey);
    if(interTop1.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, 300, 0);
      var i1 = 0;
      for(i1; i1 < interTop1.length; i1++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interTop1[i1].x, interTop1[i1].y);
        if(distance < min){
          min = distance
          this.top1 = new Phaser.Geom.Line(this.x, this.y, interTop1[i1].x, interTop1[i1].y);
        }
        this.distances[1] = distance;
      }
    } else {
      // no intersection
      this.distances[1] = Phaser.Geom.Line.Length(this.top1);
    }

    var interTop2 = Phaser.Geom.Intersects.GetLineToRectangle(this.top2, enmey);
    if(interTop2.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, 600, 0);
      var i2 = 0;
      for(i2; i2 < interTop2.length; i2++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interTop2[i2].x, interTop2[i2].y);
        if(distance < min){
          min = distance
          this.top2 = new Phaser.Geom.Line(this.x, this.y, interTop2[i2].x, interTop2[i2].y);
        }
        this.distances[2] = distance;
      }
    } else {
      // no intersection
      this.distances[2] = Phaser.Geom.Line.Length(this.top2);
    }

    var interTop3 = Phaser.Geom.Intersects.GetLineToRectangle(this.top3, enmey);
    if(interTop3.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, 999, 0);
      var i3 = 0;
      for(i3; i3 < interTop3.length; i3++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interTop3[i3].x, interTop3[i3].y);
        if(distance < min){
          min = distance
          this.top3 = new Phaser.Geom.Line(this.x, this.y, interTop3[i3].x, interTop3[i3].y);
        }
        this.distances[3] = distance;
      }
    } else {
      // no intersection
      this.distances[3] = Phaser.Geom.Line.Length(this.top3);
    }

    var interMiddle = Phaser.Geom.Intersects.GetLineToRectangle(this.middle, enmey);
    if(interMiddle.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, 1000, 350);
      var i4 = 0;
      for(i4; i4 < interMiddle.length; i4++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interMiddle[i4].x, interMiddle[i4].y);
        if(distance < min){
          min = distance
          this.middle = new Phaser.Geom.Line(this.x, this.y, interMiddle[i4].x, interMiddle[i4].y);
        }
        this.distances[0] = distance;
      }
    } else {
      // no intersection
      this.distances[4] = Phaser.Geom.Line.Length(this.middle);
    }

    var interBottom3 = Phaser.Geom.Intersects.GetLineToRectangle(this.bottom3, enmey);
    if(interBottom3.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, 1000, 600);
      var i5 = 0;
      for(i5; i5 < interBottom3.length; i5++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interBottom3[i5].x, interBottom3[i5].y);
        if(distance < min){
          min = distance
          this.bottom3 = new Phaser.Geom.Line(this.x, this.y, interBottom3[i5].x, interBottom3[i5].y);
        }
        this.distances[5] = distance;
      }
    } else {
      // no intersection
      this.distances[5] = Phaser.Geom.Line.Length(this.bottom3);
    }

    var interBottom2 = Phaser.Geom.Intersects.GetLineToRectangle(this.bottom2, enmey);
    if(interBottom2.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, 600, 600);
      var i6 = 0;
      for(i6; i6 < interBottom2.length; i6++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interBottom2[i6].x, interBottom2[i6].y);
        if(distance < min){
          min = distance
          this.bottom2 = new Phaser.Geom.Line(this.x, this.y, interBottom2[i6].x, interBottom2[i6].y);
        }
        this.distances[6] = distance;
      }
    } else {
      // no intersection
      this.distances[6] = Phaser.Geom.Line.Length(this.bottom2);
    }

    var interBottom1 = Phaser.Geom.Intersects.GetLineToRectangle(this.bottom1, enmey);
    if(interBottom1.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, 300, 600);
      var i7 = 0;
      for(i7; i7 < interBottom1.length; i7++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interBottom1[i7].x, interBottom1[i7].y);
        if(distance < min){
          min = distance
          this.bottom1 = new Phaser.Geom.Line(this.x, this.y, interBottom1[i7].x, interBottom1[i7].y);
        }
        this.distances[7] = distance;
      }
    } else {
      // no intersection
      this.distances[7] = Phaser.Geom.Line.Length(this.bottom1);
    }


    var interBottom = Phaser.Geom.Intersects.GetLineToRectangle(this.bottom, enmey);
    if(interBottom.length >0){
      // intersection
      var min = Phaser.Math.Distance.Between(this.x, this.y, this.x, 600);
      var i8 = 0;
      for(i8; i8 < interBottom.length; i8++) {
        var distance = Phaser.Math.Distance.Between(this.x, this.y, interBottom[i8].x, interBottom[i8].y);
        if(distance < min){
          min = distance
          this.bottom = new Phaser.Geom.Line(this.x, this.y, interBottom[i8].x, interBottom[i8].y);
        }
        this.distances[8] = distance;
      }
    } else {
      // no intersection
      this.distances[8] = Phaser.Geom.Line.Length(this.bottom);
    }
  }

  getDistances() {
    return this.distances;
  }

  /** return lines as array */
  getLines() {
    return [
      this.top,
      this.top1,
      this.top2,
      this.top3,
      this.middle,
      this.bottom3,
      this.bottom2,
      this.bottom1,
      this.bottom,
    ];
  }
}
