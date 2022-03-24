class Series{
    constructor(id,data,SeasonName,lang){
    this.id=id
    this.audios=data.Audios
    this.subtitles=data.Subtitles
    this.trailers=data.trailers
    this.name=data.Language.find(m=>m.LangCode==lang).Name
    this.description=data.Language.find(m=>m.LangCode==lang).Description
    this.main_picture=data.MainPicture
    this.url=data.Url
    this.add_date=data.AddDate.toDate()
    this.season_name=SeasonName
    }
}

module.exports=Series