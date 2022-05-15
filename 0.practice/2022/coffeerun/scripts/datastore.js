// IIFE
((window) => {
    'use strict';
    let App = window.App || {};

    class DataStore {
        // email - key, order - value 형태 
        constructor() {
            this.data = {};
        }
        get getAll() {
            return this.data;
        }
        get(key) {
            return this.data[key];
        }
        add(key, val) {
            this.data[key] = val;
        }
        remove(key){
            delete this.data[key];
        }
    }
    // global 변수에 연결 
    App.DataStore = DataStore;
    window.App = App;
})(window);

