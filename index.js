#!/usr/bin/env node
const commandLineArgs = require('command-line-args');
const Tools = require('./tools');
const detectIndent = require('detect-indent');

// Types
const TABS = 'tabs';
const SPACE_1 = '1-space';
const SPACE_2 = '2-spaces';
const SPACE_3 = '3-spaces';
const SPACE_4 = '4-spaces';
const SPACE_5 = '5-spaces';
const SPACE_6 = '6-spaces';
const SPACE_7 = '7-spaces';
const SPACE_8 = '8-spaces';

const indentations = {
	[TABS] : '\t',
	[SPACE_1] : ' ',
	[SPACE_2] : '  ',
	[SPACE_3] : '   ',
	[SPACE_4] : '    ',
	[SPACE_5] : '     ',
	[SPACE_6] : '      ',
	[SPACE_7] : '       ',
	[SPACE_8] : '        ',
}

// argOptions will be populated with command line arguments.
const argOptions = commandLineArgs([
	{ alias: 'p', type: String, name: 'pattern' },
	{ alias: 'f', type: String, name: 'from' },
	{ alias: 't', type: String, name: 'to' }
]);


/**
 * Will use cli arguments or throw error if any are missing.
 * 
 * @returns {Promise}
 */
function start() {
	return new Promise((resolve, reject) => {
		const {from, to, pattern} = argOptions;

		const hasFrom = Object.keys(indentations).indexOf(from) !== -1;
		const hasTo = Object.keys(indentations).indexOf(to) !== -1;

		if(	hasFrom && hasTo && pattern) {

			resolve(argOptions);

		} else {
			
			reject('Missing arguments: ' + [
				(!hasFrom ? '"--from"' : null),
				(!hasTo ? '"--to"' : null),
				(!pattern ? '"--pattern"' : null)
			].filter(a => a).join(', '));
		}
	});
}


// ------------------------------------------------------
// Start
// ------------------------------------------------------

let from;
let to;

start()
.then(options => {
	from = options.from;
	to = options.to;
	return options.pattern;
})
.then(Tools.globFiles)
.then(matches => {
	console.log('Searching ' + matches.length + ' files...')
	return matches;
})
.then(matches => Promise.all( matches.map(Tools.read) ))
.then(files => {
	
	return files.reduce((prev, file) => {

		if(detectIndent(file.data).indent === indentations[from]) {
			console.log('Convert ' + file.name + ' from ' + from + ' to ' + to)
			
			return [
				...prev,
				Tools.write(file.name, Tools.replaceIndentations(
					file.data, indentations[from], indentations[to])
				)
			];
		}
		
		return prev;
	}, []);
})
.then(files => { 
	console.log('Converted ' + files.length + ' files.') 
})
.catch(e => {
	console.log(e);
});
