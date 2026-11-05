
// Def de la chaine qui affichera la Grille
var col; var lig;
var alph="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var sGrille='<table style="background: #0000AA; font-family: Arial; font-size: 12pt; padding : 2px; border : solid 2px #000000;">'; // tableau grille
sGrille=sGrille+"<tr><td style='width:23px; height:25px;background: #77AAFF;'><\/td>"; // case de coin
for (col=1;col<nx+1;col++) {sGrille=sGrille+"<td style='text-align: center;background: #CCCCCC;'>"+col+"<\/td>";} // cases de tetes de colonne
for (lig=1;lig<ny+1;lig++) {
	sGrille=sGrille+"<tr><td style='width: 21px; text-align: center;background: #CCCCCC;'>"+lig+"<\/td>";
	for (col=1;col<=nx;col++) {
		lettre=solT.charAt(nx*(lig-1)+col-1);
		if (alph.indexOf(lettre)!=-1) {
			sGrille=sGrille+"<td style='background: #FFFFFF; width:21px; height:18pt; text-align: center;'><input type='text' maxlength='1' style='font-family: Arial; text-align:center; font-size: 10pt; width:18px; height:18px;' id='l"+lig+"c"+col+"' onChange='idCase=this.id;Corriger();' onClick='select(this)'><\/td>";
		} else {	// case noire
			sGrille=sGrille+"<td style='background: #000000; width:21px; height:18pt; text-align: center;'><input type='hidden' name='noir' id='l"+lig+"c"+col+"'><b>&#x2022;</b><\/td>";
	  }
	}
	sGrille=sGrille+"<\/tr>"; // fin de la ligne de la grille
}
sGrille=sGrille+"<\/table>";


// RAF : Retour sur erreur d'entrée. voir Touche Enter encore. Test solution apres char accepte;  

var idCase="";
function Corriger() {
  var lettre=document.getElementById(idCase).value.toUpperCase();
  document.getElementById(idCase).value=lettre;
	if (Solint()==solT) Gagne();
}

var aFermer="CalqDiff"; var aOuvrir="CalqFac";
function ChangerDef() { // Alterne les defs entre faciles et difficiles
	if (Diffic==true) { // intervertit les legendes des boutons
		Diffic=false; aOuvrir='CalqFac';		aFermer="CalqDiff";
		document.getElementById("boutonChange").value="";// evite redim bouton !
		document.getElementById("boutonChange").value="Utiliser les def. difficiles";
	}
	else {
		Diffic=true; aOuvrir='CalqDiff';	aFermer='CalqFac';
		document.getElementById('boutonChange').value='';
		document.getElementById('boutonChange').value='Utiliser les def. faciles';
	}			// 3 possibilites selon acceptation par browser...
	if (document.all) {
		document.all[aFermer].style.visibility="hidden";
		document.all[aOuvrir].style.visibility="visible";
	}
	else if (document.layers) {
		document.layers[aOuvrir].visibility="show";
		document.layers[aFermer].visibility="hide";
	}
	else if (document.getElementById) {
		document.getElementById(aFermer).style.visibility="hidden";
		document.getElementById(aOuvrir).style.visibility="visible";
	}
	else alert("Impossible avec ce navigateur");
}


// Affiche la solution ds une nlle fenetre, a partir de nx et ny : dim. de la grille et solT : chaîne texte qui contient les mots.
function AffSol() {
var lettre="";
var s='<center><table style="background: #0000AA; font-family: Arial; font-size: 12pt; padding : 2px; border : solid 2px #000000;">';
s=s+"<tr><td style='width:23px; height:25px;background: #77AAFF;'><\/td>";
for (col=1;col<nx+1;col++) {s=s+"<td style='width:23px;text-align: center;background: #CCCCCC;'>"+col+"<\/td>";}
for (lig=1;lig<ny+1;lig++) {
	s=s+"<tr><td style='width: 21px; text-align: center;background: #CCCCCC;'>"+lig+"<\/td>";
	for (col=1;col<=nx;col++) {
		lettre=solT.charAt(nx*(lig-1)+col-1);
		if (alph.indexOf(lettre)==-1) { coul="#000000"; lettre=''; } // case noire
		else { coul="#FFFFFF"; }
		s=s+"<td style='background: "+coul+"; width:21px; height:18pt; text-align: center;'>"+lettre+"<\/td>";	}
	s=s+"<\/tr>";
}
s=s+"<\/table><\/center>";
Solution=window.open("","Solution", "top=100,left=400,toolbar=0, directories=0,menuBar=0, scrollbars=0, resizable=1" );
Solution.resizeTo((nx+1)*23+30, height=(ny+1)*25+70);
Solution.document.open();
	Solution.document.write("<title>Solution</title><body bgColor='#AAAAAA'>"+s+"</body>");
Solution.document.close();
Solution.focus();
}

