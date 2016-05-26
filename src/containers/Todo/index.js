import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import { Header, MainSection} from 'components/todo'
import * as TodoActions from 'reducers/todo/todoActions'
import style from './style.scss'

class TodoApp extends Component {
  render() {
    const { todos, actions, children } = this.props
    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children}
        <Link to='/hello'>Hello</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
