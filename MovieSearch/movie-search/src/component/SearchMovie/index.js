/* eslint-disable react/jsx-no-duplicate-props */
import {Component} from "react";
import "./index.css";

class SearchMovie extends Component{
    constructor(props){
        super(props)
        this.state={
            searchInput:"",
            searchData:{},
            }
    }

    onChangeSearchInput = event => {
        this.setState({
          searchInput: event.target.value
        })
      }

    componentDidMount(){
        this.getResult();
    }

        
    getResult= async (event)=>{
        const {searchInput}= this.state
        //console.log(searchInput,"hril")
        let apiUrl=`https://api.themoviedb.org/3/search/movie?query=${searchInput}&api_key=cfe422613b250f702980a3bbf9e90716`
        //console.log(apiUrl);
        const response = await fetch(apiUrl);
        const fetchedData = await response.json()
        //console.log(fetchedData)
        const data=fetchedData.results.map(each=>({
            movieID:each.id,
            movieName:each.original_title
        }))
        //console.log(data)
        console.log(...data, "ereg")
        this.setState({
            searchData:[...data]
        }) 

    }


    renderDropDown=()=>{
        const {searchData,searchInput}= this.state
        let {movieID,movieName} = searchData
        if (searchInput !==""){
            return(
                <select id="value">
                    <option key={movieID}>{movieName}</option>
                </select>
            )
        }
       
    }


    render(){
        const {searchInput} =  this.state
        return(
            <>
                <input 
                    className="search-input"
                    type="text"
                    placeholder="Search Movie Title..."
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                    onClick={this.getResult}
                    onKeyDown={this.renderDropDown()}
                    id="input"/>
            </>
        )
    }

}



export default SearchMovie