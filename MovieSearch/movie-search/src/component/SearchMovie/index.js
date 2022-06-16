/* eslint-disable react/jsx-no-duplicate-props */
import {Component} from "react";
import "./index.css";

class SearchMovie extends Component{
    constructor(props){
        super(props)
        this.state={
            searchInput:"",
            searchData:"",
            }
        //const {renderMovieSearch}= this.props
        
    }

    onChangeSearchInput = event => {
        this.setState({
          searchInput: event.target.value
        })
      }

    componentDidMount(){
        this.getResult();
        //this.state.searchData.map((item,key)=>(console.log(item)))
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
        const result = Object.keys(data).map((key) =>(data)[key]);
        console.log(result);
        this.setState({
            // ...this.state, 
             searchData:result
        })

        console.log(this.state,"defr")
        // const arrayOfLists = result.map(
        //     item => <li key={item.movieID}>{item.movieName}</li>
        //     )
        // return arrayOfLists;
        // return(
        // <select>
        //     {result.map(item => (
        //         <option
        //                 key={item.movieID}>{item.MovieName}</option>
        //             ))}
        // </select>
        // )
    }
    // componentDidUpdate(){
    //     this.state.searchData.map((item)=>(console.log(item)))
    // }

    
    render(){
        const {searchInput} =  this.state
        // const {renderMovieSearch}=this.props
        console.log(this.state,"defr");
        
        return(
            <>
                {/* <form onSubmit={this.getResult()}> */}
                <form>
                <input 
                    className="search-input"
                    type="text"
                    placeholder="Search Movie Title..."
                    onChange={this.onChangeSearchInput}
                    value={searchInput}
                    onClick={this.getResult} 
                    id="input"/>
                    {/* <select>
                        {searchData.length? searchData.map((item,key)=>(
                                <option key={item.movieID}>{item.MovieName}</option>
                        )): {renderMovieSearch()}}
                    </select> */}
                </form>
            </>
        )
    }

}



export default SearchMovie