const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Мира Цветкова',
  'Владимир Потапов',
  'Никита Ковалев',
  'Георгий Волков',
  'Арсений Куликов',
  'Матвей Антонов',
  'Андрей Нестеров',
  'Лев Андреев',
  'Елизавета Жукова',
  'София Корнилова',
  'Александр Петров',
  'Максим Воронин',
  'Юлия Зорина',
  'Лев Мартынов',
  'Яна Иванова',
  'Лидия Максимова',
  'Екатерина Ильина',
  'Елизавета Кузьмина',
  'Ангелина Гусева',
  'Глеб Новиков',
  'Степан Архипов',
  'Юрий Николаев',
  'Милана Нестерова',
  'Милана Ермакова',
  'Елена Вавилова',
  'Виктория Шевцова',
  'Ксения Герасимова',
  'Мария Васильева',
  'Максим Волков',
  'Давид Синицын',
  'Маргарита Кочетова',
  'Милана Сазонова',
  'Алиса Виноградова',
  'Николь Ковалева',
  'Алексей Иванов',
  'Варвара Сидорова',
  'Константин Поляков',
  'Вероника Давыдова',
  'Николь Моисеева',
  'Сергей Белоусов',
  'Богдан Скворцов',
  'Иван Беликов',
  'Давид Митрофанов',
  'Никита Михеев',
  'Тимур Петров',
  'Марк Киселев',
  'Александра Воронцова',
  'Майя Лукина',
  'Григорий Филиппов',
  'Алина Никонова'
];
const DESCRIPTIONS = [
  'Красивый вид',
  'Указатель',
  'Море',
  'Красивая девушка',
  'Еда',
  'Дорогая машина',
  'Диета',
  'Морс',
  'Пролетающий самолет',
  'Удачная покупка',
  'Небо',
  'Новая машина',
  'Перекус',
  'Смешной кот',
  'Отдыхаю',
  'В небесах',
  'На концерте',
  'Ретро машина',
  'Ночь',
  'Пальмы',
  'Обед',
  'Закат',
  'Краб',
  'На тусовке',
  'Сафари'
];
const PHOTO_OBJECTS_COUNT = 25;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createUniqueId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateCommentId = createUniqueId(1, 9999);
const generatePhotoId = createUniqueId(1, 25);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: DESCRIPTIONS[photoId - 1],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };
};

Array.from({length: PHOTO_OBJECTS_COUNT}, createPhotoDescription);
