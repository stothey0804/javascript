import Coupon from './extend.js';
class FlashCoupon extends Coupon {
    constructor(price, expiration) {
        super(price);
        this.expiration = expiration || '2시간';
        this.discount = 0.2;
    }
    getExpirationMessage() {
        return `깜짝 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
    }
    isRewardEligible(user) {
        return super.isRewardEligible(user) && this.price > 20;
    }
}

export { FlashCoupon };

const flash = new FlashCoupon(10);
console.log(flash.getPriceText());
console.log(flash.getExpirationMessage());
