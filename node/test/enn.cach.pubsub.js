enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.pubsub');
  let cnt=0;
  const pub=enn.cach()
    .def(undefined)
    .rich(true)
  .sub((name,val,prev)=>{
    test((cnt==0) && (
      name==='a' && val==='b' && prev==undefined
    ) || (cnt==1) && (
      name==='a' && val==='c' && prev==='b'
    ) || (cnt==2) && (
      name==='x' && val==='y' && prev==undefined
    ) || (cnt==3) && (
      name==='x' && val==='z' && prev==='y'
    ) || (cnt==4) && (
      name==='x' && val==undefined && prev==='z'
    ) || (cnt==5) && (
      name==='s' && val==='c' && prev==undefined
    ) || (cnt==6) && (
      name==='p' && val.get('p')==='q' && prev==undefined
    ) || false);
    cnt++;
  },'a','x','p','n','s')
  .fil('a','b')
  .set('a','c')
  .fil('a','d')
  .see('a',(val)=>{
    test(val==='c');
  }).sat('x',()=>{return 'y';})
  .bet('x',()=>{return 'z';})
  .sat('x',()=>{return 'a';})
  .see('x',(val)=>{
    test(val==='z');
  }).del('x')
  .sam('s','a')
  .nest('p',enn.cach({p:'q'}));

  pub.set('a','c')
    .del('x')
    .set('x',undefined)
  test(cnt==7);

  pub.rich(false)
  .set('l','m')
  .see('l',(val)=>{
    test(val==='m');
  });

  end();
},11);
