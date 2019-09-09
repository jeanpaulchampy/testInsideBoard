//1 impossible
//2 2*1
//3 impossible
//4 2*2
//5 5*1
//6 2*3
//7 5*1+2*1
//8 2*4
//9 5*1+2*2
//10 10*1
//11 5*1+2*3
//12 10*1+2*1
//13 5*1+2*4
//14 10*1+2*2
//15 10*1+5*1
//16 10*1+2*3
//17 10*1+5*1+2*1
//...
const readline = require('readline');
const giveBackChangeUtils = require('./giveBackChangeUtils.js');

function replDemo() {
    //var tableau = [];
    var userEntry = 0;
    return new Promise(function (resolve, reject) {
        let rl = readline.createInterface(process.stdin, process.stdout)
		rl.setPrompt("Monnaie à rendre:");
		rl.prompt();
            rl.on('line', function (line) {
                if (line === "exit" || line === "quit" || line == 'q') {
                    rl.close()
                    return // bail here, so rl.prompt() isn't called again
                } else {
                    console.log(giveBackChangeUtils.giveBackChange(line));
                }
            rl.prompt();
                

    }).on('close', function () {
        resolve(userEntry)
    });
})
}

async function run() {
    try {
        let replResult = await replDemo()
    } catch (e) {
        console.log('failed:', e)
    }
}

run()
