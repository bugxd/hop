class Genome {
  /**
   * "config": {
   *  "input": number
   *  "output": number,
   *
   * }
   */
  constructor(config) {
    this.nextNode = 1;
    this.nodes = [];
    this.connections = [];

  }

  getNodes() {
    return this.nodes;
  }

  getConnections() {
    return this.connections;
  }

  mutateAddConnection() {
    var done = false;
    while(!done) {
      var node1 = this.nodes[this.randomNode()];
      var node2 =  this.nodes[this.randomNode()];

      var reverse = false;
      if(node1.getType() === NodeTypeHidden && node2.getType() == NodeTypeInput) {
        reverse = true;
      }

      if(node1.getType() === NodeTypeOutput && node2.getType() == NodeTypeInput) {
          reverse = true;
      }

      if(node1.getType() === NodeTypeOutput && node2.getType() == NodeTypeHidden) {
          reverse = true;
      }


      var sameType = false;
      if(node1.getType() === NodeTypeInput && node2.getType() === NodeTypeInput){
        sameType = true;
      }
      if(node1.getType() === NodeTypeInput && node2.getType() === NodeTypeInput){
        sameType = true;
      }

      var connected = true;
      if(node1.getId() !== node2.getId()) {
        if(reverse) {
          connected = this.hasConnection(node2.getId(), node1.getId());
        } else {
          connected = this.hasConnection(node1.getId(), node2.getId());
        }
      }

      if(!connected && !sameType) {
        var weight = (Math.random() * 4) - 2;
        if(reverse) {
          this.addConnection(node2, node1, weight, true, 0);
        } else {
          this.addConnection(node1, node2, weight, true, 0);
        }
        done = true;
      }
    }
  }

  //return number between nextNode and 1
  randomNode() {
    return this.getRandomInt(this.nextNode -1 ,1);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
  * node1 number
  * node2 number
  * returns true if node1 -> node2 has a connection
  */
  hasConnection(node1, node2) {
    var i = 0;
    for(i; i<this.connections.length; i++) {
      if(this.connections[i].inNode && this.connection[i].outNode){
        return true;
      }
    }

    return false;
  }

  addNode(type) {
    this.nodes.push(new NodeGene({ id:this.nextNode, type: type }))
    this.nextNode = this.nextNode +1;
  }

  addConnection(inNode, outNode, weight, enabled, innovation) {
    this.nodes.push(new ConnectionGene({ inNode:inNode, outNode: outNode, weight: weight, enabled: enabled, innovation: innovation }))
  }
}
