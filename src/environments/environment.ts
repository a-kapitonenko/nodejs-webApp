// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyACOZUpG5ZXXTurFyEzbw_1HhUTrXbVYr8",
    authDomain: "nodejs-webapp-956d6.firebaseapp.com",
    databaseURL: "https://nodejs-webapp-956d6.firebaseio.com",
    projectId: "nodejs-webapp-956d6",
    storageBucket: "gs://nodejs-webapp-956d6.appspot.com/",
    messagingSenderId: "533232003352"
  },
  tinyMce: {
    tinymceScriptURL: 'assets/tinymce/tinymce.min.js',
    baseURL: '',
    skin_url: '/assets/tinymce/skins/lightgray',
    theme_url: '/assets/tinymce/themes/modern/theme.min.js',
    selector: 'angular-tinymce',
    plugins: ['textpattern'],
    textpattern_patterns: [
       {start: '*', end: '*', format: 'italic'},
       {start: '**', end: '**', format: 'bold'},
       {start: '#', format: 'h1'},
       {start: '##', format: 'h2'},
       {start: '###', format: 'h3'},
       {start: '####', format: 'h4'},
       {start: '#####', format: 'h5'},
       {start: '######', format: 'h6'},
       {start: '1. ', cmd: 'InsertOrderedList'},
       {start: '* ', cmd: 'InsertUnorderedList'},
       {start: '- ', cmd: 'InsertUnorderedList'}
    ]
  },
  ws_url:'http://localhost:5000'
};
