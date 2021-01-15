//패스트푸드점 api
const API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

$(function(){
	$('.btn-search').click(function(){
		$.get(API_URL, {}, function(data){
			//defalut로 json -> js오브젝트로 변환해준다
			//data는 list:array, total:Number 로 구성됨
			let list = data.list;//addr,name
			let total = data.total;
			
		});
	});
});