!function(win, doc){
    var $slogan = $('#slogan-screen'),
        $toggle = $('.info.toggle > i'),
        $register = $('.register'),
        $modal = $('#slogan-screen .modal'),
        $tip = $('#slogan-screen > .tip');
    $toggle.on('touchstart',function(){
        var $this = $(this);

        if (!$this.hasClass('open')) {
            $this.addClass('open').html('\&#xe63f;');
        } else {
           $this.removeClass('open').html('\&#xe60d;');
        }

        $register.toggleClass('active');
    });
    $tip.on('touchstart', function(){
        $slogan.animate({top: '-100%'}, 500).hide();
    });
    var bookTags = ['漫画','绘本','推理','青春','言情','科幻','武侠','奇幻','童话','诗歌','散文','名著'];
    function getTag(){
      return  bookTags[Math.floor(Math.random()*bookTags.length)];
    }

   var $more = $('#page .more'),
       $clientH = $(win).height();

  console.log(0);
  getData();
  var timer;
  $(win).on('scroll',function(){
    var $scrollH = $(win).scrollTop(),
        $thisH = $more.offset().top;
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(function(){
          if ($thisH < $clientH + $scrollH) {
              getData();
          }
      }, 1000)
  })

    function getData(){
      $.ajax({
        url: 'https://api.douban.com/v2/book/search',
        type: 'get',
        cache: true,
        crossDomain: true,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {
          tag: getTag(),
          start: 0,
          count: 20
        },
        beforeSend: function () {
          $('#page .loading').css('top', $(win).height()*0.5 - 100 + 'px').fadeIn(200);
        },
        success: function (data) {
           render(data.books);
           $('#page .loading').fadeOut(200).hide();
        },
        error: function(err){
           console.log(err);
        }
      });
    }

    function render(obj){
        var str='';
        for (var i = 0; i < obj.length; i++) {
            str += '<li class="book-item"><div class="layout-box"><a href="'
                + obj[i].url
                + '" class="book-cover"><img src="'
                + obj[i].images.medium
                + '" ></a><a href="/" class="book-info"><div class="book-title">'
                + obj[i].title
                + '</div><div class="book-author">'
                + obj[i].author
                + '</div><div class="book-discription">'
                + obj[i].summary
                + '</div></a><span class="price"><i>'
                + obj[i].price
                + '</i></span></div></li>';
        }
        $('.book-list ul').append(str);
    }

}(window, document)
