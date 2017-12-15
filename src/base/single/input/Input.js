import React, {Component} from 'react'
import cn from 'classnames'
import trim from 'lodash/trim'
import emptyFunction from 'fbjs/lib/emptyFunction'

const CLASS_NAME = 'fct-input'

export default class Input extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: ''
        }
    }

    static defaultProps = {
        validationChecker: ()=>{return true},
        quitChecker: emptyFunction, //按确定键能否退出编辑
        allowBlank: false,
        placeholder: '',
        onChange: emptyFunction//内容改变后的回调
    }

    _checkValidationOnValueChange = () => {

        if ((this.props.allowBlank === false && trim(this.input.value) === '') || !this.props.validationChecker(this.input.value)) {
            console.log('error')
        }
        this._lastValidValue = this.input.value
    }


    handleChange = (e) => {
        this._checkValidationOnValueChange()
        this.setState({
            value: e.target.value
        })
        if (this.props.onChange) {
            this.props.onChange(e.target.value)
        }
    }

    handleFocus = () => {
        if (this.props.onFocus) {
            this.props.onFocus()
        }
    }

    handleBlur = () => {
        this._checkValidationOnValueChange()
        if (this.props.onBlur) {
            this.props.onBlur()
        }
    }

    _bindEvent = () => {
        return {
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            onChange: this.handleChange
        }
    }

    getValue = () => {
        return this.input.value
    }


    render() {
        const {className, validationChecker, quitChecker, allowBlank, defaultValue, onChange, ...props} = this.props
        return <input ref={(input) => this.input = input} {...this._bindEvent()} className={cn(CLASS_NAME, className)}
                      value={this.state.value} {...props}/>
    }
}