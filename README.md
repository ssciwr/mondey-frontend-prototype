# [mondey](https://ssciwr.github.io/mondey)
[![run tests](https://github.com/ssciwr/mondey/actions/workflows/ci.yml/badge.svg)](https://github.com/ssciwr/mondey/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ssciwr_mondey&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ssciwr_mondey)
[![codecov](https://codecov.io/gh/ssciwr/mondey/graph/badge.svg?token=1YBO3KUDAR)](https://codecov.io/gh/ssciwr/mondey)

Initial development for the MONDEY project.

## Frontend

The frontend is automatically built and deployed as a static website to
[ssciwr.github.io/mondey](https://ssciwr.github.io/mondey)
on every push to the main branch using this [Github Action](.github/workflows/deploy.yml).

### Component demos

- [Milestone](https://ssciwr.github.io/mondey/milestone)
- [Milestonegroup](https://ssciwr.github.io/mondey/milestonegroup)

## Preview

A preview of the full website including the admin interface backend is temporarily hosted on a heicloud VM during development:

- [Mondey website](http://129.206.6.74/)
- [Mondey admin](http://129.206.6.74/admin)
- [API documentation](http://129.206.6.74/api/redoc)
- [Swagger UI to interact with API](http://129.206.6.74/api/docs)

(Note: for now this is unsecured http with public API interfaces for convenience during development, the production server would have https and the api interfaces would not be public)
