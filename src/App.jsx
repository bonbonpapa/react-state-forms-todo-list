import React, { Component } from 'react' 
import { throws } from 'assert'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listName: undefined,
      allTodos:[],
      allTodosArchieve: [],
      userInput: "",
      userInputTime: "",
      userInputSearch: ""
    }
  }
}
class App extends Component { 
    constructor() { 
        super() 
        console.log("Instantiating") 
        this.state = { 
            listName: undefined, 
            allTodos: [], 
            allTodosArchieve: [],
            allTodolists: [],
            userInput: "" ,
            userInputTime: "",
            userInputSearch: ""     
        } 
    } 
    componentDidMount() { 
        console.log("After the first render") 
        let nameEntered = window.prompt("What is the name of the list?") 
        console.log("This is what the user entered", nameEntered) 
        this.setState({ listName: nameEntered }) 
    } 
    onChangeHandler = event => { 
        console.log("New string in input box ", event.target.value) 
        this.setState({ userInput: event.target.value }) 
    } 
    onChangeSeachHandler = event => {
        console.log("New string in the search box", event.target.value)
        this.setState({ userInputSearch: event.target.value })
    }
    onDateHandler = event => {
        console.log("New string in input box ", event.target.value) 
        this.setState({ userInputTime: event.target.value }) 
    }
    submitHandler = event => { 
        console.log("Form submitted") 
        event.preventDefault() 
   
        this.setState({ 
            userInput: "", 
            userInputTime: "",
            allTodos: this.state.allTodos.concat(
                {
                    todo: this.state.userInput,
                    dueTime: this.state.userInputTime
                }   )
        }) 
    } 
    OnDeleteHandler = event => {
        console.log("Delete all the messages")
        event.preventDefault()
        this.setState({allTodos: [],
                userInput : ""
            })
    }
    OnChangeTitleHandler = event => {
        let nameEntered = window.prompt("What is the name of the list?") 
        console.log("This is what the user entered", nameEntered) 
        event.preventDefault();
        this.setState({ listName: nameEntered }) 

    }
    OnDeleteItemHandler = event => {
        let numEntered = window.prompt("Which number in the list to delete?") 
        console.log("This is what the user entered", numEntered) 
        let copyTodo =  this.state.allTodos.slice();
        copyTodo.splice(Number(numEntered) - 1 , 1);

        event.preventDefault();
        this.setState({ allTodos: copyTodo}) 
    }
    OnSearchHandler = event => {
        event.preventDefault();
        console.log("Search item", this.state)
        this.setState(
            {   allTodosArchieve: this.state.allTodos,
                allTodos : this.state.allTodos.filter(x =>  { return x.todo.includes(this.state.userInputSearch)})}
        )
    }
    OnDeleteSearchHandler = event => {
        console.log("Delete search item", this.state)
        this.setState(
            {
                allTodos: this.state.allTodosArchieve.filter(x => { return !x.todo.includes(this.state.userInputSearch)})
            }
        )
    }
    
    OnChangeDeleteFirstHandler = event => {
        console.log("Delete first message")
        event.preventDefault();
        this.setState({
            allTodos: this.state.allTodos.slice(1)
        })
    }
    OnReverseHandler = event => {
        console.log("reverse the list")
        event.preventDefault()
        this.setState(
            {
                allTodos: this.state.allTodos.slice().reverse()
            }
        )
    }
    OnCreateNewList = event => {
        console.log("Create list")
        let nameEntered = window.prompt("What is the name of the new list?") 
        console.log("This is what the user entered", nameEntered) 
        this.setState(
            {
                allTodolists: this.state.allTodolists.concat(
                    {
                        listName: this.state.listName,
                        allTodos: this.state.allTodos
                    }                    
                ),
                listName: nameEntered,
                allTodos: [],                 
            }
        )

    }
    displayTodos (todos) {
        return ( <div>
        <h1>{todos.listName}</h1> 
        <ul style = { {listStyleType: "decimal"}}> 
            {todos.allTodos.map(x => (<li>{ (todos.allTodos.indexOf(x) + 1 ) + ' ' + x.todo + x.dueTime }</li>))} 
        </ul> 
        </div>
        )
    }
    render() { 
        console.log("Rendering with state", this.state) 
        if (!this.state.listName) { 
            return (<div> loading ... </div>) 
        } 
        return (
          <div>
            <h1>{this.state.listName}</h1>
            <ul style={{ listStyleType: "decimal" }}>
              {this.state.allTodos.map(x => (
                <li>{(this.state.allTodos.indexOf(x) + 1) + " " + x.todo + x.dueTime}</li>
              ))}
            </ul>

            {this.state.allTodolists.map(this.displayTodos)}

            <form onSubmit={this.submitHandler}>
              <input
                type="text"
                onChange={this.onChangeHandler}
                value={this.state.userInput}
              />
              <input
                type="time"
                onChange={this.onDateHandler}
                value={this.state.userInputTime}
                required
              />
              <input type="submit"></input>
              <button type="button" onClick={this.OnDeleteHandler}>
                Clear
              </button>
              <button type="button" onClick={this.OnChangeTitleHandler}>
                Change Title
              </button>
              <button type="button" onClick={this.OnChangeDeleteFirstHandler}>
                Remove First
              </button>
              <button type="button" onClick={this.OnReverseHandler}>
                Reverse
              </button>
              <button type="button" onClick={this.OnDeleteItemHandler}>
                Delete todo
              </button>
            <div>
              <input
                type="text"
                onChange={this.onChangeSeachHandler}
                value={this.state.userInputSearch}
              />
              <button
                type="button"
                onClick={this.OnSearchHandler}
                
              >Search</button>
              <button type= "button" onClick={this.OnDeleteSearchHandler}>
                Delete search result
              </button>
            </div>
            </form>
            
            <div>
              <button type="button" onClick={this.OnCreateNewList}>
                Add todo list
              </button>
            </div>
          </div>
        ); 
    } 
} 
export default App 