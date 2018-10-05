enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.mix');
  const mix=enn.cach({
    a:'p',
    b:'q',
  }).def(undefined)
    .rich(true)
  .sub((name,val,prev)=>{
      test((name==='c') && (val==='r') && (prev==undefined)
        || (name==='a') && (val==='s') && (prev==='p')
      );
      (name==='c') && (val==='t') && (prev==='r') && test(false);
  },'a','b','c','n','k')
  .mix({
    c:'r',
    a:'s',
  }).mix({
    c:'t',
  },false)

  const opt=mix.raw();
  test(opt.a==='s'
    && opt.b==='q'
    && opt.c==='r'
    && opt.d==undefined);

  end();
},3);
