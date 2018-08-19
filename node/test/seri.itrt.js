enn=require('../lib/ennui.js');
const exec=require('child_process').exec;

enn.seri.itrt({
  'a':'x',
  'b':'y',
  'c':'z',
},(name,val,next,end)=>{
  exec(`echo ${name} ${val}`,(err,stdout,stderr)=>{
    console.log(
      `1. ${stdout}`.replace(/\n$/,''));
    if(name==='b')
      console.log(`4. ${end(val)}`);
    next();
  });
}).ready((val)=>{
  console.log(`2. ${val}`);
});
console.log('3. d a');


