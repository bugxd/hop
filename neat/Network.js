class Network {
  /**
   * "config": {
   *  "id": number
   *  "type": NodeTypeInput | NodeTypeHidden | NodeTypeOutput,
   *
   * }
   */
  constructor() {
    this.parent1 = new Genome();
    this.parent1.addNode(NodeTypeInput);
    this.parent1.addNode(NodeTypeInput);
    this.parent1.addNode(NodeTypeInput);

    this.parent1.addNode(NodeTypeOutput);

    this.parent1.addConnection(1, 2, 2, true, 1);
    this.parent1.addConnection(2, 3, 2, true, 2);
    this.parent1.addConnection(3, 4, 2, true, 3);
    this.parent1.addConnection(1, 4, 2, true, 4);
  }

  show() {
    const div = document.getElementById("network");

    const nodes = this.parent1.getNodes();
    var i = 0;
    for(i; i<nodes.length; i++) {
      console.log(nodes[i].toString());
      const para = document.createElement('p');
      para.textContent = para.textContent + nodes[i].toString();
      div.appendChild(para);
    }

    const connections = this.parent1.getConnections();
    var j = 0;
    for(j; j<connections.length; j++) {
      console.log(connections[i].toString());
      const para = document.createElement('p');
      para.textContent = connections[j].toString();
      div.appendChild(para);
    }
  }
}
