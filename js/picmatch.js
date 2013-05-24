function search() {
    var topic = $('#search').val();
    $('.header').text('\'' + topic + '\'');
    $.ajax({
        dataType: 'json',
        url: 'https://api.datamarket.azure.com/Bing/Search/v1/Image',
        data: 'Query=%27' + topic + '%27&$format=json&$top=8&Adult=%27Off%27&ImageFilters=%27Aspect%3ASquare%2BSize%3ALarge%2BColor%3AColor%2BStyle%3APhoto%27',
        method : 'GET',
        beforeSend : function(req) {
		req.setRequestHeader('Authorization', 'Basic QUdtN0F5b1k3N3JxWTB0UHNEbnUzejJGTUo2R0tLVHkrSVFoVDEwbVFiST06QUdtN0F5b1k3N3JxWTB0UHNEbnUzejJGTUo2R0tLVHkrSVFoVDEwbVFiST0=');
        },
        success: resultHandler
    });
}

function cardClick() {
    if (!$(this).hasClass('flip')) {
        $(this).addClass('flip');
        var active = $('.activated');
        if (active.length === 0) {
            $(this).addClass('activated');
        } else if (active.data('id') === $(this).data('id')) {
            active.removeClass('activated');
            $(this).addClass('finished');
            active.addClass('finished');
            if ($('.click').not('.finished').length === 0) {
                alert('Congratulations, you won!');
            }
        } else {
            $(this).addClass('activated');
            setTimeout(function() {$('.activated').removeClass('activated').removeClass('flip');}, 1000);
        }
    }
}

function getCards(data, numCards) {
    var cards = [];
    for (var i = 0; i < data.d.results.length; i++) {
        cards.push({id: i, url: data.d.results[i].Thumbnail.MediaUrl});
    }
    return cards;
}

function renderCard(card) {
    var cardElem = document.createElement('div');
    cardElem.className = 'click panel';
    $('#cards').append(cardElem);
    var front = document.createElement('div');
    front.className = 'front';
    cardElem.appendChild(front);
    var frontStr = document.createTextNode('PicMatch');
    front.appendChild(frontStr);
    var back = document.createElement('img');
    back.src = card.url;
    back.className = 'back';
    cardElem.appendChild(back);
    $(cardElem).data('id', card.id);
}

function shuffle(cards) {
    var i = cards.length,
    j,
    temp;
    while (--i) {
        j = Math.floor(Math.random() * (i - 1));
	temp = cards[i];
	cards[i] = cards[j];
	cards[j] = temp;
    }
}

function resultHandler(data) {
    var cards = getCards(data, 8);
    cards = cards.concat(cards);
    shuffle(cards);
    for (var i = 0; i < cards.length; i++) {
        renderCard(cards[i]);
    }
    $('.click').click(cardClick);
    $('#cards').fadeIn(500);
    $('.footer').fadeIn(500);
}
