let articles = {}
const videos = []

class TranscriptNavigation{
  constructor(obj = {el: null, url: null}){
    console.log(obj)

    const video = document.createElement("video")

    video.src = `${"https://ishizakitakayuki913.github.io/portfolio"}/${obj.url}`
    // video.src = `${window.location.origin}/${obj.url}`

    video.classList.add("introduction-video")
    video.controls = true
    video.autoplay = true
    video.muted = true
    video.height = "70%"
    // video.height = "70%"
  

    return video

    
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

// temp_art.appendChild(temp_div2)

fetch(`${window.location.origin}${window.location.pathname}contents.json`)
.then(response => response.json())
.then(data => {
  articles = data
  createArticles()
  createArticles2()
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

// career
// research
// works

function createArticles(){
  
  const works = document.querySelector("#works")

  const temp_caption =  document.createElement("div")
  temp_caption.innerText = "キャプション"
  temp_caption.classList.add("caption")

  const temp_art = document.createElement("article")
  const temp_div1 =  document.createElement("div")
  const temp_div2 =  document.createElement("div")
  temp_div2.classList.add("visual-div")


  const temp_img = document.createElement("img")
  temp_img.classList.add("introduction-img")

  const temp_h = document.createElement("h3")
  const temp_p = document.createElement("p")
  temp_h.innerText = "作品"
  temp_p.innerText = "概要・説明文"

  temp_div1.appendChild(temp_h)
  temp_div1.appendChild(temp_p)

  temp_art.appendChild(temp_div1)

  console.log(articles.works)

  articles.works.forEach((_art, i) => {
    let isText = false

    const art = temp_art.cloneNode(true)
    // const div = Array.from(art.querySelectorAll("div"))
    const h = art.querySelector("h3")
    const p = art.querySelector("p")
    
    const c = temp_caption.cloneNode(true)
      
    h.innerText = _art.title

    const text = _art.explanation.map(e => e.text)
    if(_art.navigation){
      p.innerHTML = "<span>"+text.join("</span><span>")+"</span>"
    }
    else{
      p.innerHTML = text.join("")
    }

    works.appendChild(art)

    console.log(_art.articles)
    _art.articles.forEach((arts, i) => {
      const _d = temp_div2.cloneNode(true)
      const _c = c.cloneNode(true)
      if(arts.type == "video"){
        _c.innerText = arts.caption

        const _v = new TranscriptNavigation({
          el: _d,
          url: arts.url
        })

        videos.push(_v)
        _d.appendChild(_v)

        _d.appendChild(_c)
        art.appendChild(_d)
      }
      else if(arts.type == "image"){
        const _i = temp_img.cloneNode(true)
        _i.src = arts.url
        _c.innerText = arts.caption
        
        _d.appendChild(_i)
        _d.appendChild(_c)
        art.appendChild(_d)
      }
    })

    // if(_art.navigation && _art.video.length>0){
    //   isText = true
    // }

    // if(!_art.navigation && _art.video){
    //   const _d = temp_div2.cloneNode(true)
    //   const _c = c.cloneNode(true)
    //   _c.innerText = _art.video_caption

    //   const _v = new TranscriptNavigation({
    //     el: _d,
    //     url: _art.video_url
    //   })
      
    //   videos.push(_v)
    //   _d.appendChild(_v)

    //   _d.appendChild(_c)
    //   art.appendChild(_d)
    // }

    // if(_art.image){

    //   const _url = _art.image_url.split(" ")

    //   _url.forEach(url => {
        
    //   })
    // }
  })
}


function createArticles2(){
  
  const works = document.querySelector("#research")

  const temp_caption =  document.createElement("div")
  temp_caption.innerText = "キャプション"
  temp_caption.classList.add("caption")

  const temp_art = document.createElement("article")
  const temp_div1 =  document.createElement("div")
  const temp_div2 =  document.createElement("div")
  temp_div2.classList.add("visual-div")


  const temp_img = document.createElement("img")
  temp_img.classList.add("introduction-img")

  const temp_h = document.createElement("h3")
  const temp_p = document.createElement("p")
  temp_h.innerText = "作品"
  temp_p.innerText = "概要・説明文"

  temp_div1.appendChild(temp_h)
  temp_div1.appendChild(temp_p)

  temp_art.appendChild(temp_div1)

  console.log(articles.research)

  articles.research.forEach((_art, i) => {
    let isText = false

    const art = temp_art.cloneNode(true)
    // const div = Array.from(art.querySelectorAll("div"))
    const h = art.querySelector("h3")
    const p = art.querySelector("p")
    
    const c = temp_caption.cloneNode(true)
      
    h.innerText = _art.title

    const text = _art.explanation.map(e => e.text)
    if(_art.navigation){
      p.innerHTML = "<span>"+text.join("</span><span>")+"</span>"
    }
    else{
      p.innerHTML = text.join("")
    }

    works.appendChild(art)

    console.log(_art.articles)
    _art.articles.forEach((arts, i) => {
      const _d = temp_div2.cloneNode(true)
      const _c = c.cloneNode(true)
      if(arts.type == "video"){
        _c.innerText = arts.caption

        const _v = new TranscriptNavigation({
          el: _d,
          url: arts.url
        })

        videos.push(_v)
        _d.appendChild(_v)

        _d.appendChild(_c)
        art.appendChild(_d)
      }
      else if(arts.type == "image"){
        const _i = temp_img.cloneNode(true)
        _i.src = arts.url
        _c.innerText = arts.caption
        
        _d.appendChild(_i)
        _d.appendChild(_c)
        art.appendChild(_d)
      }
    })

    // if(_art.navigation && _art.video.length>0){
    //   isText = true
    // }

    // if(!_art.navigation && _art.video){
    //   const _d = temp_div2.cloneNode(true)
    //   const _c = c.cloneNode(true)
    //   _c.innerText = _art.video_caption

    //   const _v = new TranscriptNavigation({
    //     el: _d,
    //     url: _art.video_url
    //   })
      
    //   videos.push(_v)
    //   _d.appendChild(_v)

    //   _d.appendChild(_c)
    //   art.appendChild(_d)
    // }

    // if(_art.image){

    //   const _url = _art.image_url.split(" ")

    //   _url.forEach(url => {
        
    //   })
    // }
  })
}