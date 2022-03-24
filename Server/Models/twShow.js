class TwShow{
    constructor(id,data,category,actors,directors,season,lang){
        this.id=id
        this.name= data.language.find((x)=>x.lang_code==lang).name,
        this.description= data.language.find((x)=>x.lang_code==lang).description,
        this.categories=[]
        this.age=data.age
        this.actors=[]
        this.directors=[]
        this.main_picture=data.main_picture
        this.slider_image=data.slider_image
        this.trailers=data.trailers
        this.add_date=data.add_date.toDate()
        this.content_date=data.content_date
        this.modified_on=data.modified_on.toDate()
        this.hit=data.hit
        this.type=data.type
        this.imdb=data.imfb
        this.seasons=season;
        actors.forEach(z=>{
            const actor={
                id:z.id,
                name:z.data().name,
                picture:z.data().picture
            }
           this.actors.push(actor)
        })
        directors.forEach(z=>{
            const director={
                id:z.id,
                name:z.data().name,
                picture:z.data().picture
            }
           this.directors.push(director)
        })
        category.forEach(z=>{
            const categoryref={
                id:z.id,
                name:z.data().language.find(x=>x.lang_code==lang).name,
            }
           this.categories.push(categoryref)
        })
    }
}

module.exports=TwShow