let map;

$(function(){
	let id = parseId(window.location.search);
	
	getDetail(id);
});

//url에서 인자(id) 뽑아내기
function parseId(str){
	let s = str.substring(1);//?id=2 -> id=2
	
	let args = s.split('&');
	
	for(let i = 0; i < args.length; i++){
		let arg = args[i];
		let tokens = arg.split('=');
		
		if(tokens[0] == 'id'){
			return tokens[1];
		}
	}
}
//
function getDetail(id){
	let url = 'https://javascript-basic.appspot.com/locationDetail';
	
	$.getJSON(url,{
		id: id
	}, function(r){
		$('.detail-header-name').html(r.name);
		$('.detail-header-city-name').html(r.cityName);
		$('.detail-desc-text').html(r.desc);
		
		let $gallery = $('#detail-images');
		let images = r.subImageList;
		
		for(let i = 0; i < images.length; i++){
			let $image = $('<img src="'+images[i]+'"/>');
			$gallery.append($image);
		}
		
		//galleria라이브러리 테마 불러온 후 적용.
		Galleria.loadTheme('libs/galleria/themes/azur/galleria.azur.min.js');
		Galleria.run('#detail-images');
		//지도호출
		showMap(r.position.x,r.position.y);
	});
}
//지도 보여주기
function showMap(lat,lng){
	map = new google.maps.Map(document.getElementById('map'),{
		zoom:12,
		center:{
			lat:lat,
			lng:lng
		}
	});
	//지도에 마커 보여주기
	let marker = new google.maps.Marker({
		position:{
			lat:lat,
			lng:lng
		},
		map: map
	});
}