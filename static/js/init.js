/**
 * Created by parth on 2/7/16.
 */
//jQuery.fn.render = Transparency.jQueryPlugin;


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

function random() {
    $.ajax({
        url: "https://api.github.com/search/repositories?sort=stars&order=desc&q=created:>2016-07-01&q=java",
        success: function (res) {
            var list = res.items;
            var rand = list[Math.floor(Math.random() * list.length)];
            window.location.hash = "#!" + rand.html_url;
            window.location.reload(true);
        }
    })
}

function loadUrl(newHash) {

    if (!newHash || newHash.length < 10 || newHash.indexOf("github.com/") < 0) {
        console.log("bad url given to load");
        if (!newHash || newHash.length < 1) {
            random();
        }
        return;
    }

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
    $("#notifications").append($("<div class='list-group-item'></div>").html(msg))
}

var store = window.localStorage;
var stored = store.getItem("speed");
function updateSize() {
    var newHeight = $(window).height() - 62;
//        console.log("resize to ", newHeight);
    $('#ace-editorid').css("height", newHeight + "px");
    $('#commitListContainer').css("height", newHeight + "px");
    $('#third').css("height", newHeight + "px");
    editor.resize();
}
$(window).on("resize", function () {
    updateSize();
});
updateSize();

//    var slider = $("#slider").rangeSlider();
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: 80, // Handle start position
    connect: false, // Display a colored bar between the handles
    orientation: 'horizontal', // Orient the slider vertically
    range: { // Slider can select '0' to '100'
        'min': 0,
        'max': 100
    }
});

slider.noUiSlider.on("update", function (value) {
    value = parseInt(value[0]);
    //console.log("slide value ", value);
    store.setItem("speed", value);
    speed.setSpeed(value);
});
if (stored) {
    console.log("Stored value ", stored);
//        speedSlider.setValue(stored)
//        speedSlider.slider('setValue', stored);
    speed.setSpeed(stored);
}

$("#random").on("click", function () {
    random();
});
