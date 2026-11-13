
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
const lessons = [
  [
    { en: "Travel", ru: "Путешествовать", example: "I love to travel." },
    { en: "Beautiful", ru: "Красивый", example: "This place is beautiful." },
    { en: "Journey", ru: "Путешествие", example: "Life is a journey." },
    { en: "Discover", ru: "Открывать", example: "I want to discover the world." },
    { en: "Dream", ru: "Мечта", example: "Follow your dreams." },
    { en: "Improve", ru: "Улучшать", example: "I want to improve my English." },
    { en: "Confident", ru: "Уверенный", example: "I feel confident." },
    { en: "Experience", ru: "Опыт", example: "It was a great experience." },
    { en: "Explore", ru: "Исследовать", example: "Let's explore the city." },
    { en: "Freedom", ru: "Свобода", example: "I love freedom." },
  ],
  [
    { en: "Airport", ru: "Аэропорт", example: "I am at the airport." },
    { en: "Ticket", ru: "Билет", example: "I have a ticket." },
    { en: "Luggage", ru: "Багаж", example: "My luggage is heavy." },
    { en: "Hotel", ru: "Отель", example: "The hotel is beautiful." },
    { en: "Passport", ru: "Паспорт", example: "Here is my passport." },
    { en: "Journey", ru: "Путешествие", example: "Have a safe journey." },
    { en: "Flight", ru: "Рейс", example: "My flight is tomorrow." },
    { en: "Arrive", ru: "Прибывать", example: "I arrive at noon." },
    { en: "Departure", ru: "Отправление", example: "The departure is at six." },
    { en: "Reservation", ru: "Бронирование", example: "I have a reservation." },
  ],
  [
    { en: "Morning", ru: "Утро", example: "Good morning!" },
    { en: "Evening", ru: "Вечер", example: "See you this evening." },
    { en: "Breakfast", ru: "Завтрак", example: "I have breakfast at eight." },
    { en: "Usually", ru: "Обычно", example: "I usually drink tea." },
    { en: "Sometimes", ru: "Иногда", example: "I sometimes read books." },
    { en: "Always", ru: "Всегда", example: "I always study English." },
    { en: "Never", ru: "Никогда", example: "I never give up." },
    { en: "Busy", ru: "Занятый", example: "I am busy today." },
    { en: "Free", ru: "Свободный", example: "Are you free tomorrow?" },
    { en: "Tomorrow", ru: "Завтра", example: "See you tomorrow." },
  ],
  [
    { en: "Friend", ru: "Друг", example: "She is my friend." },
    { en: "Family", ru: "Семья", example: "I love my family." },
    { en: "Parents", ru: "Родители", example: "My parents live here." },
    { en: "Together", ru: "Вместе", example: "We travel together." },
    { en: "Happy", ru: "Счастливый", example: "I am happy today." },
    { en: "Kind", ru: "Добрый", example: "He is very kind." },
    { en: "Funny", ru: "Смешной", example: "This film is funny." },
    { en: "Friendly", ru: "Дружелюбный", example: "People are friendly." },
    { en: "Meet", ru: "Встречать", example: "Nice to meet you." },
    { en: "Invite", ru: "Приглашать", example: "I want to invite you." },
  ],
  [
    { en: "Beautiful", ru: "Красивый", example: "The city is beautiful." },
    { en: "Weather", ru: "Погода", example: "The weather is nice." },
    { en: "Sunny", ru: "Солнечный", example: "It is sunny today." },
    { en: "Rainy", ru: "Дождливый", example: "It is rainy outside." },
    { en: "Mountain", ru: "Гора", example: "I see a mountain." },
    { en: "Beach", ru: "Пляж", example: "I love the beach." },
    { en: "Forest", ru: "Лес", example: "The forest is quiet." },
    { en: "River", ru: "Река", example: "The river is beautiful." },
    { en: "Nature", ru: "Природа", example: "I love nature." },
    { en: "Wonderful", ru: "Замечательный", example: "It was wonderful." },
  ],
  [
    { en: "Learn", ru: "Учить", example: "I learn English." },
    { en: "Practice", ru: "Практиковаться", example: "I practice every day." },
    { en: "Remember", ru: "Помнить", example: "I remember this word." },
    { en: "Forget", ru: "Забывать", example: "Do not forget your keys." },
    { en: "Understand", ru: "Понимать", example: "I understand you." },
    { en: "Repeat", ru: "Повторять", example: "Please repeat the sentence." },
    { en: "Question", ru: "Вопрос", example: "I have a question." },
    { en: "Answer", ru: "Ответ", example: "I know the answer." },
    { en: "Correct", ru: "Правильный", example: "Your answer is correct." },
    { en: "Mistake", ru: "Ошибка", example: "Everyone makes mistakes." },
  ],
  [
    { en: "Adventure", ru: "Приключение", example: "Life is an adventure." },
    { en: "Culture", ru: "Культура", example: "I love Japanese culture." },
    { en: "Museum", ru: "Музей", example: "We visited a museum." },
    { en: "History", ru: "История", example: "I like history." },
    { en: "Famous", ru: "Известный", example: "This place is famous." },
    { en: "Popular", ru: "Популярный", example: "It is a popular place." },
    { en: "Interesting", ru: "Интересный", example: "The book is interesting." },
    { en: "Different", ru: "Разный", example: "We are different." },
    { en: "Special", ru: "Особенный", example: "Today is special." },
    { en: "Amazing", ru: "Удивительный", example: "The view is amazing." },
  ],
];

