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
		//여행지 등록하기
		$('.btn-register').click(function(){
			let myTrips = Cookies.getJSON('MYTRIPS');//MYTRIPS : 저장할 쿠키의 이름
			
			//기존 저장 쿠키가 없을 경우 빈 배열로 초기화
			if(!myTrips){
				myTrips = []
			}
			//여행지목록를 표시하기 위한 정보: id,여행지 이름,도시명,좌표
			myTrips.push({
				id: id,
				name: r.name,
				cityName: r.cityName,
				x: r.position.x,
				y: r.position.y
			});
			//배열을 다시 쿠키에 저장(알아서 JSON.stringfy 해준다)
			Cookies.set('MYTRIPS',myTrips);
			alert('여행지가 등록되었습니다!')
		});
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