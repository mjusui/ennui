enn=require('../lib/ennui.chrome.js');

enn.chrm.eval('./index.html',()=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.dom.text');
    test(enn.dom.text('text')
      .textContent==='text');
    end();
  });
});

