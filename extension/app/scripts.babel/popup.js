function isLoggedIn(token) {
    return jwt_decode(token).exp > Date.now() / 1000;
}
function logout() {
    localStorage.clear();
    window.close();
}
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}
function postPodcast(event) {
    const authResult = JSON.parse(localStorage.authResult || '{}');
    const title = $(event.currentTarget).data('title');
    const url = $(event.currentTarget).data('url');
    const podcastId = $('.combobox').val();
    const data = {
        podcastId: podcastId,
        title: title,
        sourceUrl: url,
        processed: false
    };
    fetch(`https://www.podnoms.com/api/entry/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authResult.id_token}`
        },
        body: JSON.stringify(data)
    }).then(r => {
        if (r.status === 200) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'images/icon-128.png',
                title: 'Podcast Added Succesfully',
                message: 'It should show up in your podcaster soon.'
            });
        } else {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'images/icon-128.png',
                title: 'Error adding podcast',
                message: 'Please try adding manually on the site.'
            });
        }
    });
}
function renderLinks(links) {
    // const links = JSON.parse(data);
    if (links && links.length !== 0) {
        $('#no-audio').hide();
        $('#results-table').show();
        $('table tbody')
            .children()
            .remove();
        $(links).each((i, d) => {
            var xhr = $.ajax({
                type: 'HEAD',
                url: d.href,
                success: function(msg) {
                    const title = (d.text || d.href).trim();
                    var markup =
                        '<tr><td>' +
                        title +
                        '</td><td>' +
                        humanFileSize(xhr.getResponseHeader('Content-Length'), true) +
                        '</td><td><button class="btn btn-small add-podcast" data-url="' +
                        d.href +
                        '" data-title="' +
                        title +
                        '"><i class="fa fa-plus"></i></button></td></tr>';
                    $('table tbody').append(markup);
                    $('.add-podcast').click(postPodcast);
                }
            });
        });
    }
}
function startRenderLinks() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'process-page' }, renderLinks);
    });
}
function renderProfileView(authResult) {
    $('.login').hide();
    $('.loading').show();

    $('.logout-button').show();
    $('.logout-button').click(logout);
    $('.retry-button').click(startRenderLinks);

    fetch(`https://www.podnoms.com/api/podcast/`, {
        headers: {
            Authorization: `Bearer ${authResult.id_token}`
        }
    })
        .then(resp => resp.json())
        .then(podcasts => {
            podcasts.forEach(podcast => {
                $('.combobox').append(new Option(podcast['title'], podcast['id']));
            });
            console.log(podcasts);
            startRenderLinks();
            $('.loading').hide();
            $('.loggedin').show();
        })
        .catch(err => {
            $('.error').show();
            console.error(err);
        });
}

function renderDefaultView() {
    $('.login-button').click(() => {
        $('.login').hide();
        $('.loading').show();
        chrome.runtime.sendMessage({
            type: 'authenticate'
        });
    });
}

function main() {
    $('.loading').hide();
    $('.loggedin').hide();
    $('.error').hide();
    $('.logout').hide();

    const authResult = JSON.parse(localStorage.authResult || '{}');
    const token = authResult.id_token;
    if (token && isLoggedIn(token)) {
        renderProfileView(authResult);
    } else {
        renderDefaultView();
    }
}

document.addEventListener('DOMContentLoaded', main);
