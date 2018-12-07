enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.ring');
  let cnt=0;
  const ring=enn.cach()
    .def(undefined)
    .rich(true)
  .sub((name,val,prev)=>{
    test((cnt==0) && (
      name==='a' && val==='o' && prev==undefined
    ) || (cnt==1) && (
      name==='a' && val==='p' && prev==='o'
    ) || (cnt==2) && (
      name==='a' && val==='o' && prev==='p'
    ) || (cnt==3) && (
      name==='a' && val==='q' && prev==='o'
    ) || (cnt==4) && (
      name==='a' && val==='o' && prev==='q'
    ) || (cnt==5) && (
      name==='a' && val==='r' && prev==='o'
    ) || (cnt==6) && (
      name==='a' && val==='q' && prev==='r'
    ));
    cnt++;
  },'a')
  .ring('a',['o','p','q','r'])
  .next('a',(val)=>{
    test(val==='p');
  }).gone('a',(c)=>{
    test(false);
  }).done('a',(c)=>{
    test(c.get('a')==='p');
  }).back('a',(val)=>{
    test(val==='o');
  }).see('a',(val)=>{
    test(val==='o');
  }).seek('a','q')
  .head('a',(val)=>{
    test(val==='o');
  }).tail('a',(val)=>{
    test(val==='r');
  }).back('a');
  
  test(ring==='q');
  end();
},14);
