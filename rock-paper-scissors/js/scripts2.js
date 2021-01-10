const SCISSORS = '가위';
const ROCK = '바위';
const PAPER = '보';

//가위,바위,보 버튼 클릭 시 결과보여줌
function onButtonClick(userInput){//userInput === 가위,바위,보
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
	let result = '컴퓨터: ' + comInput;//결과 출력string
	if(userInput === SCISSORS){//유저 : 가위
		if(comInput === SCISSORS) result += '\n컴퓨터와 비겼습니다.';
		else if(comInput === ROCK) result += '\n컴퓨터에게 졌습니다..';
		else result += '\n컴퓨터에게 이겼습니다!';
	}
	else if(userInput === ROCK){//유저 : 바위
		if(comInput === SCISSORS) result += '\n컴퓨터에게 이겼습니다!';
		else if(comInput === ROCK) result += '\n컴퓨터와 비겼습니다.';
		else result += '\n컴퓨터에게 졌습니다..';
	}
	else{//유저 : 보
		if(comInput === SCISSORS) result += '\n컴퓨터에게 졌습니다..';
		else if(comInput === ROCK) result += '\n컴퓨터에게 이겼습니다!';
		else result += '\n컴퓨터와 비겼습니다.';
	}
	alert(result);//결과 출력
}