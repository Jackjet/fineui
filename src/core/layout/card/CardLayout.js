import React, {Component} from 'react'
import cn from 'classnames'
import isNil from 'lodash/isNil'
import Layout from '../Layout'
import './CardLayout.less'
import FillLayout from '../fill/FillLayout';

class CardLayout extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {className, defaultShowKey, children, ...props} = this.props;
        return <Layout className={ cn('bi-card-layout', className) } {...props}>
            { React.Children.map(children, (child) => {
                return <FillLayout className='bi-card-layout-card' key={ child.key } style={ {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: (isNil(defaultShowKey) || defaultShowKey === child.key) ? 'flex' : 'none'
                } }>
                    { child }
                </FillLayout>
            }) }
        </Layout>
    }
}

export default CardLayout