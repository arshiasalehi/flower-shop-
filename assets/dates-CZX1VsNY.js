const a=(t,e="en-CA")=>{const n=t instanceof Date?t:new Date(t);return new Intl.DateTimeFormat(e,{year:"numeric",month:"long",day:"numeric"}).format(n)};export{a as f};
