enn=require('../lib/ennui.js');
const Chrome=require('chromy');

enn.asrt((test,end,cmnt)=>{
  cmnt('chrome.simple');

  const chrome=new Chrome();

  chrome.chain()
  .goto('http://masquerade.ninja')
  .console(console.log)
  .evaluate(()=>{
     return document
     .getElementsByTagName(
       'title'
     )[0].textContent;
  }).result((tit)=>{
    test(tit==='Outernet Service - Papillon');
  }).end()
  .then(()=>{
    chrome.close();
    end();
  });
});
