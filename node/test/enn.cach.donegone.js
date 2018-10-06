enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.donegone');
  const dg=enn.cach()
    .def(undefined)
    .rich(true)
  .set('a','b')
  .done('a',(c)=>{
    c.see('a',(val)=>{
      test(val==='b');
    });
  }).gone('a',(c)=>{
    test(false);
  }).done('a',(c)=>{
    test(false);
  }).gone('a',(c)=>{
    test(false);
  }).fil('a','c')
  .done('a',(c)=>{
    test(false);
  }).gone('a',(c)=>{
    c.see('a',(val)=>{
      test(val==='b');
    });
  }).gone('a',(c)=>{
    test(false);
  });
  dg.nest('x',enn.cach({p:'q'}));
  dg.gone('x',(c)=>{
    test(false);
  }).done('x',(c)=>{
    c.see('x',(val)=>{
      test(val.get('p')==='q');
    });
  }).done('x',(c)=>{
    test(false);
  });

  dg.rich(false)
  .set('l','m')
  .see('l',(val)=>{
    test(val==='m');
  }).gone('l',(c)=>{
    test(false)
  }).done('l',(c)=>{
    test(false)
  });
  
  end();
},4);

