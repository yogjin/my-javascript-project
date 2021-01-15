//패스트푸드점 api
const API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

$(function(){
	$('.btn-search').click(function(){
		$.get(API_URL, {}, function(data){
			//defalut로 json -> js오브젝트로 변환해준다
			//data는 list:array, total:Number 로 구성됨
			let list = data.list;//addr,name
			let total = data.total;
			
			$('.total').html('총' + total + '개의 패스트푸드점을 찾았습니다.');
			
			let $list = $('.list');
			
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
				$elem.find('.item-addr').html(item.total);
				
				//3. 목록에 복제한 템플릿을 추가한다.
				$list.append($elem);
			}
		});
	});
});