function statment(invoice, plays){
    let totalAmount = 0;
    // let volumeCredits = 0;
    let result = `청구내역 (고객명: ${invoice.customer})\n`;
    
    for(let perf of invoice.performances){
        // 1. volumeCredits 누적 부분 - 반복문 쪼개기 
        // volumeCredits += volumeCreditsFor(perf);
    
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`
        totalAmount += amountFor(perf);
    }
    // 2. 변수 선언부 반복문 앞으로 옮기기 - 문장 슬라이드하기
    // let volumeCredits = 0;
    // for(let perf of invoice.performances){
    //     volumeCredits += volumeCreditsFor(perf);
    // } // 3.

    // let volumeCredits = totalVolumeCredits();
    result += `총액: ${usd(totalAmount)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점`; // 4. 변수 인라인
    return result;
}

// 3. volumeCredits 계산부 함수로 추출
function totalVolumeCredits(){
    let volumeCredits = 0;
    for(let perf of invoice.performances){
        volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
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

