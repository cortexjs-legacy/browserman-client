#!/usr/bin/env node

var program = require('commander');
program.version('0.0.1')

program
    .command('run')
    .description('test a page in all browsers that meets the requirement')
    .option('-d, --destination [destination]', 'the destination page url to test')
    .option('-b, --browser [browser]', 'browser name, valid values are {Chrome|Firefox|Safari|IE}')
    .option('-v, --version [version]', 'browser version, use semver to specify, for example: ^34.0')
    .action(function(options) {
        require('./lib/run').execute({
            url: options.destination,
            requirement: {
                name: options.browser || 'ALL',
                version: options.version || '*'
            }
        });
    });


program.parse(process.argv);
if (program.args.length === 0) program.help()