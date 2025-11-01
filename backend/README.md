# HerbTrace Backend API

Backend API server for the HerbTrace herb traceability system.

## Features

- RESTful API for managing herb traceability data
- Authentication and authorization
- Data persistence using JSON files
- CORS enabled for frontend integration
- JWT token-based authentication

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy `.env.example` to `.env`
2. Update environment variables as needed:
   - `PORT`: Server port (default: 3001)
   - `JWT_SECRET`: Secret key for JWT tokens
   - `NODE_ENV`: Environment (development/production)

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001` (or your configured PORT).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Collections
- `GET /api/collections` - Get all collections
- `GET /api/collections/:id` - Get collection by ID
- `POST /api/collections` - Create new collection
- `PUT /api/collections/:id` - Update collection
- `PATCH /api/collections/:id/status` - Update collection status
- `DELETE /api/collections/:id` - Delete collection

### Processing Batches
- `GET /api/processing-batches` - Get all processing batches (optional ?status= query)
- `GET /api/processing-batches/:id` - Get batch by ID
- `POST /api/processing-batches` - Create new processing batch
- `PUT /api/processing-batches/:id` - Update processing batch
- `PATCH /api/processing-batches/:id/status` - Update batch status
- `DELETE /api/processing-batches/:id` - Delete processing batch

### Lab Tests
- `GET /api/lab-tests` - Get all lab tests (optional ?status= query)
- `GET /api/lab-tests/:id` - Get test by ID
- `GET /api/lab-tests/batch/:batchId` - Get tests by batch ID
- `POST /api/lab-tests` - Create new lab test
- `PUT /api/lab-tests/:id` - Update lab test
- `PATCH /api/lab-tests/:id/status` - Update test status
- `DELETE /api/lab-tests/:id` - Delete lab test

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health Check
- `GET /api/health` - Check API health status

## Default Users

The system comes with default test users:
- **Admin**: admin@herbtrace.com / admin123
- **Processor**: processor@herbtrace.com / processor123
- **Lab**: lab@herbtrace.com / lab123
- **Manufacturer**: manufacturer@herbtrace.com / manufacturer123
- **Farmer**: farmer@herbtrace.com / farmer123

## Data Storage

Data is stored in JSON files in the `data/` directory:
- `collections.json` - Collection events
- `processingBatches.json` - Processing batches
- `labTests.json` - Lab test results
- `products.json` - Products
- `users.json` - User accounts

## CORS

CORS is enabled to allow requests from the frontend. Make sure to configure allowed origins in production.

## License

ISC

