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