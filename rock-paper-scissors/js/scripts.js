let userInput = prompt('가위, 바위, 보!');

//사용자의 입력 검증하기
if(userInput !== '가위' && userInput !== '바위' && userInput !== '보'){
	alert('가위, 바위, 보 중 하나를 입력해야 합니다!');
} 
else{
	let comInput;

	//Math.random()은 0부터 1 사이의 임의의 값을 리턴함.
	let rnd = Math.random();

	/*
	0이상 0.33미만 : 가위
	0.33이상 0.66미만 : 바위
	0.66이상 1미만 : 보
	*/

	if(rnd < 0.33){//가위
		comInput = '가위';
	}
	else if(rnd < 0.66){
		comInput = '바위';
	}
	else{
		comInput = '보';
	}
	
	//가위,바위,보 게임의 승패 정하기
	if(userInput === '가위'){
		if(comInput === '가위') alert('컴퓨터: ' + comInput + '\n컴퓨터와 비겼습니다.');
		else if(comInput === '바위') alert('컴퓨터: ' + comInput + '\n컴퓨터에게 졌습니다..');
		else alert('컴퓨터: ' + comInput + '\n컴퓨터에게 이겼습니다!');
	}
}

