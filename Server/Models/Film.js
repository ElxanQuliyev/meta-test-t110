class Content{
    constructor(id,data,categories,direstors,actors,ContentType,lang){
      this.id=id
      this.platform=data.platform
      this.name=data.language.find(x=>x.lang_code==lang).name
      this.description=data.language.find(x=>x.lang_code==lang).description
      this.categories=categories
      this.age=data.age
      this.actors=actors
      this.directors=direstors
      this.main_picture=data.main_picture
      this.slider_image=data.slider_image
      this.add_date=data.add_date.toDate()
      this.is_slider=data.is_slider
      this.is_featured=data.is_featured
      this.content_date=data.content_date
      this.modified_on=data.modified_on.toDate()
      this.hit=data.hit
      this.type=data.type
      this.imdb=data.imdb
      this.content_type=ContentType.language.find(x=>x.lang_code==lang).name
      this.url=data.url
      this.trailers=data.trailers
      this.subtitles=data.subtitles
      this.audios=data.audios
      this.comments=data.comments
    }
}

module.exports=Content