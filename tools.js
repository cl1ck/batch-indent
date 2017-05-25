#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

module.exports = class Tools {
	
	/**
	 * Replacer function that works well for indentation replacement.
	 * 
	 * @static
	 * @param {String} content Stuff that is indented.
	 * @param {String} from Old indentation. 
	 * @param {String} to New indentation.
	 * @returns 
	 */
	static replaceIndentations(content, from, to) {
		const reg = Tools.matcher(from);
		return content.replace(reg, 
			match => new Array((match.length / from.length) + 1).join(to)
		)
	}


	/**
	 * Create regexp for indentation matching.
	 * 
	 * @static
	 * @param {String} type Indentation to match.
	 * @returns {RegExp}
	 */
	static matcher(type) {
		return new RegExp('^(' + type + ')+(?=\\S|$| )', 'gm');
	};


	/**
	 * Retrieve a list of files with given glob pattern.
	 * 
	 * @static
	 * @param {String} pattern Glob
	 * @returns {Promise} Resolves with list of matches.
	 */
	static globFiles(pattern) {
		return new Promise((resolve, reject) => {
			glob(pattern, null, (er, files) => {
				if(er) {
					reject(er);
				} else {
					resolve(files)
				}
			})
		})
	}


	/**
	 * Read file, resolve promise with object containing name and file data.
	 * 
	 * @static
	 * @param {String} file Filename
	 * @returns {Promise}
	 */
	static read(file) {
		return new Promise((resolve, reject) => {
			fs.readFile(file, 'utf8', (error, data) => {
				if (error) reject(error);
				resolve({
					name: file,
					data: data
				});
			})
		})
	}

	/**
	 * Write given content to file.
	 * 
	 * @static
	 * @param {any} file Path to file.
	 * @param {any} content Content of file.
	 * @returns {Promise}
	 */
	static write(file, content) {
		return new Promise((resolve, reject) => {
			fs.writeFile(file, content, (error) => {
				if (error) reject(error);
				resolve(file);
			});
		});
	}
}
