export var RX_DESC = /^\S(?:.*\S)?$/;
export var RX_AMOUNT = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
export var RX_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export var RX_CAT = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
export var RX_DUP = /\b(\w+)\s+\1\b/i;
export var RX_HAS_LETTER = /^(?=.*[A-Za-z]).+$/;

export function checkDesc(v){
    if(v!==v.trim()) return 'No leading/trailing spaces.';
    v=v.trim().replace(/\s{2,}/g,' ');
    if(v.length<3) return 'At least 3 chars.';
    if(!RX_DESC.test(v)) return 'No leading/trailing spaces.';
    if(!RX_HAS_LETTER.test(v)) return 'Must contain letters.';
    if(RX_DUP.test(v)) return 'Duplicate word';
    return '';
}

export function checkAmount(v){
    if(!RX_AMOUNT.test(v.trim())) return 'Enter Digits Only with NO commas(,)';
    var n=parseFloat(v);
    if(!isFinite(n)) return 'Too large.';
    if(n<=0) return 'Amount must be over 0.';
    if(n>1000000000) return 'Maximum amount is 1 Billion.';
    return '';
}

export function checkDate(v){
    var t=v.trim();
    if(!RX_DATE.test(t)) return 'Use YYYY-MM-DD format';
    var p=t.split('-');
    var d=new Date(t);
    if(isNaN(d.getTime())) return 'Invalid date';
    if(d.getUTCFullYear()!==Number(p[0])||d.getUTCMonth()+1!==Number(p[1])||d.getUTCDate()!==Number(p[2])) return 'Invalid date';
    return '';
}

export function checkCat(v){
    if(!RX_CAT.test(v.trim())) return 'Letters/spaces/hyphens only';
    return '';
}

export function isDuplicate(rec,list,ignoreId){
    for(var i=0;i<list.length;i++){
        var r=list[i];
        if(ignoreId && r.id===ignoreId) continue;
        if(String(r.description).trim().toLowerCase()===String(rec.description).trim().toLowerCase()
        && Number(r.amount)===Number(rec.amount)
        && String(r.category).trim().toLowerCase()===String(rec.category).trim().toLowerCase()
        && String(r.date)===String(rec.date)){
            return true;
        }
    }
    return false;
}