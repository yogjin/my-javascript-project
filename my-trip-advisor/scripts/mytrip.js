let map
$(function(){
	let myTrips = Cookies.getJSON("MYTRIPS");
	
	if(!myTrips){
		myTrips = []
	}
	showMap();
	let bounds = new google.maps.LatLngBounds();
	let $list = $('#mytrip-list');

	for(let i = 0; i < myTrips.length; i++){
		let myTrip = myTrips[i];
		
		let pos={
			lat:myTrip.x,
			lng:myTrip.y
		}
		let $item = $('#mytrip-item-template').clone().removeAttr('id');
		$item.find('.item-name').html(myTrip.name);
		$item.find('.item-city-name').html(myTrip.cityName);
		$list.append($item);
		
		//지도에 마커 보여주기
		let marker = new google.maps.Marker({
			position:pos,
			map: map
		});
		bounds.extend(pos);
	}
	map.fitBounds(bounds);
});

//지도 보여주기
function showMap(){
	map = new google.maps.Map(document.getElementById('map'),{
		zoom:12,
	});
}