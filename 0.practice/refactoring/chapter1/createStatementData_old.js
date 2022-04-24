// 공연료 계산기 클래스 -> 다형성 구현
// 생성자 대신 팩터리 함수
function createPerformanceCalculator(aPerformence, aPlay) {
    // 장르 별 생성
    switch(aPlay.type) {
    case 'tragedy': return new TragedyCalcuator(aPerformence, aPlay);
    case 'comedy': return new ComedyCalcuator(aPerformence, aPlay);
    default:
        throw new Error(`알 수 없는 장르: ${aPlay.type}`);
    }
}

class TragedyCalcuator extends PerformanceCalculator { 
    // amount 함수 분리 
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
 }
class ComedyCalcuator extends PerformanceCalculator { 
    get amount() {
        let result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 50 * (this.performance.audience - 20);
                }
        result += 300 * this.performance.audience;
        return result;
    }
    get volumeCredit() {
        return super.volumeCredit + Math.floor(this.performance.audience / 5);
    }
 }


class PerformanceCalculator {
    constructor(aPerformence, aPlay) {
        this.performance = aPerformence;
        this.play = aPlay;
    }

    // 항목 id 조회
    get play() {
        return plays[this.performance.playID];
    }
    // 개별 항목 금액 계산
    get amount() {
        throw new Error('서브클래스에서 처리하도록 설계함');
        // let result = 0;
        // switch (this.play.type) {
        //     case "tragedy":
        //         result = 40000;
        //         if (this.performance.audience > 30) {
        //             result += 1000 * (this.performance.audience - 30);
        //         }
        //         break;
        //     case "comedy":
        //         result = 30000;
        //         if (this.performance.audience > 20) {
        //             result += 10000 + 50 * (this.performance.audience - 20);
        //         }
        //         result += 300 * this.performance.audience;
        //         break;
        //     default:
        //         throw new Error(`알 수 없는 장르: ${this.play.type}`);
        // }
        // return result;
    }
    // 개별 적립금 
    get volumeCredit() { 
        return Math.max(this.performance.audience - 30, 0);
        // let result = 0
        // result += Math.max(this.performance.audience - 30, 0);
        // if ("comedy" === this.play.type);
        //     result += Math.floor(this.performance.audience / 5);
        // return result;
    }

}

// statement data set
export default function createStatementData(invoice, plays) {
    const result = {} 
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance); // 원본 수정 방지, 데이터 가공
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);

    return result;

    // 개별 데이터 시 복사 수행
    function enrichPerformance (aPerformence) {
        const calculator = createPerformanceCalculator(aPerformence, playFor(aPerformence)); // 공연료 계산기 만들기!
        const result = Object.assign({}, aPerformence); // 얕은 복사 
        // result.play = playFor(result); 
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredit = calculator.volumeCredit;
        // result.amount = amountFor(result);
        // result.volumeCredit = volumeCreditsFor(result);
        return result;
    }

    // 항목 id 조회
    function playFor(aPerformence) {
        return plays[aPerformence.playID];
    }
    // // 개별 항목 금액 계산
    // function amountFor(aPerformence) {
    //     return new PerformanceCalculator(aPerformence, playFor(aPerformence)).amount;
    //     // let result = 0;
    //     // switch (aPerformence.play.type) {
    //     //     case "tragedy":
    //     //         result = 40000;
    //     //         if (aPerformence.audience > 30) {
    //     //             result += 1000 * (aPerformence.audience - 30);
    //     //         }
    //     //         break;
    //     //     case "comedy":
    //     //         result = 30000;
    //     //         if (aPerformence.audience > 20) {
    //     //             result += 10000 + 50 * (aPerformence.audience - 20);
    //     //         }
    //     //         result += 300 * aPerformence.audience;
    //     //         break;
    //     //     default:
    //     //         throw new Error(`알 수 없는 장르: ${aPerformence.play.type}`);
    //     // }
    //     // return result;
    // }
    // // 개별 적립금 
    // function volumeCreditsFor(aPerformence) { 
    //     return PerformanceCalculator(aPerformence, playFor(aPerformence)).volumeCredit;
    //     // let result = 0
    //     // result += Math.max(aPerformence.audience - 30, 0);
    //     // if ("comedy" === aPerformence.play.type);
    //     //     result += Math.floor(aPerformence.audience / 5);
    //     // return result;
    // }

    // 총 금액
    function totalAmount(data) {
        return data.performances.reduce( (total, p) => total += p.amount, 0 );
    }
    // 총 적립금
    function totalVolumeCredits(data) {
        return data.performances.reduce( (total, p) => total += p.volumeCredit, 0);
    }
}