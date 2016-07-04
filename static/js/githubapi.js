/**
 * Created by parth on 4/7/16.
 */

function GithubApi(username, repoName) {
    var github = "https://api.github.com";
    var githubHtml = "https://github.com";
    var repoFullName = username + "/" + repoName;
    var commitBase = github + "/repos/" + repoFullName + "/commits";
    var commitBaseHtml = githubHtml + "/" + repoFullName + "/commits";
    var fileBase = github + "/repos/" + repoFullName + "/contents";
    var fileBaseHtml = githubHtml + "/" + repoFullName + "/contents";


    this.getDiffBySha = function (sha, cb) {
        var msg = $("<span>Getting </span>");
        msg.append($("<a>diff of sha" + sha + "</a>").attr("href", commitBase + "/" + sha).attr("target", "_blank"));
        notify(msg.html());
        this.request(commitBase + "/" + sha, cb);
    };

    this.getDiff = function (url, cb) {
        var config = {
            url: url,
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.diff"
            },
            params: {},
            data: {},
            responseType: 'text'
        };

        config.success = function (text) {
            cb(text)
        };

        $.ajax(config);
    };


    this.getFile = function (filePath, cb) {
        notify("Get file " + filePath);

        var config = {
            url: fileBase + "/" + filePath,
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.raw"
            },
            responseType: 'text'
        };
        config.success = cb;
        this.request(fileBase + "/" + filePath, cb, {
            headers: {
                "Accept": "application/vnd.github.raw"
            }
        })
    };

    this.getFileList = function (cb) {
        notify("Get list of files in root ");
        this.request(fileBase, cb);
    };

    this.getCommits = function (cb) {
        notify("Get list of commits");
        this.request(commitBase, cb)
    };

    this.request = function (url, cb, options) {
        var config = _.extend({
            url: url,
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.diff"
            },
            params: {},
            data: {},
            responseType: 'text',
            success: cb
        }, options || {});
        $.ajax(config);
    };
    return this;
}