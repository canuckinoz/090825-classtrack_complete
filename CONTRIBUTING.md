# Contributing to ClassTrack

Thank you for considering contributing to ClassTrack! We appreciate your help in improving this project.

## Commit Style

We follow the Conventional Commits specification for our commit messages. This helps in generating change logs and understanding the history.

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

Example: `feat: add new authentication route`

## Code Review Checklist

Before submitting a pull request, please ensure:

- Code follows the project's style guide (enforced by Prettier and ESLint).
- New features are covered by unit tests.
- Changes do not break existing functionality (run integration and e2e tests).
- Documentation is updated if necessary.
- No sensitive information is committed.
- The code is readable and well-commented where needed.
- All linter warnings are addressed.

## Test Policy

We maintain high test coverage to ensure reliability.

- **Unit Tests**: Test individual components and functions in isolation using Jest.
- **Integration Tests**: Test API endpoints and data flow using Supertest.
- **E2E Tests**: Test user flows and UI interactions using Playwright.

All new features and bug fixes must include appropriate tests. Run `npm test` before committing.

Happy coding!
