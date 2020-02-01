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
    this.innovation = config.innovation;
  }

  toString() {
    return this.inNode + " -> " + this.outNode + " weight: " + this.weight + " enabled: " + this.enabled + " innovation: " + this.innovation;
  }
}
