const app = {}

$(document).ready(function () {
    //Handle a hide and show state for the init form
   $('#Wrapper').hide()
   $('#Hype').hide()
   $('#Social').addClass('hide')
   $('#Submit').on('click', function(){
       $('#Wrapper').show()
       $('#SearchArtist').hide()
   })
   //Hide hype text and show when ... is clicked
   $('#hideShowHype').text(' ...').on('click', function() {
       $('#hideShowHype').addClass('hide')
       $('#Social').toggleClass('hide')
       $('#Hype').show().text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...')
   })
   //when page scrolls beyond nav, nav sticks
    let $window = $(window),
        $stickyEl = $('nav'),
        elTop = $stickyEl.offset().top

    $window.scroll(function () {
        $stickyEl.toggleClass('sticky', $window.scrollTop() > 200)
    })
   //Toggle caret and handle dropdown state on click
    let date = new Date()
    console.log(date)
    let month = date.toDateString().slice(4, 7)
    let year = date.getFullYear()
    let day = date.toDateString().slice(7, 10)
    $('#caretDown, #CalendarDrop').addClass('hide')
    $('#caretRight, #caretDown').on('click', function () {
        $('#caretRight, #caretDown, #CalendarDrop').toggleClass('hide')
    })
    $('#Month').append(`${month}.`)
    $('#Year').append(`${year}`)
    $('#CalRowDay').append(`${day}`)
    $('#CalRowMonth').append(`${month}`)

    // search input 
    $(function(){
         // When the toggle areas in your navbar are clicked, toggle them
         $("#search-form").addClass('hide')
         $("#search-icon").click(function(e){
             e.preventDefault()
             $("#search-form").toggleClass('hide')
         })
      })
})

let token = 'BQAXBxej8MpoLvho--jVLvpIxduuJPCfh1FeiyB3ChU5WiJWWQel1Rju3gt7eTXTZwfi5tgTcQCkKV8iaRV3w5Szhnj92-LVhRhxLR0QH8b4eEQ0IP48hAmXivRO0ZfTm9RhG5eq3t00Zpzd0GpnOY9gLqsXVFE'

app.getArists = (artist) => $.ajax({
    url: 'https://api.spotify.com/v1/search',
    headers: {
        Authorization: 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    data: {
        type: 'artist',
        q: artist
    },
    success : function(response) {
        let name = response.artists.items[0].name
        let image = response.artists.items[0].images[0].url
        let about = response.artists.items[0].external_urls.spotify + '/about'
        let id = response.artists.items[0].id
        $('#featuredArtist').text(name)
        $('#Avatar, .event-details-background-image').css({
            'background': `linear-gradient(to bottom, #161b1f, transparent, #161b1f 100%), url('${image}')no-repeat 0 0`,
            'height': '-webkit-fill-available',
            'backgroundSize': 'cover'
        })
        $.ajax({
            headers: {
                Authorization: 'Bearer ' + token
            },
            url: ` 	https://api.spotify.com/v1/artists/${id}/top-tracks`,
            method: 'GET',
            dataType: 'json',
            data: {
                country: 'ES',
            },
            success : function(response) {
                console.log(response)
                let track = response.tracks.map(track => track)
                let tracksOneToThree = track.slice(0, 3)
                let tracksThreeToSix = track.slice(4, 7)
                let albumCover = track.map(album => album.album.images[0].url)
                // let albumTitle = track.map(album => album.album.name)
                tracksOneToThree.forEach(element => {
                    let year = element.album.release_date.slice(0, 4)
                    let include = `<div class="column-row">
                            <div class="popular-track-avatar"><img src=${element.album.images[0].url}></div>
                            <div class="inline-grid">
                                <div class="Aligner">
                                    <div class="Aligner-item--top track-name">${element.name}</div>
                                    <div class="Aligner-item--bottom">
                                        <span>${element.artists[0].name}</span>
                                        <span> &#149; </span>
                                        <span> ${year}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    $('#ColumnOne').append(include)
                })
                tracksThreeToSix.forEach(element => {
                    let year = element.album.release_date.slice(0, 4)
                    let include = `<div class="column-row">
                            <div class="popular-track-avatar"><img src=${element.album.images[0].url}></div>
                            <div class="inline-grid">
                                <div class="Aligner">
                                    <div class="Aligner-item--top track-name">${element.name}</div>
                                    <div class="Aligner-item--bottom">
                                        <span>${element.artists[0].name}</span>
                                        <span> &#149; </span>
                                        <span> ${year}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    $('#ColumnTwo').append(include)
                })
                albumCover.forEach(element => {
                    let include = `<img class="img-responsive vinyl-cover shadow-4" id="VinylCover" src=${element}>
                                    <img class="img-responsive vinyl" id="Vinyl" src=${element}>`
                    $('#CoverContainer').append(include)
                })
                
            }
        })
        $.ajax({
            headers: {
                Authorization: 'Bearer ' + token
            },
            url: `https://api.spotify.com/v1/artists/${id}/albums`,
            method: 'GET',
            dataType: 'json',
            data: {
                country: 'ES',
                type: 'albums',
            },
            success: function (respone) {
                
            }
        })
    }
})

app.init = function () {
    $('form').on('submit', function (e) {
        e.preventDefault()
        let artists = $('input[type=search]').val()
        
        artists = artists
            .split(',')
            .map(app.getArists)

        $.when(...artists)
            .then((...artists) => {
                artists = artists.map(a => a[0].artists.items[0])
                app.getAlbums(artists)
            })
    })
}

$(app.init)