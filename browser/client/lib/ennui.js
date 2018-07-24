/***
  ennui.js is designed by mjusi, featured by: 
    * humor predefined data model
    * gradual levels of iteration
    * fluent DOM decoration
    * stateful event handling
    * poetic abbr of pure javascript
  to hack your javascript more emotional !
***/

enn={};

ennui:{

enn.obj=JSON.parse;
enn.str=JSON.stringify;
enn.num=(tgt)=>{
  return tgt*1;
};
enn.cnct=(one,...some)=>{
  return {
    sep:(sep=' ',trim=true)=>{
      let s=one;
      enn.scan(some,(idx,val)=>{
        if(!val && trim){
          return;
        }
        s+=`${sep}${val}`;
      });
      return s;
    },
  }; 
};
enn.splt=(str,sep=' ',trim=true)=>{
  return enn.rmap.scan(str.split(
    sep
  ),(idx,sbst)=>{
    return sbst;
  },trim);
};
enn.print=(one,...oth)=>{
  console.log(enn.cnct(
    one,...oth
  ).sep());
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
enn.whic=(w=true,a=null,b=null)=>{
  if(w){
    return a;
  }
  return b;
};
enn.loop=(len,hndl,hed=0,tal=0)=>{
  len=len-tal
  let cnt=0+hed;
  let res=undefined;
  const end=(r)=>{
    cnt=len;
    res=r;
    return r;
  };
  while(cnt < len){
    hndl(cnt++,end);
  }
  return res;
};
enn.scan=(ary,hndl,hed=0,tal=0)=>{
  return enn.loop(ary.length,(cnt,end)=>{
    return hndl(cnt,ary[cnt],end);
  },hed,tal);
};
enn.nmbr=(len)=>{
  return enn.rmap.loop(len,(cnt)=>{
    return cnt;
  });
};
enn.itrt=(obj,hndl)=>{
  const key=enn.key(obj);
  const len=key.length;
  let cnt=0;
  const res=undefined;
  const end=(r)=>{
    cnt=len;
    res=r;
    return r;
  };
  while(cnt < len){
    const k=key[cnt++];
    hndl(k,obj[k],end);
  }
  return res;
};
enn.flat=(some,hndl)=>{
  let cnt=0
  let fin=false;
  let ret=undefined;
  const end=(r)=>{
    fin=true;
    ret=r;
  };
  let res=undefined;
  const nest=(some,hndl)=>{
    enn.type(some,'a',()=>{
      return enn.scan(some,(idx,val,end)=>{
        if(fin){
          end(true);
        }
        nest(val,hndl);
      });
    }) || enn.type(some,'o',()=>{
      return enn.itrt(some,(name,val,end)=>{
        if(fin){
          end(true);
        }
        nest(val,hndl);
      });
    }) || hndl(cnt++,some);
  };
  nest(some,hndl);
  return ret;
};
enn.rcrs=(nest,...some)=>{
  enn.scan(some,(idx,val,end)=>{
    nest(val,end);
  },0,1);
  return { sttl:(hndl)=>{
    hndl(
      some[some.length-1]
    );
  }};
};
/*enn.frct=(nest,one,...some)=>{
  const f={
    sttl:(hndl)=>{
      if(some.length){
        let fin=false;
        let ret=undefined;
        const end=(val)=>{
          fin=true;
          ret=val;
          return val;
        };
        nest(one,end);
        if(fin){
          return ret;
        }
        enn.frct(nest,...some)
        .sttl(hndl);
        return;
      }
      hndl(one);
    }
  };
  return f;
};*/
const rmap={};
enn.scan([
  'loop','scan','flat'
],(idx,hname)=>{
  rmap[hname]=(tgt,hndl,trim=false)=>{
    const res=[];
    let eval=(val)=>{
      res.push(val);
    };
    if(trim){
      eval=(val)=>{
        if(val){
          res.push(val);
        }
      };
    }
    enn[hname](tgt,(...arg)=>{
      eval(
        hndl(...arg)
      );
    });
    return res;
  };
});
enn.scan([
  'itrt'
],(idx,hname)=>{
  rmap[hname]=(obj,hndl,trim=false)=>{
    const res={};
    let eval=(name,val)=>{
      res[name]=val;
    };
    if(trim){
      eval=(name,val)=>{
        if(val){
          res[name]=val;
        }
      };
    }
    enn[hname](obj,(name,...arg)=>{
      eval(
        name,hndl(name,...arg)
      );
    });
    return res;
  };
});
/*enn.scan([
  'frct'
],(idx,hname)=>{
  rmap[hname]=(nest,one,...some)=>{
    const f={};
    f.sttl=(hndl,trim=false)=>{
      const res=[];
      let eval=(val)=>{
        res.push(val);
      };
      if(trim){
        eval=(val)=>{
          if(val){
            res.push(val);
          }
        };
      }
      enn[hname]((o,end)=>{
        eval(
          nest(o,end)
        );
      },one,...some).sttl((o)=>{
        eval(
          hndl(o)
        );
      });
      return res;
    };
    return f;
  };
});*/
enn.rmap=rmap;
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
      lnd[name]=undefined;
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
  const cac=enn.cach(als);
  const a={
    def:(v)=>{
      cac.def(v);
      return a;
    },
    ini:(hndl)=>{
      cac.ini(hndl);
      return a;
    },
    add:(k,v)=>{
      cac.set(k,v);
      return a;
    },
    del:(k)=>{
      cac.del(k);
    },
    see:(k)=>{
      return cac.get(k) || k;
    },
    rmap:(hndl,trim=false)=>{
      return enn.rmap.itrt(als,hndl,trim);
    },
    rond:(hndl)=>{
      return enn.itrt(als,hndl) || a;
    },
  };
  return a;
};
enn.key=(obj)=>{
  return Object.keys(obj);
};
enn.regex=(txt,f='g')=>{
  let rgx=new RegExp(txt,f);
  return {
    exe:(tgt,hndl)=>{
      let res=rgx.exec(tgt);
      if(hndl){
        return hndl(res);
      }
      return res;
    },
    tst:(tgt,hndl)=>{
      let res=rgx.test(tgt);
      if(hndl){
        return res && hndl(tgt) || res;
      }
      return res;
    },
    mch:(tgt,hndl)=>{
      let res=tgt.match(rgx);
      if(hndl){
        return hndl(res);
      }
      return res;
    },
    sch:(tgt,hndl)=>{
      let res=tgt.search(rgx);
      if(hndl){
        return hndl(res);
      }
      return res;
    },
    rep:(tgt,ins,hndl)=>{
      let res=tgt.replace(rgx,ins);
      if(hndl){
        return hndl(res);
      }
      return res;
    },
    spl:(tgt,hndl)=>{
      let res=tgt.split(rgx);
      if(hndl){
        return hndl(res);
      }
      return res;
    },
  };
};
enn.type=(tgt,tname='obj',hndl)=>{
  if(hndl){
    return enn.type(
      tgt,tname
    ) && hndl(tgt);
  }
  let a=false;
  let c=false;
  let e=false;
  let o=false;
  switch(tname){
    case 'a':tname='object';a=true;break;
    case 'arr':tname='object';a=true;break;
    case 'ary':tname='object';a=true;break;
    case 'array':tname='object';a=true;break;
    case 'b':tname='boolean';break;
    case 'bl':tname='boolean';break;
    case 'bool':tname='boolean';break;
    case 'boolean':tname='boolean';break;
    case 'c':c=true;break;
    case 'col':c=true;break;
    case 'collect':c=true;break;
    case 'collection':c=true;break;
    case 'e':e=true;tname='enn';break;
    case 'en':e=true;tname='enn';break;
    case 'enn':e=true;tname='enn';break;
    case 'ennui':e=true;tname='enn';break;
    case 'f':tname='function';break;
    case 'fnc':tname='function';break;
    case 'func':tname='function';break;
    case 'function':tname='function';break;
    case 'n':tname='number';break;
    case 'num':tname='number';break;
    case 'number':tname='number';break;
    case 'nl':tname='null';break;
    case 'nll':tname='null';break;
    case 'null':tname='null';break;
    case 'o':tname='object';o=true;break;
    case 'obj':tname='object';o=true;break;
    case 'object':tname='object';o=true;break;
    case 's':tname='string';break;
    case 'str':tname='string';break;
    case 'string':tname='string';break;
    case 'udf':tname='undefined';break;
    case 'undef':tname='undefined';break;
    case 'undefine':tname='undefined';break;
    case 'undefined':tname='undefined';break;
    default:tname='object';o=true;break;
  }
  if(a){
    return Array.isArray(tgt);
  }
  if(c){
    return tgt && tgt.length
      && enn.type(tgt.length,'n');
  }
  if(e){
    return tgt && tgt.type
      && tgt.type === 'enn';
  }
  if(o){
console.log(typeof tgt);
    return typeof tgt===tname &&
      !Array.isArray(tgt);
  }
  return typeof tgt===tname;
};
enn.vlid=(hndl)=>{
  const ary=[];
  const v={
    typ:(tname)=>{
      ary.push((tgt)=>{
        return enn.type(tgt,tname);
      });
      return v;
    },
    add:(hndl)=>{
      ary.push(hndl);
      return v;
    },
    end:()=>{
      return (tgt)=>{
        let t=true;
        enn.scan(ary,(idx,hndl,end)=>{
          t=hndl(tgt) || end(false);
        });
        return t;
      };
    },
  };
  if(hndl){
    v.add(hndl)
  }
  return v;
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
      enn.scan(
        hup[name]||[],
        (idx,hndl)=>{
          hndl(...arg);
        }
      );
      return f;
    },
    dw:(name,...arg)=>{
      flg[name]=false;
      enn.scan(
        hdw[name]||[],
        (idx,hndl)=>{
          hndl(...arg);
        }
      );
      return f;
    },
    pls:(name,...arg)=>{
      return f.up(
        name,...arg
      ).dw(
        name,...arg
      );
    },
    at:(name)=>{return flg[name];},
    on:(name,hndl)=>{
      flg[name]=flg[name]||false;
      hup[name]=hup[name]||[];
      hup[name].push(hndl);
      return f;
    },
    off:(name,hndl)=>{
      flg[name]=flg[name]||false;
      hdw[name]=hdw[name]||[];
      hdw[name].push(hndl);
      return f;
    },
    and:(hndl,...f)=>{
      let t=true;
      enn.scan(f,(idx,fname,end)=>{
        t=f.at(fname) || end(false);
      });
      if(t){
        hndl();
      }
      return t;
    },
    or:(ary=enn.key(flg),hndl)=>{
      let t=false;
      enn.scan(ary,(idx,fname,end)=>{
        t=f.at(fname) && end(true);
      });
      if(t){
        hndl();
      }
      return t;
    },
    rmap:(hndl,trim=false)=>{
      const res={};
      let eval=(name,val)=>{
        res[name]=val;
      };
      if(trim){
        eval=(name,val)=>{
          if(val){
            res[name]=val;
          }
        };
      }
      enn.itrt(flg,(name,val,end)=>{
        enn.type(val,'b',(val)=>{
          eval(
            name,hndl(name,val,end)
          );
        });
      });
      return res;
    },
    rond:(hndl,remap=false)=>{
      return enn.itrt(flg,(name,val,end)=>{
        enn.type(val,'b',(val)=>{
          hndl(name,val,end);
        });
      }) || a;
    },
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
  const c=(cnt)=>{
    while(cnt<0){
      cnt+=len;
    }
    return cnt%len;
  };
  return c;
};
enn.ring=(ary)=>{
  let cnt=0;
  const csr=enn.csr(ary.length);
  const idx=(c=cnt,jump=true)=>{
    const i=csr(c);
    if(jump)cnt=i;
    return i;
  };
  //let len=ary.length;
  const rin={
    nxt:()=>{
      return ary[idx(++cnt)];
    },
    bak:()=>{
      return ary[idx(--cnt)];
    },
    pos:(x=1)=>{
      return ary[idx(cnt+x,false)];
    },
    cur:()=>{
      return ary[idx()];
    },
    hed:()=>{
      return ary[idx(0)];
    },
    tal:()=>{
      return ary[idx(-1)];
    },
    len:()=>{
      return ary.length;
    },
    idx:()=>{
      return idx();
    },
    rmap:(hndl,trim=false)=>{
      return enn.rmap
        .scan(ary,hndl,trim);
    },
    rond:(hndl)=>{
      return enn.scan(ary,hndl) || rin;
    },
  };
  return rin;
};
const vec=[1,-1];
enn.pendulum=(ary)=>{
  let idx=0;
  let cnt=0;
  const turn=ary.length-1;
  const p={
    swing:()=>{
      idx+=vec[Math.floor(cnt++/turn%2)];
      return ary[idx];
    },
    cur:()=>{
      return ary[idx];
    },
    rmap:(hndl,trim=false)=>{
      return enn.rmap
        .scan(ary,hndl,trim);
    },
    rond:(hndl)=>{
      return enn.scan(ary,hndl) || p;
    },
  };
  return p;
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
        gro[name]=enn.rmap.scan(
          g.see(name),(idx,aval)=>{
            if(aval===val){
              return undefined;
            }
            return aval;
          },
        true);
        return g;
      }
      gro[name]=[];
      return g;
    },
    rmap:(name,hndl,trim=false)=>{
      return enn.rmap
        .scan(
          g.see(name),hndl,trim
        );
    },
    rond:(name,hndl)=>{
      return enn.scan(
        g.see(name),hndl
      ) || g;
    },
  };
  return g;
};
enn.clon=(obj={},literal=false)=>{
  const cln=enn.rmap.itrt(obj,(name,val)=>{
    return val;
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
  const def={};
  def.val=undefined;
  def.def=()=>{
    return def.val;
  };
  def.ini=def.def
  let csr=null;
  const hd={};
  const set={};
  set.set=(k,v)=>{
    cac[k]=v;
    return c;
  };
  set.trig=(k,v)=>{
    set.set(k,v);
    enn.scan(hd[k]||[],(idx,hndl)=>{
      hndl(k,v);
    });
    return c;
  };
  const lab={};
  const det=(k,l,hndl=(k,l)=>{})=>{
    enn.scan(l,(idx,l)=>{
      lab[l]=( lab[l]||' ' )
        .replace(` ${k} `);
      hndl(k,l);
    });
  };
  const c={
    type:'enn',
    trig:(yes=true)=>{
      if(yes){
        c.set=set.trig;
      }else{
        c.set=set.set;
      }
      return c;
    },
    lab:(l,hndl)=>{
      return enn.scan(enn.splt(
        lab[l]), (idx,k,end)=>{
        const v=c.get(k);
        if(v){
          hndl(k,v,end);
        }
      })||c;
    },
    att:(k, ...l)=>{
      det(k,l,(k,l)=>{
        lab[l]=`${lab[l]||' '}${k} `;
      });
      return c;
    },
    det:(k, ...l)=>{
      det(k, ...l);
      return c;
    },
    rst:(k=null)=>{
      csr=k && cac.get(k);
      return c;
    },
    cur:(k='')=>{
      if(k){
        csr=c.get(k);
      }
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
    nest:(name)=>{
      return c.get(name)||c.set(
        name,
        enn.cach()
          .def(def.val)
      ).get(name);
    },
    eval:(name,hndl, ...arg)=>{
      return c.get(name)||c.bet(
        name,hndl,...arg
      ).get(name);
    },
    val:(name,val)=>{
      return c.get(name)||c.set(
        name,val
      ).get(name);
    },
    bet:(k,h,...a)=>{
      return c.set(k,h(...a));
    },
    set:set.set,
    on:(hndl, ...key)=>{
      enn.scan(key,(idx,k)=>{
        hd[k]=hd[k]||[];
        hd[k].push(hndl);
      });
      return c;
    },
    get:(k)=>{
      return cac[k]||def.ini(k);
    },
    del:(k)=>{
      c.set(k,undefined);
      return c;
    },
    rmap:(hndl,trim=false)=>{
      return enn.tmap.itrt(
        cac,hndl,trim
      );
    },
    rond:(hndl)=>{
      return enn.itrt(
        cac,hndl
      ) || c;
    },
  };
  return c;
};
enn.chan=(v=null)=>{
  let len=0;
  let hed=null;
  let csr=null;
  const link=(v)=>{
    const l={};
      l.val=v;
      l.hed=false;
      l.nxt=l;
      l.bak=l;
    return l;
  };
  const c={
    type:'enn',
    add:(v,fil=false)=>{
      if(fil&&len&&!csr.val){
        c.mod(v);
        return c;
      }
      const l=link(v);
      csr=csr || l;
      l.bak=csr;
      l.nxt=l.bak.nxt;
      csr.nxt.bak=l;
      csr.nxt=l;
      hed=hed||l;
      hed.hed=true;
      csr=l;
      len++;
      return c;
    },
    mod:(v)=>{
      if(len<1)
        c.add(v);
      csr.val=v;
      return c;
    },
    del:()=>{
      if(len<1){
        return c;
      }
      const l=csr;
      l.bak.nxt=l.nxt;
      l.nxt.bak=l.bak;
      csr=l.bak;
      l.nxt.hed=l.hed;
      l.hed=false;
      hed=hed.hed && hed;
      hed=hed || l.nxt;
      len--;
      return c;
    },
    nxt:()=>{
      csr=csr && csr.nxt;
      return csr && csr.val;
    },
    bak:()=>{
      csr=csr && csr.bak;
      return csr && csr.val;
    },
    pos:(x=1)=>{
      let l=csr;
      while(x<0)
        x+=len;
      while(x--)
        l=l && l.nxt;
      return l && l.val;
    },
    mov:(x=1)=>{
      let l=csr;
      while(x<0)
        x+=len;
      while(x--)
        l=l && l.nxt;
      csr=l;
      return l && l.val;
    },
    hed:()=>{
      csr=hed;
      return c;
    },
    tal:()=>{
      csr=hed && hed.bak;
      return c;
    },
    cur:()=>{
      return csr && csr.val;
    },
    len:()=>{
      return len;
    },
    rmap:(hndl,trim=false)=>{
      let l=hed;
      return enn.rmap
        .loop(len,(cnt,end)=>{
          l=l.nxt;
          return hndl(l.bak.val,end);
        },trim);
    },
    rond:(hndl)=>{
      let l=hed;
      return enn.loop(len,(cnt,end)=>{
        l=l.nxt;
        hndl(l.bak.val,end);
      }) || c;
    }
  };
  c.add(v);
  return c;
};
enn.crwn=(opt={})=>{
  const cach=enn.cach()
    .def(null);
  const chan=enn.chan();
  const c={
    type:'enn',
    bak:()=>{
      chan.bak();
      return c;
    },
    nxt:()=>{
      chan.nxt();
      return c;
    },
    cur:()=>{
      return chan.len() &&
        cach.get(chan.cur());
    },
    get:(name)=>{
      return cach.get(name);
    },
    set:(name,val)=>{
      cach.get(name) ||
      chan.add(name,true);
      cach.set(name,val);
      return c;
    },
    del:()=>{
      chan.len() &&
      cach.del(chan.cur()) &&
      chan.del();
      return c;
    },
  };
  return c;
};
enn.tree=()=>{
  const root=enn.cach()
    .def(null);
  const t={
    type:'enn',
    eval1:(hndl,one)=>{
      return root.eval(one,hndl);
    },
    eval2:(hndl,one,two)=>{
      return root.nest(one)
        .eval(two,hndl);
    },
    eval3:(hndl,one,two,thr)=>{
      return root.nest(one)
        .nest(two)
        .eval(thr,hndl);
    },
    eval4:(hndl,one,two,thr,fou)=>{
      return root.nest(one)
        .nest(two)
        .nest(thr)
        .eval(fou,hndl);
    },
    eval:(hndl,one,two,thr,fou,...some)=>{
      let bran=root;
      if(some.length){
        bran=bran.nest(one)
          .nest(two)
          .nest(thr)
          .nest(fou);
        enn.scan(some,(idx,fiv)=>{
           bran=bran.nest(fiv);
        },0,1);
        bran=bran.eval(
          some[some.length-1],hndl
        );
      }else if(fou){
        bran=t.eval4(hndl,one,two,thr,fou);
      }else if(thr){
        bran=t.eval3(hndl,one,two,thr);
      }else if(two){
        bran=t.eval2(hndl,one,two);
      }else if(one){
        bran=t.eval1(hndl,one);
      }
      return bran;
    },
    val1:(val,one)=>{
      return t.eval1(()=>{
        return val;
      },one);
    },
    val2:(val,one,two)=>{
      return t.eval2(()=>{
        return val;
      },one,two);
    },
    val3:(val,one,two,thr)=>{
      return t.eval3(()=>{
        return val;
      },one,two,thr);
    },
    val4:(val,one,two,thr,fou)=>{
      return t.eval4(()=>{
        return val;
      },one,two,thr,fou);
    },
    val:(val,...some)=>{
      return t.eval(()=>{
        return val;
      },...some);
    },
    /*bet:(name,hndl,...some)=>{
      t.eval(name,hndl,...some);
      return t;
    },*/
    bet1:(hndl,one)=>{
      root.bet(one,hndl);
      return t;
    },
    bet2:(hndl,one,two)=>{
      root.nest(one)
        .bet(two,hndl);
      return t;
    },
    bet3:(hndl,one,two,thr)=>{
      root.nest(one)
        .nest(two)
        .bet(thr,hndl);
      return t;
    },
    bet4:(hndl,one,two,thr,fou)=>{
      root.nest(one)
        .nest(two)
        .nest(thr)
        .bet(fou,hndl);
      return t;
    },
    bet:(hndl,one,two,thr,fou,...some)=>{
      if(some.length){
        root.nest(one)
          .nest(two)
          .nest(thr)
          .nest(fou);
        enn.scan(some,(idx,fiv)=>{
          root.nest(fiv);
        },0,1);
        root.bet(
          some[some.length-1],
          hndl
        );
      }else if(fou){
        t.bet4(hndl,one,two,thr,fou);
      }else if(thr){
        t.bet3(hndl,one,two,thr);
      }else if(two){
        t.bet2(hndl,one,two);
      }else if(one){
        t.bet2(hndl,one);
      }
      return t;
    },
    set:(val,...some)=>{
      return t.bet(()=>{
        return val;
      }, ...some);
    },
    get:(...some)=>{
      let bran=root;
      enn.scan(some,(idx,name,end)=>{
        bran=bran.get(name)||end(null);
      });
      return bran;
    },
  };
  return t;
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
            return;
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
enn.watr=(flg=[])=>{
  const f={};
  let flen=flg.length;
  let m=null;
  let h=()=>{};
  enn.scan(flg,(idx,fname)=>{
    f[fname]=false;
  });
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
  let a=null;
  let up=false;
  const f={
    pls:(...arg)=>{
      return f.up(...arg).dw();
    },
    up:(...arg)=>{
      a=arg;
      up=true;
      enn.itrt(coal,(name,ary)=>{
        enn.scan(ary||[],(idx,hndl)=>{
          hndl(...a);
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
      if(up)hndl(...a);
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
    rmap:(hndl,trim=false)=>{
      return mod.rmap
        .rond(hndl,trim);
    },
    rond:(hndl)=>{
      return mod.rond(hndl) || m;
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
    m[name]=m[name]||func;
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
          }
        );
      }).on('error',(e)=>{
        console.log(e);
      }).on('close',(e)=>{
        console.log(e);
      });
    },
  };
  return s;
};
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
  return elm.real || elm;
};
const clas=enn.cach()
  .def(null);
enn.clas=clas;
enn.deco=(elm)=>{
  const dec={
    real:elm,
    ref:(hndl)=>{
      hndl(dec);
      return dec;
    },
    test:(val,hndl,hndl2)=>{
      if(val){
        dec.ref(hndl);
      }else if(hndl2){
        dec.ref(hndl2);
      }
      return dec;
    },
    name:(name)=>{
      return dec.atr(
        'class',name
      );
    },
    clas:(...cls)=>{
      return dec.atr(
        'class',
        enn.cnct(
          ...cls
        ).sep()
      );
    },
    cname:(name,...cls)=>{
      return dec.atr(
        'class',
        clas.eval(
          name,
          enn.cnct(
            ...cls
          ).sep
        )
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
    stl:(name,val='')=>{
      elm.style[name]=val;
     return dec;
    },
    prp:(pname,val='')=>{
      elm[pname]=val;
      return dec;
    },
    atr:(aname,val='')=>{
      elm.setAttribute(aname,val);
      return dec;
    },
    on:(ename,hndl,cap=false)=>{
      elm.addEventListener(
        ename,
        hndl,
        cap
      );
      return dec;
    },
  };
  return dec;
};
const vtr=enn.tree();
const tmpl=(hndl, ...arg)=>{
  let pt=[];
  const pttn=(name,arg)=>{
    pt.push({
      name:name,
      arg:arg,
    });
  };
  const t={
    name:(...arg)=>{
      pttn('name',arg);
      return t;
    },
    clas:(...arg)=>{
      pttn('clas',arg);
      return t;
    },
    cname:(...arg)=>{
      pttn('cname',arg);
      return t;
    },
    rmvall:(...arg)=>{
      pttn('rmvall',arg);
      return t;
    },
    rmv:(...arg)=>{
      pttn('rmv',arg);
      return t;
    },
    dprt:(...arg)=>{
      pttn('dprt',arg);
      return t;
    },
    muslall:(...arg)=>{
      pttn('muslall',arg);
      return t;
    },
    musl:(...arg)=>{
      pttn('musl',arg);
      return t;
    },
    bef:(...arg)=>{
      pttn('bef',arg);
      return t;
    },
    apen:(...arg)=>{
      pttn('apen',arg);
      return t;
    },
    fllw:(...arg)=>{
      pttn('fllw',arg);
      return t;
    },
    blon:(...arg)=>{
      pttn('blon',arg);
      return t;
    },
    stl:(...arg)=>{
      pttn('stl',arg);
      return t;
    },
    prp:(...arg)=>{
      pttn('prp',arg);
      return t;
    },
    atr:(...arg)=>{
      pttn('atr',arg);
      return t;
    },
    on:(...arg)=>{
      pttn('on',arg);
      return t;
    },
  };
  const deco=(dec)=>{
    t.deco=dec;
    return dec;
  };
  t.ref=(hndl)=>{
    hndl(t);
    return t;
  };
  t.test=(val,hndl,hndl2)=>{
    if(val){
      t.ref(hndl);
    }else if(hndl2){
      t.ref(hndl2);
    }
    return t;
  };
  t.clust=(hndl,...some)=>{
    const clu=vtr.get(...some);
    if(clu)
      hndl(clu);
    return t;
  };
  t.rles=()=>{
    enn.scan(pt,(idx,p)=>{
      t.deco[p.name](...p.arg);
    });
    return t.deco;
  };
  t.cast=()=>{
    t.deco=enn.deco(
      hndl(...arg)
    );
    return t.rles();
  };
  t.vogue=(...some)=>{
    t.deco=vtr.eval(
      t.cast, ...some
    );
    pt=[];
    return t;
  };
  return t;
};
enn.tmpl={};
enn.tmpl.make=(...arg)=>{
  return tmpl(
    enn.make, ...arg
    
  );
};
enn.tmpl.elem=(...arg)=>{
  return tmpl(()=>{
    const elm=enn.elem(...arg);
    return enn.type(elm,'c',(elm)=>{
      return elm[0];
    }) || elm;
  });
};
enn.tmpl.text=(...arg)=>{
  return tmpl(
    enn.text, ...arg
  );
};

enn.pose=(mname)=>{

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
enn.http={};
enn.http.prs=(opt={},ow={})=>{
  const o={};
  o.url=ow.url||opt.url||'';
  o.protocol=ow.protocol||ow.prot||
    opt.protocol||opt.prot||'https:'
  o.protocol=o.protocol.replace(/\/\/$/,'');
  o.prot=o.protocol;
  o.key=ow.key||opt.key||'';
  o.cert=ow.cert||opt.cert||'';
  o.hostname=ow.hostname||ow.host||
    opt.hostname||opt.host||opt.dman||'';
  o.family=ow.family||opt.family||'';
  o.port=ow.port||opt.port||'';
  o.localAddress=ow.localAddress||
    opt.localAddress||'';
  o.method=ow.method||opt.method||'GET';
    o.method=o.method.toUpperCase();
  o.path=ow.path||opt.path||'';
  /*if(o.method==='GET'&&opt.para){
    o.path+=`?${qs.stringify(opt.para)}`;
  }*/
  o.hash=ow.hash||opt.hash||'';
  /*if(opt.hash){
    o.path+=opt.hash;
  }*/
  o.headers=ow.headers||ow.header||
    opt.headers||opt.header;
  o.pass=ow.pass||ow.password||
    opt.pass||opt.password||'';
  o.user=ow.user||ow.username||
    opt.user||opt.username||'';
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
enn.http.bld=(o,para)=>{
  let url=o.url;
  if(!url){
    url+=`${o.protocol}\/\/`;
    url+=o.auth||'';
    url+=o.hostname||'';
    if(o.port){
      url+=`:${o.port}`;
    }
    if(para && o.method==='GET'){
      let q='?';
      let cnt=0;
      enn.itrt(para,(k,v)=>{
        if(cnt++){
          q+='&';
        }
        q+=`${k}=${v}`;
      });
      o.path+=q;
    }
    url+=o.path||'';
    if(o.hash){
      url+=`#${o.hash}`;
    }
  }
  return url;
};
enn.http.dat=(o,para)=>{
  let d=null;
  if(para && o.method!=='GET'){
    d=new FormData();
    enn.itrt(para,(k,v)=>{
      d.append(k,v);
    });
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

  const req=new XMLHttpRequest();
  req.open(method,url);

  enn.itrt(o.headers||{},(k,v)=>{
    req.setRequestHeader(k,v);
  });

  req.onreadystatechange=()=>{
    if(req.readyState==req.DONE)
      hndl(req.responseText);
  };

  req.send(
    enn.http.dat(o,opt.para));
};
enn.http.head=(opt,hndl)=>{
  return enn.http.req('HEAD',opt,hndl);
};
enn.http.get=(opt,hndl)=>{
  return enn.http.req('GET',opt,hndl);
};
enn.http.put=(opt,hndl)=>{
  return enn.http.req('PUT',opt,hndl);
};
enn.http.post=(opt,hndl)=>{
  return enn.http.req('POST',opt,hndl);
};
enn.http.delete=(opt,hndl)=>{
  return enn.http.req('DELETE',opt,hndl);
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
