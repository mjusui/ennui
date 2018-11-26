const enn=require('./ennui.js');
const Chrome=require('chromy');

const chrm={};
chrm.eval=(url,hndl)=>{
  const chrome=new Chrome();

  chrome.chain()
  .goto(url)
  .console((text,info)=>{
    //console[info.level](text);
    console.log(text);
  }).inject('js',`${__dirname}/ennui.client.js`)
  .evaluate(hndl)
  .end()
  .finally(()=>{
    chrome.close();
  });

};
enn.lib('chrm',chrm);

module.exports=enn;
