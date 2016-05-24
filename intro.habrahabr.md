Язык описания шаблонов Snakeskin
================================

<img src="https://camo.githubusercontent.com/387c4de9d31bc82182b92747a7e0c6e54e114500/687474703a2f2f6b6f62657a7a7a612e636f6d2f66696c65732f736e616b65736b696e2f6c6f676f2e7376673f31" alt="Snakeskin" width="190" />

*This is Frank, a snake-cowboy who loves templates.*

---

Привет! Хочу рассказать о&nbsp;своей разработке&nbsp;&mdash; языке программирования текстовых шаблонов &laquo;Snakeskin&raquo;.
Проекту больше трех лет, всеми детскими болезнями, я&nbsp;полагаю, он&nbsp;благополучно переболел (и&nbsp;излечился),
поэтому хочу поделиться результатом.

[Демка](http://codepen.io/kobezzza/pen/zrJNXx)

[Основной репозиторий](https://github.com/SnakeskinTpl/Snakeskin)

[Документация](http://snakeskintpl.github.io/docs/index-ru.html)

[Плагины для Gulp, Grunt, Webpack и&nbsp;прочее](https://github.com/SnakeskinTpl)

[Gitter](https://gitter.im/SnakeskinTpl/Snakeskin)&nbsp;&mdash; здесь можно задать любой интересующий вопрос

<cut />

## Немного истории

Когда я&nbsp;работал в&nbsp;Яндексе (года четыре назад), одной из&nbsp;основных тем для жарких дискуссий на&nbsp;кофе-поинтах у&nbsp;нас с&nbsp;коллегами были шаблонизаторы: мы&nbsp;обсуждали достоинства и&nbsp;недостатки существующих решений, некоторые даже разрабатывали свои собственные.

В&nbsp;отделе основным был TemplateToolkit2&nbsp;&mdash; популярный в&nbsp;частности у&nbsp;Perl-разработчиков шаблонизатор, а&nbsp;на&nbsp;клиенте использовался простейший MicroTemplate (by&nbsp;Джон Резиг). Ещё в&nbsp;то&nbsp;время активно форсились XSLT-подобные движки, но&nbsp;по&nbsp;ряду причин (обсуждение которых лежит за&nbsp;рамками этой статьи) нам они не&nbsp;подошли. Время от&nbsp;времени мы&nbsp;экспериментировали и&nbsp;с&nbsp;другими: Handlebars, Dust, Closure Templates, плюс свои велосипеды, конечно&nbsp;же... Всё это привело к&nbsp;наличию целого зоопарка шаблонизаторов в&nbsp;проекте.

Моим фаворитом являлся Google Closure Templates: он&nbsp;был близок мне как программисту, т.&nbsp;к. шаблон позиционировался как функция, которая просто возвращает строку, плюс весьма неплохие по&nbsp;тем временам фичи; но&nbsp;очень огорчала необходимость править код на&nbsp;Java, чтобы добавить какой-нибудь банальный фильтр, да&nbsp;и&nbsp;скорость трансляции была не&nbsp;ахти (это реально ощущалось).

И&nbsp;я&nbsp;захотел сделать свой собственный Closure Templates ~~с блэкджеком и&nbsp;шлюхами~~: естественно, чтобы был написан на&nbsp;JS и, как следствие, открыт к&nbsp;модификациям без необходимости знать Java. Плюс, мне понравилась модель наследования шаблонов, основанная на&nbsp;статических блоках, которую я&nbsp;подсмотрел в&nbsp;Django Templates (отсюда и&nbsp;название&nbsp;&mdash; отсылка к&nbsp;Python)&nbsp;&mdash; она-то и&nbsp;легла в&nbsp;основу существующей системы наследования.

Прототип я&nbsp;набросал дня за&nbsp;три: это был жуткий хардкод на&nbsp;регулярках в&nbsp;семь сотен строк кода. С&nbsp;результатом я&nbsp;немного поигрался, поделился с&nbsp;коллегами, получил какой-никакой, но&nbsp;фидбэк, и&nbsp;решил двигаться дальше. Порефакторил это дело, поправил баги, добавил ~~новые~~ возможностей. После недели разработки я&nbsp;зарелизил версию 2&nbsp;&mdash; по&nbsp;сути, тот&nbsp;же хардкод на&nbsp;регулярках, но&nbsp;стабильней и&nbsp;фичастей. Его уже можно было использовать.

Поработав некоторое время с&nbsp;результатом и&nbsp;выпустив с&nbsp;десяток обновлений, я, потирая руки, сел за&nbsp;компьютер с&nbsp;мыслью &laquo;It&rsquo;s time to&nbsp;make things right&raquo;, и&nbsp;где-то через месяц выпустил 3-ю версию: выкинул хардкод, переписал код на&nbsp;ES6 (в&nbsp;то&nbsp;время не&nbsp;было нормальных трансляторов, поэтому я&nbsp;ещё&nbsp;и [транслятор](https://github.com/kobezzza/NeJS) свой собственный запилил (опять&nbsp;же, с&nbsp;жутким хардкодом на&nbsp;регулярках&nbsp;&mdash; да-да, я&nbsp;люблю регулярки)), добавил построение дерева при парсинге и&nbsp;много новых фич.

Версия вышла стабильной, мощной&nbsp;и, по&nbsp;сути, представляла собой Closure Templates на&nbsp;стероидах. Я&nbsp;был доволен результатом и&nbsp;стал использовать Snakeskin в&nbsp;своих личных проектах, время от&nbsp;времени выпуская новые обновления и&nbsp;патчи.

Чуть позже я&nbsp;познакомился с&nbsp;HAML и&nbsp;Jade, мне понравился их&nbsp;подход к&nbsp;синтаксису, и&nbsp;было решено добавить в&nbsp;Snakeskin нечто подобное (результатом этого решения стал Jade-like синтаксис). Спустя несколько месяцев активной разработки я&nbsp;выпустил четвертую версию, ставшую поистине вехой в&nbsp;истории языка и&nbsp;определившую его дальнейшее развитие. Пятая и&nbsp;шестая были не&nbsp;более чем модификацией четвёртой версии, но&nbsp;с&nbsp;ломающими изменениями, которые были необходимы, а&nbsp;так как в&nbsp;качестве паттерна версионирования для Snakeskin мною был выбран [SemVer](http://semver.org/)&nbsp;&mdash; пришлось апать мажорную версию.

SS6&nbsp;я использовал довольно долго и&nbsp;в&nbsp;самых различных проектах, также его стали использовать мои знакомые и&nbsp;коллеги&nbsp;&mdash; в&nbsp;итоге, по&nbsp;прошествии некоторого времени, накопился список претензий&nbsp;&mdash; не&nbsp;очень длинный, но&nbsp;всё&nbsp;же: фич было много, появлялись в&nbsp;языке они весьма хаотично, и&nbsp;стали видны &laquo;конфликты&raquo; между директивами. Причиной этому являлось отсутствие какой-либо начальной спецификации языка&nbsp;&mdash; разработка шла по&nbsp;мере появления &laquo;хотелок&raquo;.

Я&nbsp;решил, что так дальше жить нельзя&nbsp;&mdash; нужно всё стандартизировать и&nbsp;удалить мусор. Разработка затянулась на&nbsp;полтора года (из&nbsp;которых, правда, активная была максимум полгода&nbsp;&mdash; сказывалась нехватка свободного времени), но, в&nbsp;итоге, получился самый стабильный и&nbsp;продуманный на&nbsp;данный момент релиз Snakeskin: версия&nbsp;7; и&nbsp;я&nbsp;искренне им&nbsp;горжусь.


## Первый взгляд

Наиболее подходящим для Snakeskin мне кажется определение, что он&nbsp;&mdash; просто &laquo;сахар&raquo; над&nbsp;JS, как CoffeeScript или TypeScript, но&nbsp;имеет достаточно узкую специализацию: написание шаблонов. Конечно, вполне можно написать на&nbsp;SS хоть всё приложение целиком, но&nbsp;это будет, хех, не&nbsp;очень удобно. SS&nbsp;предназначен для использования вместе с&nbsp;основным языком&nbsp;&mdash; преимущественно&nbsp;JS:

**select.ss**

```
- namespace select

- template main(options)
  < select
    - forEach options => el
      < option value = ${el.value}
        {el.label}
```

**select.js**

```js
import { select } from 'select.ss';

class Select {
  constructor(options) {
    this.template = select.main(options);
  }
}

const newSelect = new Select([{value: 1, label: 'Раз'}, {value: 2, label: 'Два'}])
```

Тут в&nbsp;основной файл на&nbsp;JS подключается как модуль файл на&nbsp;Snakeskin (такую бесшовную интеграцию дает, например, [плагин для WebPack](https://github.com/SnakeskinTpl/snakeskin-loader)). Из&nbsp;него импортируем namespace `select`, и&nbsp;объявляем класс `Select`. При создании инстанса `Select`, мы&nbsp;выполняем функцию `main` (в&nbsp;которую был транслирован шаблон `main`), и&nbsp;присваиваем свойству `template` результат её&nbsp;работы&nbsp;&mdash; для `newSelect` он&nbsp;будет таким:

```html
<select>
  <option value="1">
    Раз
  </option>
  <option value="2">
    Два
  </option>
</select>
```

Как видите, SS&nbsp;транслируется в&nbsp;JS (если конкретно, то&nbsp;в&nbsp;ES5), который потом очень просто использовать в&nbsp;основном коде.

Если говорить о&nbsp;том, зачем я&nbsp;начал делать Snakeskin&nbsp;&mdash; основной мотивацией было желание иметь язык шаблонов с&nbsp;мощными возможностями повторного использования кода, который можно использовать на&nbsp;сервере и&nbsp;на&nbsp;клиенте одновременно без необходимости изменения кода шаблона.
Потом, конечно, стали появляться новые требования к&nbsp;языку и&nbsp;идеи в&nbsp;стиле &laquo;а&nbsp;не&nbsp;добавить&nbsp;ли мне вот такую фичу&raquo;&nbsp;&mdash; всё это,
творчески и&nbsp;логически осмысленное, и&nbsp;сделало Snakeskin таким, каким вы&nbsp;его видите сейчас.

Одним из&nbsp;&laquo;требований времени&raquo;, например, стала необходимость бесшовной интеграции с&nbsp;фреймворками и&nbsp;библиотеками, которые имеют собственный язык шаблонов (вроде Angular или React&nbsp;&mdash; ну&nbsp;а&nbsp;я&nbsp;предпочитаю [Vue](http://vuejs.org/))&nbsp;&mdash; и&nbsp;теперь Snakeskin это отлично удаётся.

**Пример использования&nbsp;SS для создания шаблонов Angular:**

```
- namespace myApp
- template main()
  < label
    Name:
  < input type = text | ng-model = yourName | placeholder = Enter a name here
  < hr
  < h1
    Hello {{yourName}}!
```

**Результат работы `main`**

```html
<label>
  Name:
</label>
<input type="text" ng-model="yourName" placeholder="Enter a name here">
<hr>
<h1>
  Hello {{yourName}}!
</h1>
```

Snakeskin значительно сокращает количество кода, позволяет повторно использовать элементы вёрстки (через наследование, композицию, примеси и&nbsp;т.&nbsp;д.), а&nbsp;Angular осуществляет data-binding. С&nbsp;технической точки зрения&nbsp;SS генерирует шаблон, который потом использует Angular.

## Где можно использовать

* **Серверная шаблонизация**&nbsp;&mdash; тут всё просто: подключаем&nbsp;SS как модуль, компилируем файл&nbsp;&mdash; и&nbsp;node. js&nbsp;работает с&nbsp;его шаблонами как с&nbsp;функциями:

  ```js
  'use strict';

  const http = require('http');
  const ss = require('snakeskin');

  // Компилируем файл шаблонов
  // Метод вернёт объект с шаблонами-функциями
  const tpls = ss.compileFile('./myTpls.ss');

  http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Вызываем шаблон foo и передаём параметры
    res.write(tpls.foo('bar', 'bla'));
    res.end();
  }).listen(8888);
  ```

  Разумеется, на&nbsp;практике это будет серверный фреймворк типа Express или Koa, но&nbsp;это не&nbsp;имеет значения.
  Также, шаблоны можно (и&nbsp;желательно) предварительно транслировать с&nbsp;помощью [плагина для Gulp](https://github.com/SnakeskinTpl/gulp-snakeskin) или [Grunt](https://github.com/SnakeskinTpl/grunt-snakeskin) и&nbsp;подключать полученные файлы, ну&nbsp;или, как выше&nbsp;&mdash; использовать WebPack.

* **Генерация статических сайтов**: у&nbsp;плагинов есть опция вызывать скомпилированный шаблон в&nbsp;момент трансляции и&nbsp;возвращать результат его работы.
Плагин сам [вычислит главный шаблон](http://snakeskintpl.github.io/docs/api.html#execFile), либо его можно указать явно.

* **Использование транслированных в&nbsp;JS шаблонов на&nbsp;клиенте**: &laquo;скомпилированные&raquo; модули можно подключать через внешний тег `<script>`,
либо как модуль (с&nbsp;помощью Webpack, Browserify, RequireJS или любой другой системы управлениями модулями).

## Краткий обзор языка

Здесь я&nbsp;пробегусь по&nbsp;основным концепциям, а&nbsp;если у&nbsp;вас останутся вопросы&nbsp;&mdash; добро пожаловать в&nbsp;[документацию](http://snakeskintpl.github.io/docs/index-ru. html) или&nbsp;в&nbsp;[Gitter](https://gitter.im/SnakeskinTpl/Snakeskin).

### Основное

#### Шаблоны

Как уже неоднократно упоминалось, шаблон Snakeskin после трансляции становится функцией JavaScript:

```
- namespace myApp
- template main()
  Hello world!
```

после трансляции превратится во&nbsp;что-то вроде:

```
if (exports.myApp === 'undefined') {
  var myApp = exports.myApp = {};
}

exports.myApp.main = function main() {
  return 'Hello world!';
}
```

Конечно, это упрощенный код, но&nbsp;в&nbsp;целом это выглядит примерно так.

#### Синтаксис

SS&nbsp;поддерживает 2&nbsp;разных вида синтаксиса:

* **Classic**: директивы заключены в&nbsp;фигурные скобки; блочные (которые могут содержать внутри себя другой код на&nbsp;SS) должны быть явно закрыты:

  ```
  {namespace myApp}
  {template main(name = 'world')}
    Hello {name}!
  {/template}
  ```

  Этот режим удобно использовать для генерации текста с&nbsp;управляющими пробелами, например ~~кода на&nbsp;Python~~ Markdown.

  *Примечание*: для генерации текста, где часто используются символы фигурных скобок, в&nbsp;SS есть [специальный механизм](http://snakeskintpl.github.io/docs/guide-ru.html#basics--%D0%A0%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%81).

* **Jade-like**: основан на&nbsp;управляющих пробелах и&nbsp;похож на&nbsp;Jade (отсюда и&nbsp;название). Пример выше с&nbsp;его использованием будет выглядеть так:

  ```
  - namespace myApp
  - template main(name = 'world')
    Hello {name}!
  ```

  Главные плюсы этого синтаксиса&nbsp;&mdash; краткость и&nbsp;наглядность. Идеально подходит для генерации XML-подобных структур.

  Также SS&nbsp;поддерживает смешанный синтаксис:

  ```
  - namespace myApp

  {template hello(name = 'world')}
    Hello {name}!
  {/template}

  - template main(name)
    += myApp.hello(name)
  ```

[Подробнее про синтаксис и&nbsp;его виды](http://snakeskintpl.github.io/docs/guide-ru.html#basics).

### Инструменты code-reuse
#### Наследование

В&nbsp;SS&nbsp;каждый шаблон является классом, т.&nbsp;е. у&nbsp;него есть методы и&nbsp;свойства, и&nbsp;он&nbsp;может наследоваться от&nbsp;другого шаблона.
Дочерний шаблон может переопределять унаследованные родительские методы и&nbsp;свойства и&nbsp;добавлять новые.

**Пример наследования шаблонов**.

```
- namespace myApp

/// Метод sayHello шаблона base
/// В SS метод можно объявлять как внутри шаблона,
/// так и вне его -- с указанием имени шаблона,
/// которому метод будет принадлежать
- block base->sayHello(name = 'world')
  Hello {name}!

- template base()
  - doctype

  < html
    < head

      /// Статичный блок head
      /// Чтобы сделать такой блок методом,
      /// достаточно просто добавить круглые скобки после имени
      - block head
        < title
          /// Свойство шаблона `title`, которое сразу выводится
          - title = 'Главная страница' ?

    < body
      - block body
        /// Вызов метода sayHello
        += self.sayHello()

/// Доопределяем родительский метод
- block child->sayHello()
  /// Вызываем метод sayHello родителя
  - super
  Hello people!

/// Добавляем новый метод
- block child->go()
  Let's go!

/// Шаблон child наследуется от base
- template child() extends myApp.base

  /// Переопределяем свойство
  - title = 'Дочерняя страница'

  /// Доопределяем статичный блок
  - block body
    - super
    += self.go()
```

**Результат выполнения `child`**:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Дочерняя страница</title>
</head>

<body>
  Hello world! Hello people! Let's go!
</body>
</html>
```

При наследовании шаблона также наследуются входные параметры, декораторы шаблона, различные модификаторы&nbsp;&mdash; [вот тут](http://snakeskintpl.github.io/docs/guide-ru.html#inheritBasic) можно почитать подробнее.

#### Композиция

Т. к. все шаблоны в&nbsp;Snakeskin это функции, то, естественно,
любой шаблон может вызвать любой другой шаблон: для этого служит директива [`call`](http://snakeskintpl.github.io/docs/api-ru.html#call).

```
- namespace myApp

- template hello(name = 'world')
  Hello {name}!

- template main(name)
  - call myApp.hello(name)

  /// Или короткая форма
  += myApp.hello(name)
```

#### Шаблон как значение

В&nbsp;Snakeskin можно присвоить шаблон переменной или свойству объекта, передать его как аргумент в&nbsp;функцию, и&nbsp;так далее.

```
- namespace myApp

- template wrap(content)
  < .wrapper
    {content}

- template main(name)
  += myApp.wrap()
    < .hello
      Hello world!
```

**Результат выполнения `main`**
```html
<div class="wrapper">
  <div class="hello">
    Hello world!
  </div>
</div>
```

#### Модули

Каждый файл, написанный на&nbsp;Snakeskin, представляет собой модуль: глобальные переменные инкапсулируются в&nbsp;нём,
а&nbsp;все шаблоны&nbsp;&mdash; экспортируются. Модули могут подключать другие модули
с&nbsp;помощью директивы [`include`](http://snakeskintpl.github.io/docs/api-ru. html#include).

Таким образом, можно легко разделять код на&nbsp;логические части, создавать подключаемые библиотеки
(и&nbsp;даже, возможно, фреймворки), и&nbsp;вообще неотступно следовать правилу &laquo;разделяй и&nbsp;властвуй&raquo;.

**math.ss**

```
- namespace math
- template sum(a, b)
  {a + b}
```

**app.ss**

```
- namespace myApp
- include './math'

- template main()
  1 + 2 =
  += math.sum(1, 2)
```

**Результат вызова myApp.main**
```
1 + 2 = 3
```

### Приятные плюшки


* **Богатый набор встроенных директив**

  В&nbsp;Snakeskin есть: директивы, семантически эквивалентные операторам в&nbsp;JS, такие как
  [`if`](http://snakeskintpl.github.io/docs/api-ru.html#if),
  [`for`](http://snakeskintpl.github.io/docs/api-ru.html#for),
  [`var`](http://snakeskintpl.github.io/docs/api.html#var),
  [`return`](http://snakeskintpl.github.io/docs/api.html#return), etc;
  директивы, специфичные для языка шаблонов и&nbsp;упрощающие разметку XML-подобных структур:
  [`tag`](http://snakeskintpl.github.io/docs/api.html#tag),
  [`attr`](http://snakeskintpl.github.io/docs/api.html#attr),
  [`doctype`](http://snakeskintpl.github.io/docs/api.html#doctype),
  [`comment`](http://snakeskintpl.github.io/docs/api.html#comment) и другие;
  директивы для асинхронной генерации шаблона:
  [`await`](http://snakeskintpl.github.io/docs/api.html#await),
  [`yield`](http://snakeskintpl.github.io/docs/api.html#yield),
  [`parallel`](http://snakeskintpl.github.io/docs/api.html#parallel),
  [`waterfall`](http://snakeskintpl.github.io/docs/api.html#waterfall);
  и&nbsp;[множество других](http://snakeskintpl.github.io/docs/api.html).

  *Хозяйке на&nbsp;заметку*: Snakeskin&nbsp;&mdash; это всё-таки не&nbsp;JavaScript,
  поэтому некоторые директивы в&nbsp;нюансах могут работать не&nbsp;так, как работают аналогичные операторы в&nbsp;JS;
  например, у&nbsp;переменных, объявленных через [`var`](http://snakeskintpl.github.io/docs/api.html#var)&nbsp;&mdash;
  блочная область видимости (так работает [`let`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/let) из&nbsp;ES2015).
  В&nbsp;директиве [`with`](http://snakeskintpl.github.io/docs/api.html#with) вообще устранены
  архитектурные недостатки одноименного оператора из&nbsp;JS,
  что делает её&nbsp;использование в&nbsp;рамках&nbsp;SS вполне себе &laquo;good practice&raquo;,
  и&nbsp;просто упрощает и&nbsp;ускоряет написание кода.

* **[Механизм фильтров](http://snakeskintpl.github.io/docs/guide-ru.html#filters)**

  ![Filters_Everywhere.jpg](https://habrastorage.org/files/6d2/6e3/f26/6d26e3f26ac249f29a3ba91822a2a2cc.jpg)

  Фильтры присутствуют в&nbsp;том или ином виде в&nbsp;большинстве шаблонных движков,
  но&nbsp;в&nbsp;SS они&nbsp;&mdash; часть ядра языка, вследствие чего использовать их&nbsp;можно буквально везде:
  при создании переменных, в&nbsp;циклах, при декларации аргументов блоков и&nbsp;шаблонов, в&nbsp;директивах...
  В&nbsp;общем, вообще везде.

  ```
  - namespace myApp
  - template main((str|trim), name = ('World'|lower))
    - var a = {foo: 'bar'} |json
  ```

  В&nbsp;SS&nbsp;из&nbsp;коробки есть
  [много полезных встроенных фильтров](https://github.com/SnakeskinTpl/Snakeskin/blob/master/src/live/filters.js),
  а&nbsp;если их&nbsp;не&nbsp;хватит, то&nbsp;добавить свой&nbsp;&mdash;
  [элементарно](http://snakeskintpl.github.io/docs/guide-ru.html#filters--Пользовательский_фильтр).

* **Двунаправленная модульная интеграция с&nbsp;JS**

  В&nbsp;программу на&nbsp;JS можно импортировать шаблоны&nbsp;SS,
  а&nbsp;Snakeskin может импортировать модули JavaScript (с&nbsp;помощью директивы
  [`import`](#http://snakeskintpl.github.io/docs/api-ru.html#import)),
  поддерживая все основные виды модулей: *umd*, *amd*, *commonjs*, *native* и&nbsp;*global*.

  ```
  - namespace myApp
  - import { readdirSync } from 'fs'

  /// Выводит содержимое директории ./foo
  - template main((str|trim), name = ('World'|lower))
    - forEach readdirSync('./foo') => dirname
      {dirname}
  ```

* [**Мощный механизм локализации шаблонов**](http://snakeskintpl.github.io/docs/guide-ru.html#localization)

* **Наличие [специальных инструментов](http://snakeskintpl.github.io/docs/guide-ru.html#introLiteral)
для генерации кода других шаблонных языков**

  Например, у&nbsp;плагинов&nbsp;SS для сборочных систем (Gulp и&nbsp;другие) есть режим,
  в&nbsp;котором шаблон Snakeskin сразу возвращает React.Element.

  **Генерация шаблона для React**

  ```
  - namespace myComponent
  - template render()
    < .hello
      {{ this.name }}
  ```

  ```js
  import React from 'react';
  import { myComponent } from './myComponent.ss';

  const Foo = React.createClass({
    render: myComponent.render
  });
  ```

  Для такой бесшовной интеграции, когда шаблон возвращает элемент, созданный с&nbsp;помощью React,
  используйте [Webpack-плагин](https://github.com/SnakeskinTpl/snakeskin-loader) c&nbsp;включенным флагом `jsx`.

* **[Полный контроль над пробельными символами](http://snakeskintpl.github.io/docs/guide-ru.html#introTemplates--%D0%A0%D0%B0%D0%B1%D0%BE%D1%82%D0%B0_%D1%81_%D0%BF%D1%80%D0%BE%D0%B1%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC%D0%B8_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B0%D0%BC%D0%B8)**

  Ещё стоит заглянуть в&nbsp;раздел
  &laquo;[Работа с пробельными символами](http://snakeskintpl.github.io/docs/api-ru.html#ignoreWhitespaces)&raquo;.

* **[Поддержка &laquo;липких&raquo; ссылок](http://snakeskintpl.github.io/docs/api-ru.html#tag--Ссылки_на_родительский_класс)
(ссылок на&nbsp;родительский класс)**

    Механизм похож на&nbsp;тот, что используется в&nbsp;CSS-препроцессорах. Удобен, если придерживаетесь БЭМ подхода.
    Принцип работы следующий: если при декларации тега задать имя класса, которое начинается с&nbsp;символа &laquo;&amp;&raquo;,
    то&nbsp;он&nbsp;будет заменён на&nbsp;ближайший родительский класс, который декларировался без этого символа:

    ```
    - namespace myApp
    - template main()
      < .hello

        /// hello__wrap
        < .&__wrap

          /// hello__cont
          < .&__cont
    ```

* **[Умная интерполяция](http://snakeskintpl.github.io/docs/api-ru.html#tag--Интерполяция)**

  Многие директивы Snakeskin поддерживают механизм интерполяции, т.&nbsp;е. прокидывание динамических значений шаблона в&nbsp;директивы, например:

  ```
  - namespace myApp
  - template main(area)
    < ${area ? 'textarea' : 'input'}.b-${area ? 'textarea' : 'input'}
      Бла бла бла
  ```

  В&nbsp;зависимости от&nbsp;значения `area` результат будет выглядеть либо так (при `area == true`):

  ```html
  <textarea class="b-textarea">
    Бла бла бла
  </textarea>
  ```

  либо так (при `area == false`):

  ```html
  <input class="b-input" value="Бла бла бла">
  ```

* **[Декораторы шаблонов](http://snakeskintpl.github.io/docs/api-ru.html#template--%D0%94%D0%B5%D0%BA%D0%BE%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B)**

  Благодаря механизму декораторов, в&nbsp;Snakeskin легко интегрировать дополнительные модули&nbsp;&mdash; например, типограф:

  ```
  - namespace demo
  - import Typograf from 'typograf'

  /// Функцию-декоратор можно написать на JS или на SS
  - template typograf(params)
    - return
      () => target
        - return
          () =>
            - return new Typograf(params).execute(target.apply(this, arguments))

  /// Результат шаблона index всегда будет обработан типографом
  - @typograf({lang: 'ru'})
  - template index()
    Спорт - это правильно!
  ```

* **[Асинхронные шаблоны](http://snakeskintpl.github.io/docs/api-ru.html#template--Модификаторы_шаблона)**

  SS&nbsp;позволяет создавать шаблоны-генераторы и&nbsp;async-шаблоны, плюс содержит ряд директив для удобного использования
  популярной библиотеки [*async*](https://github.com/caolan/async).

  ```
  - namespace myApp

  - async template main(db)
    - forEach await db.getData() => el
      {el}

  - template *foo(data)
    - for var i = 0; i < data.length; i++
      {data.value}

      - if i % 1e3 === 0
        - yield
  ```

  Также загляни в&nbsp;раздел &laquo;[Директивы для асинхронной работы](http://snakeskintpl.github.io/docs/api-ru.html#series)&raquo;.

* **Настраиваемый рендеринг**

  Из&nbsp;коробки Snakeskin поддерживает четыре режима рендеринга: в&nbsp;строку (по&nbsp;умолчанию), в&nbsp;Buffer, в&nbsp;DocumentFragment и&nbsp;в&nbsp;JSX; также есть возможность добавить свой рендерер&nbsp;&mdash; например, чтобы сгенерировать кастомный Virtual DOM.

* **Информативные сообщения об&nbsp;ошибках**

  В&nbsp;транслятор Snakeskin встроен мощный отладчик кода, который помогает находить
  большинство синтаксических и&nbsp;логических ошибок при трансляции шаблонов.

* **Поддержка всеми основными системами сборок**

  [Gulp](https://github.com/SnakeskinTpl/gulp-snakeskin), [Grunt](https://github.com/SnakeskinTpl/grunt-snakeskin), [WebPack](https://github.com/SnakeskinTpl/snakeskin-loader).

* **Хорошая кодовая база**

  Snakeskin полностью написан на&nbsp;ES2015, содержит большое количество тестов и&nbsp;проходит максимально строгую проверку
  Google Closure Compiler в&nbsp;режиме `ADVANCED`. Код хорошо документирован в&nbsp;соответствии со&nbsp;стандартом JSDoc от&nbsp;Google.

* **[Подробная и&nbsp;понятная документация](http://snakeskintpl.github.io/docs/index-ru.html)**.

  Которая, кстати, [написана на&nbsp;Snakeskin](https://github.com/SnakeskinTpl/docs/tree/gh-pages/tpls).

## Заключение

Искренне надеюсь, что Snakeskin заинтересовал вас, вы&nbsp;опробуете его, будете с&nbsp;удовольствием пользоваться и&nbsp;недоумевать,
как вы&nbsp;раньше без него жили:)

Выражаю искреннюю признательность @trikadin за&nbsp;помощь с&nbsp;написанием и&nbsp;редактурой статьи.
Кстати, этот парень работает фронтэндером в&nbsp;&laquo;[Едадиле](https://edadeal.ru/)&raquo;, и&nbsp;сейчас они проводят у&nbsp;себя внедрение
Snakeskin как основного языка шаблонов для Web. Говорит, что он&nbsp;счастлив и&nbsp;не&nbsp;понимает, как жил без&nbsp;SS раньше:)

Также хочу поблагодарить коллектив [форума javascript.ru](http://javascript.ru/forum/) за&nbsp;идеи по&nbsp;развитию языка и&nbsp;поддержку.

О&nbsp;найденных багах пишите&nbsp;в [Issues](https://github. com/SnakeskinTpl/Snakeskin/issues) на&nbsp;GitHub-e проекта, а&nbsp;появившиеся вопросы
задавайте либо здесь в&nbsp;комментариях, либо&nbsp;в [Gitter](https://gitter. im/SnakeskinTpl/Snakeskin)&rsquo;е&nbsp;&mdash; я&nbsp;всегда с&nbsp;удовольствием
отвечу и&nbsp;объясню.

Удачи!
