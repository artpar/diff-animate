/**
 * Created by parth on 2/7/16.
 */

var writeNext = function (text, editor, delay, complete) {
    if (!text || text.length < 1) {
        if (complete && typeof complete == "function") {
            complete();
        }
        return
    }
    editor.insert(text[0]);
    setTimeout(function () {
        writeNext(text.substring(1), editor, delay, complete)
    }, delay)
};

$("#loadRepo").on("click", function () {
    $("#editorContainer").html('<div id="ace-editorid" class="row"></div>');
    initEditor();
    loadUrl($("#githubUrl").val());
});

function App(defaultUrl) {
    var that = this;
    var commitUrl = defaultUrl;
    var urlParts = commitUrl.split("/");

    if (urlParts.length < 5) {
        notify("Bad url, cannot load " + commitUrl)
    }

    var username = urlParts[3];
    var repoName = urlParts[4];

    $("#githubUrl").val(githubUrl + username + "/" + repoName);

    that.ga = new GithubApi(username, repoName);
    that.ed = new EditorInterface(editor, this.ga);


    this.getSha = function () {
        if (!commitUrl) {
            console.log("no commit url");
        }
        if (urlParts.length > 6) {
            return urlParts[6];
        }
        console.log("no sha provided");
    };

    var state = 0;
    that.sha = undefined;
    that.canStart = false;

    this.update = function (sha) {
        if (!sha) {
            return;
        }
        that.sha = sha;
        if (!that.canStart) {
            console.log("that cannot start now", sha);
            return;
        }
        var parent = that.commitMap[sha].parents[0].sha;
        that.ga.getDiffBySha(sha, function (text) {
            window.diff = text;
            var changes = fpp(text);
            //var diff = JsDiff.di
            that.ed.runAllChanges(changes, parent);
        }, true);
    };

    that.commitMap = {};


    that.ga.getCommits(function (list) {
        that.commits = list;
        for (var i = 0; i < list.length; i++) {
            that.commitMap[list[i].sha] = list[i];
        }
        that.canStart = true;
        var template = $('#commitListTemplate').html();
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, {commits: list});
        $('#commitListContainer').html(rendered);
        if (that.sha) {
            console.log("get commit completed later");
            that.update(that.sha);
        }
    });


    return this;
}