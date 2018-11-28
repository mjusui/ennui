enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.trigfire');
  const fire=enn.cach()
    .def(undefined)
    .fil('a','x')
    .fil('b','y')
    .fil('c','z')
  .trig('roll',(cac)=>{
    const a=cac.get('a');
    const b=cac.get('b');
    const c=cac.get('c');
    cac.set('a',b)
     .set('b',c)
     .set('c',a);
  }).fire('roll')
  .tak('a',(val)=>{
    test(val==='y');
  },()=>{
    test(false);
  }).tak('b',(val)=>{
    test(val==='z');
  },()=>{
    test(false);
  })
  .tak('c',(val)=>{
    test(val==='x');
  },()=>{
    test(false);
  }).trig('cnct',(cac,d)=>{
    return cac.get('a')
      + cac.get('b')
      + cac.get('c')
      + d;
  }).fire('cnct','a');

  test(fire==='yzxa');
  end();
},4);
