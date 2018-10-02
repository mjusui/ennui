enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.para.itrt');
  let out=4;
  enn.para.itrt({
    'a':'p',
    'b':'q',
    'c':'r',
    'd':'s',
    'e':'t'
  },(key,val,cnsm,cmmt)=>{
    enn.timer(()=>{
      test((out==0) && (key==='e') && (
        val==='t'
      ) || (out==1) && (key==='d') && (
        val==='s'
      ) || (out==2) && (key==='c') && (
        val==='r'
      ) || (out==3) && (key==='b') && (
        val==='q'
      ) || (out==4) && (key==='a') && (
        val==='p'
      ));
      if(out < 2){
        cmmt(val);
      }
      out--;
      cnsm(val);
    },480/(out+1) );
  }).run((val)=>{
    test(val=='s');
    end();
  });

},5);

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.para.rmap.itrt');
  let out=4;
  enn.para.rmap.itrt({
    'a':'p',
    'b':'q',
    'c':'r',
    'd':'s',
    'e':'t'
  },(key,val,cnsm,cmmt)=>{
    enn.timer(()=>{
      test((out==0) && (key==='e') && (
        val==='t'
      ) || (out==1) && (key==='d') && (
        val==='s'
      ) || (out==2) && (key==='c') && (
        val==='r'
      ) || (out==3) && (key==='b') && (
        val==='q'
      ) || (out==4) && (key==='a') && (
        val==='p'
      ));
      if(out < 2){
        cmmt(val);
      }
      out--;
      cnsm(val);
    },480/(out+1) );
  }).run((val)=>{
    test(val.a==='p'
      && val.b==='q'
      && val.c==='r'
      && val.d==='s'
      && val.e==undefined);
    end();
  });

},5);

