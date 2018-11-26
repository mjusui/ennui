enn=require('../lib/ennui.chrome.js');

enn.chrm.eval('./index.html',()=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.dom.pttn');
    const cast=(name,a,b,c,d)=>{
      const pttn=enn.dom.pttn(name,()=>{
        const deco=enn.dom.deco(
          enn.dom.make('input')
        ).attr('type','text')
        .valu('test')
        .bind('test',(ev)=>{
          test(ev.detail==='fire');
        }).lead(enn.dom.elem(
          'class','test'
        )).id(a);
        const el=deco.end();
        return deco;
      }).name(b)
      .test(d,(dc)=>{
        dc.attr('label',c);
      });
      const el=pttn.end();
      return el;
    };
    const el=cast('one','id','name','label',true);
    test(el.id==='id');
    test(el.getAttribute('name')==='name');
    test(el.getAttribute('label')==='label');
    test(el.parentNode.textContent==='test3');

    const el2=cast('one','id2','name2','label2',false);
    test(el.id==='id');
    test(el.getAttribute('name')==='name2');
    test(el.getAttribute('label')==='label');
    test(el.parentNode.textContent==='test3');

    el2.dispatchEvent(
      new CustomEvent('test',{
        detail:'fire'
    }));

    const el3=cast('two','idtwo','nametwo','labeltwo',true);
    test(el3.id==='idtwo');
    test(el3.getAttribute('name')==='nametwo');
    test(el3.getAttribute('label')==='labeltwo');
    test(el3.parentNode.textContent==='test3');

    end();
  },13);
});

