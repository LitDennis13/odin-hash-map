class Node {
    constructor(key,value,next=null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(key, value) {
        this.head = new Node(key,value);
    }

    add(key,value) {
        let pointer = this.head;
        while (pointer.next !== null) {
            pointer = pointer.next;
        }
        pointer.next = new Node(key,value);
    }
    get(key) {
        let pointer = this.head;
        while (pointer !== null) {
            if (pointer.key === key) {
                return pointer.value;
            }
            pointer = pointer.next;
        }
        return null;
    }
    has(key) {
        let pointer = this.head;
        while (pointer !== null) {
            if (pointer.key === key) {
                return true;
            }
            pointer = pointer.next;
        }
        return false;
    }
    remove(key) {
        let pointer = this.head;
        if (pointer.key === key) {
            this.head = pointer.next;
            return true;
        }
        while (pointer !== null) {
            if (pointer.next.key === key) {
                pointer.next = pointer.next.next;
                return true;
            }
            pointer = pointer.next;
        }
        return false;
    }
    length() {
        let length = 0;
        let pointer = this.head;
        while (pointer !== null) {
            length++;
            pointer = pointer.next;
        }
        return length;
    }
    keys() {
        let keysArray = [];
        let pointer = this.head;
        while (pointer !== null) {
            keysArray.push(pointer.key);
            pointer = pointer.next;
        }
        return keysArray;
    }
    values() {
        let valuesArray = [];
        let pointer = this.head;
        while (pointer !== null) {
            valuesArray.push(pointer.value);
            pointer = pointer.next;
        }
        return valuesArray;
    }
    KVpairs() {
        let kvPairsArray = [];
        let pointer = this.head;
        while (pointer !== null) {
            kvPairsArray.push([pointer.key,pointer.value]);
            pointer = pointer.next;
        }
        return kvPairsArray;
    }
}

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.bucketsAmount = 16;
        this.bucketsArray = [];
        this.makeBuckets(true);
        
    }
    checkBucketsArrayLoad() {
        let emptyBuckets = 0;
        
        for (let i = 0; i < this.bucketsAmount;i++) {
            if (this.bucketsArray[i] === "None") {
                emptyBuckets++;
            }
        }
        if ((this.bucketsAmount-emptyBuckets) >= (this.bucketsAmount*this.loadFactor)) {
            return true;
        }
        return false;
    }

    makeBuckets(firstTime=false) {
        if (firstTime) {
            this.bucketsArray = [];
            this.bucketsAmount = 16;
            for (let i = 0; i < this.bucketsAmount; i++) {               this.bucketsArray.push("None");
            }
            return
        }
        if (this.checkBucketsArrayLoad()) {
            let newBucketsArray = [];
            this.bucketsAmount += 4;
            for (let i = 0; i < this.bucketsAmount; i++) {               newBucketsArray.push("None");
            }
            for (let i = 0; i < this.bucketsArray.length;i++) {
                newBucketsArray[i] = this.bucketsArray[i];
            }
            this.bucketsArray = newBucketsArray;
        }
            
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%16;
        }
        return hashCode;
    }

    set(key,value) {
        this.makeBuckets();
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            this.bucketsArray[hashMapIndex] = new LinkedList(key,value);
            return;
        }
        this.bucketsArray[hashMapIndex].add(key,value);
        return;
    }
    get(key) {
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            return null;
        }

        let returnValue = this.bucketsArray[hashMapIndex].get(key);
        if (returnValue === null) {
            return null;
        }
        return returnValue;
    }
    has(key) {
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            return false;
        }
        let returnValue = this.bucketsArray[hashMapIndex].get(key);
        if (returnValue === null) {
            return false;
        }
        return true;
    }
    remove(key) {
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            return false;
        }
        this.bucketsArray[hashMapIndex].remove(key);
        if (this.bucketsArray[hashMapIndex].head === null) {
            this.bucketsArray[hashMapIndex] = "None";
        }
        return true;
    }
    length() {
        let totalKeys = 0;
        for (let i = 0; i < this.bucketsArray.length; i++) {
            if (this.bucketsArray[i] === "None") {
                continue;
            }
            totalKeys += this.bucketsArray[i].length();
        }
        return totalKeys;
    }
    
    clear() {
        this.makeBuckets(true);
    }
    
    keys() {
        let keysArray = [];
        for (let i = 0; i < this.bucketsArray.length; i++) {
            if (this.bucketsArray[i] === "None") {
                continue;
            }
            let bucketKeyArray = this.bucketsArray[i].keys();
            for (const key of bucketKeyArray) {
                keysArray.push(key);
            }
        }
        return keysArray;
    }

    values() {
        let valuesArray = [];
        for (let i = 0; i < this.bucketsArray.length; i++) {
            if (this.bucketsArray[i] === "None") {
                continue;
            }
            let bucketValuesArray = this.bucketsArray[i].values();
            for (const value of bucketValuesArray) {
                valuesArray.push(value);
            }
        }
        return valuesArray;
    }

    entries() {
        let entriesArray = [];
        for (let i = 0; i < this.bucketsArray.length; i++) {
            if (this.bucketsArray[i] === "None") {
                continue;
            }
            let bucketEntriesArray = this.bucketsArray[i].KVpairs();
            for (const entries of bucketEntriesArray) {
                entriesArray.push(entries);
            }
        }
        return entriesArray;
    }
}

