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

/* ===== Pull To Refresh ===== */
myApp.onPageInit('projects-list', function (page) {
  var ptrContent = $$(page.container).find('.pull-to-refresh-content');

  ptrContent.on('refresh', function (e) {
    // Emulate 2s loading
    setTimeout(function () {
      // When loading done, we need to "close" it
      myApp.pullToRefreshDone();
    }, 2000);
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
