//�߿򲹶�
function __getParam (key){
	var s=location.search;
	s=s.replace(/^\?/,"");
	s=s.split("&");
	var p={};
	for(var i=0;i<s.length;i++){
		var tmp=s[i].split("=");
		if(tmp[0]){
			p[tmp[0]]=tmp[1];
		}
	}
	return key?p[key]:p;
}
var canvas_pos=__getParam("canvas_pos");
var customed=__getParam("custom");
var keyword=__getParam("keyword");
if(canvas_pos&&canvas_pos=="search"){
	//���������ҳ��
	//if(customed=="1" || keyword){
		//������û���ҳ�ղصģ������������ؼ����������ģ������λ��
	document.body.style.marginLeft="0px";
	//}
	var bw=0;
	if(window.getComputedStyle){
		bw=window.getComputedStyle(document.body)["width"];
	}else{
		bw=document.body.clientWidth;
	}
	bw=parseInt(bw);
	//alert(bw);
	if(bw==542){
		document.body.style.marginLeft="-2px";
	}
}
