function MyClipboard(){
	var id=Math.floor(Math.random()*999)+"_"+Math.floor(Math.random()*999)+"_"+Math.floor(Math.random()*999);
	var TmClipboard={
		_id:id,
		_button:"",
		_textColor:"0",
		_data:"",
		_succmsg:"复制成功",
		_failmsg:"复制失败\n\n复制内容为空",
		init:function(text,ret,url,transparent,objname){
			var str='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
				str+=' id="Clipboard_'+id+'" width="64" height="22"';
				str+=' 		codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">';
				str+=' 		<param name="movie" value="'+(url||'Clipboard.swf')+'" />';
				str+=' 		<param name="quality" value="high" />';
				str+=' 		<param name="bgcolor" value="#869ca7" />';
				str+=transparent?'		<param name="wmode" value="transparent" />':'';
				str+=' 		<param name="allowScriptAccess" value="sameDomain" />';
				str+=(objname||text)?('	<param name="flashvars" value="text='+(text||"复制")+'&object='+(objname||"TmClipboard")+'" />'):'';
				str+=' 		<embed style="display:block;margin:0 auto;" src="'+(url||'Clipboard.swf')+'" quality="high" bgcolor="#869ca7"';
				str+=' 			width="64" height="22" name="Clipboard'+id+'" align="middle"';
				str+=' 			play="true"';
				str+=' 			loop="false"';
				str+=' 			quality="high"';
				str+=transparent?'			wmode="transparent"':'';
				str+=' 			allowScriptAccess="sameDomain"';
				str+=(objname||text)?('	flashvars="text='+(text||"复制")+'&object='+(objname||"TmClipboard")+'"'):'';
				str+=' 			type="application/x-shockwave-flash"';
				str+=' 			pluginspage="http://www.adobe.com/go/getflashplayer">';
				str+=' 		</embed>';
				str+=' </object>';
			if(!ret){
				document.write(str);
				return false;
			}
			return str;
		},
		ready:function(){
			return true;
		},
		button:function(url){
			if(url){
				this._button=url;
			}else{
				return this._button;
			}
		},
		textColor:function(color){
			if(color){
				this._textColor=color;
			}else{
				return this._textColor;
			}
		},
		getdata:null,
		data:function(data){
			if(data){
				this._data=data;
			}else{
				if(this.getdata && typeof(this.getdata) == "function"){
					this.getdata();
				}
				return this._data||"__false";
			}
		},
		succ:function(){
			alert(this._succmsg);
		},
		fail:function(){
			alert(this._failmsg);
		}
	};
	return TmClipboard;
}
var TmClipboard=new MyClipboard();
