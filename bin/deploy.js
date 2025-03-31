import gcloud from '@battis/partly-gcloudy';
import { Core } from '@battis/qui-cli.core';
import { Root } from '@battis/qui-cli.root';
import path from 'node:path';

(async () => {
  Root.configure({ root: path.dirname(import.meta.dirname) });
  const {
    values: { force }
  } = await Core.init({
    flag: {
      force: {
        short: 'f',
        default: false
      }
    }
  });

  if (force || !process.env.PROJECT) {
    await gcloud.services.enable(gcloud.services.API.CloudLoggingAPI);
  }

  const { project } = await gcloud.batch.appEngineDeployAndCleanup({
    retainVersions: 2
  });

})();
