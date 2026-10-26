import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,join,extname,relative} from 'node:path';
import {load} from 'cheerio';
const root=resolve(import.meta.dirname,'..',process.argv[2]||'_site');
const errors=[];
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
const files=walk(root);
for(const file of files){
  if(/\.(jks|keystore|pem|key|p12)$|(^|[\\/])\.env/.test(file))errors.push(`Forbidden file: ${relative(root,file)}`);
  if(!['.html','.js','.css','.txt','.json','.xml'].includes(extname(file)))continue;
  const text=readFileSync(file,'utf8');
  if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]{30,}/.test(text))errors.push(`Possible secret: ${relative(root,file)}`);
  if(extname(file)!=='.html')continue;
  const $=load(text);
  $('[href],[src]').each((_,el)=>{
    for(const attr of ['href','src']){
      const value=$(el).attr(attr);
      if(!value||/^(https?:|mailto:|tel:|data:)/.test(value))continue;
      if(/^[a-z]+:/i.test(value)){errors.push(`Unsafe URL: ${file}`);continue;}
      const [path,hash]=value.split('#');
      const target=path?resolve(root,path.split('?')[0]):file;
      if(!existsSync(target)){errors.push(`Missing reference ${value} in ${relative(root,file)}`);continue;}
      if(hash&&extname(target)==='.html'){
        const dest=load(readFileSync(target,'utf8'));
        if(!dest('[id]').toArray().some(e=>dest(e).attr('id')===decodeURIComponent(hash)))errors.push(`Missing anchor ${value} in ${relative(root,file)}`);
      }
    }
  });
  $('img').each((_,el)=>{if($(el).attr('alt')===undefined)errors.push(`Missing image alternative: ${file}`);});
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Verified ${files.length} published files: references, anchors and secret patterns.`);
