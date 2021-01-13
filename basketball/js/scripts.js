let comScore = 0;
let userScore = 0;
let isComputerTurn = true;
let shotsLeft = 15;

function onComputerShoot(){
	//컴퓨터의 차례가 아니면 바로 리턴
	if(!isComputerTurn){
		return;
	}
	//슛 타입결정 : 2,3점슛 각각 50%확률로 쏜다 
	let shootType = Math.random() < 0.5 ? 2 : 3;
	let textElem = document.getElementById('text');
	let comScoreElem = document.getElementById('computer-score');
	if(shootType === 2){//2점슛
		if(Math.random() < 0.5){
			//2점슛 50%확률로 성공
			textElem.innerHTML = '컴퓨터가 2점슛을 성공했습니다!';
			comScore += 2;
		}
		else{
			//실패시
			textElem.innerHTML = '컴퓨터가 2점슛을 실패했습니다.';
		}
	}
	else{//3점슛
		if(Math.random() < 0.33){
			//3점슛 33%확률로 성공
			textElem.innerHTML = '컴퓨터가 3점슛을 성공했습니다!';
			comScore += 3;
		}
		else{
			//실패시
			textElem.innerHTML = '컴퓨터가 3점슛을 실패했습니다.';
		}
	}
	comScoreElem.innerHTML = comScore;
	isComputerTurn = false;//유저로 턴넘기기
	
	let computerButtons = document.getElementsByClassName('btn-computer');
	//컴퓨터가 슛한 후 버튼 비활성화
	for(let i = 0; i < computerButtons.length; i++){
		computerButtons[i].disabled = true;
	}
	let userButtons = document.getElementsByClassName('btn-user');
	//유저 슛 버튼 활성화
	for(let i = 0; i < userButtons.length; i++){
		userButtons[i].disabled = false;
	}
}

function onUserShoot(shootType){
	//컴퓨터 차례면 리턴
	if(isComputerTurn){
		return;
	}
	let textElem = document.getElementById('text');
	let userScoreElem = document.getElementById('user-score');
	if(shootType === 2){//2점슛
		if(Math.random() < 0.5){
			//2점슛 50%확률로 성공
			textElem.innerHTML = '2점슛을 성공했습니다!';
			userScore += 2;
		}
		else{
			//실패시
			textElem.innerHTML = '2점슛을 실패했습니다.';
		}
	}
	else{//3점슛
		if(Math.random() < 0.33){
			//3점슛 33%확률로 성공
			textElem.innerHTML = '3점슛을 성공했습니다!';
			userScore += 3;
		}
		else{
			//실패시
			textElem.innerHTML = '3점슛을 실패했습니다.';
		}
	}
	userScoreElem.innerHTML = userScore;
	isComputerTurn = true;//컴퓨터로 턴넘기기
	
	let userButtons = document.getElementsByClassName('btn-user');
	//컴퓨터가 슛한 후 버튼 비활성화
	for(let i = 0; i < userButtons.length; i++){
		userButtons[i].disabled = true;
	}
	let computerButtons = document.getElementsByClassName('btn-computer');
	//컴퓨터의 슛 버튼 비활성화
	for(let i = 0; i < computerButtons.length; i++){
		computerButtons[i].disabled = false;
	}
	
	//남은 슛 횟수 차감
	let shotsLeftElem = document.getElementById('shots-left');
	shotsLeft--;
	shotsLeftElem.innerHTML = shotsLeft;
	
	//경기가 끝난 경우 
	if(shotsLeft === 0){
		//모든 버튼 비활성화.
		for(let i = 0; i < userButtons.length; i++){
			userButtons[i].disabled = true;
		}
		for(let i = 0; i < computerButtons.length; i++){
			computerButtons[i].disabled = true;
		}
		//승,무,패 각각의 경우
		if(userScore > comScore){//유저가 이긴경우
			textElem.innerHTML = '승리했습니다!';
		}
		else if(userScore === comScore){//비긴경우
			textElem.innerHTML = '비겼습니다.';
		}
		else{//유저가 진 경우
			textElem.innerHTML = '졌습니다..';
		}
	}
}
