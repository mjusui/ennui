enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.test');
  const t=enn.cach()
    .def(undefined)
    .fil('a','x')
  .test(true,(t)=>{
    test(t.get('a')==='x');
  },(t)=>{
    test(false);
  }).test(false,(t)=>{
    test(false);
  },(t)=>{
    test(t.get('a')==='x');
  });
  end();
},2);
