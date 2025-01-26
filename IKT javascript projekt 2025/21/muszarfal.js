let szog = 0;
let ctx;

function onload(){

	const c = document.getElementById("muszer");
	ctx = c.getContext("2d");
	c.width=1000;
	c.height=700;

    //c.addEventListener("wheel",szogvaltoztatas);
    torles(ctx);
}

//debug a számolásokhoz//
/*
function szogvaltoztatas(e){
    if (e.wheelDeltaY<0){
        szog-=5
    }
    else{
        szog+=5;
    }
    torles(ctx)
	sebessegMero(ctx);
}*/

function torles(ctx){
    ctx.clearRect(0,0,1000,700)
    
    valto(ctx);
    fordulatSzam(ctx);
    sebessegMero(ctx);
}

let valtoAllas = 1;
function valtoNov(){
    if (valtoAllas<5){
        valtoAllas+=1;
        torles(ctx);
    }
}
function valtoCsok(){
    if (valtoAllas>1){
        valtoAllas-=1;
        torles(ctx);
    }
}
let sebesseg = 0;

function sebessegCsok(){
    if (sebesseg>=0){
        torles(ctx);
        animalas = setInterval(function () {sebessegMero(ctx,20,false)},100);
    }
    else{
        sebesseg=0;
    }
}
let animalas;
let lefutasSzamlalo = 0;
function sebessegNov(){
    if (sebesseg+20<=260){
        torles(ctx);
        //sebessegMero(ctx,sebesseg,20);
        animalas = setInterval(function () {sebessegMero(ctx,20)},100);
    }
    else{
        sebesseg=260;
    }
}

