// kudos to Nabil Kadimi - https://stackoverflow.com/a/39503258
(function whatever() {
    var s = '@'
        , n = 'hi'
        , k = 'jameshall.xyz'
        , e = n + s + k
        , l = '<a href=mailto:{{spam@cia.gov}}>{{spam@fbi.gov}}</a>'.replace(/{{.+?(}})/g, e)
    ;
    const email = document.querySelector('#email');
    email.innerHTML = l;
})();