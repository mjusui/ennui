const enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.roux');
  enn.roux((...a)=>{
    test(a[0]==='a');  
    test(a[1]==='b');  
    test(a[2]==='c');  
    test(a[3]==='d');  
  },'c','d').l('a','b');
  enn.roux((...a)=>{
    test(a[0]==='a');  
    test(a[1]==='b');  
    test(a[2]==='c');  
    test(a[3]==='d');  
  },'a','b').r('c','d');
  end();
},8);
