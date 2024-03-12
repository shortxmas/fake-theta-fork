import { VercelRequest, VercelResponse } from '@vercel/node';
import {
  invalidHeaderParameterError,
  invalidParameterValue,
  missingParameterError,
} from '../../error';
import { modelHeader } from './config-headers';
import { getModel } from './models';

const response = {
  x: (
    proto: string,
    host: string,
    fileType: string,
    entryCount: number,
    maxThumbSize: number,
    detail: boolean | undefined = false, // If parameter `_detail` is not entered, treat as false in THETA X.
    name: string,
  ) => {
    if (fileType === 'video') {
      return {
        results: {
          entries: [],
          totalEntries: 0,
        },
        name,
        state: 'done',
      };
    }

    const count = entryCount <= 10 ? entryCount : 10;

    const entries = [...Array(count)].map((_, index) => {
      const details = detail
        ? {
            dateTimeZone: `2015:07:${20 - index} 11:05:18+09:00`,
            height: 5504,
            _imageDescription: '',
            _projectionType: 'Equirectangular',
            _storageID: '90014a68423861503e030277e0c2b500',
            _thumbSize: 3052,
            ...(maxThumbSize > 0 ? { thumbnail: '(base64_binary)' } : {}),
            _uploaded: false,
            width: 11008,
          }
        : {
            dateTime: `2015:07:${20 - index} 11:05:18`,
          };

      return {
        _favorite: false,
        fileUrl: `https://codetricity.github.io/fake-storage/files/100RICOH/R00${10001 - index}.JPG`,
        isProcessed: true,
        name: `R00${10010 - index}.JPG`,
        previewUrl: '',
        size: 4051440,
        ...details,
      };
    });

    return {
      results: {
        entries,
        totalEntries: 16,
      },
      name,
      state: 'done',
    };
  },
  z1: (
    proto: string,
    host: string,
    fileType: string,
    entryCount: number,
    maxThumbSize: number,
    detail: boolean | undefined = true, // If parameter `_detail` is not entered, treat as true in THETA Z1.
    name: string,
  ) => {
    if (fileType === 'video') {
      return {
        results: {
          entries: [],
          totalEntries: 0,
        },
        name,
        state: 'done',
      };
    }

    const count = entryCount <= 10 ? entryCount : 10;

    const entries = [...Array(count)].map((value, index) => {
      const details = detail
        ? {
            dateTimeZone: `2015:07:${20 - index} 11:05:18+09:00`,
            height: 3360,
            _projectionType: 'Equirectangular',
            _thumbSize: 3052,
            ...(maxThumbSize > 0 ? { thumbnail: '(base64_binary)' } : {}),
            width: 6720,
          }
        : {
            dateTime: `2015:07:${20 - index} 11:05:18`,
          };

      return {
        fileUrl:
          proto +
          '://' +
          host +
          `/files/150100525831424d42075b53ce68c300/100RICOH/R00${
            10010 - index
          }.JPG`,
        isProcessed: true,
        name: `R00${10010 - index}.JPG`,
        previewUrl: '',
        size: 4051440,
        ...details,
      };
    });

    return {
      name,
      results: {
        entries,
        totalEntries: 10,
      },
      state: 'done',
    };
  },
};

export function listFiles(req: VercelRequest, res: VercelResponse): void {
  if (
    req.body.parameters?.fileType === undefined ||
    req.body.parameters?.entryCount === undefined ||
    req.body.parameters?.maxThumbSize === undefined
  ) {
    missingParameterError(req, res);
    return;
  }

  const model = getModel(req);
  if (model === undefined) {
    invalidHeaderParameterError(res, modelHeader);
    return;
  }

  const proto = req.headers['x-forwarded-proto'] ?? 'http';
  const host = req.headers['x-forwarded-host'] ?? req.headers.host;
  const { entryCount, fileType, maxThumbSize } = req.body.parameters;

  const detail = req.body.parameters?._detail;
  if (typeof detail !== 'undefined' && typeof detail !== 'boolean') {
    invalidParameterValue(req, res);
    return;
  }

  res
    .status(200)
    .json(
      response[model](
        `${proto}`,
        `${host}`,
        `${fileType}`,
        entryCount,
        maxThumbSize,
        detail,
        `${req.body.name}`,
      ),
    );
}
