class HashMap {
    constructor(loadFactor = 0.75, initialCapacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }

    hash(key) {
        if (typeof key !== 'string') {
            throw new Error('Keys must be strings');
        }

        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        
        return hashCode;
    }

    _checkIndex(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error('Trying to access index out of bounds');
        }
    }

    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    set(key, value) {
        const index = this.hash(key);
        this._checkIndex(index);

        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this._resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        this._checkIndex(index);

        const bucket = this.buckets[index];
        for (const [storedKey, value] of bucket) {
            if (storedKey === key) {
                return value;
            }
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);
        this._checkIndex(index);

        return this.buckets[index].some(([storedKey]) => storedKey === key);
    }
}