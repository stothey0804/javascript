// 날짜,시간 기준으로 element 변경 시 사용 
// var instance = new dateCheck(2022051800); // 2022년 5월 18일 0시 기준 -> 서버 타임을 사용하기 위해
// instance.setPeriod(2022052000, 2022053023); // 2022.5.20 00 ~ 2022.5.30 23
// if (instance.isOver) { ... }

function dateCheck(_now){
    // 10 자리 정수 ex: 2022051011
    this.now = this.init(_now);
    this.startDate = 0;
    this.endDate = 0;

    // 현재 날짜 세팅
    dateCheck.prototype.init = function(_now){
        if (typeof _now !== 'undefined' && this.checkFormat(_now)) {
            return _now;
        } else {
            return this.dateToInt(new Date());
        }
    }
    // 시작, 종료일 세팅
    dateCheck.prototype.setPeriod = function (_start, _end) {
        this.startDate = this.checkFormat(_start) ? _start : -1;
        this.endDate = this.checkFormat(_end) ? _end : -1;
    }
    // 조건 체크 (실제로 인스턴스를 만들어서 조건처리 하는 부분)
    dateCheck.prototype.isOver = function() {
        var start_over = this.startDate == -1 || this.now > this.startDate;
        var end_over = this.endDate == -1 || this.now <= this.endDate;
        return start_over && end_over;
    }
    // etc
    dateCheck.prototype.checkFormat = function(_date) {
        return _date.toString().replace(/[^0-9]/g, '').length == 10 ? true : false;
    }

    dateCheck.prototype.dateToInt = function(_date) {
        if (_date instanceof Date == false) {
            return -1;
        }
        var year = _date.getFullYear().toString();
        var month = pad(_date.getMonth() + 1).toString();
        var date = pad(_date.getDate()).toString();
        var hour = _date.getHours().toString();

        return parseInt(year + month + date + hour);

        function pad(n) { return n > 9 ? n : '0'+n ; }
    }
}

// backup erb code

// var changeShortCut = function() {
//     var now = <%= Time.now.strftime("%Y%m%d%H").to_i %>;
//     var change_date = 2022051811;
//     if (now >= change_date) {
//         var targetEl = document.getElementById('shortcutFirst');
//         var change_attr = {
//             'text': 'GOLF',
//             'link': '<%= "/events/32572?ref=#{section_prefix}short_menu-1" %>',
//             'class': 'golf',
//         }
//         targetEl.setAttribute('href', change_attr.link);
//         targetEl.classList.remove('topbag');
//         targetEl.classList.add('class', change_attr.class);
//         targetEl.innerText = change_attr.text;
//     }
// }