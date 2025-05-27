class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  head = null;

  append(value, current = this.head) {
    if (this.head == null) {
      this.prepend(value);
      return;
    }
    if (current.nextNode == null) {
      current.nextNode = new Node(value);
      return value;
    }
    return this.append(value, current.nextNode);
  }

  prepend(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return value;
    }
    this.head = new Node(value, this.head);
  }

  size(total = 1, current = this.head) {
    if (this.head == null) return 0;
    if (current.nextNode === null) return total;
    return this.size((total = total + 1), current.nextNode);
  }

  heads() {
    return this.head;
  }

  tail(current = this.head) {
    if (current.nextNode === null) return current;
    return this.tail(current.nextNode);
  }

  at(index, currentIndex = 0, currentNode = this.head) {
    if (index === currentIndex) return currentNode;
    if (currentNode.nextNode === null && index > currentIndex)
      return "out of range";

    return this.at(
      index,
      (currentIndex = currentIndex + 1),
      currentNode.nextNode
    );
  }

  pop(prev = null, current = this.head) {
    if (current.nextNode === null) {
      prev.nextNode = null;
      return this.size();
    }
    return this.pop(current, current.nextNode);
  }
  contains(value, current = this.head) {
    if (current.value === value) return true;
    if (current.nextNode == null) return false;
    return this.contains(value, current.nextNode);
  }

  find(value, currentIndex = 0, currentNode = this.head) {
    if (currentNode.value === value) return currentIndex;
    if (currentNode.nextNode === null) return "cant find the value: " + value;
    return this.find(
      value,
      (currentIndex = currentIndex + 1),
      currentNode.nextNode
    );
  }
  toString(current = this.head, stringifiedList = "") {
    if (current === null) return stringifiedList + null;
    return this.toString(
      current.nextNode,
      stringifiedList + `(${current.value}) => `
    );
  }

  insertAt(
    value,
    index,
    currentIndex = 0,
    prevNode = null,
    currentNode = this.head
  ) {
    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (currentIndex === index) {
      prevNode.nextNode = new Node(value, currentNode);
      return;
    }

    if (index > currentIndex && currentNode === null) {
      console.error("index is out of range");

      return console.error("Index out of bounds");
    }
    return this.insertAt(
      value,
      index,
      currentIndex + 1,
      currentNode,
      currentNode.nextNode
    );
  }

  removeAt(index, currentIndex = 0, prevNode = null, currentNode = this.head) {
    if (index === 0) {
      this.head = currentNode.nextNode;
      return;
    }
    if (currentIndex === index) {
      prevNode.nextNode = currentNode.nextNode;
      return;
    }

    if (index > currentIndex && currentNode.nextNode === null) {
      return console.error(
        "Index out of bounds. Please enter an existing index"
      );
    }

    return this.removeAt(
      index,
      currentIndex + 1,
      currentNode,
      currentNode.nextNode
    );
  }
}
