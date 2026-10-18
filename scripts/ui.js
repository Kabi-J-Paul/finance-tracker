import { highlight } from "./search.js";
var body=document.querySelector('#records-body');
var cards=document.querySelector('#cards-container');
var noRec=document.querySelector('#no-records');
export function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
export function conv(amt,s){if(s.display==='USD')return amt*s.usd;if(s.display==='EUR')return amt*s.eur;return amt;}
export function fmt(n){return Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
export function renderTable(list,re){
    document.querySelector('#record-count').textContent=list.length+' records';
    if(list.length===0){body.innerHTML='';cards.innerHTML='';noRec.hidden=false;return;}
    noRec.hidden=true;
    var html='';
    for(var i=0; i<list.length;i++){var r=list[i]; var d=esc(r.description); var c = esc(r.category);
        if(re){try{d=highlight(d,re);c=highlight(c,re);}catch(e){}}
        html+='<tr><td>'+d+'</td><td>'+fmt(r.amount)+'</td><td>'+c+'</td><td>'+esc(r.date)+'</td><td><button data-edit="'+r.id+'">Edit</button> <button data-del="'+r.id+'">Del</button></td></tr>';
    }
    body.innerHTML=html;
    var ch='';
    for(var j=0;j<list.length;j++){var x=list[j];ch+='<div class="stat-card"><b>'+esc(x.description)+'</b><br>'+fmt(x.amount)+' | '+esc(x.category)+' | '+esc(x.date)+'<br><button data-edit="'+x.id+'">Edit</button> <button data-del="'+x.id+'">Del</button></div>';}
    cards.innerHTML=ch;
}

export function renderStats(list,s){
    var sum=0;var cats={};
    for(var i=0;i<list.length;i++){sum+=Number(list[i].amount);cats[list[i].category]=(cats[list[i].category]||0)+1;}
    var top='-'; var mx=0;for(var k in cats){if(cats[k]>mx){mx=cats[k];top=k;}}
    document.querySelector('#stat-total').textContent=list.length;
    document.querySelector('#stat-currency').textContent=s.display;
    document.querySelector('#stat-sum').textContent=fmt(conv(sum,s));
    document.querySelector('#stat-top').textContent=top;
    var cap=parseFloat(s.cap);var live=document.querySelector('#cap-live');var msg=document.querySelector('#stat-cap-msg');
    if(!cap){live.textContent='';msg.textContent='Set cap';return;}
    var rem=cap-sum;
    if(rem>=0){live.setAttribute('aria-live','polite');live.textContent='Remaining '+fmt(rem);msg.textContent='Remaining '+fmt(rem);}

    else{live.setAttribute('aria-live','assertive');live.textContent='Over by '+fmt(Math.abs(rem));msg.textContent='Over by '+fmt(Math.abs(rem));}

}
export function renderTrend(list){
    var box=document.querySelector('#trend-chart');box.innerHTML='';
    var days=[];for(var i=6;i>=0;i--){var d=new Date();d.setDate(d.getDate()-i);days.push(d.toISOString().slice(0,10));}
    var max=1; var sums=days.map(function(day){var t=0;for(var i=0;i<list.length;i++){if(list[i].date===day)t+=Number(list[i].amount);}if(t>max)max=t;return t;});
    for(var j=0;j<days.length;j++){var bar=document.createElement('div');bar.style.height=Math.max(8,(sums[j]/max*100))+'px';bar.title=days[j]+': '+fmt(sums[j]);bar.textContent=sums[j]>0?sums[j].toFixed(0):'';box.appendChild(bar);}

}

export function renderCats(s){
    var arr=(s.cats||'').split(',').map(function(x){return x.trim();}).filter(Boolean);
    document.querySelector('#cat-list').innerHTML=arr.map(function(c){return '<option value="'+ esc(c)+'">';}).join('');
    -
}
export function toast(m){var t=document.querySelector('#toast');t.hidden=false;t.textContent=m;setTimeout(function(){t.hidden=true;},2000);}

