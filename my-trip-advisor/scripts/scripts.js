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
		minDate:0//0: 오늘 1: 내일 -1: 어제
	});
	dpFrom.datepicker('setDate',new Date());//new Date() == 오늘 날짜 == 0
	
	let dpTo = $('#to').datepicker({
		dateFormat: 'yy-mm-dd',
		minDate:0
	});
	dpTo.datepicker('setDate', 4);//3박 4일 여행 권장. 초기값
});