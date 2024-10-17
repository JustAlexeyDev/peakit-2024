# НАЗВАНИЕ | Peak-IT 2024

## Состав Команды
|Role           |Name                       |
|---------------|---------------------------|
|Менеджер        |Дыдорова Татьяна         |
|Дизайнер  |Халланова Айна        |
|Разработчик | Коротких Алексей |

## Технологии:
### Языки
- JavaScript
- JSX
- HTML
- CSS
- Python 3.11.2
### Фреймворки
- Django
- React Native

#### Библиотеки Python
- Rest Framework
- simplejwt
- drf_yasg
### База данных
- SQLite3
### Other tools
 - Expo App
 - Robokassa payment
 - 
## Установка и запуск Frontend части:
Напишите в терминале
- `cd Frontend` (Переход в директорию)
- `npm install` или `npm i` (Установка зависимостей)
- `npm start` (Запуск сервера)
## Установка и запуск Backend части:
1. Скачайте и установите [python 3.10](https://www.python.org/downloads/release/python-31011/). Во время установки вам будет предложено добавить python в PATH, согласитесь.
2. Скопируйте репозиторий (Если уже не сделали этого)
```
git clone https://github.com/JustAlexeyDev/Netler.git
```
4. Переместитесь в папку *backend*:
```
cd backend
```
5. Пропишите следующие команды
```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```
