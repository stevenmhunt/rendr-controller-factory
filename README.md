rendr-controller-factory
========================

Provides a clean and simple way of building Rendr controllers, and minimizes boilerplate code.

Installation (Coming Soon!)
------------

`npm install rendr-controller-factory`

Usage
-----

At the top of your controller file, start by creating a controller.

```
var controller = require('rendr-controller-factory')(module);
```

Notice how we pass the current file's module object? that's how controller factory knows what your controller is supposed to be called according to Rendr.

Next, register actions to the controller:

```
controller.action('index', function (params, callback) {

    // Yes, the controller factory keeps the correct context around...
    var app = this.app;

});
```

At the end of the file, finish your controller by building it.

```
controller.build();
```

Since the controller factory already has a reference to the module object, it handles the export registration.
