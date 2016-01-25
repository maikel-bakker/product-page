module.exports = function(grunt){

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            source: {
                files: {
                    './css/style.css': './scss/style.scss'
                }
            },

        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('autoprefixer')({browsers: ['last 5 versions', 'ie 8', 'ie 9']}), // add vendor prefixes
                ]
            },
            dist: {
                src: './css/*.css'
            }
        },
        watch: {
            sass: {
                files: '**/*.scss',
                tasks: ['sass', 'postcss']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: './',
                    //keepalive: true, // dit stopt overige 'default' taken
                    open: {
                        target: 'http://localhost:9000'
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['sass', 'postcss', 'connect', 'watch']);

};