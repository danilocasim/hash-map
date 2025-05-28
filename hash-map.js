import { LinkedList } from "./linked-list.js";

class HashMap {
  capacity = 16;
  loadFactor = 0.8;

  constructor() {
    this.buckets = [];
    for (let i = 0; i < this.capacity; i++) this.buckets.push(new LinkedList());
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (this.buckets[index].heads() !== null) {
      if (this.buckets[index].containsKey(key)) {
        const listIndex = this.buckets[index].findKey(key);
        this.buckets[index].removeAt(listIndex);
        this.buckets[index].insertAt({ key, value }, listIndex);
        return;
      }
    }
    this.buckets[index].append({ key, value });
    return this.buckets;
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket.heads() !== null) {
      if (bucket.containsKey(key)) {
        const listIndex = bucket.findKey(key);
        const list = bucket.at(listIndex);
        return list.value.value;
      }
    }
    return null;
  }

  has(key, currentIndex = 0, buckets = this.buckets) {
    if (currentIndex === buckets.length) return false;
    const bucket = buckets[currentIndex];
    if (bucket.heads() !== null) {
      if (bucket.containsKey(key)) return true;
    }
    return this.has(key, currentIndex + 1, this.buckets);
  }
}

const hash = new HashMap();
hash.set("kewy", "value");
hash.set("kewy", "tite");
hash.set("kewy", "eaeea");
hash.set("TITE", 23);
hash.set("danilo", "casim");
hash.set("ke32wy", "tite");
hash.set("kew23y", "pepe");
hash.set("e2g43c23", "lol");
hash.set("danieelo2", "cereasim");
hash.set("dko", "ddokdok");
hash.set("f3r4d", "ddokdok3f3f");
hash.set("fe", "3343r");
console.log(hash.has("fe"));
