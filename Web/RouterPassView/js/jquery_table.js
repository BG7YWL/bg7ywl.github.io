function TTable (id,header,data,options,index,per,page){
	var that=this;
	var newdata=[];
	page=page||1;
	options=options||{};
	/*size settings*/
	options.col=options.col||4;  /*for tile style*/
	options.row=options.row||4;  /*for tile style*/
	options.col_width=options.col_width||103; /*for tile style*/
	options.row_height=options.row_height||167; /*for tile style*/
	options.cellspacing=options.cellspacing===0?0:(options.cellspacing||2);
	options.widths=options.widths||{}; /*column widths*/
	/*item_style*/
	options.item_normal=options.item_normal||"#fff";
	options.item_over=options.item_over||"#A9D4FF";
	options.item_selected=options.item_selected||"#ff3366";
	options.item_action=options.item_action||"normal"; /*for tile style to swap color*/
	/*item css settings*/
	options.css=options.css||"";
	options.css_td=options.css_td||"";
	options.css_td_first=options.css_td_first||"";
	options.css_td_last=options.css_td_last||"";
	options.css_tr=options.css_tr||"";
	options.css_header=options.css_header||"";
	options.css_header_td=options.css_header_td||"";
	/*pager settings*/
	options.buttons=options.buttons||{
		"first":"","prev":"","next":"","last":""
	};
	options.showpage=options.showpage||"";
	options.na=options.na||"未知";
	/*script start*/
	if(header=="tile"){
		per=options.col*options.row;
	}
	//初始化表格的selectedIndex
	$("#"+id).attr("selectedIndex","-1");
	data=data||[];
	if(data.length>0){
		var str="";
		var start=0;
		var end=data.length;
		var maxpage=Math.ceil(data.length/per);
		if(per){
			page=page||1;
			if(page<1){
				page=1;
			}
			if(page>maxpage){
				page=maxpage;
			}
			if(maxpage>1){
				//如果不止一页
				start=per*(page-1);
				end=per*page<=end?per*page:end
			}
		}
		for(var i in options.buttons){
			var tmp=options.buttons[i];
			if(tmp&&$$(tmp)){
				if($("#"+tmp).hasClass("flexbt_disabled")){
					$("#"+tmp).removeClass("flexbt_disabled")
				}
			}
		}
		function disableBt(bt){
			var tmp=options.buttons[bt];
			if(tmp&&$$(tmp)){
				if($("#"+tmp).hasClass("flexbt_over")){
					$("#"+tmp).removeClass("flexbt_over");
					$("#"+tmp).addClass("flexbt");
				}
				$("#"+tmp).addClass("flexbt_disabled");
			}
		}
		if(page==1){
			//在首页时
			disableBt("first");
			disableBt("prev");
		}
		if(page==maxpage){
			//在最后一页时
			disableBt("last");
			disableBt("next");
		}
		var newlen=end-start+1;
		newdata=data.slice(start,end);
		if(header!="tile"){
			newdata.unshift(header);
			var headerRank=[];
			str="<table cellspacing='0' cellpadding='3' style='table-layout:fixed;"+options.css+"'>";
			for(var i=0;i<newlen;i++){
				str+=(i==0)?("<tr style='"+options.css_header+"'>"):("<tr id='"+id+"_table_row_"+i+"' style='background:"+options.item_normal+";"+options.css_tr+"'>");
				var tmp=newdata[i];
				if(index){
					str+="<td style='width:"+parseInt(options.widths["__index"]||"93")+"px;"+options.css_td+"'>"+(i==0?index[0]:((index[1]||0)+i))+"</td>";
				}
				if(i==0){
					for(var j in tmp){
						if(j.substring(0,2)!="__"&&(j in header)){
							str+="<td style='width:"+parseInt(options.widths[j]||"93")+"px;"+options.css_td+";"+options.css_header_td+"'>"+(tmp[j]===0?0:(tmp[j]||options.na))+"</td>";
							headerRank.push(j);
						}
					}
				}else{
					for(var m=0;m<headerRank.length;m++){
						var j=headerRank[m];
						if(j.substring(0,2)!="__"){
							var tmpcell=tmp[j]===0?0:(tmp[j]||options.na);
							if(header["__"+j+"_"+"substring"]){
								var ss_config=header["__"+j+"_"+"substring"].split(",");
								var ss_len=parseInt(ss_config[0]);
								var ss_end=ss_config[1]||"...";
								if(tmpcell.length>ss_len){
									tmpcell=tmpcell.substring(0,ss_len)+ss_end;
								}
							}
							var render=options.render&&options.render[j];
							if(render){
								render=render.replace(new RegExp("\{%(\\w+)%\}","g"),function($1,$2){
									if($2 != "__index"){
										return tmp[$2];
									}else{
										return (options.baseIndex||0)+i;
									}
								});
							}else{
								render=tmpcell;
							}
							str+="<td style='width:"+parseInt(options.widths[j]||"93")+"px;"+options.css_td+"'>"+render+"</td>";
						}
					}
				}
				str+="</tr>";
			}
		}else{
			//tile list
			str="<table cellspacing='"+options.cellspacing+"' cellpadding='0' style='table-layout:fixed;"+options.css+"'>";
			var ceilLen=Math.ceil((newlen-1)/options.col)*options.col;
			for(var i=0;i<ceilLen;i++){
				var tmp=newdata[i];
				if(i%options.col==0){
					if(i>0){
						str+="</tr>";
					}
					str+="<tr style='height:"+parseInt(options.row_height)+"px;"+options.css_tr+"'>";
				}
				var render=options.render;
				if(render&&tmp){
					render=render.replace(new RegExp("\{%(\\w+)%\}","g"),function($1,$2){
						if($2 != "__index"){
							return tmp[$2];
						}else{
							return (options.baseIndex||0)+i;
						}
					});
				}else{
					render=tmp;
				}
				var cellflag=(render===0?1:(render||""));
				var tddata=(render===0?0:(render||"&nbsp;"));
				str+="<td id='"+id+"_table_cell_"+i+"' hasdata='"+(cellflag?"yes":"no")+"' valign='middle' style='width:"+parseInt(options.col_width)+"px;"+options.css_td+"'>"+tddata+"</td>";
			}
			$("#"+id).css("width",options.col_width*options.col+options.cellspacing*(options.col+1));
			$("#"+id).css("height",options.row_height*options.row+options.cellspacing*(options.row+1));
		}
		str+="</table>";
		$("#"+id).html(str);
		if(options.showpage){
			$("#"+options.showpage).html(page+"/"+maxpage);
		}
		if(header!="tile"){
			$("#"+id).find("tr").each(function(index,ele){
				$(this).mouseover(function(){
					if(index>0&&ele.getAttribute("ttable_selected")!="yes"){
						ele.style.background=options.item_over;
						/*execute twice to fix bug in IE7*/
						ele.style.background=options.item_over;
					}
				});
				$(this).mouseout(function(){
					if(index>0&&ele.getAttribute("ttable_selected")!="yes"){
						ele.style.background=options.item_normal;
						/*execute twice to fix bug in IE7*/
						ele.style.background=options.item_normal;
					}
				});
				$(this).click(function(){
					if(index>0){
						if($("#"+id).attr("selectedIndex")!="-1"){
							var tmp_obj=$("#"+id+"_table_row_"+$("#"+id).attr("selectedIndex"));
							tmp_obj.css("background",options.item_normal);
							/*execute twice to fix bug in IE7*/
							tmp_obj.css("background",options.item_normal);
							tmp_obj.attr("ttable_selected","no");
						}
						ele.setAttribute("ttable_selected","yes");
						ele.style.background=options.item_selected;
						/*execute twice to fix bug in IE7*/
						ele.style.background=options.item_selected;
						$("#"+id).attr("selectedIndex",index);
					}
				});
			});
			if(options.itemClick){
				$("#"+id).find("tr").each(function(index,ele){
					if(index>0){
						$(this).click(function(){
							options.itemClick(index,ele);
						});
					}
				});
			}
		}else{
			//tilelist event;
			$("#"+id).find("td").each(function(index,ele){
				if($(this).attr("hasdata")=="yes"){
					$(this).click(function(){
						options.itemClick&&options.itemClick($(this),index,ele);
						if(options.item_action=="swap"){
							var citem=that.currentItem();
							if(citem){
								citem.css("background","");
							}
							$("#"+id).attr("selectedIndex",index);
							that.currentItem().css("background",options.item_selected);
						}
					});
					$(this).mouseenter(function(){
						if(options.item_action=="swap"&&$("#"+id).attr("selectedIndex")!=index){
							$(this).css("background",options.item_over);
						}
						options.itemMouseOver&&options.itemMouseOver($(this),index,ele);
					});
					$(this).mouseleave(function(){
						if(options.item_action=="swap"&&$("#"+id).attr("selectedIndex")!=index){
							$(this).css("background",options.item_normal||options.item_out);
						}
						options.itemMouseOut&&options.itemMouseOut($(this),index,ele);
					});
				}
			});
		}
	}else{
		if(options.showpage){
			$("#"+options.showpage).html("0/0");
		}
		$("#"+id).html(options.errorMsg||"<br/>&nbsp;&nbsp;对不起! 没有找到相关数据");
	}
	this.data=newdata;
	this.page=page;
	this.per=per;
	this.currentIndex=function(){
		var _index=parseInt($("#"+id).attr("selectedIndex"));
		if(isNaN(_index)){
			return -1;
		}else{
			return _index;
		}
	}
	this.currentItem=function(){
		var selectedIndex=parseInt($("#"+id).attr("selectedIndex"));
		if(selectedIndex>=0){
			return $("#"+id+"_table_cell_"+selectedIndex);
		}else{
			return null;
		}
	}
	this.current=function(){
		var selectedIndex=parseInt($("#"+id).attr("selectedIndex"));
		return this.data[selectedIndex]||false;
	}
	this.first=function(){
		return new TTable (id,header,data,options,index,per,1);
	}
	this.last=function(){
		return new TTable (id,header,data,options,index,per,maxpage);
	}
	this.next=function(){
		return new TTable (id,header,data,options,index,per,page+1);
	}
	this.prev=function(){
		return new TTable (id,header,data,options,index,per,page-1);
	}
	this.query=function(text,fields){
		var fieldarr=[];
		if(typeof(fields)=="string"){
			fieldarr.push(fields)
		}else{
			fieldarr=fields;
		}
		text=trim(text).replace(/\\/gi,"\\\\").split(/[\s,，]+/).join("|");
		text=text.replace(/([\[\]\{\}\+\?\*\(\)])/g,function($1){
			return "\\"+$1;
		});
		var res=[];
		var newdata=data.slice(0);
		for(var i=0,l=newdata.length;i<l;i++){
			var flag=false;
			var tmp=newdata[i];
			for(var j=0,m=fieldarr.length;j<m;j++){
				var attr=fieldarr[j];
				if(attr in tmp){
					var re=new RegExp(text,"gi");
					if(tmp[attr]&&re.test(tmp[attr])){
						flag=true;
						break;
					}
				}
			}
			if(flag){
				res.push(tmp);
			}
		}
		return new TTable (id,header,res,options,index,per,1);
	}
	this.equal=function(text,fields,ignoreCase){
		var fieldarr=[];
		if(typeof(fields)=="string"){
			fieldarr.push(fields)
		}else{
			fieldarr=fields;
		}
		//text=trim(text).replace(/\\/gi,"\\\\").split(/[\s,，]+/).join("|");
		var res=[];
		var newdata=data.slice(0);
		for(var i=0,l=newdata.length;i<l;i++){
			var flag=false;
			var tmp=newdata[i];
			for(var j=0,m=fieldarr.length;j<m;j++){
				var attr=fieldarr[j];
				if(attr in tmp){
					var a=text;
					var b=tmp[attr];
					if(b){
						if(ignoreCase){
							a=a.toString().toUpperCase();
							b=b.toString().toUpperCase()
						}
						if(a==b){
							flag=true;
							break;
						}
					}
				}
			}
			if(flag){
				res.push(tmp);
			}
		}
		return new TTable (id,header,res,options,index,per,1);
	}
}
try{
	document.execCommand("BackgroundImageCache",false,true);
}catch(e){}
