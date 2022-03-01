Ezziepos REST API.

## Getting Started

Install dependecies:

```bash
npm install
```

Add `.env` file and setup the necessary enviroment variables. See example enviroment file `.env.example` to confirm you have the required variables set up.

```bash
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_TOKEN_EXPIRATION=
```

To run the development server:

```bash
npm run dev
```

To run the production server:

```bash
npm run start
```

## Running tests

To run tests, run:

```bash
npm run test
# or
npm run test:watch
```

To run tests with coverage, run:

```bash
npm run test:coverage
```
