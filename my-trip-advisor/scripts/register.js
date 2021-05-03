$(function(){
	//출생년도 생성
	generateYears($('#sel-birth'));
	let birthSelect = $('#sel-birth').selectmenu();
	//셀렉트박스 스크롤 설정
	birthSelect.selectmenu('menuWidget').addClass('overflow');
	
	$('form-register').submit(function(e){
		e.preventDefault();
		//회원가입 창의 경고문 감추기 -> 필요할 때만 보이기
		$(this).find('txt-warning').empty().hide();
		
		let email = $('#inp-email').val();
		
		//경고문보이기
		if(!validateEmail(email)){
			$('#inp-email').next().html('잘못된 형식 입니다.').show();
			return;
		}
	})
});

function validateEmail(email) {
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email); // 형식에 맞는 경우 true 리턴	
}

//출생년도 선택
function generateYears($select){
	for(let i = 1970; i <= 2021; i++){
		$select.append('<option value="'+i+'">'+i+'</option>');
	}
}