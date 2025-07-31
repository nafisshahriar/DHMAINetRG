function toggleSidebar() {
    document.getElementById('tabs').classList.toggle('show');
    document.addEventListener('click', function (event) {
        const sidebar = document.getElementById('tabs');
        const hamburger = document.getElementById('hamburger');
        // Only run on mobile
        if (window.innerWidth <= 768) {
            if (
                sidebar.classList.contains('show') &&
                !sidebar.contains(event.target) &&
                !hamburger.contains(event.target)
            ) {
                sidebar.classList.remove('show');
            }
        }
    });
}


function openTab(evt, tabName, pushState = true) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    // Save scroll position for current tab before switching
    history.replaceState(
        Object.assign({}, history.state, { scrollY: window.scrollY }),
        '',
        window.location.hash || ''
    );

    // Always scroll to top when switching tab normally
    if (pushState) {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt && evt.currentTarget) {
        evt.currentTarget.className += " active";
    }
    // Only push state if not handling popstate
    if (pushState) {
        history.pushState({ tab: tabName }, '', '#' + tabName);
    }
}

window.addEventListener('popstate', function (event) {
    let tab = (event.state && event.state.tab) || window.location.hash.replace('#', '') || 'homepage';
    if (document.getElementById(tab)) {
        openTab(null, tab, false); // Show tab even if no button found
        // Restore previous scroll position if available
        setTimeout(function () {
            window.scrollTo({ top: (event.state && event.state.scrollY) || 0, behavior: 'instant' });
        }, 0);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let tab = window.location.hash.replace('#', '') || 'homepage';
    if (document.getElementById(tab)) {
        openTab(null, tab, false); // Show tab even if no button found
    }
});