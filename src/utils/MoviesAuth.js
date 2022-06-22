export const BASE_URL = "https://api.movies-aksenov.nomoredomains.xyz";

// регистрация пользователя
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((response) => response.json());
};

export const authorize = (name, email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        return data;
      } else {
        return;
      }
    });
};

// отправляем запрос на роут аутентификации
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
