/* eslint-disable no-template-curly-in-string */
import React, {Component} from "react";
import SearchMovie from "../SearchMovie";
import "./index.css";
let numeral = require("numeral");
let backDropIMG;


class MoviePage extends Component{
    constructor(props){
        super(props)
        this.state={
            movieData:{},
            movieID:157336,
           // movieID:568124,568124
        }
    }

    onChangeSearchInput = (event)=> {
        this.setState({
          searchInput: event.target.value,
        })
    }

    componentDidMount(){
        this.getMovieData();
    }


    getMovieData=async()=>{
        const {movieID} = this.state
        const apiUrl=`https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`;
        //https://api.themoviedb.org/3/search/movie?query=encanto&api_key=cfe422613b250f702980a3bbf9e90716

        const response = await fetch(apiUrl);
        const fetchedData = await response.json()
       // console.log(fetchedData)
        const updatedData={
                movieID: fetchedData.id,
                originalTitle: fetchedData.original_title.toUpperCase(),
                tagLine: fetchedData.tagline,
                overView: fetchedData.overview,
                homePage: fetchedData.homepage,
                poster: fetchedData.poster_path,
                production: fetchedData.production_companies,
                productionCountries: fetchedData.production_countries,
                genre: fetchedData.genres,
                release: fetchedData.release_date,
                vote: fetchedData.vote_average,
                runTime: fetchedData.runtime,
                revenue: fetchedData.revenue,
                backDrop: fetchedData.backdrop_path
            }
            //console.log(updatedData)
            this.setState({
                movieData : updatedData,
            })
           
    }
   
    renderMovieSearch=()=>{
        const {movieData}= this.state
        
        let posterIMG='https://image.tmdb.org/t/p/w500'+movieData.poster,
            production=movieData.production,
            productionList = nestedDataToString(production),
            genre = movieData.genre,
            genresList = nestedDataToString(genre),
            NoData="-",
            date = new Date(movieData.release);
            let releaseDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
            totalRevenue=movieData.revenue;
           backDropIMG = 'https://image.tmdb.org/t/p/original' + movieData.backDrop;
           //backDropIMG= movieData.backDrop; 

            if (totalRevenue === 'undefined' || totalRevenue === 0) {
                totalRevenue = NoData
            } else {
                totalRevenue = numeral(movieData.revenue).format('($0,0)');
            };
    
            if (movieData.vote === 'undefined' || movieData.vote === 0) {
                movieData.vote = NoData
            };
    
            if(movieData.poster== null){
                posterIMG = 'https://res.cloudinary.com/ramya44/image/upload/v1655116427/images_uok8sy.jpg';
            }
    
        return(
            <div className="Movie-card">
                    <img  className="poster" src={posterIMG} alt="poster"/>
                <div className="movie-data">
                    <h1 className="title">{movieData.originalTitle}</h1>
                    <span className="tag">{movieData.tagLine}</span>
                    <p>{movieData.overView}</p>
                    <div className="update">
                        <span className="genre">{genresList}</span><br/>
                        <p>{productionList}</p>
                        <div className="release">
                            <div className="box">
                            <div>Original Release:<br/><span className="data">{releaseDate}</span></div>
                            <div>Box Office:<br/><span className="data">{totalRevenue}</span></div>
                            </div>
                            <div className="box">
                            <div>Vote Average:<br/><span className="data">{movieData.vote} / 10</span></div>
                            <div>Running Time:<br/><span className="data">{movieData.runTime} Mins</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
    componentDidUpdate() {
            document.body.style.backgroundImage = 'url(' + backDropIMG + ')';
    }
    
    
    render(){      
        return(
            <>
            <div className="search-container">
                <div className="logo container">
                        <a href="./"
                        title="ReactJS TMDb Movie Search">
                            <img className="logo" 
                            src="https://res.cloudinary.com/ramya44/image/upload/v1655112243/tmdb_hujjum.svg"
                            alt="The Movie Database"/>
                        </a>
                    </div>
                    <div className="search-box">
                        <SearchMovie />
                    </div>
                    <img src='https://res.cloudinary.com/ramya44/image/upload/v1655298594/forkme_right_green_007200_wfu1el.png' 
                className="git-image" alt="git"/>
             </div>
             <div>
            {this.renderMovieSearch()}
            </div>
            <footer>
            <span><a href="/" >Designed &amp; developed by Ramya </a> </span>
            <span><a href="/" >View Code</a></span>
            <span><a href="/" >Developer Google Play Store</a></span>
            <span><a href="/" >Developer Apple App Store</a></span>
          </footer>
             </>
        )
    }
}

function nestedDataToString(nestedData) {
    let nestedArray = [],
        resultString;
    if(nestedData !== undefined){
      nestedData.forEach(function(item){
        nestedArray.push(item.name);
      });
    }
    resultString = nestedArray.join(', '); 
    return resultString;
  };


export default MoviePage