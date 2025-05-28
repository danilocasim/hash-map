import { LinkedList } from "./linked-list.js";

class HashMap {
  loadFactor = 0.75;

  constructor(capacity = 16) {
    this.capacity = capacity;
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
    const bucket = this.buckets[index];
    if (bucket.heads() !== null) {
      if (bucket.containsKey(key)) {
        const listIndex = bucket.findKey(key);
        bucket.removeAt(listIndex);
        bucket.insertAt({ key, value }, listIndex);
        return;
      }
    }
    bucket.append({ key, value });

    // expand capacity
    if (this.capacity * this.loadFactor < this.length()) {
      this.capacity *= 2;
      const tempHash = new HashMap(this.capacity);

      this.keys().forEach((key, index) => {
        tempHash.set(key, this.values()[index]);
      });

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
    this.capacity = 16;
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

test.set("moon", "silver");
test.set("notebook", "blue");
test.set("orange", "orange");
test.set("pencil", "yellow");
test.set("quilt", "multicolor");
test.set("rose", "red");
test.set("sun", "yellow");
test.set("tree", "green");
test.set("umbrella", "purple");
test.set("violin", "brown");
test.set("water", "blue");
test.set("xylophone", "rainbow");
test.set("yarn", "pink");
test.set("zebra", "black and white");
test.set("anchor", "navy");
test.set("ball", "red");
test.set("cloud", "white");
test.set("drum", "red");
test.set("eagle", "brown");
test.set("feather", "white");
test.set("gem", "blue");
test.set("hat", "gray");
test.set("igloo", "white");
test.set("jungle", "green");
test.set("key", "gold");
test.set("lamp", "yellow");
test.set("mirror", "silver");
test.set("nest", "brown");
test.set("ocean", "blue");
test.set("palm", "green");
test.set("quartz", "pink");
test.set("robot", "gray");
test.set("star", "white");
test.set("tiger", "orange");
test.set("unicorn", "white");
test.set("vase", "blue");
test.set("window", "clear");
test.set("x-ray", "black and white");
test.set("yak", "brown");
test.set("zeppelin", "gray");
test.set("avocado", "green");
test.set("beet", "red");
test.set("cucumber", "green");
test.set("daisy", "white");
test.set("ember", "red");
test.set("flamingo", "pink");
test.set("giraffe", "yellow");
test.set("honey", "gold");
test.set("game", "ml");
console.log(test.length());

console.log(test.entries());
console.log(test.has("moon"));
console.log(test);
