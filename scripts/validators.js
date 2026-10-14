export var RX_DESC = /^\S(?:.*\S)?$/;
export var RX_AMOUNT = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
export var RX_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
export var RX_CAT = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
export var RX_DUP = /\b(\w+)\s+\1\b/i;
export var RX_HAS_LETTER = /^(?=.*[A-Za-z]).+$/;

export function checkDesc(v){
    v=v.trim().replace(/\s{2,}/g,' ');
    if(v.length<3) return 'At least 3 chars.';
    if(!RX_DESC.test(v)) return 'No leading/trailing spaces.';
    if(!RX_HAS_LETTER.test(v)) return 'Must contain letters.';
    if(RX_DUP.test(v)) return 'Duplicate word';
    return '';
}

export function checkAmount(v){
    if(!RX_AMOUNT.test(v.trim())) return 'Use 12 or 12.50';
    return '';
}

export function checkDate(v){
    if(!RX_DATE.test(v.trim())) return 'Use YYYY-MM-DD format';
    var d=new Date(v);
    if(isNaN(d.getTime())) return 'Invalid date';
    return '';
}

export function checkCat(v){
    if(!RX_CAT.test(v.trim())) return 'Letters/spaces/hyphens only';
    return '';
}