/**
 * Created by parth on 4/7/16.
 */


var modes = [{"value": "abap", "name": "ABAP"},
    {"value": "abc", "name": "ABC"},
    {"value": "actionscript", "name": "ActionScript", "extension": "as"},
    {"value": "ada", "name": "ADA", "extension": "ada"},
    {"value": "apache_conf", "name": "Apache Conf"},
    {"value": "asciidoc", "name": "AsciiDoc"},
    {"value": "assembly_x86", "name": "Assembly x86"},
    {"value": "autohotkey", "name": "AutoHotKey"},
    {"value": "batchfile", "name": "BatchFile"},
    {"value": "c_cpp", "name": "C and C++", "extension": ["c", "cpp"]},
    {"value": "c9search", "name": "C9Search"},
    {"value": "cirru", "name": "Cirru"},
    {"value": "clojure", "name": "Clojure", "extension": ["clj", "cljs", "cljc", "edn"]},
    {"value": "cobol", "name": "Cobol", "extension": "cbl"},
    {"value": "coffee", "name": "CoffeeScript", "extension": "coffee"},
    {"value": "coldfusion", "name": "ColdFusion", "extension": "cf"},
    {"value": "csharp", "name": "C#", "extension": "cs"},
    {"value": "css", "name": "CSS", "extension": "css"},
    {"value": "curly", "name": "Curly"},
    {"value": "d", "name": "D", "extension": "d"},
    {"value": "dart", "name": "Dart", "extension": "darf"},
    {"value": "diff", "name": "Diff", "extension": "diff"},
    {"value": "dockerfile", "name": "Dockerfile", "extension": "dockerfile"},
    {"value": "dot", "name": "Dot", "extension": "dot"},
    {"value": "dummy", "name": "Dummy"},
    {"value": "dummysyntax", "name": "DummySyntax"},
    {"value": "eiffel", "name": "Eiffel", "extension": "e"},
    {"value": "ejs", "name": "EJS", "extension": "ejs"},
    {"value": "elixir", "name": "Elixir", "extension": "ex"},
    {"value": "elm", "name": "Elm", "extension": "elm"},
    {"value": "erlang", "name": "Erlang"},
    {"value": "forth", "name": "Forth"},
    {"value": "ftl", "name": "FreeMarker"},
    {"value": "gcode", "name": "Gcode"},
    {"value": "gherkin", "name": "Gherkin"},
    {"value": "gitignore", "name": "Gitignore", "extension": "gitignore"},
    {"value": "glsl", "name": "Glsl"},
    {"value": "gobstones", "name": "Gobstones"},
    {"value": "golang", "name": "Go", "extension": "go"},
    {"value": "groovy", "name": "Groovy"},
    {"value": "haml", "name": "HAML", "extension": "haml"},
    {"value": "handlebars", "name": "Handlebars", "extension": "hbs"},
    {"value": "haskell", "name": "Haskell", "extension": "haskell"},
    {"value": "haxe", "name": "haXe", "extension": "haxe"},
    {"value": "html", "name": "HTML", "extension": ["htm", "html"]},
    {"value": "html_elixir", "name": "HTML (Elixir)"},
    {"value": "html_ruby", "name": "HTML (Ruby)"},
    {"value": "ini", "name": "INI", "extension": "ini"},
    {"value": "io", "name": "Io", "extension": "io"},
    {"value": "jack", "name": "Jack"},
    {"value": "jade", "name": "Jade"},
    {"value": "java", "name": "Java", "extension": "java"},
    {"value": "javascript", "name": "JavaScript", "extension": "js"},
    {"value": "json", "name": "JSON", "extension": "json"},
    {"value": "jsoniq", "name": "JSONiq", "extension": "jsoniq"},
    {"value": "jsp", "name": "JSP", "extension": "jsp"},
    {"value": "jsx", "name": "JSX", "extension": "jsx"},
    {"value": "julia", "name": "Julia"},
    {"value": "latex", "name": "LaTeX"},
    {"value": "lean", "name": "Lean"},
    {"value": "less", "name": "LESS", "extension": "less"},
    {"value": "liquid", "name": "Liquid"},
    {"value": "lisp", "name": "Lisp"},
    {"value": "livescript", "name": "LiveScript"},
    {"value": "logiql", "name": "LogiQL"},
    {"value": "lsl", "name": "LSL"},
    {"value": "lua", "name": "Lua", "extension": "lua"},
    {"value": "luapage", "name": "LuaPage"},
    {"value": "lucene", "name": "Lucene"},
    {"value": "makefile", "name": "Makefile", "extension": "makefile"},
    {"value": "markdown", "name": "Markdown", "extension": ["md", "readme"]},
    {"value": "mask", "name": "Mask"},
    {"value": "matlab", "name": "MATLAB"},
    {"value": "maze", "name": "Maze"},
    {"value": "mel", "name": "MEL"},
    {"value": "mushcode", "name": "MUSHCode"},
    {"value": "mysql", "name": "MySQL", "extension": "sql"},
    {"value": "nix", "name": "Nix"},
    {"value": "nsis", "name": "NSIS"},
    {"value": "objectivec", "name": "Objective-C"},
    {"value": "ocaml", "name": "OCaml"},
    {"value": "pascal", "name": "Pascal", "extension": "pas"},
    {"value": "perl", "name": "Perl", "extension": "pl"},
    {"value": "pgsql", "name": "pgSQL"},
    {"value": "php", "name": "PHP", "extension": "php"},
    {"value": "powershell", "name": "Powershell", "extension": "ps"},
    {"value": "praat", "name": "Praat"},
    {"value": "prolog", "name": "Prolog"},
    {"value": "properties", "name": "Properties", "extension": "properties"},
    {"value": "protobuf", "name": "Protobuf"},
    {"value": "python", "name": "Python", "extension": "py"},
    {"value": "r", "name": "R", "extension": "r"},
    {"value": "razor", "name": "Razor"},
    {"value": "rdoc", "name": "RDoc"},
    {"value": "rhtml", "name": "RHTML", "extension": "rhtml"},
    {"value": "rst", "name": "RST", "extension": "rst"},
    {"value": "ruby", "name": "Ruby", "extension": "rb"},
    {"value": "rust", "name": "Rust", "extension": "rc"},
    {"value": "sass", "name": "SASS", "extension": "sass"},
    {"value": "scad", "name": "SCAD", "extension": "scad"},
    {"value": "scala", "name": "Scala", "extension": "scala"},
    {"value": "scheme", "name": "Scheme", "extension": "scheme"},
    {"value": "scss", "name": "SCSS"},
    {"value": "sh", "name": "SH", "extension": "sh"},
    {"value": "sjs", "name": "SJS"},
    {"value": "smarty", "name": "Smarty"},
    {"value": "snippets", "name": "snippets"},
    {"value": "soy_template", "name": "Soy Template"},
    {"value": "space", "name": "Space"},
    {"value": "sql", "name": "SQL", "extension": "sql"},
    {"value": "sqlserver", "name": "SQLServer"},
    {"value": "stylus", "name": "Stylus"},
    {"value": "svg", "name": "SVG"},
    {"value": "swift", "name": "Swift"},
    {"value": "tcl", "name": "Tcl", "extension": "tcl"},
    {"value": "tex", "name": "Tex", "extension": "tex"},
    {"value": "text", "name": "Text", "extension": "txt"},
    {"value": "textile", "name": "Textile"},
    {"value": "toml", "name": "Toml"},
    {"value": "twig", "name": "Twig"},
    {"value": "typescript", "name": "Typescript"},
    {"value": "vala", "name": "Vala"},
    {"value": "vbscript", "name": "VBScript", "extension": "vbscript"},
    {"value": "velocity", "name": "Velocity", "extension": "vm"},
    {"value": "verilog", "name": "Verilog"},
    {"value": "vhdl", "name": "VHDL"},
    {"value": "wollok", "name": "Wollok"},
    {"value": "xml", "name": "XML", "extension": "xml"},
    {"value": "xquery", "name": "XQuery"},
    {"value": "yaml", "name": "YAML", "extension": "yaml"},
    {"value": "django", "name": "Django", "extension": "py"}
];


