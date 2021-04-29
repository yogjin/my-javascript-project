let map
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";//지도에 나타난 각 여행지의 라벨
let markers = {};//여행지의 마커를 담는 오브젝트

$(function(){
	showMap();
	makeMyTripList();
});

//지도 보여주기
function showMap(){
	map = new google.maps.Map(document.getElementById('map'),{
		zoom:12,
	});
}
//마이트립 리스트 만들기
function makeMyTripList(){
	let myTrips = Cookies.getJSON("MYTRIPS");
	
	if(!myTrips){
		myTrips = []
	}
	let bounds = new google.maps.LatLngBounds();
	let $list = $('#mytrip-list');

	for(let i = 0; i < myTrips.length; i++){
		let myTrip = myTrips[i];
		let id = myTrip.id //현재 여행지의 id값
		let pos={
			lat:myTrip.x,
			lng:myTrip.y
		}
		//지도에 마커 보여주기
		let marker = new google.maps.Marker({
			position:pos,
			map: map,
			label: labels[i]
		});
		//마커저장
		markers[id] = marker;
		
		let $item = $('#mytrip-item-template').clone().removeAttr('id');
		$item.find('.item-name').html(labels[i]+"."+myTrip.name);
		$item.find('.item-city-name').html(myTrip.cityName);
		$item.find('.item-remove').click(function(){////클릭한 엘리먼트 지우기
			$(this).closest('.mytrip-item').remove();
			markers[id].setMap(null);
			markers[id] = null;
			myTrips = removeFromList(myTrips,id);
			Cookies.set('MYTRIPS',myTrips);
		});
		$list.append($item);
		
		bounds.extend(pos);
	}
	map.fitBounds(bounds);
}
//삭제할 여행지 엘리먼트 쿠키에서 지우기
function removeFromList(list,id){
	for(let i = 0; i < list.length; i++){
		if(list[i].id === id){
			list.splice(i,1);
			break;
		}
	}
	return list;
}