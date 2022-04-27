const db = require("../db");
const {
  getFirestore,
  query,
  Timestamp,
  collection,
  getDoc,
  documentId,
  getDocs,
  doc,
  where,
  updateDoc,
  addDoc,
  getDocFromCache,
} = require("firebase/firestore");
const TwShow = require("../Models/twShow");
const Validator = require("validatorjs");
const Autherize = require("../middlewares/Auth");
const helper = require("../Helper/Validation");
const Serie = require("../Models/Series");
const Season = require("../Models/Season");
const BaseError = require("../errorhandle/baseError");
const httpstatus = require("http-status");

const GetById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const lang = req.params.lang;
    let user;
    var Auth = false;
    let status = 200;
    const token = req.headers["x-access-token"];
    let userquery = await Autherize.authen(token);
    if (userquery != null) {
      user = userquery;
      Auth = true;
    }
    let snap;
    try {
      snap = await getDocFromCache(doc(db, "Content", id));
      console.log("cacheden oxundu");
    } catch (error) {
      snap = await getDoc(doc(db, "Content", id));
    }

    let data = snap.data();

    //  let seriesid=[];
    // References
    const Seasons = [];
    const snapseason = query(
      collection(db, "Season"),
      where("tvShowId", "==", snap.id),
      where("is_deleted", "==", false)
    );
    await getDocs(snapseason).then((response) => {
      response.forEach((x) => {
        Seasons.push(x);
      });
      return response;
    });

    // const snapseries = query(collection(db, "Series"),where(documentId(),'in',seriesid),where('IsDeleted','==',false));
    // const Series = await getDocs(snapseries);
    const categoryids = query(
      collection(db, "Category"),
      where(documentId(), "in", data.categories),
      where("is_deleted", "==", false)
    );
    const category = await getDocs(categoryids);

    const actorref = query(
      collection(db, "Actor"),
      where(documentId(), "in", data.actors),
      where("is_deleted", "==", false)
    );
    const Actors = await getDocs(actorref);

    const directorsids = query(
      collection(db, "Directors"),
      where(documentId(), "in", data.directors),
      where("is_deleted", "==", false)
    );
    const Directors = await getDocs(directorsids);
    // console.log(category.size+Actors.size+Directors.size+Seasonsref.size)

    const twshower = [];

    await Promise.all(
      Seasons.map(async (i) => {
        const season = new Season(i.id, i.data());
        if (i.data().series.length != 0) {
          const snapseries = query(
            collection(db, "Series"),
            where(documentId(), "in", i.data().series),
            where("is_deleted", "==", false)
          );

          await getDocs(snapseries).then((response) => {
            response.forEach((a) => {
              const series = new Serie(a.id, a.data(), a.name, lang);
              switch (data.claims) {
                case "Free":
                  if (user == null) {
                    status = 300;
                    series.url = null;
                  } else if (user.is_block) {
                    status = 303;
                    series.url = null;
                  } else if (!user.confirm_email) {
                    status = 304;
                    series.url = null;
                  }
                  break;
                case "Subscriber" || "Pro":
                  if (user == null) {
                    status = 300;
                    series.url = null;
                  } else if (user.is_block) {
                    status = 303;
                    series.url = null;
                  } else if (!user.confirm_email) {
                    status = 304;
                    series.url = null;
                  } else if (!user.claims.includes(data.claims)) {
                    status = 301;
                    series.url = null;
                  }
                  break;
                default:
                  break;
              }
              season.series.push(series);

            });
          });
        }
        twshower.push(season);
      })
    );
    const show = new TwShow(
      snap.id,
      data,
      category,
      Actors,
      Directors,
      twshower,
      lang
    );
    res.send({ status: status, auth: Auth, data: show });
  } catch (error) {
    next(
      new BaseError(
        httpstatus.BAD_REQUEST,
        error.message,
        "TvShowController/GetById"
      )
    );
  }
};

