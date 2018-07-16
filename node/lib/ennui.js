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

const enn=require(dst);
enn.scan([
  'elem','text','make',
  'color','sock','clas',
  'deco','tmpl'
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
enn.http.req=(method,opt,hndl)=>{
  const o=enn.http.prs(opt,{
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
  req.end();
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
  const o=enn.http.prs(opt);
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
