## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

<!-- ====================================== -->

"email": "Madge67@example.org",
"password": "8_8u8EmJYNBDIlY"

1. У папці middlewares => touch (upload.js) => inport multer => створюємо мидлвару (upload) в якій викликаємо multer як функцію і передаємо об'єкт налаштувань
   - треба створити налаштування storage => multer.diskStorage => destination(шлях до тимчасової папки зберігання файлу => temp (пусті папки не пушаться на гіт тому додати файл - .gitkeep));
   - const destination = path.resolve("tepmp"); // метод resolve перед початком ім'я папки/фалу дописує шлях до корня проєкту;
   - filename: (req, file, cb) => {
     cb(null, file.originalname);
     } // приймає кол бек, реквест і сам файл, коллбек передає далі, якщо помилка є то першим аргументом передаємо її, якщо немає, тоді null і потім ім'я під яким бажаємо зберігти файл, file.originalname - це буде та назва з якою файл було передано;
   - імена можуть бути однаковими тому робимо кожне оригінальним:
     const uniquePreffix = Date.now() + "-" + Math.round(Math.random() \* 1e9);
     const fileName = `${uniquePreffix}_${file.originalname}`;
   - limits;
2. В authRouter додаємо міддлвару upload при реєстрації користувача і вказуємо яке ім'я файлу очікуємо, за допомогою методу single: upload.single("avatar"), можливі варінти, 33:35;
