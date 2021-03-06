import {Inject, Injectable} from '@wizardoc/injector';
import {isError, isObject} from '@wizardoc/shared';

import {Toast} from './toast';

// interface DataInterface {
//   data: unknown;
//   err: ResError;
// }

// interface Res {
//   data: DataInterface;
// }

/** 后端的错误对象 */
interface ResError {
  /**
   * 错误码
   */
  code: number;
  /**
   * 错误信息，后端抛出的错误信息
   */
  msg: string;
}

/** 后端返回的数据结构 */
// interface ResData<T> {
//   /**
//    * payload 后端返回的数据有效载荷
//    */
//   data: T;
//   /**
//    * 错误对象
//    */
//   err: ResError;
// }

interface Errors {
  [index: string]: string;
}

@Injectable()
export class ErrorManager {
  @Inject
  private toast!: Toast;

  private readonly ERRORS: Errors = {
    1001: '找不到该组织',
    1002: '创建组织失败',
    1003: '注册失败',
    1004: '该用户已经存在',
    1005: '该用户不存在',
    1006: '密码错误，请检查后重试',
    1007: '邮箱已存在',
    1008: '没有删除该组织的权限',
    1009: '删除组织失败',
    1010: '该用户不存在',
    1011: '不能关注自己哦',
    1012: '重复关注',
    1013: '抱歉，暂时不能更新用户信息',
    1014: '邮箱验证码错误',
    1017: '请先验证现有的邮箱',
    1018: '重复的邮箱',
    1019: '该用户不存在',
    1020: '原密码错误',
    1021: '新密码不能和原密码相同',
    2010: '不能邀请自己入组哦～',
    2011: '被邀请人已经在组内了',
    3001: '创建资源失败',
    4000: '参数错误',
    4001: '尚无该权限，请重新登录',
    4002: '账户异常',
    4003: '该用户已被禁止',
    6003: '抱歉，找不到收信人',
    6004: '不能给自己发信哦～',
    10002: '暂无权限',
  };

  private readonly SYSTEM_ERRORS = {
    NetworkError: '网络错误',
  };

  getErrorMessage(errorCode: number | string): string | undefined {
    return this.ERRORS[errorCode];
  }

  getErrorMessageBySystem(errMsg: string): string {
    return this.SYSTEM_ERRORS[errMsg.replace(/\s/, '')] || errMsg;
  }

  /** 通过 errorCode 来抛出 toast 错误信息 */
  spurtError(errorCode: number | string): void;
  // tslint:disable-next-line:unified-signatures
  spurtError(e: Error): void;
  // tslint:disable-next-line:unified-signatures
  spurtError(e: ResError): void;
  spurtError(query: number | string | Error | ResError): void {
    if (isError(query)) {
      // 系统抛出的错误
      this.toast.error(this.getErrorMessageBySystem(query.message));
    } else if (isObject(query)) {
      // 后端抛出的 error msg
      this.toast.error(this.getErrorMessage(query.code) ?? query.msg);
    } else {
      // 只根据 code 来匹配错误（向后兼容）
      const msg = this.getErrorMessage(query);

      if (msg) {
        this.toast.error(msg);
      }
    }
  }
}

export const errorManager = new ErrorManager();
