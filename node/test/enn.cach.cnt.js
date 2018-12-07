enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.cnt');
  let cnt=0;
  const count=enn.cach()
    .def(undefined)
    .rich(true)
  .sub((name,val,prev)=>{
    test((cnt==0) && (
      name==='a' && val==0 && prev==undefined
    ) || (cnt==1) && (
      name==='a' && val==1 && prev==0
    ) || (cnt==2) && (
      name==='a' && val==2 && prev==1
    ) || (cnt==3) && (
      name==='a' && val==0 && prev==2
    ) || (cnt==4) && (
      name==='a' && val==-1 && prev==0
    ));
    cnt++;
  },'a')
  .sub((name,val,prev)=>{
    test(name==='b' && val==1 && prev==undefined);
  },'b')
  .inc('b',(val)=>{
    test(val==1);
  }).cnt('a')
  .inc('a',(val)=>{
    test(val==1);
  }).inc('a',(val)=>{
    test(val==2);
  }).mov('a',-2,(val)=>{
    test(val==0);
  }).dec('a');
  
  test(count==-1);
  end();
},11);
