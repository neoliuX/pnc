const prompt = require('prompt')
const spawn = require('child_process').spawn
const branch = require('git-branch')
const cliSelect = require('cli-select');

function onErr(err) {
  return 1;
}

async function start () {
  const branchName = await branch()
  const startPath = branchName.split('_').filter(n => n !== 'feature').join('/')

  const config = require('../src/' + startPath + '/dev.config.js')['help'].values
  // console.log(config['help'])
  cliSelect({
    values: Object.keys(config),
    valueRenderer: (value, selected) => {
        if (selected) {
            // return chalk.underline(value);
        }

        return value;
    },
  }).then(value => {
    console.log('命令已拷贝到剪切板！')
    
    let proc = spawn('pbcopy')

    proc.stdin.write(
      config[value.value]
    )
    proc.stdin.end()
  });
  // const [, folder, fileName] = branchName.match(/^feature_(.+)?_(.+)$/)
  // const startPath = `${folder}/${fileName}`

  return;
}

start()