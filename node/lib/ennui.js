/*
const http=require('http');
const https=require('https');
*/
const crypto=require('crypto');
const url=require('url');
const qs=require('querystring');
const fs=require('fs');
const o=require('os');
const os={
  cpu:{
    core:o.cpus().length,
  },
};
const clust=require('cluster');
const src=`${__dirname}/ennui.client.js`;
const dst=`${__dirname}/ennui.server.js`;

let ennui=fs.readFileSync(src,{
  encoding:'utf8',
});
ennui+='module.exports=enn;'

fs.writeFileSync(dst,ennui);

const enn=require(dst);
enn.scan([
  'dom'
],(idx,name)=>{
  enn[name]=undefined;
});
enn.scan([
  'req','dat'
],(idx,name)=>{
  enn.http[name]=undefined;
});

enn.http.dat=(o,para)=>{
  let d=null;
  if(para && o.method!=='GET'){
    d=qs.stringify(para);
  }
  return d;
};
enn.strm={};
enn.strm.http={};
enn.strm.http.req=(meth,opt,hndl,end=()=>{})=>{
  const o=enn.http.prs(opt,{
    method:meth
  });
  let url=enn.http.bld(o,opt.para);

  if(!hndl){
    return url;
  }

  let http=require('http');
  if(o.protocol==='https:')
    http=require('https');

  const req=http.request(o.url||o,(res)=>{
    res.on('data',hndl);
    res.on('end',end);
  });
  req.on('error',(e)=>{
    console.error(e.message);
  });

  let data=enn.http.dat(o,opt.para);
  if(data){
    req.write(data);
  }
  req.end();

};
enn.strm.http.head=enn.roux(
  enn.strm.http.req,
  'HEAD').r
enn.strm.http.get=enn.roux(
  enn.strm.http.req,
  'GET').r
enn.strm.http.put=enn.roux(
  enn.strm.http.req,
  'PUT').r
enn.strm.http.post=enn.roux(
  enn.strm.http.req,
  'POST').r
enn.strm.http.delete=enn.roux(
  enn.strm.http.req,
  'DELETE').r


