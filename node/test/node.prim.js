enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('node.prim T/F');
  test(!true === false);
  test((true==false)===false)
  test((false==false)===true);
  end();
},3);

enn.asrt((test,end,cmnt)=>{
  cmnt('node.prim array==array==false');
  test(['a','b','c']==['a','b','c']==false);
  end();
});

enn.asrt((test,end,cmnt)=>{
  cmnt('node.prim !0===true !1===false !-1===false');
  test(!0===true);
  test(!1===false);
  test(!-1===false);
  end();
},3);



