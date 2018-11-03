const enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.roux');
  enn.roux((...a)=>{
    test(a[0]==='a');  
    test(a[1]==='b');  
    test(a[2]==='c');  
    test(a[3]==='d');  
    end();
  },'c','d')('a','b');

},4);
