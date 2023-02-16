// Theme
var btnTheme = document.querySelectorAll('.btn-theme'); 

// Change the icons inside the button based on previous settings
function checkTheme(){
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        // Dark
        btnTheme.forEach(el => {
            el.innerHTML = `<svg viewbox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 mr-2 transitions-all ease-in-out duration-300">
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="stroke-zinc-600 dark:stroke-slate-500 transitions-all ease-in-out duration-300 group-hover/theme:stroke-sky-500"></path>
                <path d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836" class="stroke-zinc-600 dark:stroke-slate-500 transitions-all ease-in-out duration-300 group-hover/theme:stroke-sky-500"></path>
            </svg>`;
        });

    } else {
        // Light
        btnTheme.forEach(el => {
            el.innerHTML = `<svg viewbox="0 0 24 24" fill="none" class="w-6 h-6 mr-2 transitions-all ease-in-out duration-300">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" class="fill-transparent"></path>
                <path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" class="fill-slate-500 transitions-all ease-in-out duration-300 group-hover/theme:fill-sky-500"></path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" class="fill-slate-500 transitions-all ease-in-out duration-300 group-hover/theme:fill-sky-500"></path>
            </svg>`;
        });
    }
}
checkTheme();

btnTheme.forEach(el => {
    el.addEventListener('click',()=>{
        // if set via local storage previously
        if (localStorage.getItem('color-theme') == 'dark') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('color-theme', 'light');

        // if NOT set via local storage previously
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        checkTheme();
    });
});


// Scroll to top
// Get the button
let btnTop = document.querySelector('.btn-top');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
    btnTop.style.display = 'block';
  } else {
    btnTop.style.display = 'none';
  }
}
// When the user clicks on the button, scroll to the top of the document
btnTop.addEventListener('click', backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// ---


// Copy, Preview, Code
var btnPreview = document.querySelectorAll('.btn-preview');
var btnCode = document.querySelectorAll('.btn-code');
var btnCopy = document.querySelectorAll('.btn-copy');

var previewBox = document.querySelectorAll('.preview-box');
var previewCode = document.querySelectorAll('.preview-code');

// Get code, format
function loadCode(){
    previewBox.forEach((el,index) => {
        var code = document.querySelectorAll('pre');
        
        var lines = el.innerHTML.split('\n');
        //console.log(lines)
        if (lines[0] === '')
        {
            lines.shift()
        }

        var matches;
        var indentation = (matches = /^[\s\t]+/.exec(lines[0])) !== null ? matches[0] : null;
        if (!!indentation) {
            lines = lines.map(function(line) {
                line = line.replace(indentation, '')
                return line.replace(/\t/g, '    ')
            });

            code[index].innerText = lines.join('\n').trim();
        }
    });
}
loadCode();



btnCode.forEach((el, i) => {
    var state = 0;
    el.addEventListener('click', () => {

        hightlight(i, state);
        if (previewCode[i].classList.contains('hidden')) {
            previewCode[i].classList.replace('hidden', 'flex');
            previewBox[i].classList.add('hidden');
        }
        state++

        if (el.classList.contains('bg-slate-500/10')) {
            el.classList.replace('bg-slate-500/10', 'bg-slate-500');
            el.classList.replace('text-slate-500', 'text-white');
            el.classList.add('dark:text-slate-900');

            btnPreview[i].classList.replace('bg-slate-500', 'bg-slate-500/10');
            btnPreview[i].classList.replace('text-white', 'text-slate-500');
            btnPreview[i].classList.remove('dark:text-slate-900');
        }
    });
});

btnPreview.forEach((el, i) => {
    el.addEventListener('click', () => {
        if (! previewCode[i].classList.contains('hidden')) {
            previewCode[i].classList.replace('flex', 'hidden');
            previewBox[i].classList.remove('hidden');
        }

        if (el.classList.contains('bg-slate-500/10')) {
            el.classList.replace('bg-slate-500/10', 'bg-slate-500');
            el.classList.replace('text-slate-500', 'text-white');
            el.classList.add('dark:text-slate-900');

            btnCode[i].classList.replace('bg-slate-500', 'bg-slate-500/10');
            btnCode[i].classList.replace('text-white', 'text-slate-500');
            btnCode[i].classList.remove('dark:text-slate-900');
        }
    });
});

btnCopy.forEach((el, i) => {

    el.addEventListener('click', () => {
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
        <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
      </svg>  <span class="text-xs font-bold ml-1">Copied</span>`;
        setTimeout(function () {
            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"/>
            </svg>  <span class="text-xs font-bold ml-1">Copy</span>`;
        }, 1200);
        const copyToClipboard = str => {
            const el = document.createElement('textarea');
            el.value = str;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        };
        copyToClipboard(document.querySelectorAll('.preview-code pre')[i].innerText);
    });
});


// Highlight Code
function hightlight(i, state) {
    if (state == 0) {
        const code = document.querySelectorAll('pre');

        // // change html classes
        const htmlClasses = code[i].innerHTML.match(/class="([^"]*)"/g);
        if (! htmlClasses) {
            return;
        }
        htmlClasses.forEach(word => {
            const modifiedString = replaceBetweenQuotes(code[i].innerHTML, word.slice(7, -1), `<code class="text-sky-500 dark:text-sky-400">${word.slice(7, -1)}</code>`);
            code[i].innerHTML = modifiedString;
        });

        // Change some HTML strings
        code[i].innerHTML = replaceWords(code[i].innerHTML, "/&gt;", `<code class="text-slate-500 dark:text-slate-600">/&gt;</code>`);
        code[i].innerHTML = replaceWords(code[i].innerHTML, "&gt;", `<code class="text-slate-500 dark:">&gt;</code>`);
        code[i].innerHTML = replaceWords(code[i].innerHTML, "&lt;/", `<code class="text-slate-500 dark:">&lt;\/</code>`);
        code[i].innerHTML = replaceWords(code[i].innerHTML, "&lt;", `<code class="text-slate-500 dark:">&lt;</code>`);

        
        // Change html tags
        const regex = /<.*?(?= |>|\/>|<\/.*?>)/g;
        const html = code[i].innerText.match(regex)
        console.log(code[i].innerText.toString())
        html.forEach((element, index) => {
            const modifiedElement = element.replace(/</g, '').replace(/\//g, ''); 
            html[index] = modifiedElement;
          });
        

        html.forEach(word => {
            console.log(word)
              const modifiedString = replaceTags(code[i].innerHTML, word, `<code class="text-rose-500 dark:text-rose-400">${word}</code>`);
              code[i].innerHTML = modifiedString;
        });
          
    }
}

function replaceBetweenQuotes(str, wordToReplace, replaceWith) {
    return str.replace(new RegExp(`class="(.*?)${wordToReplace}(.*?)"`, 'g'), `class="$1${replaceWith}$2"`);
}

function replaceWords(str, wordToReplace, replaceWith) {
    return str.replace(new RegExp(wordToReplace,'g'), replaceWith);
}

function replaceTags(str, wordToReplace, replaceWith) {
    const regex = new RegExp(wordToReplace, 'g');
    const newStr = str.replace(/('[^']*'|"[^"]*")|\b\w+\b/g, function(match, group1) {
      if (group1 === undefined) {
        return match.replace(regex, replaceWith);
      } else {
        return match;
      }
    });
    return newStr;
}
  