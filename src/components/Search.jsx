
function Search(){
  function search(formData){
    console.log("searching..!");
    console.log(formData.get("search"))
  }
  return(
    <div className ="search">
      <form action={search}>
        <input type ="text" name = "search"></input>
        <button>Search</button>
      </form>  
    </div>
  )
}

export default Search;