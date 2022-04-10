function statment(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    
    for(let perf of invoice.performances){
        const play = plays[perf.playID];
        // 1. 가격 계산 부분 분리
        let thisAmount = amountFor(perf, play);

        volumeCredits += Math.max(perf.audience - 30, 0);
        if("comedy" === play.type) volumeCredits += Math.floor(perf.audience/5);

        result += `${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점`;
    return result;
}
// Switch문 추출
function amountFor(aPerformence, play){
    let result = 0; 
    switch(play.type){
        case "tragedy":
            result = 40000;
            if(aPerformence.audience > 30){
                result += 1000 * (aPerformence.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if(aPerformence.audience > 20){
                result += 10000 + 50 * (aPerformence.audience - 20);
            }
            result += 300 * aPerformence.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    return result;
}

// 추출한 함수에 쓰이는 파라미터, 변수 등은 명확한 이름으로 변경한다.
// 매개변수의 역할이 뚜렷하지 않을 경우 부정관사(a/an)를 붙이는 방법을 쓴다.
