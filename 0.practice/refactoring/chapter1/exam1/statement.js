import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
    return renderPlainText(createStatement(invoice, plays));
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
