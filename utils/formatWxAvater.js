const formatWxAvater = function(url,size){
	if( !url || !url.split ) return;
    var arr = url.split('/');
    arr[ arr.length - 1 ] = size;
    return arr.join('/');
}
module.exports = formatWxAvater
