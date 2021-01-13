import React, {ComponentType, Component, ReactNode, createRef} from 'react';
import {Inject} from '@wizardoc/injector';
import {traverse} from '@wizardoc/shared';

import {Time} from '../services';

/**
 * 调用方通过混入 ViewObservableComponentProps 调用 onObserve 进行监听，
 * cb 即是 intersectionObserver 的回调函数
 */
export interface ViewObservableComponentProps {
  onObserve(cb: IntersectionObserverCallback): void;
}

export interface ViewObservableComponent {
  onObserve(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

export interface ParsedViewObservableOptions {
  /**
   * reality 表示 “是否接近真实” 的，intersectionObserver 会在每次刚进入页面时触发一次回调，
   * 如果目标元素在最下方还没有出现在视野范围，这样的行为是不合理的，设置 reality 为 true 表示
   * 会忽略掉 intersectionObserver 的第一次触发，默认为 false
   */
  reality: boolean;
}

export type ViewObservableOptions = Partial<ParsedViewObservableOptions>;

/**
 * ViewPortObserver 是 IntersectionObserver 的浅层封装，用于监听目标元素是否在可视区域
 *
 * Example:
 *
 * new ViewPortObserver().ele(fooRef).listen(
 *  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
 *    //... do something
 *  }
 * )
 *
 * 同时监听多个元素 fooRef, barRef
 *
 * new ViewPortObserver().ele(fooRef).ele(barRef).listen(
 *  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
 *    //... do something
 *  }
 * )
 *
 * @author Younccat
 *
 */
export class ViewPortObserver {
  private doms: HTMLElement[] = [];
  private isInit = false;

  constructor(private options?: IntersectionObserverInit) {}

  ele(ele: HTMLElement): ViewPortObserver {
    this.doms.push(ele);

    return this;
  }

  listen(cb: IntersectionObserverCallback, isReality?: boolean): void {
    const realCb = isReality
      ? (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
          if (!this.isInit) {
            this.isInit = true;

            return;
          }

          cb(entries, observer);
        }
      : cb;
    const instance = new IntersectionObserver(realCb, this.options);

    traverse(this.doms, (dom: HTMLElement) => instance.observe(dom));
  }
}

/**
 * 被用于监听组件是否在视野范围
 * 装饰在需要被监听的组件上，让其组件混入 ViewObservableComponentProps 即可，在需要的地方调用
 *
 * this.props.onObserve!(your cb)
 *
 */
export function viewObservable<P>(
  options?: ViewObservableOptions,
): (Wrapper: ComponentType<P>) => any {
  return (Wrapper: ComponentType<P>): any => {
    class WithObservableComponent extends Component<P> {
      @Inject
      time!: Time;

      wrapperRef = createRef<HTMLDivElement>();

      observerRef = createRef<ViewObservableComponent>();

      parsedOptions: ParsedViewObservableOptions;

      constructor(props: P) {
        super(props);

        this.parsedOptions = {
          reality: false,
          ...(options || {}),
        };
      }

      render(): ReactNode {
        return (
          <div ref={this.wrapperRef}>
            <Wrapper ref={this.observerRef} {...this.props} />
          </div>
        );
      }

      componentDidMount(): void {
        const instance = this.observerRef.current;

        if (isViewObservableComponent(instance)) {
          this.handleWrapperObserve(instance.onObserve.bind(instance));
        }
      }

      async handleWrapperObserve(cb: IntersectionObserverCallback): Promise<void> {
        await this.time.sleep();

        const {current} = this.wrapperRef;

        if (!current) {
          return;
        }

        new ViewPortObserver().ele(current).listen(cb, this.parsedOptions.reality);
      }
    }

    return WithObservableComponent;
  };
}

function isViewObservableComponent(target: any): target is ViewObservableComponent {
  return !!target.onObserve;
}
