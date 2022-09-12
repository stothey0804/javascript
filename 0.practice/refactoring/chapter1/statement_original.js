function statment(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("es-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;

        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }

                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 50 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${play.type}`);
        }

        // 포인트 적립
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 희극 5명 마다 추가 포인트
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // 청구 내역 출력
        result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`
        totalAmount += thisAmount;
    }
    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredits}점`;
    return result;
}

// 1. 청구내역을 html로 출력해야할 경우 고려
// 2. 연극 장르와, 공연료 정책이 달라질 때마다 함수를 수정해야함.

// 리팩터링은 다음에 변경시 코드 구조가 바뀌는 일이 없도록 하기 위해 필요하다.