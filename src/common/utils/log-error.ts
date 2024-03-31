import { Logger } from '@nestjs/common';
import { AxiosError } from 'axios';

export function logAxiosError(
  error: AxiosError,
  logger: Logger = new Logger('AxiosErrorLogger'),
) {
  const defaultMessage = 'An unknown error occurred during the Axios request.';
  const errorMessage = error.message || defaultMessage;

  logger.error(`Axios request failed: ${errorMessage}`);

  if (error.response) {
    logger.error(`Response data: ${JSON.stringify(error.response.data)}`);
    logger.error(`Status code: ${error.response.status}`);
    logger.error(`Headers: ${JSON.stringify(error.response.headers)}`);
  } else if (error.request) {
    logger.error('No response received', JSON.stringify(error.request));
  } else {
    logger.error('Error setting up request', errorMessage);
  }

  logger.error(`Request configuration: ${JSON.stringify(error.config)}`);
}
