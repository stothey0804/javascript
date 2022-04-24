function statement(invoice, plays) {
    return renderPlainText(createStatement(invoice, plays));
}

// statement data set
function createStatement(invoice, plays) {
    const statementData = {} 
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance); // 원본 수정 방지, 데이터 가공
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;

    // 개별 데이터 시 복사 수행
    function enrichPerformance (aPerformence) {
        const result = Object.assign({}, aPerformence); // 얕은 복사 
        result.play = playFor(result); 
        result.amount = amountFor(result);
        result.volumeCredit = volumeCreditsFor(result);
        return result;
    }
    // 항목 id 조회
    function playFor(aPerformence) {
        return plays[aPerformence.playID];
    }
    // 개별 항목 금액 계산
    function amountFor(aPerformence) {
        let result = 0;
        switch (aPerformence.play.type) {
            case "tragedy":
                result = 40000;
                if (aPerformence.audience > 30) {
                    result += 1000 * (aPerformence.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformence.audience > 20) {
                    result += 10000 + 50 * (aPerformence.audience - 20);
                }
                result += 300 * aPerformence.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${aPerformence.play.type}`);
        }
        return result;
    }
    // 개별 적립금 
    function volumeCreditsFor(aPerformence) { 
        let result = 0
        result += Math.max(aPerformence.audience - 30, 0);
        if ("comedy" === aPerformence.play.type);
            result += Math.floor(aPerformence.audience / 5);
        return result;
    }
    // 총 금액
    function totalAmount(data) {
        return data.performances.reduce( (total, p) => total += p.amount, 0 );
    }
    // 총 적립금
    function totalVolumeCredits(data) {
        return data.performances.reduce( (total, p) => total += p.volumeCredit, 0);
    }
}
// render
function renderPlainText(data) { 
    let result = `청구내역 (고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`
    }

    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점`;
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("es-US",
            { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
    }
}
