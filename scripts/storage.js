var KEYS = {
    data: 'sft-data',
    cats: 'sft-cats',
    settings: 'sft-settings'

};

export function load(){
    try{
        var raw = localStorage.getItem(KEYS.data);
        if (!raw) return [];
        var d=JSON.parse(raw);
        return Array.isArray(d) ? d : [];
    }   catch (e) { return []; }

}
export function save(data) {
    localStorage.setItem(KEYS.data, JSON.stringify(data));
}
export function loadCats() {
    try {
        var raw = localStorage.getItem(KEYS.cats);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return ['Food', 'Books', 'Transport', 'Entertainment', 'Fees', 'Other'];

}
export function saveCats(list) {

    localStorage.setItem(KEYS.cats, JSON.stringify(list));
}
export function loadSettings() {
    try {
        var s = JSON.parse(localStorage.getItem(KEYS.settings));
        if (s) return s;
    }catch (e) {}
    return {base:'RWF',usd:0.00077,eur:0.00070,display:'RWF',cap:'',cats:'Food, Books, Transport, Entertainment, Fees, Other' }

}
export function saveSettings(s) {
    localStorage.setItem(KEYS.settings, JSON.stringify(s));

}

export function validateImport(d) {
    if (!Array.isArray(d)) return 'File must be an array.';
    for (var i = 0; i < d.length; i++) {
        var t = d[i];
        if (!t.id || typeof t.id !== 'string') return 'Row ' +(i+1)+' missing id.';
        if (!t.description || typeof t.description !== 'string') return 'Row '+(i+1)+' missing description.';
        if (typeof t.amount !== 'number' || isNaN(t.amount)) return 'Row '+ (i+1)+' bad amount.';
        if (!t.category || typeof t.category !== 'string') return 'Row '+(i+1)+' missing category.';
        if (!t.date || typeof t.date !== 'string' || !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(t.date)) return 'Row '+(i+1)+' bad date.';
    }
    return null;
}


