import {join} from 'path';

import {Catch, ExceptionFilter, ArgumentsHost} from '@nestjs/common';
import {Response} from 'express';
import {ClientError} from 'graphql-request';

@Catch(Error)
export class GlobalErrorFilter implements ExceptionFilter {
  async catch({response}: ClientError, host: ArgumentsHost): Promise<void> {
    const res = host.switchToHttp().getResponse<Response>();

    // return index.html when occur Error
    if (!response) {
      res.sendFile(join(__dirname, '..', '..', 'client-dist', 'index.html'));

      return;
    }

    // tslint:disable-next-line:no-null-keyword
    const {data = null, err, error, status} = response;
    const UnExpectError = {
      msg: error,
      status,
    };

    // throw the error that from API server
    res.send({
      data,
      err: err ?? UnExpectError,
    });
  }
}
