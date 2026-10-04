const root=document.querySelector('#paperDetail');
const params=new URLSearchParams(location.search);
const id=params.get('id');
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function mdToHtml(md){
  let out=esc(md);
  out=out.replace(/^### (.*)$/gm,'<h3>$1</h3>').replace(/^## (.*)$/gm,'<h2>$1</h2>').replace(/^# (.*)$/gm,'<h1>$1</h1>');
  out=out.replace(/^- \[ \] (.*)$/gm,'<div class="check">□ $1</div>').replace(/^- \[x\] (.*)$/gmi,'<div class="check">☑ $1</div>');
  out=out.replace(/^- (.*)$/gm,'<li>$1</li>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\`([^\`]+)\`/g,'<code>$1</code>');
  return out.split(/\n\n+/).map(x=>x.startsWith('<h')||x.startsWith('<div')||x.startsWith('<li')?x:`<p>${x.replace(/\n/g,'<br>')}</p>`).join('');
}
async function load(){
  const papers=await (await fetch('data/papers.json')).json();
  const p=papers.find(x=>x.id===id);
  if(!p){root.innerHTML='<article class="card"><h2>找不到这篇文献</h2></article>';return;}
  document.title=p.title+' — Literature Note';
  let note='';
  try{note=await (await fetch(p.notes_file)).text();}catch(e){note='# Notes\n尚未建立笔记。';}
  const editUrl='https://github.com/zhaozheliang2002-jpg/science-silk-road-ma-thesis/edit/main/'+p.notes_file;
  root.innerHTML=`
    <article class="detail-hero">
      <div class="label">${esc(p.authors)} · ${p.year}</div>
      <h1>${esc(p.title)}</h1>
      <p class="meta"><i>${esc(p.journal)}</i> ${esc(p.volume)}, ${esc(p.pages)} · DOI ${esc(p.doi)}</p>
      <div class="paper-badges"><span class="read-status">${esc(p.read_status)}</span><span class="priority">${esc(p.priority)} priority</span></div>
      <div class="edit-row">
        <a class="btn" href="${p.url}" target="_blank">打开 DOI ↗</a>
        <a class="btn" href="${editUrl}" target="_blank">编辑这篇文献的笔记 ↗</a>
      </div>
    </article>
    <div class="detail-grid">
      <article class="detail-box"><h3>研究问题</h3><p>${esc(p.question)}</p></article>
      <article class="detail-box"><h3>方法</h3><p>${esc(p.method)}</p></article>
      <article class="detail-box"><h3>材料</h3><p>${esc(p.materials)}</p></article>
      <article class="detail-box"><h3>与我的论文关系</h3><p>${esc(p.relation)}</p></article>
      <article class="detail-box"><h3>关键启发</h3><p>${esc(p.key_insight)}</p></article>
      <article class="detail-box"><h3>可引用段落</h3><p>${esc(p.quotable_passages)}</p></article>
    </div>
    <article class="notes-box">
      <div class="label">MY READING NOTE</div>
      <div class="markdown">${mdToHtml(note)}</div>
      <div class="edit-row"><a class="btn" href="${editUrl}" target="_blank">在 GitHub 编辑本页笔记 ↗</a></div>
    </article>`;
}
load();