const http=require("http"),fs=require("fs"),path=require("path"),url=require("url");
const T={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".jpg":"image/jpeg",".png":"image/png",".json":"application/json",".svg":"image/svg+xml",".ico":"image/x-icon"};
http.createServer((req,res)=>{
  let p=decodeURIComponent(url.parse(req.url).pathname);
  if(p==="/")p="/index.html";
  const f=path.join(__dirname,p);
  if(!f.startsWith(__dirname)){res.writeHead(403).end();return;}
  fs.readFile(f,(e,d)=>{
    if(e){res.writeHead(404,{"Content-Type":"text/plain"}).end("404");return;}
    res.writeHead(200,{"Content-Type":T[path.extname(f).toLowerCase()]||"application/octet-stream"}).end(d);
  });
}).listen(5500,()=>console.log("serving on http://localhost:5500"));
