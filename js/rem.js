var designWidth=document.getElementsByTagName("head")[0].getAttribute("design-width");

function font_size(devwidth){
    _size();
    
    window.onresize=function(){
        _size();
    };

    function _size() {
        var deviceWidth = document.documentElement.clientWidth;
        if (deviceWidth >= devwidth) deviceWidth = devwidth;
        document.documentElement.style.fontSize = deviceWidth / (devwidth / 100) + 'px';
    };

};

var media = document.createElement('style');
    media.innerHTML = "@media screen and (min-width:" + designWidth + "px){.center{width:"+designWidth+"px !important;margin-left:-"+designWidth/2+"px !important;left:50% !important;}.fixed-right{right:calc((100% - 750px)/2)}}";
  document.getElementsByTagName('head')[0].appendChild(media);

window.onload = font_size(designWidth);