const GetByIdLang = async (req, res, next) => {
  try {
    const id = req.params.id;
    const lang = req.params.lang;
    let user;
    const token = req.headers["x-access-token"];
    let userquery = await Autherize.authen(token);
    if (userquery != null) {
      user = userquery;
      Auth = true;
    }

    const userref = collection(db, "User");
    const snap = await getDoc(doc(db, "Content", id));
    let data = snap.data();
    let seriesid = [];
    data.seasons.forEach((x) => {
      x.series.forEach((a) => {
        seriesid.push(a);
      });
    });
    const snapseries = query(
      collection(db, "Series"),
      where(documentId(), "in", seriesid),
      where("is_deleted", "==", false)
    );
    const Series = await getDocs(snapseries);
    const categorys = query(
      collection(db, "Category"),
      where(documentId(), "in", data.categories),
      where("is_deleted", "==", false)
    );
    const category = await getDocs(categorys);

    const actorsids = query(
      collection(db, "Actors"),
      where(documentId(), "in", data.actors),
      where("is_deleted", "==", false)
    );
    const Actors = await getDocs(actorsids);

    const directorsids = query(
      collection(db, "Directors"),
      where(documentId(), "in", data.directors),
      where("is_deleted", "==", false)
    );
    const Directors = await getDocs(directorsids);
    const Directorlist = [];
    Directors.forEach((z) => {
      const director = {
        id: z.id,
        name: z.data().name,
        picture: z.data().picture,
      };
      Directorlist.push(director);
    });

    const Actorlist = [];
    Actors.forEach((z) => {
      const actor = {
        id: z.id,
        name: z.data().name,
        picture: z.data().picture,
      };
      Actorlist.push(actor);
    });

    let categoryList = [];
    category.forEach((z) => {
      const cate = {
        id: z.id,
        name: z.data().language.find((x) => x.lang_code == lang).name,
      };
      categoryList.push(cate);
    });

    const twshower = [];
    data.seasons.forEach((z) => {
      const season = {
        id: z.id,
        name: z.name,
        main_picture: z.main_picture,
        trailers: z.trailers,
        series: [],
      };
      z.series.forEach((a) => {
        Series.forEach((x) => {
          if (x.id == a) {
            const series = {
              id: x.id,
              audios: x.data().audios,
              subtitles: x.data().subtitles,
              trailers: x.data().trailers,
              name: x.data().language.find((m) => m.lang_code == lang).name,
              description: x.data().language.find((m) => m.lang_code == lang)
                .description,
              main_picture: x.data().main_picture,
              url: x.data().url,
              add_date: x.data().add_date.toDate(),
              modified_on: x.data().modified_on.toDate(),
              //    comments:x.data().comments,
              //    season_id:x.season_id
            };
            const question = user;
            if (data.platform == "Netflix") {
              if (question == null) {
                series.url = null;
              } else if (question.is_block) {
                series.url = null;
              } else {
                const Claims = question.claims.includes(data.claims);
                if (!Claims) {
                  series.url = null;
                }
              }
            }
            // x.data().comment.forEach(t=>{
            //     comentuser.forEach(r=>{
            //         if (r.id==t.userid) {
            //             series.comments.push(
            //             {
            //              name: r.data().name,
            //              text: t.text
            //             })
            //         }
            //     })
            // })
            season.series.push(series);
          }
        });
      });
      twshower.push(season);
    });
    const show = new TwShow(
    //   data.language.find((x) => x.lang_code == lang).name,
    //   data.language.find((x) => x.lang_code == lang).description,
      categoryList,
      data.age,
      Actorlist,
      Directorlist,
      data.main_picture,
      data.slider_image,
      data.add_date.toDate(),
      data.content_date,
      data.modified_on.toDate(),
      data.hit,
      data.type,
      data.imdb,
      twshower
    );
    throw res.send(show);
  } catch (error) {
    next(
      new BaseError(
        httpstatus.BAD_REQUEST,
        error.message,
        "TvShowController/GetByIdLang"
      )
    );
  }
};

