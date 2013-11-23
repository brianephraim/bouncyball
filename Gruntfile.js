'use strict';

module.exports = function (grunt) {
  // Project configuration.
  var pkgJson = require('./package.json')
  var widgetName = pkgJson.name;
  var widgetNameAllLower = widgetName.toLowerCase();
  var widgetNameAllCap = widgetNameAllLower.toUpperCase();
  var widgetNameFirstCap = widgetNameAllLower.charAt(0).toUpperCase() + widgetNameAllLower.slice(1);
  var replacements = [
    {
      pattern: new RegExp("widgetboilerplate", "g"),
      replacement: widgetNameAllLower
    },
    {
      pattern: new RegExp("Widgetboilerplate", "g"),
      replacement: widgetNameFirstCap
    },
    {
      pattern: new RegExp("WIDGETBOILERPLATE", "g"),
      replacement: widgetNameAllCap
    }
  ];


  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true, 
            cwd: './', 
            src: ['js/widgetboilerplate.js'], 
            dest: './', 
            rename: function(dest, src) {
              // use the source directory to create the file
              // example with your directory structure
              //   dest = 'dev/js/'
              //   src = 'module1/js/main.js'
              return widgetName + '.js';
            }
          },
          {
            expand: true, 
            cwd: './', 
            src: ['css/widgetboilerplate.css'], 
            dest: './', 
            rename: function(dest, src) {
              // use the source directory to create the file
              // example with your directory structure
              //   dest = 'dev/js/'
              //   src = 'module1/js/main.js'
              return widgetName + '.css';
            }
          }
        ]
      }
    },
    clean: ["widgetboilerplate.js,css/widgetboilerplate.css"],
    config: {
      dist: './'
    },
    'string-replace': {
      inline: {
        // files: {
        //   'widgetboilerplate.js': 'widgetboilerplate.js'
        // },
        files: [
          {
            src: '**/*.*', 
            dest: './', 
            filter: function(filepath) {
              
              //return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
              var filepathHasBannedString = false;
              var bannedStrings = ['node_modules','Gruntfile.js','jquery.min.js','require.js','r.js','package.json','.git/'];

              for(var i=0,l=bannedStrings.length;i<l;i++){

                filepathHasBannedString = filepathHasBannedString || filepath.indexOf(bannedStrings[i]) === 0;
              }
              if(filepathHasBannedString){
                //console.log('----' + filepath)
                return false
              } else{
                console.log(filepath)
                return true;
              }
              
            }
          }
        ],
        options: {
          replacements: replacements
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('asdf', []);
  grunt.registerTask('default', ['string-replace','copy','clean']);
};