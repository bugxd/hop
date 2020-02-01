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

  addNode(type) {
    this.nodes.push(new NodeGene({ id:this.nextNode, type: type }))
    this.nextNode = this.nextNode +1;
  }

  addConnection(inNode, outNode, weight, enabled, innovation) {
    this.nodes.push(new ConnectionGene({ inNode:inNode, outNode: outNode, weight: weight, enabled: enabled, innovation: innovation }))
  }
}
