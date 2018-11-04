const enn=require('../lib/ennui.js');

enn.asrt((test,end,cmnt)=>{
  const url=enn.http.get({
    prot:'http',
    user:'mjusui',
    pass:'password',
    host:'masquerade.ninja',
    path:'/a/b/c',
    para:{
      'a':'a',
      'b':'b'
    }
  });
  cmnt(`enn.strm.http.get ${url}`);
  test(
    url.match(/^http:\/\/mjusui:password@masquerade.ninja\/a\/b\/c\?a=a&b=b/)
  );
  end();
});

enn.asrt((test,end,cmnt)=>{
  enn.strm.http.get({
    url:'https://masquerade.ninja/lib/ennui.js'
  },test,end);
  cmnt(`enn.strm.http.get ennui.js`);
},3);
