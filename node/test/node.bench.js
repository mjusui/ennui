enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{

  cmnt('node.bench % vs if -');
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

enn.asrt((test,end,cmnt)=>{
  cmnt('node.bench arr.slice vs while vs forEach');
  const l=10000000;
  const arr=['a','b','c'];

  let t1=0;
  let t2=0;
  let t3=0;
  enn.bench((stop,cmnt)=>{
    cmnt('arr.slice()');
    enn.loop(l,()=>{
      return arr.slice();
    });
    t1=stop();
  });
  enn.bench((stop,cmnt)=>{
    cmnt('while');
    enn.loop(l,()=>{
      let cnt=0;
      const ret=[];
      while(cnt < arr.length){
        ret[cnt]=arr[cnt];
        cnt++;
      }
      return ret;
    });
    t2=stop();
  });
  enn.bench((stop,cmnt)=>{
    cmnt('forEach');
    
    enn.loop(l,()=>{
      const ret=[];
      const push=(val,idx)=>{
        arr[idx]=val;
      };
      arr.forEach(push);
      return ret;
    });
    t3=stop();
  });

  test(t1 < t2);
  test(t3 < t1);
  end();
},2);

