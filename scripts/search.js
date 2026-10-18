export function compileRegex(input, flags){
    if(!input || input.trim().length===0) return null;
    try{ return new RegExp(input, flags===undefined?'i':flags) }
    catch(e){return null;}
}

export function highlight(text, regex){
    if(!regex || !text) return text;
    var flags = regex.flags.includes('g') ? regex.flags : regex.flags+'g';
    var g = new RegExp(regex.source, flags);
    return text.replace(g, function(m){ return '<mark>'+m+'</mark>'; });

}

