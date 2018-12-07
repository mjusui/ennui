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
},);
