enn=require('../lib/ennui.chrome.js');

enn.chrm.eval('./index.html',()=>{
  enn.asrt((test,end,cmnt)=>{
    cmnt('enn.dom.deco');
    const deco=enn.dom.deco(
      enn.dom.make('p')
    ).id('id')
    .name('name')
    .clas('cname','clas')
    .text('test')
    .blon(enn.dom.elem('id','body'))
    .test(true,(dc)=>{
      dc.attr('label','label');
    }).test(false,(dc)=>{
      dc.attr('label','label2');
    });
    
    const el=deco.end();
    
    test(el.id==='id');
    test(el.getAttribute('name')==='name');
    test(el.getAttribute('class')==='clas');
    test(el.textContent==='test');
    test(el.parentNode.id==='body');
    test(el.getAttribute('label')==='label');

    deco.attr('name','name2');
    test(el.getAttribute('name')==='name2');

    deco.clas('cname2','clas1','clas2','clas3');
    test(el.getAttribute('class')==='clas1 clas2 clas3');
    deco.clas('cname2');
    test(el.getAttribute('class')==='clas1 clas2 clas3');

    enn.dom.deco(
      enn.dom.elem('id','test')
    ).apen(el);
    test(el.parentNode.id==='test');

    deco.leav();
    test(el.parentNode==undefined);

    enn.dom.deco(
      enn.dom.elem('name','test')
    ).prep(el);
    test(el.parentNode.getAttribute('name')==='test');
    test(enn.dom.elem('name','test').children[0].id==='id');

    enn.dom.deco(
      enn.dom.elem('name','test')
    ).remv();
    test(el.parentNode==undefined);
    test(enn.dom.elem('name','test').children.length==0);

    end();
  },15);
});

