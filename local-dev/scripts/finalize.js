var fs = require('fs-extra');
var path = require('path');

var buildPath = path.join(__dirname, '../build');
var deployPath = __dirname.replace('/local-dev/scripts', '');

// files to be ignored when finalizing build into root directory
var blessedFiles = ['.gitignore', 'CNAME', 'status.yml'];

// make sure /build directory exists
fs.exists(buildPath, (exists) => {
    'use strict';

    if (exists) {
        // clear out root directory, ignoring directories and blessed files
        fs.readdir(deployPath, (err, items) => {
            // iterate over each item in deployPath
            for (let item of items) {
                // get stats on each item
                fs.stat(deployPath + '/' + item, (err, stats) => {
                    // if no error and item is a file and file is *not* blessed, remove it
                    if (!err && stats && stats.isFile() && blessedFiles.indexOf(item) === -1) {
                        fs.remove(deployPath + '/' + item, err => {
                            if (!err) {
                                console.log('🗑 Removed ' + item + '!');
                            } else {
                                console.error('❗️ Error removing ' + item + ':');
                                console.error(err);
                            }
                        });
                    // be verbose about what *isn't* being removed from the build directory
                    } else {
                        console.log('🙈 Ignored ' + item + '...');
                    }
                });
            }
        });

        // walk /build and move each file into root
        fs.walk(buildPath).
            on('data', item => {
                // only move files
                if (item.stats.isFile()) {
                    var filePath = item.path.replace(__dirname.replace('/scripts', '/build'), '');

                    fs.move(item.path, deployPath + filePath, { clobber: true }, err => {
                        if (err) {
                            console.error('❗ ️Error moving ' + filePath + ':');
                            console.error(err);
                        } else {
                            console.log('✅ Moved ' + filePath + '!');
                        }
                    });
                }
            }).on('end', () => {
                // finally, get rid of /build directory
                fs.remove(buildPath, err => {
                    if (err) {
                        console.error('❗️ Error removing /build directory:');
                        console.error(err);
                    } else {
                        console.log('🗑 Removed /build directory!');
                    }
                });
            }).on('error', (err) => {
                console.error('❗️ Error walking the /build directory:');
                console.error(err);
            });
    } else {
        console.log('❗ No /build directory found!');
        console.log('💡 Run `npm run build` first.');
    }
});
