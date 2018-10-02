enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.seri.rlay');
  let cnt=0;
  enn.seri.rlay((rec,next,end)=>{
    enn.timer(()=>{
      test(cnt==0);
      rec.set('a','b');
      cnt++;
      next();
    },200);
  }).rlay((rec,next,end)=>{
    enn.timer(()=>{
      test(cnt==1);
      cnt++;
      end('x');
      next();
    },400);
  }).rlay((rec,next,end)=>{
    enn.timer(()=>{
      test(false);
      next();
    },170);
  }).run((rec,val)=>{
    rec.see('a',(val)=>{
      test(val==='b');
    });
    test(val==='x');
    end();
  });

},4);
