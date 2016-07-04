/**
 * Created by parth on 4/7/16.
 */
function EditorInterface(editor, ga, speed) {
    var that = this;
    that.speed = speed;
    this.editor = editor;
    this.github = ga;
    this.runAllChanges = function (files, parent) {
        that.showEditFile(files, 0, parent, function () {
            console.log("completed show edit for all files")
        });
    };


    that.navigate = function (toLineNumber, callback) {
        var currentLine = editor.getCursorPosition().row;

        if (currentLine > 25) {
            editor.scrollToLine(currentLine - 25);
        }

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
            }, 50);
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
        if (change.type == "add") {
            lnNo = lnNo - 1;
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
                editor.navigateLineEnd();
                editor.insert("\n");
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
        });
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
            editor.getSession().setMode("ace/mode/dockerfile");
            editor.setValue(contents);
            //console.log("changes", file);
            var chunks = file.chunks;
            that.showChunkEdit(chunks, 0, function () {
                //console.log("completed all chunks");
                that.showEditFile(files, index + 1, parent, callback)
            })
        });
    };
    return this;
}
