Язык описания шаблонов Snakeskin
================================
<center>
  <img src="https://camo.githubusercontent.com/387c4de9d31bc82182b92747a7e0c6e54e114500/687474703a2f2f6b6f62657a7a7a612e636f6d2f66696c65732f736e616b65736b696e2f6c6f676f2e7376673f31" alt="Snakeskin" width="190" />

  *This is Frank, a snake-cowboy who loves templates.*
</center>
---

Привет! Хочу рассказать о своей разработке - языке программирования текстовых шаблонов "Snakeskin".
Проекту больше трех лет, всеми детскими болезнями, я полагаю, он благополучно переболел (и излечился),
поэтому хочу поделиться результатом.

[Демка](http://codepen.io/kobezzza/pen/zrJNXx)

[Основной репозиторий](https://github.com/SnakeskinTpl/Snakeskin)

[Документация](http://snakeskintpl.github.io/docs/index-ru.html)

[Плагины для Gulp, Grunt, Webpack и прочее](https://github.com/SnakeskinTpl)

[Gitter](https://gitter.im/SnakeskinTpl/Snakeskin) -- здесь можно задать любой интересующий вопрос

<cut />

## Немного истории

Когда я работал в Яндексе (года четыре назад), одной из основных тем для жарких дискуссий на кофе-поинтах у нас с коллегами были шаблонизаторы: мы обсуждали достоинства и недостатки существующих решений, некоторые даже разрабатывали свои собственные.

В отделе основным был TemplateToolkit2 - популярный в частности у Perl-разработчиков шаблонизатор, а на клиенте использовался простейший MicroTemplate (by Джон Резиг). Ещё в то время активно форсились XSLT-подобные движки, но по ряду причин (обсуждение которых лежит за рамками этой статьи) нам они не подошли. Время от времени мы экспериментировали и с другими: Handlebars, Dust, Closure Templates, плюс свои велосипеды, конечно же… Всё это привело к наличию целого зоопарка шаблонизаторов в проекте.

Моим фаворитом являлся Google Closure Templates: он был близок мне как программисту, т.к. шаблон позиционировался как функция, которая просто возвращает строку, плюс весьма неплохие по тем временам фичи; но очень огорчала необходимость править код на Java, чтобы добавить какой-нибудь банальный фильтр, да и скорость трансляции была не ахти (это реально ощущалось).

И я захотел сделать свой собственный Closure Templates ~~с блэкджеком и шлюхами~~: естественно, чтобы был написан на JS и, как следствие, открыт к модификациям без необходимости знать Java. Плюс, мне понравилась модель наследования шаблонов, основанная на статических блоках, которую я подсмотрел в Django Templates (отсюда и название – отсылка к Python) - она-то и легла в основу существующей системы наследования.

Прототип я набросал дня за три: это был жуткий хардкод на регулярках в семь сотен строк кода. С результатом я немного поигрался, поделился с коллегами, получил какой-никакой, но фидбэк, и решил двигаться дальше: я порефакторил это дело, поправил баги, добавил ~~новые~~ возможностей. После недели разработки я запилил версию 2 - это был по сути тот же хардкод на регулярках, но стабильней и фичастей. Его уже можно было использовать.

Поработав некоторое время с результатом и выпустив с десяток обновлений, я, потирая руки, сел за компьютер с мыслью "It's time to make things right", и где-то через месяц выпустил 3-ю версию: выкинул хардкод, переписал код на ES6 (в то время не было нормальных трансляторов, поэтому я ещё и [транслятор](https://github.com/kobezzza/NeJS) свой собственный запилил (опять же, с жутким хардкодом на регулярках – да-да, я люблю регулярки)), добавил построение дерева при парсинге и много новых фич.

Версия вышла стабильной, мощной и, по сути, представляла собой Closure Templates на стероидах. Я был доволен результатом и стал использовать Snakeskin в своих личных проектах, время от времени выпуская новые обновления и патчи.

Чуть позже я познакомился с HAML и Jade, мне понравился их подход к синтаксису, и было решено добавить в Snakeskin нечто подобное (результатом этого решения стал Jade-like синтаксис). Спустя несколько месяцев активной разработки я выпустил четвертую версию, ставшую поистине вехой в истории языка и определившую его дальнейшее развитие. Пятая и шестая были не более чем модификацией четвёртой версии, но с ломающими изменениями, которые были необходимы, а так как в качестве паттерна версионирования для Snakeskin мною был выбран [SemVer](http://semver.org/) - пришлось апать мажорную версию.

SS6 я использовал довольно долго и в самых различных проектах, также его стали использовать мои знакомые и коллеги – в итоге, по прошествии некоторого времени, накопился список претензий -- не очень длинный, но всё же: фич было много, появлялись в языке они весьма хаотично, и стали видны "конфликты" между директивами. Причиной этому являлось отсутствие какой-либо начальной спецификации языка -- разработка шла по мере появления «хотелок».

Я решил, что так дальше жить нельзя - нужно всё стандартизировать и удалить мусор. Разработка затянулась на полтора года (из которых, правда, активная была максимум полгода – сказывалась нехватка свободного времени), но в итоге получился самый стабильный и продуманный на данный момент релиз Snakeskin: версия 7; и я искренне им горжусь.


## Первый взгляд

Наиболее подходящим для Snakeskin мне кажется определение, что он - просто "сахар" над JS, как CoffeeScript или TypeScript, но имеет достаточно узкую специализацию: написание шаблонов. Конечно, вполне можно написать на SS хоть всё приложение целиком, но это будет, хех, не очень удобно. SS предназначен для использования вместе с основным языком - преимущественно JS:

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

Тут в основной файл на JS подключается как модуль файл на Snakeskin (такую бесшовную интеграцию дает, например, [плагин для WebPack](https://github.com/SnakeskinTpl/snakeskin-loader)). Из него импортируем namespace `select`, и объявляем класс `Select`. При создании инстанса `Select`, мы выполняем функцию `main` (в которую был транслирован шаблон `main`), и присваиваем свойству `template` результат её работы - для `newSelect` он будет таким:

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

Как видите, SS транслируется в JS (если конкретно, то в ES5), который потом очень просто использовать в основном коде.

Если говорить о том, зачем я начал делать Snakeskin -- основной мотивацией было желание иметь язык шаблонов с мощными возможностями повторного использования кода, который можно использовать на сервере и на клиенте одновременно без необходимости изменения кода шаблона.
Потом, конечно, стали появляться новые требования к языку и идеи в стиле "а не добавить ли мне вот такую фичу" - всё это,
творчески и логически осмысленное, и сделало Snakeskin таким, каким вы его видите сейчас.

Одним из "требований времени", например, стала необходимость бесшовной интеграции с фреймворками и библиотеками, которые имеют собственный язык шаблонов (вроде Angular или React - ну а я предпочитаю [Vue](http://vuejs.org/)) - и теперь Snakeskin это отлично удаётся.

**Пример использования SS для создания шаблонов Angular:**

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

Snakeskin значительно сокращает количество кода, позволяет повторно использовать элементы вёрстки (через наследование, композицию, примеси и т.д.), а Angular осуществляет data-binding. С технической точки зрения SS генерирует шаблон, который потом использует Angular.

## Где можно использовать

* **Серверная шаблонизация** - тут всё просто: подключаем SS как модуль, компилируем файл, и node.js работает с его шаблонами как с функциями:

```js
'use strict';

const http = require('http');
const ss = require('snakeskin');

/// Компилируем файл шаблонов
/// Метод вернёт объект с шаблонами-функциями
const tpls = ss.compileFile('./myTpls.ss');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  // Вызываем шаблон foo и передаём параметры
  res.write(tpls.foo('bar', 'bla'));
  res.end();
}).listen(8888);
```

Разумеется, на практике это будет серверный фреймворк типа Express или Koa, но это не имеет значения.
Также, шаблоны можно (и желательно) предварительно транслировать с помощью [плагина для Gulp](https://github.com/SnakeskinTpl/gulp-snakeskin) или [Grunt](https://github.com/SnakeskinTpl/grunt-snakeskin) и подключать полученные файлы, ну или, как выше - использовать WebPack.

* **Генерация статических сайтов**: у плагинов есть опция вызывать скомпилированный шаблон в момент трансляции и возвращать результат его работы.
Плагин сам [вычислит главный шаблон](http://snakeskintpl.github.io/docs/api.html#execFile), либо его можно указать явно.

* **Использование транслированных в JS шаблонов на клиенте**: "скомпилированные" модули можно подключать через внешний тег `<script>`,
либо как модуль (с помощью Webpack, Browserify, RequireJS или любой другой системы управлениями модулями).

## Краткий обзор языка

Здесь я пробегусь по основным концепциям, а если у вас останутся вопросы -- добро пожаловать в [документацию](http://snakeskintpl.github.io/docs/index-ru.html) или в [Gitter](https://gitter.im/SnakeskinTpl/Snakeskin).

### Основное

#### Шаблоны

Как уже неоднократно упоминалось, шаблон Snakeskin после трансляции становится функцией JavaScript:

```
- namespace myApp
- template main()
  Hello world!
```

после трансляции превратится во что-то вроде:

```
if (exports.myApp === 'undefined') {
	var myApp = exports.myApp = {};
}

exports.myApp.main = function main() {
	return 'Hello world!';
}
```

Конечно, это упрощенный код, но в целом это выглядит примерно так.

#### Синтаксис

SS поддерживает 2 разных вида синтаксиса:

* **Classic**: директивы заключены в фигурные скобки; блочные (которые могут содержать внутри себя другой код на SS) должны быть явно закрыты:

  ```
  {namespace myApp}
  {template main(name = 'world')}
    Hello {name}!
  {/template}
  ```

  Этот режим удобно использовать для генерации текста с управляющими пробелами, например ~~кода на Python~~ Markdown.

  *Примечание*: для генерации текста, где часто используются символы фигурных скобок, в SS есть [специальный механизм](http://snakeskintpl.github.io/docs/guide-ru.html#basics--%D0%A0%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%81).

* **Jade-like**: основан на управляющих пробелах и похож на Jade (отсюда и название). Пример выше с его использованием будет выглядеть так:

  ```
  - namespace myApp
  - template main(name = 'world')
    Hello {name}!
  ```

  Главные плюсы этого синтаксиса - краткость и наглядность. Идеально подходит для генерации XML-подобных структур.

  Также SS поддерживает смешанный синтаксис:

  ```
  - namespace myApp

  {template hello(name = 'world')}
    Hello {name}!
  {/template}

  - template main(name)
    += myApp.hello(name)
  ```

[Подробнее про синтаксис и его виды](http://snakeskintpl.github.io/docs/guide-ru.html#basics).

### Инструменты code-reuse
#### Наследование

В SS каждый шаблон является классом, т.е. у него есть методы и свойства, и он может наследоваться от другого шаблона.
Дочерний шаблон может переопределять унаследованные родительские методы и свойства и добавлять новые.

**Пример наследования шаблонов**

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
        /// вызов метода sayHello
        += self.sayHello()



/// Доопределяем родительский метод
- block child->sayHello()
  /// Вызываем метод sayHello родителя
  - super
  Hello people!

/// Добавляем новый метод
- block child->go()
  Let's go!

/// шаблон child наследуется от base
- template child() extends myApp.base

  /// Переопределяем свойство
  - title = 'Дочерняя страница'

  /// Переопределяем статичный блок
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


При наследовании шаблона также наследуются входные параметры, декораторы шаблона, различные модификаторы - [вот тут](http://snakeskintpl.github.io/docs/guide-ru.html#inheritBasic) можно почитать подробнее.

#### Композиция

Т.к. все шаблоны в Snakeskin это функции, то, естественно,
любой шаблон может вызвать любой другой шаблон; для этого служит директива `call`.

```
- namespace myApp

- template hello(name = 'world')
  Hello {name}!

- template main(name)
  - call myApp.hello(name)

  /// Или короткая форма
  += myApp.hello(name)
```

[Подробнее](http://snakeskintpl.github.io/docs/api-ru.html#call)

#### Шаблон как значение

В Snakeskin можно присвоить шаблон переменной или свойству объекта, передать его как аргумент в функцию, и так далее.

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

Каждый файл, написанный на Snakeskin, представляет собой модуль: глобальные переменные инкапсулируются в нём,
а все шаблоны - экспортируются. Модули могут подключать другие модули
с помощью директивы [`include`](http://snakeskintpl.github.io/docs/api-ru.html#include).

Таким образом, можно легко разделять код на логические части, создавать подключаемые библиотеки
(и даже, возможно, фреймворки), и вообще неотступно следовать правилу "разделяй и властвуй".

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

  В Snakeskin есть: директивы, семантически эквивалентные операторам в JS, такие как
  [`if`](http://snakeskintpl.github.io/docs/api-ru.html#if),
  [`for`](http://snakeskintpl.github.io/docs/api-ru.html#for),
  [`var`](http://snakeskintpl.github.io/docs/api.html#var),
  [`return`](http://snakeskintpl.github.io/docs/api.html#return), etc;
  директивы, специфичные для языка шаблонов и упрощающие разметку XML-подобных структур:
  [`tag`](http://snakeskintpl.github.io/docs/api.html#tag),
  [`attr`](http://snakeskintpl.github.io/docs/api.html#attr),
  [`doctype`](http://snakeskintpl.github.io/docs/api.html#doctype),
  [`comment`](http://snakeskintpl.github.io/docs/api.html#comment) и другие;
  директивы для асинхронной генерации шаблона:
  [`await`](http://snakeskintpl.github.io/docs/api.html#await),
  [`yield`](http://snakeskintpl.github.io/docs/api.html#yield),
  [`parallel`](http://snakeskintpl.github.io/docs/api.html#parallel),
  [`waterfall`](http://snakeskintpl.github.io/docs/api.html#waterfall);
  и [множество других](http://snakeskintpl.github.io/docs/api.html).

  *Хозяйке на заметку*: Snakeskin - это всё-таки не JavaScript,
  поэтому некоторые директивы в нюансах могут работать не так, как работают аналогичные операторы в JS;
  например, у переменных, объявленных через [`var`](http://snakeskintpl.github.io/docs/api.html#var) -
  блочная область видимости
  (подобно [`let`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/let) из ES2015).
  а в директиве [`with`](http://snakeskintpl.github.io/docs/api.html#with) устранены
  архитектурные недостатки одноименного оператора из JS, что делает её использование в рамках SS вполне себе "good practice"
  и просто упрощает и ускоряет написание кода.

* **[Механизм фильтров](http://snakeskintpl.github.io/docs/guide-ru.html#filters)**

  ![Filters_Everywhere.jpg](https://habrastorage.org/files/6d2/6e3/f26/6d26e3f26ac249f29a3ba91822a2a2cc.jpg)

  Фильтры присутствуют в том или ином виде в большинстве шаблонных движков,
  но в SS они - часть ядра языка, вследствие чего использовать их можно буквально везде:
  при создании переменных, в циклах, при декларации аргументов блоков и шаблонов,
  в директивах... В общем, вообще везде.

  ```
  - namespace myApp
  - template main((str|trim), name = ('World'|lower))
    - var a = {foo: 'bar'} |json
  ```

  В SS из коробки есть [много полезных встроенных фильтров](https://github.com/SnakeskinTpl/Snakeskin/blob/master/src/live/filters.js),
  а если их не хватит, то добавить свой - [элементарно](http://snakeskintpl.github.io/docs/guide-ru.html#filters--Пользовательский_фильтр) .

* **Двунаправленная модульная интеграция с JS**

  В программу на JS можно импортировать шаблоны SS,
  а Snakeskin может импортировать модули JavaScript (с помощью директивы
  [`import`](#http://snakeskintpl.github.io/docs/api-ru.html#import)),
  поддерживая все основные виды модулей: *umd*, *amd*, *commonjs*, *native* и *global*.

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

  Например, у плагинов SS для сборочных систем (Gulp и Сo) есть режим,
  в котором шаблон Snakeskin сразу возвращает React.Element

  **Генерация шаблона для React**:

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

  Для такой бесшовной интеграции, когда шаблон возвращает элемент, созданный с помощью React,
  используйте [Webpack-плагин](https://github.com/SnakeskinTpl/snakeskin-loader) c включенным флагом `jsx`.

* **[Полный контроль над пробельными символами](http://snakeskintpl.github.io/docs/guide-ru.html#introTemplates--%D0%A0%D0%B0%D0%B1%D0%BE%D1%82%D0%B0_%D1%81_%D0%BF%D1%80%D0%BE%D0%B1%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC%D0%B8_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B0%D0%BC%D0%B8)**

  Также см. раздел ["Работа с пробельными символами"](http://snakeskintpl.github.io/docs/api-ru.html#ignoreWhitespaces).

* **[Поддержка "липких" ссылок](http://snakeskintpl.github.io/docs/api-ru.html#tag--Ссылки_на_родительский_класс)
(ссылок на родительский класс)**

    Механизм похож на тот, что используется в CSS-препроцессорах. Удобен, если придерживаетесь БЭМ подхода.
    Принцип работы следующий: если при декларации тега задать имя класса, которое начинается с символа `&`,
    то он будет заменён на ближайший родительский класс, который декларировался без этого символа:

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

  Многие директивы Snakeskin поддерживают механизм интерполяции, т.е. прокидывание динамических значений шаблона в директивы, например:

  ```
  - namespace myApp
  - template main(area)
    < ${area ? 'textarea' : 'input'}.b-${area ? 'textarea' : 'input'}
      Бла бла бла
  ```

  В зависимости от значения `area` результат будет выглядеть либо так (при `area == true`):

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

  Благодаря механизму декораторов, в Snakeskin легко интегрировать дополнительные модули - например, типограф:

  ```
  - namespace demo
  - import Typograf from 'typograf'

  - template typograf(params)
    - return
      () => target
        - return
          () =>
            - return new Typograf(params).execute(target.apply(this, arguments))

  // Результат шаблона index всегда будет обработан типографом
  - @typograf({lang: 'ru'})
  - template index()
    Спорт - это правильно!
  ```

* **[Асинхронные шаблоны](http://snakeskintpl.github.io/docs/api-ru.html#template--Модификаторы_шаблона)**

  SS позволяет создавать шаблоны-генераторы и async-шаблоны, плюс содержит ряд директив для удобного использования
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

  Также см. раздел "[Директивы для асинхронной работы"](http://snakeskintpl.github.io/docs/api-ru.html#series)".

* **Настраиваемый рендеринг**

  Из коробки Snakeskin поддерживает четыре режима рендеринга: в строку (по умолчанию), в Buffer, в DocumentFragment и в JSX;
  также есть возможность добавить свой рендерер - например, чтобы сгенерировать кастомный Virtual DOM.

* **Информативные сообщения об ошибках**

  В транслятор Snakeskin встроен мощный отладчик кода, который помогает находить
  большинство синтаксических и логических ошибок при трансляции шаблонов.

* **Поддержка всеми основными системами сборок**

  [Gulp](https://github.com/SnakeskinTpl/gulp-snakeskin), [Grunt](https://github.com/SnakeskinTpl/grunt-snakeskin), [WebPack](https://github.com/SnakeskinTpl/snakeskin-loader).

* **Хорошая кодовая база**

  Snakeskin полностью написан на ES2015, содержит большое количество тестов и проходит максимально строгую проверку
  Google Closure Compiler в режиме `ADVANCED`. Код хорошо документирован в соответствии со стандартом JSDoc от Google.

* **[Подробная и понятная документация](http://snakeskintpl.github.io/docs/index-ru.html)**.

  Которая, кстати, [написана на Snakeskin](https://github.com/SnakeskinTpl/docs/tree/gh-pages/tpls).

## Заключение

Искренне надеюсь, что Snakeskin заинтересовал вас, вы опробуете его, будете с удовольствием пользоваться и недоумевать,
как вы раньше без него жили :)

Выражаю искреннюю признательность @trikadin за помощь с написанием и редактурой статьи.
Кстати, этот парень работает фронтэндером в "[Едадиле](https://edadeal.ru/)", и сейчас они проводят у себя внедрение
Snakeskin как основного языка шаблонов для Web. Говорит, что он счастлив и не понимает, как жил без SS раньше :)

Также хочу поблагодарить коллектив [форума javascript.ru](http://javascript.ru/forum/)
за идеи по развитию языка и поддержку.

О найденных багах пишите в [Issues](https://github.com/SnakeskinTpl/Snakeskin/issues) на GitHub-e проекта, а появившиеся вопросы
задавайте либо здесь в комментариях, либо в [Gitter](https://gitter.im/SnakeskinTpl/Snakeskin)'е -- я всегда с удовольствием
отвечу и объясню.

Удачи!
