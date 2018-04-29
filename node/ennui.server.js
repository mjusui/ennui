/*
  ennui.js is designed for: 
    unique modeling,
    exhaustive iteration,
    linear DOM decoration,
    stateful event handling,
    poetic abbr of pure javascript,
  to hack your javascript more emotional !
*/

enn={};

ennui:{

enn.obj=JSON.parse;
enn.str=JSON.stringify;
enn.cnct=(one,...oth)=>{
  return {
    sep:(sep=' ')=>{
      let s=one;
      enn.scan(oth,(idx,val)=>{
        s+=`${sep}${val}`;
      });
      return s;
    },
  }; 
};
enn.print=(one,...oth)=>{
  console.log(enn.cnct(
    one,...oth
  ));
};
enn.bench=(hndl,...arg)=>{
  const t=new Date().getTime();
  hndl(...arg); 
  const dt=new Date().getTime();
  console.log(`Time(ms): ${dt-t}`);
};
enn.elem=(q,v,p=document)=>{
  let f='getElementById';
  switch(q){
    case 'i':f='getElementById';break;
    case 'id':f='getElementById';break;
    case 't':f='getElementsByTagName';break;
    case 'tag':f='getElementsByTagName';break;
    case 'tagname':f='getElementsByTagName';break;
    case 'c':f='getElementsByClassName';break;
    case 'cname':f='getElementsByClassName';break;
    case 'class':f='getElementsByClassName';break;
    case 'classname':f='getElementsByClassName';break;
    case 'n':f='getElementsByName';break;
    case 'name':f='getElementsByName';break;
  }
  return p[f](v);
};
enn.text=(txt='')=>{
  return document.createTextNode(txt);
};
enn.make=(tag='div')=>{
  return document.createElement(tag);
};
enn.loop=(len,hndl)=>{
  let cnt=0;
  while(cnt < len){
    if(hndl(cnt++)===false)break;
  }
};
enn.scan=(ary,hndl)=>{
  enn.loop(ary.length,(cnt)=>{
    hndl(cnt,ary[cnt]);
  });
};
enn.nombre=(len)=>{
  const n=[];
  enn.loop(len,(cnt)=>{
    n[cnt]=cnt;
  });
  return n;
};
enn.itrt=(obj,hndl)=>{
  const key=enn.key(obj);
  let len=key.length;
  let cnt=0;
  while(cnt<len){
    const k=key[cnt++];
    if(hndl(k,obj[k])===false)break;
  }
};
enn.land=(name,rsrc)=>{
  const lnd={};
  const l={
    add:(name,rsrc)=>{
      lnd[name]=lnd[name]||rsrc;
      return w;
    },
    mod:(name,rsrc)=>{
      lnd[name]=lnd[name]&&rsrc;
      return w;
    },
    del:(name)=>{
      lnd[name]=null;
      return w;
    },
    opn:(name,hndl)=>{
      hndl(lnd[name]||{});
      return w;
    }
  };
  if(name&&rsrc)w.add(name,rsrc);
  return w
};
enn.alias=(als={})=>{
  let def=null
  const ref=(k)=>{
    if(def){
      return def(k);
    }
    return k;
  };
  const a={
    def:(hndl)=>{
      def=hndl;
      return a;
    },
    add:(k,v)=>{als[k]=v;return a;},
    del:(k)=>{als[k]=null;return a;},
    see:(k)=>{
      if(als[k]){
        return als[k];
      }
      return ref(k);
    },
    rond:(hndl)=>{enn.itrt(als,hndl);}
  };
  return a;
};
enn.key=(obj)=>{
  return Object.keys(obj);
};
enn.flag=(flg={})=>{
  const hup={};
  const hdw={};
  const f={
    rvs:(name,...arg)=>{
      if(flg[name]){
        f.dw(name,...arg);
        return;
      }
      f.up(name,...arg);
    },
    up:(name,...arg)=>{
      flg[name]=true;
      if(hup[name])enn.scan(
        hup[name],(idx,hndl)=>{
          hndl(...arg);
      });
      return f;
    },
    dw:(name,...arg)=>{
      flg[name]=false;
      if(hdw[name])enn.scan(
        hdw[name],(idx,hndl)=>{
          hndl(...arg);
      });
      return f;
    },
    pls:(name,...arg)=>{return f.up(name,...arg).dw(name,...arg);},
    at:(name)=>{return flg[name];},
    on:(name,hndl)=>{
      if(!hup[name])hup[name]=[];
      hup[name].push(hndl);
      return f;
    },
    off:(name,hndl)=>{
      if(!hdw[name])hdw[name]=[];
      hdw[name].push(hndl);
      return f;
    },
    and:(ary=keyring(flg),hndl)=>{
      let t=true;
      enn.scan(ary,(idx,fname)=>{
        if(f.at(fname))return true;
        t=false;
        return false;
      });
      if(t&&hndl)hndl();
      return t;
    },
    or:(ary=keyring(flg),hndl)=>{
      let t=false;
      enn.scan(ary,(idx,fname)=>{
        if(f.at(fname)){
          t=true;return false;
        }return true;
      });
      if(t&&hndl)hndl();
      return t;
    },
    rond:(hndl)=>{enn.itrt(flg,hndl);}
  };
  return f;
};
enn.stat=(name,obj={})=>{
  let cur=obj;
  let edt=obj;
  const als=enn.alias();
  const stt={};
  const s={
    als:(name,lname)=>{
      als.add(name,lname);
      return s;
    },
    add:(name,obj)=>{
      name=als.see(name);
      stt[name]=obj;
      edt=stt[name];
      return s;
    },
    arw:(name)=>{
      name=als.see(name);
      cur=stt[name]||cur;
      return s;
    },
    act:(name,arg)=>{
      if(cur[name])
        cur[name](arg);
      return s;
    },
    on:(name,hndl,oname)=>{
      if(oname)
        edt=stt[oname]||edt;
      edt[name]=hndl;
      return s;
    },
  };
  if(name)
    s.add(name,obj);
  return s;
};
enn.liar=(yes=true)=>{
  const l={
    said:()=>{return yes;},
    say:()=>{yes=yes==false;return yes;}
  };
  l.nxt=l.say;
  l.cur=l.said;
  return l;
};
enn.csr=(len=0)=>{
  const c=(cnt)=>{while(cnt<0)cnt+=len;return cnt%len;};
  return c;
};
enn.ring=(...ary)=>{
  let cnt=0;
  const csr=enn.csr(ary.length);
  const idx=(c=cnt,jump=true)=>{
    const i=csr(c);
    if(jump)cnt=i;
    return i;
  };
  //let len=ary.length;
  const rin={nxt:()=>{return ary[idx(++cnt)];},
    bak:()=>{return ary[idx(--cnt)];},
    pos:(x=1)=>{return ary[idx(cnt+x,false)];},
    cur:()=>{return ary[idx()];},
    /*pus:(o)=>{return ary.push(o);},
    pop:()=>{return ary.pop();},
    sft:()=>{return ary.shift();},
    usf:(o)=>{return ary.unshift(o);},
    del:(i)=>{if(i)cnt=i;ary.splice(idx(),1);return ary[idx()];},
    add:(o,i)=>{if(i)cnt=i;ary.splice(idx(),0,o);return ary[idx()];},*/
    hed:()=>{return ary[idx(0)];},
    tal:()=>{return ary[idx(-1)];},
    len:()=>{return ary.length;},
    idx:()=>{return idx();},
    rond:(hndl)=>{enn.scan(ary,hndl);}
  };
  return rin;
};
const vec=[1,-1];
enn.pendulum=(ary)=>{
  let idx=0;
  let cnt=0;
  const turn=ary.length-1;
  return {swing:()=>{
    idx+=vec[Math.floor(cnt++/turn%2)];
    return ary[idx];},
    cur:()=>{return ary[idx];},
    rond:(hndl)=>{enn.scan(ary,hndl);}
  };
};
enn.grop=(def=[])=>{
  const gro={};
  const array=(v)=>{
    if(!Array.isArray(v))
      v=[v];
    return v;
  }
  const g={
    def:(ary=[])=>{
      def=array(ary);
      return g;
    },
    see:(name)=>{
      return gro[name]||def;
    },
    set:(name,ary=[])=>{
      gro[name]=array(ary);
      return g;
    },
    add:(name,val)=>{
      gro[name]=gro[name]||[];
      gro[name].push(val);
      return g;
    },
    del:(name,val)=>{
      if(val){
        const nary=[];
        enn.scan(g.see(name),(idx,aval)=>{
          if(aval===val)return;
          nary.push(val);
        });
        gro[name]=nary; 
        return g;
      }
      gro[name]=[];
      return g;
    },
    rond:(name,hndl)=>{
      enn.scan(g.see(name),(idx,val)=>{
        hndl(val);
      });
    }
  };
  return g;
};
enn.clon=(obj={},literal=false)=>{
  const cln={};
  enn.itrt(obj,(name,val)=>{
    cln[name]=val;
    if(literal){
      /*
        'true' -> true
        '17' -> 17
        'a,b,c' -> [a,b,c]
        '{a:b,c:d}' -> {a:b,c:d}
      */
    }
  });
  const c={
    mod:(name,val)=>{
      cln[name]=val;
      return c;
    },
    end:(name,val)=>{
      if(val && name){
        cln[name]=val;
      }
      return cln;
    },
  };
  return c;

};
enn.cach=(cac={})=>{
  //let ini=false;
  const def={};
  def.val=null;
  def.def=()=>{
    return def.val;
  };
  def.ini=def.def
  let csr=null;
  const mark=[];
  const c={
    rst:(v=null)=>{
      csr=v;
      return c;
    },
    cur:(k='')=>{
      if(k)csr=c.get(k);
      return csr;
    },
    def:(v)=>{
      def.val=v;
      def.ini=def.def;
      return c;
    },
    ini:(hndl)=>{
      def.ini=hndl;
      return c;
    },
    set:(k,v)=>{cac[k]=v;return c;},
    get:(k)=>{
      return cac[k]||def.ini(k);
    },
    del:(k)=>{cac[k]=null;return c;},
    rond:(hndl)=>{enn.itrt(cac,(k,v)=>{
      if(v)hndl(k,v);
    });},
  };
  return c;
};
/*enn.crwn=()=>{
  const tmp=null;
  const def={};
  def.val=null;
  def.def=()=>{
    return def.val;
  };
  def.ini=def.def
  let csr=null;
  const mark=[];
  const c={
    rst:(v=null)=>{
      csr=v;
      return c;
    },
    cur:(k='')=>{
      if(k)csr=c.get(k);
      return csr;
    },
    def:(v)=>{
      def.val=v;
      def.ini=def.def;
      return c;
    },
    ini:(hndl)=>{
      def.ini=hndl;
      return c;
    },
    set:(k,v)=>{cac[k]=v;return c;},
    get:(k)=>{
      return cac[k]||def.ini(k);
    },
    del:(k)=>{cac[k]=null;return c;},
    rond:(hndl)=>{enn.itrt(cac,(k,v)=>{
      if(v)hndl(k,v);
    });},
  };
  return c;
};*/
enn.chan=(v=null)=>{
  let len=0;
  let cnt=0;
  let csr=null;
  const link=(v)=>{
    const l={val:v,id:cnt++};
    l.nxt=l;
    l.bak=l;
    return l;
  };
  const c={
    add:(v,fil=false)=>{
      if(fil&&len&&!csr.val){
        c.mod(v);
        return c;
      }
      const l=link(v);
      if(len){
        l.bak=csr;
        l.nxt=csr.nxt;
        csr.nxt.bak=l;
        csr.nxt=l;
      }csr=l;
      len++;
      return c;
    },
    mod:(v)=>{if(len<1)c.add(v);csr.val=v;return c;},
    del:()=>{
      if(len<1)return c;
      const l=csr;
      l.bak.nxt=l.nxt;
      l.nxt.bak=l.bak;
      csr=l.bak;
      len--;
      return c;
    },
    nxt:()=>{if(len<1)return null;csr=csr.nxt;return csr.val;},
    bak:()=>{if(len<1)return null;csr=csr.bak;return csr.val;},
    pos:(x=1)=>{if(len<1)return null;let l=csr;while(x<0)x+=len;while(x--)l=l.nxt;return l.val;},
    mov:(x=1)=>{if(len<1)return null;let l=csr;while(x<0)x+=len;while(x--)l=l.nxt;csr=l;return csr.val;},
    hed:()=>{
      let l=csr;
      let min=l;
      enn.loop(len,(cnt)=>{
        l=l.nxt;
        if(l.id<min.id)min=l;
      });
      csr=min;
      return c;
    },
    tal:()=>{
      let l=csr;
      let max=l;
      enn.loop(len,(cnt)=>{
        l=l.nxt;
        if(max.id<l.id)max=l;
      });
      csr=max;
      return c;
    },
    cur:()=>{if(len<1)return null;return csr.val;},
    len:()=>{return len;},
    rond:(hndl)=>{
      let l=csr;
      enn.loop(len,(cnt)=>{
        hndl(l.val);
        l=l.bak;
      });
      return c;
    }
  };
  c.add(v);//hed=csr;
  return c;
};
enn.map=(len=0)=>{
  let s=()=>{return 'src';};
  let t=()=>{return 'tgt';};
  const m={
    src:(hndl)=>{s=hndl;return m;},
    tgt:(hndl)=>{t=hndl;return m;},
    len:(l)=>{if(l)len=l;return len;},
    ext:(x)=>{len=len+x;return len;},
    shk:(x)=>{len=len-x;if(len<0)len=0;return len;},
    rond:(hndl)=>{enn.loop(len,(cnt)=>{hndl(s(cnt),t(cnt))});},
  };
  return m;
};
const pal={
  nil:{r:0,g:0,b:0,a:0}
};
enn.color=(name,ow,serial)=>{
  let c={};
  let p=pal[name];
  if(!p){
    p=pal.nil;
    pal[name]=c;
  }
  if(p.r)c.r=p.r;
  if(p.g)c.g=p.g;
  if(p.b)c.b=p.b;
  if(p.a)c.a=p.a;

  if(ow.r)c.r=ow.r;
  if(ow.g)c.g=ow.g;
  if(ow.b)c.b=ow.b;
  if(ow.a)c.a=ow.a;

  if(serial)
    return 'rgba('+c.r+','+c.g+','+c.b+','+c.a+')';
  return c;
};
enn.now=(serial)=>{
  const date=new Date();
  const n={
    s:date.getUTCSeconds(),
    m:date.getUTCMinutes(),
    h:date.getUTCHours(),
    wNum:date.getUTCDay(),
    w:['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'][date.getUTCDay()],
    d:date.getUTCDate(),
    MNum:date.getUTCMonth()+1,
    M:['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'][date.getUTCMonth()],
    y:(''+date.getUTCFullYear()).substring(2,4),
    Y:date.getUTCFullYear(),
    tz:'UTC'
  };
  if(n.s<10)n.s='0'+n.s;if(n.m<10)n.m='0'+n.m;
  if(n.h<10)n.h='0'+n.h;if(n.d<10)n.d='0'+n.d;
  if(n.MNum<10)n.MNum='0'+n.MNum;
  if(serial)
      return n.h+':'+n.m+':'+n.s+', '+n.w+' '+n.d+' '+n.M+' '+n.Y+' '+n.tz;
  return n;
};
enn.queu=()=>{
  const q=[];
  return {
    enq:(o)=>{return q.push(o);},
    deq:()=>{return q.shift();},
    flu:(h)=>{
      while(q.length)h(q.shift());
    },
    len:()=>{return q.length;},
  };
};
enn.berg=(siz=1)=>{
  let len=0;
  const v={};
  const queu=enn.queu();
  const h=[];
  const s=[];
  const hit=(name,val)=>{
    enn.scan(h,(idx,hndl)=>{
      hndl(val);
    });
    v[name]=val;
  };
  const sqez=(name)=>{
    enn.scan(s,(idx,hndl)=>{
      hndl(v[name]);
    });
    v[name]=null;
  };
  const b={
    hit:(hndl)=>{
      h.push(hndl);
      return b;
    },
    sqez:(hndl)=>{
      s.push(hndl);
      return b;
    },
    see:(name)=>{
      return v[name];
    },
    del:(name)=>{
      if(v[name]){
        enn.loop(queu.len(),(cnt)=>{
          const vname=queu.deq();
          if(vname===name){
            sqez(vname);
            return
          }
          queu.enq(vname);
        });
      }
      return b;
    },
    add:(name,val)=>{
      if(!v[name]){
        hit(name,val);
        queu.enq(name);
        while(siz<queu.len()){
          sqez(queu.deq());
        }
      }
      return b;
    },
    len:()=>{return queu.len();}
  };
  return b;
};
enn.glcr=(siz=17)=>{
  let ice=null;
  let queu=null;
  const frzn=(hndl)=>{
    if(ice && queu){
      hndl();
    }
  };
  const fill=()=>{
    const cnt=queu.len();
    while(cnt < siz){
      ice();
      cnt++;
    }
  };
  const g={
    frez:(hndl)=>{
      queu=enn.queu();
      ice=()=>{
        hndl((val)=>{
          queu.enq(val);
        });
      };
      fill();
      return g;
    },
    thaw:(hndl)=>{
      frzn(()=>{
        if(queu.len()){
          hndl(queu.deq());
        }else{
          enn.timer(()=>{
            g.thaw(hndl);
          },170);
        }
        fill();
      });
      return g;
    },
  };
  g.pull=g.thaw;
 return g;
};
enn.watr=(flg)=>{
  let f={};
  let flen=flg.length;
  let m=null;
  let h=()=>{};
  enn.scan(flg,(idx,fname)=>{f[fname]=false;});
  const w={
    up:(fname,model)=>{
      if(f[fname])return w;
      f[fname]=true;
      if(--flen)return w;
      m=model;
      h(model);
      return w;
    },
    dw:(fname)=>{
      if(flg[name]){
        flg[name]=false;
        flen++;
      }
      return w;
    },
    flod:(hndl)=>{
      h=hndl;
      if(flen)return w;
      h(model);
      return w;
    }
  };
  return w;
};
enn.fire=()=>{
  const coal={};
  let m=null;
  let up=false;
  const f={
    pls:(model)=>{
      return f.up(model).dw();
    },
    up:(model)=>{
      m=model;
      up=true;
      enn.itrt(coal,(name,ary)=>{
        if(ary)enn.scan(ary,(idx,hndl)=>{
          hndl(model);
        });
      });
      return f;
    },
    dw:()=>{
      up=false;
      return f;
    },
    fuel:(name,hndl)=>{
      coal[name]=coal[name]||[];
      coal[name].push(hndl);
      if(up)hndl(m);
      return f;
    },
    chil:(name)=>{coal[name]=null;return f;},
  };
  return f;
};
enn.stea=(flg)=>{
  const w=enn.watr(flg);
  const f=enn.fire();
  w.flod(f.up);
  const s={
    up:(fname,model)=>{
      w.up(fname,model);
      return s;
    },
    fuel:(name,hndl)=>{
      f.fuel(name,hndl);
      return s;
    },
    chil:(name)=>{
      f.chil(name);
      return s;
    }
  };
  return s;

};
enn.mode=(ary)=>{
  const mod=enn.ring(ary);
  const ptn={};
  const val={};
  const chng=(mname)=>{
    enn.itrt(ptn,(name,ptrn)=>{
      val[name]=ptrn[mname];
    });
    return mname;
  };
  const m={
    rond:(hndl)=>{
      enn.loop(mod.len(),(cnt)=>{
        hndl(mod.cur());
        mod.nxt();
      });
      return m;
    },
    val:(name,ptrn)=>{
      if(ptrn){
        ptn[name]=ptrn;
        return m;
      }
      if(name){
        return val[name];
      }
      return val;
    },
    /*val:(ptn)=>{
      return {
        pos:(x)=>{return ptn[mod.pos(x)];},
        val:()=>{return ptn[mod.cur()];},
      };
    }*/
  };
  enn.itrt(mod,(name,func)=>{
    if(m[name])return;
    m[name]=func;
  });
  m.nxt=()=>{return chng(mod.nxt());};
  m.bak=()=>{return chng(mod.bak());};
  m.cur=()=>{return chng(mod.cur());};
  return m;
};
enn.sock=(opt)=>{
  const soc=new WebSocket(
    opt.url,
    opt.prot
  );
  const h={}
  const s={
    on:(name,hndl)=>{
      h[name]=h[name]||[];
      h[name].push(hndl);
      return s;
    },
    emit:(name,opt)=>{
      opt.name=name;
      s.send(opt);
      return s;
    },
    send:(opt)=>{
      soc.send(enn.str(
        opt
      ));
      return s;
    },
    end:()=>{
      enn.hndl(
        soc
      ).on('open',(e)=>{
        console.log(e);
      }).on('message',(e)=>{
        console.log(e);
        const opt=enn.obj(e.data);
        enn.scan(
        h[opt.name]||[],(idx,hndl)=>{
          hndl(opt);          
        });
      }).on('error',(e)=>{
        console.log(e);
      }).on('close',(e)=>{
        console.log(e);
      });
    },
  };
  return s;
};
/*const soc=enn.cach()
  .def(null);
const sochndl=enn.cach()
  .def();
enn.sock={
  send:(opt)=>{
    soc.cur().real.send(
      enn.str(opt)
    );
    return enn.sock;
  },
  cur:(name)=>{
    soc.cur(name);
    return enn.sock;
  },
  del:(name)=>{
    soc.get(
      name
    ).real.close();
    return enn.sock;
  },
  add:(name,opt)=>{
    const s=soc.get(name)||soc.set(
      name,
      enn.hndl(new WebSocket(
        opt.url,
        opt.prot
      )).on('open',(e)=>{
        console.log(e);
      }).on('message',(e)=>{
        console.log(e);
        console.log(e.data);
        const opt=enn.obj(e.data);
        enn.itrt(
        sochndl[opt.name],(idx,hndl)=>{
          hndl(opt);          
        });
      }).on('error',(e)=>{
        console.log(e);
      }).on('close',(e)=>{
        console.log(e);
        soc.del(name);
      })
    ).get(name);
    soc.cur(name);
    return enn.sock;
  },
  on:(name,hndl)=>{
    const ary=sochndl[name]||[];
    ary.push(hndl);
    return enn.sock;
  },
};*/
enn.hndl=(tgt)=>{
  const h={
    real:tgt,
    on:(name,hndl,cap)=>{
      let hndlr='addEventListener';
      if(tgt.on){
        hndlr='on';
      }
      tgt[hndlr](name,hndl,cap);
      return h;
    },
  };
  return h;
};
const real=(elm)=>{
  let r=elm;
  if(elm.real)r=elm.real;
  return r;
};
const clas=enn.cach()
  .def(null);
enn.deco=(elm)=>{
  const dec={
    real:elm,
    clas:(one,...cls)=>{
      return dec.atr(
        'class',
        enn.cnct(
          one,...cls
        ).sep()
      );
    },
    cname:(name,one,...cls)=>{
      return dec.atr(
        'class',
        clas.get(name)||clas.set(
          name,
          enn.cnct(
            one,...cls
          ).sep()
        ).get(name)
      );
    },
    rmvall:()=>{
      enn.scan(elm.children,(idx,chld)=>{
        elm.removeChild(chld);
      });
      return dec;
    },
    rmv:(chld)=>{
      elm.removeChild(real(chld));
      return dec;
    },
    dprt:()=>{
      elm.parentNode.removeChild(elm);
      return dec;
    },
    muslall:(prnt)=>{
      prnt=real(prnt); 
      prnt.insertBefore(elm,prnt.children[0]);
      return dec;
    },
    musl:(bro)=>{
      bro=real(bro);
      bro.parentNode.insertBefore(elm,bro);
      return dec;
    },
    bef:(young,old)=>{
      elm.insertBefore(real(young),real(old));
      return dec;
    },
    apen:(chld)=>{
      elm.appendChild(real(chld));
      return dec;
    },
    fllw:(sis)=>{
      sis=real(sis);
      sis.parentNode.insertBefore(
        elm,
        sis.nextElementSibling
      );
      return dec;
    },
    blon:(prnt)=>{
      real(prnt).appendChild(elm);
      return dec;
    },
    stl:(name,val)=>{
      elm.style[name]=val;
     return dec;
    },
    prp:(pname,val)=>{
      elm[pname]=val;
      return dec;
    },
    atr:(aname,val)=>{
      elm.setAttribute(aname,val);
      return dec;
    },
    on:(ename,hndl,cap=false)=>{
      elm.addEventListener(ename,(e)=>{
        hndl(e);
      },cap);
      return dec;
    },
  };
  return dec;
};
enn.rand=(mult=17)=>{
  return Math.floor(
    Math.random() * 10**mult
  );
};
enn.lib=(name,val,overwrite=false)=>{
  enn[name]=enn[name]||val;
  if(overwrite){
    enn[name]=val;
  }
  return enn;
};
enn.timer=(job,intv=1000)=>{
  setTimeout(()=>{job();},intv);
};
enn.clock=(job,intv=1000)=>{
  /* stop=0, stopping=1, running=2 */
  let stat=0;
  let fire=enn.fire();
  const run=()=>{
    job();
    enn.timer(()=>{
      if(1 < stat){
        run();
      }else{
        fire.up();
        stat=0;
        stt.arw('stop');
      }
    },intv);
  };
  const stt=enn.stat('stop',{
    start:()=>{
      fire.chil('stop').dw();
      stat=2;
      run(); 
      stt.arw('running');
    },
  }).add('running',{
    stop:(hndl)=>{
      fire.fuel('stop',hndl);
      stat=1;
      stt.arw('stopping');
    },
  }).add('stopping',{
    /*start:()=>{
      stat=2;
      stt.arw('running');
    },*/
    stop:(hndl)=>{
      fire.fuel('stop',hndl);
    },
  });

  const c={
    start:()=>{
      stt.act('start');
      return c;
    },
    stop:(hndl)=>{
      stt.act('stop',hndl);
      return c;
    },
    intv:(val)=>{
      intv=val||intv;
      return intv;
    },
  };
  return c;
};
/*enn.clock=(job,interval=1000)=>{
  let stop=false;
  const q=enn.queu();
  const flush=()=>{
    q.flu((o)=>{switch(o){
      case 'run':stop=false;break;
      case 'stop':stop=true;break;
    }
    return stop;
  });};
  const trig=()=>{
    job();
    if(flush())return;
    setTimeout(()=>{trig();},interval);
  };
  trig();
  return {run:()=>{
    q.push('run');
    if(stop)trig();
    },stop:()=>{q.push('stop');}};
};*/
enn.http={
  req:(method,opt,dry)=>{
    if(opt.path)
      opt.url=opt.url+opt.path;
    if(opt.para)enn.itrt(opt.para,(k,v)=>{
      opt.url=`${opt.url}${k}=${v}&`
    });
    opt.url=opt.url.replace(/&$/,'');

    if(dry)return opt.url;

    const req=new XMLHttpRequest();
    req.open(method,opt.url);

    if(opt.header)enn.itrt(opt.header,(k,v)=>{
      req.setRequestHeader(k,v);
    });

    req.onreadystatechange=()=>{
      if(req.readyState==req.DONE)opt.hndl(req);
    };

    let d=null;
    if(opt.data)d=opt.data;
    req.send(d);
  },
  head:(opt,dry=false)=>{return enn.http.req('HEAD',opt,dry);},
  get:(opt,dry=false)=>{return enn.http.req('GET',opt,dry);},
  post:(opt,dry=false)=>{return enn.http.req('POST',opt,dry);},
  delete:(opt,dry=false)=>{return enn.http.req('DELETE',opt,dry);},
  data:(k,v)=>{
    const fd=new FormData();
    fd.append(k,v);
    const d={
      end:()=>{return fd;},
      apen:(k,v)=>{fd.append(k,v);return d;}
    };
    return d;
  }
};
/*enn.load=(js,hndl)=>{
  const scr=enn.make('script');
  scr.setAttribute('src',js);
  scr.addEventListener('load',hndl);
  enn.elem('tag','body')[0]
    .appendChild(scr);
  return scr;
};*/

/* ennui */};
module.exports=enn;