enn=require('../lib/ennui.js');
const Chrome=require('chromy');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.dom.elem');

  const chrome=new Chrome();

  chrome.chain()
  .goto('./index.html')
  .inject('js','../lib/ennui.client.js')
  .evaluate(()=>{
    return [ enn.dom.elem('id','test').textContent,
      enn.dom.elem('tag','div')[1].textContent,
      enn.dom.elem('name','test')[0].textContent,
      enn.dom.elem('class','test')[0].textContent, ];
  }).result((res)=>{
    test(res[0]==='test');
    test(res[1]==='test1');
    test(res[2]==='test2');
    test(res[3]==='test3');
  }).end()
  .then(()=>{
    chrome.close();
    end();
  });
},4);


