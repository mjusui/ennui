enn=require('../lib/ennui.chrome.js');

enn.chrm.eval('./index.html',()=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.dom.make');
    test(enn.dom.make('span')
      .tagName==='SPAN');
    end();
  });
});

