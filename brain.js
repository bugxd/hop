/**
* distance input as array[top, top1, top2, top3, middle, bottom3, bottom2, bottom1, bottom]
* return boolean
*/
class Brain {

  constructor(config) {
    this.gte = config.gte;
    this.lte = config.lte;
  }

  think(input) {
    if(input[0] < this.gte){
      return false;
    }
    if(input[1] < this.gte){
      return false;
    }
    if(input[2] < this.gte){
      return false;
    }
    if(input[3] < this.gte){
      return false;
    }

    if(input[8] < this.lte){
      return true;
    }
    if(input[7] < this.lte){
      return true;
    }
    if(input[6] < this.lte){
      return true;
    }
    if(input[5] < this.lte){
      return true;
    }

    return false;
  }
}
