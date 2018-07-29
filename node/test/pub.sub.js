enn=require('../lib/ennui.js');

const pub=enn.cach()
.def(undefined)
.pub(true)
.sub((name,val)=>{
  console.log(`${name} ${val}`);
},'a','x','p','n');

pub.val('a','b');
pub.set('a','c');
pub.val('a','b');
console.log(
  pub.get('a')
);
pub.eval('x',()=>{return 'y';});
pub.eval('x',()=>{return 'z';});
pub.del('x');
pub.eval('p',()=>{return 'q';});
pub.nest('p');
pub.nest('n');
