/**
* distance input as array[top, top1, top2, top3, middle, bottom3, bottom2, bottom1, bottom]
* return boolean
*/
class Brain {

  think(input) {
    if(input[0] < 100){
      return false;
    }
    if(input[1] < 100){
      return false;
    }
    if(input[2] < 100){
      return false;
    }
    if(input[3] < 100){
      return false;
    }

    if(input[8] < 150){
      return true;
    }
    if(input[7] < 150){
      return true;
    }
    if(input[6] < 150){
      return true;
    }
    if(input[5] < 150){
      return true;
    }

    return false;
  }
}
