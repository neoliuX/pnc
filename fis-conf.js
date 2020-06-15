const fs = require('fs')

fis.set('project.ignore', ['*/node_modules/**','node_modules/**','fis-conf.js', '**/README.md', 'e2e/**', 'src/**']);

const IP = '192.168.59.88:8999'

const releaseToLocal = (name, path, reg) =>    //发布到本地
	fis.media(name).match(reg, {
		release: '/$1',
		useCompile: false,
		deploy: fis.plugin('local-deliver', {
			to: path
		})
	});

const releaseServer = (name, path, reg, ip, fileName = "receiver") =>    //发布到服务器
	fis.media(name).match(reg, {
		release: '/$1',
		useCompile: false,
		deploy: fis.plugin('http-push', {
			receiver: 'http://'+ ip +'/' + fileName,
			to: path
		})
	});


var walk = function(dir) {
	var results = [];
	var list = fs.readdirSync(dir);
	list.forEach(function(file) {
			file = dir + '/' + file;
			var stat = fs.statSync(file);
			if (stat && stat.isDirectory()) { 
				if (new RegExp('\/(lang|json|js|font|css|images)$').test(file)) return false
				
				/* Recurse into a subdirectory */
				results.push(file);
				results = results.concat(walk(file));
			}
	});
	return results;
}
//发布到开发环境
const files = walk('./dist').map(p => p.replace('./dist/', ''));

const currentDate = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24)

files.concat('all').forEach(fileName => {
  releaseServer(fileName, "../dev/miniclient/" + fileName, new RegExp(`dist/${fileName}/(((?:css|js)/${currentDate}/((\\w|-|.)+).(?:js|css))|(?:lang|font|images)(.*)|(?:(?:js|css)/(?!(.+)/)(.*)))`, 'i'), IP);
})