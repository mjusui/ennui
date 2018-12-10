const enn=require('./ennui.js');
const os=require('os');
const Chrome=require('chromy');

const chrm={};

const port={};
const parallel=os.cpus().length/2;
let time=1700;

chrm.eval=enn.help('launched',0)
.help('port',(p)=>{
  if(p){
    port[p]=false;
    return;
  }
  return enn.loop(parallel,(c,end)=>{
    const idx=9222+c;
    if(port[idx])
      return;
    port[idx]=true;
    end(idx);
  });
}).help('time',(t)=>{
  if(t)
    time=3*t/2;
  return time;
}).help('launch',(
  hl,url,hndl,arg=[],hndl2=(ret)=>{},retry=1
)=>{
  const port=hl.port();
  if(!port){
    enn.timer(()=>{
      hl.launch(hl,url,hndl,arg,hndl2,retry);
    },hl.time());
    return;
  }

  const chrome=new Chrome({
    port: port
  });

  enn.bench((stop,cmnt)=>{
    cmnt(`processed arg=${arg}`);
    chrome.chain()
    .console((text,info)=>{
      console.log(text);
    })
    .goto(url)
    .inject('js',`${__dirname}/ennui.client.js`)
    .evaluate(hndl,arg)
    .result(hndl2)
    .end()
    .catch((err)=>{
      if(0 < retry)
        enn.timer(()=>{
          hl.launch(hl,url,hndl,arg,hndl2,retry-1);
        },170);
      else
        console.log(err);
    }).finally(()=>{
      chrome.close();
      hl.port(port);
      hl.time(stop());
    });
  });
}).end((hl,url,hndl,...arg)=>{
  return enn.lift('resl',(hndl2,retry)=>{
    hl.launch(hl,url,
      hndl,arg,
      hndl2,retry);
  }).end('end',(retry)=>{
    hl.launch(hl,url,
      hndl,arg,
      undefined,retry);
  });
});


enn.lib('chrm',chrm);

module.exports=enn;
