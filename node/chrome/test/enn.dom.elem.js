enn=require('../lib/ennui.chrome.js');

enn.chrm.eval('./index.html',()=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.dom.elem');
    test(enn.dom.elem(
      'id','test'
      ).textContent==='test');
    end();
  });
}).end();

