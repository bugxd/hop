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
    this.parent1.addNode(NodeTypeOutput);
    this.parent1.addNode(NodeTypeHidden);

    this.parent1.addConnection(1, 4, 1, true);
    this.parent1.addConnection(2, 4, 2, false);
    this.parent1.addConnection(3, 4, 3, true);
    this.parent1.addConnection(2, 5, 4, true);
    this.parent1.addConnection(5, 4, 5, false);

    this.parent2 = this.parent1.copy();

    this.parent2.addNode(NodeTypeHidden);
    this.parent2.addConnection(5, 6, 5, true);
    this.parent2.addConnection(6, 4, 6, true);

    this.parent1.addConnection(1, 5, 7, true);

    this.parent2.addConnection(3, 5, 8, true);
    this.parent2.addConnection(1, 6, 9, true);

    this.child = this.crossOver(this.parent2, this.parent1);

    console.log(this.compatibility(this.parent1, this.parent2));

    this.show();
  }

  /**
  * parent1: Genome
  * parent2: Genome
  */
  compatibility(parent1, parent2) {
    const pIA1 = parent1.getInnovationsArray();
    const pIA2 = parent2.getInnovationsArray();

    const p1Last = pIA1[pIA1.length -1];
    const p2Last = pIA2[pIA2.length -1];

    // matching Weight Sum
    var p1MWS = 0;
    var p2MWS = 0;
    var matching = 0;
    var disjoint = 0;
    var excess = 0;

    // count and delete exess genes
    if(p1Last > p2Last) {
      var i = -1;
      var done = false;
      const length = pIA1.length;
      while(!done){
        i++;
        if(pIA1[i] > p2Last){
          done = true;
        }
      }
      console.log(i);
      pIA1.splice(i);

      excess = length - pIA1.length;
    }

    if(p1Last < p2Last) {
      var i = -1;
      var done = false;
      const length = pIA2.length;
      while(!done){
        i++;
        if(pIA2[i] > p1Last){
          done = true;
        }
      }
      pIA2.splice(i);

      excess = length - pIA2.length;
    }

    var i = 0;
    for(i; i< pIA1.length; i++) {
      if(!!pIA2.find(n => n === pIA1[i])){
        matching += 1;
        const con1 = parent1.getConnectionByInnovation(pIA1[i]);
        const con2 = parent2.getConnectionByInnovation(pIA1[i]);
        if(con1 !== null) {
            p1MWS += con1.getWeight();
        }

        if(con2 !== null) {
            p2MWS += con2.getWeight();
        }
      } else {
        disjoint += 1;
      }
    }

    disjoint += pIA2.length - matching;

    return disjoint + excess + ((p1MWS/matching)-(p2MWS/matching));
  }


  /**
  * parent1: Genome
  * parent2: Genome
  */
  crossOver(parent1, parent2) {
    var i = 0;
    var nodes = [];

    var nodes1 = parent1.getNodes();
    var nodes2 = parent2.getNodes();

    for(i;  i < nodes1.length; i++) {
      if(parent2.containsNode(nodes1[i].getInnovation())) {
        // connected
        if(Math.random() >= 0.5) {
          // parent1
          nodes.push(nodes1[i]);
        } else {
          // parent2
          nodes.push(nodes2[i]);
        }
      } else {
        // disjoint or excess
        nodes.push(nodes1[i]);
      }
    }

    var j = 0;
    var connections = [];

    var connections1 = parent1.getConnections();
    var connections2 = parent2.getConnections();

    for(j;  j < connections1.length; j++) {
      if(parent2.containsConnection(connections1[j].getInnovation())) {
        // connected
        if(Math.random() >= 0.5) {
          // parent1
          connections.push(connections1[j]);
        } else {
          // parent2
          connections.push(connections2[j]);
        }
      } else {
        // disjoint or excess
        connections.push(connections1[j]);
      }
    }

    return new Genome(nodes.length, nodes, connections);
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

    const paraC = document.createElement('p');
    paraC.textContent = paraC.textContent + "-----------------------------------------------------------";
    div.appendChild(paraC);

    const nodesC = this.child.getNodes();
    var i = 0;
    for(i; i<nodesC.length; i++) {;
      const para = document.createElement('p');
      para.textContent = para.textContent + nodesC[i].toString();
      div.appendChild(para);
    }

    const connectionsC = this.child.getConnections();
    var j = 0;
    for(j; j<connectionsC.length; j++) {
      const para = document.createElement('p');
      para.textContent = connectionsC[j].toString();
      div.appendChild(para);
    }
  }
}
