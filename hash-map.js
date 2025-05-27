class HashMap {
  capacity = 16;
  loadFactor = 0.8;

  constructor() {
    this.bucket = [];
    for (let i = 0; i < this.capacity; i++) {
      this.bucket.push("tite");
    }
  }
}

console.log(new HashMap());
