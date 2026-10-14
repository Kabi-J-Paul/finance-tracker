import {load,save,loadSettings,loadCats,saveCats, saveSettings} from './storage.js';
export var records = load();
export var cats = loadCats();
export var  settings = loadSettings();
export function persist(){ save(records); saveCats(cats); saveSettings(settings); }
export function uid(){return 'rec_'+Date.now().toString(36)+Math.floor(Math.random()*99); }
export function nowIso(){ return new Date().toISOString()};