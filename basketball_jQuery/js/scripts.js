//컴퓨터 오브젝트
let computer = {
	score: 0,
	percent2: 0.5,
	percent3: 0.33
};
//사용자 오브젝트
let user = {
	score: 0,
	percent2: 0.5,
	percent3: 0.33
};
//게임 오브젝트
let game = {
	isComputerTurn: true,
	shotsLeft: 15
};

function onComputerShoot(){
	//컴퓨터의 차례가 아니면 바로 리턴
	if(!game.isComputerTurn){
		return;
	}
	//컴퓨터 슛 확률 설정
	updateAI();
	//슛 타입결정 : 2,3점슛 각각 50%확률로 쏜다 
	let shootType = Math.random() < 0.5 ? 2 : 3;
	if(Math.random() < computer['percent'+shootType]){
		showText('컴퓨터가 ' + shootType + "점슛을 성공했습니다!");
		updateComputerScore(shootType);
	}
	else{
		showText('컴퓨터가 ' + shootType + "점슛을 실패했습니다.");
	}
	
	game.isComputerTurn = false;//유저로 턴넘기기
	
	
	//컴퓨터가 슛한 후 버튼 비활성화
	disableComputerButtons(true);
	//유저 슛 버튼 활성화
	disableUserButtons(false);
}

function onUserShoot(shootType){
	//컴퓨터 차례면 리턴
	if(game.isComputerTurn){
		return;
	}
	if(Math.random() < user['percent'+shootType]){
		showText(shootType + '점슛을 성공했습니다!');
		updateUserScore(shootType);
	}
	else{
		showText(shootType + '점슛을 실패했습니다!');
	}
	
	game.isComputerTurn = true;//컴퓨터로 턴넘기기
	
	
	//컴퓨터가 슛한 후 버튼 비활성화
	disableUserButtons(true);
	//컴퓨터 슛 버튼 활성화
	disableComputerButtons(false);
	
	//남은 슛 횟수 차감
	let $shotsLeftElem = $('#shots-left');
	game.shotsLeft--;
	$shotsLeftElem.html(game.shotsLeft);
	
	//경기가 끝난 경우 
	if(game.shotsLeft === 0){
		//모든 버튼 비활성화.
		disableUserButtons(true);
		disableComputerButtons(true);
		//승,무,패 각각의 경우
		if(user.score > computer.score){//유저가 이긴경우
			showText('승리했습니다!');
		}
		else if(user.score === computer.score){//비긴경우
			showText('비겼습니다.');
		}
		else{//유저가 진 경우
			showText('졌습니다..');
		}
	}
}

//text출력 함수
function showText(s){
	let $textElem = $('#text');
	//나타났다가 사라지는 효과 적용
	/*
	fadeOut,fadeIn 함수는 비동기함수라서 콜백 함수를 인자로 받아서 사용한다.
	비동기 함수 : 제어권을 다음코드에 넘겨주고 일처리는 그 이후에 이어서 수행하는 함수
	콜백 함수 : 호출자가 비동기 함수를 호출할 때 
			  '네가 알아서 일을 하다가 다 끝나면 내가 준 이 함수(콜백함수)를 실행시켜줘'
			  라며 인자로 전달하는 함수
	*/
	$textElem.fadeOut(400, function(){
		$textElem.html(s);
		$textElem.fadeIn();
	});
}

//컴퓨터 점수 갱신
function updateComputerScore(score){
	computer.score += score;
	let $comScoreElem = $('#computer-score');
	$comScoreElem.html(computer.score);
	$comScoreElem.animateNumber({ number: computer.score });
}

//유저 점수 갱신
function updateUserScore(score){
	user.score += score;
	let $userScoreElem = $('#user-score');
	$userScoreElem.html(user.score);
	$userScoreElem.animateNumber({ number: user.score });
}

//컴퓨터버튼 비활성화/활성화 : flag
function disableComputerButtons(flag){
	/*jQuery로 셀렉트한 결과에 prop()를 호출하면 
	  셀렉트된 모든 엘리먼트에 대해 각각 함수를 실행한다.
	*/
	$('.btn-computer').prop('disabled',flag);
}

//유저버튼 비활성화/활성화 : flag
function disableUserButtons(flag){
	$('.btn-user').prop('disabled',flag);
}

//게임 상황에 맞는 확률 적용(ai개선)
function updateAI() {
	var diff = user.score - computer.score;

	if (diff > 10) {
		computer.percent2 = 0.7;
		computer.percent3 = 0.43;
	} 
	else if (diff > 6) {
    	computer.percent2 = 0.6;
    	computer.percent3 = 0.38;
  	} 
	else if (diff < -10) {
    	computer.percent2 = 0.3;
    	computer.percent3 = 0.23;
  	} 
	else if (diff < -6) {
    	computer.percent2 = 0.4;
    	computer.percent3 = 0.28;
  }
}