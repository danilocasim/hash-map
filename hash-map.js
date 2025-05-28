import { LinkedList } from "./linked-list.js";

class HashMap {
  capacity = 16;
  loadFactor = 0.75;

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

    if (this.capacity * this.loadFactor < this.length()) {
      this.capacity *= 2;
      const tempHash = new HashMap();

      this.keys().forEach((key, index) => {
        tempHash.set(key, this.buckets.values()[index]);
      });

      console.log(tempHash);
      this.buckets = [...tempHash.buckets];
    }
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

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (bucket.heads() !== null) {
      if (bucket.containsKey(key)) {
        const listIndex = bucket.findKey(key);
        bucket.removeAt(listIndex);
        return true;
      }
    }
    return false;
  }

  length(total = 0, currentIndex = 0, buckets = this.buckets) {
    if (currentIndex === buckets.length) return total;

    if (buckets[currentIndex].heads !== null) {
      return this.length(
        total + buckets[currentIndex].size(),
        currentIndex + 1,
        this.buckets
      );
    }
    return this.length(total, currentIndex + 1, this.buckets);
  }

  clear() {
    return (this.buckets = [...new HashMap().buckets]);
  }

  keys(allKeys = [], currentIndex = 0, buckets = this.buckets) {
    if (currentIndex === buckets.length) return allKeys;
    allKeys.push(...buckets[currentIndex].arrKeys());
    return this.keys(allKeys, currentIndex + 1, this.buckets);
  }

  values(allValues = [], currentIndex = 0, buckets = this.buckets) {
    if (currentIndex === buckets.length) return allValues;
    allValues.push(...buckets[currentIndex].arrValues());
    return this.values(allValues, currentIndex + 1, this.buckets);
  }

  entries(allKeysValues = [], currentIndex = 0, buckets = this.buckets) {
    if (currentIndex === buckets.length) return allKeysValues;
    allKeysValues.push(...buckets[currentIndex].arrKeysValues());
    return this.entries(allKeysValues, currentIndex + 1, this.buckets);
  }
}

const test = new HashMap(); // or HashMap() if using a factory

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("fro3g", "green");
test.set("gradpe", "purple");
test.set("gradpe", "purple");
test.set("graddwpe", "purple");
test.set("gradwdpe", "purple");

test.set("haw3t", "black");
test.set("hawd3t", "black");
test.set("m3oon", "q23w");
test.set("elephant", "t0ete");
console.log(test.get("elephant"));
console.log(test.length());
console.log(test);
