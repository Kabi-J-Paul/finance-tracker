import {records,settings,persist,uid,nowIso} from './state.js';
import { checkDesc,checkAmount,checkDate,checkCat} from './validators.js';
import { compileRegex } from './search.js';
import { validateImport } from './storage.js';
import { renderTable,renderStats,renderTrend,renderCats,toast } from './ui.js';
var $=function(s){return document.querySelector(s);};
function currentList(){
    var q=$('#search-input').value;var ci=$('#search-case').checked;
    var re=compileRegex(q,ci?'i':'');var err=$('#search-error');
    if(q&&!re){err.hidden=false;err.textContent='Bad regex';}else{err.hidden=true;}
    var list=records.slice();
    if(re){list=list.filter(function(r){re.lastIndex=0;return re.test(r.description)||re.test(r.category)||re.test(String(r.amount))||re.test(r.date);});}
    var sort=$('#sort-select').value;
    if(sort==='date-desc')list.sort(function(a,b){return b.date.localeCompare(a.date);});
    if(sort==='date-asc')list.sort(function(a,b){return a.date.localeCompare(b.date);});
    if(sort==='desc-az')list.sort(function(a,b){return a.description.localeCompare(b.description);});
    if(sort==='amount-asc')list.sort(function(a,b){return a.amount-b.amount;});
    if(sort==='amount-desc')list.sort(function(a,b){return b.amount-a.amount;});
    return {list:list,re:re};
}
function refresh(){var o=currentList();renderTable(o.list,o.re);renderStats(records,settings);renderTrend(records);renderCats(settings);}
function main(){
    $('#s-base').value=settings.base;$('#s-usd').value=settings.usd;$('#s-eur').value=settings.eur;$('#s-display').value=settings.display;$('#s-cats').value=settings.cats;$('#cap-input').value=settings.cap||'';
    if(records.length===0){fetch('seed.json').then(function(r){return r.json();}).then(function(d){if(d&&d.length){for(var i=0;i<d.length;i++)records.push(d[i]);persist();}refresh();}).catch(refresh);}else refresh();
    $('#record-form').addEventListener('submit',function(e){
      e.preventDefault(); 
      $('#e-desc').textContent='';$('#e-amount').textContent='';$('#e-cat').textContent='';$('#e-date').textContent='';
      var d=$('#f-desc').value,a=$('#f-amount').value,c=$('#f-cat').value,dt=$('#f-date').value,id=$('#f-id').value;
      var e1=checkDesc(d),e2=checkAmount(a),e3=checkCat(c),e4=checkDate(dt);
      $('#e-desc').textContent=e1;$('#e-amount').textContent=e2;$('#e-cat').textContent=e3;$('#e-date').textContent=e4;
      if(e1||e2||e3||e4){$('#form-status').textContent='Fix errors.';return;}
      d=d.trim().replace(/\s{2,}/g,' ');
      if(id){for(var i=0;i<records.length;i++)if(records[i].id===id){records[i].description=d;records[i].amount=parseFloat(a);records[i].category=c.trim();records[i].date=dt.trim();records[i].updatedAt=nowIso();}}
      else records.push({id:uid(),description:d,amount:parseFloat(a),category:c.trim(),date:dt.trim(),createdAt:nowIso(),updatedAt:nowIso()});
      persist();this.reset();$('#f-id').value='';$('#form-submit').textContent='Add Record';$('#form-cancel').hidden=true;$('#form-status').textContent='Saved.';refresh();toast('Saved');

});
$('#f-amount').addEventListener('input',function(){
    var msg=checkAmount(this.value);
    $('#e-amount').textContent=msg;
    if(parseFloat(this.value)>1000000000){this.value='1000000000';$('#e-amount').textContent='Max 1,000,000,000';}
    

});

$('#form-cancel').addEventListener('click',function(){$('#record-form').reset();$('#f-id').value='';this.hidden=true;$('#form-submit').textContent='Add Record';});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var b=$('#form-cancel');if(b&&!b.hidden)b.click();}});
document.querySelector('#records').addEventListener('click',function(e){
    var ed=e.target.getAttribute('data-edit'),del=e.target.getAttribute('data-del');
    if(ed){var r=records.find(function(x){return x.id===ed;});if(!r)return;$('#f-id').value=r.id;$('#f-desc').value=r.description;$('#f-amount').value=r.amount;$('#f-cat').value=r.category;$('#f-date').value=r.date;$('#form-submit').textContent='Update';$('#form-cancel').hidden=false;document.querySelector('#form-section').scrollIntoView();}
    if(del){if(!confirm('Delete?'))return;for(var i=0;i<records.length;i++)if(records[i].id===del)records.splice(i,1);persist();refresh();}


});
$('#search-input').addEventListener('input', refresh);
$('#search-case').addEventListener('change',refresh);
$('#sort-select').addEventListener('change',refresh);
$('#cap-save').addEventListener('click', function(){settings.cap=$('#cap-input').value.trim();persist();refresh();});
$('#settings-save').addEventListener('click',function(){settings.base=$('#s-base').value;settings.usd=parseFloat($('#s-usd').value)||0.065;settings.eur=parseFloat($('#s-eur').value)||0.06;settings.display=$('#s-display').value;settings.cats=$('#s-cats').value;persist();refresh();toast('Saved');});
document.querySelectorAll('[data-curr]').forEach(function(b){b.addEventListener('click',function(){settings.display=b.getAttribute('data-curr');$('#s-display').value=settings.display;persist();refresh();})});
$('#btn-export').addEventListener('click',function(){var blob=new Blob([JSON.stringify(records,null,2)],{type:'application/json'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='finance-export.json';a.click();});
$('#btn-clear').addEventListener('click',function(){if(!confirm('Clear all?'))return;records.length=0;persist();refresh();});
$('#btn-seed').addEventListener('click',function(){fetch('seed.json').then(function(r){return r.json();}).then(function(d){records.length=0;for(var i=0;i<d.length;i++)records.push(d[i]);persist();refresh();});});
$('#file-import').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var d=JSON.parse(rd.result);var err=validateImport(d);if(err){alert(err);return;}records.length=0;for(var j=0;j<d.length;j++)records.push(d[j]);persist();refresh();toast('Imported');}catch(x){alert('Bad JSON');}};rd.readAsText(f);});
if(localStorage.getItem('sft-theme')==='dark')document.documentElement.classList.add('dark');
$('#theme-toggle').addEventListener('click',function(){document.documentElement.classList.toggle('dark');localStorage.setItem('sft-theme',document.documentElement.classList.contains('dark')?'dark':'light');});
}
document.addEventListener('DOMContentLoaded',main);