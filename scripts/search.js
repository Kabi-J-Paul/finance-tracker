export function compileRegex(input, flags){
    if(!input || input.trim().length===0) return null;
    try{ return new RegExp(input, flags||'i') }
    catch(e){return null;}
}

export function highlight(text, regex){
    if(!regex || !text) return text;
    var flags = regex.flags.includes('g') ? regex.flags : regex.flags+'g';
    var g = new RegExp(regex.source, flags);
    return text.replace(g, function(m){ return '<mark>'+m+'</mark>'; });

}

export function searchRecords(list, regex){
    if(!regex) return list;
    return list.filter(function(r){
        regex.lastIndex=0;
        return regex.test(r.description) || regex.test(r.category) || regex.test(String(r.amount)) || regex.test(r.date);

    }
);
}