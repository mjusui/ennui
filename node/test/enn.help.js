enn=require('../lib/ennui.js');


enn.asrt((test,end,cmnt)=>{
  const help=enn.help((help)=>{
    help('a',(a)=>{
      return a*2;
    });
    help('b',(b)=>{
      return b*3;
    })
  });
  const eight=help.main((hl,a,b)=>{
    return hl.a(a) + hl.b(b);
  });
  const seven=help.main((hl,a,b)=>{
    return hl.a(b) + hl.b(a);
  });
  test(eight(1,2)==8);
  test(seven(1,2)==7);
  end();
},2);

enn.asrt((test,end,cmnt)=>{
  class Help {
    constructor(a,b){
      this.a=a;
      this.b=b;
    } a2(){
      return this.a*2;
    } b2(){
      return this.b*3;
    } test(){
      return this.a2() + this.b2();
    }
  };
  const help=enn.help((help)=>{
    help('a',(a)=>{
      return a*2;
    });
    help('b',(b)=>{
      return b*3;
    });
  }).main((hl,a,b)=>{
    return hl.a(a) + hl.b(b);
  });
  const l=10000000;
  let a=0
  let b=0
  enn.bench((stop,cmnt)=>{
    cmnt('new Help');
    enn.loop(l,(cnt)=>{
      new Help(1,2)
        .test();
    });
    a=stop();
  });
  enn.bench((stop,cmnt)=>{
    cmnt('enn.help.main');
    enn.loop(l,(cnt)=>{
      help(a,b);
    });
    b=stop();
  });
  test(
      (a ==b)
    ||(b < a)
    ||(a < b) && (b-a < 20)
  );
  end();
});
