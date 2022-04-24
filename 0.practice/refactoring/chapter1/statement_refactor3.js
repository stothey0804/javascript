function statment(invoice, plays){
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;
    
    for(let perf of invoice.performances){
        // 적립 포인트 계산 추출
        volumeCredits += volumeCreditsFor(perf);
    
        result += `${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`
        totalAmount += amountFor(perf);
    }
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점`;
    return result;
}

function volumeCreditsFor(aPerformence){
    let result = 0
    result += Math.max(aPerformence.audience - 30, 0);
    if("comedy" === playFor(aPerformence).type)
        result += Math.floor(aPerformence.audience/5);
    return result;
}

function playFor(aPerformence){
    return plays[aPerformence.playID];
}

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

