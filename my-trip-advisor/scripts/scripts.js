$(function(){
	//스크롤을 내렸을때 헤더의 색을 바꾸어서 가독성을 높임
	$(window).scroll(function(){
		let top = $(window).scrollTop();//현재 브라우저 창의 '상하 스크롤값'을 구해줌
		
		if(top > 0) $('#header').addClass('inverted');//사용자가 스크롤을 내린상태
		else $('#header').removeClass('inverted');
	});
});