const Serie=require('../Models/Series')

class Season{
    constructor(id,data){
     this.id=id,
     this.name=data.Name,
     this.main_picture=data.MainPicture,
     this.trailers=data.trailers
     this.series=[]
    }
}

module.exports=Season