import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {load} from 'cheerio';
import {build,pages,origin} from './build.mjs';
test('Published pages have complete metadata and one main heading',()=>{
  const site=build();
  for(const file of Object.keys(pages)){
    const $=load(readFileSync(join(site,file),'utf8'));
    assert.equal($('h1').length,1,file);
    assert.equal($('html').attr('lang'),'es');
    assert.ok($('meta[name="description"]').attr('content').length>60,file);
    assert.equal($('script[src^="http"]').length,0,file);
    if(file!=='404.html'){
      assert.equal($('link[rel="canonical"]').attr('href'),`${origin}/${file==='index.html'?'':file}`);
      assert.ok(JSON.parse($('script[type="application/ld+json"]').text())['@graph'].length>=4);
    }
    assert.ok(!$.html().includes('fonts.googleapis.com'));
  }
});

test('Every published Discord invitation uses the official community link',()=>{
  const site=build(),invite='https://discord.gg/tecno-bros-885235460178342009';
  let invitations=0;
  for(const file of Object.keys(pages)){
    const $=load(readFileSync(join(site,file),'utf8'));
    $('a[href]').each((_,element)=>{
      const href=$(element).attr('href'),url=new URL(href,origin);
      if(url.hostname==='discord.gg'||(['discord.com','discordapp.com'].includes(url.hostname)&&url.pathname.startsWith('/invite/'))){
        invitations++;assert.equal(href,invite,file);
      }
    });
  }
  assert.ok(invitations>=Object.keys(pages).length);
});
