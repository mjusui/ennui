const debug=false;
const page=require('webpage').create();

if(debug){
  console.log('ua = '+page.settings.userAgent);
}

/* UA as Vivaldi
page.settings.userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.105 Safari/537.36 Vivaldi/1.92.917.43';
*/

const purl={};
purl.prot='https://';
purl.dman='glosbe.com';
purl.path='';
purl.para='';
purl.full=purl.prot+purl.dman+purl.path+purl.para;

page.open(purl.full,function(stat){
  if(debug){
    console.log('status = '+stat);
  }
  if(stat==='success'){
    if(debug){
      console.log('Evaluating...');
    }
    const lang=page.evaluate(function(){
/*** Selector Settings ***/
const sel='to';
/*** Selector Settings ***/

      const select=document.getElementById(sel+'Language');
      const optg=select.children;
      var optgidx=optg.length;
      while(optgidx--){
        if(optg[optgidx].label==='Most popular')break;
      }
      const opt=optg[optgidx].children;
      var optidx=opt.length;
      var lang={};
      while(optidx--){
        const l={};
        l.abbr=opt[optidx].value;
        l.uppername=opt[optidx].textContent;
        l.name=l.uppername.toLowerCase();
        lang[l.abbr]=l;
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