const add = async (req, res, next) => {
  try {
    const data = req.body;

    const Languageref = collection(db, "Language");
    const Languagelist = await getDocs(Languageref);

    let answer = helper.language(data.language, Languagelist);
    if (!answer) throw new Error("Diller yalnis qeyd olunub");

    let ages = new Validator(
      {
        content_date: data.content_date,
        is_slider: data.is_slider,
        is_featured: data.is_featured,
        main_picture: data.main_picture,
        slider_image: data.slider_image,
        claims: data.claims,
        actors: data.actors,
        directors: data.directors,
        slider_image: data.slider_image,
        trailers: data.trailers,
        age: data.age,
        catalogs: data.catalogs,
        platform: data.platform,
        content_types: data.content_type,
      },
      {
        content_date: "required",
        is_slider: "required|boolean",
        is_featured: "required|boolean",
        main_picture: "required",
        slider_image: "required",
        claims: "required",
        actors: "required|array",
        directors: "required|array",
        slider_image: "required|string",
        trailers: "required|array",
        age: "required",
        catalogs: "required|array",
        platform: "required|string",
        content_types: "required|string",
      }
    );
    ages.fails(() => {
      throw new Error(ages.errors.errors);
    });

    await addDoc(collection(db, "Content"), {
      actors: data.actors,
      directors: data.directors,
      language: data.language,
      content_date: data.content_date,
      categories: data.categories,
      main_picture: data.main_picture,
      slider_image: data.slider_image,
      trailers: data.trailers ?? [],
      is_slider: data.is_slider,
      age: data.age,
      is_featured: data.is_featured,
      is_deleted: false,
      imdb: data.imdb ?? "",
      add_date: new Date(),
      modified_on: new Date(),
      claims: data.claims,
      catalogs: data.catalogs,
      hit: 0,
      type: "Tvshow",
      platform: data.platform,
      content_type: data.content_type,
      price: data.price ?? 0,
      seasons: [],
    });
    res.send(`əlavə olundu`);
  } catch (error) {
    next(
      new BaseError(httpstatus.FORBIDDEN, error.message, "TvShowController/add")
    );
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const Languageref = collection(db, "Language");
    const Languagelist = await getDocs(Languageref);

    let answer = helper.language(data.language, Languagelist);
    if (!answer) throw res.send("Diller yalnis qeyd olunub");

    const ages = new Validator(
      {
        content_date: data.content_date,
        is_slider: data.is_slider,
        is_featured: data.is_featured,
        main_picture: data.main_picture,
        slider_image: data.slider_image,
        claims: data.claims,
        actors: data.actors,
        directors: data.directors,
        slider_image: data.slider_image,
        trailers: data.trailers,
        age: data.age,
        catalogs: data.catalogs,
        platform: data.platform,
        content_type: data.content_type,
      },
      {
        content_date: "required",
        is_slider: "required|boolean",
        is_featured: "required|boolean",
        main_picture: "required",
        slider_image: "required",
        claims: "required",
        actors: "required|array",
        directors: "required|array",
        slider_image: "required|string",
        trailers: "required|array",
        age: "required",
        catalogs: "required|array",
        platform: "required|string",
        content_type: "required|string",
      }
    );
    ages.fails(() => {
      throw new Error(ages.errors.errors);
    });

    await updateDoc(doc(db, "Content", id), {
      actors: data.actors,
      directors: data.directors,
      language: data.language,
      content_date: data.content_date,
      categories: data.categories,
      main_picture: data.main_picture,
      slider_image: data.slider_image,
      trailers: data.trailers ?? [],
      is_slider: data.is_slider,
      age: data.age,
      is_featured: data.is_featured,
      is_deleted: false,
      imdb: data.imdb ?? "",
      modified_on: Date.now(),
      claims: data.claims,
      catalogs: data.catalogs,
      hit: 0,
      platform: data.platform,
      content_type: data.content_type,
      price: data.price ?? 0,
    });
    res.send(`əlavə olundu`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  GetById,
  add,
  update,
  GetByIdLang,
};
