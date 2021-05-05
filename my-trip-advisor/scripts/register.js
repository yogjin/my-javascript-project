$(function(){
	//출생년도 생성
	generateYears($('#sel-birth'));
	let birthSelect = $('#sel-birth').selectmenu();
	//셀렉트박스 스크롤 설정
	birthSelect.selectmenu('menuWidget').addClass('overflow');
	
	$('#form-register').submit(function(e){
		e.preventDefault();
		//회원가입 창의 경고문 감추기 -> 필요할 때만 보이기
		$(this).find('.txt-warning').empty().hide();
		
		let email = $('#inp-email').val();
		
		//이메일 로직체크
		if(!validateEmail(email)){
			$('#inp-email').next().html('잘못된 형식 입니다.').show();
			return;
		}
		//비밀번호 로직체크
		let password = $('#inp-password').val();
		if(!validatePassword(password)){
			$('#inp-password').next().html('특수문자와 숫자가 포함된 최소 8자의 문자열이어야 합니다.').show();
			return;
		}
		//성별 로직체크
		let gender = $('input[name="gender"]:checked').val();
		if(!gender){
			$('.div-gender').children('.txt-warning').html('필수 항목입니다.').show();
			return;
		}
		//출생년도 로직체크
		let birth = $('#sel-birth').val();
		if(!birth){
			$('#sel-birth').siblings('.txt-warning').html('필수 항목입니다.').show();
			return;
		}
		//개인정보 제공동의여부 체크
		let accept = $('#inp-accept:checked').val();
		if(!accept){
			$('#inp-accept').siblings('.txt-warning').html('필수 항목입니다.').show();
			return;
		}
		//서버로 폼 전송
		submit(email,password,gender,birth);
	});
	//비밀번호 확인란 로직 체크(실시간)
	$('#inp-confirm').keyup(function(e){
		if($(this).val() !== $('#inp-password').val()){
			$(this).next().html('비밀번호가 일치하지 않습니다.').show();
			return;
		}
		else{
			$(this).next().empty().hide();
			return;
		}
	});
	//돌아가기 버튼
	$('#btn-back').click(function(){
		location.replace('index.html');
	});
});

function validateEmail(email) {
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email); // 형식에 맞는 경우 true 리턴	
}

function validatePassword(password){
	let re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
	return re.test(password);
}
//출생년도 선택
function generateYears($select){
	for(let i = 1970; i <= 2021; i++){
		$select.append('<option value="'+i+'">'+i+'</option>');
	}
}
//서버로 회원가입 폼 전송
function submit(email,password,gender,birth){
	let params ={
		email: email,
		password: password,
		gender: gender,
		birth: birth
	};
	$.post('some-api-url',params,function(r){
		console.log(r);
		alert('회원가입이 완료되었습니다!');
	});
}