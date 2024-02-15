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
const baseUrl = 'https://dummyapi.io/data/v1';
const appId = '65cb39a156458e46717c58c8';

function formatDate(dateTimeString) {
    const dt = luxon.DateTime.fromISO(dateTimeString);
    return dt.toFormat('dd-MM-yyyy HH:mm');
}

async function fetchPostDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const cardId = urlParams.get('id');
        if (!cardId) throw new Error('Card ID not provided.');

        const response = await axios.get(`${baseUrl}/post/${cardId}`, {
            headers: { 'app-id': appId }
        });
        const card = response.data;
        const baseContainer = document.querySelector('.baseContainer');
        const cardDetails = document.querySelector('.cardContainer');
        const image = card.image ? `<img src="${card.image}" class="w-full h-auto mb-4" alt="Post Image">` : '';
        cardDetails.innerHTML = `
                    ${image}
                    <h2 class="text-xl font-semibold mb-2">${card.text}</h2>
                    <p class="text-sm text-gray-500">Published by ${card.owner.firstName} ${card.owner.lastName} on ${formatDate(card.publishDate)}</p>
                    <p class="text-sm text-gray-500">Likes: ${card.likes}</p>
                    <p class="text-sm text-gray-500">Tags: ${card.tags[0]}</p>
                `;
        baseContainer.classList.add('loaded'); // Add loaded class to hide loader
    } catch (error) {
        console.error('Error fetching post details:', error);
    }
}

fetchPostDetails().finally(() => {
    document.querySelector('.loader-container').style.display = 'none';
    document.querySelector('.baseContainer').style.display = 'block';
});