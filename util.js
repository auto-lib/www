
let ensure_dir = (path,create) => {
    let fs = require('fs');
    if (!fs.existsSync(path))
    {
        if (create) fs.mkdirSync(path);
        else fail(path+'/ not found');
    }
    if (!fs.lstatSync(path)) fail(path+' is not directory');
}

let get_docs = path => {
    
    ensure_dir(path);

    return require('fs').readdirSync(path);
}

module.exports = { ensure_dir, get_docs }