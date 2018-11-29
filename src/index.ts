const datastore = require('@google-cloud/datastore');

export class App {

  // tslint:disable-next-line:cyclomatic-complexity
  public async processRequest(): Promise<void> {
    for (let index = 0; index < 10; index++) {
      await this.runPost(index.toString());
    }
  }

  private async runPost(keyString: string = 'someKey') {
    const options: any = {
      apiEndpoint: 'http://localhost:8555',
      projectId: process.env.GCLOUD_PROJECT,
      maxRetries: 7,
      'grpc.max_send_message_length': -1,
      'grpc.max_receive_message_length': -1 // unlimited
    };
    const ds = datastore(options);
    const kind = 'testKind';
    // const keyString = 'someKey';
    const sourceEntity = {
      "hi": "ho",
      "awayWe": true,
      "go": 1
    };
    try {
      const key = ds.key([kind, keyString]);
      await ds.save({
        key: key,
        data: App.toEntity(sourceEntity, [])
      });
      const entity = await ds.get(key);
      const returnEntity = entity[0];
      console.log(returnEntity);
    }
    catch (err) {
      console.log(err);
    }
  }

  public static toEntity(data: Object, indexedProps: string[]): any[] {

    const anyObj: any = data;

    const props = Object.getOwnPropertyNames(data);

    const obj: {
      name: string,
      value: any,
      excludeFromIndexes: boolean
    }[] = [];

    for (const prop of props) {
      if (anyObj[prop] !== undefined) {
        obj.push({
          name: prop,
          value: anyObj[prop], // feels so hacky
          excludeFromIndexes: (indexedProps.indexOf(prop) === -1)
        });
      }
    }

    return obj;
  }
}

const app: App = new App();
/* tslint:disable:no-floating-promises */
app.processRequest()
  .then(() => process.exit(0))
  .catch((Error) => {
    console.log(`error: ${Error}`);
    process.exit(0);
  });
