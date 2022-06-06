class Coupon {
    constructor(price, expiration) {
        this.price = price;
        this.expiration = expiration || '2주';
        this.discount = 0.1;
    }
    getPriceText() {
        return `$ ${this.price}`;
    }
    getExpirationMessage() {
        return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
    }
    isRewardEligible(user) {
        return user.rewardEligible && user.active;
    }
    getRewards(user) {
        if(this.isRewardEligible(user)) {
            this.price = this.price * (1 - this.discount);
        }
    }
}

export default Coupon;