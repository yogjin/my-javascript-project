$(function(){
	//스크롤을 내렸을때 헤더의 색을 바꾸어서 가독성을 높임
	$(window).scroll(function(){
		let top = $(window).scrollTop();//현재 브라우저 창의 '상하 스크롤값'을 구해줌
		
		if(top > 0) $('#header').addClass('inverted');//사용자가 스크롤을 내린상태
		else $('#header').removeClass('inverted');
	});
	
	$(window).trigger('scroll');
	
	let dpFrom = $('#from').datepicker({
		dateFormat: 'yy-mm-dd',
		minDate:0,//0: 오늘 1: 내일 -1: 어제
		onSelect : function(){//dpTo(종료날짜)를 시작날짜보다 전으로 설정하지 못하게 했다
			dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
		}
	});
	dpFrom.datepicker('setDate',new Date());//new Date() == 오늘 날짜 == 0
	
	let dpTo = $('#to').datepicker({
		dateFormat: 'yy-mm-dd',
		minDate: 0
	});
	dpTo.datepicker('setDate', 4);//3박 4일 여행 권장. 초기값
	
	//검색기능
	function search(from, to){
		let url = 'https://javascript-basic.appspot.com/searchLocation';
		
		$.get(url, {
			from: from,
			to: to
		}, function(data){
			let name = data.name;
			let cityName = data.cityName;
			console.log(data);
		});
	}
	
	//검색버튼을 클릭했을 때
	$('#form-search').submit(function(e){//submit은 <form>태그에서만 호출가능하다
		let from = $('#from').val();
		let to = $('#to').val();
		
		search(from, to);
	});
});