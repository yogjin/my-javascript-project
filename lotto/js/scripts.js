let list = [];//로또 번호를 담는 array

//array에 번호 담기
for(let i = 1; i <= 45; i++){
	list.push(i);
}

let result = [];//뽑힌 번호가 들어갈 배열
for(let i = 0; i < 6; i++){
	let index = Math.floor((Math.random()*list.length));//array에서 삭제할 랜덤 index
	//0 <= Math.random() < 1 
	//소수점을 없애기 위해 Math.floor()
	
	let num = list.splice(index,1);//index로 부터 1개 추출 == index값 추출
	result.push(num);
}

//html화면에 출력
for(let i = 0; i < 6; i++){
	document.write('<span class="ball">'+result[i]+'</span>');
}
