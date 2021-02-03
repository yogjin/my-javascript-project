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
		}, function(r){
			let $list = $('#list-panel');
			
			//배열의 요소인 객체를 하나씩 createListItem에 넘긴다.
			for(let i = 0; i < r.length; i++){
				let data = r[i];
				let $item = createListItem(data);
				
				$list.append($item);
			}
			//숨겨뒀던 list-bg 엘리먼트를 화면에 보이게함
			$('#list-bg').show();
		});
	}
	
	//검색버튼을 클릭했을 때
	$('#form-search').submit(function(e){//submit은 <form>태그에서만 호출가능하다
		event.preventDefault();//페이지 이동 없이 폼의 내용을 전송한다(submit의 기본동작을 수행하지 않는다)
		
		let from = $('#from').val();
		let to = $('#to').val();
		
		search(from, to);
	});
	
	//템플릿을 이용해 목록 엘리먼트에 들어갈 항목 생성
	function createListItem(data){
		let $tmpl = $('#list-item-template').clone().removeAttr('id');
		
		$tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
		$tmpl.find('.list-item-name').html(data.name);
		$tmpl.find('.list-item-city').html(data.cityName);
		
		$tmpl.click(function(e){
			let url = 'detail.html?id=' + data.id;
			window.location = url;
		});
		
		return $tmpl;
	}
});