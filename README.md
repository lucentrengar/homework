# homework

/**
 * API 명세서
 * 
 * 기본 URL: http://localhost:3000/api
 */

/**
 * 1. 회원가입
 * POST /register
 * 
 * Request Body:
 * {
 *   "username": "string",
 *   "email": "string",
 *   "password": "string"
 * }
 * 
 * Response (200 OK):
 * {
 *   "id": "number",
 *   "username": "string",
 *   "email": "string",
 *   "points": "number"
 * }
 */

/**
 * 2. 로그인
 * POST /login
 * 
 * Request Body:
 * {
 *   "email": "string",
 *   "password": "string"
 * }
 * 
 * Response (200 OK):
 * {
 *   "token": "string",
 *   "user": {
 *     "id": "number",
 *     "username": "string",
 *     "email": "string",
 *     "points": "number"
 *   }
 * }
 */

/**
 * 3. 프로필 보기
 * GET /profile
 * Headers: Authorization: Bearer <token>
 * 
 * Response (200 OK):
 * {
 *   "id": "number",
 *   "username": "string",
 *   "email": "string",
 *   "points": "number"
 * }
 */

/**
 * 4. 새 공연 등록
 * POST /performances
 * Headers: Authorization: Bearer <token>
 * 
 * Request Body:
 * {
 *   "title": "string",
 *   "description": "string",
 *   "date": "string (ISO 8601 format)",
 *   "venue": "string",
 *   "price": "number",
 *   "availableSeats": "number"
 * }
 * 
 * Response (201 Created):
 * {
 *   "id": "number",
 *   "title": "string",
 *   "description": "string",
 *   "date": "string",
 *   "venue": "string",
 *   "price": "number",
 *   "availableSeats": "number"
 * }
 */

/**
 * 5. 공연 목록 보기
 * GET /performances
 * 
 * Query Parameters:
 * page (optional): number
 * limit (optional): number
 * 
 * Response (200 OK):
 * {
 *   "performances": [
 *     {
 *       "id": "number",
 *       "title": "string",
 *       "date": "string",
 *       "venue": "string",
 *       "price": "number",
 *       "availableSeats": "number"
 *     }
 *   ],
 *   "totalPages": "number",
 *   "currentPage": "number"
 * }
 */

/**
 * 6. 공연 검색하기
 * GET /performances/search
 * 
 * Query Parameters:
 * q: string (검색어)
 * 
 * Response (200 OK):
 * {
 *   "performances": [
 *     {
 *       "id": "number",
 *       "title": "string",
 *       "date": "string",
 *       "venue": "string",
 *       "price": "number",
 *       "availableSeats": "number"
 *     }
 *   ]
 * }
 */

/**
 * 7. 공연 상세보기
 * GET /performances/:id
 * 
 * Response (200 OK):
 * {
 *   "id": "number",
 *   "title": "string",
 *   "description": "string",
 *   "date": "string",
 *   "venue": "string",
 *   "price": "number",
 *   "availableSeats": "number"
 * }
 */

/**
 * 8. 공연 예매하기
 * POST /bookings
 * Headers: Authorization: Bearer <token>
 * 
 * Request Body:
 * {
 *   "performanceId": "number",
 *   "seats": "number"
 * }
 * 
 * Response (201 Created):
 * {
 *   "id": "number",
 *   "performanceId": "number",
 *   "userId": "number",
 *   "seats": "number",
 *   "totalPrice": "number",
 *   "bookingDate": "string"
 * }
 */

/**
 * 9. 예매 확인하기
 * GET /bookings
 * Headers: Authorization: Bearer <token>
 * 
 * Response (200 OK):
 * {
 *   "bookings": [
 *     {
 *       "id": "number",
 *       "performanceId": "number",
 *       "performanceTitle": "string",
 *       "seats": "number",
 *       "totalPrice": "number",
 *       "bookingDate": "string"
 *     }
 *   ]
 * }
 */
