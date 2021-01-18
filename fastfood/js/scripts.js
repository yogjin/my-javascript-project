//패스트푸드점 api
const API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';
/*
인자이름		  타입	  	디폴트값	  설명
page			number		1			페이지 번호
perPage			number		10			한 페이지에 표시될 항목 갯수
searchKeyword	string		''			검색 키워드
*/	
$(function(){
	$('.btn-search').click(function(){
		let searchKeyword = $('#txt-search').val();
		
		search(1,10,searchKeyword);
	});
	
	//검색창에서 엔터를 누르면 검색하기
	$('#txt-search').on('keypress',function(e){
	if(e.keyCode === 13){
		//강제로 클릭이벤트 발생
		$('.btn-search').trigger('click');
	}
	});
});

//검색 함수
function search(page, perPage, searchKeyword){
	if(typeof page !== 'number' || page < 1){
		page = 1;
	}
	
	if(typeof perPage !== 'number' || perPage <= 0){
		perPage = 10;
	}
	
	$.get(API_URL, {
		page: page,
		perPage: perPage,
		searchKeyword: searchKeyword
	}, function(data){
		//defalut로 json -> js오브젝트로 변환해준다
		//data는 list:array, total:Number 로 구성됨
		let list = data.list;//addr,name
		let total = data.total;
			
		$('.total').html('총' + total + '개의 패스트푸드점을 찾았습니다.');
			
		let $list = $('.list').empty();
		
		for(let i = 0; i < list.length; i++){
			//각 item 하나하나마다 DOM 객체를 만들어서 $list에 추가한다.
			let item = list[i];
				
			//1. 템플릿을 복제한다.
			let $elem = $('#item-template')
				.clone()
				.removeAttr('id');
				
			//2. 복제한 템플릿에 데이터를 세팅한다.
			$elem.find('.item-no').html(i+1);
			$elem.find('.item-name').html(item.name);
			$elem.find('.item-addr').html(item.addr);
				
			//3. 목록에 복제한 템플릿을 추가한다.
			$list.append($elem);
		}
		
		showPaging(page, perPage, total, searchKeyword);
	});
}

//페이징 함수
function showPaging(page, perPage, total, searchKeyword){
	let $paging = $('.paging').empty();
	
	let numPages = 5;//한 화면에 보여질 숫자의 개수
	let pageStart = Math.floor((page - 1) / numPages) * numPages + 1;//처음 나타나는 페이지
	let pageEnd = pageStart + numPages - 1;//마지막 페이지
	let totalPages = Math.floor((total - 1) / perPage) + 1;
	
	if(pageEnd > totalPages) pageEnd = totalPages;
	
	//이전 페이징 만들기
	let prevPage = pageStart - 1;
	if(prevPage < 1) prevPage = 1;
	
	let $prevElem = $('<a href="javascript:search(' + prevPage + ',' + perPage + ',\'' + searchKeyword +'\')">' + "이전" + '</a>');
	$prevElem.addClass('prev');
	$paging.append($prevElem);
	
	//숫자 페이징 만들기
	for(let i = pageStart; i <= pageEnd; i++){
		//페이징 엘리먼트 만들기
		//i에 해당하는 페이지 search
		let $elem = $('<a href="javascript:search(' + i + ',' + perPage + ',\'' + searchKeyword +'\')">' + i + '</a>');
		
		if(i === page){
			//현재페이지와 같으면 current class를 부여해서 css로 글씨를 진하게해준다
			$elem.addClass('current');
		}
		
		$paging.append($elem);
	}
	
	//다음 페이징 만들기
	let nextPage = pageEnd + 1;
	if(nextPage > totalPages) nextPage = totalPages;
	
	let $nextElem = $('<a href="javascript:search(' + nextPage + ',' + perPage + ',\'' + searchKeyword +'\')">' + "다음" + '</a>');
	$nextElem.addClass('next');
	$paging.append($nextElem);
}