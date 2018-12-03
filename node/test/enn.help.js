const enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  cmnt('enn.help');
  const help=enn.help('a',(v)=>{
    return `a-${v}`;
  }).help('b',(v)=>{
    return `b-${v}`;
  }).end((hl,x)=>{
    test(hl.a(x)==='a-x');
    test(hl.b(x)==='b-x');
  });
  help('x');
  end();
},2);