function Solint() {
var solint="";
	var el;
	var sVal="";
for (lig=1;lig<ny+1;lig++) {
	for (col=1;col<=nx;col++) {
		id ="l"+lig+"c"+col;
		el=document.getElementById(id);
		if (el.type=='hidden') sVal="-";
		else 	{sVal=el.value;if (sVal=="") sVal=" ";}
		solint=solint+sVal;
	}
}
return(solint);
}

function AffSolInt(solint){
	if (solint==null) return;
	var el;
	for (lig=1;lig<ny+1;lig++) {
		for (col=1;col<=nx;col++) {
			id ="l"+lig+"c"+col;
			el=document.getElementById(id);
			if (el.type!='hidden') {document.getElementById(id).value=solint.charAt(nx*(lig-1)+col-1);}
	}
}
}
// pour stocker en COOKIE l'avancement du mot croisé.
var pathname=location.pathname;
var myDomain=pathname.substring(0,pathname.lastIndexOf('/')) +'/';
var date_exp = new Date();
date_exp.setTime(date_exp.getTime()+(60*24*3600*1000));
// Voici les 3 fonctions de gestions des cookies

function getCookieVal(offset) {
	var endstr=document.cookie.indexOf (";", offset);
	if (endstr==-1)
      		endstr=document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie (name) {
//	alert(document.cookie);
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while (i<clen) {
		var j=i+alen;
		if (document.cookie.substring(i, j)==arg)  return getCookieVal (j);
    i=document.cookie.indexOf(" ",i)+1;
    if (i==0) break;
	}
	return null;
}
function SetCookie (name, value,date) {
// un cookie a besoin d'un nom, d'une valeur, d'un nom de domaine, d'une date d'expiration

	var argv=SetCookie.arguments;
	var argc=SetCookie.arguments.length;
	var expires=(argc > 2) ? argv[2] : null;
	var path=(argc > 3) ? argv[3] : null;
	var domain=(argc > 4) ? argv[4] : null;
	var secure=(argc > 5) ? argv[5] : false;
		
	document.cookie=name+"="+escape(value)+
		((expires==null) ? "" : ("; expires="+expires.toGMTString()))+
		((path==null) ? "" : ("; path="+path))+
		((domain==null) ? "" : ("; domain="+domain))+
		((secure==true) ? "; secure" : "");
}
function storeCookie(nom,valeur) {
// 	Le nom de l'information est precede de "_" pour ne pas interferer avec les noms utilises par le site.
	if (nom!="") {
		if (valeur!="") {
//		alert ("valeur"+valeur);
			SetCookie("_"+nom,valeur,date_exp);
		}
		//else alert("Il n'y a pas de valeur pour "+nom+" !");
	}
	else alert("Il n'y a pas de nom !");
}
function recupCookie(nom) {
// Le nom de l'information etait precede de "_" pour ne pas interferer avec les noms utilises par le site.
	if (nom!="") {
		var valeur=GetCookie("_"+nom);
		if (valeur!=null) {return(valeur);}
		else {return(null);}
	}
}

function Gagne() {
	var contenu="<html><head><title>Felicitations !</title></head>"+
	"<body bgColor='yellow'><center><img src='CVCFBump.gif'><br><hr>"+
	" Bravo, il est fini !<br><input id='butFini' type='button'  value='OK' onClick='window.close();'></center></body>";
	finiWin=window.open('','','toolbar=0, directories=0,menuBar=0, scrollbars=0, resizable=0,status=0,top=100,left=400,width=200,height=270');
	finiWin.window.resizeTo(200,270);
	finiWin.document.open(); finiWin.document.write(contenu); finiWin.document.close();
	finiWin.focus();
}
