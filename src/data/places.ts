import type { Place } from '../types'

export const placesData: Place[] = [
  {
    id: 1,
    name: 'Музей Эрарта',
    category: 'Музеи',
    description: 'Крупнейший частный музей современного искусства в России. Выставки, инсталляции, кинозал и магазин дизайнеров.',
    address: 'Санкт-Петербург, 29-я линия ВО, 2',
    rating: 4.85,
    reviewsCount: 2340,
    price: undefined,
    image: 'https://images.unsplash.com/photo-1572883454114-efb5472467f2?w=600&q=80',
    reviews: [
      { id: 1, author: 'Мария С.', rating: 5, text: 'Потрясающий музей! Очень интересные экспозиции, можно провести весь день.', date: '2024-03-15' },
      { id: 2, author: 'Алексей К.', rating: 4, text: 'Современное искусство в лучшем виде. Рекомендую!', date: '2024-03-10' },
    ],
  },
  {
    id: 2,
    name: 'Парк Горького',
    category: 'Парки',
    description: 'Главный парк Москвы с прогулочными зонами, площадками, кафе и-events. Идеальное место для отдыха.',
    address: 'Москва, ул. Крымский Вал, 9',
    rating: 4.72,
    reviewsCount: 5621,
    price: undefined,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
    reviews: [
      { id: 1, author: 'Дмитрий В.', rating: 5, text: 'Отличный парк для прогулок! Красивые аллеи, много зелени.', date: '2024-03-12' },
      { id: 2, author: 'Ольга Н.', rating: 4, text: 'Хорошее место для семейного отдыха.', date: '2024-03-08' },
    ],
  },
  {
    id: 3,
    name: 'Золотые ворота',
    category: 'Достопримечательности',
    description: 'Памятник архитектуры XII века, единственные сохранившиеся ворота древнерусской крепости Владимира.',
    address: 'Владимир, ул. Большая Московская',
    rating: 4.91,
    reviewsCount: 1496,
    price: undefined,
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&q=80',
    reviews: [
      { id: 1, author: 'Игорь П.', rating: 5, text: 'Незабываемые впечатления! История в каждом камне.', date: '2024-03-08' },
      { id: 2, author: 'Елена Р.', rating: 5, text: 'Обязательно к посещению во Владимире!', date: '2024-03-05' },
    ],
  },
]
