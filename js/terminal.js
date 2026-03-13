(function() {
    var output = document.getElementById('output');
    var input = document.getElementById('command-input');
    var terminalBody = document.getElementById('terminal-body');
    var commandHistory = [];
    var historyIndex = -1;

    var BLOG_URL = '/blog/';

    var ASCII_LOGO = [
        '',
        '<span class="ascii-art">',
        '███████╗ ██████╗ ███╗   ██╗██╗  ██╗ ██╗██╗   ██╗',
        '██╔════╝██╔═══██╗████╗  ██║██║  ██║███║██║   ██║',
        '█████╗  ██║   ██║██╔██╗ ██║███████║╚██║██║   ██║',
        '██╔══╝  ██║   ██║██║╚██╗██║██╔══██║ ██║██║   ██║',
        '██║     ╚██████╔╝██║ ╚████║██║  ██║ ██║╚██████╔╝',
        '╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═╝ ╚═════╝',
        '</span>',
        ''
    ].join('\n');

    var commands = {
        help: function() {
            return [
                '',
                '<span class="color-yellow color-bold">Available commands:</span>',
                '',
                '  <span class="color-green">help</span>       - Show this help message',
                '  <span class="color-green">about</span>      - About me',
                '  <span class="color-green">blog</span>       - Go to my blog',
                '  <span class="color-green">projects</span>   - View my projects',
                '  <span class="color-green">github</span>     - Open my GitHub',
                '  <span class="color-green">contact</span>    - Contact information',
                '  <span class="color-green">skills</span>     - Technical skills',
                '  <span class="color-green">neofetch</span>   - System information',
                '  <span class="color-green">clear</span>      - Clear terminal',
                '  <span class="color-green">date</span>       - Show current date',
                '  <span class="color-green">whoami</span>     - Who am I',
                ''
            ].join('\n');
        },
        about: function() {
            return [
                '',
                '<span class="color-cyan color-bold">About eonh1u</span>',
                '<span class="color-dim">═══════════════════════════════</span>',
                '',
                '  Geek | Developer | Explorer',
                '',
                '  A passionate developer who loves:',
                '  <span class="color-green">*</span> Linux system administration',
                '  <span class="color-green">*</span> Containerization & DevOps',
                '  <span class="color-green">*</span> Web development',
                '  <span class="color-green">*</span> Open source projects',
                '',
                '  <span class="color-dim">Type "blog" to read my articles</span>',
                ''
            ].join('\n');
        },
        blog: function() {
            printOutput('<span class="color-cyan">Redirecting to blog...</span>');
            setTimeout(function() { window.location.href = BLOG_URL; }, 800);
            return null;
        },
        projects: function() {
            return [
                '',
                '<span class="color-cyan color-bold">Projects</span>',
                '<span class="color-dim">═══════════════════════════════</span>',
                '',
                '  <span class="color-yellow">[1]</span> <span class="color-green">terminal-homepage</span>',
                '      This terminal-style landing page',
                '',
                '  <span class="color-yellow">[2]</span> <span class="color-green">hexo-blog</span>',
                '      Personal tech blog powered by Hexo',
                '',
                '  <span class="color-yellow">[3]</span> <span class="color-green">server-stack</span>',
                '      Lightweight Docker deployment for 512MB servers',
                '',
                '  <span class="color-dim">More projects coming soon...</span>',
                ''
            ].join('\n');
        },
        github: function() {
            printOutput('<span class="color-cyan">Opening GitHub...</span>');
            setTimeout(function() { window.open('https://github.com/eonh1u', '_blank'); }, 500);
            return null;
        },
        contact: function() {
            return [
                '',
                '<span class="color-cyan color-bold">Contact</span>',
                '<span class="color-dim">═══════════════════════════════</span>',
                '',
                '  <span class="color-green">GitHub</span>  : <a href="https://github.com/eonh1u" target="_blank">github.com/eonh1u</a>',
                '  <span class="color-green">Blog</span>    : <a href="/blog/">eonh1u.github.io</a>',
                ''
            ].join('\n');
        },
        skills: function() {
            return [
                '',
                '<span class="color-cyan color-bold">Technical Skills</span>',
                '<span class="color-dim">═══════════════════════════════</span>',
                '',
                '  <span class="color-yellow">Languages</span>',
                '  ██████████░░  JavaScript',
                '  ████████████  Python',
                '  ████████░░░░  Go',
                '  ██████░░░░░░  Rust',
                '',
                '  <span class="color-yellow">DevOps</span>',
                '  ████████████  Docker',
                '  ██████████░░  Linux',
                '  ████████░░░░  CI/CD',
                '  ██████████░░  Nginx',
                ''
            ].join('\n');
        },
        neofetch: function() {
            return [
                '',
                '<span class="color-blue">        .--.        </span>  <span class="color-green">visitor</span>@<span class="color-green">eonh1u</span>',
                '<span class="color-blue">       |o_o |       </span>  <span class="color-dim">─────────────────</span>',
                '<span class="color-blue">       |:_/ |       </span>  <span class="color-yellow">OS</span>: eonh1u-linux x86_64',
                '<span class="color-blue">      //   \\ \\      </span>  <span class="color-yellow">Host</span>: Lightweight Cloud Server',
                '<span class="color-blue">     (|     | )     </span>  <span class="color-yellow">Kernel</span>: 5.10-geek',
                '<span class="color-blue">    /\\_)   (_/\\    </span>  <span class="color-yellow">CPU</span>: 2 cores',
                '<span class="color-blue">    \\___)=(___/    </span>  <span class="color-yellow">Memory</span>: 512MB',
                '                      <span class="color-yellow">Shell</span>: eonh1u-terminal',
                '                      <span class="color-yellow">Theme</span>: Geek Dark',
                ''
            ].join('\n');
        },
        clear: function() {
            output.innerHTML = '';
            return null;
        },
        date: function() {
            return '\n  ' + new Date().toString() + '\n';
        },
        whoami: function() {
            return '\n  <span class="color-green">visitor</span>\n';
        }
    };

    function printOutput(html) {
        if (html === null) return;
        var div = document.createElement('div');
        div.className = 'output-line';
        div.innerHTML = html;
        output.appendChild(div);
        scrollToBottom();
    }

    function printCommand(cmd) {
        var div = document.createElement('div');
        div.className = 'output-line';
        div.innerHTML = '<span class="prompt">visitor@eonh1u:~$ </span>' + escapeHtml(cmd);
        output.appendChild(div);
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function scrollToBottom() {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function bootSequence() {
        var lines = [
            { text: '<span class="color-dim">Booting eonh1u system...</span>', delay: 0 },
            { text: '<span class="color-dim">Loading modules...</span>', delay: 300 },
            { text: '<span class="color-dim">[  OK  ] Started Network Service</span>', delay: 500 },
            { text: '<span class="color-dim">[  OK  ] Started Terminal Service</span>', delay: 700 },
            { text: ASCII_LOGO, delay: 1000 },
            { text: '<span class="color-cyan">Welcome to eonh1u terminal v1.0</span>', delay: 1200 },
            { text: '<span class="color-dim">Type "help" for available commands.</span>', delay: 1400 },
            { text: '', delay: 1600 }
        ];

        lines.forEach(function(line) {
            setTimeout(function() {
                printOutput(line.text);
            }, line.delay);
        });
    }

    function processCommand(cmd) {
        cmd = cmd.trim().toLowerCase();
        if (!cmd) return;

        printCommand(cmd);

        if (commands[cmd]) {
            var result = commands[cmd]();
            if (result !== null) {
                printOutput(result);
            }
        } else {
            printOutput('<span class="color-red">Command not found: ' + escapeHtml(cmd) + '</span>');
            printOutput('<span class="color-dim">Type "help" for available commands.</span>');
        }
    }

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            var cmd = input.value;
            if (cmd.trim()) {
                commandHistory.push(cmd);
                historyIndex = commandHistory.length;
            }
            processCommand(cmd);
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            var partial = input.value.trim().toLowerCase();
            var matches = Object.keys(commands).filter(function(c) {
                return c.startsWith(partial);
            });
            if (matches.length === 1) {
                input.value = matches[0];
            }
        }
    });

    terminalBody.addEventListener('click', function() {
        input.focus();
    });

    bootSequence();
})();
