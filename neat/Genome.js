class Genome {
  /**
   *  nextNode: number,
   *  nodes: Array<NodeGene>,
   *  connections: Array<ConnectionGene>,
   */
  constructor(nextNode, nodes, connections) {
    this.nextNode = nextNode;
    this.nodes = nodes;
    this.connections = connections;
  }

  getNodes() {
    return this.nodes;
  }

  getConnections() {
    return this.connections;
  }

  mutateAddNode() {
    var done = false;

    if(this.connections.length === 0){
      done = true;
    }

    while(!done){
      var connection = this.connections[this.randomConnection()];

      if(connection.getEnabled()) {
        connection.disable();
        var newNode = this.addNode(NodeTypeHidden);

        this.addConnection(connection.getInNode(), newNode, 1, true);
        this.addConnection(newNode, connection.getOutNode(), connection.getWeight, true);
        done = true;
      }
    }
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

      var diff = true;
      if(node1.getType() === NodeTypeInput && node2.getType() === NodeTypeInput){
        diff = false;
      }
      if(node1.getType() === NodeTypeInput && node2.getType() === NodeTypeInput){
        diff = false;
      }

      var connected = true;
      if(node1.getId() !== node2.getId()) {
        if(reverse) {
          connected = this.hasConnection(node2.getId(), node1.getId());
        } else {
          connected = this.hasConnection(node1.getId(), node2.getId());
        }
      }

      if(!connected && diff) {
        var weight = (Math.random() * 4) - 2;
        if(reverse) {
          this.addConnection(node2, node1, weight, true);
        } else {
          this.addConnection(node1, node2, weight, true);
        }
        done = true;
      }
    }
  }

  randomConnection() {
    return this.getRandomInt(0, this.connections.length-1);
  }

  randomNode() {
    return this.getRandomInt(1, this.nextNode -1);
  }

  /**
  * min number
  * max number
  * returns number between min and max
  */
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
      if(this.connections[i].inNode === node1 && this.connections[i].outNode === node2){
        return true;
      }
    }
    return false;
  }

  addNode(type) {
    this.nextNode = this.nextNode +1;
    this.nodes.push(new NodeGene({ id:this.nextNode, type: type }))
    return this.nextNode;
  }

  addConnection(inNode, outNode, weight, enabled) {
    this.connections.push(new ConnectionGene({ inNode:inNode, outNode: outNode, weight: weight, enabled: enabled }))
  }

  copy() {
    return new Genome(this.nextNode, [...this.nodes], [...this.connections]);
  }
}
