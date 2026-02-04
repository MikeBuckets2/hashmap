class HashMap {
    constructor(loadFactor = 0.75, initialCapacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    }
}