enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.seri.itrt');
  let out=0;
  enn.seri.itrt({
    'a':'p',
    'b':'q',
    'c':'r',
    'd':'s',
    'e':'t'
  },(key,val,next,end)=>{
    enn.timer(()=>{
      test((key==='a') && (out==0) && (
        val==='p'
      ) || (key==='b') && (out==1) && (
        val==='q'
      ) || (key==='c') && (out==2) && (
        val==='r'
      ) || (key==='d') && (out==3) && (
        val==='s'
      ));

      if(2 < out){
        end(val);
      }
      out++;
      next(val);
    },170);
  }).run((val)=>{
    test(val==='s');
    /*test(val[0]==='a'
      && val[1]==='b'
      && val[2]==='c'
      && val[3]==='d'
      && val.length==4);*/
    end();
  });

},5);

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.seri.rmap.itrt');
  let out=0;
  enn.seri.rmap.itrt({
    'a':'p',
    'b':'q',
    'c':'r',
    'd':'s',
    'e':'t'
  },(key,val,next,end)=>{
    enn.timer(()=>{
      test((key==='a') && (out==0) && (
        val==='p'
      ) || (key==='b') && (out==1) && (
        val==='q'
      ) || (key==='c') && (out==2) && (
        val==='r'
      ) || (key==='d') && (out==3) && (
        val==='s'
      ));

      if(2 < out){
        end(val);
      }
      out++;
      next(val);
    },170);
  }).run((val)=>{
    test(val.a==='p'
      && val.b==='q'
      && val.c==='r'
      && val.d==='s'
      && val.e==undefined);
    end();
  });

},5);

