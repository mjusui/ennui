enn=require('../lib/ennui.js');
const exec=require('child_process').exec;

enn.para.scan([
  'a','b','c'
],(idx,val,cnsm,cmmt)=>{
  exec(`echo ${idx} ${val}`,(err,stdout,stderr)=>{
    console.log(
      `1. ${stdout}`.replace(/\n$/,''));
    if(0 < idx)
      console.log(`4. ${cmmt(val)}`);
    cnsm();
  });
}).ready((val)=>{
  console.log(`2. ${val}`);
});
console.log('3. d');

