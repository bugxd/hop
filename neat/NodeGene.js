NodeTypeInput = "INPUT";
NodeTypeHidden = "HIDDEN";
NodeTypeOutput = "OUTPUT";

class NodeGene {
  /**
   * "config": {
   *  "id": number
   *  "type": NodeTypeInput | NodeTypeHidden | NodeTypeOutput,
   *
   * }
   */
  constructor(config) {
    this.id = config.id;
    this.type = config.type;
  }

  getId () {
    return this.id;
  }

  getType () {
    return this.type;
  }
}
