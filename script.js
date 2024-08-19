class Node {
  constructor(key, value, nextNode = null) {
    this[key] = value;
    this.nextNode = nextNode;
  }
}

class HashMap {
  capacity = 16;
  size = 0;
  loadfactor = 0.75;
  threshold = this.capacity * this.loadfactor;
  buckets = new Array(this.capacity).fill(null);

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    let node = new Node(key, value);
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    let current = this.buckets[index];

    if (!current) {
      this.buckets[index] = node;
    } else if (this.buckets[index][key]) this.buckets[index][key] = value;
    else {
      while (current.nextNode && !current.nextNode[key]) {
        current = current.nextNode;
      }

      if (!current.nextNode) {
        current.nextNode = node;
      } else current.nextNode[key] = value;
    }
    this.size = this.length();
    this.checkGrowth();
  }

  get(key) {
    let index = this.hash(key);
    let current = this.buckets[index];
    if (current) {
      while (!current[key]) current = current.nextNode;
      if (current[key]) return current[key];
      else return null;
    } else return null;
  }

  has(key) {
    let index = this.hash(key);
    let current = this.buckets[index];
    if (current) {
      while (!current[key] && current.nextNode) current = current.nextNode;
      if (current[key]) return true;
      else return false;
    } else return false;
  }

  remove(key) {
    let index = this.hash(key);
    let current = this.buckets[index];
    let prev;
    if (current) {
      if (current[key]) {
        this.buckets[index] = current.nextNode;
        this.size = this.length();
        return true;
      } else {
        while (current.nextNode && !current[key]) {
          prev = current;
          current = current.nextNode;
        }

        if (current[key]) {
          prev.nextNode = current.nextNode;
          this.size = this.length();
          return true;
        } else return false;
      }
    } else return false;
  }

  length() {
    let length = 0;
    for (let i = 0; i <= this.buckets.length; i++) {
      let current = this.buckets[i];
      if (current) {
        length++;
        while (current.nextNode) {
          length++;
          current = current.nextNode;
        }
      }
    }
    return length;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    let keys = [];
    for (let i = 0; i <= this.buckets.length; i++) {
      let current = this.buckets[i];
      if (current) {
        while (current) {
          keys.push(Object.keys(current)[0]);
          current = current.nextNode;
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i <= this.buckets.length; i++) {
      let current = this.buckets[i];
      if (current) {
        while (current) {
          values.push(Object.values(current)[0]);
          current = current.nextNode;
        }
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let i = 0; i <= this.buckets.length; i++) {
      let current = this.buckets[i];
      if (current) {
        while (current) {
          let [key, value] = Object.entries(current)[0];
          entries.push([key, value]);
          current = current.nextNode;
        }
      }
    }
    return entries;
  }

  checkGrowth() {
    if (this.size >= this.threshold) {
      console.log(this);
      this.capacity = this.capacity * 2;
      this.threshold = this.capacity * this.loadfactor;
      let entriesCopy = this.entries();
      this.clear();
      entriesCopy.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
    return;
  }
}

let pop = new HashMap("map");
pop.set("Lisa", "high");
pop.set("John", "low");

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
