/**
 * Created by parth on 2/7/16.
 */
jQuery.fn.render = Transparency.jQueryPlugin;


var DelayedLoop = function () {
};

DelayedLoop.forEach = function (collection, delay, callback, completedCallback) {
    var index = 0;
    var timerObject;

    var executor = function () {
        // Stop the delayed loop.
        clearInterval(timerObject);

        // Executes the callback, and gets the returned value to indicate what the next delay will be.
        var newInterval = callback(collection[index++]);

        // If they returned false, quit looping.
        if (typeof(newInterval) == "boolean" && newInterval == false) {
            return;
        }

        // If nothing / non-number is provided, re-use initial delay.
        if (typeof(newInterval) != "number") {
            newInterval = delay;
        } else if (newInterval < 0) { // If a negative number is returned, quit looping.
            return;
        }

        // If there are more elements to iterate, re-set delayed loop. Otherwise, call the "completed" callback.
        if (index < collection.length) {
            timerObject = setInterval(executor, newInterval);
        } else {
            completedCallback();
        }
    };

    // Initial loop setup.
    timerObject = setInterval(function () {
        executor();
    }, delay);
};

var editor = undefined;

function initEditor() {
    var theme = 'ace/theme/solarized_dark';
    editor = ace.edit('ace-editorid');
    editor.$blockScrolling = Infinity;
    editor.setTheme(theme);

    $('#ace-mode').on('change', function () {
        editor.getSession().setMode('ace/mode/' + $(this).val().toLowerCase());
    });
    $('#ace-theme').on('change', function () {
        editor.setTheme('ace/theme/' + $(this).val().toLowerCase());
    });
}

initEditor();

window.app = {};
var githubUrl = "https://github.com/";

$(window).on('hashchange', once);

function loadUrl(newHash) {
    console.log("load ", newHash);

    if (newHash.substr(0, githubUrl.length) == githubUrl) {
        console.log("url has github");
        newHash = newHash.substr(githubUrl.length);
    }

    var defaultUrl = githubUrl + newHash;
    window.app = new App(defaultUrl);
    window.app.update(window.app.getSha());
}

function once() {
    var newHash = window.location.hash.substring(2);
    loadUrl(newHash)
}

once();


function notify(msg) {
    $("#notifications").append($("<pre class='list-group-item'></pre>").text(msg))
}

