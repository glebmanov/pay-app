## Cardpay-app
SPA приложение приема платежей

## Стек
- Expressjs
- MangoDB
- React
- Ant design

### Установка зависимостей

```sh
$ make install
```

### Запуск

#### 1. в режиме prod
```sh
$ make start
```
#### 2 .в режиме dev
```sh
$ make dev
```

Приложение выводит форму с полями для ввода номера карты, срока действия карты, cvv-кода и суммы платежа.

![alt-текст](https://i.ibb.co/2Wq6YWh/interface1.png "Основной интерфейс")

Поля формы оснащены первичной проверкой данных, а так же присутствует валидация на стороне сервера.

![alt-текст](https://i.ibb.co/N1kpxTJ/2022-03-23-23-23-55.png "Заполненная форма")

Пример запроса:

![alt-текст](https://i.ibb.co/BBfkssk/req.png "request")

Пример ответа:

![alt-текст](https://i.ibb.co/khjPtFG/res.png "response")

---

## Что можно улучшить
- маска для инпутов
- убрать возможность ввода некорректных символов
- дизайн