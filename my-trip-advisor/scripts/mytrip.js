let map
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";//지도에 나타난 각 여행지의 라벨
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
		
		let pos={
			lat:myTrip.x,
			lng:myTrip.y
		}
		let $item = $('#mytrip-item-template').clone().removeAttr('id');
		$item.find('.item-name').html(labels[i]+"."+myTrip.name);
		$item.find('.item-city-name').html(myTrip.cityName);
		$list.append($item);
		
		//지도에 마커 보여주기
		let marker = new google.maps.Marker({
			position:pos,
			map: map,
			label: labels[i]
		});
		bounds.extend(pos);
	}
	map.fitBounds(bounds);
}