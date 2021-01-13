import 'animate.css/animate.min.css';

import React, {Component, ComponentType, ReactNode} from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import {CSSTransition} from 'react-transition-group';

interface SwipeProps {
  isReverse?: boolean;
}

export function SwipeAnimation<T = any>(MountedComponent: ComponentType<T>): unknown {
  return class extends Component<SwipeProps & T> {
    render(): ReactNode {
      const {isReverse = false} = this.props;

      return (
        <>
          <CSSTransition
            in={true}
            classNames={{
              appear: isReverse ? 'slideInRight' : 'slideInLeft',
              exit: isReverse ? 'slideInLeft' : 'slideInRight',
            }}
            timeout={1000}
            mountOnEnter
            unmountOnExit
          >
            <MountedComponent {...this.props} />
          </CSSTransition>
        </>
      );
    }
  };
}
