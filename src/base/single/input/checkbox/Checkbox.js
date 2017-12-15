import React, { Component } from 'react'
import cn from 'classnames'
import { HorizontalLayout, VerticalCenterLayout } from '../../../../core/layout'
import ButtonView from '../../buttonView'


const CLASS_NAME = 'fct-checkbox'

export default class Checkbox extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            checked: this.props.checked
        }
    }
    static defaultProps = {
        checked: false,
        disabled: false
    }

    handleChange = (e) => {
        e.stopPropagation()
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        const {checked, className, disabled} = this.props
        const opts = {}
        opts.checked = this.state.checked
        opts.disabled = disabled
        return (
            <VerticalCenterLayout className={ cn(CLASS_NAME, className, {
                                      'disabled': disabled
                                  }) } onClick={ this.handleChange }>
              <input type='checkbox' readOnly={ true } {...opts} />
              { this.props.children }
            </VerticalCenterLayout>
        )
    }
}