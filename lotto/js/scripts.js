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
/*
//오름차순 정렬
function compare(a,b){
	return a-b;
}
//compare을 인자로 : 함수 자체를 전달해서 sort()가 알아서 비교함수를 실행하도록 한 것.compare()은 return값을 전달한다.
result.sort(compare);
*/

//익명함수 활용해서 정렬
result.sort(function(a,b){
	return a-b;
});
//html화면에 출력
for(let i = 0; i < 6; i++){
	document.write('<span class="ball">'+result[i]+'</span>');
}
