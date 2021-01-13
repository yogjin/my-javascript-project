function onComputerShoot(){
	//슛 타입결정 : 2,3점슛 각각 50%확률로 쏜다 
	let shootType = Math.random() < 0.5 ? 2 : 3;
	let textElem = document.getElementById('text');
	if(shootType === 2){//2점슛
		if(Math.random() < 0.5){
			//2점슛 50%확률로 성공
			textElem.innerHTML = '컴퓨터가 2점슛을 성공했습니다!';
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
		}
		else{
			//실패시
			textElem.innerHTML = '컴퓨터가 3점슛을 실패했습니다.';
		}
	}
}