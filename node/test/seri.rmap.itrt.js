enn=require('../lib/ennui.js');
const exec=require('child_process').exec;

enn.seri.rmap.itrt({
  'a':'x',
  'b':'y',
  'c':'z',
},(name,val,next,end)=>{
  exec(`echo ${name} ${val}`,(err,stdout,stderr)=>{
    console.log(
      `1. ${stdout}`.replace(/\n$/,''));
    if(name==='b')
      console.log(`4. ${end(val)}`);
    next(val);
  });
}).ready((val)=>{
  /*enn.itrt(val,(name,val)=>{
    console.log(`2. ${name} ${val}`);
  });*/
  console.log(val);
});
console.log('3. d');


