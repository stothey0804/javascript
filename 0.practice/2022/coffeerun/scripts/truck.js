// coffee run truck 을 위한 모든 기능 제공.
// createOrder, deliveryOrder, printOrder 
// IIFE
((window) => {
    'use strict';
    let App = window.App || {};

    class Truck {
        constructor(truckId, db) {
            this.truckId = truckId;
            this.db = db;
        }
        createOrder(order) {
            console.log(`${order.emailAddress} 고객의 주문을 추가합니다.`);
            this.db.add(order.emailAddress, order.coffee);
        }
        deliveryOrder(customerId) { // 주문처리
            console.log(`${customerId}의 주문이 도착했습니다.`);
            this.db.remove(customerId);
        }
        // function prototype 설정으로 정의할 경우, 함수에 bind this를 걸어야한다.
        printOrders() {
            const customerIdArray = Object.keys(this.db.getAll);
            console.log(`Truck #${this.truckId} 주문대기 목록\n`);
            customerIdArray.forEach((id) => {
                console.log(this.db.get(id));
            });
        }
    }

    // global 변수에 연결 
    App.Truck = Truck;
    window.App = App;
})(window);



