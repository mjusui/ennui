enn=require('../lib/ennui.js');

const lab=enn.cach()
.def(undefined)
.set('a','b')
.set('c','d')
.att('a','1','2','3')
.att('c','3','4','5')
.lab('3',(k,v,end)=>{
  console.log(`${k} ${v}`);
}).det('c','3')
.lab('3',(k,v,end)=>{
  console.log(`${k} ${v}`);
}).del('c')
.lab('2',(k,v,end)=>{
  console.log(`${k} ${v}`);
}).lab('4',(val,end)=>{
  console.log(`${k} ${v}`);
});
