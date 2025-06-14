class metar{
  constructor(data = {}){
    // id,el, f0, f1, value, constSet, callbackfunc, num = undefined,
    this.id = data.id
    this.el = data.el
    this.meter_on = false
    this.f0 = data.start
    this.f1 = data.end
    this.value = data.value
    this.maps = Math.abs(this.f1 - this.f0)
    this.dx = data.dx || Math.abs(data.end - data.start) / 10
    this.count_Disp = data.count_Disp
    this.callbackfunc = data.callbackfunc
    this._meterMode = true

    this.animationSet().then((res)=>{
      this.meterMode = false
      this.Update_Value_From_Bar(this.value)
    })

    this.touch_id = undefined
    this.touch = false
    
    if(this.count_Disp != false){
      this.count_Disp.dataset.value = Number.parseFloat(this.value).toFixed(1)
    }

    this.mousedown = (e)=>{
      // console.log(e.currentTarget)
      if(e.currentTarget !== this.id)  return
      if(this.meter_on) return
      // console.log("mousedown")
      this.meter_on=true
      this.meter_updata(e)
    }
    this.mouseup = (e)=>{
      if(!this.meter_on) return
      this.meter_on=false
    }
    this.mousemove = (e)=>{
      if(!e.currentTarget.tagName=="BODY")  return
      if(!this.meter_on) return
      this.meter_updata(e)
    }
    this.touchstart = (e)=>{
  // console.log(e.touches[0].target)
      if(!e.touches[0].target === this.id)  return
      if(this.meter_on) return

      this.meter_on=true
      this.touch = true
      this.touch_id = e.touches[0].identifier

      if(!e.touches.length > 1){
        this.touch = false
        return
      }

      this.meter_updata({clientX:e.touches[0].clientX})
      
    }
    this.touchend = (e)=>{
      if(e.changedTouches[0].identifier == this.touch_id){
        // console.log(`touch_id[${this.touch_id}] end[${e.changedTouches[0].identifier}]`)
        this.meter_on=false
        this.touch = false
        this.touch_id = undefined
      }
    }
    this.touchmove = (e)=>{
      if(!(this.meter_on &&  this.touch)) return 
      
      this.meter_updata({clientX:e.touches[0].clientX})
    }
    this.wheel = (e)=>{
      if(this.meter_on) return
      this.wheel_meter_updata(e)
    }
    
    this.id.addEventListener("mousedown", this.mousedown)

    document.addEventListener("mouseup", this.mouseup)

    document.addEventListener("mousemove", this.mousemove)

    this.id.addEventListener("touchstart", this.touchstart, {passive: true})

    document.addEventListener("touchend", this.touchend)

    document.addEventListener("touchmove", this.touchmove)
    
    this.id.parentElement.addEventListener("wheel", this.wheel, {passive: true})
  }
  get meterMode(){
    return this._meterMode
  }
  set meterMode(value){
 // console.log(`meterMode Set`, {value})
    this._meterMode = value
  }
  async animationSet(){
    await this.el.animate(
      [
        { maxWidth: '0%', offset: 0 },
        { maxWidth: '100%', offset: 1 }
      ],
      {
        duration: Math.abs(this.f1 - this.f0),
        iterations: 1,
        fill: "forwards" ,
      }
    ).ready.then((res)=>{
      // console.log(res)
      res.pause()
      res.currentTime=0
      this.anim = res
    })
    return
  }
  meter_updata(e){
    if(this.meterMode) return
    if(this.anim.playState == `running`)  this.anim.pause()

    const _percent = (e.clientX - this.id.getBoundingClientRect().left ) / this.id.offsetWidth
    const percent = Math.max(Math.min(_percent, 1), 0)
    // console.log({playState: this.anim.playState})

    this.anim.currentTime = (this.f1 - this.f0) * percent

    const fx = (this.f1 - this.f0) * percent + this.f0

    if(this.count_Disp != false)  this.count_Disp.dataset.value = Number.parseFloat(fx).toFixed(1)

    if(this.value != fx){
      this.value = fx
      // this.callbackfunc({id:this.id, value:this.value})
      this.callbackfunc.func1[this.callbackfunc.func2]({id:this.id, value:this.value})
    }
  }
  wheel_meter_updata(e){
    if(this.meterMode) return
    const b=this.id.children[0]
    const mi = Math.min(this.f0, this.f1), ma = Math.max(this.f0, this.f1)

    const wheel = Math.round(Math.max(Math.min(this.value - (e.wheelDeltaY>0?this.dx:-this.dx), ma), mi)/this.dx)*this.dx

    if(e.wheelDeltaY != 0 && this.value == wheel){
      // console.log("wheel_meter_updata 同じ")
      return
    }
      if(this.count_Disp != false)  this.count_Disp.dataset.value = Number.parseFloat(wheel).toFixed(1)

    this.value = wheel
    this.anim.currentTime = wheel - this.f0
    this.callbackfunc.func1[this.callbackfunc.func2]({id:this.id, value:this.value})
    // console.log({wheel, maxW, offsetWidth:this.id.offsetWidth, percent, maxW})
    // console.log({min:0, max:maxW, X, num:Math.max(Math.min(X, maxW), 0),fx})
  }
  Update_Bar_From_Value(){
    this.value = this.anim.currentTime + this.f0
    this.callbackfunc.func1[this.callbackfunc.func2]({id: this.id, value: this.value})
  }
  Update_Value_From_Bar(_value){
    const value = this.map(this.f0, this.f1, 0, this.maps, _value)
    this.anim.currentTime = value
    this.value = _value
 // console.log({_value, value})
  }
  animationPlay(_value, speed){
    const value = this.map(this.f0, this.f1, 0, this.maps, _value)
    this.anim.currentTime = value
    this.anim.playbackRate = speed
    this.anim.play()
    this.value = _value
  }
  animationPause(_value){
 // console.log(`neter animationPause`)
    const value = this.map(this.f0, this.f1, 0, this.maps, _value)
    this.anim.pause()
    this.anim.currentTime = value
    this.value = _value
  }
  map(a1, a2, b1, b2, value) {
    const da = a2 - a1
    const db = b2 - b1
    const sub = value - a1
    const percent = sub / da
    const valueB = db * percent + b1
  
    return valueB
  }
  removeEvent(){
    this.id.removeEventListener("mousedown", this.mousedown)
    document.removeEventListener("mouseup", this.mouseup)
    document.removeEventListener("mousemove", this.mousemove)
    this.id.removeEventListener("touchstart", this.touchstart)
    document.removeEventListener("touchend", this.touchend)
    document.removeEventListener("touchmove", this.touchmove)
    this.id.parentElement.removeEventListener("wheel", this.wheel)
    
    // console.log(`removeevent`)
  }
}
