enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('node.prim');
  test(!true === false);
  test((true==false)===false)
  test((false==false)===true);
  end();
},3);
