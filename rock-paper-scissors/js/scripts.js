const SCISSORS = '가위';
const ROCK = '바위';
const PAPER = '보';

let userInput = prompt('가위, 바위, 보!');

//사용자의 입력 검증하기
if(userInput !== SCISSORS && userInput !== ROCK && userInput !== PAPER){
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
		comInput = SCISSORS;
	}
	else if(rnd < 0.66){
		comInput = ROCK;
	}
	else{
		comInput = PAPER;
	}
	
	//가위,바위,보 게임의 승패 정하기
	if(userInput === SCISSORS){//유저 : 가위
		if(comInput === SCISSORS) alert('컴퓨터: ' + comInput + '\n컴퓨터와 비겼습니다.');
		else if(comInput === ROCK) alert('컴퓨터: ' + comInput + '\n컴퓨터에게 졌습니다..');
		else alert('컴퓨터: ' + comInput + '\n컴퓨터에게 이겼습니다!');
	}
	else if(userInput === ROCK){//유저 : 바위
		if(comInput === SCISSORS) alert('컴퓨터: ' + comInput + '\n컴퓨터에게 이겼습니다!');
		else if(comInput === ROCK) alert('컴퓨터: ' + comInput + '\n컴퓨터와 비겼습니다.');
		else alert('컴퓨터: ' + comInput + '\n컴퓨터에게 졌습니다..');
	}
	else{//유저 : 보
		if(comInput === SCISSORS) alert('컴퓨터: ' + comInput + '\n컴퓨터에게 졌습니다..');
		else if(comInput === ROCK) alert('컴퓨터: ' + comInput + '\n컴퓨터에게 이겼습니다!');
		else alert('컴퓨터: ' + comInput + '\n컴퓨터와 비겼습니다.');
	}
}

