const OO = $('.game-area').offset();

let SCORE = 0;
let BOLTS = 1;
let MAX_BOLTS = 10;
let DEBOUNCE = true;
let RADIUS = 0;
let LEVEL = 0;

$('button').on('click', () => {
    if(SCORE > 10 && RADIUS < 2) {
        RADIUS += 25;
        SCORE -= 10;
    }
})

$('.game-area').on('mousemove', e => {
    let { clientX, clientY} = e;

    $('.user').css({
        top: clientY - OO.top + 20,
        left: clientX - OO.left + 0
    })
})

$('#cat').on('mousemove', e => {
    if(DEBOUNCE){
        DEBOUNCE = false;
        setTimeout(() => {
            DEBOUNCE = true;
        }, 500);

        if(BOLTS < MAX_BOLTS) {
            BOLTS++;
        }
        if($('.user').find('i').length !== BOLTS) {
            let html = '';
            for(let i = 0; i < BOLTS; i++) {
                html += `<i class="fas fa-bolt"></i>`;
            }
            $('.user').html(html);
        }
    }
    
})

$('.enemy').on('click', ({target}) => {
    const bolt = $('.user i:first-child');
    if (bolt.length) {
        BOLTS--;
        // $('.user').remove(bolt);
        bolt.remove();
        if ($(target).hasClass('fa-android')) {
            $(target).remove();
            SCORE++;
            $(`h1 span:first-child`).html(`SCORE : ${SCORE}`)
            // $(`h1 span:last-child`).html(`ENEMY : ${$(ENEMY)}`)
            LEVEL += 0.1;
            if (RADIUS >0 ) {
                Array.prototype.forEach.call($('.enemy i'), (item) => {
                    const offset = $(item).offset();
                    if ((offset.top < clientY + RADIUS) && 
                    (offset.top > clientY - RADIUS) && 
                    (offset.left < clientX + RADIUS) && 
                    (offset.left > clientX - RADIUS)) {
                        item.remove();
                    }
                })
            }
        }
    }
    
})

function enemyFactory() {
    if(Math.random() + LEVEL > 0.9) {
        const i = document.createElement('i');

    $(i).addClass('fab fa-android').css({
        top: Math.random() * ($('.enemy').height() -25),
        left: Math.random() * ($('.enemy').width() -25)
    });
    
    $('.enemy').append(i);
    $(`h1 span:last-child`).html(`ENEMY : ${$('.enemy i').length}`)
    }
    if($('.enemy').find('i').length > 100) {
        alert('game over');
        $('.enemy').html('');
        clearInterval(TIMER);
    }
    
}
let TIMER = setInterval(enemyFactory, 2000);