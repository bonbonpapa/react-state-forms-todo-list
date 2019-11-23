import React, { Component } from 'react' 
import { throws } from 'assert'
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
            userInputDate: "",
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
        this.setState({ userInputDate: event.target.value }) 
    }
    submitHandler = event => { 
        console.log("Form submitted") 
        event.preventDefault() 
   
        this.setState({ 
            userInput: "", 
            userInputDate: "",
            allTodos: this.state.allTodos.concat(this.state.userInput + " " + this.state.userInputDate),
   
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
                allTodos : this.state.allTodos.filter(x =>  { return x.includes(this.state.userInputSearch)})}
        )
    }
    OnDeleteSearchHandler = event => {
        console.log("Delete search item", this.state)
        this.setState(
            {
                allTodos: this.state.allTodosArchieve.filter(x => { return !x.includes(this.state.userInputSearch)})
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
            {todos.allTodos.map(x => (<li>{ (todos.allTodos.indexOf(x) + 1 ) + ' ' + x }</li>))} 
        </ul> 
        </div>
        )
    }
    render() { 
        console.log("Rendering with state", this.state) 
        if (!this.state.listName) { 
            return (<div> loading ... </div>) 
        } 
        return (<div> 
                    
            <h1>{this.state.listName}</h1> 
            <ul style = { {listStyleType: "decimal"}}> 
                {this.state.allTodos.map(x => (<li>{ (this.state.allTodos.indexOf(x) + 1 ) + ' ' + x }</li>))} 
            </ul> 

            { this.state.allTodolists.map(this.displayTodos)}

            <form onSubmit={this.submitHandler}> 
                <input type="text" 
                    onChange={this.onChangeHandler} 
                    value={this.state.userInput} /> 
                <input type="date" 
                    onChange={this.onDateHandler} 
                    value={this.state.userInputDate} required /> 
                <input type="submit"></input>    
                <button type="button" onClick = {this.OnDeleteHandler} >Clear</button>     
             
            </form> 
            <div>
            <input type="submit"
                onClick = {this.OnDeleteHandler} 
                value = "Delete all messages"></input>
            </div>
            <div>
            <input type="submit"
                onClick = {this.OnChangeTitleHandler} 
                value = "Change list title"></input>
            </div>
            <div>
            <input type="submit"
                onClick = {this.OnChangeDeleteFirstHandler} 
                value = "Delete the first message"></input>
            </div>
            <div>
            <input type="submit"
                onClick = {this.OnReverseHandler} 
                value = "Reverse the list"></input>
            </div>
            <button onClick={this.OnDeleteItemHandler}>Delete todo</button>
            <div>
            <input type="text" 
                    onChange={this.onChangeSeachHandler} 
                    value={this.state.userInputSearch} /> 
            <input type="submit"
                onClick = {this.OnSearchHandler} 
                value = "Search"></input>
            <button onClick={this.OnDeleteSearchHandler}>Delete search result</button>
            </div>
            <div>
                <button type="button" onClick={this.OnCreateNewList}>Add todo list</button>
            </div>
            
        </div>) 
    } 
} 
export default App 