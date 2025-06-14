let articles = {}
const videos = []

class TranscriptNavigation{
  constructor(obj = {el: null, url: null}){
    console.log(obj)

    const video = document.createElement("video");
    video.classList.add("introduction-video")
    video.src = obj.url;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
  

    obj.el.appendChild(video);

    
    // console.log(obj)

    // const video = document.createElement("video");
    // video.classList.add("introduction-video","video-js","vjs-default-skin")
    // video.controls = true
    // video.autoplay = true
    // video.muted = true
    // video.preload="auto"
    // video.width="640"
    // video.height="360"
    // video.id="my-video"
    // video["data-setup"]='{}'

    // const source = document.createElement("source")
    // console.log(source)
    // video.appendChild(source)

    // setTimeout(() => {
    //   source.src = obj.url
    //   source.type="video/mp4"
		// }, 10)
    // setTimeout(() => {
    //   const player = new videojs('my-video')
		// }, 20)


    // obj.el.appendChild(video);

    // this.meterData = {
    //   area: document.querySelector(`.step-meter .meter-out`),
    //   bar: document.querySelector(`.step-meter .meter-out .meter-in`)
    // }
    // this.step_time_meter = new metar({
    //   id: this.meterData.area,
    //   el: this.meterData.bar,
    //   start: this.stepStartTime[index],
    //   end: this.stepStartTime[index+1],
    //   value: this.stepStartTime[index],
    //   dx: 10,
    //   constSet: true,
    //   callbackfunc: {func1: this, func2: "meter"},
    //   count_Disp: false,
    // })
  }
}

// const articles = Array.from(document.querySelectorAll(".Transcript-Navigation")).map(e => e.parentElement)
// const videos = []

// console.log(articles)
// articles.forEach((e, i)=>{
//   videos.push(new TranscriptNavigation(e))
// })
const works = document.querySelector("#works")

const temp_art = document.createElement("article")
const temp_h = document.createElement("h3")
const temp_p = document.createElement("p")
// temp_art.appendChild(_h)
// temp_art.appendChild(_p)

temp_h.innerText = "作品"
temp_p.innerText = "概要・説明文"

fetch(`${window.location.href}/contents.json`)
  .then(response => response.json())
  .then(data => {
    articles = data
    createArticles()
    // const container = document.getElementById('content');

    // data.forEach(item => {
    //   const article = document.createElement('article');

    //   const title = document.createElement('h2');
    //   title.textContent = item.title;

    //   const content = document.createElement('p');
    //   content.textContent = item.content;

    //   article.appendChild(title);
    //   article.appendChild(content);
    //   container.appendChild(article);
    // });
  })
  .catch(error => {
    console.error('読み込み失敗:', error);
  });

  function createArticles(){
    articles.article.forEach((_art, i) => {
      let isText = false

      const art = temp_art.cloneNode(true)
      const h = temp_h.cloneNode(true)
      const p = temp_p.cloneNode(true)

      art.appendChild(h)
      art.appendChild(p)

      h.innerText = _art.title
      const text = _art.explanation.map(e => e.text)

      if(_art.navigation && _art.video){
        p.innerHTML = "<span>"+text.join("</span><span>")+"</span>"
        isText = true

        videos.push(new TranscriptNavigation({
          el: art,
          url: _art.video_url
        }))
      }

      if(!_art.navigation && _art.video){
        videos.push(new TranscriptNavigation({
          el: art,
          url: _art.video_url
        }))
      }

      if(_art.image){
        const img = document.createElement("img")
        img.classList.add("introduction-img")
        img.src = _art.image_url
        art.appendChild(img)
      }

      if(!isText){
        p.innerHTML = text.join("")
      }

      

      works.appendChild(art)
    })
  }