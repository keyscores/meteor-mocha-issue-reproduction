# meteor-mocha-issue-repro

Reproducing issues with practicalmeteor:mocha package

1. Issue with false positives in web UI reporter on failing async methods.
  - Two sets of examples: a trivial setTimout issue, and a more relevant http Request.

2. Issue with mocha reporting timeouts error in callback, instead of the assertion failure.


Run tests with
~~~~
  > npm test
~~~~
