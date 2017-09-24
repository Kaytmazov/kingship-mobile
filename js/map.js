function init () {
  /**
   * Создаем мультимаршрут.
   * Первым аргументом передаем модель либо объект описания модели.
   * Вторым аргументом передаем опции отображения мультимаршрута.
   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml
   */
  var multiRoute = new ymaps.multiRouter.MultiRoute({
    // Описание опорных точек мультимаршрута.
    referencePoints: [
      [42.964454, 47.512022],
      [42.983367, 47.502846]
    ],
    // Параметры маршрутизации.
    params: {
      // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
      results: 1
    }
  }, {
    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
    boundsAutoApply: true
  });

  // Создаем карту
  var myMap = new ymaps.Map('map', {
    center: [42.969909, 47.505869],
    zoom: 12
  });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);