const pronunciations: Record<string, string> = {
  Travel: "трэ́вэл",
  Beautiful: "бью́тифул",
  Journey: "джё́рни",
  Discover: "диска́вэр",
  Dream: "дри́м",
  Improve: "импру́в",
  Confident: "ко́нфидэнт",
  Experience: "икспи́риэнс",
  Explore: "икспло́р",
  Freedom: "фри́дэм",
    Airport: "э́рпорт",
  Ticket: "ти́кит",
  Luggage: "ла́гидж",
  Hotel: "хоутэ́л",
  Passport: "па́спорт",
  Flight: "фла́йт",
  Arrive: "эра́йв",
  Departure: "дипа́рчер",
  Reservation: "резэрвэ́йшн",

  Morning: "мо́рнинг",
  Evening: "и́внинг",
  Breakfast: "бре́кфэст",
  Usually: "ю́жуэли",
  Sometimes: "са́мтаймз",
  Always: "о́лвэйз",
  Never: "нэ́вэр",
  Busy: "би́зи",
  Free: "фри́",
  Tomorrow: "тумóроу",

  Friend: "фрэнд",
  Family: "фэ́мили",
  Parents: "пэ́рэнтс",
  Together: "тугэ́зэр",
  Happy: "хэ́пи",
  Kind: "ка́йнд",
  Funny: "фа́ни",
  Friendly: "фрэ́ндли",
  Meet: "ми́т",
  Invite: "инва́йт",

  Weather: "уэ́зэр",
  Sunny: "са́ни",
  Rainy: "рэ́йни",
  Mountain: "ма́унтин",
  Beach: "би́ч",
  Forest: "фо́рист",
  River: "ри́вэр",
  Nature: "нэ́йчер",
  Wonderful: "уа́ндэрфул",

  Learn: "лёрн",
  Practice: "прэ́ктис",
  Remember: "римэ́мбэр",
  Forget: "фэргэ́т",
  Understand: "андэрстэ́нд",
  Repeat: "рипи́т",
  Question: "квэ́счэн",
  Answer: "а́нсэр",
  Correct: "кэрэ́кт",
  Mistake: "мистэ́йк",

  Adventure: "эдвэ́нчер",
  Culture: "ка́лчер",
  Museum: "мьюзи́эм",
  History: "хи́стэри",
  Famous: "фэ́ймэс",
  Popular: "по́пьюлэр",
  Interesting: "и́нтрэстинг",
  Different: "ди́фрэнт",
  Special: "спэ́шэл",
  Amazing: "эмэ́йзинг",
};
const englishLessons = [
  {
    id: 1,
    level: "A2",
    title: "Знакомство и семья",
    description: "Учимся рассказывать о себе и семье",

    vocabulary: [
      { english: "Family", russian: "Семья" },
      { english: "Parents", russian: "Родители" },
      { english: "Sister", russian: "Сестра" },
      { english: "Brother", russian: "Брат" },
      { english: "Husband", russian: "Муж" },
      { english: "Wife", russian: "Жена" },
    ],

    examples: [
      {
        english: "My name is Anna.",
        russian: "Меня зовут Анна.",
      },
      {
        english: "I live in Kazakhstan.",
        russian: "Я живу в Казахстане.",
      },
      {
        english: "I have one sister.",
        russian: "У меня есть одна сестра.",
      },
      {
        english: "My family is very friendly.",
        russian: "Моя семья очень дружная.",
      },
    ],

    questions: [
      {
        question: "Как переводится Family?",
        options: ["Работа", "Семья", "Друг"],
        correctAnswer: "Семья",
      },
      {
        question: "Как сказать «У меня есть сестра»?",
        options: [
          "I have a sister.",
          "I am a sister.",
          "I like sister.",
        ],
        correctAnswer: "I have a sister.",
      },
    ],
  },

{
  id: 2,
  level: "A2",
  title: "Работа и повседневная жизнь",
  description: "Учимся рассказывать о работе и обычном дне",

  vocabulary: [
    { english: "Work", russian: "Работа" },
    { english: "Office", russian: "Офис" },
    { english: "Colleague", russian: "Коллега" },
    { english: "Customer", russian: "Клиент" },
    { english: "Schedule", russian: "Расписание" },
    { english: "Meeting", russian: "Встреча" },
    { english: "Breakfast", russian: "Завтрак" },
    { english: "Evening", russian: "Вечер" },
  ],

  examples: [
    {
      english: "I work as an accountant.",
      russian: "Я работаю бухгалтером.",
    },
    {
      english: "I go to work every morning.",
      russian: "Я хожу на работу каждое утро.",
    },
    {
      english: "I talk to customers every day.",
      russian: "Я разговариваю с клиентами каждый день.",
    },
    {
      english: "I watch movies in the evening.",
      russian: "Я смотрю фильмы вечером.",
    },
  ],

  questions: [
    {
      question: "Как переводится Colleague?",
      options: ["Клиент", "Коллега", "Руководитель"],
      correctAnswer: "Коллега",
    },
    {
      question: "Как сказать «Я работаю бухгалтером»?",
      options: [
        "I work as an accountant.",
        "I am work accountant.",
        "I working accountant.",
      ],
      correctAnswer: "I work as an accountant.",
    },
    {
      question: "Как переводится Schedule?",
      options: ["Расписание", "Встреча", "Офис"],
      correctAnswer: "Расписание",
    },
    {
      question: "Как сказать «Я хожу на работу каждое утро»?",
      options: [
        "I go to work every morning.",
        "I goes to work every morning.",
        "I going to work every morning.",
      ],
      correctAnswer: "I go to work every morning.",
    },
  ],
},

{
  id: 3,
  level: "A2",
  title: "Покупки и рестораны",
  description: "Учимся покупать товары и заказывать еду на английском",

  vocabulary: [
    { english: "Shop", russian: "Магазин" },
    { english: "Price", russian: "Цена" },
    { english: "Cheap", russian: "Дешёвый" },
    { english: "Expensive", russian: "Дорогой" },
    { english: "Cash", russian: "Наличные" },
    { english: "Receipt", russian: "Чек" },
    { english: "Menu", russian: "Меню" },
    { english: "Order", russian: "Заказывать" },
    { english: "Bill", russian: "Счёт" },
    { english: "Delicious", russian: "Вкусный" },
  ],

  examples: [
    {
      english: "How much does it cost?",
      russian: "Сколько это стоит?",
    },
    {
      english: "Can I pay by card?",
      russian: "Можно оплатить картой?",
    },
    {
      english: "Can I see the menu, please?",
      russian: "Можно посмотреть меню, пожалуйста?",
    },
    {
      english: "I would like to order chicken and rice.",
      russian: "Я хотела бы заказать курицу с рисом.",
    },
    {
      english: "Could I have the bill, please?",
      russian: "Можно мне счёт, пожалуйста?",
    },
  ],

  questions: [
    {
      question: "Как переводится Receipt?",
      options: ["Цена", "Чек", "Скидка"],
      correctAnswer: "Чек",
    },
    {
      question: "Как спросить «Сколько это стоит?»",
      options: [
        "How much does it cost?",
        "How many is it?",
        "Where does it cost?",
      ],
      correctAnswer: "How much does it cost?",
    },
    {
      question: "Как переводится Expensive?",
      options: ["Дешёвый", "Вкусный", "Дорогой"],
      correctAnswer: "Дорогой",
    },
    {
      question: "Как попросить меню?",
      options: [
        "I have the menu.",
        "Can I see the menu, please?",
        "Where is my food?",
      ],
      correctAnswer: "Can I see the menu, please?",
    },
    {
      question: "Как попросить счёт в ресторане?",
      options: [
        "Could I have the bill, please?",
        "I want a menu.",
        "Can I buy this shop?",
      ],
      correctAnswer: "Could I have the bill, please?",
    },
  ],
},

{
  id: 4,
  level: "A2",
  title: "Present Simple и Present Continuous",
  description:
    "Учимся говорить о привычках и действиях, которые происходят сейчас",

  vocabulary: [
    { english: "Usually", russian: "Обычно" },
    { english: "Always", russian: "Всегда" },
    { english: "Sometimes", russian: "Иногда" },
    { english: "Every day", russian: "Каждый день" },
    { english: "Now", russian: "Сейчас" },
    { english: "Right now", russian: "Прямо сейчас" },
    { english: "At the moment", russian: "В данный момент" },
    { english: "Work", russian: "Работать" },
    { english: "Study", russian: "Учиться" },
    { english: "Watch", russian: "Смотреть" },
  ],

  examples: [
    {
      english: "I work every day.",
      russian: "Я работаю каждый день. (Present Simple)",
    },
    {
      english: "She works in an office.",
      russian: "Она работает в офисе. (Present Simple)",
    },
    {
      english: "I am working now.",
      russian: "Я сейчас работаю. (Present Continuous)",
    },
    {
      english: "She is studying at the moment.",
      russian: "Она сейчас учится. (Present Continuous)",
    },
    {
      english: "I usually watch movies in the evening.",
      russian: "Я обычно смотрю фильмы вечером. (Present Simple)",
    },
    {
      english: "I am watching a movie right now.",
      russian: "Я смотрю фильм прямо сейчас. (Present Continuous)",
    },
  ],

  questions: [
    {
      question: "Выбери Present Simple:",
      options: [
        "I am working now.",
        "I work every day.",
        "I am watching TV.",
      ],
      correctAnswer: "I work every day.",
    },
    {
      question: "Выбери Present Continuous:",
      options: [
        "She works every day.",
        "She is working now.",
        "She usually works.",
      ],
      correctAnswer: "She is working now.",
    },
    {
      question: "Как правильно: «Она работает в офисе»?",
      options: [
        "She work in an office.",
        "She working in an office.",
        "She works in an office.",
      ],
      correctAnswer: "She works in an office.",
    },
    {
      question: "Как сказать «Я сейчас учусь»?",
      options: [
        "I study every day.",
        "I am studying now.",
        "I studying now.",
      ],
      correctAnswer: "I am studying now.",
    },
    {
      question: "Какое слово часто используется с Present Simple?",
      options: ["Usually", "Right now", "At the moment"],
      correctAnswer: "Usually",
    },
    {
      question: "Выбери правильное предложение:",
      options: [
        "He is watch TV now.",
        "He watching TV now.",
        "He is watching TV now.",
      ],
      correctAnswer: "He is watching TV now.",
    },
  ],
},

{
  id: 5,
  level: "A2+",
  title: "Аэропорт и отель",
  description: "Регистрация на рейс, заселение в отель и общение с персоналом",
  vocabulary: [
    { english: "Check-in", russian: "Регистрация" },
    { english: "Boarding pass", russian: "Посадочный талон" },
    { english: "Gate", russian: "Выход на посадку" },
    { english: "Luggage", russian: "Багаж" },
    { english: "Departure", russian: "Отправление" },
    { english: "Arrival", russian: "Прибытие" },
    { english: "Reservation", russian: "Бронирование" },
    { english: "Reception", russian: "Стойка регистрации" },
    { english: "Available", russian: "Доступный" },
    { english: "Checkout", russian: "Выезд из отеля" },
  ],
  examples: [
    {
      english: "Where is the check-in counter?",
      russian: "Где стойка регистрации на рейс?",
    },
    {
      english: "Can I have my boarding pass?",
      russian: "Можно получить мой посадочный талон?",
    },
    {
      english: "I have a reservation under my name.",
      russian: "У меня есть бронирование на моё имя.",
    },
    {
      english: "What time is checkout?",
      russian: "Во сколько выезд из отеля?",
    },
  ],
  questions: [
    {
      question: "Как переводится Boarding pass?",
      options: ["Билет на поезд", "Посадочный талон", "Паспорт"],
      correctAnswer: "Посадочный талон",
    },
    {
      question: "Как спросить, где стойка регистрации?",
      options: [
        "Where is the check-in counter?",
        "Where is my room?",
        "When is breakfast?",
      ],
      correctAnswer: "Where is the check-in counter?",
    },
    {
      question: "Как переводится Luggage?",
      options: ["Багаж", "Регистрация", "Выход"],
      correctAnswer: "Багаж",
    },
    {
      question: "Как спросить время выезда из отеля?",
      options: [
        "What time is checkout?",
        "Where is the airport?",
        "Can I pay by card?",
      ],
      correctAnswer: "What time is checkout?",
    },
  ],
},
{
  id: 6,
  level: "A2+",
  title: "Транспорт и направления",
  description: "Учимся пользоваться транспортом и спрашивать дорогу",
  vocabulary: [
    { english: "Bus stop", russian: "Автобусная остановка" },
    { english: "Station", russian: "Станция" },
    { english: "Ticket", russian: "Билет" },
    { english: "Platform", russian: "Платформа" },
    { english: "Straight", russian: "Прямо" },
    { english: "Turn left", russian: "Поверните налево" },
    { english: "Turn right", russian: "Поверните направо" },
    { english: "Nearby", russian: "Поблизости" },
    { english: "Far", russian: "Далеко" },
    { english: "Transfer", russian: "Пересадка" },
  ],
  examples: [
    {
      english: "How can I get to the city center?",
      russian: "Как добраться до центра города?",
    },
    {
      english: "Go straight and turn left.",
      russian: "Идите прямо и поверните налево.",
    },
    {
      english: "Is the station nearby?",
      russian: "Станция находится поблизости?",
    },
    {
      english: "Do I need to change trains?",
      russian: "Мне нужно пересесть на другой поезд?",
    },
  ],
  questions: [
    {
      question: "Как переводится Bus stop?",
      options: ["Автобусная остановка", "Железная дорога", "Аэропорт"],
      correctAnswer: "Автобусная остановка",
    },
    {
      question: "Как сказать «Поверните направо»?",
      options: ["Turn left", "Go straight", "Turn right"],
      correctAnswer: "Turn right",
    },
    {
      question: "Как спросить дорогу до центра города?",
      options: [
        "How can I get to the city center?",
        "How much is the ticket?",
        "Where can I eat?",
      ],
      correctAnswer: "How can I get to the city center?",
    },
    {
      question: "Как переводится Nearby?",
      options: ["Далеко", "Поблизости", "Поздно"],
      correctAnswer: "Поблизости",
    },
  ],
},
{
  id: 7,
  level: "A2+",
  title: "Прошедшее время Past Simple",
  description: "Учимся рассказывать о событиях в прошлом",
  vocabulary: [
    { english: "Yesterday", russian: "Вчера" },
    { english: "Last week", russian: "На прошлой неделе" },
    { english: "Ago", russian: "Назад (о времени)" },
    { english: "Visited", russian: "Посетил" },
    { english: "Watched", russian: "Смотрел" },
    { english: "Went", russian: "Ходил, ездил" },
    { english: "Saw", russian: "Видел" },
    { english: "Bought", russian: "Купил" },
    { english: "Had", russian: "Имел, было" },
    { english: "Did", russian: "Сделал" },
  ],
  examples: [
    {
      english: "I visited Istanbul last year.",
      russian: "Я посетила Стамбул в прошлом году.",
    },
    {
      english: "I watched a movie yesterday.",
      russian: "Я смотрела фильм вчера.",
    },
    {
      english: "She went to work yesterday.",
      russian: "Она вчера ходила на работу.",
    },
    {
      english: "Did you enjoy your trip?",
      russian: "Тебе понравилась поездка?",
    },
  ],
  questions: [
    {
      question: "Какое прошедшее время у go?",
      options: ["Goed", "Went", "Going"],
      correctAnswer: "Went",
    },
    {
      question: "Выбери правильное предложение в Past Simple:",
      options: [
        "I watched a movie yesterday.",
        "I watch a movie yesterday.",
        "I watching a movie yesterday.",
      ],
      correctAnswer: "I watched a movie yesterday.",
    },
    {
      question: "Как переводится Yesterday?",
      options: ["Завтра", "Сегодня", "Вчера"],
      correctAnswer: "Вчера",
    },
    {
      question: "Как правильно задать вопрос в Past Simple?",
      options: [
        "Did you visit London?",
        "Do you visited London?",
        "Did you visited London?",
      ],
      correctAnswer: "Did you visit London?",
    },
  ],
},
{
  id: 8,
  level: "A2+",
  title: "Планы на будущее",
  description: "Учимся говорить о планах с going to и will",
  vocabulary: [
    { english: "Future", russian: "Будущее" },
    { english: "Plan", russian: "План" },
    { english: "Next year", russian: "В следующем году" },
    { english: "Soon", russian: "Скоро" },
    { english: "Later", russian: "Позже" },
    { english: "Tomorrow", russian: "Завтра" },
    { english: "Hope", russian: "Надеяться" },
    { english: "Decide", russian: "Решать" },
    { english: "Promise", russian: "Обещать" },
    { english: "Probably", russian: "Вероятно" },
  ],
  examples: [
    {
      english: "I am going to visit Japan next year.",
      russian: "Я собираюсь посетить Японию в следующем году.",
    },
    {
      english: "I will help you.",
      russian: "Я помогу тебе.",
    },
    {
      english: "She is going to study English tonight.",
      russian: "Она собирается изучать английский сегодня вечером.",
    },
    {
      english: "I think it will rain tomorrow.",
      russian: "Думаю, завтра будет дождь.",
    },
  ],
  questions: [
    {
      question: "Как сказать «Я собираюсь путешествовать»?",
      options: [
        "I am going to travel.",
        "I going travel.",
        "I am go to travel.",
      ],
      correctAnswer: "I am going to travel.",
    },
    {
      question: "Выбери правильное предложение с will:",
      options: [
        "She will helps me.",
        "She will help me.",
        "She will helping me.",
      ],
      correctAnswer: "She will help me.",
    },
    {
      question: "Как переводится Next year?",
      options: ["В прошлом году", "В следующем году", "Каждый год"],
      correctAnswer: "В следующем году",
    },
    {
      question: "Выбери правильный план на будущее:",
      options: [
        "We are going to buy tickets.",
        "We going to buy tickets.",
        "We are going buy tickets.",
      ],
      correctAnswer: "We are going to buy tickets.",
    },
  ],
},
{
  id: 9,
  level: "B1",
  title: "Обсуждение фильмов и книг",
  description: "Учимся обсуждать сюжеты, персонажей и впечатления",
  vocabulary: [
    { english: "Plot", russian: "Сюжет" },
    { english: "Character", russian: "Персонаж" },
    { english: "Thriller", russian: "Триллер" },
    { english: "Ending", russian: "Концовка" },
    { english: "Author", russian: "Автор" },
    { english: "Chapter", russian: "Глава" },
    { english: "Review", russian: "Отзыв" },
    { english: "Recommend", russian: "Рекомендовать" },
    { english: "Exciting", russian: "Захватывающий" },
    { english: "Boring", russian: "Скучный" },
  ],
  examples: [
    {
      english: "I prefer thrillers because they are exciting.",
      russian: "Я предпочитаю триллеры, потому что они захватывающие.",
    },
    {
      english: "The plot was interesting but the ending was predictable.",
      russian: "Сюжет был интересным, но концовка предсказуемой.",
    },
    {
      english: "I would recommend this book to my friends.",
      russian: "Я бы порекомендовала эту книгу друзьям.",
    },
    {
      english: "My favorite character was very brave.",
      russian: "Мой любимый персонаж был очень смелым.",
    },
  ],
  questions: [
    {
      question: "Как переводится Plot в контексте фильма?",
      options: ["Сюжет", "Актёр", "Зритель"],
      correctAnswer: "Сюжет",
    },
    {
      question: "Как сказать «Я рекомендую эту книгу»?",
      options: [
        "I recommend this book.",
        "I recommending this book.",
        "I recommends this book.",
      ],
      correctAnswer: "I recommend this book.",
    },
    {
      question: "Как переводится Ending?",
      options: ["Начало", "Концовка", "Персонаж"],
      correctAnswer: "Концовка",
    },
    {
      question: "Выбери грамматически правильное предложение:",
      options: [
        "The film was exciting.",
        "The film were exciting.",
        "The film be exciting.",
      ],
      correctAnswer: "The film was exciting.",
    },
  ],
},
{
  id: 10,
  level: "B1",
  title: "Выражение своего мнения",
  description: "Учимся объяснять свою точку зрения и соглашаться с другими",
  vocabulary: [
    { english: "Opinion", russian: "Мнение" },
    { english: "Agree", russian: "Соглашаться" },
    { english: "Disagree", russian: "Не соглашаться" },
    { english: "Believe", russian: "Считать, верить" },
    { english: "Reason", russian: "Причина" },
    { english: "However", russian: "Однако" },
    { english: "Although", russian: "Хотя" },
    { english: "Personally", russian: "Лично" },
    { english: "Advantage", russian: "Преимущество" },
    { english: "Disadvantage", russian: "Недостаток" },
  ],
  examples: [
    {
      english: "In my opinion, learning English is important.",
      russian: "По моему мнению, изучение английского важно.",
    },
    {
      english: "I agree with you because it makes sense.",
      russian: "Я согласна с тобой, потому что это разумно.",
    },
    {
      english: "However, there is another problem.",
      russian: "Однако существует другая проблема.",
    },
    {
      english: "Although it was difficult, I enjoyed it.",
      russian: "Хотя это было трудно, мне понравилось.",
    },
  ],
  questions: [
    {
      question: "Как переводится In my opinion?",
      options: ["По моему мнению", "К сожалению", "Например"],
      correctAnswer: "По моему мнению",
    },
    {
      question: "Как сказать «Я согласна с тобой»?",
      options: [
        "I agree with you.",
        "I am agree with you.",
        "I agree to you.",
      ],
      correctAnswer: "I agree with you.",
    },
    {
      question: "Как переводится However?",
      options: ["Поэтому", "Однако", "Кроме того"],
      correctAnswer: "Однако",
    },
    {
      question: "Выбери правильное предложение:",
      options: [
        "I think this is a good idea.",
        "I thinks this is a good idea.",
        "I thinking this is a good idea.",
      ],
      correctAnswer: "I think this is a good idea.",
    },
  ],
},
{
  id: 11,
  level: "B1",
  title: "Present Perfect",
  description: "Учимся говорить о жизненном опыте и результатах действий",
  vocabulary: [
    { english: "Already", russian: "Уже" },
    { english: "Yet", russian: "Уже, ещё" },
    { english: "Never", russian: "Никогда" },
    { english: "Ever", russian: "Когда-либо" },
    { english: "Recently", russian: "Недавно" },
    { english: "Just", russian: "Только что" },
    { english: "Since", russian: "С определённого момента" },
    { english: "For", russian: "В течение" },
    { english: "Experience", russian: "Опыт" },
    { english: "Finished", russian: "Закончил" },
  ],
  examples: [
    {
      english: "I have visited Turkey.",
      russian: "Я была в Турции. (Жизненный опыт)",
    },
    {
      english: "She has already finished her work.",
      russian: "Она уже закончила работу.",
    },
    {
      english: "Have you ever been to Japan?",
      russian: "Ты когда-нибудь была в Японии?",
    },
    {
      english: "I have lived here for five years.",
      russian: "Я живу здесь уже пять лет.",
    },
  ],
  questions: [
    {
      question: "Выбери правильный Present Perfect:",
      options: [
        "I have visited London.",
        "I has visited London.",
        "I have visit London.",
      ],
      correctAnswer: "I have visited London.",
    },
    {
      question: "Как сказать «Она уже закончила работу»?",
      options: [
        "She have already finished her work.",
        "She has already finished her work.",
        "She has already finish her work.",
      ],
      correctAnswer: "She has already finished her work.",
    },
    {
      question: "Как переводится Never?",
      options: ["Всегда", "Никогда", "Иногда"],
      correctAnswer: "Никогда",
    },
    {
      question: "Как спросить «Ты когда-нибудь была в Париже?»",
      options: [
        "Have you ever been to Paris?",
        "Has you ever been to Paris?",
        "Have you ever be to Paris?",
      ],
      correctAnswer: "Have you ever been to Paris?",
    },
  ],
},
{
  id: 12,
  level: "B1",
  title: "Разговорная практика",
  description: "Практикуем реальные разговоры и повседневные ситуации",
  vocabulary: [
    { english: "Actually", russian: "На самом деле" },
    { english: "By the way", russian: "Кстати" },
    { english: "Probably", russian: "Вероятно" },
    { english: "Definitely", russian: "Определённо" },
    { english: "Explain", russian: "Объяснять" },
    { english: "Suggest", russian: "Предлагать" },
    { english: "Prefer", russian: "Предпочитать" },
    { english: "Understand", russian: "Понимать" },
    { english: "Conversation", russian: "Разговор" },
    { english: "Opportunity", russian: "Возможность" },
  ],
  examples: [
    {
      english: "Could you explain that again, please?",
      russian: "Не могли бы вы объяснить это ещё раз?",
    },
    {
      english: "Actually, I prefer travelling alone.",
      russian: "На самом деле я предпочитаю путешествовать одна.",
    },
    {
      english: "By the way, have you visited this city before?",
      russian: "Кстати, ты раньше бывала в этом городе?",
    },
    {
      english: "I would like to improve my speaking skills.",
      russian: "Я хотела бы улучшить свои разговорные навыки.",
    },
    {
      english: "Could you speak a little more slowly?",
      russian: "Не могли бы вы говорить немного медленнее?",
    },
  ],
  questions: [
    {
      question: "Как переводится By the way?",
      options: ["Кстати", "Поэтому", "Возможно"],
      correctAnswer: "Кстати",
    },
    {
      question: "Как вежливо попросить говорить медленнее?",
      options: [
        "Could you speak a little more slowly?",
        "You speaking slowly?",
        "Do you slow speaking?",
      ],
      correctAnswer: "Could you speak a little more slowly?",
    },
    {
      question: "Как переводится Definitely?",
      options: ["Возможно", "Определённо", "Редко"],
      correctAnswer: "Определённо",
    },
    {
      question: "Как сказать «Я предпочитаю путешествовать одна»?",
      options: [
        "I prefer travelling alone.",
        "I prefer travel alone yesterday.",
        "I am prefer travelling alone.",
      ],
      correctAnswer: "I prefer travelling alone.",
    },
    {
      question: "Как вежливо попросить объяснить ещё раз?",
      options: [
        "Could you explain that again, please?",
        "You explain again yesterday?",
        "Do you explained it again?",
      ],
      correctAnswer: "Could you explain that again, please?",
    },
  ],
},
{"id": 13, "level": "A1", "title": "Приветствия и знакомство", "description": "Приветствие и простые ответы", "vocabulary": [{"english": "Hello", "russian": "Привет"}, {"english": "Name", "russian": "Имя"}, {"english": "Country", "russian": "Страна"}], "examples": [{"english": "Hello! My name is Anna.", "russian": "Привет! Меня зовут Анна."}, {"english": "I am from Kazakhstan.", "russian": "Я из Казахстана."}], "questions": [{"question": "Как сказать «Привет»?", "options": ["Hello", "Goodbye", "Sorry"], "correctAnswer": "Hello"}]},
{"id": 14, "level": "A1", "title": "Числа, время и покупки", "description": "Числа и простые вопросы", "vocabulary": [{"english": "One", "russian": "Один"}, {"english": "Two", "russian": "Два"}, {"english": "Price", "russian": "Цена"}], "examples": [{"english": "How much is this?", "russian": "Сколько это стоит?"}, {"english": "It is two dollars.", "russian": "Это стоит два доллара."}], "questions": [{"question": "Как сказать «Один»?", "options": ["Two", "One", "Ten"], "correctAnswer": "One"}]},
{"id": 15, "level": "B2", "title": "Условные предложения", "description": "Реальные и воображаемые ситуации", "vocabulary": [{"english": "Unless", "russian": "Если не"}, {"english": "Provided", "russian": "При условии"}, {"english": "Outcome", "russian": "Результат"}], "examples": [{"english": "If I had more time, I would read more.", "russian": "Если бы у меня было больше времени, я бы больше читала."}, {"english": "Unless it rains, we will go out.", "russian": "Если не будет дождя, мы выйдем."}], "questions": [{"question": "Выбери условное предложение", "options": ["If I had time, I would go.", "I having time.", "If I will have time, I would go."], "correctAnswer": "If I had time, I would go."}]},
{"id": 16, "level": "B2", "title": "Аргументация и дискуссия", "description": "Выражай сложные мысли", "vocabulary": [{"english": "Evidence", "russian": "Доказательство"}, {"english": "Claim", "russian": "Утверждение"}, {"english": "Nevertheless", "russian": "Тем не менее"}], "examples": [{"english": "There is strong evidence for this claim.", "russian": "Для этого утверждения есть веские доказательства."}, {"english": "Nevertheless, I disagree.", "russian": "Тем не менее я не согласна."}], "questions": [{"question": "Как переводится Evidence?", "options": ["Доказательство", "Погода", "Встреча"], "correctAnswer": "Доказательство"}]},
{"id": 17, "level": "C1", "title": "Нюансы и оттенки смысла", "description": "Точная речь и сложные конструкции", "vocabulary": [{"english": "Subtle", "russian": "Тонкий, едва заметный"}, {"english": "Imply", "russian": "Подразумевать"}, {"english": "Ambiguous", "russian": "Неоднозначный"}], "examples": [{"english": "Her answer was deliberately ambiguous.", "russian": "Её ответ был намеренно неоднозначным."}, {"english": "What exactly are you implying?", "russian": "Что именно ты подразумеваешь?"}], "questions": [{"question": "Как переводится Ambiguous?", "options": ["Очевидный", "Неоднозначный", "Срочный"], "correctAnswer": "Неоднозначный"}]},
{"id": 18, "level": "C1", "title": "Профессиональные презентации", "description": "Убедительно представляй идеи", "vocabulary": [{"english": "Stakeholder", "russian": "Заинтересованная сторона"}, {"english": "Feasible", "russian": "Осуществимый"}, {"english": "Mitigate", "russian": "Снижать риск"}], "examples": [{"english": "This approach is feasible within our budget.", "russian": "Этот подход осуществим в рамках бюджета."}, {"english": "We need to mitigate potential risks.", "russian": "Нам нужно снизить потенциальные риски."}], "questions": [{"question": "Как переводится Feasible?", "options": ["Осуществимый", "Случайный", "Ненужный"], "correctAnswer": "Осуществимый"}]},
{"id": 19, "level": "C2", "title": "Риторика и критический анализ", "description": "Анализ сложных текстов", "vocabulary": [{"english": "Nuance", "russian": "Нюанс"}, {"english": "Fallacy", "russian": "Логическая ошибка"}, {"english": "Concession", "russian": "Уступка"}], "examples": [{"english": "The argument contains a subtle fallacy.", "russian": "В аргументе содержится тонкая логическая ошибка."}, {"english": "That concession does not weaken the conclusion.", "russian": "Эта уступка не ослабляет вывод."}], "questions": [{"question": "Как переводится Fallacy?", "options": ["Логическая ошибка", "Победа", "Вывод"], "correctAnswer": "Логическая ошибка"}]},
{"id": 20, "level": "C2", "title": "Идиомы и продвинутая речь", "description": "Естественная речь высокого уровня", "vocabulary": [{"english": "Scrutinize", "russian": "Тщательно изучать"}, {"english": "Meticulous", "russian": "Скрупулёзный"}, {"english": "Undermine", "russian": "Подрывать"}], "examples": [{"english": "We should scrutinize the evidence.", "russian": "Нам следует тщательно изучить доказательства."}, {"english": "She gave a meticulous explanation.", "russian": "Она дала скрупулёзное объяснение."}], "questions": [{"question": "Как переводится Scrutinize?", "options": ["Тщательно изучать", "Забывать", "Отправлять"], "correctAnswer": "Тщательно изучать"}]},
{"id": 21, "level": "A1", "title": "Местоимения и to be", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Student", "russian": "студент"}, {"english": "I", "russian": "Слово из примера"}], "examples": [{"english": "I am a student.", "russian": "Я студент."}, {"english": "You are my friend.", "russian": "Ты мой друг."}], "questions": [{"question": "Выбери правильную фразу по теме «Местоимения и to be»", "options": ["I am a student.", "You are my friend.", "I working every day."], "correctAnswer": "I am a student."}, {"question": "Как переводится «Student»?", "options": ["студент", "Завтра", "Потому что"], "correctAnswer": "студент"}]},
{"id": 22, "level": "A1", "title": "Дом и предметы", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Window", "russian": "окно"}, {"english": "This", "russian": "Слово из примера"}], "examples": [{"english": "This is my room.", "russian": "Это моя комната."}, {"english": "The window is open.", "russian": "Окно открыто."}], "questions": [{"question": "Выбери правильную фразу по теме «Дом и предметы»", "options": ["This is my room.", "The window is open.", "I working every day."], "correctAnswer": "This is my room."}, {"question": "Как переводится «Window»?", "options": ["окно", "Завтра", "Потому что"], "correctAnswer": "окно"}]},
{"id": 23, "level": "A1", "title": "Еда и напитки", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Water", "russian": "вода"}, {"english": "I", "russian": "Слово из примера"}], "examples": [{"english": "I would like some water.", "russian": "Я хотела бы воды."}, {"english": "The soup is hot.", "russian": "Суп горячий."}], "questions": [{"question": "Выбери правильную фразу по теме «Еда и напитки»", "options": ["I would like some water.", "The soup is hot.", "I working every day."], "correctAnswer": "I would like some water."}, {"question": "Как переводится «Water»?", "options": ["вода", "Завтра", "Потому что"], "correctAnswer": "вода"}]},
{"id": 24, "level": "A1", "title": "Цвета и одежда", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Jacket", "russian": "куртка"}, {"english": "My", "russian": "Слово из примера"}], "examples": [{"english": "My jacket is blue.", "russian": "Моя куртка синяя."}, {"english": "These shoes are new.", "russian": "Эта обувь новая."}], "questions": [{"question": "Выбери правильную фразу по теме «Цвета и одежда»", "options": ["My jacket is blue.", "These shoes are new.", "I working every day."], "correctAnswer": "My jacket is blue."}, {"question": "Как переводится «Jacket»?", "options": ["куртка", "Завтра", "Потому что"], "correctAnswer": "куртка"}]},
{"id": 25, "level": "A1", "title": "Вопросительные слова", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Where", "russian": "где"}, {"english": "Where", "russian": "Слово из примера"}], "examples": [{"english": "Where do you live?", "russian": "Где ты живёшь?"}, {"english": "What is your name?", "russian": "Как тебя зовут?"}], "questions": [{"question": "Выбери правильную фразу по теме «Вопросительные слова»", "options": ["Where do you live?", "What is your name?", "I working every day."], "correctAnswer": "Where do you live?"}, {"question": "Как переводится «Where»?", "options": ["где", "Завтра", "Потому что"], "correctAnswer": "где"}]},
{"id": 26, "level": "A1", "title": "Can и способности", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Swim", "russian": "плавать"}, {"english": "I", "russian": "Слово из примера"}], "examples": [{"english": "I can swim.", "russian": "Я умею плавать."}, {"english": "Can you help me?", "russian": "Ты можешь мне помочь?"}], "questions": [{"question": "Выбери правильную фразу по теме «Can и способности»", "options": ["I can swim.", "Can you help me?", "I working every day."], "correctAnswer": "I can swim."}, {"question": "Как переводится «Swim»?", "options": ["плавать", "Завтра", "Потому что"], "correctAnswer": "плавать"}]},
{"id": 27, "level": "A2", "title": "There is / There are", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Nearby", "russian": "поблизости"}, {"english": "There", "russian": "Слово из примера"}], "examples": [{"english": "There is a cafe nearby.", "russian": "Поблизости есть кафе."}, {"english": "There are two chairs.", "russian": "Есть два стула."}], "questions": [{"question": "Выбери правильную фразу по теме «There is / There are»", "options": ["There is a cafe nearby.", "There are two chairs.", "I working every day."], "correctAnswer": "There is a cafe nearby."}, {"question": "Как переводится «Nearby»?", "options": ["поблизости", "Завтра", "Потому что"], "correctAnswer": "поблизости"}]},
{"id": 28, "level": "A2", "title": "Сравнительная степень", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Faster", "russian": "быстрее"}, {"english": "This", "russian": "Слово из примера"}], "examples": [{"english": "This train is faster.", "russian": "Этот поезд быстрее."}, {"english": "My bag is heavier.", "russian": "Моя сумка тяжелее."}], "questions": [{"question": "Выбери правильную фразу по теме «Сравнительная степень»", "options": ["This train is faster.", "My bag is heavier.", "I working every day."], "correctAnswer": "This train is faster."}, {"question": "Как переводится «Faster»?", "options": ["быстрее", "Завтра", "Потому что"], "correctAnswer": "быстрее"}]},
{"id": 29, "level": "A2", "title": "Much, many, some, any", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Questions", "russian": "вопросы"}, {"english": "Do", "russian": "Слово из примера"}], "examples": [{"english": "Do you have any questions?", "russian": "У тебя есть вопросы?"}, {"english": "We need some milk.", "russian": "Нам нужно немного молока."}], "questions": [{"question": "Выбери правильную фразу по теме «Much, many, some, any»", "options": ["Do you have any questions?", "We need some milk.", "I working every day."], "correctAnswer": "Do you have any questions?"}, {"question": "Как переводится «Questions»?", "options": ["вопросы", "Завтра", "Потому что"], "correctAnswer": "вопросы"}]},
{"id": 30, "level": "A2", "title": "Модальные глаголы", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Should", "russian": "следует"}, {"english": "You", "russian": "Слово из примера"}], "examples": [{"english": "You should rest.", "russian": "Тебе стоит отдохнуть."}, {"english": "You must wear a seat belt.", "russian": "Ты должен пристегнуться."}], "questions": [{"question": "Выбери правильную фразу по теме «Модальные глаголы»", "options": ["You should rest.", "You must wear a seat belt.", "I working every day."], "correctAnswer": "You should rest."}, {"question": "Как переводится «Should»?", "options": ["следует", "Завтра", "Потому что"], "correctAnswer": "следует"}]},
{"id": 31, "level": "A2", "title": "Past Simple: вопросы", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Enjoy", "russian": "наслаждаться"}, {"english": "Did", "russian": "Слово из примера"}], "examples": [{"english": "Did you enjoy the film?", "russian": "Тебе понравился фильм?"}, {"english": "I did not see him.", "russian": "Я его не видела."}], "questions": [{"question": "Выбери правильную фразу по теме «Past Simple: вопросы»", "options": ["Did you enjoy the film?", "I did not see him.", "I working every day."], "correctAnswer": "Did you enjoy the film?"}, {"question": "Как переводится «Enjoy»?", "options": ["наслаждаться", "Завтра", "Потому что"], "correctAnswer": "наслаждаться"}]},
{"id": 32, "level": "A2", "title": "Будущее: планы", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Leave", "russian": "уходить"}, {"english": "We", "russian": "Слово из примера"}], "examples": [{"english": "We are going to leave early.", "russian": "Мы собираемся уйти рано."}, {"english": "I will call you tomorrow.", "russian": "Я позвоню тебе завтра."}], "questions": [{"question": "Выбери правильную фразу по теме «Будущее: планы»", "options": ["We are going to leave early.", "I will call you tomorrow.", "I working every day."], "correctAnswer": "We are going to leave early."}, {"question": "Как переводится «Leave»?", "options": ["уходить", "Завтра", "Потому что"], "correctAnswer": "уходить"}]},
{"id": 33, "level": "B1", "title": "First conditional", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Improve", "russian": "улучшаться"}, {"english": "If", "russian": "Слово из примера"}], "examples": [{"english": "If it rains, I will stay home.", "russian": "Если пойдёт дождь, я останусь дома."}, {"english": "If you study, you will improve.", "russian": "Если будешь учиться, станешь лучше."}], "questions": [{"question": "Выбери правильную фразу по теме «First conditional»", "options": ["If it rains, I will stay home.", "If you study, you will improve.", "I working every day."], "correctAnswer": "If it rains, I will stay home."}, {"question": "Как переводится «Improve»?", "options": ["улучшаться", "Завтра", "Потому что"], "correctAnswer": "улучшаться"}]},
{"id": 34, "level": "B1", "title": "Second conditional", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Could", "russian": "могла бы"}, {"english": "If", "russian": "Слово из примера"}], "examples": [{"english": "If I had time, I would travel.", "russian": "Если бы у меня было время, я бы путешествовала."}, {"english": "I would help if I could.", "russian": "Я бы помогла, если бы могла."}], "questions": [{"question": "Выбери правильную фразу по теме «Second conditional»", "options": ["If I had time, I would travel.", "I would help if I could.", "I working every day."], "correctAnswer": "If I had time, I would travel."}, {"question": "Как переводится «Could»?", "options": ["могла бы", "Завтра", "Потому что"], "correctAnswer": "могла бы"}]},
{"id": 35, "level": "B1", "title": "Passive voice", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Booked", "russian": "забронированный"}, {"english": "The", "russian": "Слово из примера"}], "examples": [{"english": "The tickets were booked yesterday.", "russian": "Билеты забронировали вчера."}, {"english": "English is spoken here.", "russian": "Здесь говорят по-английски."}], "questions": [{"question": "Выбери правильную фразу по теме «Passive voice»", "options": ["The tickets were booked yesterday.", "English is spoken here.", "I working every day."], "correctAnswer": "The tickets were booked yesterday."}, {"question": "Как переводится «Booked»?", "options": ["забронированный", "Завтра", "Потому что"], "correctAnswer": "забронированный"}]},
{"id": 36, "level": "B1", "title": "Reported speech", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Told", "russian": "сказал"}, {"english": "She", "russian": "Слово из примера"}], "examples": [{"english": "She said she was tired.", "russian": "Она сказала, что устала."}, {"english": "He told me he was busy.", "russian": "Он сказал мне, что занят."}], "questions": [{"question": "Выбери правильную фразу по теме «Reported speech»", "options": ["She said she was tired.", "He told me he was busy.", "I working every day."], "correctAnswer": "She said she was tired."}, {"question": "Как переводится «Told»?", "options": ["сказал", "Завтра", "Потому что"], "correctAnswer": "сказал"}]},
{"id": 37, "level": "B1", "title": "Relative clauses", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Relative", "russian": "относительный"}, {"english": "This", "russian": "Слово из примера"}], "examples": [{"english": "This is the book that I bought.", "russian": "Это книга, которую я купила."}, {"english": "The woman who called is here.", "russian": "Женщина, которая звонила, здесь."}], "questions": [{"question": "Выбери правильную фразу по теме «Relative clauses»", "options": ["This is the book that I bought.", "The woman who called is here.", "I working every day."], "correctAnswer": "This is the book that I bought."}, {"question": "Как переводится «Relative»?", "options": ["относительный", "Завтра", "Потому что"], "correctAnswer": "относительный"}]},
{"id": 38, "level": "B1", "title": "Phrasal verbs", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Look up", "russian": "искать информацию"}, {"english": "Please", "russian": "Слово из примера"}], "examples": [{"english": "Please turn off the light.", "russian": "Пожалуйста, выключи свет."}, {"english": "I need to look up this word.", "russian": "Мне нужно найти это слово."}], "questions": [{"question": "Выбери правильную фразу по теме «Phrasal verbs»", "options": ["Please turn off the light.", "I need to look up this word.", "I working every day."], "correctAnswer": "Please turn off the light."}, {"question": "Как переводится «Look up»?", "options": ["искать информацию", "Завтра", "Потому что"], "correctAnswer": "искать информацию"}]},
{"id": 39, "level": "B2", "title": "Third conditional", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Regret", "russian": "сожаление"}, {"english": "If", "russian": "Слово из примера"}], "examples": [{"english": "If I had known, I would have helped.", "russian": "Если бы я знала, я бы помогла."}, {"english": "She would have come if she had been free.", "russian": "Она бы пришла, если бы была свободна."}], "questions": [{"question": "Выбери правильную фразу по теме «Third conditional»", "options": ["If I had known, I would have helped.", "She would have come if she had been free.", "I working every day."], "correctAnswer": "If I had known, I would have helped."}, {"question": "Как переводится «Regret»?", "options": ["сожаление", "Завтра", "Потому что"], "correctAnswer": "сожаление"}]},
{"id": 40, "level": "B2", "title": "Mixed conditionals", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Confident", "russian": "уверенный"}, {"english": "If", "russian": "Слово из примера"}], "examples": [{"english": "If I had studied, I would be confident now.", "russian": "Если бы я училась, сейчас была бы уверенной."}, {"english": "If he were careful, he would not have lost it.", "russian": "Если бы он был внимательным, он бы это не потерял."}], "questions": [{"question": "Выбери правильную фразу по теме «Mixed conditionals»", "options": ["If I had studied, I would be confident now.", "If he were careful, he would not have lost it.", "I working every day."], "correctAnswer": "If I had studied, I would be confident now."}, {"question": "Как переводится «Confident»?", "options": ["уверенный", "Завтра", "Потому что"], "correctAnswer": "уверенный"}]},
{"id": 41, "level": "B2", "title": "Wish и If only", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Fluently", "russian": "бегло"}, {"english": "I", "russian": "Слово из примера"}], "examples": [{"english": "I wish I spoke English fluently.", "russian": "Хотелось бы мне свободно говорить по-английски."}, {"english": "If only I had more time.", "russian": "Если бы только у меня было больше времени."}], "questions": [{"question": "Выбери правильную фразу по теме «Wish и If only»", "options": ["I wish I spoke English fluently.", "If only I had more time.", "I working every day."], "correctAnswer": "I wish I spoke English fluently."}, {"question": "Как переводится «Fluently»?", "options": ["бегло", "Завтра", "Потому что"], "correctAnswer": "бегло"}]},
{"id": 42, "level": "B2", "title": "Inversion", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Rarely", "russian": "редко"}, {"english": "Not", "russian": "Слово из примера"}], "examples": [{"english": "Not only did she agree, but she also helped.", "russian": "Она не только согласилась, но и помогла."}, {"english": "Rarely have I seen such a view.", "russian": "Редко я видела такой вид."}], "questions": [{"question": "Выбери правильную фразу по теме «Inversion»", "options": ["Not only did she agree, but she also helped.", "Rarely have I seen such a view.", "I working every day."], "correctAnswer": "Not only did she agree, but she also helped."}, {"question": "Как переводится «Rarely»?", "options": ["редко", "Завтра", "Потому что"], "correctAnswer": "редко"}]},
{"id": 43, "level": "B2", "title": "Formal email", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Inquire", "russian": "запрашивать"}, {"english": "I", "russian": "Слово из примера"}], "examples": [{"english": "I am writing to inquire about the vacancy.", "russian": "Пишу, чтобы узнать о вакансии."}, {"english": "I look forward to your reply.", "russian": "С нетерпением жду вашего ответа."}], "questions": [{"question": "Выбери правильную фразу по теме «Formal email»", "options": ["I am writing to inquire about the vacancy.", "I look forward to your reply.", "I working every day."], "correctAnswer": "I am writing to inquire about the vacancy."}, {"question": "Как переводится «Inquire»?", "options": ["запрашивать", "Завтра", "Потому что"], "correctAnswer": "запрашивать"}]},
{"id": 44, "level": "B2", "title": "Debate and counterarguments", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Acknowledge", "russian": "признавать"}, {"english": "I", "russian": "Слово из примера"}], "examples": [{"english": "I acknowledge your point, however I disagree.", "russian": "Я признаю вашу точку зрения, однако не согласна."}, {"english": "The evidence suggests otherwise.", "russian": "Данные свидетельствуют об обратном."}], "questions": [{"question": "Выбери правильную фразу по теме «Debate and counterarguments»", "options": ["I acknowledge your point, however I disagree.", "The evidence suggests otherwise.", "I working every day."], "correctAnswer": "I acknowledge your point, however I disagree."}, {"question": "Как переводится «Acknowledge»?", "options": ["признавать", "Завтра", "Потому что"], "correctAnswer": "признавать"}]},
{"id": 45, "level": "C1", "title": "Hedging and nuance", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Inconclusive", "russian": "неокончательный"}, {"english": "It", "russian": "Слово из примера"}], "examples": [{"english": "It appears that the results are inconclusive.", "russian": "Похоже, результаты неубедительны."}, {"english": "This may indicate a broader issue.", "russian": "Это может указывать на более широкую проблему."}], "questions": [{"question": "Выбери правильную фразу по теме «Hedging and nuance»", "options": ["It appears that the results are inconclusive.", "This may indicate a broader issue.", "I working every day."], "correctAnswer": "It appears that the results are inconclusive."}, {"question": "Как переводится «Inconclusive»?", "options": ["неокончательный", "Завтра", "Потому что"], "correctAnswer": "неокончательный"}]},
{"id": 46, "level": "C1", "title": "Academic argument", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Findings", "russian": "результаты исследования"}, {"english": "The", "russian": "Слово из примера"}], "examples": [{"english": "The findings challenge the initial assumption.", "russian": "Выводы ставят под сомнение первоначальное предположение."}, {"english": "The study highlights a significant gap.", "russian": "Исследование выявляет существенный пробел."}], "questions": [{"question": "Выбери правильную фразу по теме «Academic argument»", "options": ["The findings challenge the initial assumption.", "The study highlights a significant gap.", "I working every day."], "correctAnswer": "The findings challenge the initial assumption."}, {"question": "Как переводится «Findings»?", "options": ["результаты исследования", "Завтра", "Потому что"], "correctAnswer": "результаты исследования"}]},
{"id": 47, "level": "C1", "title": "Cleft sentences", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Emphasis", "russian": "акцент"}, {"english": "What", "russian": "Слово из примера"}], "examples": [{"english": "What I need is a clear explanation.", "russian": "Мне нужно именно чёткое объяснение."}, {"english": "It was Anna who solved the problem.", "russian": "Именно Анна решила проблему."}], "questions": [{"question": "Выбери правильную фразу по теме «Cleft sentences»", "options": ["What I need is a clear explanation.", "It was Anna who solved the problem.", "I working every day."], "correctAnswer": "What I need is a clear explanation."}, {"question": "Как переводится «Emphasis»?", "options": ["акцент", "Завтра", "Потому что"], "correctAnswer": "акцент"}]},
{"id": 48, "level": "C1", "title": "Advanced collocations", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Consensus", "russian": "согласие"}, {"english": "We", "russian": "Слово из примера"}], "examples": [{"english": "We need to reach a consensus.", "russian": "Нам нужно достичь консенсуса."}, {"english": "The policy has far-reaching consequences.", "russian": "У политики далеко идущие последствия."}], "questions": [{"question": "Выбери правильную фразу по теме «Advanced collocations»", "options": ["We need to reach a consensus.", "The policy has far-reaching consequences.", "I working every day."], "correctAnswer": "We need to reach a consensus."}, {"question": "Как переводится «Consensus»?", "options": ["согласие", "Завтра", "Потому что"], "correctAnswer": "согласие"}]},
{"id": 49, "level": "C1", "title": "Literary analysis", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Imagery", "russian": "образность"}, {"english": "The", "russian": "Слово из примера"}], "examples": [{"english": "The narrator is deliberately unreliable.", "russian": "Рассказчик намеренно ненадёжен."}, {"english": "The imagery reinforces the central theme.", "russian": "Образность усиливает центральную тему."}], "questions": [{"question": "Выбери правильную фразу по теме «Literary analysis»", "options": ["The narrator is deliberately unreliable.", "The imagery reinforces the central theme.", "I working every day."], "correctAnswer": "The narrator is deliberately unreliable."}, {"question": "Как переводится «Imagery»?", "options": ["образность", "Завтра", "Потому что"], "correctAnswer": "образность"}]},
{"id": 50, "level": "C1", "title": "Negotiation and diplomacy", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Compromise", "russian": "компромисс"}, {"english": "I", "russian": "Слово из примера"}], "examples": [{"english": "I appreciate your concern, yet I propose an alternative.", "russian": "Я понимаю вашу обеспокоенность, но предлагаю альтернативу."}, {"english": "Could we explore a compromise?", "russian": "Можем ли мы рассмотреть компромисс?"}], "questions": [{"question": "Выбери правильную фразу по теме «Negotiation and diplomacy»", "options": ["I appreciate your concern, yet I propose an alternative.", "Could we explore a compromise?", "I working every day."], "correctAnswer": "I appreciate your concern, yet I propose an alternative."}, {"question": "Как переводится «Compromise»?", "options": ["компромисс", "Завтра", "Потому что"], "correctAnswer": "компромисс"}]},
{"id": 51, "level": "C2", "title": "Register and style", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Ostensibly", "russian": "на первый взгляд"}, {"english": "His", "russian": "Слово из примера"}], "examples": [{"english": "His remark was ostensibly polite but subtly dismissive.", "russian": "Его замечание было внешне вежливым, но скрыто пренебрежительным."}, {"english": "The wording conveys restrained disapproval.", "russian": "Формулировка передаёт сдержанное неодобрение."}], "questions": [{"question": "Выбери правильную фразу по теме «Register and style»", "options": ["His remark was ostensibly polite but subtly dismissive.", "The wording conveys restrained disapproval.", "I working every day."], "correctAnswer": "His remark was ostensibly polite but subtly dismissive."}, {"question": "Как переводится «Ostensibly»?", "options": ["на первый взгляд", "Завтра", "Потому что"], "correctAnswer": "на первый взгляд"}]},
{"id": 52, "level": "C2", "title": "Logical fallacies", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Dichotomy", "russian": "дихотомия"}, {"english": "The", "russian": "Слово из примера"}], "examples": [{"english": "The conclusion rests on a false dichotomy.", "russian": "Вывод основан на ложной дихотомии."}, {"english": "That claim confuses correlation with causation.", "russian": "Это утверждение путает корреляцию с причинностью."}], "questions": [{"question": "Выбери правильную фразу по теме «Logical fallacies»", "options": ["The conclusion rests on a false dichotomy.", "That claim confuses correlation with causation.", "I working every day."], "correctAnswer": "The conclusion rests on a false dichotomy."}, {"question": "Как переводится «Dichotomy»?", "options": ["дихотомия", "Завтра", "Потому что"], "correctAnswer": "дихотомия"}]},
{"id": 53, "level": "C2", "title": "Advanced rhetoric", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Concession", "russian": "уступка"}, {"english": "Her", "russian": "Слово из примера"}], "examples": [{"english": "Her concession strengthened the overall argument.", "russian": "Её уступка усилила аргументацию в целом."}, {"english": "The speaker used irony to expose the contradiction.", "russian": "Оратор использовал иронию, чтобы выявить противоречие."}], "questions": [{"question": "Выбери правильную фразу по теме «Advanced rhetoric»", "options": ["Her concession strengthened the overall argument.", "The speaker used irony to expose the contradiction.", "I working every day."], "correctAnswer": "Her concession strengthened the overall argument."}, {"question": "Как переводится «Concession»?", "options": ["уступка", "Завтра", "Потому что"], "correctAnswer": "уступка"}]},
{"id": 54, "level": "C2", "title": "Subtext and inference", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Tacit", "russian": "негласный"}, {"english": "The", "russian": "Слово из примера"}], "examples": [{"english": "The silence implies a tacit agreement.", "russian": "Молчание подразумевает негласное согласие."}, {"english": "His response betrays a deeper anxiety.", "russian": "Его ответ выдаёт более глубокую тревогу."}], "questions": [{"question": "Выбери правильную фразу по теме «Subtext and inference»", "options": ["The silence implies a tacit agreement.", "His response betrays a deeper anxiety.", "I working every day."], "correctAnswer": "The silence implies a tacit agreement."}, {"question": "Как переводится «Tacit»?", "options": ["негласный", "Завтра", "Потому что"], "correctAnswer": "негласный"}]},
{"id": 55, "level": "C2", "title": "Synthesis of sources", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Diverge", "russian": "расходиться"}, {"english": "The", "russian": "Слово из примера"}], "examples": [{"english": "The accounts diverge on a crucial point.", "russian": "Источники расходятся по ключевому вопросу."}, {"english": "Taken together, the sources suggest a nuanced picture.", "russian": "В совокупности источники рисуют неоднозначную картину."}], "questions": [{"question": "Выбери правильную фразу по теме «Synthesis of sources»", "options": ["The accounts diverge on a crucial point.", "Taken together, the sources suggest a nuanced picture.", "I working every day."], "correctAnswer": "The accounts diverge on a crucial point."}, {"question": "Как переводится «Diverge»?", "options": ["расходиться", "Завтра", "Потому что"], "correctAnswer": "расходиться"}]},
{"id": 56, "level": "C2", "title": "Precision and reformulation", "description": "Изучи правило по примерам, прослушай фразы и выполни мини-тест.", "vocabulary": [{"english": "Plausible", "russian": "правдоподобный"}, {"english": "That", "russian": "Слово из примера"}], "examples": [{"english": "That interpretation is plausible but not definitive.", "russian": "Такая интерпретация правдоподобна, но не окончательна."}, {"english": "A more precise formulation would avoid ambiguity.", "russian": "Более точная формулировка позволила бы избежать неоднозначности."}], "questions": [{"question": "Выбери правильную фразу по теме «Precision and reformulation»", "options": ["That interpretation is plausible but not definitive.", "A more precise formulation would avoid ambiguity.", "I working every day."], "correctAnswer": "That interpretation is plausible but not definitive."}, {"question": "Как переводится «Plausible»?", "options": ["правдоподобный", "Завтра", "Потому что"], "correctAnswer": "правдоподобный"}]}
];

const learningPlan = [
  {
    level: "A2",
    title: "Основы общения",
    description: "Научись рассказывать о себе и своей жизни",
    topics: [
      "Знакомство и семья",
      "Работа и повседневная жизнь",
      "Покупки и рестораны",
      "Present Simple и Present Continuous",
    ],
  },
  {
    level: "A2+",
    title: "Уверенное общение",
    description: "Научись общаться в путешествиях",
    topics: [
      "Аэропорт и отель",
      "Транспорт и направления",
      "Прошедшее время Past Simple",
      "Планы на будущее",
    ],
  },
  {
    level: "B1",
    title: "Свободнее говорю по-английски",
    description: "Учись выражать мнение и поддерживать разговор",
    topics: [
      "Обсуждение фильмов и книг",
      "Выражение своего мнения",
      "Present Perfect",
      "Разговорная практика",
    ],
  },
];

const grammarExercises = [
  {
    topic: "Present Simple",
    level: "A2",
    question: "She ___ English every day.",
    options: ["study", "studies", "studying"],
    correct: "studies",
    explanation: "С he, she, it добавляем -s или -es к глаголу.",
  },
  {
    topic: "Present Simple",
    level: "A2",
    question: "I ___ coffee in the morning.",
    options: ["drink", "drinks", "drinking"],
    correct: "drink",
    explanation: "С I, you, we, they используем основную форму глагола.",
  },
  {
    topic: "Present Continuous",
    level: "A2",
    question: "They ___ watching a movie now.",
    options: ["is", "are", "am"],
    correct: "are",
    explanation: "Present Continuous: am/is/are + глагол с -ing.",
  },
  {
    topic: "Past Simple",
    level: "A2+",
    question: "Yesterday I ___ to the cinema.",
    options: ["go", "went", "gone"],
    correct: "went",
    explanation: "Went — прошедшая форма неправильного глагола go.",
  },
  {
    topic: "Past Simple",
    level: "A2+",
    question: "She ___ her friend last week.",
    options: ["visited", "visits", "visit"],
    correct: "visited",
    explanation: "В Past Simple у правильных глаголов добавляется -ed.",
  },
  {
    topic: "Present Perfect",
    level: "B1",
    question: "I ___ never been to London.",
    options: ["has", "have", "had"],
    correct: "have",
    explanation: "Present Perfect: have/has + третья форма глагола.",
  },
  {
    topic: "Present Perfect",
    level: "B1",
    question: "She has already ___ her homework.",
    options: ["finish", "finished", "finishing"],
    correct: "finished",
    explanation: "После has используем третью форму глагола.",
  },
];

const verbDictionary = [
  { v1: "be", v2: "was/were", v3: "been", ru: "быть", type: "irregular" },
  { v1: "begin", v2: "began", v3: "begun", ru: "начинать", type: "irregular" },
  { v1: "break", v2: "broke", v3: "broken", ru: "ломать", type: "irregular" },
  { v1: "bring", v2: "brought", v3: "brought", ru: "приносить", type: "irregular" },
  { v1: "buy", v2: "bought", v3: "bought", ru: "покупать", type: "irregular" },
  { v1: "come", v2: "came", v3: "come", ru: "приходить", type: "irregular" },
  { v1: "do", v2: "did", v3: "done", ru: "делать", type: "irregular" },
  { v1: "drink", v2: "drank", v3: "drunk", ru: "пить", type: "irregular" },
  { v1: "drive", v2: "drove", v3: "driven", ru: "водить", type: "irregular" },
  { v1: "eat", v2: "ate", v3: "eaten", ru: "есть", type: "irregular" },
  { v1: "find", v2: "found", v3: "found", ru: "находить", type: "irregular" },
  { v1: "get", v2: "got", v3: "got", ru: "получать", type: "irregular" },
  { v1: "give", v2: "gave", v3: "given", ru: "давать", type: "irregular" },
  { v1: "go", v2: "went", v3: "gone", ru: "идти, ехать", type: "irregular" },
  { v1: "have", v2: "had", v3: "had", ru: "иметь", type: "irregular" },
  { v1: "know", v2: "knew", v3: "known", ru: "знать", type: "irregular" },
  { v1: "make", v2: "made", v3: "made", ru: "создавать", type: "irregular" },
  { v1: "read", v2: "read", v3: "read", ru: "читать", type: "irregular" },
  { v1: "see", v2: "saw", v3: "seen", ru: "видеть", type: "irregular" },
  { v1: "speak", v2: "spoke", v3: "spoken", ru: "говорить", type: "irregular" },
  { v1: "take", v2: "took", v3: "taken", ru: "брать", type: "irregular" },
  { v1: "write", v2: "wrote", v3: "written", ru: "писать", type: "irregular" },

  { v1: "ask", v2: "asked", v3: "asked", ru: "спрашивать", type: "regular" },
  { v1: "clean", v2: "cleaned", v3: "cleaned", ru: "убирать", type: "regular" },
  { v1: "cook", v2: "cooked", v3: "cooked", ru: "готовить", type: "regular" },
  { v1: "help", v2: "helped", v3: "helped", ru: "помогать", type: "regular" },
  { v1: "learn", v2: "learned", v3: "learned", ru: "учить", type: "regular" },
  { v1: "listen", v2: "listened", v3: "listened", ru: "слушать", type: "regular" },
  { v1: "open", v2: "opened", v3: "opened", ru: "открывать", type: "regular" },
  { v1: "play", v2: "played", v3: "played", ru: "играть", type: "regular" },
  { v1: "study", v2: "studied", v3: "studied", ru: "учиться", type: "regular" },
  { v1: "travel", v2: "traveled", v3: "traveled", ru: "путешествовать", type: "regular" },
  { v1: "visit", v2: "visited", v3: "visited", ru: "посещать", type: "regular" },
  { v1: "walk", v2: "walked", v3: "walked", ru: "гулять", type: "regular" },
  { v1: "watch", v2: "watched", v3: "watched", ru: "смотреть", type: "regular" },
  { v1: "work", v2: "worked", v3: "worked", ru: "работать", type: "regular" },
];

const englishTenses = [
  {
    name: "Present Simple",
    ru: "Настоящее простое",
    formula: "V1 / V1 + s",
    positive: "She works every day.",
    negative: "She does not work every day.",
    question: "Does she work every day?",
    explanation: "Привычки, факты и регулярные действия.",
  },
  {
    name: "Present Continuous",
    ru: "Настоящее длительное",
    formula: "am/is/are + V-ing",
    positive: "She is working now.",
    negative: "She is not working now.",
    question: "Is she working now?",
    explanation: "Действие происходит прямо сейчас.",
  },
  {
    name: "Present Perfect",
    ru: "Настоящее совершённое",
    formula: "have/has + V3",
    positive: "She has finished her work.",
    negative: "She has not finished her work.",
    question: "Has she finished her work?",
    explanation: "Прошлое действие, связанное с настоящим.",
  },
  {
    name: "Present Perfect Continuous",
    ru: "Настоящее совершённое длительное",
    formula: "have/has been + V-ing",
    positive: "She has been working for two hours.",
    negative: "She has not been working for two hours.",
    question: "Has she been working for two hours?",
    explanation: "Действие началось раньше и продолжается или недавно закончилось.",
  },
  {
    name: "Past Simple",
    ru: "Прошедшее простое",
    formula: "V2 / V-ed",
    positive: "She worked yesterday.",
    negative: "She did not work yesterday.",
    question: "Did she work yesterday?",
    explanation: "Завершённое действие в прошлом.",
  },
  {
    name: "Past Continuous",
    ru: "Прошедшее длительное",
    formula: "was/were + V-ing",
    positive: "She was working at 5 PM.",
    negative: "She was not working at 5 PM.",
    question: "Was she working at 5 PM?",
    explanation: "Действие происходило в определённый момент прошлого.",
  },
  {
    name: "Past Perfect",
    ru: "Прошедшее совершённое",
    formula: "had + V3",
    positive: "She had finished before I arrived.",
    negative: "She had not finished before I arrived.",
    question: "Had she finished before I arrived?",
    explanation: "Одно действие завершилось раньше другого в прошлом.",
  },
  {
    name: "Past Perfect Continuous",
    ru: "Прошедшее совершённое длительное",
    formula: "had been + V-ing",
    positive: "She had been working for two hours before lunch.",
    negative: "She had not been working for two hours before lunch.",
    question: "Had she been working for two hours before lunch?",
    explanation: "Длительность действия до момента в прошлом.",
  },
  {
    name: "Future Simple",
    ru: "Будущее простое",
    formula: "will + V1",
    positive: "She will work tomorrow.",
    negative: "She will not work tomorrow.",
    question: "Will she work tomorrow?",
    explanation: "Предсказания, обещания и спонтанные решения.",
  },
  {
    name: "Future Continuous",
    ru: "Будущее длительное",
    formula: "will be + V-ing",
    positive: "She will be working at 5 PM.",
    negative: "She will not be working at 5 PM.",
    question: "Will she be working at 5 PM?",
    explanation: "Действие будет происходить в определённый момент будущего.",
  },
  {
    name: "Future Perfect",
    ru: "Будущее совершённое",
    formula: "will have + V3",
    positive: "She will have finished by Friday.",
    negative: "She will not have finished by Friday.",
    question: "Will she have finished by Friday?",
    explanation: "Действие завершится к определённому моменту в будущем.",
  },
  {
    name: "Future Perfect Continuous",
    ru: "Будущее совершённое длительное",
    formula: "will have been + V-ing",
    positive: "She will have been working for five hours by noon.",
    negative: "She will not have been working for five hours by noon.",
    question: "Will she have been working for five hours by noon?",
    explanation: "Длительность действия к определённому моменту будущего.",
  },
];

const sentenceExercises = [
  {
    tense: "Present Simple",
    type: "Утверждение",
    question: "Она работает каждый день.",
    options: [
      "She work every day.",
      "She works every day.",
      "She working every day.",
    ],
    correct: "She works every day.",
    explanation: "В Present Simple с she добавляем -s к глаголу.",
  },
  {
    tense: "Present Simple",
    type: "Вопрос",
    question: "Она работает здесь?",
    options: [
      "Does she work here?",
      "Does she works here?",
      "Is she work here?",
    ],
    correct: "Does she work here?",
    explanation: "Вопрос: Does + she + V1. После does окончание -s не нужно.",
  },
  {
    tense: "Present Continuous",
    type: "Отрицание",
    question: "Я сейчас не работаю.",
    options: [
      "I do not working now.",
      "I am not work now.",
      "I am not working now.",
    ],
    correct: "I am not working now.",
    explanation: "Отрицание: am/is/are + not + V-ing.",
  },
  {
    tense: "Past Simple",
    type: "Вопрос",
    question: "Ты вчера ходила на работу?",
    options: [
      "Did you went to work yesterday?",
      "Did you go to work yesterday?",
      "Do you went to work yesterday?",
    ],
    correct: "Did you go to work yesterday?",
    explanation: "После did используем начальную форму глагола go.",
  },
  {
    tense: "Present Perfect",
    type: "Утверждение",
    question: "Я уже закончила работу.",
    options: [
      "I have already finished my work.",
      "I has already finished my work.",
      "I have already finish my work.",
    ],
    correct: "I have already finished my work.",
    explanation: "Present Perfect: have/has + V3.",
  },
  {
    tense: "Future Simple",
    type: "Отрицание",
    question: "Она не будет работать завтра.",
    options: [
      "She will not works tomorrow.",
      "She does not will work tomorrow.",
      "She will not work tomorrow.",
    ],
    correct: "She will not work tomorrow.",
    explanation: "Отрицание: will not + V1.",
  },
];

const writingExercises = [
  {
    tense: "Present Simple",
    ru: "Я работаю каждый день.",
    answer: "I work every day.",
    explanation: "Present Simple: I + V1.",
  },
  {
    tense: "Present Continuous",
    ru: "Она сейчас читает книгу.",
    answer: "She is reading a book.",
    explanation: "Present Continuous: is + V-ing.",
  },
  {
    tense: "Present Perfect",
    ru: "Я уже закончила работу.",
    answer: "I have already finished my work.",
    explanation: "Present Perfect: have + V3.",
  },
  {
    tense: "Present Perfect Continuous",
    ru: "Я работаю уже два часа.",
    answer: "I have been working for two hours.",
    explanation: "Present Perfect Continuous: have been + V-ing.",
  },
  {
    tense: "Past Simple",
    ru: "Она вчера ходила в школу.",
    answer: "She went to school yesterday.",
    explanation: "Past Simple: вторая форма глагола go — went.",
  },
  {
    tense: "Past Continuous",
    ru: "Я смотрела телевизор в восемь вечера.",
    answer: "I was watching TV at eight in the evening.",
    explanation: "Past Continuous: was + V-ing.",
  },
  {
    tense: "Past Perfect",
    ru: "Она закончила работу до моего прихода.",
    answer: "She had finished her work before I arrived.",
    explanation: "Past Perfect: had + V3.",
  },
  {
    tense: "Past Perfect Continuous",
    ru: "Я работала два часа до обеда.",
    answer: "I had been working for two hours before lunch.",
    explanation: "Past Perfect Continuous: had been + V-ing.",
  },
  {
    tense: "Future Simple",
    ru: "Я буду учить английский завтра.",
    answer: "I will study English tomorrow.",
    explanation: "Future Simple: will + V1.",
  },
  {
    tense: "Future Continuous",
    ru: "Завтра в восемь я буду работать.",
    answer: "I will be working at eight tomorrow.",
    explanation: "Future Continuous: will be + V-ing.",
  },
  {
    tense: "Future Perfect",
    ru: "Я закончу работу к пятнице.",
    answer: "I will have finished my work by Friday.",
    explanation: "Future Perfect: will have + V3.",
  },
  {
    tense: "Future Perfect Continuous",
    ru: "К полудню я буду работать уже пять часов.",
    answer: "I will have been working for five hours by noon.",
    explanation: "Future Perfect Continuous: will have been + V-ing.",
  },
];

const teacherQuestions = [
  {
    question: "Hello! What's your name?",
    translation: "Привет! Как тебя зовут?",
    hint: "My name is Nargiz.",
    answers: ["my name is", "i am", "i'm"],
    success: "Nice to meet you! 😊",
  },
  {
    question: "Where are you from?",
    translation: "Откуда ты?",
    hint: "I am from Kazakhstan.",
    answers: ["i am from", "i'm from"],
    success: "Wonderful! Kazakhstan is a beautiful country!",
  },
  {
    question: "What do you do?",
    translation: "Кем ты работаешь?",
    hint: "I am an accountant.",
    answers: ["i am", "i'm", "i work"],
    success: "Great! Tell me more about your work!",
  },
  {
    question: "Do you like travelling?",
    translation: "Тебе нравится путешествовать?",
    hint: "Yes, I love travelling.",
    answers: ["yes", "no", "i love", "i like"],
    success: "That's wonderful! Travelling is exciting!",
  },
  {
    question: "Why do you learn English?",
    translation: "Почему ты учишь английский?",
    hint: "I want to travel and speak English.",
    answers: ["i want", "because", "for"],
    success: "Amazing! Keep learning and you will reach B1!",
  },
];
const practiceScenes = [
  {
    "kind": "🎬 Фильм",
    "level": "A2",
    "title": "В аэропорту",
    "lines": [
      {
        "who": "Agent",
        "en": "May I see your passport, please?",
        "ru": "Можно ваш паспорт?"
      },
      {
        "who": "Traveler",
        "en": "Of course. Here it is.",
        "ru": "Конечно. Вот он."
      },
      {
        "who": "Agent",
        "en": "Where are you flying today?",
        "ru": "Куда вы сегодня летите?"
      }
    ],
    "question": "Как попросить паспорт?",
    "answer": "May I see your passport, please?"
  },
  {
    "kind": "🎨 Мультфильм",
    "level": "A1",
    "title": "Потерявшийся котёнок",
    "lines": [
      {
        "who": "Cat",
        "en": "Where is my home?",
        "ru": "Где мой дом?"
      },
      {
        "who": "Bird",
        "en": "Do not worry. I can help you.",
        "ru": "Не волнуйся. Я могу помочь."
      },
      {
        "who": "Cat",
        "en": "Thank you, my friend!",
        "ru": "Спасибо, мой друг!"
      }
    ],
    "question": "Как сказать «Спасибо, мой друг»?",
    "answer": "Thank you, my friend!"
  },
  {
    "kind": "📖 Книга",
    "level": "B1",
    "title": "Таинственная библиотека",
    "lines": [
      {
        "who": "Narrator",
        "en": "The old library was silent.",
        "ru": "В старой библиотеке было тихо."
      },
      {
        "who": "Mia",
        "en": "I think someone was here before us.",
        "ru": "Думаю, кто-то был здесь до нас."
      },
      {
        "who": "Leo",
        "en": "Let us look for a clue.",
        "ru": "Давай поищем подсказку."
      }
    ],
    "question": "Как сказать «Давай поищем подсказку»?",
    "answer": "Let us look for a clue."
  },
  {
    "kind": "🎬 Фильм",
    "level": "B2",
    "title": "Неожиданная встреча",
    "lines": [
      {
        "who": "Alex",
        "en": "I did not expect to see you here.",
        "ru": "Я не ожидал увидеть тебя здесь."
      },
      {
        "who": "Sam",
        "en": "Neither did I. What a coincidence!",
        "ru": "Я тоже. Какое совпадение!"
      }
    ],
    "question": "Как сказать «Какое совпадение»?",
    "answer": "What a coincidence!"
  },
  {
    "kind": "📖 Книга",
    "level": "C1",
    "title": "Трудное решение",
    "lines": [
      {
        "who": "Narrator",
        "en": "She hesitated, weighing every possible consequence.",
        "ru": "Она колебалась, взвешивая все возможные последствия."
      },
      {
        "who": "Eva",
        "en": "I cannot ignore what we have discovered.",
        "ru": "Я не могу игнорировать то, что мы обнаружили."
      }
    ],
    "question": "Как сказать «Я не могу игнорировать то, что мы обнаружили»?",
    "answer": "I cannot ignore what we have discovered."
  },
  {
    "kind": "🎬 Фильм",
    "level": "C2",
    "title": "Сложные переговоры",
    "lines": [
      {
        "who": "Director",
        "en": "Your proposal is compelling, albeit somewhat unconventional.",
        "ru": "Ваше предложение убедительно, хотя и несколько нетрадиционно."
      },
      {
        "who": "Analyst",
        "en": "That is precisely why it merits closer scrutiny.",
        "ru": "Именно поэтому оно заслуживает более пристального изучения."
      }
    ],
    "question": "Как сказать «Оно заслуживает более пристального изучения»?",
    "answer": "It merits closer scrutiny."
  },
{"kind": "🎬 Фильм", "level": "A1", "title": "В кафе", "lines": [{"who": "Customer", "en": "Hello! Can I have tea, please?", "ru": "Здравствуйте! Можно мне чай?"}, {"who": "Waiter", "en": "Of course. Here you are.", "ru": "Конечно. Вот, пожалуйста."}], "question": "Как попросить чай?", "answer": "Can I have tea, please?"},
{"kind": "🎨 Мультфильм", "level": "A1", "title": "Маленький дракон", "lines": [{"who": "Dragon", "en": "I cannot fly yet.", "ru": "Я пока не умею летать."}, {"who": "Fox", "en": "You can try again!", "ru": "Ты можешь попробовать ещё раз!"}], "question": "Как сказать «Ты можешь попробовать ещё раз»?", "answer": "You can try again!"},
{"kind": "📖 Книга", "level": "A1", "title": "Первый снег", "lines": [{"who": "Narrator", "en": "The snow is white and soft.", "ru": "Снег белый и мягкий."}, {"who": "Girl", "en": "I love winter mornings.", "ru": "Я люблю зимние утра."}], "question": "Как сказать «Я люблю зимние утра»?", "answer": "I love winter mornings."},
{"kind": "🎬 Фильм", "level": "A2", "title": "Потерянный билет", "lines": [{"who": "Traveler", "en": "I cannot find my ticket.", "ru": "Я не могу найти свой билет."}, {"who": "Clerk", "en": "Please check your bag again.", "ru": "Пожалуйста, проверьте сумку ещё раз."}], "question": "Как попросить проверить сумку?", "answer": "Please check your bag again."},
{"kind": "🎨 Мультфильм", "level": "A2", "title": "Робот-помощник", "lines": [{"who": "Robot", "en": "I am learning to cook soup.", "ru": "Я учусь готовить суп."}, {"who": "Child", "en": "Be careful! The pot is hot.", "ru": "Осторожно! Кастрюля горячая."}], "question": "Как сказать «Кастрюля горячая»?", "answer": "The pot is hot."},
{"kind": "📖 Книга", "level": "A2", "title": "Письмо издалека", "lines": [{"who": "Narrator", "en": "She opened the letter slowly.", "ru": "Она медленно открыла письмо."}, {"who": "Maya", "en": "My friend is coming next week.", "ru": "Мой друг приедет на следующей неделе."}], "question": "Как сказать «Мой друг приедет на следующей неделе»?", "answer": "My friend is coming next week."},
{"kind": "🎬 Фильм", "level": "B1", "title": "Опоздавший поезд", "lines": [{"who": "Alex", "en": "If we hurry, we will catch the train.", "ru": "Если поторопимся, успеем на поезд."}, {"who": "Lena", "en": "I hope the platform is nearby.", "ru": "Надеюсь, платформа рядом."}], "question": "Как сказать «Если поторопимся, успеем на поезд»?", "answer": "If we hurry, we will catch the train."},
{"kind": "🎨 Мультфильм", "level": "B1", "title": "Изобретение совы", "lines": [{"who": "Owl", "en": "I have been working on this machine all week.", "ru": "Я работаю над этой машиной всю неделю."}, {"who": "Rabbit", "en": "Does it really make clouds?", "ru": "Она действительно создаёт облака?"}], "question": "Как спросить «Она действительно создаёт облака»?", "answer": "Does it really make clouds?"},
{"kind": "📖 Книга", "level": "B1", "title": "Секретная дверь", "lines": [{"who": "Narrator", "en": "The door had been locked for years.", "ru": "Дверь была заперта много лет."}, {"who": "Nora", "en": "Someone must have opened it recently.", "ru": "Кто-то, должно быть, недавно её открыл."}], "question": "Как сказать «Кто-то, должно быть, недавно её открыл»?", "answer": "Someone must have opened it recently."},
{"kind": "🎬 Фильм", "level": "B2", "title": "Сложный выбор", "lines": [{"who": "Eva", "en": "If I had known the truth, I would have acted differently.", "ru": "Если бы я знала правду, я бы поступила иначе."}, {"who": "Dan", "en": "We still have a chance to make things right.", "ru": "У нас ещё есть шанс всё исправить."}], "question": "Как сказать «У нас ещё есть шанс всё исправить»?", "answer": "We still have a chance to make things right."},
{"kind": "🎨 Мультфильм", "level": "B2", "title": "Город под водой", "lines": [{"who": "Dolphin", "en": "Unless we repair the bridge, nobody can cross.", "ru": "Если мы не починим мост, никто не сможет перейти."}, {"who": "Turtle", "en": "We should come up with another solution.", "ru": "Нам стоит придумать другое решение."}], "question": "Как сказать «Нам стоит придумать другое решение»?", "answer": "We should come up with another solution."},
{"kind": "📖 Книга", "level": "B2", "title": "Незнакомая рукопись", "lines": [{"who": "Narrator", "en": "The manuscript appeared to have been altered.", "ru": "Казалось, рукопись была изменена."}, {"who": "Scholar", "en": "I wish we could identify its author.", "ru": "Хотелось бы установить её автора."}], "question": "Как сказать «Хотелось бы установить её автора»?", "answer": "I wish we could identify its author."},
{"kind": "🎬 Фильм", "level": "C1", "title": "Свидетель", "lines": [{"who": "Detective", "en": "Your account seems to contradict the available evidence.", "ru": "Ваш рассказ, по-видимому, противоречит имеющимся доказательствам."}, {"who": "Witness", "en": "I may have overlooked an important detail.", "ru": "Возможно, я упустил важную деталь."}], "question": "Как сказать «Возможно, я упустил важную деталь»?", "answer": "I may have overlooked an important detail."},
{"kind": "🎨 Мультфильм", "level": "C1", "title": "Совет леса", "lines": [{"who": "Owl", "en": "We must weigh the long-term consequences of our decision.", "ru": "Нам нужно взвесить долгосрочные последствия решения."}, {"who": "Deer", "en": "A compromise might be more sustainable.", "ru": "Компромисс может оказаться устойчивее."}], "question": "Как сказать «Компромисс может оказаться устойчивее»?", "answer": "A compromise might be more sustainable."},
{"kind": "📖 Книга", "level": "C1", "title": "Ненадёжный рассказчик", "lines": [{"who": "Narrator", "en": "His recollection was coloured by years of regret.", "ru": "Его воспоминания были окрашены годами сожалений."}, {"who": "Reader", "en": "The narrator may not be entirely trustworthy.", "ru": "Рассказчик, возможно, не вполне надёжен."}], "question": "Как сказать «Рассказчик, возможно, не вполне надёжен»?", "answer": "The narrator may not be entirely trustworthy."},
{"kind": "🎬 Фильм", "level": "C2", "title": "Скрытый мотив", "lines": [{"who": "Counsel", "en": "Your argument is persuasive, albeit built on a questionable premise.", "ru": "Ваш довод убедителен, хотя основан на сомнительной предпосылке."}, {"who": "Analyst", "en": "The distinction is subtle but far from trivial.", "ru": "Различие тонкое, но отнюдь не незначительное."}], "question": "Как сказать «Различие тонкое, но отнюдь не незначительное»?", "answer": "The distinction is subtle but far from trivial."},
{"kind": "🎨 Мультфильм", "level": "C2", "title": "Парадокс часов", "lines": [{"who": "Inventor", "en": "The apparent contradiction dissolves once we reconsider our assumptions.", "ru": "Кажущееся противоречие исчезает, если пересмотреть предположения."}, {"who": "Fox", "en": "That explanation is elegant, though hardly intuitive.", "ru": "Это объяснение изящно, хотя едва ли интуитивно."}], "question": "Как сказать «Это объяснение изящно, хотя едва ли интуитивно»?", "answer": "That explanation is elegant, though hardly intuitive."},
{"kind": "📖 Книга", "level": "C2", "title": "Тишина между строк", "lines": [{"who": "Narrator", "en": "What remained unsaid was more revealing than any confession.", "ru": "Невысказанное говорило больше любого признания."}, {"who": "Critic", "en": "The ambiguity invites several equally plausible readings.", "ru": "Неоднозначность допускает несколько равно правдоподобных прочтений."}], "question": "Как сказать «Неоднозначность допускает несколько равно правдоподобных прочтений»?", "answer": "The ambiguity invites several equally plausible readings."}
];
type Tab = "today" | "review" | "verbs" | "tenses" | "lessons" | "speaking" | "writing" | "progress" | "stats";
type RecordDay = { checked: string[]; learned: string[]; tests: number; xp: number };
type HistoryItem = { date: string; correct: number; total: number; kind: string };
const TASKS = [
  { id: "words", label: "Выучить 10 слов" },
  { id: "quiz", label: "Пройти тест по словам" },
  { id: "verbs", label: "Повторить глаголы" },
  { id: "tenses", label: "Выполнить упражнение по временам" },
  { id: "writing", label: "Написать предложение" },
  { id: "lesson", label: "Пройти урок A1–C2" },
  { id: "speaking", label: "Разговорная практика" },
];
const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const normalize = (s: string) => s.toLowerCase().replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();
const nav: { id: Tab; title: string; emoji: string }[] = [
  {id:"today",title:"Сегодня",emoji:"🏠"}, {id:"review",title:"Повторение слов",emoji:"🔁"}, {id:"speaking",title:"Разговорная практика",emoji:"🎬"}, {id:"verbs",title:"Глаголы",emoji:"📘"},
  {id:"tenses",title:"12 времён",emoji:"⏰"}, {id:"lessons",title:"Уроки",emoji:"🎓"},
  {id:"writing",title:"Письменный тест",emoji:"✍️"}, {id:"progress",title:"Календарь и XP",emoji:"🏆"},
  {id:"stats",title:"Статистика",emoji:"📊"},
];
function subscribeToSection(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getSection(): Tab {
  return nav.find((item) => `#${item.id}` === window.location.hash)?.id ?? "today";
}

export default function Home() {
  const tab = useSyncExternalStore(subscribeToSection, getSection, () => "today" as const);
  const [sceneIndex,setSceneIndex]=useState(0);
  const [sceneAnswer,setSceneAnswer]=useState("");
  const [sceneChecked,setSceneChecked]=useState(false);
  const [reviewIndex,setReviewIndex]=useState(0);
  const [reviewReveal,setReviewReveal]=useState(false);
  const [store,setStore] = useState<Record<string,RecordDay>>({});
  const [history,setHistory] = useState<HistoryItem[]>([]);
  const [ready,setReady] = useState(false);
  const [clock,setClock] = useState<Date>(new Date("2026-11-03T00:00:00"));
  const [wordAnswer,setWordAnswer] = useState<string|null>(null);
  const [quizIndex,setQuizIndex] = useState(0);
  const [quizScore,setQuizScore] = useState(0);
  const [quizDone,setQuizDone] = useState(false);
  const [verbSearch,setVerbSearch] = useState("");
  const [verbFilter,setVerbFilter] = useState("all");
  const [tenseIndex,setTenseIndex] = useState(0);
  const [tenseAnswer,setTenseAnswer] = useState<string|null>(null);
 const [tenseChecked, setTenseChecked] = useState(false);
  const [lessonIndex,setLessonIndex] = useState(0);
  const [lessonAnswer,setLessonAnswer] = useState<Record<number,string>>({});
  const [writingIndex,setWritingIndex] = useState(0);
  const [writingText,setWritingText] = useState("");
  const [writingChecked,setWritingChecked] = useState(false);
  const [writingScore,setWritingScore] = useState(0);
  const [writingDone,setWritingDone] = useState(false);
  const [month,setMonth] = useState(10);
  const [year,setYear] = useState(2026);
  useEffect(() => {
    const initializeCalendar = window.setTimeout(() => {
      const now = new Date();
      setClock(now);
      setMonth(now.getMonth());
      setYear(now.getFullYear());
    }, 0);
    const timer = window.setInterval(() => setClock(new Date()), 60_000);
    return () => {
      window.clearTimeout(initializeCalendar);
      window.clearInterval(timer);
    };
  }, []);
  const todayKey=dateKey(clock);
  const todayData=store[todayKey] ?? {checked:[],learned:[],tests:0,xp:0};
  const currentDay=Math.max(0,Math.floor((new Date(clock.getFullYear(),clock.getMonth(),clock.getDate()).getTime()-new Date(2026,10,3).getTime())/86400000));
  const todayWords=lessons[currentDay%lessons.length];
  const currentQuiz=todayWords.map((w,i)=>({question:w.en,correct:w.ru,options:[w.ru,todayWords[(i+1)%10].ru,todayWords[(i+2)%10].ru].sort((a,b)=>a.localeCompare(b))}));
  const completed=TASKS.filter(t=>todayData.checked.includes(t.id)).length;
  const totalXp=Object.values(store).reduce((sum,d)=>sum+(d.xp||0),0);
  const studiedDays=Object.values(store).filter(d=>d.checked.length>0||d.learned.length>0).length;
  const card="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7";
  const primary="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-40";
  const secondary="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 font-semibold text-blue-800 hover:bg-blue-100";
  useEffect(()=>{
    const restore = window.setTimeout(() => {
      try {
        const old=localStorage.getItem("myEnglishDashboardV2");
        if(old){const parsed=JSON.parse(old); if(parsed && typeof parsed==="object")setStore(parsed);}
        const h=localStorage.getItem("myEnglishDashboardHistoryV2");
        if(h){const parsed=JSON.parse(h);if(Array.isArray(parsed))setHistory(parsed);}
        // Сохраняем старую историю письменных тестов, если она уже была.
        if(!h){const oldHistory=localStorage.getItem("myEnglishWritingHistory");if(oldHistory){const parsed=JSON.parse(oldHistory);if(Array.isArray(parsed))setHistory(parsed.map((r:{date:string;correct:number;total:number})=>({...r,kind:"Письменный тест"})));}}
      } catch(e){console.error("Не удалось загрузить прогресс",e);}
      setReady(true);
    }, 0);
    return () => window.clearTimeout(restore);
  },[]);
  useEffect(()=>{if(ready)localStorage.setItem("myEnglishDashboardV2",JSON.stringify(store));},[store,ready]);
  useEffect(()=>{if(ready)localStorage.setItem("myEnglishDashboardHistoryV2",JSON.stringify(history));},[history,ready]);
  function updateDay(fn:(d:RecordDay)=>RecordDay,day=todayKey){setStore(prev=>({...prev,[day]:fn(prev[day]??{checked:[],learned:[],tests:0,xp:0})}));}
  function toggleTask(id:string){updateDay(d=>({...d,checked:d.checked.includes(id)?d.checked.filter(x=>x!==id):[...d.checked,id],xp:Math.max(0,d.xp+(d.checked.includes(id)?-10:10))}));}
  function learnWord(en:string){updateDay(d=>({...d,learned:d.learned.includes(en)?d.learned.filter(x=>x!==en):[...d.learned,en],xp:Math.max(0,d.xp+(d.learned.includes(en)?-5:5))}));}
  function awardTask(id:string){updateDay(d=>d.checked.includes(id)?d:{...d,checked:[...d.checked,id],xp:d.xp+10});}
  function finishTest(kind:string,correct:number,total:number,taskId:string){setHistory(prev=>[...prev,{date:todayKey,correct,total,kind}]);updateDay(d=>({...d,tests:d.tests+1,checked:d.checked.includes(taskId)?d.checked:[...d.checked,taskId],xp:d.xp+correct*2+(d.checked.includes(taskId)?0:10)}));}
  function speak(s:string){if(typeof window==="undefined"||!("speechSynthesis" in window))return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(s);utterance.lang="en-US";utterance.rate=.85;window.speechSynthesis.speak(utterance);}
  const heading=(title:string,desc:string)=><div className="mb-6"><h2 className="text-2xl font-extrabold text-blue-950">{title}</h2><p className="mt-1 text-sm text-slate-500">{desc}</p></div>;
  return <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 text-slate-800">
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-blue-800 to-sky-500 px-6 py-6 text-white shadow-lg">
        <div><div className="text-sm font-semibold text-blue-100">Твой английский каждый день</div><h1 className="mt-1 text-3xl font-black">💙 My English</h1><p className="mt-1 text-sm text-blue-100">От A1 до C2 · маленькие шаги каждый день</p></div>
        <div className="flex gap-3"><div className="rounded-2xl bg-white/15 px-4 py-3 text-center"><div className="text-xl font-extrabold">{totalXp}</div><div className="text-xs">⭐ XP</div></div><div className="rounded-2xl bg-white/15 px-4 py-3 text-center"><div className="text-xl font-extrabold">{studiedDays}</div><div className="text-xs">📅 дней</div></div></div>
        <nav aria-label="Курсы и аккаунт" className="flex flex-wrap gap-2">
          <Link href="/courses" className="rounded-xl bg-white px-4 py-2 font-semibold text-blue-800">
            Курсы A1–C2
          </Link>
          <Link href="/dashboard" className="rounded-xl bg-blue-950 px-4 py-2 font-semibold text-white">
            Личный кабинет
          </Link>
          <Link href="/login" className="rounded-xl bg-blue-950 px-4 py-2 font-semibold text-white">
            Войти
          </Link>
        </nav>
      </header>
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="flex flex-wrap content-start gap-2 lg:flex-col" aria-label="Разделы обучения">
          {nav.map(item=><a key={item.id} href={`#${item.id}`} aria-current={tab===item.id?"location":undefined} className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${tab===item.id?"bg-blue-700 text-white shadow-md":"border border-blue-100 bg-white text-blue-900 hover:bg-blue-100"}`}>{item.emoji} {item.title}</a>)}
        </nav>
        <div className="min-w-0 space-y-5">
          {tab==="today"&&<>
            <section className={card}>{heading("Сегодня — твои 10 слов", "Сначала выучи слова, затем выполни задания дня")}
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-blue-50 p-4"><span className="font-bold text-blue-900">📆 {clock.toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})}</span><span className="text-sm text-blue-700">Выучено: {todayWords.filter(w=>todayData.learned.includes(w.en)).length}/10</span></div>
              <div className="grid gap-3 sm:grid-cols-2">{todayWords.map(w=><div key={w.en} className={`rounded-2xl border p-4 ${todayData.learned.includes(w.en)?"border-sky-300 bg-sky-50":"border-blue-100 bg-white"}`}><div className="flex items-start justify-between gap-2"><div><div className="text-lg font-extrabold text-blue-900">{w.en}</div><div className="text-sm text-slate-600">{w.ru}</div></div><button className="rounded-xl bg-blue-100 px-3 py-2 text-blue-800" onClick={()=>speak(w.en)} title="Прослушать">🔊</button></div><p className="mt-2 text-xs text-slate-500">{w.example}</p><button onClick={()=>learnWord(w.en)} className={`mt-3 w-full rounded-xl px-3 py-2 text-sm font-bold ${todayData.learned.includes(w.en)?"bg-sky-200 text-blue-900":"bg-blue-600 text-white"}`}>{todayData.learned.includes(w.en)?"✓ Выучено":"Отметить как выученное"}</button></div>)}</div>
              {todayWords.every(w=>todayData.learned.includes(w.en))&&<button className={`${primary} mt-4`} onClick={()=>awardTask("words")}>✓ Все слова выучены — отметить задание</button>}
            </section>
            <section className={card}>{heading("🎯 Тест по словам", "10 вопросов по сегодняшнему словарю")}
              {!quizDone?<><p className="mb-2 text-sm font-bold text-blue-700">Вопрос {quizIndex+1} из {currentQuiz.length}</p><p className="mb-4 text-xl font-bold">Как переводится «{currentQuiz[quizIndex].question}»?</p><div className="grid gap-2">{currentQuiz[quizIndex].options.map(o=><button key={o} disabled={wordAnswer!==null} onClick={()=>{setWordAnswer(o);if(o===currentQuiz[quizIndex].correct)setQuizScore(s=>s+1);}} className={`rounded-xl border p-3 text-left ${wordAnswer===null?"border-blue-100 hover:bg-blue-50":o===currentQuiz[quizIndex].correct?"border-green-400 bg-green-50":"border-slate-200 opacity-60"}`}>{o}</button>)}</div>{wordAnswer!==null&&<div className="mt-4"><p className="mb-3 font-semibold">{wordAnswer===currentQuiz[quizIndex].correct?"✅ Верно!":"❌ Правильно: "+currentQuiz[quizIndex].correct}</p><button className={primary} onClick={()=>{if(quizIndex===currentQuiz.length-1){setQuizDone(true);finishTest("Тест слов",quizScore,currentQuiz.length,"quiz");}else setQuizIndex(i=>i+1);setWordAnswer(null);}}>Далее →</button></div>}</>:<div className="rounded-2xl bg-blue-50 p-5"><p className="text-xl font-bold text-blue-900">🎉 Результат: {quizScore} из 10</p><button className={`${secondary} mt-4`} onClick={()=>{setQuizIndex(0);setQuizScore(0);setQuizDone(false);setWordAnswer(null);}}>Пройти ещё раз</button></div>}
            </section>
            <section className={card}>{heading("📝 Задания на сегодня", "Отмечай выполненное как в ежедневнике")}
              <div className="mb-4 h-3 overflow-hidden rounded-full bg-blue-100"><div className="h-full rounded-full bg-blue-600" style={{width:`${completed/TASKS.length*100}%`}} /></div><p className="mb-4 text-sm text-blue-700">Выполнено {completed} из {TASKS.length}</p>
              <div className="grid gap-3 sm:grid-cols-2">{TASKS.map(t=><label key={t.id} className="flex cursor-pointer items-center gap-3 rounded-xl border border-blue-100 p-3"><input type="checkbox" checked={todayData.checked.includes(t.id)} onChange={()=>toggleTask(t.id)} className="h-5 w-5 accent-blue-600"/><span className={todayData.checked.includes(t.id)?"text-slate-400 line-through":"text-blue-950"}>{t.label}</span></label>)}</div>
            </section>
          </>}
          {tab==="review"&&<section className={card}>{heading("🔁 Повторение слов", "Карточки из всех пройденных наборов — работает без интернета после загрузки сайта")}
            {(()=>{const words=lessons.flat();const w=words[reviewIndex%words.length];return <div className="space-y-4"><p className="text-sm text-blue-700">Карточка {reviewIndex%words.length+1} из {words.length}</p><div className="rounded-2xl bg-blue-50 p-8 text-center"><h3 className="text-3xl font-extrabold text-blue-950">{w.en}</h3><button className="mt-3 text-blue-700" onClick={()=>speak(w.en)}>🔊 Произнести</button>{reviewReveal&&<><p className="mt-4 text-xl">{w.ru}</p><p className="mt-2 text-sm">{w.example}</p></>}</div><button className={secondary} onClick={()=>setReviewReveal(v=>!v)}>{reviewReveal?"Скрыть перевод":"Показать перевод"}</button><button className={`${primary} ml-2`} onClick={()=>{setReviewIndex(i=>i+1);setReviewReveal(false);awardTask("verbs");}}>Следующее слово →</button></div>})()}
          </section>}
          {tab==="speaking"&&<section className={card}>{heading("🎬 Разговорная практика", "Фильмы, мультфильмы и книги — учебные авторские сцены · A1–C2")}
            <div className="mb-4 grid gap-2 sm:grid-cols-2">{practiceScenes.map((s,i)=><button key={i} className={`rounded-xl p-3 text-left ${sceneIndex===i?"bg-blue-700 text-white":"bg-blue-50 text-blue-900"}`} onClick={()=>{setSceneIndex(i);setSceneAnswer("");setSceneChecked(false);}}>{s.kind} · {s.level} · {s.title}</button>)}</div>
            {(()=>{const s=practiceScenes[sceneIndex];return <div><h3 className="text-xl font-bold">{s.title}</h3><p className="mt-1 text-xs text-slate-500">Учебная авторская сцена, не цитата из существующего произведения</p><div className="mt-4 space-y-3">{s.lines.map((line,i)=><div key={i} className="rounded-xl border border-blue-100 p-4"><p className="text-sm font-bold text-blue-700">{line.who}</p><button onClick={()=>speak(line.en)} className="mt-1 text-left font-semibold">🔊 {line.en}</button><p className="text-sm text-slate-500">{line.ru}</p></div>)}</div><button className={`${secondary} mt-4`} onClick={()=>speak(s.lines.map(l=>l.en).join(" "))}>▶ Прослушать всю сцену</button><div className="mt-5 rounded-xl bg-blue-50 p-4"><p className="font-bold">{s.question}</p><input value={sceneAnswer} onChange={e=>{setSceneAnswer(e.target.value);setSceneChecked(false);}} placeholder="Напиши фразу по-английски" className="mt-3 w-full rounded-xl border border-blue-200 p-3"/><button className={`${primary} mt-3`} disabled={!sceneAnswer.trim()} onClick={()=>{setSceneChecked(true);if(normalize(sceneAnswer)===normalize(s.answer))awardTask("speaking");}}>Проверить</button>{sceneChecked&&<p className="mt-3 font-bold">{normalize(sceneAnswer)===normalize(s.answer)?"✅ Верно!":"❌ Сравни с образцом: "+s.answer}</p>}</div></div>})()}
          </section>}
          {tab==="verbs"&&<section className={card}>{heading("📘 Словарь глаголов", "V1, V2, V3 · правильные и неправильные глаголы")}
            <div className="mb-4 flex flex-wrap gap-2"><input value={verbSearch} onChange={e=>setVerbSearch(e.target.value)} placeholder="Поиск глагола или перевода" className="min-w-0 flex-1 rounded-xl border border-blue-200 p-3 outline-blue-500"/><select value={verbFilter} onChange={e=>setVerbFilter(e.target.value)} className="rounded-xl border border-blue-200 p-3"><option value="all">Все</option><option value="regular">Правильные</option><option value="irregular">Неправильные</option></select></div>
            <div className="overflow-x-auto"><table className="w-full min-w-[490px] text-left text-sm"><thead className="bg-blue-100 text-blue-950"><tr>{["V1","V2","V3","Перевод","Звук"].map(x=><th className="p-3" key={x}>{x}</th>)}</tr></thead><tbody>{verbDictionary.filter(v=>(verbFilter==="all"||v.type===verbFilter)&&[v.v1,v.v2,v.v3,v.ru].join(" ").toLowerCase().includes(verbSearch.toLowerCase())).map(v=><tr key={v.v1} className="border-b border-blue-50"><td className="p-3 font-bold">{v.v1}</td><td className="p-3">{v.v2}</td><td className="p-3">{v.v3}</td><td className="p-3">{v.ru}</td><td className="p-3"><button onClick={()=>speak(v.v1)} className="text-blue-700">🔊</button></td></tr>)}</tbody></table></div>
            <button className={`${primary} mt-5`} onClick={()=>awardTask("verbs")}>✓ Глаголы повторены</button>
          </section>}
          {tab==="tenses"&&<section className={card}>{heading("⏰ 12 времён английского", "Правило, примеры и письменная практика")}
            <div className="mb-5 grid gap-2 sm:grid-cols-3">{englishTenses.map((t,i)=><button key={t.name} onClick={()=>{setTenseIndex(i);setTenseAnswer(null);setTenseChecked(false);}} className={`rounded-xl px-3 py-3 text-left text-sm font-bold ${tenseIndex===i?"bg-blue-700 text-white":"bg-blue-50 text-blue-800 hover:bg-blue-100"}`}>{t.name}</button>)}</div>
            {(()=>{const t=englishTenses[tenseIndex];const ex=writingExercises.find(x=>x.tense===t.name);return <div className="space-y-3"><h3 className="text-xl font-bold">{t.name} — {t.ru}</h3><p>{t.explanation}</p><p className="rounded-xl bg-blue-50 p-3 font-bold">Формула: {t.formula}</p>{[t.positive,t.negative,t.question].map((s,i)=><button key={i} onClick={()=>speak(s)} className="block w-full rounded-xl border border-blue-100 p-3 text-left">🔊 {s}</button>)}{ex&&<div className="mt-5 rounded-2xl bg-sky-50 p-4"><p className="font-bold">Переведи: {ex.ru}</p><input value={tenseAnswer??""} onChange={e=>{setTenseAnswer(e.target.value);setTenseChecked(false);}} className="mt-3 w-full rounded-xl border border-blue-200 p-3" placeholder="Напиши по-английски"/><button className={`${primary} mt-3`} disabled={!tenseAnswer?.trim()} onClick={()=>{setTenseChecked(true);if(normalize(tenseAnswer??"")===normalize(ex.answer))awardTask("tenses");}}>Проверить</button>{tenseChecked&&<div className="mt-3 rounded-xl bg-white p-3"><p className="font-bold">{normalize(tenseAnswer??"")===normalize(ex.answer)?"✅ Правильно!":"❌ Ответ отличается от образца"}</p><p>Правильный образец: {ex.answer}</p><p className="text-sm text-slate-600">{ex.explanation}</p></div>}</div>}</div>})()}
          </section>}
          {tab==="lessons"&&<section className={card}>{heading("🎓 Уроки A1 → C2", "56 уроков с примерами и вопросами")}
            <div className="mb-5 grid gap-2 sm:grid-cols-3">{englishLessons.map((l,i)=><button key={l.id} onClick={()=>{setLessonIndex(i);setLessonAnswer({});}} className={`rounded-xl p-3 text-left text-sm ${lessonIndex===i?"bg-blue-700 text-white":"bg-blue-50 text-blue-900"}`}><span className="font-bold">{l.level} · Урок {l.id}</span><br/>{l.title}</button>)}</div>
            {(()=>{const l=englishLessons[lessonIndex];return <div><h3 className="text-xl font-bold text-blue-950">{l.title}</h3><p className="mb-4 text-slate-500">{l.description}</p><h4 className="font-bold">Слова урока</h4><div className="mt-2 grid gap-2 sm:grid-cols-2">{l.vocabulary.map(w=><button key={w.english} onClick={()=>speak(w.english)} className="rounded-xl bg-blue-50 p-3 text-left text-sm"><b>{w.english}</b> — {w.russian} 🔊</button>)}</div><h4 className="mt-5 font-bold">Примеры</h4>{l.examples.map((e,i)=><div key={i} className="mt-2 rounded-xl border border-blue-100 p-3"><button className="font-bold text-blue-900" onClick={()=>speak(e.english)}>{e.english} 🔊</button><p className="text-sm text-slate-500">{e.russian}</p></div>)}<h4 className="mt-5 font-bold">Проверь себя</h4>{l.questions.map((q,i)=><div key={i} className="mt-3 rounded-xl bg-blue-50 p-4"><p className="font-semibold">{i+1}. {q.question}</p><div className="mt-2 grid gap-2">{q.options.map(o=><button key={o} onClick={()=>setLessonAnswer(prev=>({...prev,[i]:o}))} className={`rounded-lg border p-2 text-left text-sm ${lessonAnswer[i]===o?"border-blue-600 bg-blue-200":"border-blue-100 bg-white"}`}>{o}</button>)}</div>{lessonAnswer[i]&&<p className="mt-2 text-sm">{lessonAnswer[i]===q.correctAnswer?"✅ Верно!":"❌ Верный ответ: "+q.correctAnswer}</p>}</div>)}<button className={`${primary} mt-4`} onClick={()=>awardTask("lesson")}>✓ Урок выполнен</button></div>})()}
          </section>}
          {tab==="writing"&&<section className={card}>{heading("✍️ Письменный тренажёр", "12 предложений — по одному на каждое время")}
            {!writingDone?<><p className="text-sm font-bold text-blue-700">Задание {writingIndex+1} из {writingExercises.length} · {writingExercises[writingIndex].tense}</p><p className="my-4 rounded-2xl bg-blue-50 p-5 text-lg font-bold">{writingExercises[writingIndex].ru}</p><textarea value={writingText} disabled={writingChecked} onChange={e=>setWritingText(e.target.value)} rows={3} placeholder="Напиши перевод на английском..." className="w-full rounded-xl border border-blue-200 p-4 outline-blue-500"/>{!writingChecked?<button disabled={!writingText.trim()} className={`${primary} mt-3`} onClick={()=>{if(normalize(writingText)===normalize(writingExercises[writingIndex].answer))setWritingScore(s=>s+1);setWritingChecked(true);}}>Проверить</button>:<div className="mt-4 rounded-2xl bg-blue-50 p-5"><p className="font-bold">{normalize(writingText)===normalize(writingExercises[writingIndex].answer)?"✅ Правильно!":"❌ Ответ отличается от образца"}</p><p className="mt-2">{writingExercises[writingIndex].answer} <button onClick={()=>speak(writingExercises[writingIndex].answer)}>🔊</button></p><p className="mt-2 text-sm text-slate-600">{writingExercises[writingIndex].explanation}</p><button className={`${primary} mt-4`} onClick={()=>{if(writingIndex===writingExercises.length-1){setWritingDone(true);finishTest("Письменный тест",writingScore+(normalize(writingText)===normalize(writingExercises[writingIndex].answer)?1:0),writingExercises.length,"writing");}else setWritingIndex(i=>i+1);setWritingText("");setWritingChecked(false);}}>Следующее →</button></div>}</>:<div className="rounded-2xl bg-blue-50 p-6"><h3 className="text-2xl font-extrabold">🎉 {writingScore} из {writingExercises.length}</h3><p className="mt-2">Результат сохранён в статистике</p><button className={`${primary} mt-4`} onClick={()=>{setWritingIndex(0);setWritingScore(0);setWritingDone(false);setWritingChecked(false);setWritingText("");}}>Пройти ещё раз</button></div>}
          </section>}
          {tab==="progress"&&<><section className={card}>{heading("🏆 Календарь, награды и XP", "Все достижения в одном разделе")}
            <div className="mb-5 grid grid-cols-3 gap-2">{[["⭐ XP",totalXp],["📆 Учебных дней",studiedDays],["🎯 Тестов",history.length]].map(([label,value])=><div key={label} className="rounded-2xl bg-blue-50 p-4 text-center"><div className="text-2xl font-extrabold text-blue-900">{value}</div><div className="text-xs text-blue-700">{label}</div></div>)}</div>
            <div className="flex items-center justify-between"><button className={secondary} onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}}>←</button><h3 className="text-lg font-bold text-blue-950">{new Date(year,month,1).toLocaleDateString("ru-RU",{month:"long",year:"numeric"})}</h3><button className={secondary} onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}}>→</button></div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">{["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(d=><div className="py-2 font-bold text-blue-800" key={d}>{d}</div>)}{Array.from({length:(new Date(year,month,1).getDay()+6)%7},(_,i)=><div key={`empty-${i}`}/>)}{Array.from({length:new Date(year,month+1,0).getDate()},(_,i)=>{const key=dateKey(new Date(year,month,i+1));const active=!!store[key]&&(store[key].checked.length>0||store[key].learned.length>0);return <div key={key} title={active?`Учебный день · ${store[key].xp} XP`:""} className={`rounded-xl py-3 ${key===todayKey?"ring-2 ring-blue-600": ""} ${active?"bg-blue-600 font-bold text-white":"bg-blue-50 text-blue-800"}`}>{i+1}</div>})}</div>
            <h3 className="mt-6 font-bold text-blue-950">🎖️ Награды</h3><div className="mt-3 grid gap-3 sm:grid-cols-3">{[["🌱 Первые шаги",50],["💎 Уверенный ученик",200],["👑 Мастер английского",500]].map(([label,needed])=><div key={label} className={`rounded-xl p-4 ${totalXp>=Number(needed)?"bg-sky-100 text-blue-950":"bg-slate-100 text-slate-400"}`}><div className="font-bold">{label}</div><div className="mt-1 text-xs">{totalXp>=Number(needed)?"Получена!":`Нужно ${needed} XP`}</div></div>)}</div>
          </section></>}
          {tab==="stats"&&<section className={card}>{heading("📊 Моя статистика", "История тестов и ежедневный прогресс")}
            <div className="grid gap-3 sm:grid-cols-3">{[["Выучено слов сегодня",todayData.learned.length],["Выполнено заданий",completed],["Всего тестов",history.length]].map(([label,value])=><div key={label} className="rounded-2xl bg-blue-50 p-5"><div className="text-3xl font-extrabold text-blue-900">{value}</div><div className="text-sm text-blue-700">{label}</div></div>)}</div>
            <h3 className="mt-6 font-bold">История результатов</h3>{history.length===0?<p className="mt-3 text-slate-500">Пока нет завершённых тестов.</p>:<div className="mt-3 space-y-2">{[...history].reverse().slice(0,30).map((h,i)=><div key={i} className="flex justify-between gap-3 rounded-xl border border-blue-100 p-3 text-sm"><div><b>{h.kind}</b><div className="text-slate-500">{h.date}</div></div><span className="font-bold text-blue-900">{h.correct}/{h.total} · {Math.round(h.correct/h.total*100)}%</span></div>)}</div>}
          </section>}
        </div>
      </div>
      <footer className="py-8 text-center text-xs text-blue-500">My English · Учись в своём темпе 💙 · Прогресс хранится в этом браузере</footer>
    </div>
  </main>;
}
