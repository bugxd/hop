class Innovation {
  constructor(config) {
    this.innovation = 0;
  }

  getNext() {
    this.innovation = this.innovation +1;
    return this.innovation;
  }
}

const innovation = new Innovation();
