$(function(){
	let myTrips = Cookies.getJSON("MYTRIPS");
	
	if(!myTrips){
		myTrips = []
	}
	console.log(myTrips);
	let $list = $('#mytrip-list');
	
	for(let i = 0; i < myTrips.length; i++){
		let myTrip = myTrips[i];
		
		let $item = $('#mytrip-item-template').clone().removeAttr('id');
		$item.find('.item-name').html(myTrip.name);
		$item.find('.item-city-name').html(myTrip.cityName);
		$list.append($item);
	}
	showMap(1,1);
});

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