const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let research={}, papers=[], activeTag='All';

async function load(){
  research=await (await fetch('data/research.json')).json();
  papers=await (await fetch('data/papers.json')).json();
  render();
  try{const md=await (await fetch('notes.md')).text(); $('#notesRender').innerHTML=mdToHtml(md);}catch(e){}
}
function render(){
  $('#coreInterest').textContent=research.core_interest;
  $('#designCards').innerHTML=research.design_options.map((d,i)=>`<article class="card design-card">
    <span class="badge">路线 ${String.fromCharCode(65+i)}</span>
    <div class="label">${d.name}</div>
    <h3>${d.question}</h3>
    <p class="muted">${d.evidence}</p>
    <p class="small">方法参照：${d.model_papers}</p>
  </article>`).join('');
  $('#openQuestions').innerHTML=research.open_questions.map(q=>`<div class="check">□ ${q}</div>`).join('');
  $('#questionsList').innerHTML=research.current_questions.map((q,i)=>`<div class="question"><span>WORKING QUESTION ${i+1}</span>${q}</div>`).join('');
  $('#fields').innerHTML=research.dataset_fields.map(f=>`<span class="field">${f}</span>`).join('');
  const tags=['All',...new Set(papers.flatMap(p=>p.tags))];
  $('#filterChips').innerHTML=tags.map(t=>`<button class="chip ${t==='All'?'active':''}" data-tag="${t}">${t}</button>`).join('');
  $$('.chip').forEach(b=>b.onclick=()=>{activeTag=b.dataset.tag; $$('.chip').forEach(x=>x.classList.toggle('active',x===b)); renderPapers();});
  renderPapers();
}
function statusClass(s){
  if(s==='已读') return 'read';
  if(s==='阅读中') return 'reading';
  return 'todo';
}
function renderPapers(){
  const q=($('#search')?.value||'').toLowerCase();
  const filtered=papers.filter(p=>(activeTag==='All'||p.tags.includes(activeTag)) && JSON.stringify(p).toLowerCase().includes(q));
  $('#paperList').innerHTML=filtered.map(p=>`<article class="paper">
    <div class="paper-top">
      <div>
        <div class="label">${p.authors} · ${p.year}</div>
        <h3><a href="paper.html?id=${encodeURIComponent(p.id)}">${p.title}</a></h3>
        <div class="meta"><i>${p.journal}</i> · ${p.year} · ${p.sociology_status}</div>
        <div class="meta">${p.volume}, ${p.pages}</div>
      </div>
      <div class="paper-badges">
        <span class="read-status ${statusClass(p.read_status)}">${p.read_status}</span>
        <span class="priority">${p.priority} priority</span>
      </div>
    </div>
    <div class="paper-summary"><b>方法：</b> ${p.method_original || p.method}</div>
    <div class="paper-summary"><b>数据：</b> ${p.materials}</div>
    <div class="paper-summary"><b>为什么和我的论文有关：</b> ${p.relation}</div>
    <div class="paper-links">
      <a class="btn" href="paper.html?id=${encodeURIComponent(p.id)}">打开详情页 →</a>
      <a class="btn" href="${p.url}" target="_blank" rel="noopener">DOI ↗</a>
    </div>
  </article>`).join('') || '<article class="card">没有匹配的文献。</article>';
}
function mdToHtml(md){
  let out=md.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  out=out.replace(/^### (.*)$/gm,'<h3>$1</h3>').replace(/^## (.*)$/gm,'<h2>$1</h2>').replace(/^# (.*)$/gm,'<h1>$1</h1>');
  out=out.replace(/^- \[ \] (.*)$/gm,'<div class="check">□ $1</div>').replace(/^- \[x\] (.*)$/gmi,'<div class="check">☑ $1</div>');
  out=out.replace(/^- (.*)$/gm,'<li>$1</li>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\`([^\`]+)\`/g,'<code>$1</code>');
  return out.split(/\n\n+/).map(x=>x.startsWith('<h')||x.startsWith('<div')||x.startsWith('<li')?x:`<p>${x.replace(/\n/g,'<br>')}</p>`).join('');
}
$$('.nav button').forEach(b=>b.onclick=()=>{$$('.nav button').forEach(x=>x.classList.toggle('active',x===b));$$('.tab').forEach(x=>x.classList.toggle('active',x.id===b.dataset.tab));});
$('#search').addEventListener('input',renderPapers);
load();