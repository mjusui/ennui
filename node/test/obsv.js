enn=require('../lib/ennui.js');

const obsv=enn.obsv.cach()
.def(undefined)
.on((name,val)=>{
  console.log(`${name} ${val}`);
},'a','x','p');

obsv.val('a','b');
obsv.set('a','c');
obsv.val('a','b');
obsv.get('a');
obsv.eval('x',()=>{return 'y';});
obsv.eval('x',()=>{return 'z';});
obsv.del('x');
obsv.eval('p',()=>{return 'q';});
