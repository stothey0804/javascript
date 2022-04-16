import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
    return renderHtml(createStatement(invoice, plays));
}
// render
function renderHtml(data) {
    let result = `<h1>청구내역 (고객명: ${data.customer}</h1>\n`;
    result += `<table>\n`;
    result += `<tr><th>연극</th><th>좌석수</th><th>금액</th></tr>\n`;
    for (let perf of data.performances) {
        result += `<tr><td>${perf.play.name}</td><td>${usd(perf.amount)}</td><td>${perf.audience}석</td></tr>\n`
    }
    result += `</table>\n`;
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}점</em></p>\n`;
    return result;
}

function renderPlainText(data) { 
    let result = `청구내역 (고객명: ${data.customer})\n`;

    for (let perf of data.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`
    }

    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점`;
    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("es-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
}