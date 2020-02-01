const NodeTypeInput = "INPUT";
const NodeTypeHidden = "HIDDEN";
const NodeTypeOutput = "OUTPUT";

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

  toString() {
    return this.id + " " + this.type;
  }
}
