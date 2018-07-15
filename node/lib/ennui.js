/*
const http=require('http');
const https=require('https');
*/
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

const undef=[
  'elem',
  'text',
  'make',
  'color',
  'sock',
  'clas',
  'deco',
  'http',
];
const enn=require(dst);
enn.scan(undef,(idx,name)=>{
  enn[name]=undefined;
});

enn.http={};
enn.http.pars=(opt={},ow={})=>{
  const o={};
  o.protocol=ow.protocol||ow.prot||
    opt.protocol||opt.prot||'https:'
  o.protocol=o.protocol.replace(/\/\/$/,'');
  o.prot=o.protocol;
  o.key=ow.key||opt.key;
  o.cert=ow.cert||opt.cert;
  o.hostname=ow.hostname||ow.host||
    opt.hostname||opt.host||opt.dman;
  o.family=ow.family||opt.family;
  o.port=ow.port||opt.port;
  o.localAddress=ow.localAddress||
    opt.localAddress;
  o.method=ow.method||opt.method||'GET';
    o.method=o.method.toUpperCase();
  o.path=ow.path||opt.path;
  if(o.method==='GET'&&opt.para){
    o.path+=`?${qs.stringify(opt.para)}`;
  }
  o.hash=ow.hash||opt.hash;
  if(opt.hash){
    o.path+=opt.hash;
  }
  o.headers=ow.headers||ow.header||
    opt.headers||opt.header;
  o.pass=ow.pass||ow.password||
    opt.pass||opt.password;
  o.user=ow.user||ow.username||
    opt.user||opt.username;
  o.auth=o.pass && `:${o.pass}`;
    o.auth=`${o.user}${o.pass}`;
  o.agent=ow.agent||opt.agent;
  o.timeout=ow.timeout||ow.time||
    ow.millisecond||ow.milli||ow.ms||
    opt.timeout||opt.time||opt.millisecond||
    opt.milli||opt.ms||(
      ow.second||ow.seconds||ow.sec||ow.s||
      opt.second||opt.seconds||opt.sec||opt.s
    )*1000||(
      ow.minute||ow.minutes||ow.min||ow.m||
      opt.minute||opt.minutes||opt.min||opt.m
    )*60*1000||2000;
  return o;
};
enn.http.req=(method,opt,dry=false)=>{
  const o=enn.http.pars(opt,{
    method:method,
  });
  if(dry){
    let url=o.protocol+'//';
    url+=o.auth||'';
    url+=o.hostname||'';
    if(o.port){
      url+=':'+o.port;
    }
    url+=o.path||'';
    url+=o.hash||'';
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
      opt.hndl(body);
    });
  });
  req.on('error',(e)=>{
    console.log(e.message);
  });
  let body=null;
  if(o.method!=='GET'&&opt.para){
    body=qs.stringify(opt.para);
    req.write(body);
  }
  req.end();
};
enn.http.get=(opt,dry)=>{
  return enn.http.req('get',opt,dry);
};
enn.http.put=(opt,dry)=>{
  return enn.http.req('put',opt,dry);
};
enn.http.post=(opt,dry)=>{
  return enn.http.req('post',opt,dry);
};
enn.http.delete=(opt,dry)=>{
  return enn.http.req('delete',opt,dry);
};
enn.http.resp=(cmmn=(res)=>{})=>{
  const sc=enn.cach()
    .def(undefined);
  const resp=(res)=>{
    const r={};
    let close=false;
    r.test=(val,hndl,hndl2)=>{
      if(close){
        return r;
      }
      if(val){
        hndl(r);
      }else if(hndl){
        hndl2(r);
      }return r;
    };
    r.eval=(hndl,hndl2,hndl3)=>{
      if(hndl()){
        hndl2(r);
      }else if(hndl3){
        hndl3(r);
      }
      return r;
    };
    r.cast=(name,hndl)=>{
      if(close){
        return r;
      }
      cmmn(res);
      enn.scan(sc.get(name),(idx,hndl)=>{
        hndl(res);
      });
      hndl(res);
      res.end();
      close=true;
      return r;
    };
    return r;
  };
  const r={
    def:(hndl)=>{
      sc.def(hndl);
      return r;
    },
    tmpl:(name,hndl)=>{
      sc.val(
        name,[]
      ).push(hndl);
      return r;
    },
    fix:()=>{
      return resp;
    },
  };
  enn.scan([
    100,101,102,103,
    200,201,202,203,204,205,206,207,208,226,
    300,301,302,303,304,305,306,307,308,
    400,401,402,403,404,405,406,407,408,409,410,
    411,412,413,414,415,416,417,418,421,422,423,424,426,
    451,
    500,501,502,503,504,505,506,507,508,509,510
  ],(idx,code)=>{
    r.tmpl(code,(res)=>{
      res.statusCode=code;
    });
  });
  return r;
};
enn.http.serv=(
  cmmn=(req,res,end)=>{},opt={}
)=>{
  const o=enn.http.pars(opt);
  const tr=enn.tree();
  const ev={};
  let def=(req,res,opt)=>{};
  const rt=(req,res,body='')=>{
/*
req={
  headers:{
    'user-agent': '',
    host: '',
    accept:'',
  },
  httpVersion:'1.1',
  method:'POST;,
  rawHeaders:['user-agent','',host,'',accept,''],
  rawTrailers:[].
  statusCode:'404',
  statusMessage:'NG',
  trailers:[],
  url:'/xxx/yy?a=b&c=d',
};
*/
    
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
      enn.scan(tr.get(
        req.method, path
      )||[], (idx,hndl,end)=>{
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
      url.parse(
        req.url
      ).pathname||'/', '/'
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
  const ht={};
  enn.itrt([
    'GET','POST','PUT','DELETE'
  ],(idx,meth)=>{
    ht[meth.toLowerCase()]=(
      path,hndl,prnt=false
    )=>{
      tr.val2(
        [],
        meth,
        path
      ).push((req,res,opt)=>{
        if(prnt || opt.me){
          hndl(req,res,opt);
        }
      });
      return ht;
    };
  });
  ht.def=(hndl)=>{
    def=hndl;
    return ht;
  };
  ht.on=(name,hndl)=>{
    ev[name]=ev[name]|[];
    ev[name].push(hndl);
    return ht;
  };
  ht.lstn=(...arg)=>{
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
  };
  return ht;
};

const fork=enn.cach().def((opt)=>{
  enn.loop(os.cpu.core,(cnt)=>{
    clust.fork();
  });
}).set('cpu',(opt)=>{
  const thred=(
    opt.thread || opt.thred || opt.th 
  ) || (
    os.cpu.core / (opt.ht || 1)
  );
  enn.loop(thred,(cnt)=>{
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
      fork.get(name)(opt);
      master();
    }else{
      slave();
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

module.exports=enn;
