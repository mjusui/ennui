const debug=true;
const page=require('webpage').create();

if(debug){
  console.log('ua = '+page.settings.userAgent);
}

/*** UA as Vivaldi ***/
page.settings.userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.105 Safari/537.36 Vivaldi/1.92.917.43';
/*** UA as Vivaldi ***/

const purl={};
purl.prot='https://';
purl.dman='translate.google.com';
purl.path='/';
purl.para='?hl=en';
purl.full=purl.prot+purl.dman+purl.path+purl.para;

page.open(purl.full,function(stat){
/*** Screen Capture ***/
  page.render('googletranslater.png');
  //phantom.exit();
/*** Screen Capture ***/


  if(debug){
    console.log('status = '+stat);
  }
  if(stat==='success'){
    if(debug){
      console.log('Evaluating...');
    }
    const lang=page.evaluate(function(){
/*** Selector Settings ***/
//const cname='goog-menuitem-content';
const idname='gt-sl-gms-menu';
//const cname='goog-menuitem goog-option';
/*** Selector Settings ***/
/***
      const html=document.getElementsByTagName('html');
      return html;
***/
      const div=document.getElementById(idname).children;
return div.length;

/***
      const div=document.getElementsByTagName('table');
      var len=div.length;
      var ret=[];
      //var ret=null;
      while(len--){
        //const txt=div[len].textContent;
        //if(txt.match(/apan/))break;
        ret[len]=div[len].textContent;
      }
      //ret=div[len];
return ret;
***/
      const select=document.getElementsByClassName(cname);
      var sellen=select.length;
return sellen;
      const lang={};
      while(sellen--){
        const l={};
        l.uppername=select[sellen].textContent;
        l.name=l.uppername.toLowerCase();
        lang[l.name]=l;
      }
      return lang;
    });
    console.log(JSON.stringify(lang));
  }

  phantom.exit();
});


if(debug){
  console.log('Processing...');
}

//phantom.exit();

/*
()()()()()()
*/

