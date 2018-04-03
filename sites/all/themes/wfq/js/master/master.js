function decryptmail( s, shift ) {
    var n = 0;
    var r = "";
    for( var i = 0; i < s.length; i++ ) {
        n = s.charCodeAt( i );
        if( n >= 8364 ) {
            n = 128;
        }
        r += String.fromCharCode( n - shift );
    }
    return r;
}
function cryptedmail( s ) {
    var mail = decryptmail( s, 2 );
    document.write( '<a href="mailto:' + mail + '">' + mail + '</a>' );
}

var pageTracker = _gat._getTracker( "UA-3649134-1" );
pageTracker._initData();
pageTracker._trackPageview();