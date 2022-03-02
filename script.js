const top250 = 'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=250&lang=Cn';
const searchApi = 'https://api.wmdb.tv/api/v1/movie/search?q=hello';
const form = document.getElementById('form');

async function getMovies(url) {
  const res = await fetch(url);
  const result = await res.json();
  showMovies(result);
}

getMovies(top250);

function showMovies(movies)
{
  //首屏空白加载  
  main.innerHTML = ''
  const mainContainer = document.querySelector('#main');

  movies.forEach(movie => {
    // console.log(movie);
    
    const { doubanRating,data,dateReleased } = movie;
    const movieEl = document.createElement('div')
          movieEl.classList.add('movie')
        
        movieEl.innerHTML = `
        <div class='img-container'>
          <img src=${data[0].poster} alt="">
        </div>
        <div class="movie-info">
          <h3>${data[0].name} (${setdateReleased(dateReleased)})</h3>
          <span class=${setColor(doubanRating)}>${doubanRating?doubanRating:'0.0'}</span>
        </div>
        <div class="overview">
          <h3>概览</h3>
          <div class="text">
          ${data[0].description}
          </div>
        </div>

    `
    // 在main中插入，电影卡片
    mainContainer.appendChild(movieEl);
  })
}

// 设置豆瓣评分颜色
function setColor(doubanRating) {
  const rating = parseFloat(doubanRating);
  if (rating >= 8) {
    return 'green';
  } else if (rating >= 6) {
    return 'orange';
  } else {
    return 'red'
  }
}

// 上映日期只截取年份
function setdateReleased(dateReleased){
    return dateReleased = dateReleased.slice(0,4)
}