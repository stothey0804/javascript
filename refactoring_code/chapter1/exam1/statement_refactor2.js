function statment(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    
    for(let perf of invoice.performances){
        // 1. play 변수 제거
        // const play = playFor(perf);
        // let thisAmount = amountFor(perf, playFor(perf));    // 변수 인라인
        // let thisAmount = amountFor(perf);    // 매개변수 삭제
        // 2. thisAmount 변수도 인라인으로 변경한다.

        volumeCredits += Math.max(perf.audience - 30, 0);
        if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience/5);

        result += `${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`
        totalAmount += amountFor(perf);
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점`;
    return result;
}

// play 변수 제거하기
function playFor(aPerformence){
    return plays[aPerformence.playID];
}
// 매개변수에서 play 삭제 
function amountFor(aPerformence){
    let result = 0; 
    switch(playFor(perf).type){
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
            throw new Error(`알 수 없는 장르: ${playFor(perf).type}`);
    }
    return result;
}

// 지역 변수를 제거하면 추출 작업이 쉬워진다.
