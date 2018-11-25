enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.bench');
  enn.bench((stop,cmnt)=>{
    cmnt('enn.bench');
    enn.timer(enn.soup(()=>{
      const dt=stop();
      test(290 < dt && dt < 310);
    },end),300);
  });
});