class HashSet {
    constructor() {
        this.loadFactor = 0.75;
        this.bucketsAmount = 16;
        this.bucketsArray = [];
        this.makeBuckets(true);
        
    }
    checkBucketsArrayLoad() {
        let emptyBuckets = 0;
        
        for (let i = 0; i < this.bucketsAmount;i++) {
            if (this.bucketsArray[i] === "None") {
                emptyBuckets++;
            }
        }
        if ((this.bucketsAmount-emptyBuckets) >= (this.bucketsAmount*this.loadFactor)) {
            return true;
        }
        return false;
    }

    makeBuckets(firstTime=false) {
        if (firstTime) {
            this.bucketsArray = [];
            this.bucketsAmount = 16;
            for (let i = 0; i < this.bucketsAmount; i++) {               this.bucketsArray.push("None");
            }
            return
        }
        if (this.checkBucketsArrayLoad()) {
            let newBucketsArray = [];
            this.bucketsAmount += 4;
            for (let i = 0; i < this.bucketsAmount; i++) {               newBucketsArray.push("None");
            }
            for (let i = 0; i < this.bucketsArray.length;i++) {
                newBucketsArray[i] = this.bucketsArray[i];
            }
            this.bucketsArray = newBucketsArray;
        }
            
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%16;
        }
        return hashCode;
    }

    set(key) {
        this.makeBuckets();
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            this.bucketsArray[hashMapIndex] = new LinkedList(key,"None");
            return;
        }
        this.bucketsArray[hashMapIndex].add(key,"None");
        return;
    }
    get(key) {
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            return null;
        }

        let returnValue = this.bucketsArray[hashMapIndex].get(key);
        if (returnValue === null) {
            return null;
        }
        return "This is a HashSet and contains no values";
    }
    has(key) {
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            return false;
        }
        let returnValue = this.bucketsArray[hashMapIndex].get(key);
        if (returnValue === null) {
            return false;
        }
        return true;
    }
    remove(key) {
        let hashMapIndex = this.hash(key);
        if (this.bucketsArray[hashMapIndex] === "None") {
            return false;
        }
        this.bucketsArray[hashMapIndex].remove(key);
        if (this.bucketsArray[hashMapIndex].head === null) {
            this.bucketsArray[hashMapIndex] = "None";
        }
        return true;
    }
    length() {
        let totalKeys = 0;
        for (let i = 0; i < this.bucketsArray.length; i++) {
            if (this.bucketsArray[i] === "None") {
                continue;
            }
            totalKeys += this.bucketsArray[i].length();
        }
        return totalKeys;
    }
    
    clear() {
        this.makeBuckets(true);
    }
    
    keys() {
        let keysArray = [];
        for (let i = 0; i < this.bucketsArray.length; i++) {
            if (this.bucketsArray[i] === "None") {
                continue;
            }
            let bucketKeyArray = this.bucketsArray[i].keys();
            for (const key of bucketKeyArray) {
                keysArray.push(key);
            }
        }
        return keysArray;
    }
}
