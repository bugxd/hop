class Network {
  /**
   * "config": {
   *  "id": number
   *  "type": NodeTypeInput | NodeTypeHidden | NodeTypeOutput,
   *
   * }
   */
  constructor() {
    this.parent1 = new Genome(0, [], []);
    this.parent1.addNode(NodeTypeInput);
    this.parent1.addNode(NodeTypeInput);
    this.parent1.addNode(NodeTypeInput);

    this.parent1.addNode(NodeTypeHidden);
    this.parent1.addNode(NodeTypeHidden);
    this.parent1.addNode(NodeTypeHidden);

    this.parent1.addNode(NodeTypeOutput);

    this.parent2 = this.parent1.copy();

    this.parent1.mutateAddConnection();
    this.parent1.mutateAddNode();

    this.parent2.mutateAddConnection();
    this.parent2.mutateAddNode();


    this.show();
  }

  mutate() {}

  show() {
    const div = document.getElementById("network");

    const nodes = this.parent1.getNodes();
    var i = 0;
    for(i; i<nodes.length; i++) {;
      const para = document.createElement('p');
      para.textContent = para.textContent + nodes[i].toString();
      div.appendChild(para);
    }

    const connections = this.parent1.getConnections();
    var j = 0;
    for(j; j<connections.length; j++) {
      const para = document.createElement('p');
      para.textContent = connections[j].toString();
      div.appendChild(para);
    }

    const para = document.createElement('p');
    para.textContent = para.textContent + "-----------------------------------------------------------";
    div.appendChild(para);

    const nodes2 = this.parent2.getNodes();
    var i = 0;
    for(i; i<nodes2.length; i++) {;
      const para = document.createElement('p');
      para.textContent = para.textContent + nodes2[i].toString();
      div.appendChild(para);
    }

    const connections2 = this.parent2.getConnections();
    var j = 0;
    for(j; j<connections2.length; j++) {
      const para = document.createElement('p');
      para.textContent = connections2[j].toString();
      div.appendChild(para);
    }
  }
}
