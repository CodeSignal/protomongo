declare module '@codesignal/meteor-protomongo' {
  type Mongo = typeof import('meteor/mongo').Mongo;
  export function extendCollection(Mongo: Mongo): void;
}

declare module 'meteor/mongo' {
  module Mongo {
    interface Collection<T> {
      updateManyAsync(
        selector: Selector<T> | ObjectID | string,
        modifier: Modifier<T>,
        options?: {
          /** True to insert a document if no matching documents are found. */
          upsert?: boolean | undefined;
          /**
           * Used in combination with MongoDB [filtered positional operator](https://docs.mongodb.com/manual/reference/operator/update/positional-filtered/) to specify which elements to
           * modify in an array field.
           */
          arrayFilters?: { [identifier: string]: any }[] | undefined;
        },
        callback?: Function
      ): Promise<number>; updateManyAsync(selector: any, modifier: any, options: any): Promise<any>;

      aggregate<A = unknown>(
        stages: Array<any>,
        options?: any
      ): {
        toArray: () => Promise<Array<A>>;
      };

      /**
       * @deprecated Use ensureIndexAsync instead.
       */
      ensureIndex(
        keys: { [key: string]: number | string } | string,
        options?: { [key: string]: any }
      ): void;
      /**
       * @deprecated Use ensureNoIndexAsync instead.
       */
      ensureNoIndex(keys: { [key: string]: number | string } | string): void;

      ensureIndexAsync(
        keys: { [key: string]: number | string } | string,
        options?: { [key: string]: any }
      ): Promise<void>;
      ensureNoIndexAsync(keys: { [key: string]: number | string } | string): Promise<void>;

      getIndexes(): Promise<any[]>;
    }
  }
}
