const enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.soup');
  enn.soup((...a)=>{
    test(a[0]==='a');
    test(a[1]==='b');
    test(a[2]==='c');
  },(...a)=>{
    test(a[0]==='a');
    test(a[1]==='b');
    test(a[2]==='c');
  },end)('a','b','c');
},6);
