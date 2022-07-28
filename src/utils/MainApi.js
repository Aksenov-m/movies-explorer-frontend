const onError = (res) => {
  if (res.ok) {
    return res.json()
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`)
}

export class Api {
  constructor(options) {
    // тело конструктора
    this._url = options.baseUrl
    this._headers = options.headers
  }

  // возвращает все сохранённые текущим  пользователем фильмы
  getSavelMoviesCards() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(onError)
  }

  // Сохранение нового фильма (добавление в избранное)
  saveMoviesCard(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        country: `${
          data.country === null ? 'Страна не известна' : data.country
        }`,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co/${data.image.url}`,
        trailerLink: `${
          data.trailerLink === null ? 'none' : 'https://www.youtube.com/'
        }`,
        thumbnail: `${
          data.image.formats.thumbnail.url === null
            ? 'https://movies-aksenov.nomoredomains.xyz/notFound'
            : `https://api.nomoreparties.co/${data.image.formats.thumbnail.url}`
        }`,
        nameRU: `${data.nameRU === '' ? 'none' : data.nameRU}`,
        nameEN: `${data.nameEN === '' ? 'none' : data.nameEN}`,
        movieId: data.id,
      }),
    }).then(onError)
  }

  // возвращает информацию о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(onError)
  }

  // Редактирование профиля
  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(onError)
  }

  // Удаление фильма
  deleteCard(data) {
    return fetch(`${this._url}/movies/${data._id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(onError)
  }
}

// создание экземпляра класса Api
const api = new Api({
  baseUrl: 'https://api.movies-aksenov.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
