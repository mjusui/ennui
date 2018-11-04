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
  cmnt(`enn.http.get ${url}`);
  test(
    url.match(/^http:\/\/mjusui:password@masquerade.ninja\/a\/b\/c\?a=a&b=b/)
  );
  end();
});

enn.asrt((test,end,cmnt)=>{
  enn.http.get({
    url:'https://masquerade.ninja/'
  },enn.soup(
    test,
    end
  ));
  cmnt(`enn.http.get masq`);
});
