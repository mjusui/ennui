enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.cach.donegone');
  const dg=enn.cach()
    .def(undefined)
    .rich(true)
  .set('a','b')
  .done((c)=>{
    c.see('a',(val)=>{
      test(val==='b');
    });
  }).gone((c)=>{
    test(false);
  }).done((c)=>{
    test(false);
  }).gone((c)=>{
    test(false);
  }).fil('a','c')
  .done((c)=>{
    test(false);
  }).gone((c)=>{
    c.see('a',(val)=>{
      test(val==='b');
    });
  }).gone((c)=>{
    test(false);
  });
  dg.nest('x',enn.cach({p:'q'}));
  dg.gone((c)=>{
    test(false);
  }).done((c)=>{
    c.see('x',(val)=>{
      test(val.get('p')==='q');
    });
  }).done((c)=>{
    test(false);
  });

  dg.rich(false)
  .set('l','m')
  .see('l',(val)=>{
    test(val==='m');
  }).gone((c)=>{
    test(false)
  }).done((c)=>{
    test(false)
  });
  
  end();
},4);

