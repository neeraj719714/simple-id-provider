# SIMPLE ID PROVIDER

a simple ID Provider using javascript

- given an intended id provides a unique string which is a meaningful id
- no random string is given in case of no id param
- type safe with typescript 🦺
- currently supports only ESM
- fast⚡

## installation

> `npm i simple-id-provider`

## usage

    import IDProvider from 'simple-id-provider';
    const idProvider = new IDProvider();
    let id = idProvider.getId("test");
    console.log(id)    // test
    let newid = idProvider.getId("test");
    console.log(id)    // test-1;
    console.log(newid) // test-2


## api

- constructor `options` (optional) can be passed into `IDProvider()` as `IDProvider(options)` which is a javascript object containing these key value pairs:
   - `caseSensitive` boolean (defaults to `false`) - if true then case sensitiveness is considered else whole id is converted to lowercase letters
   - `allowDuplicates` boolean (defaults to `true`) - if false then it'll throw error if same id is given in same context. for eg. the above code will throw error as same string `test` is being passed twice.
   - `specialCharsAllowed` string (defaults to hyphen: `-` character) - By default the id provider will only allow alphanueric values and ignore any special char used (except hyphen: `-` that is set as default). for eg: `idProvider.getId("hello&world")` will return `hello-world` as id and `&` char will be ignored as if `whitespace` char. If you want to let other special chars be in the returned id pass string of all those chars in `specialCharsAllowed` option.


- `getId(id)` accepts intented id as string and returns a unique id in the execution context.
> please note that `id` param is mandatory and it doesn't return a random id if nothing is provided.