/**
 * 模拟实现一个localStrorage
 * setItem, getItem, removeItem, clear
 */
"use strict";
const valuesMap = new Map();
class LocalStrorage {
  getItem(key) {
    const stringKey = String(key);
    if (valuesMap.has(key)) {
      return String(valuesMap.get(stringKey));
    }
    return null;
  }

  setItem(key, val) {
    valuesMap.set(String(key), String(val));
  }

  removeItem(key) {
    valuesMap.delete(key);
  }

  clear() {
    valuesMap.clear();
  }

  key(i) {
    if (arguments.length === 0) {
      throw new TypeError(
        "Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      );
    }
    let arr = Array.from(valuesMap.keys());
    return arr[i];
  }

  get length() {
    return valuesMap.size;
  }
}

const instance = new LocalStrorage();
globalThis.localStorage = new Proxy(instance, {
  set(target, prop, value) {
    if (LocalStrorage.prototype.hasOwnProperty(prop)) {
      instance[prop] = value;
    } else {
      instance.setItem(prop, value);
    }
    return true;
  },

  get(target, prop) {
    if (LocalStrorage.prototype.hasOwnProperty(prop)) {
      return instance[prop];
    }
    if (valuesMap.has(prop)) {
      return instance.getItem(prop);
    }
  },
});

instance.setItem("a", 123);
console.log(instance.getItem("a"));
instance.removeItem("a");
console.log(instance.getItem("a"));
