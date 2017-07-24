/*browser check*/
var ua = navigator.userAgent.toLowerCase();
var isStrict = document.compatMode == "CSS1Compat",
    isOpera = ua.indexOf("opera") > -1,
    isSafari = (/webkit|khtml/).test(ua),
    isSafari3 = isSafari && ua.indexOf('webkit/5') != -1,
    isIE = !isOpera && ua.indexOf("msie") > -1,
    isIE7 = !isOpera && ua.indexOf("msie 7") > -1,
    isGecko = !isSafari && ua.indexOf("gecko") > -1,
    isBorderBox = isIE && !isStrict,
    isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
    isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
    isAir = (ua.indexOf("adobeair") != -1),
    isLinux = (ua.indexOf("linux") != -1),
    isSecure = window.location.href.toLowerCase().indexOf("https") === 0;

function $$(id){return document.getElementById(id);}
function regButton(pid,funcs){
	if($$(pid)){
		$("#"+pid).find("div").each(function(i,e){
			if($(this).html().indexOf("flash")==-1){
				$(this).addClass("flexbt");
				if($(this).attr("gray")=="yes"){
					$(this).addClass("flexbt_disabled");
				}
				$(this).mouseover(function(){
					if(!$(this).hasClass("flexbt_disabled")){
						if($(this).hasClass("flexbt")){
							$(this).removeClass("flexbt")
						}
						$(this).addClass("flexbt_over");
					}
				});
				$(this).mouseout(function(){
					if(!$(this).hasClass("flexbt_disabled")){
						if($(this).hasClass("flexbt_over")){
							$(this).removeClass("flexbt_over")
						}
						$(this).addClass("flexbt");
					}
				});
				$(this).click(function(){
					if(!$(this).hasClass("flexbt_disabled")){
						if(funcs&&funcs[i]){
							funcs[i](e);
						}
					}
				});
				if(isIE){
					$(this).bind("selectstart",function(){
						return false;
					});
				}
			}else{
				$(this).addClass("flexbt_flash");
			}
		});
	}
}
function trim (str){
	return str.replace(/^\s+|\s+$/g,"");
}