function valto(ctx,sebPoz=valtoAllas){
    //Váltó x,y koordinátája és sugrának beállítása
    let x = 700;
    let y = 200;
    let r = 100;

    let sebessegKoord = {
        1:[x+r-3/6*r,y-1/4*r],
        2:[x+r-3/6*r,y+1/4*r],
        3:[x+r,y-1/4*r],
        4:[x+r,y+1/4*r],
        5:[x+r+3/6*r,y-1/4*r],
        "R":[x+r+3/6*r,y+1/4*r]
    }

    //Körvonal
    ctx.beginPath();
    ctx.arc(x+r,y,r,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();


    ctx.beginPath();
    //Középső vonala
    ctx.moveTo(x+r+3/6*r,y);
    ctx.lineTo(x+r-3/6*r,y);

    //Sebességek függőleges vonala, lentről rajzolja felfelé
    //1-es 2-es sebesség vonala
    ctx.font = "20px Time New Roman";
    ctx.fillText("1",x+r-3/6*r-5,y-1/4*r-13);
    ctx.fillText("2",x+r-3/6*r-5,y+1/4*r+20);
    ctx.moveTo(sebessegKoord[2][0],sebessegKoord[2][1]);
    ctx.lineTo(sebessegKoord[1][0],sebessegKoord[1][1]);

    //3-as 4-es sebesség vonala
    ctx.fillText("3",x+r-5,y-1/4*r-10);
    ctx.fillText("4",x+r-5,y+1/4*r+20);
    ctx.moveTo(sebessegKoord[4][0],sebessegKoord[4][1]);
    ctx.lineTo(sebessegKoord[3][0],sebessegKoord[3][1]);

    //5-ös R sebesség vonala
    ctx.fillText("5",x+r+3/6*r-5,y-1/4*r-10);
    ctx.fillText("R",x+r+3/6*r-5,y+1/4*r+20);
    ctx.moveTo(sebessegKoord["R"][0],sebessegKoord["R"][1]);
    ctx.lineTo(sebessegKoord[5][0],sebessegKoord[5][1]);

    ctx.stroke();
    ctx.closePath();


    //Sebességváltó állása
    let sebvaltR=r/10;
    ctx.beginPath();
    ctx.arc(sebessegKoord[sebPoz][0],sebessegKoord[sebPoz][1],sebvaltR,0,Math.PI*2);
    ctx.fillStyle="gray";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

//v=d*pi*n
//n = fordulatszám
//d = kerekátmérő

function fordulatSzam(ctx,fordulat){
    //Fordulatszámmérő óra x,y koordinátája és sugrának beállítása
    let x = 400;
    let y = 200;
    let r = 100;

    //Körvonal
    ctx.beginPath();
    ctx.arc(x+r,y,r,0,Math.PI*2);
    ctx.stroke();
    ctx.closePath();

    //Beosztás körvonalon lévő pontjának koordinátája
    let a;
    let b;
    //Beosztás körben lévő pontjának koordinátája
    let a2;
    let b2;

    //A Fordulatszámmérő óra beosztásai, -2-től rajzolj (-40 fok) 11-ig (220 fok)
    for (let i = -2; i <= 11; i++){
        let szog = i*20
        console.log(szog)
        if (szog<-90 || (szog > 90)){
            if (szog > 360 || szog<-360){
                szog=360-szog
            }
            szog = szog * (Math.PI/180);
            b = y - Math.sin(szog)*r;
            a = x + Math.sqrt(r**2-(y-b)**2);
            
            b2 = b + Math.sin(szog)*(1/6*r);
            a2 = a - Math.sqrt((1/6*r)**2-(b2-b)**2);
        }
        else{
            szog = szog * (Math.PI/180);
            b = y - Math.sin(szog)*r;
            a = x - Math.sqrt(r**2-(y-b)**2);
            
            b2 = b + Math.sin(szog)*(1/6*r);
            a2 = a + Math.sqrt((1/6*r)**2-(b2-b)**2);
        }
        ctx.beginPath();
        ctx.moveTo(a2+r,b2);
        ctx.lineTo(a+r,b);
        ctx.stroke();
        ctx.closePath();

    }
    
    //Fordulatszámmérő óra mutató
    let fordulatSzog = fordulat-40;

    if (fordulatSzog<-90 || (fordulatSzog > 90)){
        if (fordulatSzog > 360 || fordulatSzog<-360){
            fordulatSzog=360-fordulatSzog
        }
        fordulatSzog = fordulatSzog * (Math.PI/180);
        b = y - Math.sin(fordulatSzog)*r;
        a = x + Math.sqrt(r**2-(y-b)**2);
    }
    else{
        fordulatSzog = fordulatSzog * (Math.PI/180);
        b = y - Math.sin(fordulatSzog)*r;
        a = x - Math.sqrt(r**2-(y-b)**2);
        
    }
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(x+r,y);
    ctx.lineTo(a+r,b);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.closePath();
    

    
}


function sebessegMero(ctx,valtoztatas=20,noveles=true){

    if (lefutasSzamlalo==valtoztatas){
        clearInterval(animalas);
        lefutasSzamlalo=0;
    }
    //Sebességmérő óra x,y koordinátája és sugrának beállítása
	let x = 100;
	let y = 200;
	let r = 100;

    ctx.clearRect(x-2,y-r-2,x+r+3,y+3)

	//Körvonal
	ctx.beginPath();
	ctx.arc(x+r,y,r,0,Math.PI*2);
	ctx.stroke();
	ctx.closePath();

    //Beosztás körvonalon lévő pontjának koordinátája
    let a;
    let b;
    //Beosztás körben lévő pontjának koordinátája
    let a2;
    let b2;

    //A Sebességmérő óra beosztásai, -2-től rajzolj (-40 fok) 11-ig (220 fok)
    for (let i = -2; i <= 11; i++){
        let szog = i*20
        console.log(szog)
        if (szog<-90 || (szog > 90)){
            if (szog > 360 || szog<-360){
                szog=360-szog
            }
            szog = szog * (Math.PI/180);
            b = y - Math.sin(szog)*r;
            a = x + Math.sqrt(r**2-(y-b)**2);
            
            b2 = b + Math.sin(szog)*(1/6*r);
            a2 = a - Math.sqrt((1/6*r)**2-(b2-b)**2);

            //betuB = y + Math.sin(szog)*(1/2*r);
            //betuA = x - Math.sqrt((1/2*r)**2-(y-betuB)**2);
        }
        else{
            szog = szog * (Math.PI/180);
            b = y - Math.sin(szog)*r;
            a = x - Math.sqrt(r**2-(y-b)**2);
            
            b2 = b + Math.sin(szog)*(1/6*r);
            a2 = a + Math.sqrt((1/6*r)**2-(b2-b)**2);

            /*betuB = b2 + Math.sin(szog)*(1/2*r);
            betuA = a2 + Math.sqrt((1/2*r)**2-(betuB-b2)**2);*/
        }
        ctx.beginPath();
        ctx.moveTo(a2+r,b2);
        ctx.lineTo(a+r,b);
        ctx.stroke();
        ctx.closePath();

    }
    
    //Sebességmérő óra mutató
    let sebessegSzog = sebesseg-40;

    if (sebessegSzog<-90 || (sebessegSzog > 90)){
        if (sebessegSzog > 360 || sebessegSzog<-360){
            sebessegSzog=360-sebessegSzog
        }
        sebessegSzog = sebessegSzog * (Math.PI/180);
        b = y - Math.sin(sebessegSzog)*r;
        a = x + Math.sqrt(r**2-(y-b)**2);
    }
    else{
        sebessegSzog = sebessegSzog * (Math.PI/180);
        b = y - Math.sin(sebessegSzog)*r;
        a = x - Math.sqrt(r**2-(y-b)**2);
        
    }
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.moveTo(x+r,y);
    ctx.lineTo(a+r,b);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.closePath();





    if (noveles){
        sebesseg++;
    }
    else{
        sebesseg--;
    }
    lefutasSzamlalo++;
    console.log("SEBESSÉG",sebesseg)
	

}