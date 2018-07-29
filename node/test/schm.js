enn=require('../lib/ennui.js');

const schm=enn.schm('a',(b,c)=>{
  return enn.cach({
     b:b,
     c:c,
     d:'d',
   }).def(undefined)
   .pub(true)
   .sub((k,v)=>{
     console.log(`1.${k} ${v}`);
   },'b','c');
}).add('1','x','y')
.add('2','p','q')
.add('3','k','l')
.lnk('one',(rel)=>{
  rel('1','2');
  rel('1','3');
}).lnk('two',(rel)=>{
  rel('2','3');
}).see('1',(one)=>{
  console.log(`2.${one.get('b')}`);
}).rel('two','2',(k,thr)=>{
  console.log(`3.${thr.get('b')}`);
}).rel('two','3',(k,two)=>{
  console.log(`4.${two.get('b')}`);
}).ulk('two',(rel)=>{
  rel('2','3',false);
}).rel('two','2',(k,thr)=>{
  console.log(`6.${k} ${thr.get('b')}`);
}).rel('one','1',(k,num)=>{
  console.log(`8.${k} ${num.get('b')}`);
}).rel('two','3',(k,two)=>{
  console.log(`7.${k} ${two.get('b')}`);
}).see('2',(two)=>{
console.log(`5.${two.get('c')}`);
  two.eval('b',()=>{return 'r';});
  two.set('b','s');
  two.bet('c',()=>{return 't';});
});
  
