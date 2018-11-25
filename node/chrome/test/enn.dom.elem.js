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

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.dom.elem bench');

  const chrome=new Chrome();

  chrome.chain()
  .goto('./index.html')
  .inject('js','../lib/ennui.client.js')
  .console((text)=>{
    console.log(text);
  }).evaluate(()=>{
    const elem=(q,v,p=document)=>{
      let get='getElementById';
      switch(q){
        case 'id': get='getElementById';break;
        case 'tag': get='getElementsByTagName';break;
        case 'name': get='getElementsByName';break;
        case 'class': get='getElementsByClassName';break;
      }
      return p[get](v);
    };
    const l=10000;
    const res={};
    enn.bench((stop,cmnt)=>{
      cmnt('enn.dom.elem');
      enn.loop(l,(cnt)=>{
        enn.dom.elem('class','test');
      });
      res.a=stop();
    });
    enn.bench((stop,cmnt)=>{
      cmnt('enn.elem');
      enn.loop(l,(cnt)=>{
        elem('class','test');
      });
      res.b=stop();
    });
    return res;
  }).result((res)=>{
    test(
        (res.a == res.b)
      ||(res.a < res.b)
      ||(res.a > res.b) && (res.a - res.b < 10)
    );
  }).end()
  .then(()=>{
    chrome.close();
    end();
  });
  
  /*.then(close)
  .catch(close)
  .finally(close);*/
});
