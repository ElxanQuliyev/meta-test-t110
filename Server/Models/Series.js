class Series{
    constructor(id,data,SeasonName,lang){
    this.id=id
    this.audios=data.audios
    this.subtitles=data.subtitles
    this.trailers=data.trailers
    this.name=data.language.find(m=>m.lang_code==lang).name
    this.description=data.language.find(m=>m.lang_code==lang).description
    this.main_picture=data.main_picture
    this.url=data.url
    this.add_date=data.add_date.toDate()
    this.season_name=SeasonName
    }
}

module.exports=Series