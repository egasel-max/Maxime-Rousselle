function openGrande(width, height, nomPhoto, legende) {
Grande=window.open("","displayWindow",'width=' + width + ',height='+ height +',resizable=1,status=0,screenX="100",screenY="50"');
Grande.resizeTo(width,height);
Grande.focus();
Grande.document.write("<title>Grande Photo<\/title><body bgcolor='#AACCFF'><br>");
Grande.document.write("<table align='center' border='5' width='90%'><td align='center'>");
Grande.document.write("<img src='"+dossimage+"/"+nomPhoto+".jpg'  alt='Photo Agrandie' width='100%'><\/td><\/table>");
Grande.document.write("<font size='1'><br><\/font><font face='Times'><center>"+legende+"<\/center><\/font><\/body>");
Grande.document.close();
}