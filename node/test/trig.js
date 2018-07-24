enn=require('../lib/ennui.js');

const trig=enn.cach()
.def(undefined)
.trig()
.on((name,val)=>{
  console.log(`${name} ${val}`);
},'a','x','p');

trig.val('a','b');
trig.set('a','c');
trig.val('a','b');
trig.get('a');
trig.eval('x',()=>{return 'y';});
trig.eval('x',()=>{return 'z';});
trig.del('x');
trig.eval('p',()=>{return 'q';});
