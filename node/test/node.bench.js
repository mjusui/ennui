enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('node.bench');
  const l=100000000;
  const seven=7;
  const two=2;

  let t1=0;
  let t2=0;
  enn.bench((stop,cmnt)=>{
    cmnt('%');
    enn.loop(l,()=>{
      return seven % two;
    });
    t1=stop();
  });
  enn.bench((stop,cmnt)=>{
    cmnt('if -');
    enn.loop(l,()=>{
      let val=seven;
      while(two <= val){
        val=val-two;
      }
      return val;
    });
    t2=stop();
  });
  test(t1 < t2);
  end();
});
