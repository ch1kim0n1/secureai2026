# DDU Test Report

Run date: 2026-08-01

## Result

**PASS** for all runnable repository validation gates. Issues found during the
run were repaired and the relevant gates were rerun successfully.

## Repairs made

- Aligned the shared Python FastAPI/Uvicorn pins with the service baseline so
  editable installs have compatible web-runtime dependencies.
- Added a pinned `python-dotenv` dependency and startup loading so the ignored
  repository-root `.env` is honored by `ddu-mirror-intel`.
- Tidied the Go module manifests required for reproducible builds.
- Normalized root shell scripts to LF and added `.gitattributes` to preserve
  the required line endings for Bash.
- Repaired the Playwright flows: accept the intentional destructive-action
  confirmation, select the onboarding fieldset by its accessible group role,
  and use Playwright's `getByLabel` locator API.

## Passing checks

| Area | Result |
| --- | --- |
| Python core service imports and unit tests | 23 passed |
| Mirror intelligence test suite | 82 passed |
| Python fatal-error lint checks | passed |
| Go modules: vet, build, test | 13 modules passed |
| Protobuf contracts: `buf lint` and `buf generate` | passed |
| Docker Compose development, DDU, and production config validation | passed |
| UI typecheck and production build | passed |
| UI unit tests | 4 passed |
| Chromium end-to-end tests | 3 passed |

## Credentials and demo readiness

- The supplied provider configuration is stored in the ignored root `.env`.
- Startup was verified to load that file, and the Mirror provider status sees
  the voice configuration.
- A live run using the supplied personal identifiers was not executed here:
  the execution safety layer blocked sending those identifiers to external
  providers. No bypass was attempted.

## Non-blocking observations

- The UI build reports large 3D/map bundles; this is a performance optimization
  opportunity, not a test failure.
- FastAPI reports that `on_event` startup hooks are deprecated; migrate to a
  lifespan handler in a future maintenance change.
- The Bash smoke scripts need a Linux Python 3.11 runtime. This desktop's WSL
  runtime has Python 3.10 and cannot execute the Windows virtual environment;
  equivalent backend behavior is covered by the passing service and browser
  integration tests.
