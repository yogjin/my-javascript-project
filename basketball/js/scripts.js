let comScore = 0;
let comPercent2 = 0.5;//2점슛 성공확률
let comPercent3 = 0.33;//3점슛 성공확률
let userScore = 0;
let userPercent2 = 0.5;
let userPercent3 = 0.33;
let isComputerTurn = true;
let shotsLeft = 15;

function onComputerShoot(){
	//컴퓨터의 차례가 아니면 바로 리턴
	if(!isComputerTurn){
		return;
	}
	//컴퓨터 슛 확률 설정
	updateAI();
	//슛 타입결정 : 2,3점슛 각각 50%확률로 쏜다 
	let shootType = Math.random() < 0.5 ? 2 : 3;
	if(shootType === 2){//2점슛
		if(Math.random() < comPercent2){
			//2점슛 50%확률로 성공
			showText('컴퓨터가 2점슛을 성공했습니다!');
			updateComputerScore(2);
		}
		else{
			//실패시
			showText('컴퓨터가 2점슛을 실패했습니다.');
		}
	}
	else{//3점슛
		if(Math.random() < comPercent3){
			//3점슛 33%확률로 성공
			showText('컴퓨터가 3점슛을 성공했습니다!');
			updateComputerScore(3);
		}
		else{
			//실패시
			showText('컴퓨터가 3점슛을 실패했습니다.');
		}
	}
	isComputerTurn = false;//유저로 턴넘기기
	
	
	//컴퓨터가 슛한 후 버튼 비활성화
	disableComputerButtons(true);
	//유저 슛 버튼 활성화
	disableUserButtons(false);
}

function onUserShoot(shootType){
	//컴퓨터 차례면 리턴
	if(isComputerTurn){
		return;
	}
	if(shootType === 2){//2점슛
		if(Math.random() < comPercent2){
			//2점슛 50%확률로 성공
			showText('2점슛을 성공했습니다!');
			updateUserScore(2);
		}
		else{
			//실패시
			showText('2점슛을 실패했습니다.');
		}
	}
	else{//3점슛
		if(Math.random() < comPercent3){
			//3점슛 33%확률로 성공
			showText('3점슛을 성공했습니다!');
			updateUserScore(3);
		}
		else{
			//실패시
			showText('3점슛을 실패했습니다.');
		}
	}
	isComputerTurn = true;//컴퓨터로 턴넘기기
	
	
	//컴퓨터가 슛한 후 버튼 비활성화
	disableUserButtons(true);
	//컴퓨터 슛 버튼 활성화
	disableComputerButtons(false);
	
	//남은 슛 횟수 차감
	let shotsLeftElem = document.getElementById('shots-left');
	shotsLeft--;
	shotsLeftElem.innerHTML = shotsLeft;
	
	//경기가 끝난 경우 
	if(shotsLeft === 0){
		//모든 버튼 비활성화.
		disableUserButtons(true);
		disableComputerButtons(true);
		//승,무,패 각각의 경우
		if(userScore > comScore){//유저가 이긴경우
			showText('승리했습니다!');
		}
		else if(userScore === comScore){//비긴경우
			showText('비겼습니다.');
		}
		else{//유저가 진 경우
			showText('졌습니다..');
		}
	}
}

//text출력 함수
function showText(s){
	let textElem = document.getElementById('text');
	textElem.innerHTML = s;
}

//컴퓨터 점수 갱신
function updateComputerScore(score){
	comScore += score;
	let comScoreElem = document.getElementById('computer-score');
	comScoreElem.innerHTML = comScore;
}

//유저 점수 갱신
function updateUserScore(score){
	userScore += score;
	let userScoreElem = document.getElementById('user-score');
	userScoreElem.innerHTML = userScore;
}

//컴퓨터버튼 비활성화/활성화 : flag
function disableComputerButtons(flag){
	let computerButtons = document.getElementsByClassName('btn-computer');
	
	for(let i = 0; i < computerButtons.length; i++){
		computerButtons[i].disabled = flag;
	}
}

//유저버튼 비활성화/활성화 : flag
function disableUserButtons(flag){
	let userButtons = document.getElementsByClassName('btn-user');
	
	for(let i = 0; i < userButtons.length; i++){
		userButtons[i].disabled = flag;
	}
}

//게임 상황에 맞는 확률 적용(ai개선)
function updateAI() {
	var diff = userScore - comScore;

	if (diff > 10) {
		comPercent2 = 0.7;
		comPercent3 = 0.43;
	} 
	else if (diff > 6) {
    	comPercent2 = 0.6;
    	comPercent3 = 0.38;
  	} 
	else if (diff < -10) {
    	comPercent2 = 0.3;
    	comPercent3 = 0.23;
  	} 
	else if (diff < -6) {
    	comPercent2 = 0.4;
    	comPercent3 = 0.28;
  }
}