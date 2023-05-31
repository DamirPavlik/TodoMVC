import React from "react";
import shortid from "shortid";

export default class Todo extends React.Component{
    state = {
        text: '',
        todos: [],
        todosToShow: 'all'
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e =>{
        e.preventDefault()
        let todo = {
            id: shortid.generate(),
            text: this.state.text,
            complete: false
        }
        this.setState({
            todos: [...this.state.todos, todo],
            text: ''
        })
    }

    handleTodoClick = id =>{
       this.setState({
            todos: this.state.todos.map(todo =>{
                if(todo.id === id){
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                }else {
                    return todo
                }
            })
       }) 
    }

    handleDelete = idx =>{
        this.setState({
            todos: this.state.todos.map(x => {
                if(x.id === idx){
                    let index = this.state.todos.indexOf(x)
                    return this.state.todos.splice(index, 1)
                }else{
                    return x
                }
            })
        })
    }

    handleShow = str =>{
        this.setState({
            todosToShow: str
        })
    }
    
    render(){
        let todos = [];
        if(this.state.todosToShow === 'all'){
            todos = this.state.todos
        }else if(this.state.todosToShow === 'active'){
            todos = this.state.todos.filter(todo => !todo.complete)
        }else if(this.state.todosToShow === 'complete'){
            todos = this.state.todos.filter(todo => todo.complete)
        }

        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <input name="text" onChange={this.handleChange} value={this.state.text} placeholder={'add a todo...'}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
                <div>
                    {todos.map(todo =>(
                        <div key={todo.id} onClick={() => this.handleTodoClick(todo.id)} style={{textDecoration: todo.complete ? 'line-through' : '', cursor: 'pointer'}}> 
                             {todo.text}
                            <button onClick={()=> this.handleDelete(todo.id)}>X</button>
                        </div>
                    ))}
                </div>
                <div>active todos: {this.state.todos.filter(todo => !todo.complete).length}</div>
                <div>
                    <button onClick={()=> this.handleShow('all')}>All</button>
                    <button onClick={()=> this.handleShow('active')}>Active</button>
                    <button onClick={()=> this.handleShow('complete')}>Complete</button>
                </div>
                <div >
                    {this.state.todos.length > 0 ? 
                        <div>
                            <button onClick={()=> this.setState({
                            todos: []
                            })}>Delete All Todos</button>
                            <button onClick={() => this.setState({
                                todos: this.state.todos.map(todo=>{
                                    return{
                                        ...todo,
                                        complete: true
                                    }
                                })
                            })}>Toggle All Complete</button>                    
                        </div>
                    : null}
                </div>
            </div>
        )
    }
}