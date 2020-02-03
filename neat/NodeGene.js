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
    this.innovation = innovation.getNext();
  }

  getId () {
    return this.id;
  }

  getType () {
    return this.type;
  }

  getInnovation() {
    return this.innovation;
  }

  toString() {
    return this.id + " " + this.type + " " + this.innovation;
  }
}
