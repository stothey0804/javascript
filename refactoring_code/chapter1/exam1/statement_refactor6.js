function statment(invoice, plays){
    
    let result = `청구내역 (고객명: ${invoice.customer})\n`;
    
    for(let perf of invoice.performances){
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`
    }

    // 1~2. 반복문 분리 및 변수 슬라이드
    // let totalAmount = 0;
    // for(let perf of invoice.performances){
    //     totalAmount += amountFor(perf);
    // }

    result += `총액: ${usd(totalAmount())}\n`;  // 변수 인라인 
    result += `적립 포인트: ${totalVolumeCredits()}점`; 
    return result;
}

// 3. 함수 추출
function totalAmount(){
    let result = 0;
    for(let perf of invoice.performances){
        result += amountFor(perf);
    }
    return result;
}

function totalVolumeCredits(){
    let result = 0;
    for(let perf of invoice.performances){
        result += volumeCreditsFor(perf);
    }
    return result;
}

function usd(aNumber){
    return new Intl.NumberFormat("es-US", 
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100); 
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