enn.http.req=(meth,opt,hndl)=>{
  if(!hndl){
    return enn.strm.http.req(meth,opt);
  }

  let body='';
  enn.strm.http.req(meth,opt,(data)=>{
    body+=data;
  },()=>{
    hndl(body);
  });

  /*const o=enn.http.prs(opt,{
    method:method,
  });
  let url=enn.http.bld(o,opt.para);

  if(!hndl){
    return url;
  }

  let http=require('http');
  if(o.protocol==='https:')
    http=require('https');

  const req=http.request(o,(res)=>{
    let body='';
    res.on('data',(chunk)=>{
      body+=chunk;
    });
    res.on('end',()=>{
      hndl(body);
    });
  });
  req.on('error',(e)=>{
    console.log(e.message);
  });

  let data=enn.http.dat(o,opt.para);
  if(data){
    req.write(data);
  }
  req.end();*/
};
enn.http.resp=(header={})=>{
  return (res,opt)=>{
    /*res.statusCode=opt.stat||opt.status||opt.sc
      ||opt.statusCode||opt.statuscode||404;
    res.statusMessage=opt.msg||opt.message||opt.sm
      ||opt.statusMessage;

    enn.itrt(enn.clon(head)
      .mix(opt.head||opt.header||opt.headers),
    .end(),(name,val)=>{
      res.setHeader(name,val);
    });
    
    res.end(opt.body||opt.data);*/
    const stat=enn.lift('stat',(sc,msg)=>{
      res.statusCode=sc;
      res.statusMessage=msg;
      return head;
    }).end();

    const head=enn.lift('head',(head)=>{
      enn.itrt(enn.clon(header)
        .mix(head)
      .end(),(key,val)=>{
        res.setHeader(key,val);
      });
      return body;
    }).end();

    const body=enn.lift('body',(body)=>{
      res.end(body);
    }).end('json',(json={},stat=true)=>{
      let data=json;
      if(stat){
        data={
          stat:`${res.statusCode}`,
          msg:`${res.statusMessage}`,
          data:data,
        };
      }
      res.end(enn.str(data));
    });

    return stat;
  };
};
enn.http.serv=(
  cmmn=(req,res,opt)=>{},opt={}
)=>{
  const o=enn.http.prs(opt);
  const tr=enn.cach();
  const ev={};
  let def=(req,res,opt)=>{};
  const rt=(req,res,body='')=>{
    
    const purl=url.parse(
      req.url,true
    );
    const para=enn.rmap.itrt(purl.query,(name,val)=>{
      return val;
    });
    let fin=false;
    const end=(val)=>{
      fin=true;
      return val;
    };
    cmmn(req,res,{
      end:end,
      endall:end,
      path:purl.pathname,
      para:para,
      body:body,
    });
    if(fin){
      return;
    }
    let path=''
    let miss=true;
    const trig=(opt={})=>{
      enn.scan(tr.get(req.method)
        .get(path)||[],
      (idx,hndl,end)=>{
        opt.end=end;
        opt.path=purl.pathname;
        opt.para=para;
        opt.body=body;

        hndl(req,res,opt);
        miss=false;
      });
    };
    enn.rcrs((one,end)=>{
      path=`${path}/${one}`;
      trig({
        endall:end,
      });
    }, ...enn.splt(
      purl.pathname||'/', '/'
    )).sttl((one)=>{
      path=`${path}/${one}`;
      trig({
        me:true,
        //endall:end,
      });
    });
    if(miss){
      def(req,res);
    }
  };
  const buf=(req,res)=>{
    if(req.method==='PUT'||
      req.method==='POST'){
      let body='';
      req.on('data',(chnk)=>{
        body+=chnk; 
      });
      req.on('end',()=>{
        rt(req,res,body);
      });
      return;
    }
    rt(req,res);
  };
  let ht=enn.lift('refl',(hndl)=>{
    hndl(ht);
    return ht;
  });
  enn.itrt([
    'GET','POST','PUT','DELETE'
  ],(idx,meth)=>{
    ht.lift(
      meth.toLowerCase(),
    (path,hndl,prnt=false)=>{
      tr.nest(meth)
        .val(path,[])
      .push((req,res,opt)=>{
        if(prnt || opt.me)
          hndl(req,res,opt);
      });
      return ht;
    });
  });
  ht=ht.lift('def',(hndl)=>{
    def=hndl;
    return ht;
  }).lift('bind',(name,hndl)=>{
    ev[name]=ev[name]|[];
    ev[name].push(hndl);
    return ht;
  }).lift('on',(name,hndl)=>{
    ev[name]=ev[name]|[];
    ev[name].push(hndl);
    return ht;
  }).lift('lstn',(...arg)=>{
    if(o.prot.match(
      /https:/
    ) && o.key && o.cert){
      ht.serv=require('https')
        .createServer(o,buf);
    }
    ht.serv=ht.serv || require('http')
      .createServer(buf);
    enn.itrt(ev,(name,hndl)=>{
      ht.serv.on(name,hndl);
    });
    ht.serv.listen(...arg);
    return ht;
  }).lift('close',()=>{
    ht.serv.close();
  }).end();
  return ht;
};

/*enn.oauth2={};
enn.oauth2.serv=(...arg)=>{
  const serv=enn.http.serv(...arg);
  const regist=enn.lift('regist',(path,hndl)=>{
    serv.post(path,hndl);
    return authorize;
  }).end();

  const authorize=enn.lift('authorize',(path,hndl)=>{
    serv.post(path,hndl);
    return serv;
  }).end();

  return regist;
};*/
const strm={};
const fork=enn.cach().def((opt)=>{
  enn.loop(os.cpu.core,(cnt)=>{
    clust.fork();
  });
}).set('cpu',(opt)=>{
console.log(os.cpu.core);
  const thred=os.cpu.core / (opt.ht || 1);
    
  enn.loop(thred,(cnt)=>{
    clust.fork();
  });
}).set('thread',(len)=>{
  enn.loop(len,(cnt)=>{
    clust.fork();
  });

}).set('hndl',(hndl)=>{
  hndl(clust);
});
enn.clust=(name='cpu',opt={})=>{
  let master=()=>{};
  let slave=()=>{};
  const deploy=()=>{
    if(clust.isMaster){
      fork.fet(name)(opt);
      master(clust);
    }else{
      slave(clust);
    }
  };
  const c={
    mast:(hndl)=>{
      master=hndl;
      return c;
    },
    slav:(hndl)=>{
      slave=hndl;
      deploy();
      return c;
    },
  };
  return c;
};


enn.hash=(val,hndl)=>{
  const hash=crypto.createHash('sha512');
  hash.on('readable',()=>{
    hndl(hash.read()
      .toString('hex'));
  });
  hash.write(val);
  hash.end();
};

module.exports=enn;
