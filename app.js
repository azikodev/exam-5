var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {

  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }

  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }

});

const baseUrl = 'https://dummyapi.io/data/v1/';
const apiKey = '65cb39a156458e46717c58c8';

fetch(baseUrl + 'post', {
  headers: {
    'app-id': apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    renderCards(data.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function renderCards(data) {
  const cards = document.querySelector('.cards');
  console.log(data);
  data.forEach(item => {
    const card = createCard(item);
    cards.append(card);
  });
}

function createCard(item) {
  const card = document.createElement('div');
  card.classList.add('cardPost', 'border', 'border-gray-300', 'rounded-md', 'overflow-hidden');

  const image = item.image ? `<img src="${item.image}" alt="${item.text}" class="w-full h-40 image-for-rs">` : '';
  const cardTitle = item.text.length > 50 ? item.text.substring(0, 50) + '...' : item.text;

  card.innerHTML = `
  ${image}
  <div class="p-4">
  <h3 class="text-lg  font-semibold dark:text-white">${cardTitle}</h3>
  <p class="text-sm text-gray-500 ">${item.owner.firstName} ${item.owner.lastName}</p>
  <form class="delete-form">
  <button  class="text-red-500 delete-btn  text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2 ">Delete</button>
  </form>
  <a href="details.html?id=${item.id}" class="text-blue-500 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Details =></a>
  </div>
  `;
  card.querySelector('.delete-btn').addEventListener('click', () => {
    deleteCard(item.id);
  });
  // renderCards().finally(() => {
  //   document.querySelector('.loader-container').style.display = 'none';
    //   document.querySelector('.baseContainer').style.display = 'block';
    // });

    return card;
  }

  function deleteCard(id) {

    fetch(baseUrl + 'post/' + id, {
    method: 'DELETE',
    headers: {
      'app-id': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Card deleted:', data);
      const cardToDelete = document.querySelector(`[data-id="${id}"]`);
      cardToDelete.remove();
    })
    .catch(error => {
      console.error('Error deleting card:', error);
    });
}