var modeMap = {};
for (var i = 0; i < modes.length; i++) {
    modeMap[modes[i].extension] = modes[i];
}

function EditorInterface(editor, ga, speed) {
    var that = this;
    that.speed = speed;
    this.editor = editor;
    this.github = ga;
    this.runAllChanges = function (files, parent) {
        that.showEditFile(files, 0, parent, function () {
            notify("completed show edit for all files")
        });
    };


    that.navigate = function (toLineNumber, callback, speed) {
        if (toLineNumber < 1) {
            callback();
            return;
        }
        var currentLine = editor.getCursorPosition().row;

        //if (currentLine > 25) {
        editor.scrollToLine(currentLine - 25);
        //}

        if (currentLine != toLineNumber) {
            if (toLineNumber < currentLine) {
                //console.log("move up from ", currentLine, toLineNumber);
                editor.navigateUp()

            } else {
                //console.log("move down from ", currentLine, toLineNumber);
                editor.navigateDown()
            }
            setTimeout(function () {
                that.navigate(toLineNumber, callback);
            }, speed.getSpeed() / 10);
        } else {
            callback();
        }
    };

    that.rel = 0;
    that.at = 0;

    this.showSingleChange = function (change, callback) {
        //console.log("delay for ", change);
        //editor.gotoLine(change.ln1 || change.ln);

        var lnNo = change.ln1 || change.ln;
        if (lnNo >= that.at && change.type != "add") {
            lnNo = lnNo + that.rel;
        }


        that.navigate(lnNo - 1, function () {
            editor.gotoLine(lnNo);
            if (change.type == "del") {
                that.rel = that.rel - 1;
                that.at = lnNo;
                editor.removeLines();
                setTimeout(function () {
                    callback();
                }, speed.getSpeed());
            } else if (change.type == "normal") {
                callback();
            } else if (change.type == "add") {
                //editor.gotoLine(lnNo - 1);
                editor.navigateLineStart();
                editor.insert("\n");
                editor.gotoLine(lnNo);
                editor.navigateLineStart();
                setTimeout(function () {
                    that.rel = that.rel + 1;
                    var str = change.content.trim().substring(1);
                    writeNext(str, editor, speed, function () {
                        //console.log("finished writing ", change.content);
                        callback();
                    });
                }, 80);
            }
        }, speed);
    };

    this.showChangeEdit = function (changes, index, callback) {
        if (index >= changes.length) {
            callback();
            return;
        }
        that.showSingleChange(changes[index], function () {
            that.showChangeEdit(changes, index + 1, callback);
        });
    };

    this.showChunkEdit = function (chunks, index, callback) {
        if (index >= chunks.length) {
            callback();
            return;
        }
        var chunk = chunks[index];
        var changes = chunk.changes;
        that.showChangeEdit(changes, 0, function () {
            //console.log("completed all changes in the chunk ", changes);
            that.showChunkEdit(chunks, index + 1, callback);
        });
    };

    this.showEditFile = function (files, index, parent, callback) {
        that.rel = 0;
        if (index >= files.length) {
            callback();
            return;
        }
        var file = files[index];
        var filePath = file.from;
        that.github.getFile(filePath + "?ref=" + parent, function (contents) {
            //editor.getSession().setMode("ace/mode/dockerfile");
            editor.setValue(contents);

            var mode = "";
            var split = filePath.split("\.");
            var extension = split[split.length - 1].toLowerCase();
            mode = modeMap[extension];
            if (mode && mode.name) {
                notify("file type " + mode.name);
                editor.getSession().setMode("ace/mode/" + mode.value);
            }
            setTimeout(function () {
                var chunks = file.chunks;
                that.showChunkEdit(chunks, 0, function () {
                    //console.log("completed all chunks");
                    that.showEditFile(files, index + 1, parent, callback)
                })
            }, 300);
        });
    };
    return this;
}

//var extMap = {
//    "js":
//}
