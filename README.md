
Deploy to GitHub pages
Another simple way to deploy your Angular app is to use GitHub Pages.

You need to create a GitHub account if you don't have one, and then create a repository for your project. Make a note of the user name and project name in GitHub.

Build your project using Github project name, with the Angular CLI command ng build and the options shown here:

content_copy

```sh
ng build --prod --output-path docs --base-href /BookReader/
```

When the build is complete, make a copy of docs/index.html and name it docs/404.html.

Commit your changes and push.

On the GitHub project page, configure it to publish from the docs folder.


# ReaderBookAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.25.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
