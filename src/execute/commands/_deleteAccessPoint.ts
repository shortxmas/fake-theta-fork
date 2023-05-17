import { VercelRequest, VercelResponse } from '@vercel/node';
import {
  invalidHeaderParameterError,
  missingParameterError,
} from '../../error';
import { modelHeader } from './config-headers';
import { getModel } from './models';

const response = {
  x: (name: string) => {
    return {
      name,
      state: 'done',
    };
  },
  z1: (name: string) => {
    return {
      name,
      state: 'done',
    };
  },
};

export function _deleteAccessPoint(
  req: VercelRequest,
  res: VercelResponse,
): void {
  const model = getModel(req);
  if (model === undefined) {
    invalidHeaderParameterError(res, modelHeader);
    return;
  }
  if (typeof req.body.parameters?.ssid !== 'string') {
    missingParameterError(req, res);
    return;
  }
  res.status(200).json(response[model](`${req.body.name}`));
}
