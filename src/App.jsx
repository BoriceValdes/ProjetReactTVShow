import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import s from "./style.module.css";
import "./global.css"
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/logo/Logo";
import logo from "./assets/images/logo.png"
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";


export function App(){

  const [currentTVShow, setCurrentTVShow] = useState()
  const [recommendationList, setRecommendationList] = useState([])
  async function fetchPopulars(){
    try{
      const populars = await TVShowAPI.fetchPopulars()
      if(populars.length>0){
        setCurrentTVShow(populars[0])
      }
    }
    catch(error){
      alert("Erreur durant la recherche des serie populaires")
    }
  }
  async function fetchRecommendations(tvShowId){
    try{
      const recommendations = await TVShowAPI.fetchRecommendations(tvShowId)
      if(recommendations.length>0){
        setRecommendationList(recommendations.slice(0,10))
      }
    }catch(error){
      alert("Erreur durant la recherche des recommendations")
    }
  }
  async function searchTVShow(tvShowName){
    try{

      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName)
      if(searchResponse.length>0){
        setCurrentTVShow(searchResponse[0])
      }
    }
    catch(error){
      alert("Erreur durant la recherche des series")
    }
  }

  useEffect(()=>{
    fetchPopulars()
  },[])

  useEffect(()=>{
    if(currentTVShow){
      fetchRecommendations(currentTVShow.id)
    }
  },[currentTVShow])

  console.log("***",recommendationList)
  return (
    <div className={s.main_container}
    style={{background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`:  "black"}}>
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <div><Logo image={logo} title="WatiWatch" subtitle="Find a show you may like" /></div>
          </div>
          <div className="col-sm-12 col-md-4">
            {<SearchBar onSubmit={searchTVShow}/>}
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        { currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommendations}>
        { recommendationList &&
         recommendationList.length > 0 &&
          <TVShowList onClickItem={setCurrentTVShow} tvShowList={recommendationList} />}          
      </div>
    </div>
  );
}