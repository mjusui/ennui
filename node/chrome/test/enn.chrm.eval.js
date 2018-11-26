enn=require('../lib/ennui.chrome.js');

enn.chrm.eval('./index.html',()=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.chrm.eval');
    test(document
      .getElementsByTagName('title')[0]
      .textContent==='Test - ennui.js');
    end()
  });
});
