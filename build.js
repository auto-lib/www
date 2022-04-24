
let log = msg => console.log(msg);

// https://www.bigomega.dev/markdown-parser
function parseMarkdown(markdownText) {
	const htmlText = markdownText
		.replace(/^### (.*$)/gim, '<h3>$1</h3>')
		.replace(/^## (.*$)/gim, '<h2>$1</h2>')
		.replace(/^# (.*$)/gim, '<h1>$1</h1>')
		.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
		.replace(/\*(.*)\*/gim, '<i>$1</i>')
		.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
		.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
		.replace(/\n$/gim, '<br />')

	return htmlText.trim()
}

let { ensure_dir, get_docs } = require('./util');

let docs = get_docs('docs');

let build = 'build/';
let fs = require('fs');
let template = require('./template');

ensure_dir(build,true);

docs.forEach(doc => {
	log(doc);
	let contents = fs.readFileSync('docs/'+doc).toString();
	console.log(contents);
	let txt = parseMarkdown(contents);
	let name = doc.replace('.md','');
	let out = template(name,txt);
	let path = build + doc.replace('.md','.html');
	fs.writeFileSync(path,out);
})