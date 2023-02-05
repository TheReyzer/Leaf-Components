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

        hightlight(i, state)
        if (previewCode[i].classList.contains('hidden')) {
            previewCode[i].classList.replace('hidden', 'flex');
            previewBox[i].classList.add('hidden');
        }
        state++
    });
});

btnPreview.forEach((el, i) => {
    el.addEventListener('click', () => {
        if (! previewCode[i].classList.contains('hidden')) {
            previewCode[i].classList.replace('flex', 'hidden');
            previewBox[i].classList.remove('hidden');
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
        copyToClipboard(document.querySelector('.preview-code pre').innerText);
    });
});


// Highlight Code
function hightlight(i, state) {
    if (state == 0) {
        const html = ['div', 'img', 'section'];
        const code = document.querySelectorAll('pre');

        // change html classes
        const htmlClasses = code[i].innerHTML.match(/class="([^"]*)"/g);
        if (! htmlClasses) {
            return;
        }
        htmlClasses.forEach(word => {
            const modifiedString = replaceBetweenQuotes(code[i].innerHTML, word.slice(7, -1), `<span class="x text-sky-400">${
                word.slice(7, -1)
            }</span>`);
            code[i].innerHTML = modifiedString;
        });

        // Change some HTML strings
        code[i].innerHTML = replaceWords(code[i].innerHTML, "/&gt;", `<span class="x text-slate-600">/&gt;</span>`);
        code[i].innerHTML = replaceWords(code[i].innerHTML, "&gt;", `<span class="x text-slate-600">&gt;</span>`);
        code[i].innerHTML = replaceWords(code[i].innerHTML, "&lt;/", `<span class="x text-slate-600">&lt;\/</span>`);
        code[i].innerHTML = replaceWords(code[i].innerHTML, "&lt;", `<span class="x text-slate-600">&lt;</span>`);

        // Change html tags
        html.forEach(word => {
            const modifiedString = replaceWords(code[i].innerHTML, word, `<span class="x text-rose-400">${word}</span>`);
            code[i].innerHTML = modifiedString;
        });
    }
}

function replaceBetweenQuotes(str, wordToReplace, replaceWith) {
    return str.replace(new RegExp(`class="(.*?)${wordToReplace}(.*?)"`, 'g'), `class="$1${replaceWith}$2"`);
}


function replaceWords(str, wordToReplace, replaceWith) {
    return str.replace(new RegExp(wordToReplace, 'g'), replaceWith);
}
