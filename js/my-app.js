// Init App
var myApp = new Framework7({
  modalTitle: 'KingShip',
  // Enable Material theme
  material: true,
});

// Expose Internal DOM library
var $$ = Dom7;

// Add main view
var mainView = myApp.addView('.view-main', {
});

/* ===== Уведомление ===== */
myApp.onPageInit('sign-in', function (page) {
  $$('.ks-notification-3').on('click', function () {
    myApp.addNotification({
      message: 'Имя отсутствует в базе данных или введен неправильный пароль',
      button: {
        text: 'Закрыть'
      }
    });
  });
});

/* ===== Project list ===== */
myApp.onPageInit('projects-list', function (page) {
  /* ===== Pull To Refresh ===== */
  var ptrContent = $$(page.container).find('.pull-to-refresh-content');

  ptrContent.on('refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
      // When loading done, we need to "close" it
      myApp.pullToRefreshDone();
    }, 2000);
  });

  /* ===== Infinite Scroll ===== */
  // Loading flag
  var loading = false;
  // Last loaded index
  var lastIndex = $$('.infinite-scroll .list-block li').length;
  // Max items to load
  var maxItems = 60;
  // Append items per load
  var itemsPerLoad = 5;
  // Attach 'infinite' event handler
  $$('.infinite-scroll').on('infinite', function () {
   
    // Exit, if loading in progress
    if (loading) return;
   
    // Set loading flag
    loading = true;
   
    // Emulate 1s loading
    setTimeout(function () {
      // Reset loading flag
      loading = false;
   
      if (lastIndex >= maxItems) {
        // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
        myApp.detachInfiniteScroll($$('.infinite-scroll'));
        // Remove preloader
        $$('.infinite-scroll-preloader').remove();
        return;
      }
   
      // Generate new items HTML
      var html = '';
      for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
        html += '<li>' + 
                  '<a href="project.html" class="item-link item-content status-expires">' +
                    '<div class="item-media">' +
                      '<i class="material-icons projects-icon">access_time</i>' +
                    '</div>' +
                    '<div class="item-inner">' +
                      '<div class="item-title-row">' +
                        '<div class="item-title">Суши-смак ' + i + '</div>' +
                        '<div class="item-after">70 руб.</div>' +
                      '</div>' +
                      '<div class="item-subtitle">г Махачкала, ул Ирчи Казака, д 35П</div>' +
                      '<div class="item-text">02.09.2017 21:54</div>' +
                    '</div>' +
                  '</a>' +
                '</li>';
      }
   
      // Append new items
      $$('.infinite-scroll .list-block ul').append(html);
   
      // Update last loaded index
      lastIndex = $$('.infinite-scroll .list-block li').length;
    }, 1000);
  }); 
});

/* ===== Выберите категорию ===== */
myApp.onPageInit('add-project-subcat', function (page) {
  // Describe yourself picker
  var pickerDescribe = myApp.picker({
    input: '#ks-picker-describe',
    rotateEffect: true,
    cols: [
      {
        textAlign: 'left',
        values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
      },
      {
        values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
      },
    ]
  });

  // Добавляем карту на страницу добавления проекта
  var s=document.getElementsByTagName('script')[0]; 
  var sc=document.createElement('script'); 

  sc.type='text/javascript'; 
  sc.async=false; 
  sc.src='../js/map.js'; 
  s.parentNode.insertBefore(sc,s);

  // Inline date-time
  var today = new Date();

  var pickerInline = myApp.picker({
    input: '#ks-picker-date',
    container: '#ks-picker-date-container',
    toolbar: false,
    rotateEffect: true,
    value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
    onChange: function (picker, values, displayValues) {
      var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
      if (values[1] > daysInMonth) {
        picker.cols[1].setValue(daysInMonth);
      }
    },
    formatValue: function (p, values, displayValues) {
      return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
    },
    cols: [
      // Months
      {
        values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
        displayValues: ('January February March April May June July August September October November December').split(' '),
        textAlign: 'left'
      },
      // Days
      {
        values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      },
      // Years
      {
        values: (function () {
          var arr = [];
          for (var i = 1950; i <= 2030; i++) { arr.push(i); }
          return arr;
        })(),
      },
      // Space divider
      {
        divider: true,
        content: '&nbsp;&nbsp;'
      },
      // Hours
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 23; i++) { arr.push(i); }
          return arr;
        })(),
      },
      // Divider
      {
        divider: true,
        content: ':'
      },
      // Minutes
      {
        values: (function () {
          var arr = [];
          for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
          return arr;
        })(),
      }
    ]
  });

  // Уведомление
  $$('.notification-subcat').on('click', function () {
    myApp.addNotification({
      message: 'Поле должно быть заполнено: Когда нужно приступить к заданию',
      button: {
        text: 'Закрыть'
      }
    });
  });
});

/* ===== Добавляем карту на страницу проекта ===== */
myApp.onPageInit('project', function (page) { 
  var s=document.getElementsByTagName('script')[0]; 
  var sc=document.createElement('script'); 

  sc.type='text/javascript'; 
  sc.async=false; 
  sc.src='../js/map.js'; 
  s.parentNode.insertBefore(sc,s);
});
