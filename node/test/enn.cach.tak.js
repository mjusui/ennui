enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.tak');
  const tak=enn.cach()
    .def(undefined)
    .fil('a','x')
  .tak('a',(v)=>{
    test(v==='x');
  },(v)=>{
    test(false);
  }).tak('b',(v)=>{
    test(false);
  },(v)=>{
    test(v==undefined);
  }).tak('a',(v)=>{
    test(v==='x');
  }).tak('c',null,(v)=>{
    test(v==undefined);
  });

  end();
},4);
