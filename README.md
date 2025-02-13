@codesignal/meteor-protomongo<br>[![](http://img.shields.io/npm/dm/@codesignal/meteor-protomongo.svg?style=flat)](https://www.npmjs.com/package/@codesignal/meteor-protomongo) [![npm version](https://badge.fury.io/js/%40codesignal%2Fmeteor-protomongo.svg)](https://www.npmjs.com/package/@codesignal/meteor-protomongo)
=

**Monkey-patches to `meteor/mongo`.**

*Helpful for working with indexes and transitioning away from Fibers.*

**Update, November 2022:**

Meteor 2.8 updated the core `meteor/mongo` package to add `*Async` versions of Mongo methods by default. See: https://github.com/meteor/meteor/pull/11605

Since the new core methods have identical signatures to the ones previously provided by this package, the 3.x release of this package has been updated to remove the overlapping methods.

Now, the package only includes helpers related to working with indexes or aggregation.

## Description

This package extends the `Collection` prototype from `meteor/mongo` with a few handy helpers related to indexes and aggregation. It's intended for use only with projects built with [Meteor](https://www.meteor.com/).

### API

#### Collection Prototype

```js
Collection.updateManyAsync(selector, modifier, ?options);
```

Same as `Collection.updateAsync`; passes `{ multi: true }` in addition to the passed `options`.

```js
Collection.getIndexes();
```

Returns a Promise that is resolved with an array of indexes for this collection. For example, you might see this for a users collection with only an index on ID:
```js
[{ v: 2, key: { _id: 1 }, name: '_id_', ns: 'meteor.users' }]
```

```js
Collection.ensureIndex(selector, options);
```

Ensures an index exists. Similar to the built-in `createIndex`, but handles the case where the index already exists with different options by removing and re-adding the index with the new options. To ensure your database has the same indexes across different environments, you might want to add `ensureIndex` calls to `Meteor.startup`.

```js
Collection.ensureIndexAsync(selector, options);
```

Similar to `ensureIndex`, but returns a Promise that is resolved when the index is created. This method is compatible with Meteor 3.0.

```js
Collection.ensureNoIndex(selector);
```

The reverse of `ensureIndex`. You might want to call this in `Meteor.startup` to make sure an index has been removed in all of your deployed environments.

```js
Collection.ensureNoIndexAsync(selector);
```

Similar to `ensureNoIndex`, but returns a Promise that is resolved when the index is dropped. This method is compatible with Meteor 3.0.

```js
Collection.aggregate(pipeline, ?options);
```

Exposes the [aggregate method](https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/). This removes the need to use `rawCollection()` every time you want to aggregate.

## Install

```bash
npm install @codesignal/meteor-protomongo
```

After the package is installed, add the following few lines in a file that's going to be loaded on startup:
```js
import { Mongo } from 'meteor/mongo';
import ProtoMongo from '@codesignal/meteor-protomongo';

ProtoMongo.extendCollection(Mongo);
```

## Building Locally

After checking out this repo, run...

```sh
npm install
npm run build
```

To do local checks:
```sh
npm run eslint
```

## Contributing

If you'd like to make a contribution, please open a pull request in [package repository](https://github.com/CodeSignal/meteor-protomongo).

If you want (and have the right permissions) to publish a new version, please follow the instructions below:
* Make sure you have [NPM](https://www.npmjs.com/) account and are a member of [codesignal](https://www.npmjs.com/org/codesignal) organization;
* Follow instructions from [npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages) to set up NPM user in your local environment;
* Update package version and push changes to git by running these commands: `npm version <new_version>`, `git push origin master`, `git push --tags`;
* Publish the updated package with `npm publish --access public`.

## License

MIT
