// 생년월일 관련 처리 [21.7.8]
// 기존에는 rails 환경에서 date_select 헬퍼를 사용하여 처리하였으나
// 텍스트박스로 변경하여 데이터를 보내게 되는데, 0000-00-00 고정 값으로 보내는 경우의 처리를 작성함.
// jquery 사용이 아쉬움.
// 키 입력시 포맷 지정
$('#user_user_extra_info_attributes_birthday').on('keyup', (e) => {
    e.target.value = birthdayFormat(e.target.value);
});

// 날짜 유효성 체크
$('#user_user_extra_info_attributes_birthday').on('focusout', (e) => {
    let input_date = birthdayFormat(e.target.value);
    let result = false;
    let err_msg;

    if (input_date.length < 10) {
        err_msg = "10자 미만 오류";
    } else {
        let [year, month, day] = input_date.split('-', 3);
        // 월별 존재 일자
        let feb_last_day = ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) ? 29 : 28;
        let list_of_days = [31, feb_last_day, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // 날짜 유효성 체크
        if (isNaN(Date.parse(input_date))) {
            err_msg = `${input_date}, 날짜 유효성 오류`;
        } else if (year > 2010 || year < 1920) {
            err_msg = "출생년도를 다시 확인해주세요.";
        } else if (day > list_of_days[month - 1]) {
            err_msg = "유효하지 않은 날짜입니다.";
        } else {
            result = true;
        }
    }
    // 후처리
    if (result && typeof err_msg == "undefined") {
        console.log(input_date, '성공');
    } else {
        alert(err_msg);
    }
});

// date format
function birthdayFormat(value) {
    // 입력시 자동으로 0000-00-00 포맷으로 바꾸어줌.
    return value.replace(/[^0-9]/g, '').replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}

//////////////////////////////////////////////////////////////
// 추후 다른 레퍼런스로 변경 될 예정 (input number 타입 3분할 후 처리)