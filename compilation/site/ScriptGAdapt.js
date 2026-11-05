function openGrande(nomPhoto, legende) {
var chemin=dossimage+'/'+nomPhoto+'.jpg';
contenu='<html> <head> <title>Grande Image<\/title>'+
'<link rel="stylesheet" type="text/css" href="../StyleGene.css">'+
'<style type="text/css">'+
'img.grande{'+
'	margin-left:0px;'+
'	border-top: groove 8px #ffffff;'+
'	border-right: groove 8px #999999;'+
'	border-bottom: groove 8px #777777;'+
'	border-left: groove 8px #aaaaaa;}'+
'.legend{'+
'	font-family:times;'+
'	margin-top:10px;}'+
'</style>'+
'<\/head> <body bgcolor="#AACCFF"> <br><center>'+
'<img class="grande" src="'+chemin+'" name=ImageMax '+
'onload="window.resizeTo(document.ImageMax.width+100, document.ImageMax.height+150)"><br>'+
'<div class="legend">'+legende+'<\/div><\/center><\/body><\/html>';
Grande=window.open('','displayWindow','toolbar=0, directories=0,menuBar=0, scrollbars=0, resizable=1,top=25,left=15,');
Grande.document.open();
Grande.document.write(contenu);
Grande.document.close();
Grande.focus();
}