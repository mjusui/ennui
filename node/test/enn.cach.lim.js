enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.lim');
  let cnt=0;
  const lim=enn.cach()
    .def(undefined)
    .rich(true)
  .lim('a','b')
  .sub((name,val,prev)=>{
    test((cnt==0) && (
      name==='a' && val==='y' && prev==undefined
    ) || (cnt==1) && (
      name==='b' && val==='x' && prev==undefined  
    ) || (cnt==2) && (
      name==='b' && val==='y' && prev==='x'
    ));
    cnt++;
  },'a','b','c')
  .set('a','y')
  .fil('a','x')
  .see('a',(val)=>{
    test(val==='y');
  }).fil('b','x')
  .set('b','y')
  .sat('c',()=>{return 'y';})
  .bet('c',()=>{return 'z';})
  .see('c',(val)=>{
    test(val==undefined);
  }).sam('s','b')
  .see('s',(val)=>{
    test(val==undefined);
  });
  lim.nest('c',enn.cach({p:'q'}));
  lim.see('c',(val)=>{
    test(val==undefined);
  });

  lim.rich(false)
  .set('l','m')
  .see('l',(val)=>{
    test(val==='m');
  });

  end();
},8);
