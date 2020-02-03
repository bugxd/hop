class ConnectionGene {

  /**
   * "config": {
   *  "inNode": NodeGene.id,
   *  "outNode": NodeGene.id,
   *  "weight": number,
   *  "enabled": boolean,
   *  "innovation": number,
   * }
   */
  constructor(config) {
    this.inNode = config.inNode;
    this.outNode = config.outNode;
    this.weight = config.weight;
    this.enabled = config.enabled;
    this.innovation = innovation.getNext();
  }

  getInNode() {
    return this.inNode;
  }

  getOutNode() {
    return this.outNode;
  }

  getWeight() {
    return this.weight;
  }

  getEnabled() {
    return this.enabled;
  }

  getInnovation() {
    return this.innovation;
  }

  disable() {
    this.enabled = false;
  }

  toString() {
    return this.inNode + " -> " + this.outNode + " weight: " + this.weight + " enabled: " + this.enabled + " innovation: " + this.innovation;
  }
}
