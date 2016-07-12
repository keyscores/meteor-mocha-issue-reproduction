# meteor-mocha-issue-repro

Reproducing issues with practicalmeteor:mocha package

1. Issue with false positives in web UI reporter on failing async tests.
  - Different variations of using fibers/future in mocha code, and variations on sync and async meteor methods.

2. Issue with mocha reporting timeouts error in callback, instead of the assertion failure.


Run tests with
~~~~
  > npm test
~~~~
