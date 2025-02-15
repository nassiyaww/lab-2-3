import axios from 'axios';

export async function searchVacancies() {
  const query = document.getElementById('search').value;
  const url = `https://api.hh.ru/vacancies?text=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    const vacanciesDiv = document.getElementById('vacancies');
    vacanciesDiv.innerHTML = '';

    data.items.forEach(vacancy => {
      const vacancyElement = document.createElement('div');
      vacancyElement.className = 'vacancy';
      vacancyElement.innerHTML = `
        <h3><a href="${vacancy.alternate_url}" target="_blank">${vacancy.name}</a></h3>
        <p><strong>Компания:</strong> ${vacancy.employer.name}</p>
        <p><strong>Город:</strong> ${vacancy.area.name}</p>
        <p><strong>Зарплата:</strong> ${vacancy.salary ? (vacancy.salary.from ? vacancy.salary.from : '') + ' - ' + (vacancy.salary.to ? vacancy.salary.to : '') + ' ' + vacancy.salary.currency : 'Не указана'}</p>
      `;
      vacanciesDiv.appendChild(vacancyElement);
    });
  } catch (error) {
    console.error('Ошибка загрузки вакансий:', error);
  }
}
