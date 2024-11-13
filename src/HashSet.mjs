export default class HashSet {
  #loadFactor;
  #capacity;
  #size;
  #buckets;

  constructor(loadFactor = 0.75, capacity = 16) {
    this.#loadFactor = loadFactor;
    this.#capacity = capacity;
    this.#size = 0;
    this.clear();
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  resize() {
    const oldBuckets = this.#buckets;
    this.#size = 0;
    this.#capacity *= 2;
    this.clear();
    oldBuckets.forEach((bucket, i) => {
      bucket.forEach(([k]) => {
        this.set(k);
      });
    });
  }

  set(key) {
    const index = this.hash(key);
    let replace = false;
    const bucket = this.#buckets[index];
    bucket.forEach(([k], index) => {
      if (k === key) {
        bucket.splice(index, 1, [key]);
        replace = true;
        return;
      }
    });
    if (!replace) {
      bucket.push([key]);
      this.#size++;
    }
    if (this.#size / this.#capacity > this.#loadFactor) {
      this.resize();
    }
  }

  get(key) {
    let val = null;
    const index = this.hash(key);
    const bucket = this.#buckets[index];
    bucket.forEach(([k]) => {
      if (k === key) {
        val = k;
        return;
      }
    });
    return val;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.#buckets[index];
    if (bucket.length > 0) {
      return true;
    }
    return false;
  }

  remove(key) {
    let removed = false;
    if (this.has(key)) {
      const index = this.hash(key);
      const bucket = this.#buckets[index];
      bucket.forEach(([k], i) => {
        if (k === key) {
          bucket.splice(i, 1);
          removed = true;
          this.#size--;
          return;
        }
      });
    }
    return removed;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#buckets = Array(this.#capacity)
      .fill(null)
      .map(() => []);
  }

  keys() {
    const arr = [];

    this.#buckets.forEach((bucket) => {
      bucket.forEach(([k]) => arr.push(k));
    });
    return arr;
  }

  log() {
    console.log(this.#buckets);
  }
}
